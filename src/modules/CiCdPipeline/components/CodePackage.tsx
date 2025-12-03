import React from 'react';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

interface CodePackageProps {
    currentStageIndex: number;
    totalStages: number;
    isVisible: boolean;
    status: 'traveling' | 'processing' | 'exploded';
}

const CodePackage: React.FC<CodePackageProps> = ({
    currentStageIndex,

    isVisible,
    status
}) => {
    // Calculate position: each stage is 80px apart (64px node + 16px gap)
    const nodeWidth = 64;
    const gap = 16;
    const spacing = nodeWidth + gap; // 80px per stage
    const baseOffset = nodeWidth / 2; // Center on node
    const targetX = currentStageIndex * spacing + baseOffset;

    if (!isVisible) return null;

    if (status === 'exploded') {
        return (
            <motion.div
                className="absolute top-1/2 -translate-y-1/2 z-20"
                style={{ left: targetX - 12 }}
                initial={{ scale: 1, opacity: 1 }}
                animate={{
                    scale: [1, 1.5, 0],
                    opacity: [1, 1, 0],
                    rotate: [0, 180, 360]
                }}
                transition={{ duration: 0.5 }}
            >
                <div className="w-6 h-6 bg-red-500 rounded shadow-lg shadow-red-500/50" />
            </motion.div>
        );
    }

    return (
        <motion.div
            className="absolute top-1/2 -translate-y-1/2 z-20"
            animate={{
                left: targetX - 12,
                scale: status === 'processing' ? [1, 1.1, 1] : 1
            }}
            transition={{
                left: { type: 'spring', stiffness: 100, damping: 20 },
                scale: { duration: 0.5, repeat: status === 'processing' ? Infinity : 0 }
            }}
        >
            <motion.div
                className={`
          w-6 h-6 rounded shadow-lg flex items-center justify-center
          ${status === 'processing'
                        ? 'bg-gradient-to-br from-violet-500 to-purple-600 shadow-violet-500/50'
                        : 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-blue-500/50'}
        `}
                animate={status === 'traveling' ? {
                    rotate: [0, 5, -5, 0],
                    y: [0, -2, 2, 0]
                } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
            >
                <Package size={12} className="text-white" />
            </motion.div>

            {/* Trail Effect */}
            {status === 'traveling' && (
                <motion.div
                    className="absolute top-1/2 right-full -translate-y-1/2 flex gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-blue-400/50"
                            animate={{
                                opacity: [0.5, 0.2, 0.5],
                                scale: [1, 0.8, 1]
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                delay: i * 0.1
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
};

export default CodePackage;
