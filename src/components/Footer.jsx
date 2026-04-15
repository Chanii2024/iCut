import React from 'react';

const Footer = () => {
    return (
        <footer className="footer-bar glass-panel">
            <div className="footer-left">
                <p className="copyright">© {new Date().getFullYear()} iCut. Built for local security.</p>
            </div>

            <div className="footer-center">
                <div className="security-tag">
                    <div className="dot pulse"></div>
                    <span>Local Processing Active</span>
                </div>
            </div>

            <div className="footer-right">
                <p className="credit">Designed by <span className="name-highlight">Chaniru Weerasinghe</span></p>
            </div>

            <style>{`
        .footer-bar {
          width: 100%;
          padding: 1.2rem 2.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          border-radius: 0;
          border-bottom: none;
          border-left: none;
          border-right: none;
          background: var(--panel-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .footer-left p, .footer-right p {
          margin: 0;
          font-size: 0.85rem;
          color: var(--apple-text);
          opacity: 0.6;
        }

        .security-tag {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--apple-blue);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: rgba(0, 113, 227, 0.05);
          padding: 0.4rem 0.8rem;
          border-radius: 100px;
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--apple-blue);
        }

        .pulse {
          animation: pulse-animation 2s infinite;
        }

        @keyframes pulse-animation {
          0% { box-shadow: 0 0 0 0px rgba(0, 113, 227, 0.4); }
          100% { box-shadow: 0 0 0 8px rgba(0, 113, 227, 0); }
        }

        .name-highlight {
          color: var(--apple-text);
          opacity: 1;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .footer-bar {
            flex-direction: column;
            gap: 1.5rem;
            padding: 2rem;
            text-align: center;
          }
          
          .footer-center {
            order: -1;
          }
        }
      `}</style>
        </footer>
    );
};

export default Footer;
