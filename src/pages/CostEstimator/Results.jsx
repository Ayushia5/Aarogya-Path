import React from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, Download, Share2,
    HelpCircle, AlertTriangle, CheckCircle2,
    Calendar, CreditCard, ArrowRight, TrendingUp, Info
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import useEstimatorStore from '../../stores/useEstimatorStore';
import useAuthStore from '../../stores/useAuthStore';
import { db, auth } from '../../services/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import RiskGauge from '../../components/RiskGauge/RiskGauge';
import CostComparisonCard from '../../components/CostComparisonCard/CostComparisonCard';
import AlertBanner from '../../components/AlertBanner/AlertBanner';
import { medicalProcedures } from '../../data/medicalProcedures';

const Results = () => {
    const { selectedProcedures, patientData } = useEstimatorStore();
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const hasSavedRef = React.useRef(false);

    const allProceduresFlat = medicalProcedures.flatMap(cat => cat.procedures);

    const procedureDetails = selectedProcedures.map(name => {
        const data = allProceduresFlat.find(p => p.name === name);
        return data || { name, minCost: 5000, maxCost: 15000 };
    });

    const formatINR = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(val);
    };

    const procedureData = procedureDetails.map(proc => ({
        name: proc.name,
        cost: `${formatINR(proc.minCost)} - ${formatINR(proc.maxCost)}`
    }));

    const totalMinCost = procedureDetails.reduce((sum, p) => sum + p.minCost, 0);
    const totalMaxCost = procedureDetails.reduce((sum, p) => sum + p.maxCost, 0);
    const avgTotalCost = (totalMinCost + totalMaxCost) / 2;
    const monthlyIncome = (patientData.income || 75000) / 12;

    const riskScoreRaw = (avgTotalCost / (monthlyIncome || 1)) * 20;
    const riskScore = Math.min(Math.round(riskScoreRaw), 100);

    let riskStatus = "SAFE ZONE";
    let riskColor = "#4CAF7D";
    let alertType = "success";
    let alertTitle = "Low Financial Risk";
    let alertMsg = "Your estimated healthcare costs are well within your financial capacity. Standard insurance coverage should be sufficient.";

    if (riskScore >= 40) {
        riskStatus = "HIGH RISK";
        riskColor = "#E05252";
        alertType = "danger";
        alertTitle = "High Financial Risk Warning";
        alertMsg = "Estimated costs represent a significant portion of your annual income. We strongly recommend exploring financial assistance or verified payment plans.";
    } else if (riskScore >= 15) {
        riskStatus = "MEDIUM RISK";
        riskColor = "#F5A623";
        alertType = "warning";
        alertTitle = "Medium Financial Risk Warning";
        alertMsg = "Your out-of-pocket costs may exceed your monthly savings capacity. Consider checking our verified payment plans to reduce immediate risk.";
    }

    React.useEffect(() => {
        const saveEstimate = async () => {
            const currentUid = auth.currentUser?.uid || user?.uid;
            if (currentUid && !hasSavedRef.current && selectedProcedures.length > 0) {
                const lastSavedTS = sessionStorage.getItem('last_estimate_saved_at');
                const now = Date.now();
                if (lastSavedTS && (now - parseInt(lastSavedTS)) < 15000) return;
                hasSavedRef.current = true;
                sessionStorage.setItem('last_estimate_saved_at', now.toString());
                try {
                    await addDoc(collection(db, 'estimates'), {
                        userId: currentUid,
                        procedures: selectedProcedures,
                        procedureName: selectedProcedures.join(', '),
                        estimatedCost: totalMaxCost,
                        riskScore: riskScoreRaw,
                        createdAt: serverTimestamp()
                    });
                } catch (error) {
                    console.error("Error saving estimate", error);
                }
            }
        };
        const timeoutId = setTimeout(() => { saveEstimate(); }, 1000);
        return () => clearTimeout(timeoutId);
    }, [user, selectedProcedures, totalMaxCost, riskScoreRaw]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-16 pb-40">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-health-border pb-12 mb-12">
                <div>
                    <span className="text-[10px] font-black text-primary-teal uppercase tracking-[0.3em] mb-4 block">Analysis Complete</span>
                    <h1 className="text-4xl md:text-5xl font-black text-primary-navy tracking-tighter leading-none mb-4">
                        Estimation <span className="text-gradient">Results</span>
                    </h1>
                    <p className="text-health-text-secondary text-lg font-medium">Financial risk analysis based on your unique medical needs.</p>
                </div>
                <div className="flex items-center space-x-4 no-print mt-6 md:mt-0">
                    <button
                        onClick={() => window.print()}
                        className="flex items-center space-x-2 px-6 py-3 bg-white border border-health-border rounded-2xl text-xs font-black text-health-text-secondary hover:text-primary-navy hover:shadow-xl transition-all uppercase tracking-widest"
                    >
                        <Download size={16} className="text-primary-teal" />
                        <span>Export PDF</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Risk Analysis Card */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-4 card-premium p-10 flex flex-col items-center justify-center text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-teal to-primary-navy"></div>
                    <h4 className="text-[10px] font-black text-health-text-muted uppercase tracking-[0.3em] mb-12">Financial Exposure</h4>
                    
                    <RiskGauge value={riskScore} label={riskStatus} color={riskColor} />
                    
                    <div className="mt-12 space-y-6 w-full">
                        <div className="flex justify-between items-center py-4 border-b border-health-border/50">
                            <span className="text-[11px] font-black text-health-text-muted uppercase tracking-[0.1em]">Risk Level</span>
                            <span className="text-sm font-black" style={{ color: riskColor }}>{riskScore}% Intensity</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-health-border/50">
                            <span className="text-[11px] font-black text-health-text-muted uppercase tracking-[0.1em]">Min Outcome</span>
                            <span className="text-sm font-black text-primary-navy">{formatINR(totalMinCost)}</span>
                        </div>
                        <div className="flex justify-between items-center py-4">
                            <span className="text-[11px] font-black text-health-text-muted uppercase tracking-[0.1em]">Max Exposure</span>
                            <span className="text-sm font-black text-primary-navy">{formatINR(totalMaxCost)}</span>
                        </div>
                    </div>

                    <div className="mt-12 bg-health-bg/50 p-6 rounded-3xl border border-health-border w-full flex items-start space-x-4">
                        <Info size={16} className="text-primary-teal mt-1 shrink-0" />
                        <p className="text-[10px] leading-relaxed text-health-text-secondary font-medium text-left">
                            Analysis evaluates out-of-pocket costs relative to your income buffer.
                        </p>
                    </div>
                </motion.div>

                {/* Right Content */}
                <div className="lg:col-span-8 space-y-12">
                    <AlertBanner
                        type={alertType}
                        title={alertTitle}
                        message={alertMsg}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <CostComparisonCard
                            type="public"
                            priceRange={`${formatINR(totalMinCost * 0.15)} - ${formatINR(totalMinCost * 0.4)}`}
                            isBestValue={true}
                        />
                        <CostComparisonCard
                            type="private"
                            priceRange={`${formatINR(totalMinCost)} - ${formatINR(totalMaxCost)}`}
                            isBestValue={false}
                        />
                    </div>

                    {/* Breakdown Table */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card-premium overflow-hidden"
                    >
                        <div className="p-10 border-b border-health-border flex justify-between items-center">
                            <div>
                                <h4 className="text-xl font-black text-primary-navy tracking-tight">Procedure Breakdown</h4>
                                <p className="text-xs text-health-text-secondary font-medium mt-1">Itemized cost estimations per selection.</p>
                            </div>
                            <Link to="/cost-estimator/step-2" className="text-[10px] font-black text-primary-teal uppercase tracking-widest hover:underline hover:underline-offset-4 transition-all">
                                Edit List
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-health-bg/50 border-y border-health-border">
                                        <th className="px-10 py-5 text-[10px] font-black text-health-text-muted uppercase tracking-[0.2em]">Treatment</th>
                                        <th className="px-10 py-5 text-[10px] font-black text-health-text-muted uppercase tracking-[0.2em] text-right">Estimated Range</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-health-border">
                                    {procedureData.map((proc, idx) => (
                                        <tr key={idx} className="group hover:bg-health-bg/30 transition-colors">
                                            <td className="px-10 py-6">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 rounded-2xl bg-primary-teal/5 flex items-center justify-center text-primary-teal group-hover:scale-110 transition-transform">
                                                        <CheckCircle2 size={18} />
                                                    </div>
                                                    <span className="text-sm font-black text-primary-navy">{proc.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6 text-right">
                                                <span className="text-sm font-black text-primary-navy tabular-nums">{proc.cost}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-8 bg-health-bg/20 text-center">
                            <div className="inline-flex items-center space-x-2 text-[9px] font-black text-health-text-muted uppercase tracking-[0.2em]">
                                <TrendingUp size={12} className="text-primary-teal" />
                                <span>Estimates reflect regional averages for FY 2024-25</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Sticky Bottom Actions */}
            <div className="fixed bottom-0 left-0 right-0 p-6 z-50 no-print">
                <motion.div 
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="max-w-7xl mx-auto bg-primary-navy/95 backdrop-blur-xl rounded-[40px] shadow-4xl p-8 flex flex-col md:flex-row items-center justify-between border border-white/10"
                >
                    <button
                        onClick={() => navigate('/cost-estimator/step-2')}
                        className="hidden md:flex items-center space-x-2 text-[10px] font-black text-white/50 hover:text-white transition-colors uppercase tracking-[0.3em]"
                    >
                        <ChevronLeft size={16} />
                        <span>Adjust Selections</span>
                    </button>
                    
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={() => navigate('/providers')}
                            className="text-[10px] font-black text-white uppercase tracking-[0.3em] px-8 py-4 border border-white/20 rounded-2xl hover:bg-white hover:text-primary-navy transition-all"
                        >
                            Compare Providers
                        </button>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="btn-primary !px-10 !py-4 shadow-2xl shadow-primary-teal/30 group"
                        >
                            <span className="font-black text-sm uppercase tracking-widest">Dashboard</span>
                            <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    .no-print, nav, footer, button, .btn-primary, .btn-outline {
                        display: none !important;
                    }
                    .card-premium {
                        box-shadow: none !important;
                        border: 1px solid #E2E8F0 !important;
                    }
                    body {
                        background: white !important;
                        padding: 0 !important;
                        color: black !important;
                    }
                    .max-w-7xl {
                        max-width: 100% !important;
                        width: 100% !important;
                        padding: 0 !important;
                    }
                }
            `}} />
        </div>
    );
};

export default Results;
