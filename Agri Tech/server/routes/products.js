import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();

// Sample products data for demonstration
const sampleProducts = [
  {
    _id: '1',
    name: 'Organic Tomatoes',
    description: 'Fresh organic tomatoes grown without pesticides',
    price: 80,
    category: 'Vegetables',
    seller: {
      name: 'Ravi Kumar',
      location: 'Karnataka',
      rating: 4.5
    },
    images: ['https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg'],
    inStock: true,
    quantity: 100,
    unit: 'kg'
  },
  {
    _id: '2',
    name: 'Premium Basmati Rice',
    description: 'High-quality basmati rice with excellent aroma and taste',
    price: 120,
    category: 'Grains',
    seller: {
      name: 'Sunita Devi',
      location: 'Punjab',
      rating: 4.8
    },
    images: ['https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg'],
    inStock: true,
    quantity: 500,
    unit: 'kg'
  },
  {
    _id: '3',
    name: 'Fresh Milk',
    description: 'Pure cow milk from grass-fed cows',
    price: 60,
    category: 'Dairy',
    seller: {
      name: 'Mohan Singh',
      location: 'Haryana',
      rating: 4.3
    },
    images: ['https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg'],
    inStock: true,
    quantity: 50,
    unit: 'liters'
  }
];

// Get all products
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      products: sampleProducts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = sampleProducts.find(p => p._id === productId);
    
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }
    
    res.json({
      success: true,
      product: product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create product (protected route)
router.post('/', auth, async (req, res) => {
  try {
    const newProduct = {
      _id: String(sampleProducts.length + 1),
      ...req.body,
      seller: {
        name: 'Current User',
        location: 'India',
        rating: 4.0
      }
    };
    
    sampleProducts.push(newProduct);
    
    res.status(201).json({
      success: true,
      product: newProduct
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update product (protected route)
router.put('/:id', auth, async (req, res) => {
  try {
    const productId = req.params.id;
    const productIndex = sampleProducts.findIndex(p => p._id === productId);
    
    if (productIndex === -1) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }
    
    sampleProducts[productIndex] = {
      ...sampleProducts[productIndex],
      ...req.body
    };
    
    res.json({
      success: true,
      product: sampleProducts[productIndex]
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete product (protected route)
router.delete('/:id', auth, async (req, res) => {
  try {
    const productId = req.params.id;
    const productIndex = sampleProducts.findIndex(p => p._id === productId);
    
    if (productIndex === -1) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }
    
    sampleProducts.splice(productIndex, 1);
    
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;