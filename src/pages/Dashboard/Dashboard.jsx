import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Grid, Bookmark, Shield, PiggyBank,
    TrendingUp, ArrowUpRight,
    ChevronRight, Activity
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
import { collection, query, where, getCountFromServer, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { sampleProviders, infrastructureGaps } from '../../data/providersData';
import { Info } from 'lucide-react';

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
            // First: Estimates Listener
            const estimatesQuery = query(
                collection(db, 'estimates'),
                where('userId', '==', user.uid)
            );
            
            unsubscribeEstimates = onSnapshot(estimatesQuery, (snapshot) => {
                const fetchedEstimates = [];
                snapshot.forEach(doc => {
                    fetchedEstimates.push({ id: doc.id, ...doc.data() });
                });
                // Sort by date created
                fetchedEstimates.sort((a, b) => {
                    const d1 = a.createdAt?.toDate ? a.createdAt.toDate() : new Date();
                    const d2 = b.createdAt?.toDate ? b.createdAt.toDate() : new Date();
                    return d1 - d2;
                });
                setEstimates(fetchedEstimates);
            }, (error) => {
                console.error("Error fetching estimates:", error);
            });

            // Second: Saved Providers Listener
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

    // Real Data calculations
    const displayEstimates = estimates.length > 0 
        ? estimates.map(e => ({ name: new Date(e.createdAt?.toDate() || Date.now()).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), value: e.estimatedCost })) 
        : initialChartData;
    
    let totalSavings = 0;
    savedProviders.forEach(p => {
        const costStr = p.estimatedCost.replace('₹', '').replace(',', '');
        const costNum = parseInt(costStr, 10);
        if(!isNaN(costNum)) totalSavings += costNum * 0.15; // Rough estimate of savings via platform
    });

    const averageRisk = estimates.length > 0 
        ? Math.round(estimates.reduce((acc, curr) => acc + curr.riskScore, 0) / estimates.length)
        : 20;

    const riskLabel = averageRisk > 40 ? "HIGH RISK" : averageRisk > 15 ? "MEDIUM RISK" : "SAFE ZONE";
    const riskColor = averageRisk > 40 ? "#E05252" : averageRisk > 15 ? "#F5A623" : "#4CAF7D";

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div>
                    <h1 className="text-4xl font-bold text-primary-navy tracking-tight mb-2">Welcome back, {firstName}</h1>
                    <p className="text-health-text-secondary text-lg">Here is your healthcare cost and risk overview for this month.</p>
                </div>
                <button 
                    onClick={() => {
                        useEstimatorStore.getState().resetEstimator();
                        navigate('/cost-estimator/step-1');
                    }}
                    className="btn-primary"
                >
                    New Estimate
                </button>
            </div>

            {/* Preventive Health Tip */}
            <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary-teal/10 border border-primary-teal/20 rounded-2xl p-4 flex items-start space-x-4 shadow-sm"
            >
                <div className="p-2 bg-primary-teal/20 rounded-full text-primary-teal shrink-0">
                    <Info size={20} />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-primary-navy mb-1">Personalized Preventive Tip</h4>
                    <p className="text-sm text-health-text-secondary leading-relaxed">
                        {dailyTip}
                    </p>
                </div>
            </motion.div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                    title="Total Estimates"
                    value={estimates.length}
                    trend="Historical"
                    icon={<Grid size={24} />}
                    iconBgColor="bg-blue-500/10"
                    iconColor="text-blue-500"
                />
                <KPICard
                    title="Providers Saved"
                    value={savedProviders.length}
                    trend="In network"
                    icon={<Bookmark size={24} />}
                    iconBgColor="bg-purple-500/10"
                    iconColor="text-purple-500"
                />
                <KPICard
                    title="Average Risk"
                    value={riskLabel}
                    trend="Based on estimates"
                    icon={<Shield size={24} />}
                    iconBgColor="bg-amber-500/10"
                    iconColor="text-amber-500"
                />
                <KPICard
                    title="Estimated Savings"
                    value={Math.round(totalSavings)}
                    trend="+15% overall"
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
                    className="lg:col-span-2 card-premium backdrop-blur-md bg-white/70 border border-white/20 shadow-xl shadow-primary-teal/5 p-8"
                >
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h4 className="text-lg font-bold text-primary-navy mb-1">Estimated Savings Over Time</h4>
                            <p className="text-sm text-health-text-secondary">Based on provider selection vs. market average</p>
                        </div>
                        <div className="text-right">
                            <h3 className="text-3xl font-bold text-primary-navy tabular-nums">₹{Math.round(totalSavings).toLocaleString('en-IN')}</h3>
                            <p className="text-xs font-bold text-health-success flex items-center justify-end">
                                <TrendingUp size={14} className="mr-1" />
                                Projecting based on selections
                            </p>
                        </div>
                    </div>

                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={displayEstimates}>
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
                                    interval="preserveStartEnd"
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
                    className="card-premium backdrop-blur-md bg-white/70 border border-white/20 shadow-xl shadow-primary-teal/5 p-8 flex flex-col items-center text-center justify-between"
                >
                    <div className="w-full">
                        <h4 className="text-lg font-bold text-primary-navy mb-1">Personalized Cost Risk</h4>
                        <p className="text-sm text-health-text-secondary mb-8">Average risk profile across your estimates</p>
                    </div>

                    <RiskGauge value={averageRisk} label={riskLabel} color={riskColor} />

                    <div className="w-full space-y-6 mt-8">
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                <span className="text-health-text-secondary">Avg Pricing Delta</span>
                                <span className="text-primary-navy">-12% estimated</span>
                            </div>
                            <div className="w-full h-2 bg-health-bg rounded-full overflow-hidden">
                                <div className="h-full bg-primary-teal rounded-full" style={{ width: '88%' }}></div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                <span className="text-health-text-secondary">Potential Savings</span>
                                <span className="text-primary-teal">₹{Math.round(totalSavings).toLocaleString('en-IN')}/yr</span>
                            </div>
                            <div className="w-full h-2 bg-health-bg rounded-full overflow-hidden">
                                <div className="h-full bg-primary-teal rounded-full" style={{ width: '45%' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-health-border w-full">
                        <p className="text-xs text-health-text-secondary">
                            Your costs are optimized relative to <span className="text-primary-navy font-bold">regional averages</span>.
                        </p>
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Saved Providers Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card-premium backdrop-blur-md bg-white/70 border border-white/20 shadow-xl shadow-primary-teal/5 overflow-hidden shadow-xl"
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
                                {savedProviders.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-health-text-muted text-sm">
                                            You haven't saved any providers yet.
                                        </td>
                                    </tr>
                                ) : (
                                    savedProviders.map((p) => (
                                        <tr key={p.id} className="hover:bg-health-bg/20 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 rounded-full overflow-hidden bg-primary-teal/10">
                                                        <img src={p.imageUrl} alt={p.name} />
                                                    </div>
                                                    <span className="text-sm font-bold text-primary-navy">{p.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-health-text-secondary">{p.specialty}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="text-sm font-bold text-primary-navy tabular-nums">{p.estimatedCost}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`text-[10px] font-bold px-2 py-1 rounded-md border-2 ${p.color}`}>
                                                    {p.quality}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <a href={`/providers/${p.id}`} className="text-health-text-muted group-hover:text-primary-teal transition-colors inline-block">
                                                    <ArrowUpRight size={18} />
                                                </a>
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
