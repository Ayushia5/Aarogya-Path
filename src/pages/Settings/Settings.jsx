import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User, Bell, ShieldCheck, Lock, CreditCard,
    Upload, Trash2, Mail, Phone, Home, Save,
    ChevronRight, Camera
} from 'lucide-react';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';

const Settings = () => {
    const [notifications, setNotifications] = useState({
        estimates: true,
        appointments: true,
        marketing: false,
    });

    const menuItems = [
        { id: 'profile', label: 'Profile Settings', icon: <User size={18} />, active: true },
        { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
        { id: 'security', label: 'Security & Password', icon: <Lock size={18} /> },
        { id: 'privacy', label: 'Data Privacy', icon: <ShieldCheck size={18} /> },
        { id: 'billing', label: 'Billing & Plans', icon: <CreditCard size={18} /> },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 pb-20">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-health-text-muted mb-6">
                <span className="hover:text-primary-teal cursor-pointer">Dashboard</span>
                <ChevronRight size={14} />
                <span className="text-health-text-secondary font-medium">Settings</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Sidebar Layout */}
                <aside className="lg:w-1/4 space-y-6">
                    <div className="card-premium p-6 flex flex-col items-center text-center">
                        <div className="relative mb-4">
                            <div className="w-24 h-24 rounded-full border-4 border-health-border overflow-hidden bg-health-bg">
                                <img
                                    src="https://i.pravatar.cc/150?u=alex"
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 bg-primary-teal text-white rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform">
                                <Camera size={14} />
                            </button>
                        </div>
                        <h3 className="text-lg font-bold text-primary-navy">Alex Morgan</h3>
                        <p className="text-sm text-health-text-secondary mb-6">alex.morgan@example.com</p>

                        <nav className="w-full space-y-1">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${item.active
                                            ? 'bg-primary-teal/5 text-primary-teal font-bold'
                                            : 'text-health-text-secondary hover:bg-health-bg'
                                        }`}
                                >
                                    <span className={item.active ? 'text-primary-teal' : 'text-health-text-muted'}>
                                        {item.icon}
                                    </span>
                                    <span className="text-sm">{item.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* main content */}
                <main className="lg:w-3/4 space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold text-primary-navy mb-2">Account Settings</h1>
                        <p className="text-health-text-secondary">Manage your profile details, contact information, and preferences.</p>
                    </div>

                    {/* Profile Picture Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card-premium p-8"
                    >
                        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
                            <div className="w-24 h-24 rounded-full bg-health-bg flex items-center justify-center border-2 border-dashed border-health-border relative">
                                <Upload size={32} className="text-health-text-muted" />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h4 className="font-bold text-primary-navy mb-1">Profile Picture</h4>
                                <p className="text-xs text-health-text-secondary mb-4">
                                    Recommended size: 400x400px. Supports JPG, PNG or GIF. Max 2MB.
                                </p>
                                <div className="flex items-center justify-center md:justify-start space-x-4">
                                    <button className="btn-outline !py-2 !px-4 text-xs font-bold">
                                        Upload New
                                    </button>
                                    <button className="text-health-danger text-xs font-bold hover:underline">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Personal Information Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="card-premium p-8"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h4 className="text-lg font-bold text-primary-navy">Personal Information</h4>
                            <button className="text-sm font-bold text-primary-teal hover:underline">Edit details</button>
                        </div>

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-health-text-muted uppercase tracking-widest mb-2">First Name</label>
                                <input type="text" defaultValue="Alex" className="input-standard !py-2.5" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-health-text-muted uppercase tracking-widest mb-2">Last Name</label>
                                <input type="text" defaultValue="Morgan" className="input-standard !py-2.5" />
                            </div>
                            <div className="relative">
                                <label className="block text-xs font-bold text-health-text-muted uppercase tracking-widest mb-2">Email Address</label>
                                <div className="relative">
                                    <input type="email" defaultValue="alex.morgan@example.com" className="input-standard !py-2.5 pr-10" />
                                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-health-text-muted" size={16} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-health-text-muted uppercase tracking-widest mb-2">Phone Number</label>
                                <div className="relative">
                                    <input type="text" defaultValue="+1 (555) 123-4567" className="input-standard !py-2.5 pr-10" />
                                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-health-text-muted" size={16} />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-health-text-muted uppercase tracking-widest mb-2">Home Address</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        defaultValue="123 Healthway Blvd, Suite 400, San Francisco, CA 94105"
                                        className="input-standard !py-2.5 pr-10"
                                    />
                                    <Home className="absolute right-3 top-1/2 -translate-y-1/2 text-health-text-muted" size={16} />
                                </div>
                            </div>

                            <div className="md:col-span-2 flex justify-end">
                                <button className="btn-primary flex items-center space-x-2">
                                    <Save size={18} />
                                    <span>Save Changes</span>
                                </button>
                            </div>
                        </form>
                    </motion.div>

                    {/* Notification Preferences Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="card-premium p-8"
                    >
                        <h4 className="text-lg font-bold text-primary-navy mb-6">Notification Preferences</h4>
                        <div className="divide-y divide-health-border">
                            <ToggleSwitch
                                label="Cost Estimates"
                                description="Receive updates when your cost estimates are ready"
                                isOn={notifications.estimates}
                                onToggle={() => setNotifications({ ...notifications, estimates: !notifications.estimates })}
                            />
                            <ToggleSwitch
                                label="Appointment Reminders"
                                description="Get notified 24 hours before your appointments"
                                isOn={notifications.appointments}
                                onToggle={() => setNotifications({ ...notifications, appointments: !notifications.appointments })}
                            />
                            <ToggleSwitch
                                label="Marketing & Newsletter"
                                description="News about features and healthcare tips"
                                isOn={notifications.marketing}
                                onToggle={() => setNotifications({ ...notifications, marketing: !notifications.marketing })}
                            />
                        </div>
                    </motion.div>

                    {/* Footer actions */}
                    <div className="flex justify-between items-center pt-8">
                        <button className="text-health-danger font-bold hover:underline">
                            Deactivate Account
                        </button>
                        <span className="text-xs text-health-text-muted font-medium">
                            Last updated: Oct 24, 2023
                        </span>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Settings;
