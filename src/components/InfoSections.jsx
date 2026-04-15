import React from 'react';
import { Shield, Zap, RefreshCcw, Package } from 'lucide-react';

const InfoSections = () => {
    const features = [
        {
            icon: <Shield size={24} />,
            title: "Private & Secure",
            desc: "Your files never leave your device. All processing happens entirely in your browser using client-side technology."
        },
        {
            icon: <Zap size={24} />,
            title: "Ultra Fast",
            desc: "Powered by multi-lane processing to handle large batches of files simultaneously without server delays."
        },
        {
            icon: <RefreshCcw size={24} />,
            title: "Smart Conversion",
            desc: "Support for HEIC, JPEG, PNG, WEBP, and more with high-quality output and zero data loss."
        },
        {
            icon: <Package size={24} />,
            title: "Batch Rename",
            desc: "Automatically organize your files with sequential numbering and custom prefixes in seconds."
        }
    ];

    const steps = [
        { num: "01", title: "Drop Files", desc: "Drag and drop your images or files into the secure zone above." },
        { num: "02", title: "Configure", desc: "Set your renaming preferences and Choose your target output format." },
        { num: "03", title: "Convert & Zip", desc: "Hit export and get your processed files instantly as a ZIP." }
    ];

    return (
        <div className="info-wrapper">
            <section id="features" className="features-grid">
                {features.map((f, i) => (
                    <div key={i} id={i === 0 ? "security" : undefined} className="feature-card glass-panel">
                        <div className="icon-wrapper">{f.icon}</div>
                        <h3>{f.title}</h3>
                        <p>{f.desc}</p>
                    </div>
                ))}
            </section>

            <section id="how" className="how-it-works glass-panel">
                <div className="section-header">
                    <h2>How it works</h2>
                    <p>Three simple steps to manage your media efficiently.</p>
                </div>
                <div className="steps-container">
                    {steps.map((s, i) => (
                        <div key={i} className="step-item">
                            <span className="step-num">{s.num}</span>
                            <h4>{s.title}</h4>
                            <p>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <style>{`
        .info-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 8rem;
          margin-top: 2rem;
          margin-bottom: 4rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }

        .feature-card {
          padding: 2.5rem;
          text-align: left;
          border-radius: 28px;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .feature-card:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.9);
        }

        [data-theme='dark'] .feature-card:hover {
          background: rgba(44, 44, 46, 0.9);
        }

        .icon-wrapper {
          color: var(--apple-blue);
          margin-bottom: 1.5rem;
          background: rgba(0, 113, 227, 0.1);
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
        }

        .feature-card h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.8rem;
          color: var(--apple-text);
        }

        .feature-card p {
          color: var(--apple-text);
          opacity: 0.6;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .how-it-works {
          padding: 6rem 4rem;
          border-radius: 48px;
          text-align: center;
          background: var(--apple-gray-200);
          border: 1px solid var(--apple-gray-400);
        }

        [data-theme='dark'] .how-it-works {
          background: #0a0a0c;
          border-color: #1c1c1e;
        }

        .section-header h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          letter-spacing: -0.03em;
        }

        .section-header p {
          color: #86868b;
          font-size: 1.1rem;
          margin-bottom: 3rem;
        }

        .steps-container {
          display: flex;
          justify-content: space-between;
          gap: 2rem;
        }

        .step-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .step-num {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(180deg, var(--apple-blue), transparent);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          opacity: 0.3;
          line-height: 1;
          margin-bottom: 1rem;
        }

        .step-item h4 {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .step-item p {
          font-size: 0.95rem;
          color: var(--apple-text);
          opacity: 0.6;
          max-width: 250px;
        }

        @media (max-width: 900px) {
          .steps-container {
            flex-direction: column;
            gap: 3rem;
          }
          
          .how-it-works {
            padding: 2.5rem;
          }

          .section-header h2 {
            font-size: 2rem;
          }
        }
      `}</style>
        </div>
    );
};

export default InfoSections;
