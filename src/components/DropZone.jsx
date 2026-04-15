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
          height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          border: 2px dashed rgba(0, 113, 227, 0.2);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .drop-zone::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--apple-blue);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .drop-zone:hover, .drop-zone.drag-over {
          border-color: var(--apple-blue);
          box-shadow: 0 10px 40px rgba(0, 113, 227, 0.08);
          background: var(--apple-bg);
          transform: translateY(-2px);
        }

        .drop-zone.drag-over::before {
          opacity: 0.05;
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
          z-index: 1;
        }

        .drop-zone h3 {
          margin: 1.5rem 0 0.5rem;
          color: var(--apple-text);
          font-weight: 700;
          font-size: 1.4rem;
          letter-spacing: -0.02em;
        }

        .drop-zone p {
          color: #86868b;
          font-size: 1rem;
          margin: 0;
        }

        .file-input {
          display: none;
        }
        
        .icon {
          color: var(--apple-blue);
          filter: drop-shadow(0 4px 10px rgba(0, 113, 227, 0.2));
        }
      `}</style>
        </div>
    );
};

export default React.memo(DropZone);
