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

            <main className="app-main">
                <div className="layout-grid">
                    <section className="controls-area">
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
                    </section>

                    <section className="content-area">
                        <div className="hero-section">
                            <h1>Local Batch Converter</h1>
                            <p>Rename, convert, and bundle your assets securely in one place.</p>
                        </div>
                        
                        <DropZone onFilesAdded={handleFilesAdded} />

                        <FileList
                            files={files}
                            onRemove={handleRemoveFile}
                            newNames={previewNames}
                        />
                    </section>
                </div>

                <div className="independent-sections">
                    <InfoSections />
                </div>
            </main>

            <Footer />

            <style>{`
        .app-main {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          flex: 1;
        }

        .layout-grid {
          width: 100%;
          max-width: 1400px;
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 3rem;
          align-items: start;
          margin-bottom: 5rem;
        }

        .independent-sections {
          width: 100%;
          max-width: 1400px;
        }

        .content-area {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          min-width: 0;
        }

        .hero-section {
          margin-bottom: 0.5rem;
        }

        .hero-section h1 {
          font-size: 2.8rem;
          font-weight: 800;
          margin: 0;
          letter-spacing: -0.04em;
          color: var(--apple-text);
          line-height: 1.1;
        }

        .hero-section p {
          color: #86868b;
          font-size: 1.25rem;
          margin-top: 1rem;
          font-weight: 500;
          max-width: 600px;
        }

        @media (max-width: 1100px) {
          .layout-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          
          .controls-area {
            order: 2;
          }
          
          .content-area {
            order: 1;
          }

          .hero-section h1 {
            font-size: 2.2rem;
          }
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
