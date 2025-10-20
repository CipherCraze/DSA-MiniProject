import { motion } from 'framer-motion';
import { Calendar, Clock, User, Stethoscope, Check, X } from 'lucide-react';
import { useState } from 'react';

const AppointmentScheduling = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('2025-10-21');
  const [selectedTime, setSelectedTime] = useState(null);

  const doctors = [
    { id: 1, name: 'Dr. Sarah Wilson', specialty: 'Cardiologist', available: true, avatar: '👨‍⚕️' },
    { id: 2, name: 'Dr. James Miller', specialty: 'Neurologist', available: true, avatar: '👨‍⚕️' },
    { id: 3, name: 'Dr. Emily Brown', specialty: 'Pediatrician', available: false, avatar: '👩‍⚕️' },
    { id: 4, name: 'Dr. Michael Davis', specialty: 'Orthopedic', available: true, avatar: '👨‍⚕️' },
    { id: 5, name: 'Dr. Lisa Anderson', specialty: 'Dermatologist', available: true, avatar: '👩‍⚕️' },
    { id: 6, name: 'Dr. Robert Taylor', specialty: 'General Physician', available: true, avatar: '👨‍⚕️' },
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  ];

  const appointments = [
    { id: 1, patient: 'John Doe', doctor: 'Dr. Sarah Wilson', date: '2025-10-21', time: '10:00 AM', status: 'Confirmed' },
    { id: 2, patient: 'Jane Smith', doctor: 'Dr. James Miller', date: '2025-10-21', time: '11:30 AM', status: 'Pending' },
    { id: 3, patient: 'Bob Johnson', doctor: 'Dr. Michael Davis', date: '2025-10-22', time: '09:00 AM', status: 'Confirmed' },
  ];

  const bookedSlots = appointments
    .filter(apt => apt.date === selectedDate && apt.doctor === selectedDoctor?.name)
    .map(apt => apt.time);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-textPrimary mb-2">🩺 Doctor Appointment Scheduling</h1>
          <p className="text-textSecondary">Book your appointment with our experienced doctors</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctors List */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-textPrimary mb-4 flex items-center">
                <Stethoscope className="mr-2" />
                Available Doctors
              </h2>
              <div className="space-y-3">
                {doctors.map((doctor, index) => (
                  <motion.div
                    key={doctor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    onClick={() => doctor.available && setSelectedDoctor(doctor)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedDoctor?.id === doctor.id
                        ? 'border-primary bg-blue-50'
                        : doctor.available
                        ? 'border-gray-200 hover:border-primary'
                        : 'border-gray-200 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-4xl">{doctor.avatar}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-textPrimary">{doctor.name}</h3>
                        <p className="text-sm text-textSecondary">{doctor.specialty}</p>
                        <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                          doctor.available ? 'bg-success text-white' : 'bg-gray-300 text-gray-600'
                        }`}>
                          {doctor.available ? 'Available' : 'Not Available'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Booking Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Date Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-textPrimary mb-4 flex items-center">
                <Calendar className="mr-2" />
                Select Date
              </h2>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </motion.div>

            {/* Time Slots */}
            {selectedDoctor && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-textPrimary mb-4 flex items-center">
                  <Clock className="mr-2" />
                  Available Time Slots
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {timeSlots.map((time, index) => {
                    const isBooked = bookedSlots.includes(time);
                    const isSelected = selectedTime === time;
                    return (
                      <motion.button
                        key={time}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.02 }}
                        onClick={() => !isBooked && setSelectedTime(time)}
                        disabled={isBooked}
                        className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                          isBooked
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : isSelected
                            ? 'bg-primary text-white shadow-lg scale-105'
                            : 'bg-blue-50 text-primary hover:bg-primary hover:text-white'
                        }`}
                      >
                        {time}
                        {isBooked && <X className="inline-block ml-2 w-4 h-4" />}
                      </motion.button>
                    );
                  })}
                </div>

                {selectedTime && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-blue-50 rounded-lg"
                  >
                    <h3 className="font-semibold text-textPrimary mb-2">Booking Summary:</h3>
                    <div className="space-y-1 text-textSecondary">
                      <p>Doctor: <span className="font-semibold text-textPrimary">{selectedDoctor.name}</span></p>
                      <p>Date: <span className="font-semibold text-textPrimary">{selectedDate}</span></p>
                      <p>Time: <span className="font-semibold text-textPrimary">{selectedTime}</span></p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-4 bg-success hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                    >
                      <Check className="mr-2" />
                      Confirm Appointment
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Upcoming Appointments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-textPrimary mb-4 flex items-center">
                <User className="mr-2" />
                Upcoming Appointments
              </h2>
              <div className="space-y-3">
                {appointments.map((apt, index) => (
                  <motion.div
                    key={apt.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    className="p-4 bg-blue-50 rounded-lg border-l-4 border-primary"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-textPrimary">{apt.patient}</h3>
                        <p className="text-sm text-textSecondary">{apt.doctor}</p>
                        <p className="text-sm text-textSecondary mt-1">
                          {apt.date} at {apt.time}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        apt.status === 'Confirmed' ? 'bg-success text-white' : 'bg-alert text-white'
                      }`}>
                        {apt.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentScheduling;
