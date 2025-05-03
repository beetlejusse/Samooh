"use client"

import React from "react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Sparkles, Menu, X, ChevronDown, User, LogOut, Settings } from "lucide-react"
import { signOut } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import axios from "axios"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserType {
  username: string;
  email: string;
  avatar?: string;
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/fetchUser");
        setUser(res.data.user);
        console.log("User data fetched:", res.data.user);
        console.log("helllo")
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <header className={cn("fixed top-6 left-0 right-0 z-50 transition-all duration-500 mx-auto max-w-6xl px-4")}>
      <div
        className={cn(
          "bg-white/40 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30 transition-all duration-500",
          scrolled ? "bg-white/60 shadow-md" : "",
        )}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 shadow-md group-hover:shadow-lg group-hover:shadow-pink-500/20 transition-all duration-300">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              Samooh
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/" isActive>
              Home
            </NavLink>
            <NavLink href="/events">Events</NavLink>
            <NavLink href="/submitEvent">Submit Event</NavLink>

            <div className="relative group">
              <button className="flex items-center gap-1 px-4 py-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-white/50 transition-colors">
                <span>Resources</span>
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 duration-300" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 rounded-xl bg-white/60 backdrop-blur-xl shadow-lg border border-white/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-2 transform origin-top scale-95 group-hover:scale-100">
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/FAQ"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-colors"
                >
                  FAQ
                </Link>
                <Link
                  href="/support"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-colors"
                >
                  Support
                </Link>
              </div>
            </div>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
            //   <DropdownMenu>
            //   <DropdownMenuTrigger asChild>
            //     <Button variant="ghost" className="relative h-8 w-8 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-glow">
            //       <Avatar className="h-8 w-8 glow-border">
            //         <AvatarImage
            //           src={user?.avatar || "/placeholder.svg?height=32&width=32"}
            //           alt={user?.username || "User"}
            //         />
            //         <AvatarFallback>
            //           {user?.username?.slice(0, 2).toUpperCase() || "NA"}
            //         </AvatarFallback>
            //       </Avatar>
            //     </Button>
            //   </DropdownMenuTrigger>
            //   <DropdownMenuContent className="w-56 bg-[#111827] border-white/10 text-white animate-fade-in-down glow-border" align="end" forceMount>
            //     <DropdownMenuLabel className="font-normal">
            //       <div className="flex flex-col space-y-1">
            //         <p className="text-sm font-medium leading-none">{user?.username || "Loading..."}</p>
            //         <p className="text-xs leading-none text-white/60">{user?.email || "Loading..."}</p>
            //       </div>
            //     </DropdownMenuLabel>
            //     <DropdownMenuSeparator className="bg-white/10" />
            //     <DropdownMenuItem asChild className="hover:bg-white/10 focus:bg-white/10 transition-all duration-300 hover:translate-x-1 hover:glow-text">
            //       <Link href="/profile">
            //         <User className="mr-2 h-4 w-4" />
            //         <span>Profile</span>
            //       </Link>
            //     </DropdownMenuItem>
            //     <DropdownMenuItem onClick={() => signOut()} className="hover:bg-white/10 focus:bg-white/10 transition-all duration-300 hover:translate-x-1 hover:glow-text">
            //       <LogOut className="mr-2 h-4 w-4" />
            //       <span>Log out</span>
            //     </DropdownMenuItem>
            //   </DropdownMenuContent>
            // </DropdownMenu>

              <p>hello</p>
            ) : (
              <>
                <Link href={"/sign-in"}>
                  <Button
                    variant="ghost"
                    className="rounded-full px-5 text-gray-600 hover:text-gray-900 hover:bg-white/50 transition-all duration-300"
                  >
                    Login
                  </Button>
                </Link>
                <Link href={"/sign-up"}>
                  <Button className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white border-0 hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300 px-5">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden rounded-full p-2 text-gray-600 hover:bg-white/50 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-x-4 top-24 bg-white/60 backdrop-blur-xl z-40 rounded-2xl shadow-lg border border-white/30 md:hidden transition-all duration-500 ease-in-out",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none",
        )}
      >
        <nav className="flex flex-col gap-2 p-4">
          <MobileNavLink href="/" onClick={() => setIsOpen(false)}>
            Home
          </MobileNavLink>
          <MobileNavLink href="/events" onClick={() => setIsOpen(false)}>
            Events
          </MobileNavLink>
          <MobileNavLink href="/submitEvent" onClick={() => setIsOpen(false)}>
            Submit Event
          </MobileNavLink>
          <MobileNavLink href="/dashboard" onClick={() => setIsOpen(false)}>
            Dashboard
          </MobileNavLink>
          <MobileNavLink href="/FAQ" onClick={() => setIsOpen(false)}>
            FAQ
          </MobileNavLink>
          <MobileNavLink href="/support" onClick={() => setIsOpen(false)}>
            Support
          </MobileNavLink>

          <div className="mt-4 flex flex-col gap-3 p-2">
            {user ? (
            //   <DropdownMenu>
            //   <DropdownMenuTrigger asChild>
            //     <Button variant="ghost" className="relative h-8 w-8 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-glow">
            //       <Avatar className="h-8 w-8 glow-border">
            //         <AvatarImage
            //           src={user?.avatar || "/placeholder.svg?height=32&width=32"}
            //           alt={user?.username || "User"}
            //         />
            //         <AvatarFallback>
            //           {user?.username?.slice(0, 2).toUpperCase() || "NA"}
            //         </AvatarFallback>
            //       </Avatar>
            //     </Button>
            //   </DropdownMenuTrigger>
            //   <DropdownMenuContent className="w-56 bg-[#111827] border-white/10 text-white animate-fade-in-down glow-border" align="end" forceMount>
            //     <DropdownMenuLabel className="font-normal">
            //       <div className="flex flex-col space-y-1">
            //         <p className="text-sm font-medium leading-none">{user?.username || "Loading..."}</p>
            //         <p className="text-xs leading-none text-white/60">{user?.email || "Loading..."}</p>
            //       </div>
            //     </DropdownMenuLabel>
            //     <DropdownMenuSeparator className="bg-white/10" />
            //     <DropdownMenuItem asChild className="hover:bg-white/10 focus:bg-white/10 transition-all duration-300 hover:translate-x-1 hover:glow-text">
            //       <Link href="/profile">
            //         <User className="mr-2 h-4 w-4" />
            //         <span>Profile</span>
            //       </Link>
            //     </DropdownMenuItem>
            //     <DropdownMenuItem onClick={() => signOut()} className="hover:bg-white/10 focus:bg-white/10 transition-all duration-300 hover:translate-x-1 hover:glow-text">
            //       <LogOut className="mr-2 h-4 w-4" />
            //       <span>Log out</span>
            //     </DropdownMenuItem>
            //   </DropdownMenuContent>
            // </DropdownMenu>

              <p>hello</p>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="w-full justify-center rounded-full border-gray-200 hover:border-pink-200 hover:bg-pink-50/50 transition-all duration-300"
                >
                  Login
                </Button>
                <Button className="w-full justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white border-0 hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300">
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

function NavLink({ href, children, isActive }: { href: string; children: React.ReactNode; isActive?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "px-4 py-2 rounded-full transition-all duration-300",
        isActive
          ? "bg-white/70 text-gray-900 font-medium shadow-sm"
          : "text-gray-600 hover:text-gray-900 hover:bg-white/50",
      )}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      href={href}
      className="py-3 px-4 text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50/50 rounded-xl transition-all duration-300"
      onClick={onClick}
    >
      {children}
    </Link>
  )
}