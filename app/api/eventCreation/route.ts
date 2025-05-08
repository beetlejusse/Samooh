import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Event } from "@/models/Event.model";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Database connected successfully");

        const body = await request.json();
        console.log("Received event data:", body);
        
        const { 
            title, 
            eventType, 
            description, 
            format,
            imageUrl,
            tags,
            venue,
            schedule,
            capacity,
            prizes,
            eligibility,
            teamSize,
            organizer,
            additionalInfo,
            registrationStatus,
            status
        } = body;

        // Validate required fields
        if (!title || !eventType || !description || !format) {
            return NextResponse.json(
                { error: "Title, event type, description, and format are required" },
                { status: 400 }
            );
        }

        if (!organizer || !organizer.name || !organizer.email || !organizer.collegeName) {
            return NextResponse.json(
                { error: "Organizer name, email, and college name are required" },
                { status: 400 }
            );
        }

        if (!schedule || !schedule.startDate || !schedule.endDate || !schedule.startTime || !schedule.endTime || !schedule.timezone) {
            return NextResponse.json(
                { error: "Complete schedule information is required" },
                { status: 400 }
            );
        }

        // Use a hardcoded user ID for now since we don't have authentication
        // In a real app, you would get this from the authenticated session
        const createdBy = new mongoose.Types.ObjectId("6460a95e3c91cc1234567890");

        // Create new event
        const newEvent = new Event({
            title,
            eventType,
            description,
            format,
            imageUrl: imageUrl || "",
            tags: tags || [],
            venue,
            schedule: {
                startDate: new Date(schedule.startDate),
                endDate: new Date(schedule.endDate),
                startTime: schedule.startTime,
                endTime: schedule.endTime,
                timezone: schedule.timezone
            },
            capacity: capacity || null,
            prizes: prizes || [],
            eligibility: eligibility || "",
            teamSize: teamSize || "",
            organizer,
            additionalInfo: additionalInfo || "",
            createdBy,
            registrationStatus: registrationStatus || "open",
            status: status || "draft"
        });

        console.log("Saving event to database...");
        const savedEvent = await newEvent.save();
        console.log("Event saved successfully:", savedEvent._id);
        
        return NextResponse.json(
            {
                success: true,
                message: "Event created successfully",
                event: {
                    _id: savedEvent._id,
                    title: savedEvent.title,
                    eventType: savedEvent.eventType,
                    startDate: savedEvent.schedule.startDate,
                    endDate: savedEvent.schedule.endDate
                }
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Event creation error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal server error" },
            { status: 500 }
        );
    }
}

// GET endpoint to retrieve events
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        
        // Get query parameters
        const url = new URL(request.url);
        const status = url.searchParams.get("status") || "published";
        const limit = parseInt(url.searchParams.get("limit") || "10");
        const page = parseInt(url.searchParams.get("page") || "1");
        const skip = (page - 1) * limit;
        
        // Find events with pagination
        const events = await Event.find({ status })
            .sort({ "schedule.startDate": 1 }) // Sort by start date ascending
            .skip(skip)
            .limit(limit)
            .populate("createdBy", "name username");
            
        const total = await Event.countDocuments({ status });
        
        return NextResponse.json({
            success: true,
            events,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error("Error fetching events:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
