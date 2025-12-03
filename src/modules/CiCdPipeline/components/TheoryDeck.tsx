import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap,
    Code2,
    Rocket,
    FileCode,
    Database,
    Lightbulb,
    AlertTriangle,
    BookOpen,
    ChevronDown
} from 'lucide-react';

interface TheorySection {
    id: string;
    title: string;
    icon: React.ReactNode;
    content: React.ReactNode;
}

const TheoryDeck: React.FC = () => {
    const [expandedSections, setExpandedSections] = useState<Set<string>>(
        new Set(['concept', 'config']) // Expand first two sections by default
    );

    const toggleSection = (id: string) => {
        setExpandedSections(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const sections: TheorySection[] = [
        {
            id: 'concept',
            title: 'CI vs CD: The Core Concept',
            icon: <Zap size={18} className="text-violet-400" />,
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                    <Code2 size={16} className="text-blue-400" />
                                </div>
                                <span className="font-semibold text-blue-300">CI</span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                <strong className="text-blue-300">Continuous Integration</strong> —
                                Automatically lint, test, and validate every commit before merge.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                    <Rocket size={16} className="text-emerald-400" />
                                </div>
                                <span className="font-semibold text-emerald-300">CD</span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                <strong className="text-emerald-300">Continuous Deployment</strong> —
                                Automatically release validated code to staging/production.
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                        <p className="text-xs text-slate-300 leading-relaxed">
                            <span className="text-violet-400 font-mono">→</span> CI catches bugs <em>before</em> merge.{' '}
                            <span className="text-violet-400 font-mono">→</span> CD ships code <em>after</em> validation.
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 'config',
            title: 'The Config: YAML Pipelines',
            icon: <FileCode size={18} className="text-amber-400" />,
            content: (
                <div className="space-y-3">
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Pipelines are defined as code in <code className="text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded font-mono text-[11px]">.github/workflows/deploy.yml</code>
                    </p>
                    <div className="bg-slate-900 rounded-lg p-3 border border-slate-700/50 font-mono text-[11px] leading-relaxed overflow-x-auto">
                        <pre className="text-slate-300">
                            <span className="text-violet-400">name:</span> Deploy Pipeline{'\n'}
                            <span className="text-violet-400">on:</span>{'\n'}
                            {'  '}<span className="text-amber-400">push:</span>{'\n'}
                            {'    '}<span className="text-slate-500">branches:</span> [main]{'\n'}
                            {'\n'}
                            <span className="text-violet-400">jobs:</span>{'\n'}
                            {'  '}<span className="text-emerald-400">lint:</span>{'\n'}
                            {'    '}<span className="text-slate-500">runs-on:</span> ubuntu-latest{'\n'}
                            {'    '}<span className="text-slate-500">steps:</span>{'\n'}
                            {'      '}- run: npm run lint{'\n'}
                            {'\n'}
                            {'  '}<span className="text-emerald-400">test:</span>{'\n'}
                            {'    '}<span className="text-slate-500">needs:</span> lint{'\n'}
                            {'    '}<span className="text-slate-500">steps:</span>{'\n'}
                            {'      '}- run: npm run test
                        </pre>
                    </div>
                    <p className="text-[10px] text-slate-500 italic">
                        The <code className="text-violet-400">needs:</code> keyword creates stage dependencies.
                    </p>
                </div>
            )
        },
        {
            id: 'de-context',
            title: 'Data Engineer Context',
            icon: <Database size={18} className="text-cyan-400" />,
            content: (
                <div className="space-y-3">
                    <p className="text-xs text-slate-400 leading-relaxed">
                        For Data Engineers, CI/CD means automating your data pipeline lifecycle:
                    </p>
                    <div className="space-y-2">
                        {[
                            { stage: 'Lint', tool: 'SQLFluff / dbt compile', desc: 'Validate SQL syntax & style' },
                            { stage: 'Test', tool: 'pytest / dbt test', desc: 'Test DAGs, transformations' },
                            { stage: 'Deploy', tool: 'Terraform / Snowflake CLI', desc: 'Push to Snowflake, Airflow' }
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3 bg-slate-800/40 rounded-lg p-2.5 border border-slate-700/30">
                                <div className="w-6 h-6 rounded bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-[10px] font-bold text-cyan-400">{i + 1}</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-semibold text-slate-200">{item.stage}</span>
                                        <code className="text-[10px] text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">{item.tool}</code>
                                    </div>
                                    <p className="text-[10px] text-slate-500">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        },
        {
            id: 'interview',
            title: 'Interview Tip: Fail Fast',
            icon: <Lightbulb size={18} className="text-yellow-400" />,
            content: (
                <div className="space-y-3">
                    <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-3">
                        <p className="text-xs text-slate-300 leading-relaxed">
                            <strong className="text-yellow-300">"What happens if a test fails?"</strong>
                        </p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                        <p className="text-xs text-slate-300 leading-relaxed">
                            <span className="text-red-400 font-semibold">→ The pipeline stops immediately.</span>{' '}
                            This is called <strong className="text-violet-400">"Fail Fast"</strong> —
                            no point building/deploying broken code.
                        </p>
                    </div>
                    <div className="flex items-start gap-2 text-[10px] text-slate-500">
                        <AlertTriangle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>
                            Resources are not wasted. Engineers get immediate feedback.
                            Production stays safe.
                        </span>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700/50">
                <BookOpen size={20} className="text-violet-400" />
                <h2 className="text-lg font-bold text-slate-100">Theory Deck</h2>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {sections.map(section => (
                    <div
                        key={section.id}
                        className="rounded-lg border border-slate-700/50 overflow-hidden"
                        style={{ backgroundColor: 'rgba(30, 41, 59, 0.7)' }} // slate-800 with opacity
                    >
                        <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full flex items-center justify-between p-3 transition-colors"
                            style={{ backgroundColor: 'transparent' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(51, 65, 85, 0.4)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <div className="flex items-center gap-2">
                                {section.icon}
                                <span className="text-sm font-medium text-slate-200">{section.title}</span>
                            </div>
                            <motion.div
                                animate={{ rotate: expandedSections.has(section.id) ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronDown size={16} className="text-slate-400" />
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {expandedSections.has(section.id) && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-3 pb-3">
                                        {section.content}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TheoryDeck;
