import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

// Route imports
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import productRoutes from './routes/products.js';
// import jobRoutes from './routes/jobs.js';
// import tutorialRoutes from './routes/tutorials.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// MongoDB connection with graceful error handling
const connectDB = async () => {
  try {
    if (process.env.MONGO_URI && process.env.MONGO_URI !== 'mongodb://localhost:27017/agritech') {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected successfully');
      return true;
    } else {
      console.log('⚠️  MongoDB not configured or using local connection in WebContainer environment');
      console.log('   The server will run without database functionality');
      console.log('   To enable database features, configure a cloud MongoDB connection string');
      return false;
    }
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    console.log('⚠️  Server will continue without database functionality');
    return false;
  }
};

// Middleware to check database connection
const requireDB = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database not available. Please configure MongoDB connection.',
    });
  }
  next();
};

// Routes (with database requirement middleware for auth and user routes only)
app.use('/api/auth', requireDB, authRoutes);
app.use('/api/users', requireDB, userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/products', productRoutes);
// app.use('/api/jobs', requireDB, jobRoutes);
// app.use('/api/tutorials', requireDB, tutorialRoutes);

// Home route (doesn't require database)
app.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  res.json({ 
    message: 'Welcome to AGRI TECH API',
    database: dbStatus,
    note: dbStatus === 'Disconnected' ? 'Configure MongoDB connection to enable full functionality' : undefined
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
});

// Start server
const startServer = async () => {
  const dbConnected = await connectDB();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Database: ${dbConnected ? 'Connected' : 'Not Connected'}`);
    console.log(`🌐 API available at: http://localhost:${PORT}`);
  });
};

startServer();