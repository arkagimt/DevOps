import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit } from 'lucide-react';
import TheoryDeck from './components/TheoryDeck';
import PipelineSimulator from './components/PipelineSimulator';

const CiCdPipelineModule: React.FC = () => {
    return (
        <div className="h-full w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200 overflow-hidden relative">
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

            {/* Content */}
            <div className="relative h-full flex flex-col p-6 overflow-hidden">
                {/* Module Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 flex-shrink-0"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-600/20 border border-violet-500/30 flex items-center justify-center">
                            <GitCommit size={20} className="text-violet-400" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-100">DevOps & CI/CD</h1>
                            <p className="text-xs text-slate-500">GitHub Actions Workflow Simulator</p>
                        </div>
                    </div>
                </motion.div>

                {/* Split View - Fixed to fill available space */}
                <div className="flex-1 grid grid-cols-12 gap-6 min-h-0 overflow-hidden">
                    {/* Left Panel - Theory (5 columns) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="col-span-12 lg:col-span-5 bg-slate-900/40 rounded-xl border border-slate-700/40 p-4 overflow-hidden flex flex-col"
                    >
                        <TheoryDeck />
                    </motion.div>

                    {/* Right Panel - Simulator (7 columns) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="col-span-12 lg:col-span-7 bg-slate-900/40 rounded-xl border border-slate-700/40 p-4 overflow-hidden flex flex-col"
                    >
                        <PipelineSimulator />
                    </motion.div>
                </div>
            </div>

            {/* Custom Scrollbar Styles */}
            <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(100, 116, 139, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 0.7);
        }
      `}</style>
        </div>
    );
};

export default CiCdPipelineModule;
