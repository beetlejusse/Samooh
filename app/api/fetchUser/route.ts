import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db";
import { userModel } from "@/models/User.model";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    // Check if user is authenticated
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized: Please sign in to access this resource" },
        { status: 401 }
      );
    }

    // Connect to database
    await dbConnect();

    // Get user ID from session
    const userId = session.user.id;

    // Find user in database (excluding password)
    const user = await userModel.findById(userId).select("-password");

    // Check if user exists
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Return user data
    return NextResponse.json({ message: "User fetched", user });
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user details" },
      { status: 500 }
    );
  }
}
