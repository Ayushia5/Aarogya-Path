import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Bell, User, Menu, X, Plus,
    ChevronDown, LayoutDashboard, Search as SearchIcon,
    Users, ShieldCheck, LogOut, Settings
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
        const handleScroll = () => setIsScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = isLoggedIn
        ? [
            { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
            { name: 'Cost Risk Estimator', path: '/cost-estimator/step-1', icon: <SearchIcon size={18} /> },
            { name: 'Find Providers', path: '/providers', icon: <Users size={18} /> },
            { name: 'AI Chat', path: '/ai-chat', icon: <ShieldCheck size={18} /> },
        ]
        : [
            { name: 'How It Works', path: '/#how-it-works' },
            { name: 'Providers', path: '/providers' },
        ];

    const navbarClasses = `fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/90 backdrop-blur-md border-b border-health-border'
        : 'bg-transparent'
        }`;

    return (
        <nav className={navbarClasses}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="bg-primary-teal p-1.5 rounded-lg transition-transform group-hover:scale-110">
                            <Plus className="text-white" size={20} strokeWidth={3} />
                        </div>
                        <span className="text-2xl font-bold text-primary-navy tracking-tight">
                            Aarogya Path
                        </span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-medium transition-colors hover:text-primary-teal flex items-center space-x-2 ${location.pathname === link.path ? 'text-primary-teal' : 'text-health-text-secondary'
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
                            <div className="hidden md:flex items-center space-x-6">
                                {/* Search Bar */}
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="text-health-text-muted" size={16} />
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Search providers, costs..."
                                        className="pl-10 pr-4 py-2 bg-health-bg border border-health-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-teal/20 focus:border-primary-teal transition-all w-64"
                                    />
                                </div>

                                {/* Notifications */}
                                <div className="relative cursor-pointer hover:bg-health-bg p-2 rounded-full transition-colors">
                                    <Bell className="text-health-text-secondary" size={20} />
                                    <span className="absolute top-1.5 right-1.5 bg-health-danger text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                                        3
                                    </span>
                                </div>

                                {/* Profile Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center space-x-1 focus:outline-none"
                                    >
                                        <div className="w-9 h-9 rounded-full border-2 border-primary-teal overflow-hidden hover:opacity-80 transition-opacity">
                                            <img
                                                src={user?.photoURL || 'https://i.pravatar.cc/150?u=jane'}
                                                alt="Avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isProfileOpen && (
                                            <>
                                                <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute right-0 mt-2 w-48 bg-white border border-health-border rounded-xl shadow-xl z-50 overflow-hidden"
                                                >
                                                    <div className="px-4 py-3 border-b border-health-border bg-health-bg/50">
                                                        <p className="text-xs text-health-text-muted">Signed in as</p>
                                                        <p className="text-sm font-semibold truncate">{user?.email || 'Sarah Jenkins'}</p>
                                                    </div>
                                                    <div className="py-1">
                                                        <Link
                                                            to="/settings"
                                                            className="flex items-center px-4 py-2 text-sm text-health-text-secondary hover:bg-health-bg hover:text-primary-teal transition-colors"
                                                            onClick={() => setIsProfileOpen(false)}
                                                        >
                                                            <User size={16} className="mr-3" />
                                                            My Profile
                                                        </Link>
                                                        <Link
                                                            to="/settings"
                                                            className="flex items-center px-4 py-2 text-sm text-health-text-secondary hover:bg-health-bg hover:text-primary-teal transition-colors"
                                                            onClick={() => setIsProfileOpen(false)}
                                                        >
                                                            <Settings size={16} className="mr-3" />
                                                            Settings
                                                        </Link>
                                                        <button
                                                            onClick={() => {
                                                                logout();
                                                                setIsProfileOpen(false);
                                                            }}
                                                            className="w-full flex items-center px-4 py-2 text-sm text-health-danger hover:bg-health-danger/5 transition-colors"
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
                            <div className="hidden md:flex items-center space-x-6">
                                <Link to="/signup" className="btn-outline !py-1.5 !px-5 text-sm">
                                    Sign Up
                                </Link>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-health-text-secondary hover:text-primary-teal p-2"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
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
                        className="md:hidden bg-white border-b border-health-border overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="block px-3 py-4 text-base font-medium text-health-text-secondary hover:text-primary-teal hover:bg-health-bg rounded-lg border-l-4 border-transparent hover:border-primary-teal transition-all"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <div className="flex items-center space-x-3">
                                        {link.icon && <span>{link.icon}</span>}
                                        <span>{link.name}</span>
                                    </div>
                                </Link>
                            ))}
                            {!isLoggedIn && (
                                <div className="pt-4 border-t border-health-border mt-4">
                                    <Link
                                        to="/signup"
                                        className="block w-full text-center px-4 py-3 bg-primary-teal text-white rounded-lg font-bold shadow-lg"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Sign Up Now
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
