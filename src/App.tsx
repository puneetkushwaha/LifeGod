import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './layout/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Accident from './pages/Accident';
import Emergency from './pages/Emergency';
import Settings from './pages/Settings';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        {/* Accident screen is full screen, outside layout padding/constraints if needed, 
            but using Layout for consistent background if desired. 
            However, Accident needs to be alarming. Let's keep it in layout but maybe override styles?
            Actually, the Accident page has fixed inset-0 z-50 so it overlays everything.
        */}
        <Route path="/accident" element={<Accident />} />
      </Routes>
    </AnimatePresence>
  );
}

import { SensorProvider } from './context/SensorContext';

function App() {
  return (
    <BrowserRouter>
      <SensorProvider>
        <AnimatedRoutes />
      </SensorProvider>
    </BrowserRouter>
  );
}

export default App;
