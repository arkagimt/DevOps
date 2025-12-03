import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import type { PipelineStage } from '../types';

interface StageNodeProps {
    stage: PipelineStage;
    isActive: boolean;
    index: number;
    totalStages: number;
}

const StageNode: React.FC<StageNodeProps> = ({ stage }) => {
    const getStatusStyles = () => {
        switch (stage.status) {
            case 'success':
                return {
                    bg: 'bg-emerald-500/20',
                    border: 'border-emerald-500/60',
                    glow: 'shadow-emerald-500/30',
                    text: 'text-emerald-400',
                    icon: <CheckCircle size={16} className="text-emerald-400" />
                };
            case 'failed':
                return {
                    bg: 'bg-red-500/20',
                    border: 'border-red-500/60',
                    glow: 'shadow-red-500/30',
                    text: 'text-red-400',
                    icon: <XCircle size={16} className="text-red-400" />
                };
            case 'running':
                return {
                    bg: 'bg-violet-500/20',
                    border: 'border-violet-500/60',
                    glow: 'shadow-violet-500/40',
                    text: 'text-violet-400',
                    icon: null
                };
            default:
                return {
                    bg: 'bg-slate-800/60',
                    border: 'border-slate-600/40',
                    glow: '',
                    text: 'text-slate-500',
                    icon: null
                };
        }
    };

    const styles = getStatusStyles();

    return (
        <div className="flex flex-col items-center relative">
            {/* Stage Node */}
            <motion.div
                className={`
          relative w-16 h-16 rounded-xl ${styles.bg} ${styles.border} border-2
          flex flex-col items-center justify-center gap-1
          transition-all duration-300
          ${stage.status === 'running' ? `shadow-lg ${styles.glow}` : ''}
          ${stage.status === 'success' || stage.status === 'failed' ? `shadow-md ${styles.glow}` : ''}
        `}
                animate={stage.status === 'running' ? {
                    scale: [1, 1.05, 1],
                    boxShadow: [
                        '0 0 0 0 rgba(139, 92, 246, 0)',
                        '0 0 20px 5px rgba(139, 92, 246, 0.3)',
                        '0 0 0 0 rgba(139, 92, 246, 0)'
                    ]
                } : {}}
                transition={{ duration: 1.5, repeat: stage.status === 'running' ? Infinity : 0 }}
            >
                {/* Status Icon Overlay */}
                {styles.icon && (
                    <motion.div
                        className="absolute -top-2 -right-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    >
                        {styles.icon}
                    </motion.div>
                )}

                {/* Stage Icon */}
                <div className={styles.text}>
                    {stage.icon}
                </div>

                {/* Loading Spinner */}
                {stage.status === 'running' && (
                    <motion.div
                        className="absolute inset-0 rounded-xl border-2 border-transparent border-t-violet-400"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                )}
            </motion.div>

            {/* Stage Name */}
            <span className={`mt-2 text-xs font-medium ${styles.text}`}>
                {stage.name}
            </span>

            {/* Duration Badge */}
            {stage.duration && stage.status !== 'pending' && (
                <motion.span
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] text-slate-500 flex items-center gap-0.5 mt-0.5"
                >
                    <Clock size={10} />
                    {stage.duration}s
                </motion.span>
            )}
        </div>
    );
};

export default StageNode;
