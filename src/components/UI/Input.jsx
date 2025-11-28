import React from 'react';

export const Input = ({ label, value, onChange, type = 'text', placeholder, min, max, step, className = '', suffix }) => {
    return (
        <div className={`input-group ${className}`}>
            {label && <label className="label">{label}</label>}
            <div className="flex items-center gap-md">
                <input
                    type={type}
                    className="input w-full"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    min={min}
                    max={max}
                    step={step}
                />
                {suffix && <span className="text-muted text-sm">{suffix}</span>}
            </div>
        </div>
    );
};
