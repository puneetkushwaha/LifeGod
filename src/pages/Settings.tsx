import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Phone, Volume2, Shield, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export default function Settings() {
    const navigate = useNavigate();
    const [siren, setSiren] = useState(true);
    const [autoTrigger, setAutoTrigger] = useState(true);

    return (
        <div className="flex-1 flex flex-col space-y-8 relative">
            <div className="flex items-center space-x-4 mb-2">
                <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="p-0 hover:bg-transparent">
                    <ArrowLeft className="w-6 h-6 text-white" />
                </Button>
                <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Configuration</h1>
            </div>

            {/* Profile Section */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 p-6 border border-white/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[40px] -mr-10 -mt-10 pointer-events-none" />
                <div className="flex items-center space-x-5 relative z-10">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] transform rotate-3">
                        <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-white tracking-wide">John Doe</div>
                        <div className="text-sm text-blue-400 font-mono tracking-wider">+91 98765 43210</div>
                    </div>
                </div>
            </div>

            {/* Emergency Contacts */}
            <div className="space-y-4">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] pl-1">Guardians</h2>
                <Card variant="glass" className="space-y-0 p-0 overflow-hidden divide-y divide-white/5">
                    <ContactItem name="Mom" number="+91 98XXX XXXXX" />
                    <ContactItem name="Emergency HQ" number="112" isEmergency />
                </Card>
            </div>

            {/* Preferences */}
            <div className="space-y-4">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] pl-1">System Parameters</h2>
                <Card variant="glass" className="space-y-0 p-0 overflow-hidden divide-y divide-white/5">
                    <ToggleItem
                        icon={Volume2}
                        label="Audible Siren"
                        sub="Max volume alert during active state"
                        checked={siren}
                        onChange={setSiren}
                    />
                    <ToggleItem
                        icon={Shield}
                        label="Auto-Trigger Protocol"
                        sub="Initiate SOS after 60s timeout"
                        checked={autoTrigger}
                        onChange={setAutoTrigger}
                    />
                </Card>
            </div>

            <div className="mt-auto px-4 py-6 border-t border-white/5 space-y-2">
                <div className="text-[10px] text-slate-500/60 leading-tight text-center max-w-xs mx-auto">
                    This prototype uses real sensor data while the app is active.
                    Production versions will use native background services.
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600 font-mono">
                    <span>ID: 884-XP-99</span>
                    <span>V 1.0.4.RC</span>
                </div>
            </div>
        </div>
    );
}

function ContactItem({ name, number, isEmergency }: any) {
    return (
        <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="flex items-center space-x-4">
                <div className={`p-2.5 rounded-xl ${isEmergency ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-slate-400'}`}>
                    <Phone className="w-4 h-4" />
                </div>
                <div>
                    <div className="text-sm font-bold text-white tracking-wide group-hover:text-blue-400 transition-colors">{name}</div>
                    <div className="text-xs text-slate-500 font-mono">{number}</div>
                </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
        </div>
    )
}

function ToggleItem({ icon: Icon, label, sub, checked, onChange }: any) {
    return (
        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors" onClick={() => onChange(!checked)}>
            <div className="flex items-center space-x-4">
                <div className="p-2.5 bg-slate-800 rounded-xl text-slate-400">
                    <Icon className="w-4 h-4" />
                </div>
                <div>
                    <div className="text-sm font-bold text-white tracking-wide">{label}</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">{sub}</div>
                </div>
            </div>
            <div className={`w-12 h-6 rounded-full transition-all duration-300 relative ${checked ? 'bg-blue-600 shadow-[0_0_10px_#2563eb]' : 'bg-slate-800'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${checked ? 'left-7' : 'left-1'}`} />
            </div>
        </div>
    )
}
