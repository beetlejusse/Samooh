import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Event } from "@/models/Event.model";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    // Get the ID directly from params
    const id = params.id;
    
    const event = await Event.findById(id)
      .populate("createdBy", "name username")
      .lean();
    
    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }
    
    // Format dates for client-side consumption
    const formattedEvent = {
      ...event,
      schedule: {
        ...event.schedule,
        startDate: event.schedule.startDate.toISOString(),
        endDate: event.schedule.endDate.toISOString()
      },
      createdAt: event.createdAt?.toISOString(),
      updatedAt: event.updatedAt?.toISOString()
    };
    
    return NextResponse.json({
      success: true,
      event: formattedEvent
    });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
