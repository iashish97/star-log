import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ObjectList from './components/ObjectList';
import AddObject from './components/AddObject';

const API_URL = 'http://localhost:5000/api/objects';

function App() {
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchObjects = async () => {
    try {
      const response = await axios.get(API_URL);
      setObjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching objects:', error);
      setLoading(false);
    }
  };

  const addObject = async (newObject) => {
    try {
      const response = await axios.post(API_URL, newObject);
      setObjects([...objects, response.data]);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding object:', error);
      alert('Error adding object');
    }
  };

  const observeObject = async (id) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}/observe`);
      setObjects(objects.map(obj => obj._id === id ? response.data : obj));
    } catch (error) {
      console.error('Error observing object:', error);
      alert('Error observing object');
    }
  };

  const deleteObject = async (id) => {
    if (window.confirm('Remove this object from your catalog?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setObjects(objects.filter(obj => obj._id !== id));
      } catch (error) {
        console.error('Error deleting object:', error);
        alert('Error deleting object');
      }
    }
  };

  useEffect(() => {
    fetchObjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
          <p className="mt-4">Loading your star catalog...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-light text-white tracking-wide">
                ✨ My Star Log
              </h1>
              <p className="text-white/50 text-sm mt-1">
                {objects.length} celestial objects in catalog
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all duration-200"
            >
              {showAddForm ? 'Cancel' : '+ Add Object'}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {showAddForm && (
          <div className="mb-8">
            <AddObject onAdd={addObject} onCancel={() => setShowAddForm(false)} />
          </div>
        )}

        <ObjectList
          objects={objects}
          onObserve={observeObject}
          onDelete={deleteObject}
        />
      </main>
    </div>
  );
}

export default App;