import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    GitBranch, GitCommit, GitMerge, BookOpen, Clock, TrendingUp,
    PlayCircle, PauseCircle, RotateCcw,
    ChevronDown, Lightbulb, Target
} from 'lucide-react';

type BranchStrategy = 'gitflow' | 'trunk';

interface Commit {
    id: string;
    branch: string;
    x: number;
    message: string;
    color: string;
}

interface Branch {
    name: string;
    y: number;
    color: string;
    active: boolean;
}



const GitBranchingModule: React.FC = () => {
    const [strategy, setStrategy] = useState<BranchStrategy>('gitflow');
    const [isPlaying, setIsPlaying] = useState(false);
    const [step, setStep] = useState(0);
    const [commits, setCommits] = useState<Commit[]>([]);
    const [expandedTheory, setExpandedTheory] = useState<Set<string>>(new Set(['overview']));

    // Branch configuration
    const gitflowBranches: Branch[] = [
        { name: 'main', y: 50, color: '#3b82f6', active: true },
        { name: 'develop', y: 150, color: '#8b5cf6', active: false },
        { name: 'feature/auth', y: 250, color: '#10b981', active: false },
        { name: 'release/v1.0', y: 200, color: '#f59e0b', active: false },
        { name: 'hotfix/bug', y: 100, color: '#ef4444', active: false },
    ];

    const trunkBranches: Branch[] = [
        { name: 'main', y: 150, color: '#3b82f6', active: true },
        { name: 'feature (short-lived)', y: 200, color: '#10b981', active: false },
    ];

    const branches = strategy === 'gitflow' ? gitflowBranches : trunkBranches;

    // Git Flow animation sequence
    const gitflowSteps = [
        { action: 'Initial commit on main', commits: [{ branch: 'main', x: 50, message: 'Initial', color: '#3b82f6' }] },
        { action: 'Create develop branch', commits: [{ branch: 'develop', x: 100, message: 'Branch develop', color: '#8b5cf6' }] },
        { action: 'Start feature/auth', commits: [{ branch: 'feature/auth', x: 150, message: 'Start auth', color: '#10b981' }] },
        { action: 'Commit to feature', commits: [{ branch: 'feature/auth', x: 200, message: 'Add login', color: '#10b981' }] },
        { action: 'Commit to feature', commits: [{ branch: 'feature/auth', x: 250, message: 'Add signup', color: '#10b981' }] },
        { action: 'Merge feature → develop', commits: [{ branch: 'develop', x: 300, message: 'Merge auth', color: '#8b5cf6' }] },
        { action: 'Create release branch', commits: [{ branch: 'release/v1.0', x: 350, message: 'v1.0-rc', color: '#f59e0b' }] },
        { action: 'Merge release → main', commits: [{ branch: 'main', x: 400, message: 'v1.0', color: '#3b82f6' }] },
        { action: 'Merge release → develop', commits: [{ branch: 'develop', x: 400, message: 'Sync v1.0', color: '#8b5cf6' }] },
        { action: 'Hotfix on main', commits: [{ branch: 'hotfix/bug', x: 450, message: 'Fix crash', color: '#ef4444' }] },
        { action: 'Merge hotfix everywhere', commits: [{ branch: 'main', x: 500, message: 'v1.0.1', color: '#3b82f6' }] },
    ];

    // Trunk-Based animation sequence
    const trunkSteps = [
        { action: 'Initial commit', commits: [{ branch: 'main', x: 50, message: 'Initial', color: '#3b82f6' }] },
        { action: 'Dev A: Pull → Commit → Push', commits: [{ branch: 'main', x: 150, message: 'Add feature A', color: '#3b82f6' }] },
        { action: 'Dev B: Pull → Commit → Push', commits: [{ branch: 'main', x: 250, message: 'Add feature B', color: '#3b82f6' }] },
        { action: 'Dev C: Short branch → PR', commits: [{ branch: 'feature (short-lived)', x: 300, message: 'Work on C', color: '#10b981' }] },
        { action: 'Merge C → main (same day)', commits: [{ branch: 'main', x: 350, message: 'Merge C', color: '#3b82f6' }] },
        { action: 'Dev A: Another commit', commits: [{ branch: 'main', x: 450, message: 'Update docs', color: '#3b82f6' }] },
        { action: 'Deploy to production', commits: [{ branch: 'main', x: 550, message: 'Deploy v1.1', color: '#3b82f6' }] },
    ];

    const steps = strategy === 'gitflow' ? gitflowSteps : trunkSteps;

    // Animation control
    useEffect(() => {
        if (!isPlaying) return;

        if (step >= steps.length) {
            setIsPlaying(false);
            return;
        }

        const timer = setTimeout(() => {
            const currentStep = steps[step];
            currentStep.commits.forEach(commit => {
                const newCommit: Commit = {
                    id: `${commit.branch}-${commit.x}`,
                    branch: commit.branch,
                    x: commit.x,
                    message: commit.message,
                    color: commit.color,
                };
                setCommits(prev => [...prev, newCommit]);
            });
            setStep(step + 1);
        }, 1500);

        return () => clearTimeout(timer);
    }, [isPlaying, step, strategy]);

    const resetAnimation = () => {
        setCommits([]);

        setStep(0);
        setIsPlaying(false);
    };

    const toggleTheory = (id: string) => {
        setExpandedTheory(prev => {
            const newSet = new Set(prev);
            newSet.has(id) ? newSet.delete(id) : newSet.add(id);
            return newSet;
        });
    };

    const theoryContent = [
        {
            id: 'overview',
            title: 'Git Flow vs Trunk-Based: The Battle',
            icon: <GitBranch size={16} className="text-blue-400" />,
            content: (
                <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-lg p-3 border border-purple-500/30 bg-purple-500/10">
                            <h4 className="text-sm font-bold text-purple-300 mb-2">Git Flow (Complex)</h4>
                            <ul className="text-xs text-slate-300 space-y-1">
                                <li>✓ Multiple long-lived branches</li>
                                <li>✓ Rigorous release process</li>
                                <li>✓ Good for scheduled releases</li>
                                <li>✗ Slow feedback loops</li>
                                <li>✗ Merge hell potential</li>
                            </ul>
                        </div>
                        <div className="rounded-lg p-3 border border-emerald-500/30 bg-emerald-500/10">
                            <h4 className="text-sm font-bold text-emerald-300 mb-2">Trunk-Based (Fast)</h4>
                            <ul className="text-xs text-slate-300 space-y-1">
                                <li>✓ Single main branch</li>
                                <li>✓ Continuous integration</li>
                                <li>✓ Fast feedback</li>
                                <li>✓ Elite teams use this</li>
                                <li>✗ Requires strong CI/CD</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 'interview-tips',
            title: 'Interview Ace Tips',
            icon: <Target size={16} className="text-amber-400" />,
            content: (
                <div className="space-y-2">
                    <div className="rounded p-2.5 border border-amber-500/30 bg-amber-500/10">
                        <p className="text-xs text-slate-300 leading-relaxed">
                            <strong className="text-amber-300">"Trunk-based development is preferred by high-performing teams"</strong> - State of DevOps Report
                        </p>
                    </div>
                    <div className="rounded p-2.5 border border-cyan-500/30 bg-cyan-500/10">
                        <p className="text-xs text-slate-300">
                            <Lightbulb size={12} className="inline mr-1 text-cyan-400" />
                            <strong>When asked:</strong> "We use trunk-based with feature flags for incomplete features. This enables continuous deployment while maintaining stability."
                        </p>
                    </div>
                </div>
            ),
        },
        {
            id: 'metrics',
            title: 'Performance Metrics Comparison',
            icon: <TrendingUp size={16} className="text-green-400" />,
            content: (
                <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="rounded p-2 border border-slate-700/50 bg-slate-800/50">
                            <div className="text-purple-400 font-semibold mb-1">Git Flow</div>
                            <div className="text-slate-400">Deploy Freq: Weekly</div>
                            <div className="text-slate-400">Lead Time: Days</div>
                            <div className="text-slate-400">MTTR: Hours</div>
                        </div>
                        <div className="rounded p-2 border border-emerald-700/50 bg-emerald-500/10">
                            <div className="text-emerald-400 font-semibold mb-1">Trunk-Based</div>
                            <div className="text-slate-300">Deploy Freq: Daily+</div>
                            <div className="text-slate-300">Lead Time: Hours</div>
                            <div className="text-slate-300">MTTR: Minutes</div>
                        </div>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="h-full w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200 overflow-hidden relative p-6 flex flex-col">
            <div
                className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                }}
            />

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 flex-shrink-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-600/20 border border-violet-500/30 flex items-center justify-center">
                            <GitBranch size={20} className="text-violet-400" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-100">Git Branching Strategies</h1>
                            <p className="text-xs text-slate-500">Visualize how different strategies work</p>
                        </div>
                    </div>

                    {/* Strategy Selector */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => { setStrategy('gitflow'); resetAnimation(); }}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${strategy === 'gitflow'
                                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                                : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:bg-slate-700/50'
                                }`}
                        >
                            Git Flow
                        </button>
                        <button
                            onClick={() => { setStrategy('trunk'); resetAnimation(); }}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${strategy === 'trunk'
                                ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:bg-slate-700/50'
                                }`}
                        >
                            Trunk-Based
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Main Content - Split View */}
            <div className="flex-1 grid grid-rows-2 gap-4 overflow-hidden">
                {/* Top: Theory Deck */}
                <div className="bg-slate-900/40 rounded-xl border border-slate-700/40 p-4 overflow-hidden flex flex-col">
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-700/50 flex-shrink-0">
                        <BookOpen size={16} className="text-cyan-400" />
                        <h2 className="text-sm font-semibold text-slate-200">Theory & Best Practices</h2>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        <div className="space-y-2">
                            {theoryContent.map(section => (
                                <div key={section.id} className="rounded-lg border border-slate-700/50 overflow-hidden bg-slate-800/30">
                                    <button
                                        onClick={() => toggleTheory(section.id)}
                                        className="w-full flex items-center justify-between px-3 py-2 hover:bg-slate-700/30 transition-colors"
                                    >
                                        <div className="flex items-center gap-2">
                                            {section.icon}
                                            <span className="text-xs font-medium text-slate-200">{section.title}</span>
                                        </div>
                                        <motion.div animate={{ rotate: expandedTheory.has(section.id) ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                            <ChevronDown size={14} className="text-slate-400" />
                                        </motion.div>
                                    </button>
                                    <AnimatePresence>
                                        {expandedTheory.has(section.id) && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-3 pb-3">{section.content}</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom: Branch Simulator */}
                <div className="bg-slate-900/40 rounded-xl border border-slate-700/40 p-4 overflow-hidden flex flex-col">
                    {/* Controls */}
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-700/50 flex-shrink-0">
                        <div className="flex items-center gap-2">
                            <GitMerge size={16} className="text-green-400" />
                            <h2 className="text-sm font-semibold text-slate-200">Branch Visualizer</h2>
                            {step < steps.length && (
                                <span className="text-xs text-slate-500">Step {step + 1}/{steps.length}: {steps[step]?.action}</span>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="p-2 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/30 text-violet-300 transition-all"
                                title={isPlaying ? 'Pause' : 'Play'}
                            >
                                {isPlaying ? <PauseCircle size={16} /> : <PlayCircle size={16} />}
                            </button>
                            <button
                                onClick={resetAnimation}
                                className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 text-slate-300 transition-all"
                                title="Reset"
                            >
                                <RotateCcw size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Visualization Canvas */}
                    <div className="flex-1 relative bg-slate-950/50 rounded-lg border border-slate-700/30 overflow-x-auto overflow-y-hidden">
                        <svg className="w-full h-full min-w-[800px]" viewBox="0 0 800 300">
                            {/* Branch Lines */}
                            {branches.map(branch => (
                                <g key={branch.name}>
                                    <line
                                        x1="0"
                                        y1={branch.y}
                                        x2="800"
                                        y2={branch.y}
                                        stroke={branch.color}
                                        strokeWidth="2"
                                        strokeDasharray="5,5"
                                        opacity="0.3"
                                    />
                                    <text x="10" y={branch.y - 10} fill={branch.color} fontSize="12" className="font-mono">
                                        {branch.name}
                                    </text>
                                </g>
                            ))}

                            {/* Commits */}
                            {commits.map((commit, idx) => {
                                const branchData = branches.find(b => b.name === commit.branch);
                                if (!branchData) return null;

                                return (
                                    <motion.g
                                        key={commit.id}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                                    >
                                        <circle
                                            cx={commit.x}
                                            cy={branchData.y}
                                            r="8"
                                            fill={commit.color}
                                            stroke="white"
                                            strokeWidth="2"
                                        />
                                        <title>{commit.message}</title>
                                    </motion.g>
                                );
                            })}

                            {/* Legend */}
                            <g transform="translate(650, 20)">
                                <circle cx="10" cy="10" r="6" fill="#3b82f6" stroke="white" strokeWidth="2" />
                                <text x="20" y="15" fill="#94a3b8" fontSize="10">Commit</text>
                            </g>
                        </svg>
                    </div>

                    {/* Status Bar */}
                    <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                        <div className="flex items-center gap-1">
                            <GitCommit size={12} className="text-blue-400" />
                            <span>{commits.length} commits</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock size={12} className="text-amber-400" />
                            <span>{strategy === 'gitflow' ? '~2 weeks' : '~2 days'} to production</span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`.custom-scrollbar::-webkit-scrollbar{width:6px}.custom-scrollbar::-webkit-scrollbar-track{background:rgba(30,41,59,0.5);border-radius:4px}.custom-scrollbar::-webkit-scrollbar-thumb{background:rgba(100,116,139,0.5);border-radius:4px}.custom-scrollbar::-webkit-scrollbar-thumb:hover{background:rgba(100,116,139,0.7)}`}</style>
        </div>
    );
};

export default GitBranchingModule;
