import React from 'react';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-top">
                <div className="footer-brand-section">
                    <div className="footer-logo">
                        <div className="logo-box">iC</div>
                        <h3>iCut</h3>
                    </div>
                    <p className="footer-tagline">
                        Experience privacy-centric batch file processing. 
                        No servers, no uploads, just pure performance.
                    </p>
                    <div className="social-links">
                        <a href="https://github.com/Chanii2024" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        </a>
                        <a href="https://www.linkedin.com/in/chaniru-weerasinghe-36aa2a326/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </a>
                        <a href="https://www.instagram.com/chaniruweerasinghe" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                        <a href="https://web.facebook.com/Chanii2003/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        </a>
                    </div>
                </div>

                <div className="footer-nav-section">
                    <h4>Navigation</h4>
                    <div className="nav-grid">
                        <a href="#top">Home</a>
                        <a href="#features">Features</a>
                        <a href="#how">How it works</a>
                        <a href="#security">Security</a>
                    </div>
                </div>

                <div className="footer-stack-section">
                    <h4>Build Stack</h4>
                    <div className="stack-grid">
                        <span className="stack-item">React 18</span>
                        <span className="stack-item">Vite</span>
                        <span className="stack-item">JSZip</span>
                        <span className="stack-item">jsPDF</span>
                        <span className="stack-item">Lucide Icons</span>
                        <span className="stack-item">Vanilla CSS</span>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p className="footer-copy">© {new Date().getFullYear()} iCut. All rights reserved.</p>
                    <p className="footer-dev">Developed by <span className="dev-name">Chaniru Weerasinghe</span></p>
                </div>
            </div>

            <style>{`
        .footer-container {
          width: 100%;
          background: var(--apple-gray-100);
          border-top: 1px solid var(--apple-gray-300);
          margin-top: 6rem;
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
          padding: 5rem 2rem;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 4rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .logo-box {
          background: linear-gradient(135deg, var(--apple-blue), #5ac8fa);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.2rem;
          box-shadow: 0 4px 15px rgba(0, 113, 227, 0.3);
        }

        .footer-logo h3 {
          font-size: 1.8rem;
          font-weight: 700;
          margin: 0;
          letter-spacing: -0.03em;
          color: var(--apple-text);
        }

        .footer-tagline {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--apple-text);
          opacity: 0.6;
          margin-bottom: 2rem;
          max-width: 320px;
        }

        .social-links {
          display: flex;
          gap: 1.2rem;
        }

        .social-links a {
          color: var(--apple-text);
          opacity: 0.5;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid var(--apple-gray-300);
          background: var(--apple-bg);
        }

        .social-links a:hover {
          opacity: 1;
          color: var(--apple-blue);
          border-color: var(--apple-blue);
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 113, 227, 0.1);
        }

        [data-theme='dark'] .social-links a {
          background: #1c1c1e;
          border-color: #2c2c2e;
        }

        .footer-nav-section h4, .footer-stack-section h4 {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 2rem;
          color: var(--apple-text);
        }

        .nav-grid, .stack-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .nav-grid a {
          text-decoration: none;
          color: var(--apple-text);
          opacity: 0.5;
          font-size: 0.95rem;
          transition: all 0.2s ease;
        }

        .nav-grid a:hover {
          opacity: 1;
          color: var(--apple-blue);
          padding-left: 5px;
        }

        .stack-item {
          font-size: 0.95rem;
          color: var(--apple-text);
          opacity: 0.5;
        }

        .footer-bottom {
          width: 100%;
          border-top: 1px solid var(--apple-gray-300);
          padding: 2rem;
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

        .footer-copy {
          font-size: 0.9rem;
          color: var(--apple-text);
          opacity: 0.5;
          margin: 0;
        }

        .footer-dev {
          font-size: 0.9rem;
          color: var(--apple-text);
          opacity: 0.8;
          margin: 0;
        }

        .dev-name {
          font-weight: 700;
          color: var(--apple-blue);
        }

        @media (max-width: 900px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 4rem;
            text-align: center;
          }
          
          .footer-logo, .social-links {
            justify-content: center;
          }
          
          .footer-tagline {
            margin-left: auto;
            margin-right: auto;
          }
          
          .footer-bottom-content {
            flex-direction: column;
            gap: 1.5rem;
          }
        }
      `}</style>
        </footer>
    );
};

export default Footer;
