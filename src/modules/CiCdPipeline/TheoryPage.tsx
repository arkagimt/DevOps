import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import TheoryDeck from './components/TheoryDeck';

const TheoryPage: React.FC = () => {
    return (
        <div className="h-full w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200 overflow-hidden relative p-6 flex flex-col">
            {/* Background Pattern */}
            <div
                className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px'
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex-shrink-0"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-600/20 border border-violet-500/30 flex items-center justify-center">
                        <BookOpen size={20} className="text-violet-400" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-100">CI/CD Theory</h1>
                        <p className="text-xs text-slate-500">Core Concepts & Best Practices</p>
                    </div>
                </div>
            </motion.div>

            <div className="flex-1 bg-slate-900/40 rounded-xl border border-slate-700/40 p-4 overflow-hidden">
                <TheoryDeck />
            </div>
        </div>
    );
};

export default TheoryPage;
