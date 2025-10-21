import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Clock, ArrowRight, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const HospitalNavigation = () => {
  const [startNode, setStartNode] = useState('');
  const [endNode, setEndNode] = useState('');
  const [path, setPath] = useState(null);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_URL = 'http://localhost:8000/api/navigation';

  // Fetch locations from API on mount
  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch(`${API_URL}/locations`);
      if (!response.ok) throw new Error('Failed to fetch locations');
      const data = await response.json();
      setLocations(data);
      setError('');
      setLoading(false);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setError('Failed to connect to navigation server. Please ensure the API is running on port 8001.');
      setLoading(false);
    }
  };

  const handleFindPath = async () => {
    if (!startNode || !endNode) {
      setError('Please select both starting point and destination');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (startNode === endNode) {
      setError('Starting point and destination cannot be the same');
      setTimeout(() => setError(''), 3000);
      return;
    }

    setCalculating(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_URL}/path`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          start: startNode,
          end: endNode
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || 'Failed to calculate path');
      }

      if (result.valid) {
        setPath(result);
        setSuccess(`✅ Found optimal path! Distance: ${result.distance}m (~${result.estimatedTime} min walk)`);
        setTimeout(() => setSuccess(''), 5000);
      } else {
        setPath(null);
        setError('No path found between these locations');
        setTimeout(() => setError(''), 3000);
      }
    } catch (error) {
      console.error('Error finding path:', error);
      setError(error.message);
      setTimeout(() => setError(''), 3000);
    } finally {
      setCalculating(false);
    }
  };

  const getLocationName = (id) => {
    return locations.find(loc => loc.id === id)?.name || id;
  };

  const getLocationIcon = (id) => {
    return locations.find(loc => loc.id === id)?.icon || '📍';
  };

  const handleReset = () => {
    setStartNode('');
    setEndNode('');
    setPath(null);
    setError('');
    setSuccess('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Hospital Navigation System...</p>
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 py-8">
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
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-textPrimary mb-2">🗺️ Hospital Navigation System</h1>
              <p className="text-textSecondary">Find the shortest path using Dijkstra's algorithm (Python backend)</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="mt-4 md:mt-0 flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Reset</span>
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Navigation Controls */}
          <div className="space-y-6">
            {/* Location Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-textPrimary mb-4 flex items-center">
                <MapPin className="mr-2" />
                Select Locations
              </h2>

              {/* Start Location */}
              <div className="mb-4">
                <label className="block text-textSecondary mb-2 font-semibold">Starting Point</label>
                <select
                  value={startNode}
                  onChange={(e) => setStartNode(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                >
                  <option value="">Select starting location...</option>
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.id}>
                      {loc.icon} {loc.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* End Location */}
              <div className="mb-6">
                <label className="block text-textSecondary mb-2 font-semibold">Destination</label>
                <select
                  value={endNode}
                  onChange={(e) => setEndNode(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                >
                  <option value="">Select destination...</option>
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.id} disabled={loc.id === startNode}>
                      {loc.icon} {loc.name}
                    </option>
                  ))}
                </select>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleFindPath}
                disabled={!startNode || !endNode || startNode === endNode || calculating}
                className="w-full bg-primary hover:bg-secondary text-white px-6 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {calculating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Calculating Path...
                  </>
                ) : (
                  <>
                    <Navigation className="mr-2" />
                    Find Shortest Path
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Path Result */}
            {path && path.valid && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-success"
              >
                <h2 className="text-xl font-bold text-textPrimary mb-4 flex items-center">
                  <ArrowRight className="mr-2 text-success" />
                  Optimal Route
                </h2>

                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-lg">
                    <MapPin className="text-primary w-6 h-6" />
                    <div>
                      <p className="text-xs text-gray-500">Total Distance</p>
                      <p className="font-bold text-primary text-xl">{path.distance} meters</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-green-50 p-4 rounded-lg">
                    <Clock className="text-green-600 w-6 h-6" />
                    <div>
                      <p className="text-xs text-gray-500">Estimated Time</p>
                      <p className="font-bold text-green-600 text-xl">~{path.estimatedTime} min</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {path.path.map((nodeId, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg ${
                        index === 0 ? 'bg-success' : index === path.path.length - 1 ? 'bg-error' : 'bg-primary'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-2 border-blue-200 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-3xl mr-3">{getLocationIcon(nodeId)}</span>
                            <div>
                              <span className="font-bold text-textPrimary text-lg">{path.pathNames[index]}</span>
                              <p className="text-xs text-gray-500">Code: {nodeId}</p>
                            </div>
                          </div>
                          {index === 0 && (
                            <span className="bg-success text-white px-3 py-1 rounded-full text-xs font-bold">START</span>
                          )}
                          {index === path.path.length - 1 && (
                            <span className="bg-error text-white px-3 py-1 rounded-full text-xs font-bold">END</span>
                          )}
                        </div>
                      </div>
                      {index < path.path.length - 1 && (
                        <ArrowRight className="text-primary w-6 h-6" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {path && !path.valid && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 rounded-xl shadow-lg p-6 border-l-4 border-error"
              >
                <div className="flex items-center space-x-3">
                  <AlertCircle className="text-error w-8 h-8" />
                  <div>
                    <p className="text-error font-bold text-lg">No Path Found</p>
                    <p className="text-gray-600">There is no route between these locations.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Algorithm Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-lg p-6 border-2 border-purple-200"
            >
              <h3 className="text-lg font-bold text-purple-900 mb-3">🧮 Dijkstra's Algorithm</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Finds the shortest path between two nodes in a weighted graph</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Time Complexity: O((V + E) log V) where V = vertices, E = edges</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Uses min-heap priority queue for optimal performance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Backend: Python with heapq module</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Hospital Map Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-textPrimary">Hospital Layout</h2>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {locations.length} Locations
              </span>
            </div>
            
            {/* Simplified Map Grid */}
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg p-6">
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {locations.map((location, index) => {
                  const isOnPath = path?.path.includes(location.id);
                  const isStart = location.id === startNode;
                  const isEnd = location.id === endNode;
                  const pathIndex = path?.path.indexOf(location.id);
                  
                  return (
                    <motion.div
                      key={location.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.03 }}
                      className={`relative p-3 rounded-lg text-center transition-all cursor-pointer ${
                        isOnPath
                          ? 'bg-primary text-white shadow-xl scale-105 ring-2 ring-primary ring-offset-2'
                          : isStart
                          ? 'bg-success text-white shadow-lg ring-2 ring-success ring-offset-2'
                          : isEnd
                          ? 'bg-error text-white shadow-lg ring-2 ring-error ring-offset-2'
                          : 'bg-white hover:shadow-md hover:scale-105'
                      }`}
                    >
                      {isOnPath && pathIndex !== undefined && (
                        <div className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                          {pathIndex + 1}
                        </div>
                      )}
                      <div className="text-2xl mb-1">{location.icon}</div>
                      <div className={`text-xs font-semibold leading-tight ${
                        isOnPath || isStart || isEnd ? 'text-white' : 'text-textPrimary'
                      }`}>
                        {location.name}
                      </div>
                      <div className={`text-[10px] mt-1 ${
                        isOnPath || isStart || isEnd ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {location.id}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-success rounded"></div>
                <span className="text-textSecondary">Start</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-error rounded"></div>
                <span className="text-textSecondary">Destination</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-primary rounded"></div>
                <span className="text-textSecondary">On Route</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HospitalNavigation;