import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Workflow, Server, Play, RotateCcw, Lightbulb } from 'lucide-react';
import type { PipelineState, PipelineStage, SimulationScenario } from '../types';
import { INITIAL_STAGES, STAGE_LOGS, SCENARIOS } from '../constants';
import StageNode from './StageNode';
import CodePackage from './CodePackage';
import ConsoleLog from './ConsoleLog';

const PipelineSimulator: React.FC = () => {
    const [pipelineState, setPipelineState] = useState<PipelineState>('idle');
    const [stages, setStages] = useState<PipelineStage[]>(INITIAL_STAGES);
    const [currentStageIndex, setCurrentStageIndex] = useState<number>(-1);
    const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
    const [packageStatus, setPackageStatus] = useState<'traveling' | 'processing' | 'exploded'>('traveling');
    const [activeScenario, setActiveScenario] = useState<string | null>(null);

    const resetPipeline = useCallback(() => {
        setPipelineState('idle');
        setStages(INITIAL_STAGES.map(s => ({ ...s, status: 'pending', logs: [], duration: undefined })));
        setCurrentStageIndex(-1);
        setConsoleLogs([]);
        setPackageStatus('traveling');
        setActiveScenario(null);
    }, []);

    const runScenario = useCallback(async (scenario: SimulationScenario) => {
        resetPipeline();
        setActiveScenario(scenario.id);
        setPipelineState('running');

        // Small delay to let reset take effect
        await new Promise(r => setTimeout(r, 100));

        for (let i = 0; i < INITIAL_STAGES.length; i++) {
            const stage = INITIAL_STAGES[i];
            const shouldFail = scenario.failAtStage === stage.id;
            const logs = shouldFail ? STAGE_LOGS[stage.id].fail : STAGE_LOGS[stage.id].success;

            // Move package to this stage
            setCurrentStageIndex(i);
            setPackageStatus('traveling');
            await new Promise(r => setTimeout(r, 400));

            // Start processing
            setPackageStatus('processing');
            setStages(prev => prev.map((s, idx) =>
                idx === i ? { ...s, status: 'running' } : s
            ));

            // Stream logs
            const startTime = Date.now();
            for (const log of logs) {
                setConsoleLogs(prev => [...prev, log]);
                await new Promise(r => setTimeout(r, 150 + Math.random() * 100));
            }
            const duration = ((Date.now() - startTime) / 1000).toFixed(1);

            if (shouldFail) {
                // Stage failed
                setStages(prev => prev.map((s, idx) =>
                    idx === i ? { ...s, status: 'failed', duration: parseFloat(duration) } : s
                ));
                setPackageStatus('exploded');
                setPipelineState('failed');
                return;
            } else {
                // Stage succeeded
                setStages(prev => prev.map((s, idx) =>
                    idx === i ? { ...s, status: 'success', duration: parseFloat(duration) } : s
                ));
            }

            await new Promise(r => setTimeout(r, 300));
        }

        // All stages passed
        setPipelineState('success');
        setPackageStatus('processing');
        setConsoleLogs(prev => [...prev, '', '🎉 Pipeline completed successfully!']);
    }, [resetPipeline]);

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/50">
                <div className="flex items-center gap-2">
                    <Workflow size={20} className="text-violet-400" />
                    <h2 className="text-lg font-bold text-slate-100">Pipeline Simulator</h2>
                </div>

                {/* Status Badge */}
                <div className={`
          px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5
          ${pipelineState === 'idle' ? 'bg-slate-700/50 text-slate-400' : ''}
          ${pipelineState === 'running' ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' : ''}
          ${pipelineState === 'success' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : ''}
          ${pipelineState === 'failed' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : ''}
        `}>
                    {pipelineState === 'running' && (
                        <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-violet-400"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                    )}
                    {pipelineState.toUpperCase()}
                </div>
            </div>

            {/* Pipeline Visualization */}
            <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
                {/* Runner Visual */}
                <div className="bg-slate-800/30 rounded-xl border border-slate-700/40 p-6 flex-shrink-0">
                    <div className="flex items-center gap-2 mb-4">
                        <Server size={14} className="text-slate-500" />
                        <span className="text-xs text-slate-500 font-medium">GitHub Actions Runner: ubuntu-latest</span>
                    </div>

                    {/* Pipeline Flow */}
                    <div className="relative flex justify-center">
                        <div className="relative inline-flex items-start gap-4">
                            {/* Connection Lines */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                                {stages.slice(0, -1).map((stage, i) => {
                                    const nextStage = stages[i + 1];
                                    const lineColor = stage.status === 'success'
                                        ? '#10b981'
                                        : stage.status === 'failed' || nextStage?.status === 'failed'
                                            ? '#ef4444'
                                            : '#475569';

                                    // Calculate positions based on gap-4 (16px) and node width (64px = w-16)
                                    const nodeWidth = 64;
                                    const gap = 16;
                                    const spacing = nodeWidth + gap; // 80px per stage

                                    return (
                                        <motion.line
                                            key={`line-${i}`}
                                            x1={i * spacing + nodeWidth}
                                            y1={32}
                                            x2={(i + 1) * spacing}
                                            y2={32}
                                            stroke={lineColor}
                                            strokeWidth={2}
                                            strokeDasharray={stage.status === 'pending' ? '4 4' : '0'}
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 0.5, delay: i * 0.1 }}
                                        />
                                    );
                                })}
                            </svg>

                            {/* Stages */}
                            {stages.map((stage, i) => (
                                <StageNode
                                    key={stage.id}
                                    stage={stage}
                                    isActive={currentStageIndex === i}
                                    index={i}
                                    totalStages={stages.length}
                                />
                            ))}

                            {/* Code Package */}
                            <CodePackage
                                currentStageIndex={currentStageIndex}
                                totalStages={stages.length}
                                isVisible={pipelineState === 'running' || packageStatus === 'exploded'}
                                status={packageStatus}
                            />
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-2 gap-2 flex-shrink-0">
                    {SCENARIOS.map(scenario => (
                        <motion.button
                            key={scenario.id}
                            onClick={() => runScenario(scenario)}
                            disabled={pipelineState === 'running'}
                            className={`
                relative px-3 py-2.5 rounded-lg text-xs font-medium
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
                ${activeScenario === scenario.id
                                    ? `bg-${scenario.color}-500/20 border-${scenario.color}-500/50 text-${scenario.color}-400`
                                    : 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50'}
                border
              `}
                            whileHover={{ scale: pipelineState === 'running' ? 1 : 1.02 }}
                            whileTap={{ scale: pipelineState === 'running' ? 1 : 0.98 }}
                        >
                            <div className="flex items-center gap-2">
                                <Play size={12} />
                                <span>{scenario.name}</span>
                            </div>
                            <p className="text-[10px] text-slate-500 mt-0.5 text-left">{scenario.description}</p>
                        </motion.button>
                    ))}
                </div>

                {/* Reset Button */}
                <motion.button
                    onClick={resetPipeline}
                    className="flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-colors text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <RotateCcw size={14} />
                    Reset Pipeline
                </motion.button>

                {/* Interview Tips */}
                <div className="mt-4 bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                            <Lightbulb size={18} className="text-amber-400" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-100 mb-1">Interview Tip: What is Linting?</h3>
                            <p className="text-xs text-slate-400 leading-relaxed mb-2">
                                Linting is the process of running a program that analyzes code for potential errors, bugs, stylistic errors, and suspicious constructs.
                            </p>
                            <div className="bg-slate-900/50 rounded-lg p-2 border border-slate-700/50">
                                <p className="text-[10px] text-slate-300">
                                    <strong className="text-violet-400">Recommendation:</strong> Always set up linting (e.g., ESLint) as the first step in your CI pipeline to catch syntax errors early and enforce code quality standards.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Console */}
                <div className="flex-shrink-0">
                    <ConsoleLog logs={consoleLogs} isRunning={pipelineState === 'running'} />
                </div>
            </div>
        </div>
    );
};

export default PipelineSimulator;
