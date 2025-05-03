import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the User interface
export interface User extends Document {
  // Basic Information
  name: string;
  email: string;
  password: string;
  username?: string;

  // Profile Information
  avatar?: string;
  bio?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'prefer-not-to-say';

  // College/Professional Information
  collegeName?: string;
  department?: string;
  graduationYear?: number;
  skills?: string[];

  // Address Information
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };

  // Social Media
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };

  // Event Relationships (use ObjectId instead of Event to avoid circular dependency)
  eventsCreated?: mongoose.Types.ObjectId[];
  eventsAttending?: mongoose.Types.ObjectId[];
  eventsSaved?: mongoose.Types.ObjectId[];
}

// Define the User schema
const UserSchema: Schema = new Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    avatar: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    phoneNumber: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'non-binary', 'prefer-not-to-say'],
    },

    collegeName: {
      type: String,
    },
    department: {
      type: String,
    },
    graduationYear: {
      type: Number,
    },
    skills: [
      {
        type: String,
      },
    ],

    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      postalCode: { type: String },
    },

    socialMedia: {
      instagram: { type: String },
      twitter: { type: String },
      linkedin: { type: String },
      github: { type: String },
      website: { type: String },
    },

    eventsCreated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
    eventsAttending: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
    eventsSaved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Define the User model
export const userModel: Model<User> = mongoose.models.User || mongoose.model<User>('User', UserSchema);
