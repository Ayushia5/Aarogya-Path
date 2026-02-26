import React from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRight, Shield, Zap,
    MapPin, Star, Activity,
    Search, CheckCircle, Bell,
    BarChart3, ChevronRight, Heart,
    Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    const steps = [
        {
            num: '01 / 03',
            icon: <User className="text-primary-teal" size={24} />,
            title: 'Build Your Profile',
            desc: 'Enter your basic information — age, location, income bracket, and current insurance details. This takes less than 90 seconds and is fully encrypted.',
            delay: 0.1
        },
        {
            num: '02 / 03',
            icon: <Search className="text-primary-teal" size={24} />,
            title: 'Select Your Procedures',
            desc: 'Browse 500+ procedures across Cardiology, Orthopedics, Diagnostics, and more. Our engine instantly cross-references historical claims data.',
            delay: 0.2,
            hasConnector: true
        },
        {
            num: '03 / 03',
            icon: <BarChart3 className="text-primary-teal" size={24} />,
            title: 'Get Your Risk Report',
            desc: 'Receive a detailed financial risk score, a public vs. private cost breakdown, and smart recommendations. Know exactly what you\'ll pay.',
            delay: 0.3
        }
    ];

    return (
        <div className="bg-health-bg min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden min-h-screen flex items-center">
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#F0F4F7] via-[#E8F4F4] to-[#F0F4F7]"></div>
                <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'linear-gradient(#0B9E9E 1px, transparent 1px), linear-gradient(90deg, #0B9E9E 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>
                <div className="absolute top-[10%] right-[5%] w-[600px] h-[600px] rounded-full bg-primary-teal/5 blur-[100px] animate-pulse"></div>

                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-white border border-health-border rounded-full shadow-sm mb-6">
                            <div className="w-2 h-2 rounded-full bg-primary-teal animate-ping"></div>
                            <span className="text-[10px] font-bold text-primary-teal uppercase tracking-widest">Now live across 50+ cities in India</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-extrabold text-primary-navy leading-[1.1] tracking-tight mb-6">
                            Know Your<br />
                            Healthcare Costs<br />
                            <span className="text-primary-teal relative inline-block">
                                Before They Do.
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 0.8, duration: 0.6 }}
                                    className="absolute bottom-2 left-0 right-0 h-1.5 bg-primary-teal/20 rounded-full origin-left"
                                ></motion.div>
                            </span>
                        </h1>

                        <p className="text-lg text-health-text-secondary max-w-lg mb-10 leading-relaxed">
                            Aarogya Path gives you real-time cost estimates, transparent provider ratings, and financial risk alerts — so you can make confident, informed decisions.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link to="/cost-estimator/step-1" className="btn-primary flex items-center space-x-2 py-4 px-8 text-base shadow-2xl shadow-primary-teal/30 w-full sm:w-auto justify-center">
                                <Zap size={18} />
                                <span>Check My Risk Free</span>
                            </Link>
                            <Link to="/providers" className="btn-outline bg-white flex items-center space-x-2 py-4 px-8 text-base w-full sm:w-auto justify-center">
                                <Activity size={18} />
                                <span>Browse Providers</span>
                            </Link>
                        </div>

                        <div className="mt-16 pt-8 border-t border-health-border/50 flex space-x-12">
                            <div>
                                <div className="text-2xl font-bold text-primary-navy">10k+</div>
                                <div className="text-xs text-health-text-muted mt-1">Providers Listed</div>
                            </div>
                            <div className="h-10 w-px bg-health-border self-center"></div>
                            <div>
                                <div className="text-2xl font-bold text-primary-navy">₹2.4Cr</div>
                                <div className="text-xs text-health-text-muted mt-1">Savings Generated</div>
                            </div>
                            <div className="h-10 w-px bg-health-border self-center"></div>
                            <div>
                                <div className="text-2xl font-bold text-primary-navy">98%</div>
                                <div className="text-xs text-health-text-muted mt-1">Estimate Accuracy</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Visual Dashboard Mockup */}
                        <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-white p-8 relative z-10">
                            <div className="flex justify-between items-center mb-8">
                                <div className="text-sm font-bold text-primary-navy">Estimated Savings</div>
                                <div className="bg-health-success/10 text-health-success text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                    +15% this month
                                </div>
                            </div>

                            <div className="h-40 w-full bg-gradient-to-b from-primary-teal/5 to-transparent rounded-2xl mb-8 overflow-hidden relative">
                                <svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none">
                                    <path d="M0,80 Q50,60 100,70 T200,30 T300,50 T400,20 L400,100 L0,100 Z" fill="rgba(11, 158, 158, 0.1)" />
                                    <path d="M0,80 Q50,60 100,70 T200,30 T300,50 T400,20" fill="none" stroke="#0B9E9E" strokeWidth="3" strokeLinecap="round" />
                                    <circle cx="400" cy="20" r="4" fill="#0B9E9E" />
                                </svg>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-health-bg p-4 rounded-2xl">
                                    <div className="text-sm font-bold text-primary-navy">₹1,250</div>
                                    <div className="text-[10px] text-health-text-muted mt-1">Saved</div>
                                </div>
                                <div className="bg-health-bg p-4 rounded-2xl">
                                    <div className="text-sm font-bold text-primary-navy">5</div>
                                    <div className="text-[10px] text-health-text-muted mt-1">Saved</div>
                                </div>
                                <div className="bg-health-bg p-4 rounded-2xl">
                                    <div className="text-sm text-health-success font-bold">Low</div>
                                    <div className="text-[10px] text-health-text-muted mt-1">Risk</div>
                                </div>
                            </div>
                        </div>

                        {/* Floating items */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                            className="absolute -top-10 -right-10 bg-white p-4 rounded-2xl shadow-xl z-20 border border-health-border flex items-center space-x-3"
                        >
                            <div className="bg-health-success/10 p-2 rounded-lg text-health-success">
                                <CheckCircle size={20} />
                            </div>
                            <div>
                                <div className="text-[10px] text-health-text-muted font-bold uppercase tracking-widest leading-none mb-1">Risk Level</div>
                                <div className="text-sm font-bold text-primary-navy leading-none">LOW — Safe Zone</div>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
                            className="absolute -bottom-10 -left-10 bg-white p-4 rounded-2xl shadow-xl z-20 border border-health-border flex items-center space-x-3"
                        >
                            <div className="bg-amber-100 p-2 rounded-lg text-amber-500">
                                <Heart size={20} />
                            </div>
                            <div>
                                <div className="text-[10px] text-health-text-muted font-bold uppercase tracking-widest leading-none mb-1">Potential Savings</div>
                                <div className="text-sm font-bold text-primary-navy leading-none">₹850/yr available</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Trust Band */}
            <div className="bg-white border-y border-health-border py-8 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                    <span className="text-sm font-bold text-health-text-muted uppercase tracking-widest">Trusted by teams from</span>
                    <div className="flex flex-wrap items-center justify-center gap-12 grayscale opacity-40">
                        {['Apollo', 'Fortis', 'Max', 'Manipal', 'Aster', 'Narayana'].map(h => (
                            <span key={h} className="text-lg font-bold text-primary-navy tracking-tight">{h} Hospitals</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* How it Works */}
            <section className="py-32 px-6 bg-white" id="how-it-works">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeInUp} className="text-center mb-20">
                        <div className="text-primary-teal font-extrabold text-xs uppercase tracking-[0.2em] mb-4">The Process</div>
                        <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6 leading-tight">Three Steps to<br />Financial Clarity</h2>
                        <p className="text-lg text-health-text-secondary max-w-2xl mx-auto leading-relaxed">
                            Go from uncertainty to confidence in under 3 minutes. No medical jargon, no hidden fees, no surprises.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Step cards */}
                        <StepCard icon={<Shield className="text-primary-teal" size={32} />} num="01" title="Build Your Profile" desc="Enter your basic information — age, location, and insurance. Fully encrypted and secure." />
                        <StepCard icon={<Search className="text-primary-teal" size={32} />} num="02" title="Select Procedures" desc="Browse 500+ procedures. Our engine instantly cross-references historical claims data." />
                        <StepCard icon={<BarChart3 className="text-primary-teal" size={32} />} num="03" title="Get Risk Report" desc="Receive a detailed risk score and cost breakdown. Know exactly what you'll pay." />
                    </div>
                </div>
            </section>

            {/* Feature Section Large */}
            <section className="py-24 px-6" id="features">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        {...fadeInUp}
                        className="bg-primary-navy rounded-[40px] p-8 md:p-20 text-white flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative"
                    >
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-teal/5 rounded-full blur-[100px] -mr-40 -mt-40"></div>

                        <div className="w-full lg:w-1/2 relative z-10">
                            <div className="text-primary-teal font-bold text-xs uppercase tracking-widest mb-6 leading-none">⚡ Core Feature</div>
                            <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Real-Time Cost Risk Estimator</h3>
                            <p className="text-lg text-white/70 mb-10 leading-relaxed">
                                Our AI-powered engine analyzes your profile against 2M+ historical insurance claims to give you a personalized financial risk score — not just a price list.
                            </p>
                            <Link to="/cost-estimator/step-1" className="btn-primary inline-flex py-4 px-10 text-base">
                                Try the Estimator →
                            </Link>
                        </div>

                        <div className="w-full lg:w-1/2 bg-white/5 border border-white/10 p-10 rounded-3xl relative z-10">
                            {/* Gauge Simulation */}
                            <div className="flex flex-col items-center">
                                <div className="w-64 h-32 relative mb-12">
                                    <svg className="w-full h-full" viewBox="0 0 100 50">
                                        <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" strokeLinecap="round" />
                                        <path d="M10 50 A40 40 0 0 1 50 10" fill="none" stroke="#4CAF7D" strokeWidth="8" strokeLinecap="round" />
                                        <motion.line
                                            initial={{ x1: 50, y1: 50, x2: 50, y2: 15 }}
                                            animate={{ x1: 50, y1: 50, x2: 30, y2: 15 }}
                                            transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
                                            stroke="white" strokeWidth="2" strokeLinecap="round"
                                        />
                                        <circle cx="50" cy="50" r="3" fill="white" />
                                    </svg>
                                    <div className="text-center mt-2 text-primary-teal font-bold text-sm">SAFE ZONE</div>
                                </div>
                                <div className="grid grid-cols-3 gap-6 w-full text-center">
                                    <div>
                                        <div className="text-health-success font-bold text-xl">-12%</div>
                                        <div className="text-[10px] text-white/50 uppercase tracking-widest">vs Market</div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-xl">₹850</div>
                                        <div className="text-[10px] text-white/50 uppercase tracking-widest">Savings/yr</div>
                                    </div>
                                    <div>
                                        <div className="text-primary-teal font-bold text-xl">78%</div>
                                        <div className="text-[10px] text-white/50 uppercase tracking-widest">Match</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-6 bg-primary-navy text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg aspect-square bg-primary-teal/5 blur-[120px]"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div {...fadeInUp}>
                        <div className="text-primary-teal font-bold text-xs uppercase tracking-[0.2em] mb-8">Get Started</div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">Stop Being Surprised<br />by Your Medical Bills.</h2>
                        <p className="text-lg text-white/60 mb-12 max-w-xl mx-auto leading-relaxed">
                            Join 50,000+ patients who use Aarogya Path to know their costs, choose the right providers, and protect their financial health.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                            <Link to="/signup" className="btn-primary py-4 px-12 text-base w-full sm:w-auto">
                                ⚡ Check My Risk Free
                            </Link>
                            <Link to="/login" className="px-8 py-4 text-white font-bold hover:text-primary-teal transition-colors">
                                Already a member? Sign in
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-primary-navy pt-24 pb-12 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                        <div className="col-span-1 md:col-span-1">
                            <Link to="/" className="flex items-center space-x-2 mb-6 group">
                                <div className="bg-primary-teal p-1.5 rounded-lg">
                                    <Plus className="text-white" size={18} strokeWidth={3} />
                                </div>
                                <span className="text-xl font-bold text-white">Aarogya Path</span>
                            </Link>
                            <p className="text-sm text-white/40 leading-relaxed mb-8">
                                Empowering patients with real-time cost transparency and provider accountability ratings across India.
                            </p>
                            <div className="flex space-x-4">
                                {/* Social Icons Placeholder */}
                                {[1, 2, 3, 4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary-teal transition-all cursor-pointer"></div>)}
                            </div>
                        </div>
                        {['Product', 'Company', 'Support'].map(title => (
                            <div key={title}>
                                <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-8">{title}</h4>
                                <ul className="space-y-4">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <li key={i}><a href="#" className="text-sm text-white/40 hover:text-primary-teal transition-colors">{title} Item {i}</a></li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/30 space-y-4 md:space-y-0">
                        <div>© 2024 Aarogya Path. All rights reserved. Made in India.</div>
                        <div className="flex space-x-8">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                            <a href="#">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const StepCard = ({ num, icon, title, desc }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-health-bg group hover:bg-white p-10 rounded-[32px] border border-health-border hover:shadow-2xl hover:shadow-primary-teal/5 transition-all relative overflow-hidden"
    >
        <div className="absolute top-6 right-8 text-[10px] font-bold text-health-text-muted tabular-nums">{num}</div>
        <div className="w-14 h-14 bg-primary-teal/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary-teal group-hover:text-white transition-all">
            {icon}
        </div>
        <h4 className="text-xl font-bold text-primary-navy mb-4">{title}</h4>
        <p className="text-sm text-health-text-secondary leading-relaxed">{desc}</p>
    </motion.div>
);

const User = ({ className, size }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

export default Landing;
