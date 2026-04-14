import React, { useState } from 'react';

function AddObject({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Star',
    constellation: '',
    magnitude: '',
    distance_ly: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...formData,
      magnitude: formData.magnitude ? Number(formData.magnitude) : null,
      distance_ly: formData.distance_ly ? Number(formData.distance_ly) : null
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 animate-fade-in">
      <h2 className="text-2xl font-semibold text-white mb-6">Add New Celestial Object</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-white/70 text-sm mb-1">Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="e.g., Orion Nebula"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-white/70 text-sm mb-1">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="Star">Star</option>
              <option value="Planet">Planet</option>
              <option value="Galaxy">Galaxy</option>
              <option value="Nebula">Nebula</option>
              <option value="Constellation">Constellation</option>
            </select>
          </div>

          {/* Constellation */}
          <div>
            <label className="block text-white/70 text-sm mb-1">Constellation</label>
            <input
              type="text"
              name="constellation"
              value={formData.constellation}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="e.g., Orion"
            />
          </div>

          {/* Magnitude */}
          <div>
            <label className="block text-white/70 text-sm mb-1">Apparent Magnitude</label>
            <input
              type="number"
              step="any"
              name="magnitude"
              value={formData.magnitude}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="e.g., 4.0"
            />
          </div>

          {/* Distance */}
          <div>
            <label className="block text-white/70 text-sm mb-1">Distance (Light Years)</label>
            <input
              type="number"
              step="any"
              name="distance_ly"
              value={formData.distance_ly}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="e.g., 1344"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-white/70 text-sm mb-1">Observational Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="What does it look like? Best time to see it?"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors font-medium"
          >
            Save Object
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddObject;
