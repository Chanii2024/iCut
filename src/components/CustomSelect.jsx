import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const CustomSelect = ({ value, options, onChange, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const selectedOption = options.find(opt => opt.value === value) || options[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="custom-select-container" ref={dropdownRef}>
            {label && <label className="select-label">{label}</label>}
            <div 
                className={`select-trigger ${isOpen ? 'active' : ''}`} 
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selectedOption.label}</span>
                <ChevronDown size={18} className={`chevron ${isOpen ? 'rotate' : ''}`} />
            </div>

            {isOpen && (
                <div className="select-options glass-panel">
                    {options.map((option) => (
                        <div 
                            key={option.value} 
                            className={`select-option ${value === option.value ? 'selected' : ''}`}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}

            <style>{`
                .custom-select-container {
                    position: relative;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .select-label {
                    font-size: 0.75rem;
                    color: #86868b;
                    font-weight: 600;
                    letter-spacing: 0.02em;
                    margin-left: 4px;
                }

                .select-trigger {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    background: var(--apple-bg);
                    border: 1px solid var(--apple-gray-400);
                    border-radius: 12px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    color: var(--apple-text);
                    font-size: 0.95rem;
                    user-select: none;
                }

                .select-trigger:hover {
                    border-color: var(--apple-blue);
                    background: var(--apple-gray-100);
                }

                .select-trigger.active {
                    border-color: var(--apple-blue);
                    box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.1);
                }

                .chevron {
                    transition: transform 0.3s ease;
                    opacity: 0.6;
                }

                .chevron.rotate {
                    transform: rotate(180deg);
                }

                .select-options {
                    position: absolute;
                    top: calc(100% + 8px);
                    left: 0;
                    width: 100%;
                    z-index: 1000;
                    padding: 6px;
                    border-radius: 14px;
                    overflow: hidden;
                    animation: select-fade-in 0.2s ease-out;
                }

                @keyframes select-fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .select-option {
                    padding: 0.8rem 1rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: all 0.2s ease;
                    color: var(--apple-text);
                }

                .select-option:hover {
                    background: var(--apple-blue);
                    color: white;
                }

                .select-option.selected {
                    background: rgba(0, 113, 227, 0.1);
                    color: var(--apple-blue);
                    font-weight: 600;
                }

                .select-option.selected:hover {
                    background: var(--apple-blue);
                    color: white;
                }
            `}</style>
        </div>
    );
};

export default CustomSelect;
