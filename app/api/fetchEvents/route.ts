import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Event } from "@/models/Event.model";

export async function GET(request: NextRequest) {
    try {
        console.log("Connecting to database for event fetch...");
        await dbConnect();
        console.log("Database connected successfully");
        
        // Get query parameters
        const url = new URL(request.url);
        const status = url.searchParams.get("status") || "all"; // Changed default to "all" instead of "published"
        const eventType = url.searchParams.get("eventType");
        const searchQuery = url.searchParams.get("search");
        const location = url.searchParams.get("location");
        const dateFilter = url.searchParams.get("dateFilter");
        const sortBy = url.searchParams.get("sortBy") || "schedule.startDate";
        const sortOrder = url.searchParams.get("sortOrder") || "asc";
        const limit = parseInt(url.searchParams.get("limit") || "12");
        const page = parseInt(url.searchParams.get("page") || "1");
        const skip = (page - 1) * limit;
        
        // Build query object
        const query: any = {};
        
        // Only add status filter if not "all"
        if (status !== "all") {
            query.status = status;
        }
        
        // Add event type filter if provided
        if (eventType) {
            // Handle comma-separated event types
            if (eventType.includes(',')) {
                query.eventType = { $in: eventType.split(',') };
            } else {
                query.eventType = eventType;
            }
        }
        
        // Add location filter if provided
        if (location && location !== "all") {
            query["venue.city"] = location;
        }
        
        // Add date filter
        if (dateFilter) {
            const now = new Date();
            if (dateFilter === "today") {
                const today = new Date(now);
                today.setHours(0, 0, 0, 0);
                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);
                
                query["schedule.startDate"] = { 
                    $gte: today,
                    $lt: tomorrow
                };
            } else if (dateFilter === "this-week") {
                const today = new Date(now);
                today.setHours(0, 0, 0, 0);
                const endOfWeek = new Date(today);
                endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
                
                query["schedule.startDate"] = { 
                    $gte: today,
                    $lte: endOfWeek
                };
            } else if (dateFilter === "this-month") {
                const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                const firstDayOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
                
                query["schedule.startDate"] = { 
                    $gte: firstDayOfMonth,
                    $lt: firstDayOfNextMonth
                };
            }
        }
        
        // Add text search if provided
        if (searchQuery) {
            query.$text = { $search: searchQuery };
        }
        
        // Determine sort configuration
        const sortConfig: any = {};
        if (sortBy === "date-asc") {
            sortConfig["schedule.startDate"] = 1;
        } else if (sortBy === "date-desc") {
            sortConfig["schedule.startDate"] = -1;
        } else if (sortBy === "popular") {
            sortConfig.capacity = -1;
        } else if (sortBy === "recent") {
            sortConfig.createdAt = -1;
        } else {
            sortConfig[sortBy] = sortOrder === "asc" ? 1 : -1;
        }
        
        console.log("Fetching events with query:", JSON.stringify(query));
        
        // Find events with pagination
        const events = await Event.find(query)
            .sort(sortConfig)
            .skip(skip)
            .limit(limit)
            .populate("createdBy", "name username")
            .lean();
            
        const total = await Event.countDocuments(query);
        
        console.log(`Found ${events.length} events out of ${total} total`);
        
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
            { error: error instanceof Error ? error.message : "Internal server error" },
            { status: 500 }
        );
    }
}
