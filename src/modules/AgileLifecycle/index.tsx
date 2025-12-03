import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, ChevronDown, RotateCcw, Target, GitBranch,
    Code2, CheckCircle, Clock, Lightbulb, Rocket,
    FileText, GitCommit, GitPullRequest, Activity, Layers, Tag
} from 'lucide-react';

type TicketStatus = 'backlog' | 'inProgress' | 'review' | 'done';
type Stage = 'planning' | 'coding' | 'deploying' | 'completed';

interface Ticket {
    id: string;
    title: string;
    jiraId: string;
    status: TicketStatus;
    branch?: string;
    commits?: string[];
    prNumber?: number;
    version?: string;
}

const initialTickets: Ticket[] = [
    { id: '1', title: 'Create User Authentication API', jiraId: 'PROJ-101', status: 'backlog' },
    { id: '2', title: 'Add Payment Gateway Integration', jiraId: 'PROJ-102', status: 'backlog' },
    { id: '3', title: 'Implement Email Notifications', jiraId: 'PROJ-103', status: 'backlog' },
];

const AgileLifecycleModule: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [stage, setStage] = useState<Stage>('planning');
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentCode, setCurrentCode] = useState('');
    const [expandedTheory, setExpandedTheory] = useState<Set<string>>(new Set(['overview']));
    const [metrics, setMetrics] = useState({ commits: 0, prs: 0, deployments: 0, leadTime: '0h' });

    const codeSnippets = [
        'export async function authenticate(req, res) {',
        '  const { username, password } = req.body;',
        '  const user = await User.findOne({ username });',
        '  if (!user) return res.status(401).json({ error: "Invalid credentials" });',
        '  const isValid = await bcrypt.compare(password, user.password);',
        '  if (isValid) {',
        '    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);',
        '    return res.json({ token });',
        '  }',
        '}'
    ];

    const runLifecycle = async (ticket: Ticket) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setSelectedTicket(ticket);
        setCurrentCode('');

        // Stage 1: Planning → In Progress
        setStage('planning');
        await sleep(1000);
        updateTicketStatus(ticket.id, 'inProgress');

        // Stage 2: Create branch
        const branchName = `feature/${ticket.jiraId.toLowerCase()}-${ticket.title.toLowerCase().replace(/\s+/g, '-').substring(0, 20)}`;
        updateTicket(ticket.id, { branch: branchName });
        await sleep(1500);

        // Stage 3: Coding (typing effect)
        setStage('coding');
        for (let i = 0; i < codeSnippets.length; i++) {
            await sleep(300);
            setCurrentCode(prev => prev + codeSnippets[i] + '\n');
        }
        await sleep(1000);

        // Stage 4: Commit
        const commitMsg = `feat: ${ticket.title} [${ticket.jiraId}]`;
        updateTicket(ticket.id, { commits: [commitMsg] });
        setMetrics(prev => ({ ...prev, commits: prev.commits + 1 }));
        await sleep(1500);

        // Stage 5: Open PR
        const prNumber = Math.floor(Math.random() * 900) + 100;
        updateTicket(ticket.id, { prNumber, status: 'review' });
        setMetrics(prev => ({ ...prev, prs: prev.prs + 1 }));
        await sleep(2000);

        // Stage 6: CI/CD Pipeline
        setStage('deploying');
        await sleep(2500);

        // Stage 7: Deploy & Version
        const version = `v1.${metrics.deployments + 1}.0`;
        updateTicket(ticket.id, { version, status: 'done' });
        setMetrics(prev => ({ ...prev, deployments: prev.deployments + 1, leadTime: '4h 23m' }));
        setStage('completed');

        await sleep(1500);
        setIsAnimating(false);
    };

    const updateTicketStatus = (id: string, status: TicketStatus) => {
        setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    };

    const updateTicket = (id: string, updates: Partial<Ticket>) => {
        setTickets(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    };

    const reset = () => {
        setTickets(initialTickets);
        setSelectedTicket(null);
        setStage('planning');
        setCurrentCode('');
        setMetrics({ commits: 0, prs: 0, deployments: 0, leadTime: '0h' });
        setIsAnimating(false);
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
            title: 'Agile-to-DevOps: The Complete Pipeline',
            icon: <Activity size={16} className="text-blue-400" />,
            content: (
                <div className="space-y-2.5">
                    <p className="text-xs text-slate-300 leading-relaxed">
                        Modern software teams link <strong className="text-blue-300">every commit to a Jira ticket ID</strong>. This creates an
                        automated audit trail from user story → code → deployment.
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="rounded p-2 border border-blue-500/30 bg-blue-500/10">
                            <div className="font-semibold text-blue-300 mb-1">Planning</div>
                            <div className="text-slate-400">Jira/Linear</div>
                        </div>
                        <div className="rounded p-2 border border-emerald-500/30 bg-emerald-500/10">
                            <div className="font-semibold text-emerald-300 mb-1">Coding</div>
                            <div className="text-slate-400">GitHub/GitLab</div>
                        </div>
                        <div className="rounded p-2 border border-violet-500/30 bg-violet-500/10">
                            <div className="font-semibold text-violet-300 mb-1">Deploying</div>
                            <div className="text-slate-400">CI/CD Pipeline</div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 'commit-linking',
            title: 'Commit Message Best Practices',
            icon: <GitCommit size={16} className="text-green-400" />,
            content: (
                <div className="space-y-2">
                    <div className="rounded p-2.5 border border-green-500/30 bg-green-500/10">
                        <code className="text-xs text-green-300 block mb-1">feat: Add user authentication [PROJ-101]</code>
                        <p className="text-[10px] text-slate-400">✓ Type + Description + Jira ID</p>
                    </div>
                    <div className="rounded p-2 border border-slate-700/50 bg-slate-800/50 text-[10px]">
                        <div className="text-slate-300 mb-1"><strong>Conventional Commits:</strong></div>
                        <div className="text-slate-400">• feat: New feature</div>
                        <div className="text-slate-400">• fix: Bug fix</div>
                        <div className="text-slate-400">• docs: Documentation</div>
                        <div className="text-slate-400">• refactor: Code restructure</div>
                    </div>
                </div>
            ),
        },
        {
            id: 'semantic-versioning',
            title: 'Semantic Versioning (SemVer)',
            icon: <Tag size={16} className="text-amber-400" />,
            content: (
                <div className="space-y-2">
                    <div className="rounded p-2.5 border border-amber-500/30 bg-amber-500/10">
                        <div className="flex items-center gap-2 mb-2">
                            <code className="text-lg font-bold text-amber-300">v1.2.3</code>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-[10px]">
                            <div>
                                <div className="text-red-300 font-semibold">MAJOR (1)</div>
                                <div className="text-slate-400">Breaking changes</div>
                            </div>
                            <div>
                                <div className="text-blue-300 font-semibold">MINOR (2)</div>
                                <div className="text-slate-400">New features</div>
                            </div>
                            <div>
                                <div className="text-green-300 font-semibold">PATCH (3)</div>
                                <div className="text-slate-400">Bug fixes</div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 'interview-tips',
            title: 'Interview Ace Tips',
            icon: <Target size={16} className="text-purple-400" />,
            content: (
                <div className="space-y-2">
                    <div className="rounded p-2.5 border border-purple-500/30 bg-purple-500/10">
                        <p className="text-xs text-slate-300">
                            <Lightbulb size={12} className="inline mr-1 text-purple-400" />
                            <strong>"We enforce Jira IDs in commit messages via pre-commit hooks for full traceability"</strong>
                        </p>
                    </div>
                    <div className="rounded p-2.5 border border-cyan-500/30 bg-cyan-500/10">
                        <p className="text-xs text-slate-300">
                            "We use GitOps: Every deployment is a Git commit. Infrastructure as Code ensures reproducibility."
                        </p>
                    </div>
                </div>
            ),
        },
    ];



    const getStageIcon = (currentStage: Stage) => {
        return {
            planning: <FileText size={16} />,
            coding: <Code2 size={16} />,
            deploying: <Rocket size={16} />,
            completed: <CheckCircle size={16} />
        }[currentStage];
    };

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
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-600/20 border border-blue-500/30 flex items-center justify-center">
                            <Layers size={20} className="text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-100">Agile Lifecycle: Jira → Production</h1>
                            <p className="text-xs text-slate-500">Complete GitOps workflow with automated traceability</p>
                        </div>
                    </div>

                    {/* Metrics Dashboard */}
                    <div className="flex items-center gap-3 text-xs">
                        <div className="rounded-lg px-3 py-2 bg-blue-500/10 border border-blue-500/30">
                            <div className="text-blue-300 font-semibold">{metrics.commits}</div>
                            <div className="text-slate-500 text-[10px]">Commits</div>
                        </div>
                        <div className="rounded-lg px-3 py-2 bg-emerald-500/10 border border-emerald-500/30">
                            <div className="text-emerald-300 font-semibold">{metrics.prs}</div>
                            <div className="text-slate-500 text-[10px]">PRs</div>
                        </div>
                        <div className="rounded-lg px-3 py-2 bg-violet-500/10 border border-violet-500/30">
                            <div className="text-violet-300 font-semibold">{metrics.deployments}</div>
                            <div className="text-slate-500 text-[10px]">Deploys</div>
                        </div>
                        <div className="rounded-lg px-3 py-2 bg-amber-500/10 border border-amber-500/30">
                            <div className="text-amber-300 font-semibold">{metrics.leadTime}</div>
                            <div className="text-slate-500 text-[10px]">Lead Time</div>
                        </div>
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

                {/* Bottom: Lifecycle Simulator */}
                <div className="bg-slate-900/40 rounded-xl border border-slate-700/40 p-4 overflow-hidden flex flex-col">
                    {/* Controls */}
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-700/50 flex-shrink-0">
                        <div className="flex items-center gap-2">
                            {getStageIcon(stage)}
                            <h2 className="text-sm font-semibold text-slate-200">
                                Lifecycle Simulator
                                {selectedTicket && <span className="text-xs text-slate-500 ml-2">→ {selectedTicket.jiraId}</span>}
                            </h2>
                        </div>

                        <button
                            onClick={reset}
                            disabled={isAnimating}
                            className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 text-slate-300 transition-all disabled:opacity-50"
                            title="Reset"
                        >
                            <RotateCcw size={16} />
                        </button>
                    </div>

                    {/* 3-Stage Kanban View */}
                    <div className="flex-1 grid grid-cols-3 gap-3 overflow-hidden">
                        {/* Column 1: Planning (Jira) */}
                        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3 flex flex-col overflow-hidden">
                            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-blue-500/20">
                                <FileText size={14} className="text-blue-400" />
                                <h3 className="text-xs font-semibold text-blue-300">Planning (Jira)</h3>
                            </div>
                            <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
                                {tickets.filter(t => t.status === 'backlog' || t.status === 'inProgress').map(ticket => (
                                    <motion.div
                                        key={ticket.id}
                                        layout
                                        className={`rounded-lg p-2.5 border cursor-pointer transition-all ${ticket.status === 'backlog'
                                            ? 'bg-slate-800/50 border-slate-700/50 hover:border-blue-500/50'
                                            : 'bg-blue-500/20 border-blue-500/50'
                                            } ${isAnimating ? 'pointer-events-none' : ''}`}
                                        onClick={() => !isAnimating && runLifecycle(ticket)}
                                    >
                                        <div className="flex items-start justify-between mb-1">
                                            <code className="text-[10px] text-blue-400 font-mono">{ticket.jiraId}</code>
                                            {ticket.status === 'inProgress' && (
                                                <div className="flex items-center gap-1 text-[10px] text-blue-300">
                                                    <Clock size={10} />
                                                    <span>In Progress</span>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-300">{ticket.title}</p>
                                        {ticket.branch && (
                                            <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-400">
                                                <GitBranch size={10} />
                                                <code className="font-mono truncate">{ticket.branch}</code>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                                {tickets.filter(t => t.status === 'backlog').length === 0 &&
                                    tickets.filter(t => t.status === 'inProgress').length === 0 && (
                                        <div className="text-center text-xs text-slate-500 py-4">No tickets</div>
                                    )}
                            </div>
                        </div>

                        {/* Column 2: Coding (GitHub) */}
                        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3 flex flex-col overflow-hidden">
                            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-emerald-500/20">
                                <Code2 size={14} className="text-emerald-400" />
                                <h3 className="text-xs font-semibold text-emerald-300">Coding (GitHub)</h3>
                            </div>
                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                {stage === 'coding' && selectedTicket && (
                                    <div className="space-y-2">
                                        <div className="rounded p-2 bg-slate-950/50 border border-emerald-500/30">
                                            <div className="text-[10px] text-emerald-400 mb-1 font-mono">src/auth/authenticate.ts</div>
                                            <pre className="text-[9px] text-slate-300 font-mono leading-tight overflow-x-auto">
                                                {currentCode}
                                                <span className="animate-pulse">|</span>
                                            </pre>
                                        </div>
                                        {selectedTicket.commits && selectedTicket.commits.length > 0 && (
                                            <div className="rounded p-2 bg-blue-500/10 border border-blue-500/30">
                                                <div className="flex items-center gap-1 text-[10px] text-blue-300 mb-1">
                                                    <GitCommit size={10} />
                                                    <span>Commit</span>
                                                </div>
                                                <code className="text-[9px] text-slate-300 block">{selectedTicket.commits[0]}</code>
                                            </div>
                                        )}
                                        {selectedTicket.prNumber && (
                                            <div className="rounded p-2 bg-amber-500/10 border border-amber-500/30">
                                                <div className="flex items-center gap-1 text-[10px] text-amber-300 mb-1">
                                                    <GitPullRequest size={10} />
                                                    <span>Pull Request #{selectedTicket.prNumber}</span>
                                                </div>
                                                <div className="text-[9px] text-slate-400">Ready for review</div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {stage !== 'coding' && tickets.filter(t => t.status === 'review').length === 0 && (
                                    <div className="text-center text-xs text-slate-500 py-4">No active coding</div>
                                )}
                            </div>
                        </div>

                        {/* Column 3: Deploying (CI/CD) */}
                        <div className="rounded-lg border border-violet-500/30 bg-violet-500/5 p-3 flex flex-col overflow-hidden">
                            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-violet-500/20">
                                <Rocket size={14} className="text-violet-400" />
                                <h3 className="text-xs font-semibold text-violet-300">Deploying (CI/CD)</h3>
                            </div>
                            <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
                                {stage === 'deploying' && selectedTicket && (
                                    <div className="space-y-2">
                                        <div className="rounded p-2 bg-blue-500/10 border border-blue-500/30">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-[10px] text-blue-300">Build</span>
                                                <CheckCircle size={10} className="text-emerald-400" />
                                            </div>
                                            <div className="text-[9px] text-slate-400">Passed in 2m 14s</div>
                                        </div>
                                        <div className="rounded p-2 bg-blue-500/10 border border-blue-500/30">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-[10px] text-blue-300">Test</span>
                                                <CheckCircle size={10} className="text-emerald-400" />
                                            </div>
                                            <div className="text-[9px] text-slate-400">137 tests passed</div>
                                        </div>
                                        <div className="rounded p-2 bg-violet-500/20 border border-violet-500/50 animate-pulse">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-[10px] text-violet-300">Deploy</span>
                                                <Activity size={10} className="text-violet-400 animate-spin" />
                                            </div>
                                            <div className="text-[9px] text-slate-400">Deploying to production...</div>
                                        </div>
                                    </div>
                                )}
                                {tickets.filter(t => t.status === 'done').map(ticket => (
                                    <motion.div
                                        key={ticket.id}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="rounded-lg p-2.5 bg-emerald-500/20 border border-emerald-500/50"
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <code className="text-[10px] text-emerald-400 font-mono">{ticket.jiraId}</code>
                                            <CheckCircle size={12} className="text-emerald-400" />
                                        </div>
                                        <p className="text-xs text-slate-300 mb-2">{ticket.title}</p>
                                        {ticket.version && (
                                            <div className="flex items-center gap-1 text-[10px]">
                                                <Tag size={10} className="text-amber-400" />
                                                <code className="text-amber-400">{ticket.version}</code>
                                                <span className="text-slate-500">deployed</span>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                                {stage !== 'deploying' && tickets.filter(t => t.status === 'done').length === 0 && (
                                    <div className="text-center text-xs text-slate-500 py-4">No deployments</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Status Bar */}
                    <div className="mt-2 pt-2 border-t border-slate-700/50 flex items-center justify-between text-xs">
                        <div className="text-slate-400">
                            {isAnimating ? (
                                <span className="flex items-center gap-1">
                                    <Activity size={12} className="animate-spin text-blue-400" />
                                    Simulating lifecycle...
                                </span>
                            ) : (
                                'Click a ticket to start the lifecycle simulation'
                            )}
                        </div>
                        {selectedTicket && (
                            <div className="flex items-center gap-2 text-slate-500">
                                <span>•</span>
                                <span>Branch: {selectedTicket.branch?.substring(0, 30)}...</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`.custom-scrollbar::-webkit-scrollbar{width:6px}.custom-scrollbar::-webkit-scrollbar-track{background:rgba(30,41,59,0.5);border-radius:4px}.custom-scrollbar::-webkit-scrollbar-thumb{background:rgba(100,116,139,0.5);border-radius:4px}.custom-scrollbar::-webkit-scrollbar-thumb:hover{background:rgba(100,116,139,0.7)}`}</style>
        </div>
    );
};

export default AgileLifecycleModule;
