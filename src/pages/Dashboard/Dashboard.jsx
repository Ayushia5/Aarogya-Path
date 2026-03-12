import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Grid, Bookmark, Shield, PiggyBank,
    TrendingUp, ArrowUpRight,
    ChevronRight, Activity, Info, Plus, BarChart3, MapPin
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import KPICard from '../../components/KPICard/KPICard';
import RiskGauge from '../../components/RiskGauge/RiskGauge';
import useAuthStore from '../../stores/useAuthStore';
import useEstimatorStore from '../../stores/useEstimatorStore';
import { db } from '../../services/firebaseConfig';
import { collection, query, where, doc, onSnapshot } from 'firebase/firestore';
import { sampleProviders, infrastructureGaps } from '../../data/providersData';

const initialChartData = [
    { name: 'Today', value: 0 },
];

const Dashboard = () => {
    const [savedProviders, setSavedProviders] = useState([]);
    const [estimates, setEstimates] = useState([]);
    const [dailyTip, setDailyTip] = useState(
        "Stay hydrated and maintain a balanced diet for optimal health."
    );

    const navigate = useNavigate();
    const { user } = useAuthStore();

    useEffect(() => {
        let unsubscribeUser = () => {};
        let unsubscribeEstimates = () => {};

        if (user?.uid) {
            const estimatesQuery = query(
                collection(db, 'estimates'),
                where('userId', '==', user.uid)
            );
            
            unsubscribeEstimates = onSnapshot(estimatesQuery, (snapshot) => {
                const fetchedEstimates = [];
                snapshot.forEach(doc => {
                    fetchedEstimates.push({ id: doc.id, ...doc.data() });
                });
                fetchedEstimates.sort((a, b) => {
                    const d1 = a.createdAt?.toDate ? a.createdAt.toDate() : new Date();
                    const d2 = b.createdAt?.toDate ? b.createdAt.toDate() : new Date();
                    return d1 - d2;
                });
                setEstimates(fetchedEstimates);
            }, (error) => {
                console.error("Error fetching estimates:", error);
            });

            const userDocRef = doc(db, 'users', user.uid);
            unsubscribeUser = onSnapshot(userDocRef, (docSnap) => {
                if (docSnap.exists()) {
                    const savedIds = docSnap.data().savedProviders || [];
                    const resolvedProviders = savedIds.map(id => sampleProviders.find(p => p.id === id)).filter(Boolean);
                    setSavedProviders(resolvedProviders);
                    
                    if (resolvedProviders.length > 0) {
                        const firstCity = resolvedProviders[0].city;
                        if (infrastructureGaps[firstCity]) {
                            setDailyTip(`Health Tip for ${firstCity}: ${infrastructureGaps[firstCity].tips}`);
                        }
                    }
                }
            }, (error) => {
                console.error("Error fetching saved providers:", error);
            });
        }

        return () => {
            unsubscribeUser();
            unsubscribeEstimates();
        };
    }, [user?.uid]);

    const firstName = user?.displayName ? user.displayName.split(' ')[0] : 'Sarah';

    const displayEstimates = estimates.length > 0 
        ? estimates.map(e => ({ name: new Date(e.createdAt?.toDate() || Date.now()).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), value: e.estimatedCost })) 
        : initialChartData;
    
    let totalSavings = 0;
    savedProviders.forEach(p => {
        const costStr = p.estimatedCost.replace('₹', '').replace(',', '');
        const costNum = parseInt(costStr, 10);
        if(!isNaN(costNum)) totalSavings += costNum * 0.15;
    });

    const averageRisk = estimates.length > 0 
        ? Math.round(estimates.reduce((acc, curr) => acc + curr.riskScore, 0) / estimates.length)
        : 20;

    const riskLabel = averageRisk > 40 ? "HIGH RISK" : averageRisk > 15 ? "MEDIUM RISK" : "SAFE ZONE";
    const riskColor = averageRisk > 40 ? "#E05252" : averageRisk > 15 ? "#F5A623" : "#0FB1B1";

    return (
        <div className="max-w-7xl mx-auto px-4 py-16 space-y-12">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0 border-b border-health-border pb-10">
                <div>
                    <span className="text-[10px] font-black text-primary-teal uppercase tracking-[0.3em] mb-4 block">Overview</span>
                    <h1 className="text-4xl md:text-5xl font-black text-primary-navy tracking-tighter leading-none mb-4">
                        Welcome back, <span className="text-gradient">{firstName}</span>
                    </h1>
                    <p className="text-health-text-secondary text-lg font-medium">Monitoring your healthcare costs and risk profiles.</p>
                </div>
                <div className="flex space-x-4">
                    <button 
                        onClick={() => {
                            useEstimatorStore.getState().resetEstimator();
                            navigate('/cost-estimator/step-1');
                        }}
                        className="btn-primary shadow-xl shadow-primary-teal/20"
                    >
                        <Plus size={18} />
                        <span>New Estimate</span>
                    </button>
                </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <KPICard
                    title="Total Estimates"
                    value={estimates.length}
                    trend="Historical"
                    icon={<Grid size={20} />}
                    iconBgColor="bg-blue-50 text-blue-600"
                />
                <KPICard
                    title="Providers Saved"
                    value={savedProviders.length}
                    trend="In network"
                    icon={<Bookmark size={20} />}
                    iconBgColor="bg-purple-50 text-purple-600"
                />
                <KPICard
                    title="Average Risk"
                    value={riskLabel}
                    trend="Live Score"
                    icon={<Shield size={20} />}
                    iconBgColor="bg-amber-50 text-amber-600"
                />
                <KPICard
                    title="Est. Savings"
                    value={Math.round(totalSavings)}
                    trend="+15% Projected"
                    isCurrency={true}
                    icon={<PiggyBank size={20} />}
                    iconBgColor="bg-teal-50 text-teal-600"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Savings Chart Area */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 card-premium p-10 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <BarChart3 size={120} className="text-primary-teal" />
                    </div>
                    <div className="flex justify-between items-start mb-12 relative z-10">
                        <div>
                            <h4 className="text-xl font-black text-primary-navy mb-2">Estimated Savings</h4>
                            <p className="text-sm font-medium text-health-text-secondary">Based on provider selection vs. market average</p>
                        </div>
                        <div className="text-right">
                            <h3 className="text-4xl font-black text-primary-teal tabular-nums">₹{Math.round(totalSavings).toLocaleString('en-IN')}</h3>
                            <p className="text-[10px] font-black text-health-success flex items-center justify-end uppercase tracking-widest mt-2">
                                <TrendingUp size={14} className="mr-2" />
                                Optimal Projection
                            </p>
                        </div>
                    </div>

                    <div className="h-72 w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={displayEstimates}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0FB1B1" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#0FB1B1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="#F1F5F9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748B', fontSize: 11, fontWeight: 700 }}
                                    dy={15}
                                />
                                <YAxis hide={true} />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '24px',
                                        border: 'none',
                                        backgroundColor: '#0A2540',
                                        color: '#fff',
                                        boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                                        padding: '16px'
                                    }}
                                    itemStyle={{ color: '#0FB1B1', fontWeight: 800 }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#0FB1B1"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                    animationDuration={2000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Risk Analysis Card */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="card-premium p-10 flex flex-col items-center text-center justify-between group"
                >
                    <div className="w-full text-left mb-10">
                        <h4 className="text-xl font-black text-primary-navy mb-2">Cost Risk Profile</h4>
                        <p className="text-sm font-medium text-health-text-secondary">Comprehensive exposure benchmark</p>
                    </div>

                    <div className="relative py-4 scale-110">
                        <RiskGauge value={averageRisk} label={riskLabel} color={riskColor} />
                    </div>

                    <div className="w-full space-y-8 mt-12 bg-health-bg/50 p-6 rounded-[32px] border border-health-border">
                        <div className="space-y-3">
                            <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.2em] mb-1">
                                <span className="text-health-text-muted">Avg Pricing Delta</span>
                                <span className="text-primary-teal">-12% Saved</span>
                            </div>
                            <div className="w-full h-2.5 bg-white rounded-full overflow-hidden shadow-inner">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '88%' }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="h-full bg-primary-teal rounded-full"
                                ></motion.div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.2em] mb-1">
                                <span className="text-health-text-muted">Network Coverage</span>
                                <span className="text-primary-navy">78% Optimal</span>
                            </div>
                            <div className="w-full h-2.5 bg-white rounded-full overflow-hidden shadow-inner">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '78%' }}
                                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                                    className="h-full bg-primary-navy rounded-full"
                                ></motion.div>
                            </div>
                        </div>
                    </div>

                    <Link to="/cost-estimator/step-1" className="mt-8 text-xs font-black text-primary-teal flex items-center hover:translate-x-1 transition-transform uppercase tracking-widest group">
                        Recalculate Now <ChevronRight size={14} className="ml-2" />
                    </Link>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 gap-8 pt-8">
                {/* Saved Providers Table */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="card-premium overflow-hidden"
                >
                    <div className="p-8 border-b border-health-border flex justify-between items-center bg-white">
                        <div>
                            <h4 className="text-xl font-black text-primary-navy mb-1">Saved Providers</h4>
                            <p className="text-sm font-medium text-health-text-secondary">Your preferred medical network</p>
                        </div>
                        <Link to="/providers" className="text-xs font-black text-primary-teal hover:text-primary-navy transition-colors flex items-center space-x-2 uppercase tracking-widest">
                            <span>Browse Catalog</span>
                            <ArrowUpRight size={16} />
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-health-bg/30">
                                    <th className="px-8 py-5 text-[10px] font-black text-health-text-muted uppercase tracking-[0.2em]">Provider Profile</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-health-text-muted uppercase tracking-[0.2em]">Category</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-health-text-muted uppercase tracking-[0.2em] text-right">Est. Cost</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-health-text-muted uppercase tracking-[0.2em] text-center">Quality Score</th>
                                    <th className="px-8 py-5"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-health-border">
                                {savedProviders.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-16 text-center">
                                            <div className="max-w-xs mx-auto">
                                                <Bookmark size={40} className="mx-auto text-health-bg mb-4" />
                                                <p className="text-sm font-bold text-health-text-secondary mb-6">You haven't saved any providers yet to your network.</p>
                                                <Link to="/providers" className="btn-outline !py-2.5 !px-6 text-xs">Explore Providers</Link>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    savedProviders.map((p) => (
                                        <tr key={p.id} className="hover:bg-primary-teal/5 transition-all group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white border border-health-border shadow-sm group-hover:scale-110 transition-transform">
                                                        <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-black text-primary-navy group-hover:text-primary-teal transition-colors">{p.name}</div>
                                                        <div className="text-[10px] font-bold text-health-text-muted uppercase tracking-widest flex items-center mt-1">
                                                            <MapPin size={10} className="mr-1" /> {p.location}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-xs font-bold text-health-text-secondary">{p.specialty}</span>
                                            </td>
                                            <td className="px-8 py-6 text-right font-black text-primary-navy tabular-nums text-sm">
                                                {p.estimatedCost}
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <span className={`text-[10px] font-black px-3 py-1.5 rounded-full border-2 ${p.color}`}>
                                                    {p.quality}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <Link to={`/providers/${p.id}`} className="w-10 h-10 rounded-xl bg-health-bg flex items-center justify-center text-health-text-muted hover:bg-primary-teal hover:text-white transition-all shadow-sm">
                                                    <ArrowUpRight size={18} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
