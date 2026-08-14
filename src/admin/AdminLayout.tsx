import React from 'react';
import Sidebar from './components/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-200">
            <Sidebar />
            <main className="flex-1 p-4 md:p-10 m-2 md:m-6 bg-white/80 rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl backdrop-blur-md border border-blue-100 transition-all duration-300">
                <div className="min-h-[60vh] md:min-h-[80vh]">
                    {children}
                </div>
            </main>
        </div>
    );
}
