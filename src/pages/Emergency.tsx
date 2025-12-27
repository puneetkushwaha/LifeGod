import { useNavigate } from 'react-router-dom';
import { PhoneOutgoing, MapPin, Users, ArrowLeft, Radio } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { motion } from 'framer-motion';
import { useSensor } from '../context/SensorContext';

export default function Emergency() {
    const navigate = useNavigate();
    const { location } = useSensor();

    return (
        <div className="flex-1 flex flex-col space-y-8 pt-8 pb-8 relative">

            {/* Hero Header */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center text-center space-y-6"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-red-500 blur-[50px] opacity-20 animate-pulse" />
                    <div className="w-24 h-24 rounded-full border-2 border-red-500/50 flex items-center justify-center bg-black/40 backdrop-blur-xl shadow-[0_0_30px_rgba(220,38,38,0.4)] relative z-10">
                        <Radio className="w-10 h-10 text-red-500 animate-pulse" />
                    </div>
                </div>

                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter drop-shadow-lg">Alert Broadcasted</h1>
                    <p className="text-red-400 font-mono text-xs uppercase tracking-[0.2em] mt-2">Protocol 77-Alpha Initiated</p>
                </div>
            </motion.div>

            {/* Status Timeline */}
            <div className="space-y-4 relative pl-4">
                {/* Vertical Line */}
                <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-green-500 via-green-500/50 to-transparent" />

                <StatusItem
                    icon={MapPin}
                    label="Coordinates Locked"
                    sub={location.lat ? `${location.lat.toFixed(5)}, ${location.long.toFixed(5)}` : "Acquiring GPS..."}
                    active
                />
                <StatusItem icon={Users} label="Guardians Notified" sub="3 Contacts Recieved Alert" active delay={0.5} />
                <StatusItem icon={PhoneOutgoing} label="Emergency Voice Link" sub="Dialing 112..." active pulse delay={1} />
            </div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-auto space-y-4"
            >
                <Card variant="alert" className="border-l-4 border-l-red-500">
                    <div className="flex items-center space-x-4">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                        <div>
                            <span className="text-sm font-bold text-red-100 uppercase tracking-wider block">Live Beacon Active</span>
                            <span className="text-[10px] text-red-400/80 uppercase">Do not close this application</span>
                        </div>
                    </div>
                </Card>

                <Button variant="secondary" onClick={() => navigate('/dashboard')} className="w-full">
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Abort / Return to Dashboard
                </Button>
            </motion.div>
        </div>
    );
}

function StatusItem({ icon: Icon, label, sub, active, pulse, delay = 0 }: any) {
    return (
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay }}
            className="flex items-center space-x-4 bg-slate-900/40 p-4 rounded-r-xl border-l-4 border-l-transparent hover:bg-white/5 transition-colors relative z-10 ml-2"
            style={{ borderLeftColor: active ? '#22c55e' : 'transparent' }}
        >
            <div className={`p-2 rounded-lg ${active ? 'bg-green-500/10 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'bg-slate-800 text-slate-500'}`}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
                <div className="font-bold text-white text-sm uppercase tracking-wide flex items-center justify-between">
                    {label}
                    {pulse && <span className="text-[10px] bg-red-500 px-2 py-0.5 rounded text-white animate-pulse shadow-[0_0_10px_red]">LIVE</span>}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-1">{sub}</div>
            </div>
        </motion.div>
    )
}
