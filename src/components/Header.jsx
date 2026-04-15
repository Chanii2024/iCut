import React from 'react';
import { Moon, Sun } from 'lucide-react';

const Header = ({ theme, toggleTheme }) => {
    return (
        <header id="top" className="header-bar glass-panel">
            <div className="logo">
                <div className="icon-box">iC</div>
                <h1>iCut</h1>
            </div>

            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <style>{`
        .header-bar {
          width: 100%;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
          border-radius: 0;
          border-top: none;
          border-left: none;
          border-right: none;
          margin-bottom: 1rem;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .icon-box {
          background: linear-gradient(135deg, var(--apple-blue), #5ac8fa);
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1rem;
        }

        .logo h1 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
          color: var(--apple-text);
        }

        .theme-toggle {
          background: transparent;
          border: none;
          color: var(--apple-text);
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .theme-toggle:hover {
          background: var(--apple-gray-300);
        }
      `}</style>
        </header>
    );
};

export default Header;
