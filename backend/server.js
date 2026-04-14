const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Sample data
let celestialObjects = [
  {
    _id: "1",
    name: "Sirius",
    type: "Star",
    constellation: "Canis Major",
    magnitude: -1.46,
    distance_ly: 8.6,
    notes: "Brightest star in the night sky, also called the Dog Star",
    observedCount: 0,
    lastObserved: null
  },
  {
    _id: "2",
    name: "Jupiter",
    type: "Planet",
    constellation: "Current",
    magnitude: -2.8,
    distance_ly: 0.00048,
    notes: "Gas giant, can see 4 moons with binoculars",
    observedCount: 0,
    lastObserved: null
  },
  {
    _id: "3",
    name: "Andromeda Galaxy",
    type: "Galaxy",
    constellation: "Andromeda",
    magnitude: 3.44,
    distance_ly: 2537000,
    notes: "Furthest object visible to naked eye",
    observedCount: 0,
    lastObserved: null
  },
  {
    _id: "4",
    name: "Betelgeuse",
    type: "Star",
    constellation: "Orion",
    magnitude: 0.42,
    distance_ly: 642,
    notes: "Red supergiant, will go supernova",
    observedCount: 0,
    lastObserved: null
  }
];

// GET all objects
app.get('/api/objects', (req, res) => {
  console.log('GET /api/objects - returning', celestialObjects.length, 'objects');
  res.json(celestialObjects);
});

// GET single object
app.get('/api/objects/:id', (req, res) => {
  const object = celestialObjects.find(obj => obj._id === req.params.id);
  if (!object) {
    return res.status(404).json({ message: 'Object not found' });
  }
  res.json(object);
});

// POST new object
app.post('/api/objects', (req, res) => {
  const newObject = {
    _id: String(celestialObjects.length + 1),
    ...req.body,
    observedCount: 0,
    lastObserved: null
  };
  celestialObjects.push(newObject);
  console.log('POST /api/objects - added', newObject.name);
  res.status(201).json(newObject);
});

// PUT update object
app.put('/api/objects/:id', (req, res) => {
  const index = celestialObjects.findIndex(obj => obj._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Object not found' });
  }
  celestialObjects[index] = { ...celestialObjects[index], ...req.body };
  console.log('PUT /api/objects/:id - updated', celestialObjects[index].name);
  res.json(celestialObjects[index]);
});

// PATCH observe object
app.patch('/api/objects/:id/observe', (req, res) => {
  const index = celestialObjects.findIndex(obj => obj._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Object not found' });
  }
  celestialObjects[index].observedCount += 1;
  celestialObjects[index].lastObserved = new Date();
  console.log('PATCH /api/objects/:id/observe - observed', celestialObjects[index].name);
  res.json(celestialObjects[index]);
});

// DELETE object
app.delete('/api/objects/:id', (req, res) => {
  const index = celestialObjects.findIndex(obj => obj._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Object not found' });
  }
  const deleted = celestialObjects[index];
  celestialObjects = celestialObjects.filter(obj => obj._id !== req.params.id);
  console.log('DELETE /api/objects/:id - deleted', deleted.name);
  res.json({ message: 'Deleted successfully' });
});

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Star Log API is running! Visit /api/objects to see data' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log(`📡 Test API: http://localhost:${PORT}/api/objects`);
  console.log(`🌟 Star Log Backend Ready!\n`);
});