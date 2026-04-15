import React, { useCallback, useState } from 'react';
import { UploadCloud } from 'lucide-react';

const DropZone = ({ onFilesAdded }) => {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragOver(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const filesArray = Array.from(e.dataTransfer.files);
            // Filter for images optionally here, but user said "any file to any format" (initially) 
            // but later focused on images. We'll accept all for now and filter logically later if needed.
            onFilesAdded(filesArray);
        }
    }, [onFilesAdded]);

    const handleFileInput = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            onFilesAdded(Array.from(e.target.files));
        }
    };

    return (
        <div
            className={`glass-panel drop-zone ${isDragOver ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <input
                type="file"
                multiple
                className="file-input"
                onChange={handleFileInput}
                id="file-upload"
                accept="image/*,.heic,.heif,.bmp,.ico"
            />
            <label htmlFor="file-upload" className="drop-zone-content">
                <UploadCloud size={48} className="icon" />
                <h3>Drag & Drop images here</h3>
                <p>or click to browse</p>
            </label>

            <style>{`
        .drop-zone {
          width: 100%;
          max-width: 800px;
          height: 200px;
          margin: 2rem 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          border-width: 2px;
          border-style: dashed;
          border-color: rgba(0, 113, 227, 0.3);
          cursor: pointer;
        }

        .drop-zone:hover, .drop-zone.drag-over {
          border-color: var(--apple-blue);
          transform: scale(1.01);
          background: var(--apple-bg);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .drop-zone-content {
          text-align: center;
          color: #86868b;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .drop-zone h3 {
          margin: 1rem 0 0.5rem;
          color: var(--apple-text);
          font-weight: 500;
        }

        .file-input {
          display: none;
        }
        
        .icon {
          color: var(--apple-blue);
        }
      `}</style>
        </div>
    );
};

export default DropZone;
