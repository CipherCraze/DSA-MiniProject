import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Clock, User, Activity, Plus, RefreshCw, Trash2, AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const EmergencyTriage = () => {
  const [patients, setPatients] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [patientStats, setPatientStats] = useState({
    Critical: 0,
    Serious: 0,
    Moderate: 0,
    Normal: 0
  });
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    symptom: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showSymptomGuide, setShowSymptomGuide] = useState(false);

  const API_URL = 'http://localhost:8000/api/emergency';

  // Fetch data on mount and set up polling
  useEffect(() => {
    fetchInitialData();
    
    // Poll every 5 seconds for updates
    const interval = setInterval(() => {
      fetchPatients();
      fetchStats();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchInitialData = async () => {
    await Promise.all([
      fetchPatients(),
      fetchStats(),
      fetchSymptoms()
    ]);
    setLoading(false);
  };

  const fetchPatients = async () => {
    try {
      const response = await fetch(`${API_URL}/patients`);
      if (!response.ok) throw new Error('Failed to fetch patients');
      const data = await response.json();
      setPatients(data);
      setError('');
    } catch (error) {
      console.error('Error fetching patients:', error);
      if (loading) {
        setError('Failed to connect to server. Please ensure FastAPI is running on port 8000.');
      }
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/stats`);
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setPatientStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchSymptoms = async () => {
    try {
      const response = await fetch(`${API_URL}/symptoms`);
      if (!response.ok) throw new Error('Failed to fetch symptoms');
      const data = await response.json();
      setSymptoms(data);
    } catch (error) {
      console.error('Error fetching symptoms:', error);
    }
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_URL}/patients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newPatient.name,
          age: parseInt(newPatient.age),
          symptom: newPatient.symptom.toLowerCase()
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail?.message || result.detail || 'Failed to add patient');
      }

      setSuccess(`✅ ${result.patient.name} registered with ${result.patient.severity} priority! (Position: ${result.patient.queuePosition})`);
      setNewPatient({ name: '', age: '', symptom: '' });
      setShowAddForm(false);
      
      await fetchPatients();
      await fetchStats();

      setTimeout(() => setSuccess(''), 5000);
    } catch (error) {
      setError(error.message);
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleTreatPatient = async () => {
    if (patients.length === 0) return;

    try {
      const response = await fetch(`${API_URL}/patients/treat`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Failed to treat patient');

      const result = await response.json();
      setSuccess(`🚑 ${result.patient.name} is being treated by ${result.patient.doctor}! (Waited: ${result.patient.waitedMinutes} min)`);
      
      await fetchPatients();
      await fetchStats();

      setTimeout(() => setSuccess(''), 5000);
    } catch (error) {
      setError(error.message);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([fetchPatients(), fetchStats()]);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleClearQueue = async () => {
    if (!window.confirm('⚠️ Are you sure you want to clear the entire queue? This cannot be undone.')) return;

    try {
      const response = await fetch(`${API_URL}/patients/clear`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to clear queue');

      const result = await response.json();
      setSuccess(`✅ Queue cleared! ${result.patientsCleared} patients removed.`);
      
      await fetchPatients();
      await fetchStats();

      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  const filteredSymptoms = selectedCategory === 'all' 
    ? symptoms 
    : symptoms.filter(s => s.severity === selectedCategory);

  const groupedSymptoms = symptoms.reduce((acc, symptom) => {
    if (!acc[symptom.severity]) acc[symptom.severity] = [];
    acc[symptom.severity].push(symptom);
    return acc;
  }, {});

  const severityConfig = {
    Critical: {
      gradient: 'from-red-500 to-rose-600',
      bg: 'bg-red-50',
      border: 'border-red-500',
      text: 'text-red-700',
      icon: AlertTriangle,
      emoji: '🔴',
      priority: 1,
      description: 'Life-threatening conditions requiring immediate attention'
    },
    Serious: {
      gradient: 'from-orange-500 to-amber-600',
      bg: 'bg-orange-50',
      border: 'border-orange-500',
      text: 'text-orange-700',
      icon: AlertCircle,
      emoji: '🟠',
      priority: 2,
      description: 'Serious conditions requiring urgent care'
    },
    Moderate: {
      gradient: 'from-yellow-500 to-yellow-600',
      bg: 'bg-yellow-50',
      border: 'border-yellow-500',
      text: 'text-yellow-700',
      icon: Clock,
      emoji: '🟡',
      priority: 3,
      description: 'Moderate conditions that need timely attention'
    },
    Normal: {
      gradient: 'from-green-500 to-emerald-600',
      bg: 'bg-green-50',
      border: 'border-green-500',
      text: 'text-green-700',
      icon: CheckCircle2,
      emoji: '🟢',
      priority: 4,
      description: 'Minor conditions that can wait'
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Emergency Triage System...</p>
          {error && (
            <p className="text-red-600 mt-4 bg-red-50 px-4 py-2 rounded-lg max-w-md mx-auto">
              {error}
            </p>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Notifications */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center space-x-3 max-w-md"
            >
              <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
              <p className="font-semibold">{success}</p>
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center space-x-3 max-w-md"
            >
              <XCircle className="w-6 h-6 flex-shrink-0" />
              <p className="font-semibold">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-textPrimary mb-2">🚑 Emergency Triage System</h1>
              <p className="text-textSecondary">Real-time patient prioritization and doctor allocation</p>
            </div>
            <div className="flex space-x-3 mt-4 md:mt-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSymptomGuide(!showSymptomGuide)}
                className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                <Info className="w-5 h-5" />
                <span>Symptom Guide</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearQueue}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                <Trash2 className="w-5 h-5" />
                <span>Clear Queue</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Symptom Guide Modal */}
        <AnimatePresence>
          {showSymptomGuide && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowSymptomGuide(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto p-8"
              >
                <h2 className="text-3xl font-bold text-textPrimary mb-6">📋 Symptom Guide</h2>
                <div className="space-y-6">
                  {Object.entries(severityConfig).map(([level, config]) => {
                    const symptomsForLevel = groupedSymptoms[level] || [];
                    const Icon = config.icon;
                    return (
                      <div key={level} className={`${config.bg} rounded-xl p-6 border-2 ${config.border}`}>
                        <div className="flex items-center space-x-3 mb-4">
                          <Icon className={`${config.text} w-8 h-8`} />
                          <h3 className={`text-2xl font-bold ${config.text}`}>{level}</h3>
                          <span className="text-2xl">{config.emoji}</span>
                        </div>
                        <p className="text-gray-600 mb-4">{config.description}</p>
                        {symptomsForLevel.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {symptomsForLevel.map((symptom, idx) => (
                              <span
                                key={idx}
                                className="bg-white px-3 py-2 rounded-lg text-sm font-medium text-gray-700 shadow-sm"
                              >
                                {symptom.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSymptomGuide(false)}
                  className="mt-6 w-full bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Close Guide
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Severity Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(severityConfig).map(([severity, config], index) => {
            const count = patientStats[severity] || 0;
            const Icon = config.icon;
            return (
              <motion.div
                key={severity}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`${config.bg} rounded-xl shadow-lg p-6 border-2 ${config.border}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{config.emoji}</span>
                  <Icon className={`${config.text} w-6 h-6`} />
                </div>
                <p className={`text-3xl font-bold ${config.text}`}>{count}</p>
                <p className="text-textSecondary text-sm mt-1">{severity}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center justify-center space-x-3 bg-gradient-to-r from-primary to-secondary text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-6 h-6" />
            <span>{showAddForm ? 'Cancel Registration' : 'Register New Patient'}</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleTreatPatient}
            disabled={patients.length === 0}
            className="flex items-center justify-center space-x-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Activity className="w-6 h-6" />
            <span>Treat Next Patient</span>
          </motion.button>
        </div>

        {/* Add Patient Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-primary">
                <h3 className="text-2xl font-bold text-textPrimary mb-6">🏥 Register New Patient</h3>
                <form onSubmit={handleAddPatient} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-textPrimary mb-2">
                        Patient Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={newPatient.name}
                        onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                        placeholder="Enter full name"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-textPrimary mb-2">
                        Age *
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        max="150"
                        value={newPatient.age}
                        onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                        placeholder="Enter age"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-textPrimary mb-2">
                      Symptom / Condition *
                    </label>
                    <select
                      required
                      value={newPatient.symptom}
                      onChange={(e) => setNewPatient({ ...newPatient, symptom: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    >
                      <option value="">-- Select Symptom --</option>
                      {symptoms.map((symptom, idx) => {
                        const config = severityConfig[symptom.severity];
                        return (
                          <option key={idx} value={symptom.name}>
                            {config.emoji} {symptom.name} ({symptom.severity})
                          </option>
                        );
                      })}
                    </select>
                    <p className="text-sm text-gray-500 mt-2">
                      💡 Click "Symptom Guide" above to see all symptoms categorized by severity
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    ✅ Register Patient
                  </motion.button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Queue Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6 flex items-center justify-between"
        >
          <h2 className="text-2xl font-bold text-textPrimary flex items-center">
            <Activity className="mr-2" />
            Patient Queue ({patients.length} waiting)
          </h2>
        </motion.div>

        {/* Empty State */}
        {patients.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-lg p-12 text-center"
          >
            <div className="text-6xl mb-4">🏥</div>
            <h3 className="text-2xl font-bold text-textPrimary mb-2">No Patients in Queue</h3>
            <p className="text-textSecondary mb-6">The emergency queue is currently empty. Click "Register New Patient" to add patients.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddForm(true)}
              className="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Register First Patient
            </motion.button>
          </motion.div>
        ) : (
          /* Patient Cards */
          <div className="space-y-4">
            {patients.map((patient, index) => {
              const config = severityConfig[patient.severity];
              const Icon = config.icon;
              return (
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className={`bg-white rounded-xl shadow-lg p-6 border-l-8 ${config.border}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start space-x-4 mb-4 md:mb-0">
                      <div className={`bg-gradient-to-br ${config.gradient} p-4 rounded-xl text-white flex items-center justify-center`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-textPrimary">#{patient.queuePosition} {patient.name}</h3>
                        <p className="text-textSecondary">Age: {patient.age} years</p>
                        <p className={`font-semibold ${config.text} mt-1`}>
                          {config.emoji} {patient.symptom}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:text-right">
                      <div className="flex md:justify-end items-center space-x-2">
                        <Clock className="text-textSecondary w-4 h-4" />
                        <span className="text-textSecondary text-sm">{patient.waitTime}</span>
                      </div>
                      <div className="flex md:justify-end items-center space-x-2">
                        <User className="text-primary w-4 h-4" />
                        <span className="text-textPrimary font-semibold text-sm">{patient.doctor}</span>
                      </div>
                    </div>
                  </div>

                  {/* Priority Badge */}
                  <div className="mt-4 flex justify-between items-center">
                    <span className={`${config.bg} ${config.text} px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2`}>
                      <Icon className="w-4 h-4" />
                      <span>{patient.severity} Priority</span>
                    </span>
                    {index === 0 && (
                      <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2 animate-pulse">
                        <AlertCircle className="w-4 h-4" />
                        <span>NEXT IN LINE</span>
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyTriage;
