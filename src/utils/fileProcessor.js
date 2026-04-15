import JSZip from 'jszip';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import heic2any from 'heic2any';

// Helper to load image to an HTML Image object
const loadImage = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
};

// Convert a single file to the target format
export const convertFile = async (file, targetFormat) => {
    if (targetFormat === 'original' || file.type === targetFormat) {
        return file;
    }

    // Handle HEIC
    if (file.name.toLowerCase().endsWith('.heic') || file.type === 'image/heic') {
        try {
            const convertedBlob = await heic2any({
                blob: file,
                toType: targetFormat === 'original' ? 'image/jpeg' : targetFormat,
            });
            // heic2any might return an array if multiple images, usually single
            const resultBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
            return resultBlob;
        } catch (e) {
            console.error('HEIC conversion failed', e);
            throw new Error(`Failed to convert HEIC: ${file.name}`);
        }
    }

    // Handle other image conversions via Canvas
    if (file.type.startsWith('image/')) {
        const objectUrl = URL.createObjectURL(file);
        try {
            const img = await loadImage(objectUrl);
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            return new Promise((resolve) => {
                canvas.toBlob((blob) => {
                    resolve(blob);
                }, targetFormat, 0.9); // 0.9 quality
            });
        } catch (e) {
            console.error('Canvas conversion failed', e);
            return file; // Fallback to original
        } finally {
            URL.revokeObjectURL(objectUrl);
        }
    }

    return file; // Non-image files return as is
};

const processSingleFileItem = async (file, index, renameSettings, outputFormat) => {
    let finalBlob = file;
    let finalName = file.name;
    let finalExt = file.name.split('.').pop();

    // Determine target format
    const targetMime = outputFormat === 'original' ? file.type : outputFormat;

    // Update extension based on target format
    if (targetMime === 'image/jpeg') finalExt = 'jpg';
    else if (targetMime === 'image/png') finalExt = 'png';
    else if (targetMime === 'image/webp') finalExt = 'webp';
    else if (targetMime === 'image/bmp') finalExt = 'bmp';
    else if (targetMime === 'image/x-icon') finalExt = 'ico';

    // Rename logic
    if (renameSettings.prefix) {
        const number = renameSettings.startNumber + index;
        finalName = `${renameSettings.prefix}-${number}.${finalExt}`;
    } else {
        // Just change extension if name not changing
        const namePart = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
        finalName = `${namePart}.${finalExt}`;
    }

    // Convert
    if (outputFormat !== 'original' || file.name.toLowerCase().endsWith('.heic')) {
        finalBlob = await convertFile(file, targetMime === 'image/x-icon' ? 'image/png' : targetMime);
    }

    return { blob: finalBlob, name: finalName };
};

export const processAndDownload = async (files, renameSettings, outputFormat, mode = 'process', processingSpeed = 'single', onProgress = () => { }) => {
    const processedFiles = [];
    let completedCount = 0;

    // 1. Process all files (Rename & Convert)
    if (processingSpeed === 'multi') {
        const BATCH_SIZE = 5; // Process 5 files at a time

        for (let i = 0; i < files.length; i += BATCH_SIZE) {
            const chunk = files.slice(i, i + BATCH_SIZE);

            // Map chunk to promises
            const promises = chunk.map(async (file, idx) => {
                const globalIndex = i + idx;
                const result = await processSingleFileItem(file, globalIndex, renameSettings, outputFormat);
                completedCount++;
                onProgress(completedCount, files.length);
                return result;
            });

            // Wait for this batch to finish
            const results = await Promise.all(promises);
            processedFiles.push(...results);
        }

    } else {
        // Single Lane (Sequential)
        for (let i = 0; i < files.length; i++) {
            // Report progress start of item (compatible with old behavior, or just report completion)
            // Let's match the new behavior: report completion count. 
            // Previous code reported 'i' at start, so 0/total, 1/total... 
            // New behavior reports completed count. 
            // Let's stick to reporting *after* done to be accurate, or *before* to show activity on current?
            // User complained about slowness, seeing it tick is good.
            // Let's report i+1 immediately after finish for smooth bar.

            // onProgress(i, files.length); // Old way (start)

            const file = files[i];
            const result = await processSingleFileItem(file, i, renameSettings, outputFormat);
            processedFiles.push(result);

            onProgress(i + 1, files.length);
        }
    }

    // Report completion of processing phase
    onProgress(files.length, files.length);

    // 2. Handle Export Mode
    if (mode === 'pdf') {
        const pdf = new jsPDF();

        for (let i = 0; i < processedFiles.length; i++) {
            const { blob } = processedFiles[i];
            if (i > 0) pdf.addPage();

            const imgData = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(blob);
            });

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        }

        pdf.save('converted-images.pdf');
        return;
    }

    // 3. Handle Download (Zip vs Single)
    if (files.length === 1 && mode !== 'pdf') {
        saveAs(processedFiles[0].blob, processedFiles[0].name);
    } else {
        const zip = new JSZip();
        processedFiles.forEach(file => {
            zip.file(file.name, file.blob);
        });

        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, 'processed_files.zip');
    }
};
