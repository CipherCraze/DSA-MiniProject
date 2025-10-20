import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const HospitalNavigation = () => {
  const [startNode, setStartNode] = useState('');
  const [endNode, setEndNode] = useState('');
  const [path, setPath] = useState(null);

  const locations = [
    { id: 'entrance', name: 'Main Entrance', icon: '🚪' },
    { id: 'emergency', name: 'Emergency Room', icon: '🚑' },
    { id: 'pharmacy', name: 'Pharmacy', icon: '💊' },
    { id: 'radiology', name: 'Radiology', icon: '🩻' },
    { id: 'surgery', name: 'Surgery Department', icon: '🏥' },
    { id: 'cardiology', name: 'Cardiology', icon: '❤️' },
    { id: 'pediatrics', name: 'Pediatrics', icon: '👶' },
    { id: 'laboratory', name: 'Laboratory', icon: '🧪' },
    { id: 'cafeteria', name: 'Cafeteria', icon: '🍽️' },
    { id: 'reception', name: 'Reception', icon: '📋' },
  ];

  // Simulated graph with distances (in meters)
  const graph = {
    entrance: { reception: 20, emergency: 50 },
    reception: { entrance: 20, pharmacy: 30, laboratory: 40 },
    pharmacy: { reception: 30, emergency: 25, cafeteria: 35 },
    emergency: { entrance: 50, pharmacy: 25, surgery: 40 },
    surgery: { emergency: 40, radiology: 30, cardiology: 20 },
    radiology: { surgery: 30, laboratory: 25 },
    cardiology: { surgery: 20, pediatrics: 35 },
    pediatrics: { cardiology: 35, laboratory: 30, cafeteria: 20 },
    laboratory: { reception: 40, radiology: 25, pediatrics: 30 },
    cafeteria: { pharmacy: 35, pediatrics: 20 },
  };

  // Dijkstra's Algorithm Implementation
  const dijkstra = (start, end) => {
    const distances = {};
    const previous = {};
    const unvisited = new Set(Object.keys(graph));

    // Initialize distances
    for (let node of unvisited) {
      distances[node] = Infinity;
      previous[node] = null;
    }
    distances[start] = 0;

    while (unvisited.size > 0) {
      // Find unvisited node with minimum distance
      let currentNode = null;
      let minDistance = Infinity;
      for (let node of unvisited) {
        if (distances[node] < minDistance) {
          minDistance = distances[node];
          currentNode = node;
        }
      }

      if (currentNode === null || distances[currentNode] === Infinity) break;
      if (currentNode === end) break;

      unvisited.delete(currentNode);

      // Update distances to neighbors
      const neighbors = graph[currentNode] || {};
      for (let [neighbor, weight] of Object.entries(neighbors)) {
        if (unvisited.has(neighbor)) {
          const newDistance = distances[currentNode] + weight;
          if (newDistance < distances[neighbor]) {
            distances[neighbor] = newDistance;
            previous[neighbor] = currentNode;
          }
        }
      }
    }

    // Reconstruct path
    const pathArray = [];
    let current = end;
    while (current !== null) {
      pathArray.unshift(current);
      current = previous[current];
    }

    return {
      path: pathArray,
      distance: distances[end],
      valid: distances[end] !== Infinity,
    };
  };

  const handleFindPath = () => {
    if (startNode && endNode && startNode !== endNode) {
      const result = dijkstra(startNode, endNode);
      setPath(result);
    }
  };

  const getLocationName = (id) => {
    return locations.find(loc => loc.id === id)?.name || id;
  };

  const getLocationIcon = (id) => {
    return locations.find(loc => loc.id === id)?.icon || '📍';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-textPrimary mb-2">🗺️ Hospital Navigation System</h1>
          <p className="text-textSecondary">Find the shortest path to any department using Dijkstra's algorithm</p>
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
                disabled={!startNode || !endNode || startNode === endNode}
                className="w-full bg-primary hover:bg-secondary text-white px-6 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Navigation className="mr-2" />
                Find Shortest Path
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

                <div className="mb-4 flex items-center space-x-2">
                  <Clock className="text-textSecondary w-5 h-5" />
                  <span className="text-textSecondary">
                    Distance: <span className="font-bold text-primary">{path.distance} meters</span>
                  </span>
                  <span className="text-textSecondary ml-4">
                    (~{Math.ceil(path.distance / 50)} min walk)
                  </span>
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
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                        index === 0 ? 'bg-success' : index === path.path.length - 1 ? 'bg-error' : 'bg-primary'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1 bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{getLocationIcon(nodeId)}</span>
                          <span className="font-semibold text-textPrimary">{getLocationName(nodeId)}</span>
                        </div>
                      </div>
                      {index < path.path.length - 1 && (
                        <ArrowRight className="text-primary" />
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
                <p className="text-error font-semibold">No path found between these locations.</p>
              </motion.div>
            )}
          </div>

          {/* Hospital Map Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-textPrimary mb-4">Hospital Layout</h2>
            
            {/* Simplified Map Grid */}
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg p-8">
              <div className="grid grid-cols-3 gap-4">
                {locations.map((location, index) => (
                  <motion.div
                    key={location.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className={`p-4 rounded-lg text-center transition-all ${
                      path?.path.includes(location.id)
                        ? 'bg-primary text-white shadow-lg scale-105'
                        : location.id === startNode
                        ? 'bg-success text-white'
                        : location.id === endNode
                        ? 'bg-error text-white'
                        : 'bg-white hover:shadow-md'
                    }`}
                  >
                    <div className="text-3xl mb-2">{location.icon}</div>
                    <div className={`text-xs font-semibold ${
                      path?.path.includes(location.id) || location.id === startNode || location.id === endNode
                        ? 'text-white'
                        : 'text-textPrimary'
                    }`}>
                      {location.name}
                    </div>
                  </motion.div>
                ))}
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
