import React from 'react';
import { motion } from 'framer-motion';
import {
    Plus, Grid, Bookmark, Shield, PiggyBank,
    TrendingUp, ArrowUpRight, Search,
    MoreHorizontal, ChevronRight, Activity
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import KPICard from '../../components/KPICard/KPICard';
import RiskGauge from '../../components/RiskGauge/RiskGauge';

const chartData = [
    { name: 'JAN', value: 400 },
    { name: 'FEB', value: 600 },
    { name: 'MAR', value: 550 },
    { name: 'APR', value: 900 },
    { name: 'MAY', value: 1100 },
    { name: 'JUN', value: 1250 },
];

const savedProviders = [
    { id: 1, name: 'Dr. Emily Chen', specialty: 'Orthopedics', cost: '$2,150', quality: 'High', color: 'bg-health-success/10 text-health-success border-health-success/20' },
    { id: 2, name: 'Dr. Michael Ross', specialty: 'Cardiology', cost: '$1,850', quality: 'High', color: 'bg-health-success/10 text-health-success border-health-success/20' },
    { id: 3, name: 'Summit Medical', specialty: 'Imaging Center', cost: '$450', quality: 'Avg', color: 'bg-health-warning/10 text-health-warning border-health-warning/20' },
];

const recentSearches = [
    { id: 1, procedure: 'MRI Lumbar Spine', context: 'Near San Francisco, CA', range: '$450–$1.2k', time: '2h ago' },
    { id: 2, procedure: 'Physical Therapy', context: 'Post-op Knee', range: '$75–$150', time: '1d ago' },
    { id: 3, procedure: 'Dermatology Consult', context: 'Video Visit', range: '$90–$200', time: '3d ago' },
];

const Dashboard = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div>
                    <h1 className="text-4xl font-bold text-primary-navy tracking-tight mb-2">Welcome back, Sarah</h1>
                    <p className="text-health-text-secondary text-lg">Here is your healthcare cost and risk overview for this month.</p>
                </div>
                <button className="btn-primary flex items-center space-x-2 px-6 py-3 shadow-xl shadow-primary-teal/20">
                    <Plus size={20} />
                    <span className="font-bold">New Estimate</span>
                </button>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                    title="Total Estimates"
                    value={12}
                    trend="↑ 2%"
                    icon={<Grid size={24} />}
                    iconBgColor="bg-blue-500/10"
                    iconColor="text-blue-500"
                />
                <KPICard
                    title="Providers Saved"
                    value={5}
                    trend="+1 new"
                    icon={<Bookmark size={24} />}
                    iconBgColor="bg-purple-500/10"
                    iconColor="text-purple-500"
                />
                <KPICard
                    title="Risk Level"
                    value="Low" // This will be handled as 0 in counter then manual override or just show "Low"
                    trend="Stable"
                    icon={<Shield size={24} />}
                    iconBgColor="bg-amber-500/10"
                    iconColor="text-amber-500"
                />
                <KPICard
                    title="Health Credits"
                    value={450}
                    trend="+50 pts"
                    isCurrency={true}
                    icon={<PiggyBank size={24} />}
                    iconBgColor="bg-primary-teal/10"
                    iconColor="text-primary-teal"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Savings Chart Area */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 card-premium p-8"
                >
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h4 className="text-lg font-bold text-primary-navy mb-1">Estimated Savings Over Time</h4>
                            <p className="text-sm text-health-text-secondary">Based on provider selection vs. market average</p>
                        </div>
                        <div className="text-right">
                            <h3 className="text-3xl font-bold text-primary-navy tabular-nums">$1,250</h3>
                            <p className="text-xs font-bold text-health-success flex items-center justify-end">
                                <TrendingUp size={14} className="mr-1" />
                                +15% vs last 6 months
                            </p>
                        </div>
                    </div>

                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0B9E9E" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#0B9E9E" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9AAAB8', fontSize: 10, fontWeight: 700 }}
                                />
                                <YAxis hide={true} />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                                        fontSize: '12px'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#0B9E9E"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Risk Analysis Card */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="card-premium p-8 flex flex-col items-center text-center justify-between"
                >
                    <div className="w-full">
                        <h4 className="text-lg font-bold text-primary-navy mb-1">Cost Risk Analysis</h4>
                        <p className="text-sm text-health-text-secondary mb-8">Your selected providers vs regional pricing</p>
                    </div>

                    <RiskGauge value={25} label="SAFE Zone" color="#4CAF7D" />

                    <div className="w-full space-y-6 mt-8">
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                <span className="text-health-text-secondary">Current Average</span>
                                <span className="text-primary-navy">-12%</span>
                            </div>
                            <div className="w-full h-2 bg-health-bg rounded-full overflow-hidden">
                                <div className="h-full bg-primary-teal rounded-full w-[88%]"></div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                <span className="text-health-text-secondary">Potential Savings</span>
                                <span className="text-primary-teal">$850/yr</span>
                            </div>
                            <div className="w-full h-2 bg-health-bg rounded-full overflow-hidden">
                                <div className="h-full bg-primary-teal rounded-full w-[45%]"></div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-health-border w-full">
                        <p className="text-xs text-health-text-secondary">
                            You are performing better than <span className="text-primary-navy font-bold">78% of users</span>.
                        </p>
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Saved Providers Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 card-premium overflow-hidden shadow-xl"
                >
                    <div className="p-6 border-b border-health-border flex justify-between items-center">
                        <h4 className="text-lg font-bold text-primary-navy">Saved Providers</h4>
                        <a href="/providers" className="text-sm font-bold text-primary-teal hover:underline flex items-center">
                            View all <ChevronRight size={16} />
                        </a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-health-bg/50">
                                    <th className="px-6 py-4 text-[10px] font-bold text-health-text-muted uppercase tracking-widest">Provider</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-health-text-muted uppercase tracking-widest">Specialty</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-health-text-muted uppercase tracking-widest text-right">Est. Cost</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-health-text-muted uppercase tracking-widest text-center">Quality</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-health-border">
                                {savedProviders.map((p) => (
                                    <tr key={p.id} className="hover:bg-health-bg/20 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 rounded-full overflow-hidden bg-primary-teal/10">
                                                    <img src={`https://i.pravatar.cc/100?u=${p.name}`} alt={p.name} />
                                                </div>
                                                <span className="text-sm font-bold text-primary-navy">{p.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-health-text-secondary">{p.specialty}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-sm font-bold text-primary-navy tabular-nums">{p.cost}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded-md border-2 ${p.color}`}>
                                                {p.quality}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-health-text-muted group-hover:text-primary-teal transition-colors">
                                                <ArrowUpRight size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Recent Searches */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card-premium p-8 flex flex-col"
                >
                    <div className="flex justify-between items-center mb-8">
                        <h4 className="text-lg font-bold text-primary-navy">Recent Searches</h4>
                        <button className="text-health-text-muted hover:text-primary-navy">
                            <MoreHorizontal size={20} />
                        </button>
                    </div>

                    <div className="flex-1 space-y-6">
                        {recentSearches.map((s) => (
                            <div key={s.id} className="flex items-start space-x-4 group cursor-pointer">
                                <div className="p-3 bg-primary-teal/5 rounded-2xl text-primary-teal group-hover:bg-primary-teal group-hover:text-white transition-all">
                                    <Search size={18} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <h5 className="text-sm font-bold text-primary-navy truncate pr-2 group-hover:text-primary-teal transition-colors">
                                            {s.procedure}
                                        </h5>
                                        <span className="text-sm font-bold text-primary-navy tabular-nums shrink-0">{s.range}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <p className="text-xs text-health-text-muted truncate">{s.context}</p>
                                        <span className="text-[10px] text-health-text-muted font-bold uppercase tracking-tighter">{s.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="mt-10 w-full py-3 rounded-xl border-2 border-health-border text-sm font-bold text-health-text-secondary hover:border-primary-teal hover:text-primary-teal transition-all flex items-center justify-center space-x-2">
                        <span>View Search History</span>
                        <ChevronRight size={16} />
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
