import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    BookOpen, GitCommit, Snowflake, GitBranch, Layers, Github,
    Rocket, ArrowRight, Sparkles
} from 'lucide-react';

const OverviewPage: React.FC = () => {
    const navigate = useNavigate();

    const modules = [
        {
            icon: <BookOpen size={32} />,
            title: 'CI/CD Theory',
            description: 'Master the fundamentals of Continuous Integration and Deployment',
            path: '/theory',
            color: 'blue',
            gradient: 'from-blue-500/20 to-cyan-500/20',
            border: 'border-blue-500/30',
        },
        {
            icon: <GitCommit size={32} />,
            title: 'Pipeline Simulator',
            description: 'Interactive visualization of CI/CD pipeline stages',
            path: '/simulator',
            color: 'green',
            gradient: 'from-green-500/20 to-emerald-500/20',
            border: 'border-green-500/30',
        },
        {
            icon: <Snowflake size={32} />,
            title: 'Snowflake Pipeline',
            description: 'Database deployment patterns with secrets management',
            path: '/snowflake',
            color: 'cyan',
            gradient: 'from-cyan-500/20 to-blue-500/20',
            border: 'border-cyan-500/30',
        },
        {
            icon: <GitBranch size={32} />,
            title: 'Git Branching',
            description: 'Compare Git Flow vs Trunk-Based Development strategies',
            path: '/branching',
            color: 'violet',
            gradient: 'from-violet-500/20 to-purple-500/20',
            border: 'border-violet-500/30',
        },
        {
            icon: <Layers size={32} />,
            title: 'Agile Lifecycle',
            description: 'From Jira ticket to production deployment',
            path: '/agile',
            color: 'amber',
            gradient: 'from-amber-500/20 to-orange-500/20',
            border: 'border-amber-500/30',
        },
        {
            icon: <Github size={32} />,
            title: 'GitHub Actions',
            description: 'Workflow automation with live execution simulator',
            path: '/actions',
            color: 'indigo',
            gradient: 'from-indigo-500/20 to-violet-500/20',
            border: 'border-indigo-500/30',
        },
    ];

    return (
        <div className="h-full w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200 overflow-auto">
            <div
                className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                }}
            />

            <div className="relative max-w-7xl mx-auto px-6 py-16">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles size={40} className="text-violet-400" />
                        </motion.div>
                        <h1 className="text-6xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            DevOps Dashboard
                        </h1>
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <Rocket size={40} className="text-cyan-400" />
                        </motion.div>
                    </div>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-4">
                        An interactive learning platform for mastering modern DevOps practices
                    </p>
                    <p className="text-sm text-slate-500">
                        Choose a module below to begin your journey
                    </p>
                </motion.div>

                {/* Module Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((module, index) => (
                        <motion.div
                            key={module.path}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className="group cursor-pointer"
                            onClick={() => navigate(module.path)}
                        >
                            <div className={`h-full rounded-2xl bg-gradient-to-br ${module.gradient} border ${module.border} p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-${module.color}-500/20`}>
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-xl bg-${module.color}-500/10 text-${module.color}-400 group-hover:scale-110 transition-transform duration-300`}>
                                        {module.icon}
                                    </div>
                                    <ArrowRight
                                        size={20}
                                        className={`text-${module.color}-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-slate-100 mb-2">
                                    {module.title}
                                </h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    {module.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800/50 border border-slate-700/50 text-sm text-slate-400">
                        <Sparkles size={16} className="text-violet-400" />
                        <span>Built with React, TypeScript, Vite & Tailwind CSS</span>
                        <Sparkles size={16} className="text-cyan-400" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default OverviewPage;
