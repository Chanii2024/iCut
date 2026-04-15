import React from 'react';

const Footer = () => {
    return (
        <footer className="footer glass-panel">
            <p>Designed by <span className="highlight">Chaniru Weerasinghe</span></p>
            <p className="copyright">© {new Date().getFullYear()} iCut. All rights reserved.</p>

            <style>{`
        .footer {
          width: 100%;
          padding: 1.5rem;
          margin-top: auto;
          text-align: center;
          border-radius: 0;
          border-left: none;
          border-right: none;
          border-bottom: none;
          background: var(--panel-bg);
        }

        .footer p {
          margin: 0.3rem 0;
          color: var(--apple-text);
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .highlight {
          color: var(--apple-blue);
          font-weight: 600;
        }

        .copyright {
          font-size: 0.75rem;
          opacity: 0.6;
        }
      `}</style>
        </footer>
    );
};

export default Footer;
