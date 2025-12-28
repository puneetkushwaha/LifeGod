import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Phone, Volume2, Shield, ChevronRight, Edit2, Plus, Trash2, X, Save } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useUser } from '../context/UserContext';

export default function Settings() {
    const navigate = useNavigate();
    const { userProfile, contacts, updateProfile, addContact, removeContact } = useUser();

    // State for toggles
    const [siren, setSiren] = useState(true);
    const [autoTrigger, setAutoTrigger] = useState(true);

    // Edit Mode States
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [tempProfile, setTempProfile] = useState(userProfile);

    // Contact Add State
    const [isAddingContact, setIsAddingContact] = useState(false);
    const [newContact, setNewContact] = useState({ name: '', phone: '', isEmergency: false });

    const handleProfileSave = () => {
        updateProfile(tempProfile);
        setIsEditingProfile(false);
    };

    const handleAddContact = () => {
        if (newContact.name && newContact.phone) {
            addContact(newContact);
            setNewContact({ name: '', phone: '', isEmergency: false });
            setIsAddingContact(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col space-y-8 relative pb-20">
            <div className="flex items-center space-x-4 mb-2">
                <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="p-0 hover:bg-transparent">
                    <ArrowLeft className="w-6 h-6 text-white" />
                </Button>
                <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Configuration</h1>
            </div>

            {/* Profile Section */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 p-6 border border-white/10 group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[40px] -mr-10 -mt-10 pointer-events-none" />

                <div className="flex items-center justify-between relative z-10 mb-4">
                    <div className="flex items-center space-x-5">
                        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] transform rotate-3">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        {!isEditingProfile && (
                            <div>
                                <div className="text-xl font-bold text-white tracking-wide">{userProfile.name}</div>
                                <div className="text-sm text-blue-400 font-mono tracking-wider">{userProfile.phone}</div>
                                {userProfile.bloodGroup && <div className="text-xs text-slate-500 mt-1">Blood Type: <span className="text-slate-300">{userProfile.bloodGroup}</span></div>}
                            </div>
                        )}
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            if (isEditingProfile) handleProfileSave();
                            else { setTempProfile(userProfile); setIsEditingProfile(true); }
                        }}
                        className={`p-2 ${isEditingProfile ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' : 'bg-white/5 text-white hover:bg-white/10'}`}
                    >
                        {isEditingProfile ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                    </Button>
                </div>

                {isEditingProfile && (
                    <div className="space-y-3 pt-2 border-t border-white/10 animate-in fade-in slide-in-from-top-2">
                        <div>
                            <label className="text-xs text-slate-500 uppercase font-bold tracking-wider">Name</label>
                            <input
                                type="text"
                                value={tempProfile.name}
                                onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                                className="w-full bg-slate-950/50 border border-white/10 rounded-lg p-2 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-slate-500 uppercase font-bold tracking-wider">Phone</label>
                            <input
                                type="text"
                                value={tempProfile.phone}
                                onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                                className="w-full bg-slate-950/50 border border-white/10 rounded-lg p-2 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs text-slate-500 uppercase font-bold tracking-wider">Blood Group</label>
                                <input
                                    type="text"
                                    value={tempProfile.bloodGroup || ''}
                                    onChange={(e) => setTempProfile({ ...tempProfile, bloodGroup: e.target.value })}
                                    placeholder="O+"
                                    className="w-full bg-slate-950/50 border border-white/10 rounded-lg p-2 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Emergency Contacts */}
            <div className="space-y-4">
                <div className="flex items-center justify-between pl-1">
                    <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Guardians</h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsAddingContact(!isAddingContact)}
                        className="h-6 w-6 p-0 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                    >
                        {isAddingContact ? <X className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                    </Button>
                </div>

                {isAddingContact && (
                    <Card variant="default" className="p-4 space-y-3 border-blue-500/30 animate-in fade-in zoom-in-95">
                        <h3 className="text-sm font-bold text-white mb-2">New Contact</h3>
                        <input
                            placeholder="Name"
                            value={newContact.name}
                            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                            className="w-full bg-slate-950/50 border border-white/10 rounded-lg p-2 text-white text-sm focus:outline-none focus:border-blue-500/50"
                        />
                        <input
                            placeholder="Phone Number"
                            value={newContact.phone}
                            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                            className="w-full bg-slate-950/50 border border-white/10 rounded-lg p-2 text-white text-sm focus:outline-none focus:border-blue-500/50"
                        />
                        <div className="flex items-center space-x-2 pt-1">
                            <input
                                type="checkbox"
                                id="is-emergency"
                                checked={newContact.isEmergency}
                                onChange={(e) => setNewContact({ ...newContact, isEmergency: e.target.checked })}
                                className="accent-blue-500"
                            />
                            <label htmlFor="is-emergency" className="text-xs text-slate-400">Mark as Emergency Service</label>
                        </div>
                        <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white" onClick={handleAddContact}>
                            Add Guardian
                        </Button>
                    </Card>
                )}

                <Card variant="glass" className="space-y-0 p-0 overflow-hidden divide-y divide-white/5">
                    {contacts.map((contact) => (
                        <ContactItem
                            key={contact.id}
                            name={contact.name}
                            number={contact.phone}
                            isEmergency={contact.isEmergency}
                            onDelete={() => removeContact(contact.id)}
                        />
                    ))}
                    {contacts.length === 0 && (
                        <div className="p-4 text-center text-slate-500 text-xs italic">No contacts added.</div>
                    )}
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
        </div>
    );
}

function ContactItem({ name, number, isEmergency, onDelete }: any) {
    return (
        <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer group relative">
            <div className="flex items-center space-x-4">
                <div className={`p-2.5 rounded-xl ${isEmergency ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-slate-400'}`}>
                    <Phone className="w-4 h-4" />
                </div>
                <div>
                    <div className="text-sm font-bold text-white tracking-wide group-hover:text-blue-400 transition-colors">{name}</div>
                    <div className="text-xs text-slate-500 font-mono">{number}</div>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                    className="p-2 text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
            </div>
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
