import React from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRight, Shield, Zap,
    MapPin, Star, Activity,
    Search, CheckCircle, Bell,
    BarChart3, ChevronRight, Heart,
    Plus, Clock, ShieldCheck, Stethoscope, 
    Users, LayoutDashboard
} from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero.png';

const Landing = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: "easeOut" }
    };

    const services = [
        {
            title: "Cost Risk Analysis",
            desc: "Advanced algorithmic assessment of your financial exposure for any surgery or treatment.",
            icon: <Activity size={24} />,
            color: "bg-blue-50 text-blue-600"
        },
        {
            title: "Provider Benchmarking",
            desc: "Comparing 15,000+ providers in India on quality, cleanliness, and actual billed costs.",
            icon: <ShieldCheck size={24} />,
            color: "bg-teal-50 text-teal-600"
        },
        {
            title: "AI Virtual Assistant",
            desc: "24/7 personalized health guidance and cost negotiation support at your fingertips.",
            icon: <Zap size={24} />,
            color: "bg-amber-50 text-amber-600"
        },
        {
            title: "Savings Projection",
            desc: "Predictive modeling to show you exactly where you can save up to 40% on medical bills.",
            icon: <BarChart3 size={24} />,
            color: "bg-purple-50 text-purple-600"
        }
    ];

    const chooseUsItems = [
        { title: "Affordable Price", desc: "We ensure you find the most cost-effective care without compromising on quality.", icon: <Shield size={20} /> },
        { title: "Professional Network", desc: "Access to verified top-tier medical professionals and NABH hospitals.", icon: <Stethoscope size={20} /> },
        { title: "Personalized Support", desc: "Every estimate is tailored to your unique age, income, and insurance profile.", icon: <Heart size={20} /> },
        { title: "Absolute Transparency", desc: "No more hidden costs. See exactly what you are paying for.", icon: <Search size={20} /> }
    ];

    return (
        <div className="bg-health-bg min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
                <div className="absolute inset-0 z-0">
                    <img src={heroImg} alt="Medical Professional" className="w-full h-full object-cover object-center opacity-90 mask-fade-bottom" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
                </div>

                <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-teal/5 border border-primary-teal/20 rounded-full mb-8">
                                <div className="w-2 h-2 rounded-full bg-primary-teal animate-pulse"></div>
                                <span className="text-[10px] font-bold text-primary-teal uppercase tracking-[0.2em]">Empowering 100k+ Patients in India</span>
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-black text-primary-navy leading-[1.05] tracking-tighter mb-8">
                                Keep Your <br />
                                <span className="text-primary-teal">Health & Wallet</span> <br />
                                Perfectly Balanced.
                            </h1>

                            <p className="text-lg text-health-text-secondary mb-12 leading-relaxed max-w-lg">
                                Aarogya Path provides comprehensive medical cost analysis services for the whole family. Our platform uses the latest claims data to deliver high-quality estimates.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                                <Link to="/cost-estimator/step-1" className="btn-primary w-full sm:w-auto px-10 py-4 shadow-2xl shadow-primary-teal/20">
                                    <span>Get Started Now</span>
                                    <ArrowRight size={18} />
                                </Link>
                                <Link to="/about" className="text-primary-navy font-bold hover:text-primary-teal transition-colors flex items-center space-x-2 group">
                                    <span>Learn More</span>
                                    <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>

                            <div className="mt-16 flex items-center space-x-10 p-6 bg-white/50 backdrop-blur-md rounded-3xl border border-white inline-flex shadow-xl shadow-primary-navy/5">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
                                            <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="User" />
                                        </div>
                                    ))}
                                    <div className="w-10 h-10 rounded-full bg-primary-teal border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                                        +5k
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-black text-primary-navy">15k Happy Users</div>
                                    <div className="flex items-center space-x-1 mt-1">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} className="fill-amber-400 text-amber-400" />)}
                                        <span className="text-[10px] font-bold text-health-text-muted ml-1">(4.9/5)</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-32 px-4 bg-white" id="services">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeInUp} className="text-center mb-20 leading-tight">
                        <span className="text-[10px] font-black text-primary-teal uppercase tracking-[0.3em] mb-4 block">Our Expertise</span>
                        <h2 className="text-4xl md:text-5xl font-black text-primary-navy">What Service We Offer</h2>
                        <p className="text-health-text-secondary mt-6 max-w-2xl mx-auto">Our experienced team specializes in providing high-quality cost transparency and personalized financial risk assessment across India.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((s, i) => (
                            <motion.div
                                key={s.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="group p-8 rounded-[40px] bg-white border border-health-border hover:border-primary-teal hover:shadow-3xl hover:shadow-primary-teal/5 transition-all duration-500"
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 group-hover:rotate-3 ${s.color}`}>
                                    {s.icon}
                                </div>
                                <h4 className="text-xl font-black text-primary-navy mb-4">{s.title}</h4>
                                <p className="text-sm text-health-text-secondary leading-relaxed mb-6">{s.desc}</p>
                                <Link to="/cost-estimator/step-1" className="text-xs font-bold text-primary-teal flex items-center opacity-0 group-hover:opacity-100 transition-all">
                                    Explore More <ArrowRight size={14} className="ml-2" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 px-4 bg-health-bg/30 relative overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div {...fadeInUp}>
                        <h2 className="text-4xl md:text-5xl font-black text-primary-navy leading-tight mb-8">Why You Should Choose Our Platform?</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {chooseUsItems.map((item, i) => (
                                <div key={i} className="flex items-start space-x-4 p-4 rounded-3xl hover:bg-white transition-colors">
                                    <div className="p-3 bg-primary-teal/10 rounded-xl text-primary-teal shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-primary-navy mb-1">{item.title}</h5>
                                        <p className="text-xs text-health-text-secondary leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="rounded-[60px] overflow-hidden shadow-4xl relative z-10">
                            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800" alt="Hospital View" className="w-full h-full object-cover aspect-square" />
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-primary-teal/5 blur-[100px] rounded-full -z-10 animate-pulse"></div>
                        
                        <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-[40px] shadow-3xl border border-health-border z-20 max-w-[240px]">
                            <div className="text-4xl font-black text-primary-teal mb-2">98%</div>
                            <div className="text-xs font-bold text-primary-navy uppercase tracking-widest leading-relaxed">Accuracy on local cost estimates</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* How it Works Visual */}
            <section className="py-32 px-4 bg-white" id="how-it-works">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
                        <motion.div {...fadeInUp} className="max-w-2xl text-left">
                            <span className="text-[10px] font-black text-primary-teal uppercase tracking-[0.3em] mb-4 block">Our Process</span>
                            <h2 className="text-4xl md:text-5xl font-black text-primary-navy leading-tight">Professional Support in Three Easy Steps</h2>
                        </motion.div>
                        <Link to="/cost-estimator/step-1" className="btn-primary">
                            Trial Estimator Now
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-primary-teal/5 -translate-y-1/2 hidden md:block"></div>
                        
                        {[
                            { num: "01", title: "Registration", desc: "Build your secure profile with location and age details.", icon: <Users size={24} /> },
                            { num: "02", title: "Selection", desc: "Choose medical procedures from our verified Indian catalog.", icon: <Search size={24} /> },
                            { num: "03", title: "Calculation", desc: "Get real-time risk scores and optimized hospital savings.", icon: <BarChart3 size={24} /> }
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="relative flex flex-col items-center text-center group"
                            >
                                <div className="w-16 h-16 rounded-full bg-health-bg border-4 border-white shadow-xl flex items-center justify-center text-primary-teal group-hover:bg-primary-teal group-hover:text-white transition-all duration-500 z-10 mb-8 relative">
                                    {s.icon}
                                    <span className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white border border-health-border flex items-center justify-center text-[10px] font-black text-primary-navy shadow-lg font-mono">{s.num}</span>
                                </div>
                                <h4 className="text-xl font-black text-primary-navy mb-4">{s.title}</h4>
                                <p className="text-sm text-health-text-secondary leading-relaxed px-6">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial / Feedback */}
            <section className="py-32 px-4 bg-primary-navy relative overflow-hidden rounded-t-[80px] -mt-20">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
                    <div className="w-full lg:w-1/2">
                        <div className="rounded-[60px] overflow-hidden relative shadow-4xl group">
                            <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800" alt="Clinic Interior" className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-transparent to-transparent"></div>
                            <div className="absolute bottom-10 left-10 right-10 p-10 bg-white/10 backdrop-blur-xl rounded-[40px] border border-white/20">
                                <p className="text-white text-lg font-bold italic leading-relaxed mb-6">"Aarogya Path helped me save over ₹2,00,000 on my hip replacement by showing me regional price differences I never knew existed."</p>
                                <div className="flex items-center space-x-4">
                                    <img src="https://i.pravatar.cc/100?u=ram" className="w-12 h-12 rounded-full border-2 border-primary-teal" alt="User" />
                                    <div>
                                        <div className="text-white font-black text-sm">Vikram Malhotra</div>
                                        <div className="text-primary-teal text-[10px] font-bold uppercase tracking-widest">Business Owner, New Delhi</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 text-left">
                        <span className="text-[10px] font-black text-primary-teal uppercase tracking-[0.3em] mb-8 block">Member Loyalty</span>
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-10">Let's See What Our Client Think About Us</h2>
                        <div className="space-y-10">
                            {[1, 2].map(i => (
                                <div key={i} className="flex space-x-6">
                                    <div className="w-1.5 h-auto bg-primary-teal rounded-full opacity-30"></div>
                                    <p className="text-white/60 text-sm leading-relaxed">Aarogya Path's estimates were within 5% of my final hospital bill. The accuracy is unmatched and gave me such peace of mind before my surgery.</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-16 flex items-center space-x-8">
                            <div>
                                <div className="text-3xl font-black text-white mb-2">15k+</div>
                                <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Active Users</div>
                            </div>
                            <div className="h-12 w-px bg-white/10"></div>
                            <div>
                                <div className="text-3xl font-black text-white mb-2">99%</div>
                                <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Satisfaction</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-4 bg-primary-navy text-center border-t border-white/5 pb-40">
                <motion.div {...fadeInUp} className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-7xl font-black text-white leading-[1.1] mb-12">Take Control of Your Medical Future.</h2>
                    <p className="text-xl text-white/50 mb-16 max-w-2xl mx-auto leading-relaxed">Join thousands who use Aarogya Path for complete cost visibility and professional clinic recommendations.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
                        <Link to="/signup" className="btn-primary px-12 py-5 text-lg">Start Free Analysis</Link>
                        <Link to="/providers" className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-full font-bold hover:bg-white/10 transition-all flex items-center space-x-2">
                             <span>Our Providers</span>
                             <ChevronRight size={18} />
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Footer Overhaul */}
            <footer className="bg-primary-navy pt-20 pb-16 px-4 border-t border-white/5 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
                        <div className="col-span-1 md:col-span-1">
                            <Link to="/" className="flex items-center space-x-3 mb-8 group">
                                <div className="bg-primary-teal p-1.5 rounded-lg">
                                    <Plus className="text-white" size={18} strokeWidth={3} />
                                </div>
                                <span className="text-2xl font-black text-white tracking-tighter">Aarogya Path</span>
                            </Link>
                            <p className="text-sm text-white/40 leading-[1.8] mb-8 pr-10">
                                India's first complete cost risk analysis platform for personalized patient empowerment and bill transparency.
                            </p>
                        </div>
                        
                        {['Services', 'Platform', 'Company'].map(title => (
                            <div key={title}>
                                <h4 className="text-white font-black text-[10px] uppercase tracking-[0.2em] mb-10">{title}</h4>
                                <ul className="space-y-6">
                                    {[1, 2, 3, 4].map(i => (
                                        <li key={i}><a href="#" className="text-xs font-bold text-white/30 hover:text-primary-teal transition-colors tracking-wide">{title} Link {i}</a></li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    
                    <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] space-y-6 md:space-y-0">
                        <div className="flex flex-col items-center md:items-start space-y-2">
                            <div>© 2024 Aarogya Path. All rights reserved. Built in India.</div>
                            <div className="text-primary-teal/40">Developed by Ayushi Aggarwal, GGSIPU First Year Student</div>
                        </div>
                        <div className="flex space-x-12">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
