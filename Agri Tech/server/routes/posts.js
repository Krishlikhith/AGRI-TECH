import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    res.json({ message: 'Get all posts' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new post
router.post('/', auth, async (req, res) => {
  try {
    res.json({ message: 'Create new post' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific post
router.get('/:id', async (req, res) => {
  try {
    res.json({ message: 'Get specific post' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a post
router.patch('/:id', auth, async (req, res) => {
  try {
    res.json({ message: 'Update post' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a post
router.delete('/:id', auth, async (req, res) => {
  try {
    res.json({ message: 'Delete post' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;