import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Event extends Document {
  // Event Details
  title: string;
  eventType: string;
  description: string;
  format: 'in-person' | 'virtual' | 'hybrid';
  imageUrl?: string;
  tags: string[];
  
  // Location & Schedule
  venueName?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  timezone: string;
  capacity?: number;
  
  // Organizer Information
  organizerName: string;
  organizerEmail: string;
  organizerPhone?: string;
  collegeName: string;
  website?: string;
  socialMedia?: {
    instagram?: string;
    twitter?: string;
  };
  additionalInfo?: string;
  
  // Relationships
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
  
  // Status
  status: 'draft' | 'published' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema: Schema = new Schema(
  {
    // Event Details
    title: { 
      type: String, 
      required: true 
    },
    eventType: { 
      type: String, 
      required: true,
      enum: ['hackathon', 'workshop', 'tech-talk', 'networking', 'conference', 'other']
    },
    description: { 
      type: String, 
      required: true 
    },
    format: { 
      type: String, 
      required: true,
      enum: ['in-person', 'virtual', 'hybrid']
    },
    imageUrl: { 
      type: String 
    },
    tags: [{ 
      type: String 
    }],
    
    // Location & Schedule
    venueName: { 
      type: String,
      required: true
    },
    address: { 
      type: String,
      required: true
    },
    city: { 
      type: String,
      required: true
    },
    state: { 
      type: String,
      required: true
    },
    country: { 
      type: String,
      required: true
    },
    postalCode: { 
      type: String,
      required: true
    },
    startDate: { 
      type: Date, 
      required: true 
    },
    endDate: { 
      type: Date, 
      required: true 
    },
    startTime: { 
      type: String, 
      required: true 
    },
    endTime: { 
      type: String, 
      required: true 
    },
    timezone: { 
      type: String, 
      required: true 
    },
    capacity: { 
      type: Number 
    },
    
    // Organizer Information
    organizerName: { 
      type: String, 
      required: true 
    },
    organizerEmail: { 
      type: String, 
      required: true 
    },
    organizerPhone: { 
      type: String 
    },
    collegeName: { 
      type: String, 
      required: true 
    },
    website: { 
      type: String 
    },
    socialMedia: {
      instagram: { type: String },
      twitter: { type: String }
    },
    additionalInfo: { 
      type: String 
    },
    
    // Relationships
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true
    },
    
    // Status
    status: { 
      type: String, 
      required: true,
      enum: ['draft', 'published', 'cancelled'],
      default: 'draft'
    }
  },
  { 
    timestamps: true 
  }
);

// Add text index for search functionality
// EventSchema.index(
//   { 
//     title: 'text', 
//     description: 'text', 
//     tags: 'text',
//     collegeName: 'text'
//   }
// );

export const Event: Model<Event> = mongoose.models.Event || mongoose.model<Event>('Event', EventSchema);
