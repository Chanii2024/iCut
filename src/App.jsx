import React, { useState, useEffect } from 'react';
import DropZone from './components/DropZone';
import FileList from './components/FileList';
import ControlPanel from './components/ControlPanel';
import Header from './components/Header';
import Footer from './components/Footer';
import InfoSections from './components/InfoSections';
import { processAndDownload } from './utils/fileProcessor';

function App() {
    const [files, setFiles] = useState([]);
    const [renameSettings, setRenameSettings] = useState({ prefix: '', startNumber: 1 });
    const [outputFormat, setOutputFormat] = useState('original');
    const [previewNames, setPreviewNames] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState({ current: 0, total: 0 });
    const [theme, setTheme] = useState('light');

    const [processingMode, setProcessingMode] = useState('single'); // 'single' | 'multi'

    // Theme Effect
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const handleFilesAdded = (newFiles) => {
        setFiles(prev => [...prev, ...newFiles]);
    };

    const handleRemoveFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleRenameChange = (field, value) => {
        setRenameSettings(prev => ({ ...prev, [field]: value }));
    };

    // Update preview names whenever files or settings change
    useEffect(() => {
        const newNames = {};
        files.forEach((file, index) => {
            if (renameSettings.prefix) {
                // Sequential renaming logic
                const ext = file.name.split('.').pop();
                const number = renameSettings.startNumber + index;
                newNames[file.name] = `${renameSettings.prefix}-${number}.${ext}`;
            }
        });
        setPreviewNames(newNames);
    }, [files, renameSettings]);

    const handleExport = async (type) => {
        if (files.length === 0) return;

        setIsProcessing(true);
        setProgress({ current: 0, total: files.length });

        try {
            await new Promise(resolve => setTimeout(resolve, 100)); // UI update

            await processAndDownload(
                files,
                renameSettings,
                outputFormat,
                type,
                processingMode,
                (current, total) => setProgress({ current, total })
            );
        } catch (error) {
            console.error('Export failed:', error);
            alert('An error occurred during processing. Please try again.');
        } finally {
            setIsProcessing(false);
            setProgress({ current: 0, total: 0 });
        }
    };

    return (
        <div className={`app-container ${isProcessing ? 'processing' : ''}`}>
            <Header theme={theme} toggleTheme={toggleTheme} />

            <div className="main-content">
                <header className="page-header">
                    <h2>Local Batch Converter</h2>
                    <p>Convert, rename, and zip files securely on your device.</p>
                </header>

                <DropZone onFilesAdded={handleFilesAdded} />

                <ControlPanel
                    fileCount={files.length}
                    renameSettings={renameSettings}
                    format={outputFormat}
                    processingMode={processingMode}
                    onRenameChange={handleRenameChange}
                    onFormatChange={setOutputFormat}
                    onModeChange={setProcessingMode}
                    onExport={handleExport}
                    isProcessing={isProcessing}
                    progress={progress}
                />

                <FileList
                    files={files}
                    onRemove={handleRemoveFile}
                    newNames={previewNames}
                />

                <InfoSections />
            </div>

            <Footer />

            <style>{`
        .page-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .page-header h2 {
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
          letter-spacing: -0.01em;
          color: var(--apple-text);
        }

        .page-header p {
          color: #86868b;
          font-size: 1.1rem;
          margin-top: 0.5rem;
        }

        .app-container.processing {
          cursor: wait;
        }
        
        .app-container.processing .main-content {
          opacity: 0.6;
          pointer-events: none;
        }
      `}</style>
        </div>
    );
}

export default App;
