import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface ConsoleLogProps {
    logs: string[];
    isRunning: boolean;
}

const ConsoleLog: React.FC<ConsoleLogProps> = ({ logs, isRunning }) => {
    const logRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="bg-slate-950 rounded-lg border border-slate-700/50 overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-900/80 border-b border-slate-700/50">
                <Terminal size={14} className="text-emerald-400" />
                <span className="text-xs font-medium text-slate-300">Console Output</span>
                {isRunning && (
                    <motion.div
                        className="ml-auto flex items-center gap-1.5"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-xs text-emerald-400">RUNNING</span>
                    </motion.div>
                )}
            </div>

            <div
                ref={logRef}
                className="h-40 overflow-y-auto p-3 font-mono text-xs custom-scrollbar"
            >
                <AnimatePresence mode="popLayout">
                    {logs.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-slate-600 italic"
                        >
                            Waiting for pipeline to start...
                        </motion.div>
                    ) : (
                        logs.map((log, i) => (
                            <motion.div
                                key={`${i}-${log}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.15 }}
                                className={`
                  leading-relaxed
                  ${log.includes('✓') ? 'text-emerald-400' : ''}
                  ${log.includes('✗') || log.includes('ERROR') || log.includes('FAILED') ? 'text-red-400' : ''}
                  ${log.includes('❌') ? 'text-red-500 font-semibold' : ''}
                  ${log.startsWith('>') ? 'text-slate-400' : ''}
                  ${log.includes('PASS') ? 'text-emerald-300' : ''}
                  ${log.includes('FAIL') && !log.includes('FAILED') ? 'text-red-300' : ''}
                  ${!log.includes('✓') && !log.includes('✗') && !log.startsWith('>') && !log.includes('PASS') && !log.includes('FAIL') ? 'text-slate-500' : ''}
                `}
                            >
                                {log}
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>

                {/* Blinking Cursor */}
                {isRunning && (
                    <motion.span
                        className="inline-block w-2 h-4 bg-emerald-400 ml-1"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                    />
                )}
            </div>
        </div>
    );
};

export default ConsoleLog;
