import React from 'react';

export const Card = ({ children, className = '', title, actions }) => {
    return (
        <div className={`card ${className}`}>
            {(title || actions) && (
                <div className="flex justify-between items-center mb-4">
                    {title && <h3>{title}</h3>}
                    {actions && <div>{actions}</div>}
                </div>
            )}
            {children}
        </div>
    );
};
