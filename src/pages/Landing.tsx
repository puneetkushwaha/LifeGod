import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { ShieldAlert } from 'lucide-react';

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-12 relative">

            {/* Central Hero Graphic */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative py-10"
            >
                {/* Animated Rings */}
                <div className="absolute inset-0 bg-red-600/20 blur-[60px] rounded-full animate-pulse-slow" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-red-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] border border-red-500/10 rounded-full animate-[spin_7s_linear_infinite_reverse]" />

                {/* Logo Container */}
                <div className="relative z-10 w-32 h-32 bg-gradient-to-br from-slate-900 to-black rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(220,38,38,0.3)] border border-white/10">
                    <ShieldAlert className="w-16 h-16 text-red-500 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
                </div>
            </motion.div>

            <div className="space-y-6 z-10">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 uppercase drop-shadow-sm">
                        LifeGod
                    </h1>
                    <div className="h-1 w-20 bg-red-600 mx-auto mt-2 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
                </motion.div>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg text-slate-400 font-medium tracking-wide"
                >
                    WHEN SECONDS DECIDE LIFE
                </motion.p>
            </div>

            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="w-full max-w-xs space-y-6 pt-4"
            >
                <Button
                    size="lg"
                    onClick={() => navigate('/dashboard')}
                    className="w-full text-lg shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] transition-shadow duration-500"
                >
                    Initialize System
                </Button>
                <p className="text-[10px] text-slate-600 uppercase tracking-[0.2em]">
                    System Status: Online
                </p>
            </motion.div>
        </div>
    );
}
