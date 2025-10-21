import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WelcomePage from './pages/WelcomePage';
import PharmacyManagement from './pages/PharmacyManagement';
import EmergencyTriage from './pages/EmergencyTriage';
import AppointmentScheduling from './pages/AppointmentScheduling';
import HospitalNavigation from './pages/HospitalNavigation';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/pharmacy" element={<PharmacyManagement />} />
            <Route path="/triage" element={<EmergencyTriage />} />
            <Route path="/appointments" element={<AppointmentScheduling />} />
            <Route path="/navigation" element={<HospitalNavigation />} />
          </Routes>
        </main>
        <Footer />
        <Toaster 
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#333',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
