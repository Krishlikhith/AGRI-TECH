import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ['seeds', 'fertilizers', 'tools', 'equipment', 'other'],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    unit: {
      type: String,
      enum: ['kg', 'g', 'l', 'ml', 'piece', 'acre', 'other'],
      required: true,
    },
    status: {
      type: String,
      enum: ['available', 'sold', 'pending'],
      default: 'available',
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        text: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
    isNegotiable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Create indexes for faster searches
ProductSchema.index({ title: 'text', description: 'text', location: 'text' });

// Calculate average rating when reviews are added or modified
ProductSchema.pre('save', function (next) {
  if (this.reviews.length > 0) {
    this.averageRating =
      this.reviews.reduce((sum, review) => sum + review.rating, 0) / this.reviews.length;
  }
  next();
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;