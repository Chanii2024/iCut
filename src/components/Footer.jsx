import React from 'react';

const Footer = () => {
    return (
        <footer className="footer-wrap">
            <div className="footer-content glass-panel">
                <div className="footer-section">
                    <div className="footer-brand">
                        <span className="brand-dot"></span>
                        <h3>iCut</h3>
                    </div>
                    <p className="footer-tagline">Secure batch conversion, right in your browser.</p>
                </div>

                <div className="footer-section status-section">
                    <div className="security-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                        <span>100% Client-Side Encryption</span>
                    </div>
                </div>

                <div className="footer-section attribution">
                    <p>Designed by <span className="highlight-name">Chaniru Weerasinghe</span></p>
                    <p className="copyright">© {new Date().getFullYear()} iCut. All rights reserved.</p>
                </div>
            </div>

            <style>{`
        .footer-wrap {
          width: 100%;
          padding: 2rem 1rem;
          margin-top: auto;
          display: flex;
          justify-content: center;
        }

        .footer-content {
          width: 100%;
          max-width: 1200px;
          padding: 2.5rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          border-radius: 24px;
        }

        .footer-section {
          flex: 1;
          min-width: 250px;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 0.5rem;
        }

        .brand-dot {
          width: 8px;
          height: 8px;
          background: var(--apple-blue);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--apple-blue);
        }

        .footer-brand h3 {
          margin: 0;
          font-size: 1.4rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--apple-text);
        }

        .footer-tagline {
          font-size: 0.95rem;
          color: var(--apple-text);
          opacity: 0.6;
          margin: 0;
        }

        .status-section {
          display: flex;
          justify-content: center;
        }

        .security-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 1.2rem;
          background: rgba(0, 113, 227, 0.08);
          border: 1px solid rgba(0, 113, 227, 0.2);
          border-radius: 100px;
          color: var(--apple-blue);
          font-size: 0.85rem;
          font-weight: 600;
        }

        .attribution {
          text-align: right;
        }

        .highlight-name {
          color: var(--apple-text);
          font-weight: 700;
          position: relative;
          z-index: 1;
        }
        
        .highlight-name::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 2px;
          width: 100%;
          height: 6px;
          background: var(--apple-blue);
          opacity: 0.15;
          z-index: -1;
          transition: opacity 0.3s ease;
        }

        .highlight-name:hover::after {
          opacity: 0.3;
        }

        .footer-section p {
          margin: 0.3rem 0;
          color: var(--apple-text);
          font-size: 0.9rem;
        }

        .copyright {
          font-size: 0.75rem;
          opacity: 0.5;
        }

        @media (max-width: 900px) {
          .footer-content {
            flex-direction: column;
            text-align: center;
          }
          
          .attribution {
            text-align: center;
          }
          
          .status-section {
            order: 3;
          }
          
          .footer-brand {
            justify-content: center;
          }
        }
      `}</style>
        </footer>
    );
};

export default Footer;
