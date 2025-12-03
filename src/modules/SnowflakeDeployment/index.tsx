import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDown, BookOpen, Lightbulb, Database, ShieldCheck, Key, User, UserCog,
    GitBranch, CheckCircle2, Snowflake, Lock, Workflow, RefreshCw, Zap, Brain,
    CheckCircle, XCircle, Github, Code2, AlertCircle, Terminal, FileCode
} from 'lucide-react';

interface TheorySection {
    id: string;
    title: string;
    icon: React.ReactNode;
    content: React.ReactNode;
}

const sections: TheorySection[] = [
    {
        id: 'service-accounts',
        title: 'Service Accounts: Why Not Your Email?',
        icon: <UserCog size={20} className="text-cyan-400" />,
        content: (
            <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    <div className="relative overflow-hidden rounded-lg p-3 border border-red-500/30" style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)' }}>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }}>
                                <User size={14} className="text-red-400" />
                            </div>
                            <span className="font-semibold text-red-300 text-sm">Human User</span>
                            <XCircle size={14} className="text-red-400 ml-auto" />
                        </div>
                        <code className="text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded block mb-2">user@company.com</code>
                        <ul className="text-xs text-slate-400 space-y-1">
                            <li>• Password expires / MFA</li>
                            <li>• Tied to employee lifecycle</li>
                            <li>• Personal credentials risk</li>
                        </ul>
                    </div>
                    <div className="relative overflow-hidden rounded-lg p-3 border border-emerald-500/30" style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)' }}>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
                                <UserCog size={14} className="text-emerald-400" />
                            </div>
                            <span className="font-semibold text-emerald-300 text-sm">Service Account</span>
                            <CheckCircle size={14} className="text-emerald-400 ml-auto" />
                        </div>
                        <code className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded block mb-2">SVC_GITHUB_ACTIONS</code>
                        <ul className="text-xs text-slate-400 space-y-1">
                            <li>• No human dependency</li>
                            <li>• Key-based auth (no MFA)</li>
                            <li>• Dedicated for automation</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'rsa-auth',
        title: 'RSA Key Pair Authentication',
        icon: <Key size={18} className="text-amber-400" />,
        content: (
            <div className="space-y-2.5">
                <p className="text-sm text-slate-300 leading-relaxed">
                    <ShieldCheck size={14} className="text-amber-400 inline mr-1" />
                    Use <strong className="text-amber-300">RSA-2048 key pairs</strong> instead of passwords.
                </p>
                <div className="rounded p-2.5 border border-slate-700/50 font-mono text-xs" style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)' }}>
                    <span className="text-slate-500"># Generate key pair: </span>
                    <span className="text-cyan-400">openssl genrsa 2048 | openssl pkcs8 -topk8 -out rsa_key.p8</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded p-2 border border-red-500/20" style={{ backgroundColor: 'rgba(239, 68, 68, 0.05)' }}>
                        <span className="text-red-400">❌ Passwords:</span><span className="text-slate-500"> rotation, logging risks</span>
                    </div>
                    <div className="rounded p-2 border border-emerald-500/20" style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)' }}>
                        <span className="text-emerald-400">✓ RSA:</span><span className="text-slate-500"> cryptographic proof</span>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'secrets-management',
        title: 'Secrets Management Best Practices',
        icon: <Lock size={18} className="text-pink-400" />,
        content: (
            <div className="space-y-2.5">
                <p className="text-sm text-slate-300 leading-relaxed">Never hardcode credentials! Use <strong className="text-pink-300">GitHub Secrets</strong>.</p>
                <div className="space-y-2">
                    <div className="rounded p-2.5 border border-emerald-500/20" style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)' }}>
                        <div className="flex items-center gap-2 mb-1.5">
                            <CheckCircle2 size={12} className="text-emerald-400" />
                            <span className="text-xs font-semibold text-emerald-300">Repository Secrets</span>
                        </div>
                        <code className="text-[10px] text-slate-400 block">SNOWFLAKE_PRIVATE_KEY, SNOWFLAKE_ACCOUNT</code>
                    </div>
                    <div className="rounded p-2.5 border border-violet-500/20" style={{ backgroundColor: 'rgba(139, 92, 246, 0.05)' }}>
                        <div className="flex items-center gap-2 mb-1.5">
                            <CheckCircle2 size={12} className="text-violet-400" />
                            <span className="text-xs font-semibold text-violet-300">Environment Secrets</span>
                        </div>
                        <code className="text-[10px] text-slate-400 block">PROD_ROLE, PROD_WAREHOUSE</code>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'snowflake-rbac',
        title: 'Snowflake RBAC: Role Hierarchy',
        icon: <ShieldCheck size={18} className="text-blue-400" />,
        content: (
            <div className="space-y-2.5">
                <p className="text-sm text-slate-300 leading-relaxed">Follow <strong className="text-blue-300">least privilege principle</strong>.</p>
                <div className="space-y-2">
                    <div className="rounded p-2.5 border border-slate-700/50" style={{ backgroundColor: 'rgba(30, 41, 59, 0.6)' }}>
                        <div className="text-xs font-mono">
                            <div className="text-red-400">❌ ACCOUNTADMIN</div>
                            <div className="text-slate-500 pl-2">└─ Too much power for CI/CD</div>
                        </div>
                    </div>
                    <div className="rounded p-2.5 border border-emerald-700/50" style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)' }}>
                        <div className="text-xs font-mono space-y-1">
                            <div className="text-emerald-400">✓ Custom Role: DEV_ETL_ROLE</div>
                            <div className="text-slate-400 pl-2">├─ USAGE on DEV_DB</div>
                            <div className="text-slate-400 pl-2">├─ CREATE TABLE on DEV_SCHEMA</div>
                            <div className="text-slate-400 pl-2">└─ OPERATE on DEV_WH</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'branching-strategy',
        title: 'Branching Strategy for Data Pipelines',
        icon: <Workflow size={18} className="text-green-400" />,
        content: (
            <div className="space-y-2.5">
                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded p-2.5 border border-blue-500/30" style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)' }}>
                        <div className="flex items-center gap-2 mb-1.5">
                            <GitBranch size={14} className="text-blue-400" />
                            <span className="text-xs font-semibold text-blue-300">develop</span>
                        </div>
                        <div className="text-[10px] text-slate-400 space-y-0.5">
                            <div>• Feature branches merge here</div>
                            <div>• Auto-deploy to DEV</div>
                        </div>
                    </div>
                    <div className="rounded p-2.5 border border-violet-500/30" style={{ backgroundColor: 'rgba(139, 92, 246, 0.08)' }}>
                        <div className="flex items-center gap-2 mb-1.5">
                            <GitBranch size={14} className="text-violet-400" />
                            <span className="text-xs font-semibold text-violet-300">main</span>
                        </div>
                        <div className="text-[10px] text-slate-400 space-y-0.5">
                            <div>• Production-ready code</div>
                            <div>• Deploy to PROD</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'rollback-strategy',
        title: 'Rollback & Recovery Strategies',
        icon: <RefreshCw size={18} className="text-orange-400" />,
        content: (
            <div className="space-y-2.5">
                <div className="space-y-2">
                    <div className="rounded p-2.5 border border-emerald-500/20" style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)' }}>
                        <div className="flex items-center gap-2 mb-1">
                            <Zap size={12} className="text-emerald-400" />
                            <span className="text-xs font-semibold text-emerald-300">Blue-Green Deployment</span>
                        </div>
                        <p className="text-[10px] text-slate-400">Deploy to new schema, switch views atomically</p>
                    </div>
                    <div className="rounded p-2.5 border border-blue-500/20" style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}>
                        <div className="flex items-center gap-2 mb-1">
                            <Database size={12} className="text-blue-400" />
                            <span className="text-xs font-semibold text-blue-300">Time Travel</span>
                        </div>
                        <code className="text-[10px] text-blue-400 block">SELECT * FROM TABLE AT(OFFSET -3600)</code>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'github-tricks',
        title: 'GitHub Actions: Snowflake Tricks & Tips',
        icon: <Github size={18} className="text-violet-400" />,
        content: (
            <div className="space-y-3">
                <div className="rounded-lg p-3 border border-violet-500/30" style={{ backgroundColor: 'rgba(139, 92, 246, 0.08)' }}>
                    <div className="flex items-center gap-2 mb-2">
                        <Code2 size={14} className="text-violet-400" />
                        <span className="text-sm font-bold text-violet-300">Reusable Workflows</span>
                    </div>
                    <p className="text-xs text-slate-300 mb-2">Create a centralized workflow for Snowflake deployments:</p>
                    <div className="rounded p-2 border border-slate-700/50 font-mono text-[10px]" style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)' }}>
                        <div className="text-cyan-400">.github/workflows/snowflake-deploy.yml</div>
                        <div className="text-slate-500 mt-1">on: workflow_call</div>
                    </div>
                </div>

                <div className="rounded-lg p-3 border border-emerald-500/30" style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)' }}>
                    <div className="flex items-center gap-2 mb-2">
                        <Terminal size={14} className="text-emerald-400" />
                        <span className="text-sm font-bold text-emerald-300">Environment Protection Rules</span>
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1">
                        <li>• Required reviewers for PROD</li>
                        <li>• Wait timer (e.g., 5 min) for smoke tests</li>
                        <li>• Branch protection on main</li>
                    </ul>
                </div>

                <div className="rounded-lg p-3 border border-amber-500/30" style={{ backgroundColor: 'rgba(251, 191, 36, 0.08)' }}>
                    <div className="flex items-center gap-2 mb-2">
                        <FileCode size={14} className="text-cyan-400" />
                        <span className="text-sm font-bold text-cyan-300">Matrix Strategy for Multi-Region</span>
                    </div>
                    <div className="rounded p-2 border border-slate-700/50 font-mono text-[10px]" style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)' }}>
                        <div className="text-pink-400">strategy:</div>
                        <div className="text-slate-400 pl-2">matrix:</div>
                        <div className="text-slate-400 pl-4">region: [us-east-1, eu-west-1]</div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'knowledge-board',
        title: 'Snowflake CI/CD Knowledge Board',
        icon: <Lightbulb size={18} className="text-yellow-400" />,
        content: (
            <div className="space-y-3">
                <div className="rounded-lg p-3 border border-blue-500/30" style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)' }}>
                    <div className="flex items-center gap-2 mb-2">
                        <AlertCircle size={14} className="text-blue-400" />
                        <span className="text-sm font-bold text-blue-300">Schema Change Management</span>
                    </div>
                    <p className="text-xs text-slate-300">Use versioned migration files:</p>
                    <code className="text-[10px] text-blue-400 block mt-1">V001__initial_schema.sql, V002__add_column.sql</code>
                </div>

                <div className="rounded-lg p-3 border border-emerald-500/30" style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)' }}>
                    <div className="flex items-center gap-2 mb-2">
                        <Database size={14} className="text-emerald-400" />
                        <span className="text-sm font-bold text-emerald-300">Zero-Downtime Deployments</span>
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1">
                        <li>• Deploy to SCHEMA_V2</li>
                        <li>• Test thoroughly</li>
                        <li>• Swap views to point to new schema</li>
                        <li>• Keep old schema for quick rollback</li>
                    </ul>
                </div>

                <div className="rounded-lg p-3 border border-violet-500/30" style={{ backgroundColor: 'rgba(139, 92, 246, 0.08)' }}>
                    <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck size={14} className="text-violet-400" />
                        <span className="text-sm font-bold text-violet-300">SQL Linting Tools</span>
                    </div>
                    <div className="text-xs text-slate-300 space-y-1">
                        <div>• <strong className="text-violet-400">SQLFluff:</strong> Industry standard</div>
                        <div>• <strong className="text-violet-400">SchemaChange:</strong> Snowflake-native tool</div>
                    </div>
                </div>

                <div className="rounded-lg p-3 border border-orange-500/30" style={{ backgroundColor: 'rgba(249, 115, 22, 0.08)' }}>
                    <div className="flex items-center gap-2 mb-2">
                        <Zap size={14} className="text-orange-400" />
                        <span className="text-sm font-bold text-orange-300">Performance Tips</span>
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1">
                        <li>• Use warehouse auto-resume/auto-suspend</li>
                        <li>• Cache GitHub Actions with @actions/cache</li>
                        <li>• Parallel execution for independent scripts</li>
                    </ul>
                </div>
            </div>
        )
    },
    {
        id: 'interview-qa',
        title: 'Interview Q&A: Critical Questions',
        icon: <Brain size={18} className="text-purple-400" />,
        content: (
            <div className="space-y-3">
                <div className="rounded-lg p-3 border border-purple-500/30" style={{ backgroundColor: 'rgba(168, 85, 247, 0.08)' }}>
                    <div className="flex items-center gap-2 mb-2">
                        <Lightbulb size={14} className="text-purple-400" />
                        <span className="text-sm font-bold text-purple-300">Q: Why use service accounts vs personal accounts?</span>
                    </div>
                    <p className="text-xs text-slate-300"><strong className="text-emerald-400">A:</strong> Service accounts are decoupled from employee lifecycle. If John Doe leaves, pipelines don't break. They use key-based auth (no MFA interruptions) and provide better audit trails.</p>
                </div>

                <div className="rounded-lg p-3 border border-blue-500/30" style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)' }}>
                    <div className="flex items-center gap-2 mb-2">
                        <Lightbulb size={14} className="text-blue-400" />
                        <span className="text-sm font-bold text-blue-300">Q: How do you handle PROD deployment failures?</span>
                    </div>
                    <p className="text-xs text-slate-300"><strong className="text-emerald-400">A:</strong> 1) Automated smoke tests post-deploy 2) Use GitHub Environments with wait timers 3) Keep previous version ready for quick revert 4) Leverage Snowflake Time Travel</p>
                </div>

                <div className="rounded-lg p-3 border border-amber-500/30" style={{ backgroundColor: 'rgba(251, 191, 36, 0.08)' }}>
                    <div className="flex items-center gap-2 mb-2">
                        <Lightbulb size={14} className="text-amber-400" />
                        <span className="text-sm font-bold text-amber-300">Q: Why not store secrets in GitHub repo?</span>
                    </div>
                    <p className="text-xs text-slate-300"><strong className="text-emerald-400">A:</strong> Git history is permanent! Even if you delete secrets later, they're in commit history. Use GitHub Secrets (encrypted at rest) or HashiCorp Vault.</p>
                </div>

                <div className="rounded-lg p-3 border border-cyan-500/30" style={{ backgroundColor: 'rgba(6, 182, 212, 0.08)' }}>
                    <div className="flex items-center gap-2 mb-2">
                        <Lightbulb size={14} className="text-cyan-400" />
                        <span className="text-sm font-bold text-cyan-300">Q: Repository vs Environment secrets?</span>
                    </div>
                    <p className="text-xs text-slate-300"><strong className="text-emerald-400">A:</strong> Repository secrets are available to all workflows. Environment secrets are scoped to specific environments and enable approval gates.</p>
                </div>

                <div className="rounded-lg p-3 border border-green-500/30" style={{ backgroundColor: 'rgba(34, 197, 94, 0.08)' }}>
                    <div className="flex items-center gap-2 mb-2">
                        <Lightbulb size={14} className="text-green-400" />
                        <span className="text-sm font-bold text-green-300">Q: How to test Snowflake deployments locally?</span>
                    </div>
                    <p className="text-xs text-slate-300"><strong className="text-emerald-400">A:</strong> Use SnowSQL CLI with --dry-run flag, or set up a local DEV database. Test DDL scripts with SQLFluff before pushing to GitHub.</p>
                </div>
            </div>
        )
    }
];

// TheoryDeck component
const TheoryDeck: React.FC = () => {
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['service-accounts']));

    const toggleSection = (id: string) => {
        setExpandedSections(prev => {
            const newSet = new Set(prev);
            newSet.has(id) ? newSet.delete(id) : newSet.add(id);
            return newSet;
        });
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700/50 flex-shrink-0">
                <BookOpen size={18} className="text-cyan-400" />
                <h2 className="text-base font-semibold text-slate-200">Knowledge Base</h2>
                <span className="text-xs text-slate-500 ml-auto">{expandedSections.size} of {sections.length} sections expanded</span>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <div className="space-y-2.5">
                    {sections.map(section => (
                        <div key={section.id} className="rounded-lg border border-slate-700/50 overflow-hidden" style={{ backgroundColor: 'rgba(30, 41, 59, 0.7)' }}>
                            <button onClick={() => toggleSection(section.id)} className="w-full flex items-center justify-between px-4 py-3 transition-colors hover:bg-slate-700/30">
                                <div className="flex items-center gap-2.5">
                                    {section.icon}
                                    <span className="text-sm font-medium text-slate-200">{section.title}</span>
                                </div>
                                <motion.div animate={{ rotate: expandedSections.has(section.id) ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                    <ChevronDown size={16} className="text-slate-400" />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {expandedSections.has(section.id) && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                                        <div className="px-4 pb-4">{section.content}</div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`.custom-scrollbar::-webkit-scrollbar{width:8px}.custom-scrollbar::-webkit-scrollbar-track{background:rgba(30,41,59,0.5);border-radius:4px}.custom-scrollbar::-webkit-scrollbar-thumb{background:rgba(100,116,139,0.5);border-radius:4px}.custom-scrollbar::-webkit-scrollbar-thumb:hover{background:rgba(100,116,139,0.7)}`}</style>
        </div>
    );
};

// Main Module Component - matching TheoryPage structure exactly
const SnowflakeDeploymentModule: React.FC = () => {
    return (
        <div className="h-full w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200 overflow-hidden relative p-6 flex flex-col">
            <div
                className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex-shrink-0"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border border-blue-500/30 flex items-center justify-center">
                        <Snowflake size={20} className="text-blue-400" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-100">Snowflake Deployment Pipeline</h1>
                        <p className="text-xs text-slate-500">CI/CD Best Practices with GitHub Actions</p>
                    </div>
                </div>
            </motion.div>

            <div className="flex-1 bg-slate-900/40 rounded-xl border border-slate-700/40 p-4 overflow-hidden">
                <TheoryDeck />
            </div>
        </div>
    );
};

export default SnowflakeDeploymentModule;
