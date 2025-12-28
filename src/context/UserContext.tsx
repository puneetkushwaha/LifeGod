import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types
export interface UserProfile {
    name: string;
    phone: string;
    bloodGroup?: string;
    medicalInfo?: string;
}

export interface Contact {
    id: string;
    name: string;
    phone: string;
    isEmergency: boolean;
}

interface UserContextType {
    userProfile: UserProfile;
    contacts: Contact[];
    updateProfile: (profile: UserProfile) => void;
    addContact: (contact: Omit<Contact, 'id'>) => void;
    removeContact: (id: string) => void;
    updateContact: (id: string, contact: Omit<Contact, 'id'>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Default initial state
const defaultProfile: UserProfile = {
    name: "John Doe",
    phone: "+91 98765 43210",
    bloodGroup: "O+",
    medicalInfo: "None"
};

const defaultContacts: Contact[] = [
    { id: '1', name: "Mom", phone: "+91 98XXX XXXXX", isEmergency: false },
    { id: '2', name: "Emergency HQ", phone: "112", isEmergency: true }
];

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initialize state from localStorage or defaults
    const [userProfile, setUserProfile] = useState<UserProfile>(() => {
        const saved = localStorage.getItem('lifegod_profile');
        return saved ? JSON.parse(saved) : defaultProfile;
    });

    const [contacts, setContacts] = useState<Contact[]>(() => {
        const saved = localStorage.getItem('lifegod_contacts');
        return saved ? JSON.parse(saved) : defaultContacts;
    });

    // Persist to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('lifegod_profile', JSON.stringify(userProfile));
    }, [userProfile]);

    useEffect(() => {
        localStorage.setItem('lifegod_contacts', JSON.stringify(contacts));
    }, [contacts]);

    const updateProfile = (profile: UserProfile) => {
        setUserProfile(profile);
    };

    const addContact = (contact: Omit<Contact, 'id'>) => {
        const newContact = { ...contact, id: crypto.randomUUID() };
        setContacts(prev => [...prev, newContact]);
    };

    const removeContact = (id: string) => {
        setContacts(prev => prev.filter(c => c.id !== id));
    };

    const updateContact = (id: string, updatedContact: Omit<Contact, 'id'>) => {
        setContacts(prev => prev.map(c => c.id === id ? { ...updatedContact, id } : c));
    };

    return (
        <UserContext.Provider value={{ userProfile, contacts, updateProfile, addContact, removeContact, updateContact }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
