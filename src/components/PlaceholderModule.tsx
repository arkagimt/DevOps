import React from 'react';
import { Construction } from 'lucide-react';

interface PlaceholderModuleProps {
    title: string;
}

const PlaceholderModule: React.FC<PlaceholderModuleProps> = ({ title }) => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950 text-slate-400">
            <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-4">
                <Construction size={32} className="text-violet-500" />
            </div>
            <h1 className="text-2xl font-bold text-slate-200 mb-2">{title}</h1>
            <p>This module is currently under development.</p>
        </div>
    );
};

export default PlaceholderModule;
