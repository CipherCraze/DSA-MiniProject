import { motion } from 'framer-motion';
import { Search, Package, AlertTriangle, TrendingUp, Filter } from 'lucide-react';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PharmacyManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('all');

  const medicines = [
    { id: 1, name: 'Paracetamol', stock: 150, expiry: '2025-12-15', category: 'Pain Relief', price: 5.99 },
    { id: 2, name: 'Amoxicillin', stock: 45, expiry: '2025-06-20', category: 'Antibiotic', price: 12.50 },
    { id: 3, name: 'Ibuprofen', stock: 200, expiry: '2026-03-10', category: 'Pain Relief', price: 7.99 },
    { id: 4, name: 'Aspirin', stock: 80, expiry: '2025-08-25', category: 'Blood Thinner', price: 4.50 },
    { id: 5, name: 'Metformin', stock: 25, expiry: '2025-04-30', category: 'Diabetes', price: 15.00 },
    { id: 6, name: 'Omeprazole', stock: 120, expiry: '2026-01-18', category: 'Antacid', price: 9.99 },
  ];

  const stockData = [
    { category: 'Pain Relief', stock: 350 },
    { category: 'Antibiotic', stock: 150 },
    { category: 'Blood Thinner', stock: 80 },
    { category: 'Diabetes', stock: 120 },
    { category: 'Antacid', stock: 200 },
  ];

  const getStockBadge = (stock) => {
    if (stock < 50) return { color: 'bg-error text-white', label: 'Low Stock' };
    if (stock < 100) return { color: 'bg-alert text-white', label: 'Medium' };
    return { color: 'bg-success text-white', label: 'Good Stock' };
  };

  const getExpiryStatus = (expiry) => {
    const expiryDate = new Date(expiry);
    const today = new Date();
    const diffDays = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) return { color: 'text-error', label: 'Expiring Soon' };
    if (diffDays < 90) return { color: 'text-alert', label: 'Check Date' };
    return { color: 'text-success', label: 'Valid' };
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-textPrimary mb-2">💊 Pharmacy Management</h1>
          <p className="text-textSecondary">Manage inventory, track expiry dates, and monitor stock levels</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Medicines', value: '856', icon: Package, color: 'bg-blue-500' },
            { label: 'Low Stock Items', value: '12', icon: AlertTriangle, color: 'bg-error' },
            { label: 'Expiring Soon', value: '5', icon: AlertTriangle, color: 'bg-alert' },
            { label: 'Categories', value: '24', icon: TrendingUp, color: 'bg-success' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-textSecondary text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-textPrimary mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="text-white w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stock Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-textPrimary mb-4">Stock Overview by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="stock" fill="#0C7B93" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textSecondary w-5 h-5" />
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-highlight focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textSecondary w-5 h-5" />
            <select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              className="pl-10 pr-8 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-highlight focus:border-transparent"
            >
              <option value="all">All Medicines</option>
              <option value="low">Low Stock</option>
              <option value="expiring">Expiring Soon</option>
            </select>
          </div>
        </div>

        {/* Medicine Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {medicines.map((medicine, index) => {
            const stockBadge = getStockBadge(medicine.stock);
            const expiryStatus = getExpiryStatus(medicine.expiry);

            return (
              <motion.div
                key={medicine.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-highlight"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-textPrimary">{medicine.name}</h3>
                  <span className={`${stockBadge.color} px-3 py-1 rounded-full text-xs font-semibold`}>
                    {stockBadge.label}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Category:</span>
                    <span className="font-semibold text-textPrimary">{medicine.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Stock:</span>
                    <span className="font-semibold text-textPrimary">{medicine.stock} units</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Expiry:</span>
                    <span className={`font-semibold ${expiryStatus.color}`}>{medicine.expiry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Price:</span>
                    <span className="font-semibold text-textPrimary">${medicine.price}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PharmacyManagement;
