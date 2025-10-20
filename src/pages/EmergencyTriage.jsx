import { motion } from 'framer-motion';
import { AlertCircle, Clock, User, Activity } from 'lucide-react';
import { useState } from 'react';

const EmergencyTriage = () => {
  const [patients] = useState([
    { id: 1, name: 'John Doe', age: 45, severity: 'Critical', condition: 'Heart Attack', time: '2 min ago', doctor: 'Dr. Smith' },
    { id: 2, name: 'Jane Smith', age: 32, severity: 'Serious', condition: 'Fracture', time: '5 min ago', doctor: 'Dr. Johnson' },
    { id: 3, name: 'Bob Wilson', age: 58, severity: 'Critical', condition: 'Stroke', time: '1 min ago', doctor: 'Dr. Williams' },
    { id: 4, name: 'Alice Brown', age: 28, severity: 'Moderate', condition: 'Allergic Reaction', time: '10 min ago', doctor: 'Dr. Davis' },
    { id: 5, name: 'Charlie Davis', age: 65, severity: 'Serious', condition: 'Respiratory Distress', time: '3 min ago', doctor: 'Dr. Miller' },
    { id: 6, name: 'Emma Taylor', age: 42, severity: 'Normal', condition: 'Minor Cut', time: '15 min ago', doctor: 'Dr. Anderson' },
    { id: 7, name: 'David Lee', age: 50, severity: 'Moderate', condition: 'Chest Pain', time: '8 min ago', doctor: 'Dr. Thomas' },
    { id: 8, name: 'Sarah Martinez', age: 35, severity: 'Normal', condition: 'Fever', time: '20 min ago', doctor: 'Dr. Garcia' },
  ]);

  const getSeverityConfig = (severity) => {
    const configs = {
      Critical: {
        color: 'from-red-500 to-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-500',
        textColor: 'text-red-600',
        icon: '🔴',
        priority: 1,
      },
      Serious: {
        color: 'from-orange-500 to-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-500',
        textColor: 'text-orange-600',
        icon: '🟠',
        priority: 2,
      },
      Moderate: {
        color: 'from-yellow-500 to-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-500',
        textColor: 'text-yellow-600',
        icon: '🟡',
        priority: 3,
      },
      Normal: {
        color: 'from-green-500 to-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-500',
        textColor: 'text-green-600',
        icon: '🟢',
        priority: 4,
      },
    };
    return configs[severity];
  };

  const sortedPatients = [...patients].sort((a, b) => {
    return getSeverityConfig(a.severity).priority - getSeverityConfig(b.severity).priority;
  });

  const stats = {
    Critical: patients.filter(p => p.severity === 'Critical').length,
    Serious: patients.filter(p => p.severity === 'Serious').length,
    Moderate: patients.filter(p => p.severity === 'Moderate').length,
    Normal: patients.filter(p => p.severity === 'Normal').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-textPrimary mb-2">🚑 Emergency Triage System</h1>
          <p className="text-textSecondary">Real-time patient prioritization and doctor allocation</p>
        </motion.div>

        {/* Severity Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(stats).map(([severity, count], index) => {
            const config = getSeverityConfig(severity);
            return (
              <motion.div
                key={severity}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`${config.bgColor} rounded-xl shadow-lg p-6 border-2 ${config.borderColor}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{config.icon}</span>
                  <AlertCircle className={`${config.textColor} w-6 h-6`} />
                </div>
                <p className={`text-3xl font-bold ${config.textColor}`}>{count}</p>
                <p className="text-textSecondary text-sm mt-1">{severity}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Queue Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold text-textPrimary flex items-center">
            <Activity className="mr-2" />
            Patient Queue
          </h2>
        </motion.div>

        {/* Patient Cards */}
        <div className="space-y-4">
          {sortedPatients.map((patient, index) => {
            const config = getSeverityConfig(patient.severity);
            return (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className={`bg-white rounded-xl shadow-lg p-6 border-l-8 ${config.borderColor}`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start space-x-4 mb-4 md:mb-0">
                    <div className={`bg-gradient-to-br ${config.color} p-4 rounded-xl text-white text-3xl`}>
                      {config.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-textPrimary">{patient.name}</h3>
                      <p className="text-textSecondary">Age: {patient.age} years</p>
                      <p className={`font-semibold ${config.textColor} mt-1`}>{patient.condition}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:text-right">
                    <div className="flex md:justify-end items-center space-x-2">
                      <Clock className="text-textSecondary w-4 h-4" />
                      <span className="text-textSecondary text-sm">{patient.time}</span>
                    </div>
                    <div className="flex md:justify-end items-center space-x-2">
                      <User className="text-primary w-4 h-4" />
                      <span className="text-textPrimary font-semibold text-sm">{patient.doctor}</span>
                    </div>
                  </div>
                </div>

                {/* Priority Badge */}
                <div className="mt-4 flex justify-between items-center">
                  <span className={`${config.bgColor} ${config.textColor} px-4 py-2 rounded-full text-sm font-semibold`}>
                    {patient.severity} Priority
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmergencyTriage;
