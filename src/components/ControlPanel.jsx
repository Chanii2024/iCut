import React from 'react';
import { Download, FileText, Settings, Sparkles, Activity } from 'lucide-react';
import CustomSelect from './CustomSelect';

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
    const formatOptions = [
        { value: 'original', label: 'Keep Original' },
        { value: 'image/jpeg', label: 'JPEG (High Quality)' },
        { value: 'image/png', label: 'PNG (Lossless)' },
        { value: 'image/webp', label: 'WebP (Modern)' },
        { value: 'image/bmp', label: 'BMP (Windows)' },
        { value: 'image/x-icon', label: 'ICO (Favicon)' },
    ];

    const modeOptions = [
        { value: 'single', label: 'Standard (Single Lane)' },
        { value: 'multi', label: 'Turbo (Multi Lane)' },
    ];

    return (
        <aside className="control-sidebar glass-panel">
            <div className="sidebar-group">
                <div className="section-header">
                    <div className="header-icon blue-grad"><Settings size={14} /></div>
                    <h4>Rename Policy</h4>
                </div>
                
                <div className="fields-stack">
                    <div className="input-field">
                        <label>Name Prefix</label>
                        <input
                            type="text"
                            placeholder="Prefix (e.g. holiday)"
                            value={renameSettings.prefix}
                            onChange={(e) => onRenameChange('prefix', e.target.value)}
                        />
                    </div>
                    <div className="input-field">
                        <label>Start Number</label>
                        <input
                            type="number"
                            value={renameSettings.startNumber}
                            min="1"
                            onChange={(e) => onRenameChange('startNumber', parseInt(e.target.value) || 1)}
                        />
                    </div>
                    {renameSettings.prefix && (
                        <div className="rename-preview">
                            Output format: <span>{renameSettings.prefix}-{renameSettings.startNumber}.ext</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="sidebar-divider"></div>

            <div className="sidebar-group">
                <div className="section-header">
                    <div className="header-icon purple-grad"><Sparkles size={14} /></div>
                    <h4>Processing</h4>
                </div>
                
                <div className="fields-stack">
                    <CustomSelect 
                        label="Output Format"
                        value={format}
                        options={formatOptions}
                        onChange={onFormatChange}
                    />
                    
                    <CustomSelect 
                        label="Compute Mode"
                        value={processingMode}
                        options={modeOptions}
                        onChange={onModeChange}
                    />
                </div>

                {processingMode === 'multi' && (
                    <div className="turbo-notice">
                        <Activity size={12} />
                        <span>Turbo mode active. High CPU usage.</span>
                    </div>
                )}
            </div>

            <div className="sidebar-actions">
                <button
                    className={`btn-primary ${isProcessing ? 'loading' : ''}`}
                    onClick={() => onExport('process')}
                    disabled={fileCount === 0 || isProcessing}
                >
                    {isProcessing ? (
                        <div className="progress-bar-inline">
                            <div className="fill" style={{ width: `${(progress.current / progress.total) * 100}%` }}></div>
                            <span>{progress.current}/{progress.total}</span>
                        </div>
                    ) : (
                        <>
                            <Download size={18} />
                            <span>Download {fileCount > 1 ? `ZIP (${fileCount})` : 'File'}</span>
                        </>
                    )}
                </button>

                {fileCount > 0 && (
                    <button
                        className="btn-secondary"
                        onClick={() => onExport('pdf')}
                    >
                        <FileText size={18} />
                        <span>Export as PDF</span>
                    </button>
                )}
            </div>

            <style>{`
                .control-sidebar {
                    width: 100%;
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 2.5rem;
                    height: fit-content;
                    position: sticky;
                    top: 100px;
                }

                .sidebar-group {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .section-header {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                }

                .header-icon {
                    width: 28px;
                    height: 28px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                }

                .blue-grad { background: linear-gradient(135deg, #0071e3, #5ac8fa); }
                .purple-grad { background: linear-gradient(135deg, #af52de, #bf5af2); }

                .section-header h4 {
                    margin: 0;
                    font-size: 0.9rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: var(--apple-text);
                    opacity: 0.8;
                }

                .fields-stack {
                    display: flex;
                    flex-direction: column;
                    gap: 1.2rem;
                }

                .input-field {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .input-field label {
                    font-size: 0.75rem;
                    color: #86868b;
                    font-weight: 600;
                    margin-left: 4px;
                }

                .input-field input {
                    background: var(--apple-bg);
                    border: 1px solid var(--apple-gray-400);
                    padding: 0.75rem 1rem;
                    border-radius: 12px;
                    color: var(--apple-text);
                    font-size: 0.95rem;
                    outline: none;
                    transition: all 0.2s;
                }

                .input-field input:focus {
                    border-color: var(--apple-blue);
                    box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.1);
                }

                .rename-preview {
                    font-size: 0.75rem;
                    color: #86868b;
                    background: var(--apple-gray-100);
                    padding: 0.6rem 0.8rem;
                    border-radius: 8px;
                    border: 1px dashed var(--apple-gray-400);
                }

                .rename-preview span {
                    color: var(--apple-blue);
                    font-weight: 600;
                }

                .sidebar-divider {
                    height: 1px;
                    background: var(--apple-gray-300);
                    opacity: 0.4;
                }

                .turbo-notice {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.75rem;
                    color: #FF9500;
                    font-weight: 600;
                    padding: 0.5rem;
                    background: rgba(255, 149, 0, 0.1);
                    border-radius: 8px;
                }

                .sidebar-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-top: auto;
                }

                .btn-primary, .btn-secondary {
                    width: 100%;
                    padding: 1rem;
                    border-radius: 14px;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.8rem;
                    font-weight: 600;
                    font-size: 0.95rem;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .btn-primary {
                    background: var(--apple-blue);
                    color: white;
                    box-shadow: 0 4px 15px rgba(0, 113, 227, 0.2);
                }

                .btn-primary:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(0, 113, 227, 0.3);
                }

                .btn-primary:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .btn-primary.loading {
                    position: relative;
                    overflow: hidden;
                    padding: 0;
                    height: 50px;
                }

                .progress-bar-inline {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .progress-bar-inline .fill {
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    background: rgba(255, 255, 255, 0.2);
                    transition: width 0.3s ease;
                }

                .progress-bar-inline span {
                    position: relative;
                    z-index: 1;
                }

                .btn-secondary {
                    background: rgba(118, 118, 128, 0.12);
                    color: var(--apple-text);
                }

                .btn-secondary:hover {
                    background: rgba(118, 118, 128, 0.2);
                }

                @media (max-width: 900px) {
                    .control-sidebar {
                        position: static;
                        top: 0;
                    }
                }
            `}</style>
        </aside>
    );
};

export default ControlPanel;
