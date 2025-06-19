import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    employer: {
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
    jobType: {
      type: String,
      enum: ['farm_labor', 'land_lease', 'seasonal', 'permanent', 'other'],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      amount: {
        type: Number,
      },
      period: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly', 'per_season', 'negotiable'],
      },
    },
    duration: {
      type: String,
    },
    experienceRequired: {
      type: String,
    },
    skills: [
      {
        type: String,
      },
    ],
    applicants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        status: {
          type: String,
          enum: ['pending', 'reviewed', 'accepted', 'rejected'],
          default: 'pending',
        },
        message: {
          type: String,
        },
        appliedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    status: {
      type: String,
      enum: ['open', 'closed', 'filled'],
      default: 'open',
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Create indexes for faster searches
JobSchema.index({ title: 'text', description: 'text', location: 'text', skills: 'text' });

const Job = mongoose.model('Job', JobSchema);

export default Job;