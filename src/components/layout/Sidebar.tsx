import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    GitCommit,
    Github,
    Container,
    Server,
    Settings,
    LayoutDashboard,
    BookOpen,
    Snowflake,
    GitBranch,
    Layers
} from 'lucide-react';

const Sidebar: React.FC = () => {
    const navItems = [
        { path: '/', label: 'Overview', icon: <LayoutDashboard size={20} /> },
        { path: '/theory', label: 'CI/CD Theory', icon: <BookOpen size={20} /> },
        { path: '/simulator', label: 'Pipeline Simulator', icon: <GitCommit size={20} /> },
        { path: '/snowflake', label: 'Snowflake Pipeline', icon: <Snowflake size={20} /> },
        { path: '/branching', label: 'Git Branching', icon: <GitBranch size={20} /> },
        { path: '/agile', label: 'Agile Lifecycle', icon: <Layers size={20} /> },
        { path: '/actions', label: 'GitHub Actions', icon: <Github size={20} /> },
        { path: '/docker', label: 'Docker Basics', icon: <Container size={20} /> },
        { path: '/k8s', label: 'Kubernetes', icon: <Server size={20} /> },
    ];

    return (
        <div className="w-64 h-screen bg-slate-950 border-r border-slate-800 flex flex-col">
            {/* Logo Area */}
            <div className="p-6 flex items-center gap-3 border-b border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
                    <Github className="text-white" size={20} />
                </div>
                <span className="font-bold text-slate-100 text-lg tracking-tight">DevOps</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive
                                ? 'bg-violet-600/10 text-violet-400 border border-violet-600/20'
                                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}
            `}
                    >
                        {item.icon}
                        <span className="font-medium text-sm">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800">
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-colors">
                    <Settings size={20} />
                    <span className="font-medium text-sm">Settings</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
