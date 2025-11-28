import React from 'react';

export const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="container flex items-center justify-between py-4">
                    <div className="flex items-center gap-md">
                        <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold">
                            PL
                        </div>
                        <h1 className="text-xl font-bold text-slate-800" style={{ fontSize: '1.25rem' }}>損益シミュレーション</h1>
                    </div>
                    <div className="text-sm text-slate-500">
                        Ver 1.0
                    </div>
                </div>
            </header>
            <main className="container py-8">
                {children}
            </main>
        </div>
    );
};
