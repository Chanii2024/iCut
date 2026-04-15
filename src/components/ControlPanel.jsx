import React from 'react';
import { Download, FileText, Settings, Sparkles } from 'lucide-react';

const ControlPanel = ({
  fileCount,
  onRenameChange,
  onFormatChange,
  onExport,
  renameSettings,
  format,
  isProcessing,
  progress,
  processingMode,
  onModeChange,
}) => {
  return (
    <div className="control-panel glass-panel">
      <div className="panel-section">
        <div className="section-title">
          <Settings size={16} />
          <span>Renaming Options</span>
        </div>
        <div className="input-group">
          <div className="field">
            <label>Name Prefix</label>
            <input
              type="text"
              placeholder="e.g. Vacation"
              value={renameSettings.prefix}
              onChange={(e) => onRenameChange('prefix', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Start #</label>
            <input
              type="number"
              value={renameSettings.startNumber}
              min="1"
              onChange={(e) => onRenameChange('startNumber', parseInt(e.target.value) || 1)}
            />
          </div>
        </div>
        <p className="hint">Files will be renamed to: {renameSettings.prefix ? `${renameSettings.prefix}-` : ''}{renameSettings.startNumber}...</p>
      </div>

      <div className="panel-divider"></div>

      <div className="panel-section">
        <div className="section-title">
          <Sparkles size={16} />
          <span>Conversion</span>
        </div>
        <div className="format-selector">
          <label>Output Format</label>
          <select value={format} onChange={(e) => onFormatChange(e.target.value)}>
            <option value="original">Keep Original</option>
            <option value="image/jpeg">JPG</option>
            <option value="image/png">PNG</option>
            <option value="image/webp">WebP</option>
            <option value="image/bmp">BMP</option>
            <option value="image/heic">HEIC</option>
            <option value="image/x-icon">ICO</option>
          </select>
        </div>
      </div>

      <div className="panel-divider"></div>

      <div className="panel-section">
        <div className="section-title">
          <Settings size={16} />
          <span>Processing Speed</span>
        </div>
        <div className="format-selector">
          <label>Mode</label>
          <select value={processingMode} onChange={(e) => onModeChange(e.target.value)}>
            <option value="single">Single-Lane (Standard)</option>
            <option value="multi">Multi-Lane (Turbo)</option>
          </select>
        </div>

        {processingMode === 'multi' && (
          <div className="warning-box">
            ⚠️ Uses high CPU/RAM.
          </div>
        )}
      </div>

      <div className="panel-divider"></div>

      <div className="panel-section actions">
        <button
          className="action-btn primary"
          onClick={() => onExport('process')}
          disabled={fileCount === 0 || isProcessing}
        >
          {isProcessing ? (
            <span>Processing ({progress.current}/{progress.total})...</span>
          ) : (
            <>
              <Download size={18} />
              <span>Process & Download {fileCount > 1 ? '(ZIP)' : ''}</span>
            </>
          )}
        </button>

        {fileCount > 0 && (
          <button
            className="action-btn secondary"
            onClick={() => onExport('pdf')}
          >
            <FileText size={18} />
            <span>Export as PDF</span>
          </button>
        )}
      </div>

      <style>{`
        .control-panel {
          width: 100%;
          max-width: 1000px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          background: var(--panel-bg);
          border: 1px solid var(--glass-border);
          
          /* Mobile First: Stacked */
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .panel-section {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          min-width: 0; /* Prevent flex/grid blowout */
        }

        /* Desktop Layout */
        @media (min-width: 900px) {
           .control-panel {
             grid-template-columns: 1.2fr 1fr 1fr 1.2fr;
             gap: 2rem;
           }

           .panel-section {
             position: relative;
           }
           
           .panel-section:not(:last-child)::after {
             content: '';
             position: absolute;
             right: -1rem;
             top: 0;
             bottom: 0;
             width: 1px;
             background: var(--apple-gray-300);
           }
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--apple-text);
          font-weight: 600;
          font-size: 0.95rem;
          white-space: nowrap;
        }

        /* Inputs */
        .input-group {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1rem;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .field label, .format-selector label {
          font-size: 0.75rem;
          color: #86868b;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        input, select {
          width: 100%;
          padding: 0.75rem;
          border-radius: 10px;
          border: 1px solid var(--apple-gray-400);
          background: var(--apple-bg);
          color: var(--apple-text);
          font-size: 0.95rem;
          outline: none;
          transition: all 0.2s;
        }

        input:focus, select:focus {
          border-color: var(--apple-blue);
          box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.1);
        }

        .hint {
          font-size: 0.75rem;
          color: #86868b;
          margin-top: 0.2rem;
        }

        .warning-box {
          font-size: 0.75rem;
          color: #FF9500; /* Apple warning orange */
          background: rgba(255, 149, 0, 0.1);
          padding: 0.5rem;
          border-radius: 8px;
          border: 1px solid rgba(255, 149, 0, 0.2);
          margin-top: 0.2rem;
          font-weight: 500;
        }

        /* Actions */
        .actions {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          height: 100%;
          gap: 0.8rem;
        }

        .action-btn {
          border: none;
          border-radius: 10px;
          padding: 0.8rem;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          transition: all 0.2s;
          width: 100%;
          white-space: nowrap;
        }

        .action-btn:active {
          transform: scale(0.98);
        }

        .action-btn.primary {
          background: var(--apple-blue);
          color: white;
          box-shadow: 0 2px 8px rgba(0, 113, 227, 0.2);
        }

        .action-btn.primary:hover:not(:disabled) {
          background: #0077ED;
        }

        .action-btn.secondary {
          background: rgba(118, 118, 128, 0.12);
          color: var(--apple-text);
        }
        
        .action-btn.secondary:hover {
            background: rgba(118, 118, 128, 0.2);
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .format-selector {
           display: flex;
           flex-direction: column;
           gap: 0.4rem;
        }

        /* Clean up unused elements */
        .panel-divider { display: none !important; }

      `}</style>
    </div>
  );
};

export default ControlPanel;
