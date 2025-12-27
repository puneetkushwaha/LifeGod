import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation as useRouteLocation } from 'react-router-dom';

interface Coords {
    x: number;
    y: number;
    z: number;
}

interface Rotation {
    alpha: number;
    beta: number;
    gamma: number;
}

interface GeoLocation {
    lat: number;
    long: number;
    speed: number | null;
}

interface SensorContextType {
    acceleration: Coords;
    rotation: Rotation;
    location: GeoLocation;
    impact: number;
    isMonitoring: boolean;
    permissionGranted: boolean;
    requestPermission: () => Promise<void>;
    toggleMonitoring: () => void;
}

const SensorContext = createContext<SensorContextType | undefined>(undefined);

// Thresholds
const IMPACT_THRESHOLD = 25; // m/s^2. Earth gravity is ~9.8. 25 is a violent shake/drop.

export const SensorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const routeLocation = useRouteLocation(); // Rename to avoid conflict with state variable

    // State
    const [acceleration, setAcceleration] = useState<Coords>({ x: 0, y: 0, z: 0 });
    const [rotation, setRotation] = useState<Rotation>({ alpha: 0, beta: 0, gamma: 0 });
    const [location, setLocation] = useState<GeoLocation>({ lat: 0, long: 0, speed: 0 });
    const [impact, setImpact] = useState<number>(0);
    const [isMonitoring, setIsMonitoring] = useState<boolean>(true);
    const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

    // Refs for throttling/logic to avoid potential re-render loops if we solely relied on state for logic
    const lastImpactTime = useRef<number>(0);

    // 1. Motion Handling
    const handleMotion = useCallback((event: DeviceMotionEvent) => {
        if (!event.accelerationIncludingGravity) return;

        const { x, y, z } = event.accelerationIncludingGravity;
        const accX = x || 0;
        const accY = y || 0;
        const accZ = z || 0;

        // Update state for UI
        setAcceleration({ x: accX, y: accY, z: accZ });

        // Calculate impact vector magnitude
        const totalForce = Math.sqrt(accX ** 2 + accY ** 2 + accZ ** 2);
        setImpact(totalForce);

        // Accident Detection Logic
        // Debounce: Don't trigger if we just triggered or if we are already in Accident/Emergency screen
        // We check route to see if we should trigger.
        const now = Date.now();
        const path = window.location.pathname; // Direct access to avoid dependency lag

        // Only trigger if:
        // 1. Monitoring is active
        // 2. Force exceeds threshold
        // 3. Not already on accident/emergency/settings pages
        // 4. Cooldown has passed (2 seconds)
        if (
            isMonitoring &&
            totalForce > IMPACT_THRESHOLD &&
            !path.includes('/accident') &&
            !path.includes('/emergency') &&
            (now - lastImpactTime.current > 2000)
        ) {
            console.warn("ACCIDENT DETECTED! Force:", totalForce);
            lastImpactTime.current = now;
            navigate('/accident');
        }
    }, [isMonitoring, navigate]);

    // 2. Orientation Handling
    const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
        setRotation({
            alpha: event.alpha || 0,
            beta: event.beta || 0,
            gamma: event.gamma || 0,
        });
    }, []);

    // 3. Geolocation Handling
    useEffect(() => {
        if (!isMonitoring) return;

        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                setLocation({
                    lat: pos.coords.latitude,
                    long: pos.coords.longitude,
                    speed: pos.coords.speed ? pos.coords.speed * 3.6 : 0, // Convert m/s to km/h
                });
            },
            (err) => console.error("GPS Error:", err),
            { enableHighAccuracy: true, maximumAge: 0 }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, [isMonitoring]);

    // Permission Request (iOS 13+)
    const requestPermission = async () => {
        // @ts-ignore - DeviceMotionEvent.requestPermission is iOS specific
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            try {
                // @ts-ignore
                const response = await DeviceMotionEvent.requestPermission();
                if (response === 'granted') {
                    setPermissionGranted(true);
                    window.addEventListener('devicemotion', handleMotion);
                    window.addEventListener('deviceorientation', handleOrientation);
                } else {
                    alert('Permission denied for sensors.');
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            // Non-iOS or older devices usually don't need explicit permission via promise
            setPermissionGranted(true);
            window.addEventListener('devicemotion', handleMotion);
            window.addEventListener('deviceorientation', handleOrientation);
        }
    };

    // Auto-start listeners if permission not required / already granted
    useEffect(() => {
        // Check if we need to ask permission?
        // On standard Chrome/Android, no prompt needed.
        // @ts-ignore
        if (typeof DeviceMotionEvent.requestPermission !== 'function') {
            setPermissionGranted(true);
            window.addEventListener('devicemotion', handleMotion);
            window.addEventListener('deviceorientation', handleOrientation);
        }

        return () => {
            window.removeEventListener('devicemotion', handleMotion);
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, [handleMotion, handleOrientation]);


    const toggleMonitoring = () => setIsMonitoring(prev => !prev);

    return (
        <SensorContext.Provider
            value={{
                acceleration,
                rotation,
                location,
                impact,
                isMonitoring,
                permissionGranted,
                requestPermission,
                toggleMonitoring
            }}
        >
            {children}
        </SensorContext.Provider>
    );
};

export const useSensor = () => {
    const context = useContext(SensorContext);
    if (!context) {
        throw new Error('useSensor must be used within a SensorProvider');
    }
    return context;
};
