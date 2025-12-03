import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, ChevronDown, PlayCircle, RotateCcw, Server, Lock, Zap,
    CheckCircle, XCircle, Clock, Code2, Target, Lightbulb,
    Activity, Cloud, Box, Layers, AlertTriangle, FileCode
} from 'lucide-react';

type WorkflowStage = 'idle' | 'checkout' | 'build' | 'test' | 'deploy' | 'completed' | 'failed';

interface WorkflowExample {
    id: string;
    name: string;
    description: string;
    yaml: string;
    stages: string[];
}

const workflows: WorkflowExample[] = [
    {
        id: 'basic',
        name: 'Basic CI/CD',
        description: 'Simple Node.js build and test',
        yaml: `name: CI Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - run: npm run build`,
        stages: ['Checkout', 'Setup Node', 'Install', 'Test', 'Build']
    },
    {
        id: 'snowflake',
        name: 'Snowflake Deploy',
        description: 'Deploy to Snowflake with secrets',
        yaml: `name: Snowflake Deployment
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: self-hosted  # Inside firewall
    environment: production
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Snowflake
        env:
          SNOWFLAKE_ACCOUNT: \${{ secrets.SF_ACCOUNT }}
          SNOWFLAKE_PRIVATE_KEY: \${{ secrets.SF_KEY }}
        run: |
          snowsql -f migrations/*.sql`,
        stages: ['Checkout', 'Deploy SQL', 'Verify']
    },
    {
        id: 'matrix',
        name: 'Matrix Strategy',
        description: 'Test across multiple versions',
        yaml: `name: Matrix Build
on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node: [16, 18, 20]
        os: [ubuntu, windows]
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: \${{ matrix.node }}
      - run: npm test`,
        stages: ['Checkout', 'Setup Matrix', 'Test 9x Combinations']
    }
];

const GitHubActionsModule: React.FC = () => {
    const [selectedWorkflow, setSelectedWorkflow] = useState(workflows[0]);
    const [stage, setStage] = useState<WorkflowStage>('idle');
    const [currentStep, setCurrentStep] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [expandedTheory, setExpandedTheory] = useState<Set<string>>(new Set(['overview']));
    const [logs, setLogs] = useState<string[]>([]);

    const runWorkflow = async () => {
        if (isRunning) return;
        setIsRunning(true);
        setStage('checkout');
        setLogs([]);
        setCurrentStep(0);

        const stages: WorkflowStage[] = ['checkout', 'build', 'test', 'deploy'];

        for (let i = 0; i < stages.length; i++) {
            setCurrentStep(i);
            setStage(stages[i]);
            addLog(`[${stages[i].toUpperCase()}] Starting...`);
            await sleep(1500);

            if (Math.random() > 0.95) {
                setStage('failed');
                addLog(`[${stages[i].toUpperCase()}] ❌ Failed`);
                setIsRunning(false);
                return;
            }

            addLog(`[${stages[i].toUpperCase()}] ✅ Completed`);
        }

        setStage('completed');
        addLog('[WORKFLOW] 🎉 All jobs completed successfully');
        await sleep(1000);
        setIsRunning(false);
    };

    const reset = () => {
        setStage('idle');
        setCurrentStep(0);
        setLogs([]);
        setIsRunning(false);
    };

    const addLog = (message: string) => {
        setLogs(prev => [...prev, `${new Date().toLocaleTimeString()} ${message}`]);
    };

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
            title: 'GitHub Actions: Core Concepts',
            icon: <Activity size={16} className="text-blue-400" />,
            content: (
                <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="rounded p-2 border border-blue-500/30 bg-blue-500/10">
                            <div className="font-semibold text-blue-300 mb-1 flex items-center gap-1">
                                <FileCode size={12} />
                                Workflow
                            </div>
                            <div className="text-slate-400">YAML file in .github/workflows/</div>
                        </div>
                        <div className="rounded p-2 border border-emerald-500/30 bg-emerald-500/10">
                            <div className="font-semibold text-emerald-300 mb-1 flex items-center gap-1">
                                <Zap size={12} />
                                Events
                            </div>
                            <div className="text-slate-400">Triggers: push, PR, schedule</div>
                        </div>
                        <div className="rounded p-2 border border-violet-500/30 bg-violet-500/10">
                            <div className="font-semibold text-violet-300 mb-1 flex items-center gap-1">
                                <Layers size={12} />
                                Jobs
                            </div>
                            <div className="text-slate-400">Run in parallel by default</div>
                        </div>
                        <div className="rounded p-2 border border-amber-500/30 bg-amber-500/10">
                            <div className="font-semibold text-amber-300 mb-1 flex items-center gap-1">
                                <Server size={12} />
                                Runners
                            </div>
                            <div className="text-slate-400">GitHub or Self-hosted</div>
                        </div>
                    </div>
                    <code className="block text-[10px] p-2 rounded bg-slate-950/50 border border-slate-700/50 text-slate-300 font-mono">
                        Workflow → Events → Jobs → Steps → Actions
                    </code>
                </div>
            ),
        },
        {
            id: 'runners',
            title: 'Runners: GitHub-Hosted vs Self-Hosted',
            icon: <Server size={16} className="text-green-400" />,
            content: (
                <div className="space-y-2">
                    <div className="rounded p-2.5 border border-green-500/30 bg-green-500/10">
                        <div className="flex items-center gap-2 mb-1.5">
                            <Cloud size={12} className="text-green-400" />
                            <span className="text-xs font-semibold text-green-300">GitHub-Hosted (ubuntu-latest)</span>
                        </div>
                        <ul className="text-[10px] text-slate-300 space-y-0.5">
                            <li>✓ Free 2,000 minutes/month</li>
                            <li>✓ Pre-installed tools (Node, Python, Docker)</li>
                            <li>✗ No access to private networks</li>
                        </ul>
                    </div>
                    <div className="rounded p-2.5 border border-amber-500/30 bg-amber-500/10">
                        <div className="flex items-center gap-2 mb-1.5">
                            <Server size={12} className="text-amber-400" />
                            <span className="text-xs font-semibold text-amber-300">Self-Hosted (Your VM)</span>
                        </div>
                        <ul className="text-[10px] text-slate-300 space-y-0.5">
                            <li>✓ Access to Snowflake inside firewall</li>
                            <li>✓ Custom tools & configurations</li>
                            <li>✗ You manage updates & security</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            id: 'secrets',
            title: 'Secrets Management',
            icon: <Lock size={16} className="text-red-400" />,
            content: (
                <div className="space-y-2">
                    <p className="text-xs text-slate-300">
                        <strong className="text-red-300">Never hardcode credentials!</strong> Use GitHub Secrets.
                    </p>
                    <div className="rounded p-2 border border-red-500/30 bg-red-500/10">
                        <code className="text-[10px] text-red-300 block mb-1">
                            env:<br />
                            &nbsp;&nbsp;DB_PASSWORD: {'${{ secrets.DB_PASSWORD }}'}
                        </code>
                        <p className="text-[10px] text-slate-400">Secrets are encrypted at rest and masked in logs</p>
                    </div>
                    <div className="rounded p-2 bg-slate-800/50 border border-slate-700/50 text-[10px]">
                        <div className="text-slate-300 mb-1"><strong>3 Types:</strong></div>
                        <div className="text-slate-400">• Repository: All workflows</div>
                        <div className="text-slate-400">• Environment: Prod-only with approval</div>
                        <div className="text-slate-400">• Organization: Shared across repos</div>
                    </div>
                </div>
            ),
        },
        {
            id: 'matrix',
            title: 'Matrix Strategy: Test at Scale',
            icon: <Box size={16} className="text-purple-400" />,
            content: (
                <div className="space-y-2">
                    <div className="rounded p-2.5 border border-purple-500/30 bg-purple-500/10">
                        <code className="text-[10px] text-purple-300 block font-mono mb-2">
                            strategy:<br />
                            &nbsp;&nbsp;matrix:<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;node: [16, 18, 20]<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;os: [ubuntu, windows]
                        </code>
                        <p className="text-[10px] text-slate-300">
                            Runs <strong className="text-purple-300">6 parallel jobs</strong> (3 versions × 2 OS)
                        </p>
                    </div>
                    <div className="rounded p-2 bg-slate-800/50 border border-slate-700/50 text-[10px] text-slate-400">
                        <AlertTriangle size={10} className="inline text-amber-400 mr-1" />
                        Interview: "Matrix lets us test compatibility across Node 16/18/20 without duplicating YAML"
                    </div>
                </div>
            ),
        },
        {
            id: 'interview-tips',
            title: 'Interview Ace Tips',
            icon: <Target size={16} className="text-cyan-400" />,
            content: (
                <div className=" space-y-2">
                    <div className="rounded p-2.5 border border-cyan-500/30 bg-cyan-500/10">
                        <div className="flex items-center gap-1 mb-1">
                            <Lightbulb size={12} className="text-cyan-400" />
                            <span className="text-xs font-semibold text-cyan-300">Q: GitHub vs Jenkins?</span>
                        </div>
                        <p className="text-[10px] text-slate-300">
                            "GitHub Actions is fully managed (no server maintenance) and YAML-based. Jenkins requires self-hosting but offers more plugins."
                        </p>
                    </div>
                    <div className="rounded p-2.5 border border-blue-500/30 bg-blue-500/10">
                        <div className="flex items-center gap-1 mb-1">
                            <Lightbulb size={12} className="text-blue-400" />
                            <span className="text-xs font-semibold text-blue-300">Q: How to debug failed runs?</span>
                        </div>
                        <p className="text-[10px] text-slate-300">
                            "Enable debug logging with secrets: ACTIONS_STEP_DEBUG=true. Check raw logs for stderr. Re-run with SSH (tmate action) for live debugging."
                        </p>
                    </div>
                    <div className="rounded p-2.5 border border-emerald-500/30 bg-emerald-500/10">
                        <div className="flex items-center gap-1 mb-1">
                            <Lightbulb size={12} className="text-emerald-400" />
                            <span className="text-xs font-semibold text-emerald-300">Pro Tip: Caching</span>
                        </div>
                        <code className="text-[10px] text-emerald-300 block">
                            - uses: actions/cache@v3<br />
                            &nbsp;&nbsp;with:<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;path: ~/.npm<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;key: {'${{ runner.os }}-node-${{ hashFiles(\'**/package-lock.json\') }}'}
                        </code>
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
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30 flex items-center justify-center">
                            <Activity size={20} className="text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-100">GitHub Actions Mastery</h1>
                            <p className="text-xs text-slate-500">Deep dive into CI/CD automation</p>
                        </div>
                    </div>

                    {/* Workflow Selector */}
                    <div className="flex items-center gap-2">
                        {workflows.map(wf => (
                            <button
                                key={wf.id}
                                onClick={() => { setSelectedWorkflow(wf); reset(); }}
                                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${selectedWorkflow.id === wf.id
                                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                                    : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:bg-slate-700/50'
                                    }`}
                            >
                                {wf.name}
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Main Content - Split View */}
            <div className="flex-1 grid grid-rows-2 gap-4 overflow-hidden">
                {/* Top: Theory Deck */}
                <div className="bg-slate-900/40 rounded-xl border border-slate-700/40 p-4 overflow-hidden flex flex-col">
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-700/50 flex-shrink-0">
                        <BookOpen size={16} className="text-cyan-400" />
                        <h2 className="text-sm font-semibold text-slate-200">Core Concepts & Interview Prep</h2>
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

                {/* Bottom: Workflow Visualizer */}
                <div className="bg-slate-900/40 rounded-xl border border-slate-700/40 p-4 overflow-hidden flex flex-col">
                    {/* Controls */}
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-700/50 flex-shrink-0">
                        <div className="flex items-center gap-2">
                            <Code2 size={16} className="text-green-400" />
                            <h2 className="text-sm font-semibold text-slate-200">{selectedWorkflow.name}</h2>
                            <span className="text-xs text-slate-500">- {selectedWorkflow.description}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={runWorkflow}
                                disabled={isRunning}
                                className="p-2 rounded-lg bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 text-green-300 transition-all disabled:opacity-50"
                                title="Run Workflow"
                            >
                                <PlayCircle size={16} />
                            </button>
                            <button
                                onClick={reset}
                                disabled={isRunning}
                                className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 text-slate-300 transition-all disabled:opacity-50"
                                title="Reset"
                            >
                                <RotateCcw size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Main Visualizer Area */}
                    <div className="flex-1 grid grid-cols-2 gap-3 overflow-hidden">
                        {/* Left: YAML Code */}
                        <div className="rounded-lg border border-slate-700/30 bg-slate-950/50 p-3 overflow-hidden flex flex-col">
                            <div className="text-xs text-slate-400 mb-2 font-mono">.github/workflows/ci.yml</div>
                            <pre className="flex-1 overflow-y-auto text-[10px] font-mono text-slate-300 leading-relaxed custom-scrollbar">
                                {selectedWorkflow.yaml}
                            </pre>
                        </div>

                        {/* Right: Live Execution */}
                        <div className="rounded-lg border border-slate-700/30 bg-slate-950/50 p-3 overflow-hidden flex flex-col">
                            <div className="text-xs text-slate-400 mb-2 flex items-center gap-2">
                                <Activity size={12} className={isRunning ? 'animate-spin text-blue-400' : ''} />
                                Workflow Execution
                            </div>

                            {/* Stage Progress */}
                            <div className="mb-3 flex items-center gap-2">
                                {['checkout', 'build', 'test', 'deploy'].map((s, idx) => (
                                    <div key={s} className="flex-1">
                                        <div className={`rounded px-2 py-1 text-center text-[10px] font-medium border transition-all ${stage === s ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' :
                                            idx < currentStep ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' :
                                                stage === 'failed' && idx === currentStep ? 'bg-red-500/20 border-red-500/50 text-red-300' :
                                                    'bg-slate-800/50 border-slate-700/50 text-slate-500'
                                            }`}>
                                            {s === stage && isRunning ? (
                                                <Activity size={10} className="inline animate-spin mr-1" />
                                            ) : idx < currentStep || stage === 'completed' ? (
                                                <CheckCircle size={10} className="inline mr-1" />
                                            ) : stage === 'failed' && idx === currentStep ? (
                                                <XCircle size={10} className="inline mr-1" />
                                            ) : (
                                                <Clock size={10} className="inline mr-1" />
                                            )}
                                            {s}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Logs */}
                            <div className="flex-1 rounded bg-slate-900/80 border border-slate-700/30 p-2 overflow-y-auto custom-scrollbar">
                                {logs.length === 0 ? (
                                    <div className="text-xs text-slate-500 text-center py-4">Click "Run Workflow" to start</div>
                                ) : (
                                    <div className="space-y-0.5">
                                        {logs.map((log, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="text-[10px] font-mono text-slate-300"
                                            >
                                                {log}
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Status Badge */}
                            {stage !== 'idle' && !isRunning && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className={`mt-2 rounded p-2 text-center text-xs font-semibold ${stage === 'completed' ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-300' :
                                        'bg-red-500/20 border border-red-500/50 text-red-300'
                                        }`}
                                >
                                    {stage === 'completed' ? '✅ Workflow Completed Successfully' : '❌ Workflow Failed'}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`.custom-scrollbar::-webkit-scrollbar{width:6px}.custom-scrollbar::-webkit-scrollbar-track{background:rgba(30,41,59,0.5);border-radius:4px}.custom-scrollbar::-webkit-scrollbar-thumb{background:rgba(100,116,139,0.5);border-radius:4px}.custom-scrollbar::-webkit-scrollbar-thumb:hover{background:rgba(100,116,139,0.7)}`}</style>
        </div>
    );
};

export default GitHubActionsModule;
