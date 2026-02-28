import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ChevronLeft, Star, MapPin,
    Clock, ShieldCheck, Mail,
    Phone, Globe, MessageSquare,
    Heart, Download, ExternalLink,
    Award, BookOpen, Stethoscope,
    Activity, Calendar, ArrowRight
} from 'lucide-react';
import StarRating from '../../components/StarRating/StarRating';
import AlertBanner from '../../components/AlertBanner/AlertBanner';

const ProviderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);

    // Mock data for the provider
    const provider = {
        id,
        name: 'Dr. Sarah Jenkins',
        specialty: 'Board Certified Cardiologist',
        experience: '15+ Years Experience',
        rating: 4.8,
        reviews: 124,
        imageUrl: `https://i.pravatar.cc/400?u=sarah-jenkins`,
        hospital: 'Apollo Hospitals',
        city: 'Mumbai',
        description: 'Dr. Jenkins is a nationally recognized cardiologist specializing in non-invasive imaging and preventive cardiovascular medicine. She has lead multiple clinical trials in heart valve replacement and is passionate about equitable healthcare access.',
        specialties: ['General Cardiology', 'Echocardiography', 'Heart Valve Disease', 'Preventive Medicine'],
        education: [
            { degree: 'Medical Doctorate', institution: 'Stanford University School of Medicine' },
            { degree: 'Residency', institution: 'Mayo Clinic College of Medicine' },
        ],
        acceptingNew: true,
        telehealth: true,
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 pb-32">
            {/* Top Navigation */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 text-health-text-secondary font-semibold hover:text-primary-navy transition-colors mb-8 group"
            >
                <div className="p-2 rounded-full group-hover:bg-health-bg transition-all">
                    <ChevronLeft size={20} />
                </div>
                <span>Back to search results</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left column: Profile Info */}
                <div className="lg:col-span-2 space-y-10">
                    <section className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-48 h-48 rounded-3xl overflow-hidden border-4 border-white shadow-2xl relative shrink-0"
                        >
                            <img src={provider.imageUrl} alt={provider.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/40 to-transparent"></div>
                        </motion.div>

                        <div className="flex-1 text-center md:text-left pt-2">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                <h1 className="text-4xl font-bold text-primary-navy tracking-tight">{provider.name}</h1>
                                <div className="flex items-center space-x-2 mt-2 md:mt-0 justify-center md:justify-start">
                                    <span className="bg-health-success/10 text-health-success text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-health-success/20">
                                        Accepting Patients
                                    </span>
                                    {provider.telehealth && (
                                        <span className="bg-primary-teal/10 text-primary-teal text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-primary-teal/20">
                                            Telehealth Available
                                        </span>
                                    )}
                                </div>
                            </div>

                            <p className="text-lg font-bold text-primary-teal mb-4">{provider.specialty}</p>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm">
                                <div className="flex items-center space-x-2">
                                    <StarRating rating={provider.rating} size={18} />
                                    <span className="font-bold text-primary-navy">{provider.rating}</span>
                                    <span className="text-health-text-muted">({provider.reviews} reviews)</span>
                                </div>
                                <div className="flex items-center space-x-2 text-health-text-secondary">
                                    <MapPin size={18} className="text-health-text-muted" />
                                    <span>{provider.city}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-health-text-secondary">
                                    <Activity size={18} className="text-health-text-muted" />
                                    <span>{provider.experience}</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Bio Section */}
                    <section className="card-premium p-8">
                        <h4 className="flex items-center space-x-2 text-lg font-bold text-primary-navy mb-4">
                            <Stethoscope size={20} className="text-primary-teal" />
                            <span>Professional Biography</span>
                        </h4>
                        <p className="text-health-text-secondary leading-relaxed mb-8">
                            {provider.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h5 className="text-[10px] font-bold text-health-text-muted uppercase tracking-widest mb-4">Core Specialties</h5>
                                <div className="flex flex-wrap gap-2">
                                    {provider.specialties.map((s, idx) => (
                                        <span key={idx} className="px-3 py-1.5 bg-health-bg border border-health-border rounded-lg text-xs font-semibold text-primary-navy">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h5 className="text-[10px] font-bold text-health-text-muted uppercase tracking-widest mb-4">Education & Training</h5>
                                <ul className="space-y-3">
                                    {provider.education.map((e, idx) => (
                                        <li key={idx} className="flex items-start space-x-3">
                                            <div className="mt-1 p-1 bg-primary-teal/5 rounded-md text-primary-teal font-bold">
                                                <Award size={14} />
                                            </div>
                                            <div className="text-xs">
                                                <p className="font-bold text-primary-navy">{e.degree}</p>
                                                <p className="text-health-text-muted">{e.institution}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Location / Contact Card */}
                    <section className="card-premium p-8">
                        <h4 className="flex items-center space-x-2 text-lg font-bold text-primary-navy mb-6">
                            <MapPin size={20} className="text-primary-teal" />
                            <span>Location & Contact</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <h5 className="font-bold text-primary-navy text-sm mb-1">{provider.hospital}</h5>
                                    <p className="text-xs text-health-text-secondary leading-relaxed">
                                        123 Medical Center Way, Suite 400<br />
                                        Sacramento, CA 95814
                                    </p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2 text-xs font-semibold text-primary-teal">
                                        <Globe size={16} />
                                        <span>Website</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-xs font-semibold text-primary-teal">
                                        <Download size={16} />
                                        <span>V-Card</span>
                                    </div>
                                </div>
                            </div>
                            <div className="h-40 bg-zinc-100 rounded-2xl overflow-hidden relative border border-health-border border-dashed flex items-center justify-center text-health-text-muted">
                                <MapPin size={24} className="mb-2" />
                                <span className="text-[10px] font-bold uppercase tracking-widest absolute bottom-4">Interactive Map View</span>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right column: Action Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="card-premium p-8 sticky top-24 shadow-2xl shadow-primary-navy/5"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <p className="text-[10px] font-bold text-health-text-muted uppercase tracking-widest">Next Available</p>
                                <div className="flex items-center space-x-2 text-primary-navy font-bold">
                                    <Calendar size={18} className="text-primary-teal" />
                                    <span>Mon, Oct 30</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsSaved(!isSaved)}
                                className={`p-3 rounded-2xl border-2 transition-all ${isSaved
                                    ? 'border-health-danger bg-health-danger/5 text-health-danger'
                                    : 'border-health-border hover:border-health-danger text-health-text-muted'
                                    }`}
                            >
                                <Heart size={20} fill={isSaved ? "currentColor" : "none"} />
                            </button>
                        </div>

                        <div className="pt-4 border-t border-health-border text-center">
                            <p className="text-xs text-health-text-secondary italic">
                                Contact your local branch for inquiries or scheduling.
                            </p>
                        </div>

                        <div className="space-y-4 pt-6 border-t border-health-border">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-health-text-secondary">Expected Copay</span>
                                <span className="font-bold text-primary-navy">₹500.00</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-health-text-secondary">Out-of-Pocket Risk</span>
                                <span className="px-2 py-0.5 bg-health-success/10 text-health-success rounded-md font-bold">Low</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-health-text-secondary">Regional Price Score</span>
                                <div className="flex items-center space-x-1 text-primary-teal font-bold uppercase tracking-tighter">
                                    <Star size={12} fill="currentColor" />
                                    <span>Top 10% Value</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <AlertBanner
                                type="info"
                                title="Provider Access"
                                message="Verified provider status at Apollo Hospitals for high-quality specialized care."
                            />
                        </div>
                    </motion.div>

                    <div className="card-premium p-6 bg-health-bg/30">
                        <h5 className="font-bold text-primary-navy text-sm mb-4">Patient Feedback</h5>
                        <div className="space-y-4">
                            <div className="p-4 bg-white rounded-xl border border-health-border">
                                <div className="flex justify-between items-center mb-2">
                                    <StarRating rating={5} size={12} />
                                    <span className="text-[10px] text-health-text-muted font-bold">2 days ago</span>
                                </div>
                                <p className="text-xs text-health-text-secondary leading-relaxed">
                                    "Dr. Jenkins explained my results very clearly. Great experience."
                                </p>
                            </div>
                            <button className="w-full text-center text-xs font-bold text-primary-teal hover:underline py-2">
                                Read all 124 reviews
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderDetail;
