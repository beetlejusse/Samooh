import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { userModel } from "@/models/User.model";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        console.log("Connecting db...");
        await dbConnect();
        console.log("db connected successfully.....")

        const body = await request.json();
        const { name, email, username, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Name, email, and password are required" },
                { status: 400 }
            );
        }

        const existingUser = await userModel.findOne({
            $or: [
                { email: email.toLowerCase() },
                { username: username }
            ],
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email or username already exists" },
                { status: 409 }
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email: email.toLowerCase(),
            username,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        return NextResponse.json(
            {
                success: true,
                message: "User registered successfully",
                user: {
                    id: savedUser._id,
                    name: savedUser.name,
                    email: savedUser.email,
                    username: savedUser.username
                }
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Sign up route error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
