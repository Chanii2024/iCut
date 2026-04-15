import React, { useEffect, useState, memo } from 'react';
import { FileImage, X } from 'lucide-react';

const FileItem = memo(({ file, index, onRemove, newName }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const isImage = file.type.startsWith('image/');

  useEffect(() => {
    let url = null;
    if (isImage) {
      url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [file, isImage]);

  return (
    <div className="file-card">
      <button className="remove-btn" onClick={() => onRemove(index)} aria-label="Remove file">
        <X size={14} />
      </button>
      <div className="file-preview">
        {isImage && previewUrl ? (
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
});

FileItem.displayName = 'FileItem';

const FileList = ({ files, onRemove, newNames = {} }) => {
  if (files.length === 0) return null;

  return (
    <div className="file-list-container glass-panel">
      <div className="file-list-header">
        <span>{files.length} Files Loaded</span>
        <span className="ready-status">Ready to process</span>
      </div>

      <div className="file-grid">
        {files.map((file, index) => (
          <FileItem
            key={`${file.name}-${index}`}
            file={file}
            index={index}
            onRemove={onRemove}
            newName={newNames[file.name]}
          />
        ))}
      </div>

      <style>{`
        .file-list-container {
          width: 100%;
          max-width: 1000px;
          padding: 1.5rem;
          background: var(--panel-bg);
          will-change: transform;
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
          padding: 4px;
        }

        .file-card {
          position: relative;
          background: var(--apple-gray-100);
          border-radius: 12px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform 0.2s ease;
          color: var(--apple-text);
          border: 1px solid transparent;
        }

        .file-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          border-color: var(--apple-gray-300);
        }

        .remove-btn {
          position: absolute;
          top: -6px;
          right: -6px;
          background: #ff3b30;
          color: white;
          border: none;
          border-radius: 50%;
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.2s, transform 0.2s;
          z-index: 2;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .file-card:hover .remove-btn {
          opacity: 1;
        }

        .remove-btn:hover {
          transform: scale(1.1);
          background: #ff453a;
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
          border: 1px solid var(--apple-gray-300);
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
          margin: 2px 0;
        }

        .file-size {
          color: #86868b;
          font-size: 0.7rem;
          margin-top: 2px;
        }

        .ready-status {
            color: var(--apple-blue);
            font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default memo(FileList);

