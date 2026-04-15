import React from 'react';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-top">
                <div className="footer-brand">
                    <div className="brand-logo">
                        <div className="logo-accent"></div>
                        <h3>iCut</h3>
                    </div>
                    <p className="brand-desc">
                        Professional grade batch processing and file conversion tool. 
                        Safe, secure, and running entirely in your browser.
                    </p>
                </div>

                <div className="footer-links">
                    <div className="link-group">
                        <h4>Product</h4>
                        <a href="#">Image Converter</a>
                        <a href="#">Batch Renamer</a>
                        <a href="#">PDF Generator</a>
                    </div>
                    <div className="link-group">
                        <h4>Company</h4>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Use</a>
                        <a href="#">Documentation</a>
                    </div>
                </div>

                <div className="footer-status">
                    <div className="security-card">
                        <div className="status-indicator">
                            <span className="pulse-dot"></span>
                            <span>System Status: Online</span>
                        </div>
                        <p>All operations are handled locally. No data is sent to servers.</p>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <div className="copy-section">
                        <p>© {new Date().getFullYear()} iCut. All rights reserved.</p>
                    </div>
                    
                    <div className="designer-section">
                        <p>Designed by <span className="designer-name">Chaniru Weerasinghe</span></p>
                    </div>

                    <div className="social-placeholders">
                        <div className="social-icon"></div>
                        <div className="social-icon"></div>
                        <div className="social-icon"></div>
                    </div>
                </div>
            </div>

            <style>{`
        .footer-container {
          width: 100%;
          background: var(--apple-gray-100);
          border-top: 1px solid var(--apple-gray-300);
          margin-top: 5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        [data-theme='dark'] .footer-container {
          background: #0a0a0c;
          border-top: 1px solid #1c1c1e;
        }

        .footer-top {
          width: 100%;
          max-width: 1200px;
          padding: 4rem 2rem;
          display: grid;
          grid-template-columns: 2fr 2fr 1.5fr;
          gap: 4rem;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1.5rem;
        }

        .logo-accent {
          width: 24px;
          height: 24px;
          background: var(--apple-blue);
          border-radius: 6px;
        }

        .brand-logo h3 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--apple-text);
        }

        .brand-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--apple-text);
          opacity: 0.6;
          max-width: 300px;
        }

        .footer-links {
          display: flex;
          gap: 4rem;
        }

        .link-group h4 {
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1.5rem;
          color: var(--apple-text);
        }

        .link-group {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .link-group a {
          text-decoration: none;
          font-size: 0.9rem;
          color: var(--apple-text);
          opacity: 0.5;
          transition: opacity 0.2s, color 0.2s;
        }

        .link-group a:hover {
          opacity: 1;
          color: var(--apple-blue);
        }

        .security-card {
          padding: 1.5rem;
          background: var(--apple-bg);
          border: 1px solid var(--apple-gray-300);
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }

        [data-theme='dark'] .security-card {
           background: #1c1c1e;
           border-color: #2c2c2e;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: #34c759;
          margin-bottom: 0.8rem;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background: #34c759;
          border-radius: 50%;
          animation: status-pulse 2s infinite;
        }

        @keyframes status-pulse {
          0% { box-shadow: 0 0 0 0px rgba(52, 199, 89, 0.4); }
          100% { box-shadow: 0 0 0 8px rgba(52, 199, 89, 0); }
        }

        .security-card p {
          font-size: 0.8rem;
          color: var(--apple-text);
          opacity: 0.5;
          margin: 0;
          line-height: 1.4;
        }

        .footer-bottom {
          width: 100%;
          border-top: 1px solid var(--apple-gray-300);
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: center;
        }

        [data-theme='dark'] .footer-bottom {
          border-color: #1c1c1e;
        }

        .footer-bottom-content {
          width: 100%;
          max-width: 1200px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-bottom p {
          margin: 0;
          font-size: 0.85rem;
          color: var(--apple-text);
          opacity: 0.5;
        }

        .designer-name {
          color: var(--apple-text);
          opacity: 1;
          font-weight: 600;
        }

        .social-placeholders {
          display: flex;
          gap: 1rem;
        }

        .social-icon {
          width: 32px;
          height: 32px;
          background: var(--apple-bg);
          border: 1px solid var(--apple-gray-300);
          border-radius: 50%;
        }

        [data-theme='dark'] .social-icon {
          background: #1c1c1e;
          border-color: #2c2c2e;
        }

        @media (max-width: 900px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 3rem;
            padding: 3rem 2rem;
          }
          
          .footer-links {
            justify-content: space-between;
            gap: 2rem;
          }
          
          .footer-bottom-content {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
          }
        }
      `}</style>
        </footer>
    );
};

export default Footer;
