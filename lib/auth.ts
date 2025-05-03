import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "@/lib/db";
import  {userModel}  from "@/models/User.model";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
          credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
          },
          authorize: async (credentials: any) => {
            try {
              await dbConnect();
    
              if (!credentials?.email || !credentials?.password) {
                throw new Error("Email and password are required");
              }
    
              const user = await userModel.findOne({
                $or: [
                  { email: credentials.email },
                  { userName: credentials.username }
                ],
              });
    
              if (!user) {
                throw new Error("No user found with this email");
              }
              
              const isPasswordCorrect = await bcrypt.compare(
                credentials.password,
                user.password
              );
              
              if (!isPasswordCorrect) {
                throw new Error("Incorrect password");
              }
              
              return {
                id: user._id?.toString(),
                name: user.name,
                email: user.email,
                // role: user.role || "user",
              };
            } catch (error: any) {
              throw new Error(error.message || "Authentication failed");
            }
          },
        }),
      ],
      callbacks: {
        async jwt({ token, user }: { token: JWT; user: any }) {
          if (user) {
            token.id = user.id;
            token.role = user.role;
          }
          return token;
        },
        async session({ session, token }: { session: any; token: JWT }) {
          if (token) {
            session.user.id = token.id;
            session.user.role = token.role;
          }
          return session;
        },
      },
      pages: {
        signIn: '/sign-in',
      },
      session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, 
      },
      secret: process.env.AUTH_SECRET
})
