import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [notification, setNotification] = useState(null);
  const [theme, setTheme] = useState('light');
  const [processingMode, setProcessingMode] = useState('single');

  const showNotification = React.useCallback((message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  }, []);

  // Theme Effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleFilesAdded = (newFiles) => {
    setFiles(prev => [...prev, ...newFiles]);
    showNotification(`${newFiles.length} files added successfully!`, 'success');
  };

  const handleRemoveFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleRenameChange = React.useCallback((field, value) => {
    if (field === 'prefix') {
      // Basic filename validation: no / \ : * ? " < > |
      const illegalChars = /[\\/:\*\?"<>\|]/;
      if (illegalChars.test(value)) {
        showNotification('Illegal characters in prefix!', 'error');
        return;
      }
    }
    setRenameSettings(prev => ({ ...prev, [field]: value }));
  }, [showNotification]);

  // Use useMemo for preview names to avoid extra state update cycles
  const previewNames = React.useMemo(() => {
    if (!renameSettings.prefix || files.length === 0) return {};
    
    const newNames = {};
    files.forEach((file, index) => {
      const ext = file.name.split('.').pop();
      const number = renameSettings.startNumber + index;
      newNames[file.name] = `${renameSettings.prefix}-${number}.${ext}`;
    });
    return newNames;
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
      showNotification('Processing completed successfully!', 'success');
    } catch (error) {
      console.error('Export failed:', error);
      showNotification('An error occurred during processing. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
      setProgress({ current: 0, total: 0 });
    }
  };

  return (
    <div className={`app-container ${isProcessing ? 'processing' : ''}`}>
      <Header theme={theme} toggleTheme={toggleTheme} />

      {notification && (
        <div className={`system-notification ${notification.type}`}>
          <div className="notif-content">
            <Sparkles size={16} />
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      <main className="app-main">
        <div className="hero-section">
          <h1>Local Batch Converter</h1>
          <p>Rename, convert, and bundle your assets securely in one place.</p>
        </div>

        <div className="layout-grid">
          <aside className="controls-area">
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
          </aside>

          <section className="content-area">
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
          padding: 4rem 2rem;
          flex: 1;
        }

        .hero-section {
          width: 100%;
          max-width: 1400px;
          text-align: left;
          margin: 0 auto 5.5rem;
          padding: 0 1rem;
        }

        .hero-section h1 {
          font-size: 3.2rem;
          font-weight: 800;
          margin: 0;
          letter-spacing: -0.05em;
          color: var(--apple-text);
          line-height: 1.1;
        }

        .hero-section p {
          color: #86868b;
          font-size: 1.25rem;
          margin: 1.2rem 0 3rem;
          font-weight: 500;
          max-width: 600px;
        }

        .layout-grid {
          width: 100%;
          max-width: 1400px;
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 3rem;
          align-items: start;
          margin-bottom: 8rem;
        }

        .controls-area {
            position: sticky;
            top: 100px;
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

        .system-notification {
          position: fixed;
          top: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          animation: slide-down 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .notif-content {
          background: var(--panel-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 0.8rem 1.5rem;
          border-radius: 99px;
          border: 1px solid var(--glass-border);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          gap: 0.8rem;
          color: var(--apple-text);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .system-notification.success .notif-content { border-color: rgba(52, 199, 89, 0.3); }
        .system-notification.error .notif-content { border-color: rgba(255, 59, 48, 0.3); color: #ff3b30; }

        @keyframes slide-down {
          from { opacity: 0; transform: translate(-50%, -20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
}

export default App;
