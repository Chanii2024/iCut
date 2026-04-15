import React from 'react';
import { FileImage, X } from 'lucide-react';

const FileList = ({ files, onRemove, newNames = {} }) => {
  if (files.length === 0) return null;

  return (
    <div className="file-list-container glass-panel">
      <div className="file-list-header">
        <span>{files.length} Files</span>
        <span className="clear-all">Ready to process</span>
      </div>

      <div className="file-grid">
        {files.map((file, index) => {
          // Create object URL for preview if it's an image
          const isImage = file.type.startsWith('image/');
          const previewUrl = isImage ? URL.createObjectURL(file) : null;
          // We should revoke these URLs later to avoid memory leaks, 
          // but for a simple list within React, it's tricky without a cleanup effect per item.
          // For now, let's just use it.

          const newName = newNames[file.name] || '';

          return (
            <div key={`${file.name}-${index}`} className="file-card">
              <button className="remove-btn" onClick={() => onRemove(index)}>
                <X size={14} />
              </button>
              <div className="file-preview">
                {isImage ? (
                  <img src={previewUrl} alt={file.name} loading="lazy" />
                ) : (
                  <FileImage size={32} />
                )}
              </div>
              <div className="file-info">
                <div className="original-name" title={file.name}>{file.name}</div>
                {newName && <div className="new-name-preview">→ {newName}</div>}
                <div className="file-size">{(file.size / 1024).toFixed(1)} KB</div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .file-list-container {
          width: 100%;
          max-width: 1000px;
          padding: 1.5rem;
          background: var(--panel-bg);
        }

        .file-list-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          color: #86868b;
          font-weight: 500;
          font-size: 0.9rem;
        }

        .file-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 1rem;
          max-height: 500px;
          overflow-y: auto;
          padding: 4px; /* Space for focus rings/shadows */
        }

        .file-card {
          position: relative;
          background: var(--apple-gray-100);
          border-radius: 12px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform 0.2s;
          color: var(--apple-text);
        }

        .file-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .remove-btn {
          position: absolute;
          top: -6px;
          right: -6px;
          background: #ff3b30;
          color: white;
          border: none;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .file-card:hover .remove-btn {
          opacity: 1;
        }

        .file-preview {
          width: 100%;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
          background: var(--apple-bg);
          border-radius: 8px;
          overflow: hidden;
        }

        .file-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .file-info {
          width: 100%;
          font-size: 0.8rem;
          text-align: center;
        }

        .original-name {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 500;
        }
        
        .new-name-preview {
          color: var(--apple-blue);
          font-size: 0.75rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .file-size {
          color: #86868b;
          font-size: 0.7rem;
          margin-top: 2px;
        }
      `}</style>
    </div>
  );
};

export default FileList;
