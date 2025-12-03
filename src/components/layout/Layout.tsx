import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
    return (
        <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans">
            <Sidebar />
            <main className="flex-1 h-full overflow-hidden relative">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
