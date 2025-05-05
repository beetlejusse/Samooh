"use client"

import { useEffect, useState, useRef } from "react"
import {
  User,
  Globe,
  Edit,
  Home,
  BookOpen,
  LogOut,
  BarChart3,
} from "lucide-react"
import axios from "axios"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useMediaQuery } from "@/app/(root)/dashboard/use-mobile"
import { UserType } from "@/types/UserTypes"
import { sidebarVariants } from "@/variants/variants"
import { ProfileSection, AnalyticsSection, EducationSection, SocialSection,OverviewSection } from "./helper-functions/functions"

export default function UserDashboard() {
  const [user, setUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("overview")
  const [progress, setProgress] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const profileCompleteness = useRef(0)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    } else {
      setSidebarOpen(true)
    }
  }, [isMobile])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/fetchUser")
        setUser(res.data.user)

        if (res.data.user) {
          const fields = Object.keys(res.data.user).filter(
            (key) =>
              key !== "name" && key !== "email" && res.data.user[key] !== undefined && res.data.user[key] !== null,
          )

          let socialCount = 0
          if (res.data.user.socialMedia) {
            socialCount = Object.values(res.data.user.socialMedia).filter(Boolean).length
          }

          let addressCount = 0
          if (res.data.user.address) {
            addressCount = Object.values(res.data.user.address).filter(Boolean).length
          }

          const totalPossibleFields = 10 + 5 + 5 
          const filledFields = fields.length - 2 + socialCount + addressCount 
          profileCompleteness.current = Math.min(100, Math.round((filledFields / totalPossibleFields) * 100))
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(profileCompleteness.current)
    }, 500)

    return () => clearTimeout(timer)
  }, [loading])

  const contentVariants = {
    wide: {
      marginLeft: isMobile ? 0 : 0,
      width: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    narrow: {
      marginLeft: isMobile ? 0 : "280px",
      width: isMobile ? "100%" : "calc(100% - 280px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  const navItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "social", label: "Social", icon: Globe },
    { id: "education", label: "Education", icon: BookOpen },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={isMobile ? "closed" : "open"}
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed top-0 left-0 bottom-0 w-[280px] z-40 bg-white/40 backdrop-blur-xl border-r border-pink-100 flex flex-col"
          >
            <div className="p-6 border-b border-pink-100">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-pink-200">
                    {user?.avatar ? (
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-500 text-white">
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 truncate">{user?.name}</h3>
                  <p className="text-xs text-gray-500 truncate">@{user?.username}</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500">Profile Completeness</span>
                  <span className="text-xs font-medium text-purple-600">{progress}%</span>
                </div>
                <Progress value={progress} className="h-1.5" />
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-3">
              <ul className="space-y-1.5">
                {navItems.map((item) => (
                  <motion.li key={item.id} whileTap={{ scale: 0.97 }}>
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        activeSection === item.id
                          ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-purple-700"
                          : "text-gray-600 hover:bg-pink-50"
                      }`}
                    >
                      <item.icon size={18} className={activeSection === item.id ? "text-pink-500" : "text-gray-500"} />
                      <span>{item.label}</span>
                      {activeSection === item.id && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="ml-auto w-1.5 h-5 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="p-4 border-t border-pink-100">
              <Link href="/edit-profile">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 bg-white/50 hover:bg-white/80 border-pink-200 hover:text-gray-900"
                >
                  <Edit size={16} />
                  Edit Profile
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 mt-2 text-gray-600 hover:text-gray-900 hover:bg-pink-50" 
              >
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.main
        variants={contentVariants}
        initial={sidebarOpen && !isMobile ? "narrow" : "wide"}
        animate={sidebarOpen && !isMobile ? "narrow" : "wide"}
        className="min-h-screen mt-16 md:mt-28 pb-6 px-4"
      >
        {/* Content Sections */}
        <div className="mt-16 md:mt-0">
          <AnimatePresence mode="wait">
            {activeSection === "overview" && <OverviewSection key="overview" user={user} progress={progress} />}
            {activeSection === "profile" && <ProfileSection key="profile" user={user} />}
            {activeSection === "social" && <SocialSection key="social" user={user} />}
            {activeSection === "education" && <EducationSection key="education" user={user} />}
            {activeSection === "analytics" && <AnalyticsSection key="analytics" />}
          </AnimatePresence>
        </div>
      </motion.main>
    </div>
  )
}