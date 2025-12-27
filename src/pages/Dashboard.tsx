import { useNavigate } from 'react-router-dom';
import { useSensor } from '../context/SensorContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MapPin, Navigation, Gauge, Settings, Home, AlertTriangle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
    const navigate = useNavigate();
    const { acceleration, impact, location, requestPermission, permissionGranted } = useSensor();

    // Derived values
    const speed = location.speed || 0;
    const coords = acceleration;

    // Optional: Auto-request on mount? No, better to have user interaction.
    // We can show a small banner if permission is not granted.

    return (
        <div className="flex-1 flex flex-col space-y-6 relative pb-24">

            {/* Dynamic Header */}
            <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md">
                <div className="flex items-center space-x-3">
                    <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_10px_#22c55e]"></span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">System Status</span>
                        <span className="text-sm font-bold text-green-400 uppercase tracking-wider text-glow">Monitoring Active</span>
                    </div>
                </div>
                {!permissionGranted && (
                    <Button variant="ghost" size="sm" onClick={requestPermission} className="text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/50 hover:bg-blue-500/30">
                        ENABLE SENSORS
                    </Button>
                )}
            </div>

            {/* Main Metrics (Speed & G-Force) */}
            <div className="grid grid-cols-2 gap-4">
                <Card variant="glass" className="p-4 flex flex-col items-center justify-center space-y-3 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 opacity-20">
                        <Gauge className="w-12 h-12" />
                    </div>
                    <div className="text-slate-400 text-[10px] uppercase tracking-[0.2em]">Velocity</div>
                    <div className="text-4xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
                        {speed.toFixed(0)} <span className="text-sm text-slate-500 font-sans">km/h</span>
                    </div>
                    {/* Decorative bar */}
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" style={{ width: `${(speed / 60) * 100}%` }} />
                    </div>
                </Card>

                <Card variant="glass" className="p-4 flex flex-col items-center justify-center space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-20">
                        <Zap className="w-12 h-12" />
                    </div>
                    <div className="text-slate-400 text-[10px] uppercase tracking-[0.2em]">Impact Force</div>
                    <div className="text-4xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
                        {impact.toFixed(1)} <span className="text-sm text-slate-500 font-sans">G</span>
                    </div>
                    <ActivityIndicator value={impact} />
                </Card>
            </div>

            {/* 3-Axis Gyro Data */}
            <Card variant="hud">
                <div className="text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-6 flex items-center justify-between">
                    <span>Gyroscope Telemetry</span>
                    <Navigation className="w-4 h-4 text-slate-500 opacity-50" />
                </div>
                <div className="grid grid-cols-3 gap-3 text-center font-mono">
                    <AxisDisplay label="X-AXIS" value={coords.x} color="text-red-400" />
                    <AxisDisplay label="Y-AXIS" value={coords.y} color="text-blue-400" />
                    <AxisDisplay label="Z-AXIS" value={coords.z} color="text-green-400" />
                </div>
            </Card>

            {/* Live Map */}
            <Card className="flex-1 min-h-[220px] bg-[#1a1b26] border border-white/5 relative overflow-hidden flex flex-col">
                {/* Map Background - Cleaner */}
                <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-122.4194,37.7749,15,45,60/600x600?access_token=placeholder')] bg-cover bg-center opacity-75" />

                {/* Location Marker - Standard Pulse */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg z-10" />
                    <div className="absolute w-12 h-12 bg-blue-500/20 rounded-full animate-pulse z-0" />
                </div>

                {/* Info Overlay - Professional */}
                <div className="relative z-10 mt-auto p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        <div className="text-sm font-medium text-white">Live Location Tracking</div>
                    </div>
                    <div className="text-xs text-slate-400 ml-6 font-mono tracking-wide">
                        {location.lat ? `${location.lat.toFixed(4)}° N, ${location.long.toFixed(4)}° E` : 'Waiting for GPS...'}
                    </div>
                </div>
            </Card>

            {/* Trigger */}
            <Button
                variant="danger"
                size="lg"
                className="w-full shadow-[0_0_40px_rgba(220,38,38,0.3)] border-red-500/30"
                onClick={() => navigate('/accident')}
            >
                <AlertTriangle className="mr-2 w-5 h-5 animate-pulse" />
                Simulate Critical Event
            </Button>

            {/* Floating Dock Nav */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 flex items-center space-x-10 shadow-2xl z-50">
                <Home className="w-6 h-6 text-slate-500 cursor-pointer hover:text-white transition-all hover:scale-110 hover:drop-shadow-[0_0_8px_white]" onClick={() => navigate('/')} />
                <div className="w-12 h-12 bg-gradient-to-t from-red-600 to-red-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.5)] cursor-pointer -mt-8 border border-red-400/30 hover:scale-105 transition-transform">
                    <Navigation className="w-6 h-6 text-white" />
                </div>
                <Settings className="w-6 h-6 text-slate-500 cursor-pointer hover:text-white transition-all hover:scale-110 hover:drop-shadow-[0_0_8px_white]" onClick={() => navigate('/settings')} />
            </div>
        </div>
    );
}

function AxisDisplay({ label, value, color }: any) {
    return (
        <div className="bg-white/5 border border-white/5 p-3 rounded-lg backdrop-blur-sm">
            <div className="text-slate-500 text-[8px] tracking-widest mb-1">{label}</div>
            <div className={`text-sm ${color} drop-shadow-sm`}>{value.toFixed(2)}</div>
        </div>
    )
}

function ActivityIndicator({ value }: { value: number }) {
    return (
        <div className="w-full flex space-x-0.5 mt-2">
            {[...Array(10)].map((_, i) => (
                <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i < (value * 3) ? 'bg-amber-500 shadow-[0_0_5px_#f59e0b]' : 'bg-slate-800'}`}
                />
            ))}
        </div>
    )
}
