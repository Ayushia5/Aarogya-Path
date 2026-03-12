import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Bell, User, Menu, X, Plus,
    LayoutDashboard, Search as SearchIcon,
    Users, ShieldCheck, LogOut, Settings,
    ChevronDown, Heart
} from 'lucide-react';
import useAuthStore from '../../stores/useAuthStore';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const { isLoggedIn, user, logout } = useAuthStore();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = isLoggedIn
        ? [
            { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={14} /> },
            { name: 'Cost Estimator', path: '/cost-estimator/step-1', icon: <SearchIcon size={14} /> },
            { name: 'Providers', path: '/providers', icon: <Users size={14} /> },
            { name: 'AI Assistant', path: '/ai-chat', icon: <Heart size={14} /> },
        ]
        : [
            { name: 'How It Works', path: '/#how-it-works' },
            { name: 'Our Services', path: '/#services' },
            { name: 'Providers', path: '/providers' },
            { name: 'About Us', path: '/about' },
        ];

    return (
        <header className="fixed top-0 w-full z-50 transition-all duration-500">
            <nav className={`w-full transition-all duration-500 ${
                isScrolled 
                    ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-health-border py-2' 
                    : 'bg-white py-4'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-3 group">
                            <div className="bg-primary-teal p-2 rounded-xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-primary-teal/20">
                                <Plus className="text-white" size={20} strokeWidth={3} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-black text-primary-navy tracking-tighter leading-none">
                                    HealthClear
                                </span>
                                <span className="text-[9px] font-bold text-primary-teal uppercase tracking-[0.2em] mt-1">
                                    Aarogya Path
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Nav Links */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center space-x-2 ${
                                        location.pathname === link.path 
                                            ? 'text-primary-teal bg-primary-teal/5' 
                                            : 'text-health-text-secondary hover:text-primary-teal hover:bg-primary-teal/5'
                                    }`}
                                >
                                    {link.icon && <span>{link.icon}</span>}
                                    <span>{link.name}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center space-x-4">
                            {isLoggedIn ? (
                                <div className="hidden lg:flex items-center space-x-4">
                                    <div className="relative group">
                                        <button
                                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                                            className="flex items-center space-x-3 bg-health-bg/50 px-4 py-2 rounded-full border border-health-border hover:border-primary-teal transition-all group-hover:shadow-md"
                                        >
                                            <div className="w-8 h-8 rounded-full border-2 border-primary-teal overflow-hidden shadow-sm">
                                                <img
                                                    src={user?.photoURL || 'https://i.pravatar.cc/150?u=jane'}
                                                    alt="Avatar"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <span className="text-xs font-bold text-primary-navy truncate max-w-[80px]">
                                                {user?.displayName?.split(' ')[0] || 'User'}
                                            </span>
                                            <ChevronDown size={14} className={`text-health-text-muted transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        <AnimatePresence>
                                            {isProfileOpen && (
                                                <>
                                                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        className="absolute right-0 mt-3 w-56 bg-white border border-health-border rounded-2xl shadow-2xl z-50 overflow-hidden"
                                                    >
                                                        <div className="px-5 py-4 border-b border-health-border bg-health-bg/20">
                                                            <p className="text-[10px] font-bold text-health-text-muted uppercase tracking-widest leading-none mb-2">Account</p>
                                                            <p className="text-sm font-bold text-primary-navy truncate">{user?.email}</p>
                                                        </div>
                                                        <div className="p-2">
                                                            <Link to="/settings" className="flex items-center px-4 py-2.5 text-sm font-bold text-health-text-secondary hover:bg-primary-teal/5 hover:text-primary-teal rounded-xl transition-colors">
                                                                <User size={16} className="mr-3" />
                                                                My Profile
                                                            </Link>
                                                            <Link to="/settings" className="flex items-center px-4 py-2.5 text-sm font-bold text-health-text-secondary hover:bg-primary-teal/5 hover:text-primary-teal rounded-xl transition-colors">
                                                                <Settings size={16} className="mr-3" />
                                                                Settings
                                                            </Link>
                                                            <div className="my-1 border-t border-health-border"></div>
                                                            <button
                                                                onClick={() => { logout(); setIsProfileOpen(false); }}
                                                                className="w-full flex items-center px-4 py-2.5 text-sm font-bold text-health-danger hover:bg-health-danger/5 rounded-xl transition-colors"
                                                            >
                                                                <LogOut size={16} className="mr-3" />
                                                                Sign Out
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                </>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            ) : (
                                <div className="hidden lg:flex items-center space-x-4">
                                    <Link to="/login" className="text-sm font-bold text-primary-navy hover:text-primary-teal transition-colors px-4">
                                        Login
                                    </Link>
                                    <Link to="/signup" className="btn-primary !py-2.5 !px-6 !rounded-xl text-sm">
                                        Sign Up
                                    </Link>
                                </div>
                            )}

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-2.5 bg-health-bg rounded-xl text-primary-navy hover:text-primary-teal transition-colors"
                            >
                                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="lg:hidden bg-white border-t border-health-border overflow-hidden"
                        >
                            <div className="px-4 py-6 space-y-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className="flex items-center space-x-4 px-4 py-3.5 text-base font-bold text-health-text-secondary hover:text-primary-teal hover:bg-primary-teal/5 rounded-2xl transition-all"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.icon && <span>{link.icon}</span>}
                                        <span>{link.name}</span>
                                    </Link>
                                ))}{!isLoggedIn && (
                                    <div className="pt-4 grid grid-cols-2 gap-4">
                                        <Link to="/login" className="px-4 py-3.5 bg-health-bg text-primary-navy text-center rounded-2xl font-bold" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                                        <Link to="/signup" className="px-4 py-3.5 bg-primary-teal text-white text-center rounded-2xl font-bold shadow-lg shadow-primary-teal/20" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
};

export default Navbar;
