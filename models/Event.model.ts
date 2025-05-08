import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Event extends Document {
  // Event Details
  title: string;
  eventType: 'hackathon' | 'workshop' | 'tech-talk' | 'networking' | 'conference' | 'other';
  description: string;
  format: 'in-person' | 'virtual' | 'hybrid';
  imageUrl?: string;
  tags: string[];
  
  // Location & Schedule
  venue?: {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  schedule: {
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    timezone: string;
  };
  capacity?: number;
  
  // Prizes and Eligibility
  prizes?: {
    position: string;
    amount: string;
  }[];
  eligibility?: string;
  teamSize?: string;
  
  // Organizer Information
  organizer: {
    name: string;
    email: string;
    phone?: string;
    collegeName: string;
    website?: string;
    socialMedia?: {
      instagram?: string;
      twitter?: string;
    };
  };
  additionalInfo?: string;
  
  // Relationships
  createdBy: mongoose.Types.ObjectId;
  
  // Status
  registrationStatus: 'open' | 'closed' | 'coming-soon';
  status: 'draft' | 'published' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  scrapedFrom?: string;
}

const EventSchema: Schema = new Schema(
  {
    // Event Details
    title: { type: String, required: true },
    eventType: { 
      type: String, 
      required: true,
      enum: ['hackathon', 'workshop', 'tech-talk', 'networking', 'conference', 'other']
    },
    description: { type: String, required: true },
    format: { 
      type: String, 
      required: true,
      enum: ['in-person', 'virtual', 'hybrid']
    },
    imageUrl: { type: String },
    tags: [{ type: String }],
    
    // Location & Schedule
    venue: {
      name: { type: String },
      address: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      postalCode: { type: String }
    },
    schedule: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
      timezone: { type: String, required: true }
    },
    capacity: { type: Number },
    
    // Prizes and Eligibility
    prizes: [{
      position: { type: String },
      amount: { type: String }
    }],
    eligibility: { type: String },
    teamSize: { type: String },
    
    // Organizer Information
    organizer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
      collegeName: { type: String, required: true },
      website: { type: String },
      socialMedia: {
        instagram: { type: String },
        twitter: { type: String }
      }
    },
    additionalInfo: { type: String },
    
    // Relationships
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true
    },
    
    // Status
    registrationStatus: {
      type: String,
      enum: ['open', 'closed', 'coming-soon'],
      default: 'open'
    },
    status: { 
      type: String,
      enum: ['draft', 'published', 'cancelled'],
      default: 'draft'
    },
    scrapedFrom: { type: String }
  },
  { timestamps: true }
);

// Add text index for search functionality
EventSchema.index(
  { 
    title: 'text', 
    description: 'text', 
    tags: 'text',
    'organizer.collegeName': 'text'
  }
);

// Helper function to upload image to ImgBB
export async function uploadImageToImgBB(imageData: string): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append('image', imageData);
    
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    return data.success ? data.data.url : null;
  } catch (error) {
    console.error('Error uploading image to ImgBB:', error);
    return null;
  }
}

export const Event: Model<Event> = mongoose.models.Event || mongoose.model<Event>('Event', EventSchema);
