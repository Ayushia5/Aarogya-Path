import React from 'react';
import { Mail, Phone, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const TopBar = () => {
    return (
        <div className="bg-primary-navy text-white/80 py-2.5 px-4 sm:px-6 lg:px-8 hidden md:block border-b border-white/5">
            <div className="max-w-7xl mx-auto flex justify-between items-center text-[11px] font-bold uppercase tracking-[0.15em]">
                <div className="flex items-center space-x-8">
                    <div className="flex items-center space-x-2">
                        <Mail size={12} className="text-primary-teal" />
                        <span>contact@aarogyapath.in</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Phone size={12} className="text-primary-teal" />
                        <span>+91 1800-123-4567</span>
                    </div>
                    <div className="flex items-center space-x-2 border-l border-white/10 pl-8">
                        <Clock size={12} className="text-primary-teal" />
                        <span>Mon - Sat: 08:00 AM - 08:00 PM</span>
                    </div>
                </div>
                
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-4">
                        <Facebook size={12} className="hover:text-primary-teal cursor-pointer transition-colors" />
                        <Twitter size={12} className="hover:text-primary-teal cursor-pointer transition-colors" />
                        <Instagram size={12} className="hover:text-primary-teal cursor-pointer transition-colors" />
                        <Linkedin size={12} className="hover:text-primary-teal cursor-pointer transition-colors" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
