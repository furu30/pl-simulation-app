import React from 'react';

export const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button' }) => {
    const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
    return (
        <button
            type={type}
            className={`btn ${variantClass} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
