import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useSound } from '../hooks/useSound';

export default function Accident() {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(60);
    const [isEmergencySent, setIsEmergencySent] = useState(false);

    // Play siren while on this page
    useSound(true);

    useEffect(() => {
        if (timeLeft > 0 && !isEmergencySent) {
            const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && !isEmergencySent) {
            handleEmergencyTrigger();
        }
    }, [timeLeft, isEmergencySent]);

    const handleSafe = () => {
        navigate('/dashboard');
    };

    const handleEmergencyTrigger = () => {
        setIsEmergencySent(true);
        navigate('/emergency');
    };

    return (
        <div className="fixed inset-0 z-50 bg-[#1a0505] flex flex-col items-center justify-center p-6 text-white overflow-hidden font-mono">

            {/* Aggressive Background Pulse */}
            <motion.div
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/40 via-transparent to-transparent z-0"
            />

            {/* Moving Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 mix-blend-overlay" />

            <div className="relative z-10 flex flex-col items-center space-y-10 w-full max-w-md text-center">

                {/* Siren Icon with Shake */}
                <motion.div
                    animate={{ x: [-2, 2, -2], rotate: [-5, 5, -5] }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-red-500 blur-2xl opacity-50 animate-pulse" />
                    <Bell className="w-20 h-20 text-red-500 fill-red-500/20 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
                </motion.div>

                <div className="space-y-4">
                    <h1 className="text-5xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-900 drop-shadow-sm">
                        CRITICAL
                    </h1>
                    <p className="text-red-200 text-xl font-bold tracking-wider uppercase">Are you responsive?</p>
                </div>

                {/* Segmented Countdown Circle */}
                <div className="relative w-64 h-64 flex items-center justify-center">
                    {/* Static Ring */}
                    <div className="absolute inset-0 border-4 border-red-900/30 rounded-full" />

                    {/* Ticks */}
                    {[...Array(60)].map((_, i) => (
                        <div
                            key={i}
                            className={`absolute w-1 h-3 bg-red-800 ${i < timeLeft ? 'bg-red-500 shadow-[0_0_5px_red]' : 'opacity-20'}`}
                            style={{
                                top: '50%', left: '50%',
                                transform: `translate(-50%, -50%) rotate(${i * 6}deg) translateY(-110px)`
                            }}
                        />
                    ))}

                    {/* Center Timer */}
                    <div className="text-8xl font-black text-white drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] tabular-nums">
                        {timeLeft}
                    </div>
                    <div className="absolute bottom-16 text-xs text-red-400 font-bold tracking-[0.3em] uppercase">Seconds Remaining</div>
                </div>

                <div className="w-full space-y-5 pt-8">
                    <Button
                        variant="glass"
                        size="xl"
                        className="bg-green-600 hover:bg-green-500 border-none w-full py-6 text-2xl font-black italic tracking-tighter shadow-[0_0_40px_rgba(34,197,94,0.4)]"
                        onClick={handleSafe}
                    >
                        I AM SAFE
                    </Button>

                    <div
                        className="text-red-400/60 text-sm uppercase tracking-widest cursor-pointer hover:text-red-400 hover:underline underline-offset-4 transition-colors p-2"
                        onClick={handleEmergencyTrigger}
                    >
                        Trigger Emergency Immediately
                    </div>
                </div>
            </div>
        </div>
    );
}
