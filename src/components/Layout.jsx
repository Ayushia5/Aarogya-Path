import TopBar from './Navbar/TopBar';
import Navbar from './Navbar/Navbar';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <Navbar />
            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex-grow pt-24" // Adjusted for TopBar + Navbar
            >
                {children}
            </motion.main>

            {/* Footer can be added here if needed in the future */}
        </div>
    );
};

export default Layout;
