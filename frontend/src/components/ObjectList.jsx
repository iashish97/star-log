import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/objects';

const typeColors = {
  Star: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Planet: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Galaxy: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  Nebula: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  Constellation: 'bg-green-500/20 text-green-300 border-green-500/30'
};

const typeIcons = {
  Star: '⭐',
  Planet: '🪐',
  Galaxy: '🌌',
  Nebula: '☁️',
  Constellation: '✨'
};

function ObjectList({ objects, onObserve, onDelete }) {
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editNotes, setEditNotes] = useState('');

  const filteredObjects = filter === 'all' 
    ? objects 
    : objects.filter(obj => obj.type === filter);

  const types = ['all', 'Star', 'Planet', 'Galaxy', 'Nebula', 'Constellation'];

  const handleEditNotes = (obj) => {
    setEditingId(obj._id);
    setEditNotes(obj.notes || '');
  };

  const saveNotes = async (id) => {
    try {
      const object = objects.find(obj => obj._id === id);
      await axios.put(`${API_URL}/${id}`, { ...object, notes: editNotes });
      window.location.reload();
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  if (!objects || objects.length === 0) {
    return (
      <div className="text-center text-white/50 py-20">
        <p className="text-4xl mb-4">🌠</p>
        <p>No objects found. Add your first celestial object!</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filter Bar */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {types.map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg capitalize transition-all duration-200 ${
              filter === type
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            {type === 'all' ? 'All Objects' : type}
          </button>
        ))}
      </div>

      {/* Object Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredObjects.map((obj) => (
          <div
            key={obj._id}
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-indigo-500/50 transition-all duration-300 overflow-hidden"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{typeIcons[obj.type]}</span>
                  <h3 className="text-xl font-semibold text-white">{obj.name}</h3>
                </div>
                <button
                  onClick={() => onDelete(obj._id)}
                  className="text-white/40 hover:text-red-400 transition-colors text-xl"
                >
                  🗑️
                </button>
              </div>

              {/* Type Badge */}
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${typeColors[obj.type]} mb-3`}>
                {obj.type}
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm text-white/70 mb-4">
                {obj.constellation && obj.constellation !== 'Unknown' && (
                  <p>📍 Constellation: {obj.constellation}</p>
                )}
                {obj.magnitude && (
                  <p>✨ Magnitude: {obj.magnitude}</p>
                )}
                {obj.distance_ly && (
                  <p>📡 Distance: {Number(obj.distance_ly).toLocaleString()} light years</p>
                )}
                {obj.observedCount > 0 && (
                  <p>👁️ Observed: {obj.observedCount} time{obj.observedCount !== 1 ? 's' : ''}</p>
                )}
                {obj.lastObserved && (
                  <p>📅 Last seen: {new Date(obj.lastObserved).toLocaleDateString()}</p>
                )}
              </div>

              {/* Notes */}
              {editingId === obj._id ? (
                <div className="mb-4">
                  <textarea
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    className="w-full bg-black/50 rounded-lg p-2 text-white text-sm border border-white/20 focus:border-indigo-500 focus:outline-none"
                    rows="3"
                    placeholder="Add your observations..."
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => saveNotes(obj._id)}
                      className="flex-1 px-3 py-1 bg-indigo-500 hover:bg-indigo-600 rounded text-sm transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                obj.notes && (
                  <div className="bg-black/30 rounded-lg p-3 mb-4 text-sm text-white/60 italic border-l-2 border-indigo-500">
                    "{obj.notes}"
                  </div>
                )
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => onObserve(obj._id)}
                  className="flex-1 px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500 text-indigo-300 hover:text-white rounded-lg transition-all duration-200 text-sm font-medium"
                >
                  🔭 I Saw This Tonight
                </button>
                <button
                  onClick={() => handleEditNotes(obj)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 text-sm"
                >
                  ✏️ Edit Notes
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ObjectList;