import { UserType } from "@/types/UserTypes";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  User,
  Linkedin,
  MessageSquare,
  Bell,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  Award,
  Briefcase,
  ChevronRight,
  Sparkles,
  BarChart3,
  Globe,
  Instagram,
  Twitter,
  Github,
  MapPin,
  Edit,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function OverviewSection({
  user,
  progress,
}: {
  user: UserType | null;
  progress: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Welcome Card */}
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6 md:p-8"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Welcome back, {user?.name?.split(" ")[0]}!
          </h2>
          <p className="text-pink-100 max-w-lg">
            Your profile is {progress}% complete. Add more information to
            improve your profile visibility.
          </p>
          <Link href="/edit-profile">
            <Button className="mt-4 bg-white text-purple-600 hover:bg-pink-100 hover:text-purple-700">
              Complete Your Profile
            </Button>
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400 rounded-full opacity-20 -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 right-20 w-32 h-32 bg-pink-400 rounded-full opacity-20 -mb-10"></div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Profile Views",
            value: "124",
            icon: User,
            color: "from-pink-400 to-pink-500",
          },
          {
            label: "Connections",
            value: "48",
            icon: Linkedin,
            color: "from-purple-400 to-purple-500",
          },
          {
            label: "Messages",
            value: "9",
            icon: MessageSquare,
            color: "from-blue-400 to-blue-500",
          },
          {
            label: "Notifications",
            value: "3",
            icon: Bell,
            color: "from-orange-400 to-red-500",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-white/60 backdrop-blur-lg rounded-3xl p-5 border border-white/80 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
              <div
                className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center`}
              >
                <stat.icon size={20} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Info */}
        <motion.div
          className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 border border-white/80 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <User className="mr-2 h-5 w-5 text-pink-500" /> Personal Info
          </h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                <Mail className="h-5 w-5 text-pink-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>
            {user?.phoneNumber && (
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <Phone className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="font-medium">{user?.phoneNumber}</p>
                </div>
              </div>
            )}
            {user?.dateOfBirth && (
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                  <Calendar className="h-5 w-5 text-pink-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Birthday</p>
                  <p className="font-medium">
                    {new Date(user.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 border border-white/80 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-purple-500" /> Education
          </h3>
          {user?.collegeName ? (
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <Award className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">College</p>
                  <p className="font-medium">{user?.collegeName}</p>
                </div>
              </div>
              {user?.department && (
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                    <Briefcase className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Department</p>
                    <p className="font-medium">{user?.department}</p>
                  </div>
                </div>
              )}
              {user?.graduationYear && (
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <Calendar className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Graduation</p>
                    <p className="font-medium">{user?.graduationYear}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 text-center">
              <BookOpen className="h-8 w-8 text-gray-300 mb-2" />
              <p className="text-gray-500">No education information</p>
              <Link
                href="/edit-profile"
                className="text-pink-500 hover:text-pink-600 mt-2 text-sm flex items-center"
              >
                Add education <ChevronRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          )}
        </motion.div>

        {/* Skills */}
        <motion.div
          className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 border border-white/80 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-pink-500" /> Skills
          </h3>
          {user?.skills && user.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 text-center">
              <Sparkles className="h-8 w-8 text-gray-300 mb-2" />
              <p className="text-gray-500">No skills added yet</p>
              <Link
                href="/edit-profile"
                className="text-pink-500 hover:text-pink-600 mt-2 text-sm flex items-center"
              >
                Add skills <ChevronRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ProfileSection({ user }: { user: UserType | null }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <motion.div
        className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 border border-white/80 shadow-sm"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              {user?.avatar ? (
                <AvatarImage
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-500 text-white text-4xl">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
              <Edit className="h-4 w-4 text-gray-500" />
            </div>
          </motion.div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
            <div className="flex items-center text-gray-500 mt-1">
              <User className="mr-2 h-4 w-4" />
              <span>@{user?.username}</span>
            </div>
            <div className="flex items-center text-gray-500 mt-1">
              <Mail className="mr-2 h-4 w-4" />
              <span>{user?.email}</span>
            </div>
            {user?.bio && <p className="text-gray-600 mt-4">{user.bio}</p>}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 border border-white/80 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Phone className="mr-2 h-5 w-5 text-pink-500" /> Contact Information
          </h3>
          <div className="space-y-4">
            {user?.phoneNumber && (
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                  <Phone className="h-5 w-5 text-pink-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="font-medium">{user.phoneNumber}</p>
                </div>
              </div>
            )}
            {user?.dateOfBirth && (
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <Calendar className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Date of Birth</p>
                  <p className="font-medium">
                    {new Date(user.dateOfBirth).toLocaleDateString()}
                    {user.gender && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        {user.gender}
                      </Badge>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 border border-white/80 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-purple-500" /> Address
          </h3>
          {user?.address ? (
            <div className="space-y-3">
              {user.address.street && (
                <div>
                  <p className="text-xs text-gray-500">Street</p>
                  <p className="font-medium">{user.address.street}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {user.address.city && (
                  <div>
                    <p className="text-xs text-gray-500">City</p>
                    <p className="font-medium">{user.address.city}</p>
                  </div>
                )}

                {user.address.state && (
                  <div>
                    <p className="text-xs text-gray-500">State</p>
                    <p className="font-medium">{user.address.state}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {user.address.country && (
                  <div>
                    <p className="text-xs text-gray-500">Country</p>
                    <p className="font-medium">{user.address.country}</p>
                  </div>
                )}

                {user.address.postalCode && (
                  <div>
                    <p className="text-xs text-gray-500">Postal Code</p>
                    <p className="font-medium">{user.address.postalCode}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 text-center">
              <MapPin className="h-8 w-8 text-gray-300 mb-2" />
              <p className="text-gray-500">No address information available</p>
              <Link
                href="/edit-profile"
                className="text-pink-500 hover:text-pink-600 mt-2 text-sm flex items-center"
              >
                Add your address <ChevronRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export function EducationSection({ user }: { user: UserType | null }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <motion.div
        className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 border border-white/80 shadow-sm"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-purple-500" /> Education
          Details
        </h3>

        {user?.collegeName || user?.department || user?.graduationYear ? (
          <div className="relative pl-6 border-l-2 border-purple-200">
            <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-purple-500"></div>
            <div className="mb-8">
              <div className="flex items-center">
                <h4 className="text-lg font-medium text-gray-800">
                  {user?.collegeName}
                </h4>
                {user?.graduationYear && (
                  <Badge className="ml-3 bg-purple-100 text-purple-700 hover:bg-purple-200">
                    Class of {user.graduationYear}
                  </Badge>
                )}
              </div>
              {user?.department && (
                <p className="text-gray-600 mt-1">{user.department}</p>
              )}
              <p className="text-gray-500 text-sm mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            <div className="absolute -left-1.5 bottom-0 w-3 h-3 rounded-full bg-pink-500"></div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <BookOpen className="h-12 w-12 text-gray-300 mb-3" />
            <p className="text-gray-500">No education information available</p>
            <Link
              href="/edit-profile"
              className="mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-sm font-medium hover:from-pink-600 hover:to-purple-700 transition-colors"
            >
              Add Education Details
            </Link>
          </div>
        )}
      </motion.div>

      <motion.div
        className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 border border-white/80 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <Sparkles className="mr-2 h-5 w-5 text-pink-500" /> Skills & Expertise
        </h3>

        {user?.skills && user.skills.length > 0 ? (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              {user.skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 4px 12px rgba(213, 63, 140, 0.15)",
                  }}
                >
                  <Badge className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-3">
                Skill Proficiency
              </h4>
              <div className="space-y-3">
                {user.skills.slice(0, 3).map((skill, index) => (
                  <div key={skill} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">{skill}</span>
                      <span className="text-xs text-gray-500">
                        {75 + index * 5}%
                      </span>
                    </div>
                    <Progress value={75 + index * 5} className="h-1.5" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <Sparkles className="h-12 w-12 text-gray-300 mb-3" />
            <p className="text-gray-500">No skills added yet</p>
            <Link
              href="/edit-profile"
              className="mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-sm font-medium hover:from-pink-600 hover:to-purple-700 transition-colors"
            >
              Add Skills
            </Link>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function SocialSection({ user }: { user: UserType | null }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <motion.div
        className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 border border-white/80 shadow-sm"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <Globe className="mr-2 h-5 w-5 text-purple-500" /> Social Media
          Profiles
        </h3>

        {user?.socialMedia && Object.values(user.socialMedia).some(Boolean) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.socialMedia?.instagram && (
              <motion.a
                href={user.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center p-4 rounded-2xl bg-white/80 border border-pink-100 hover:border-pink-300 transition-all"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-pink-400 flex items-center justify-center mr-4 text-white">
                  <Instagram className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 group-hover:text-pink-600 transition-colors">
                    Instagram
                  </p>
                  <p className="text-sm text-gray-500">
                    @{user.socialMedia.instagram?.split(".com/").pop()?.split("/")}
                  </p>
                </div>
              </motion.a>
            )}

            {user.socialMedia?.twitter && (
              <motion.a
                href={user.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center p-4 rounded-2xl bg-white/80 border border-blue-100 hover:border-blue-300 transition-all"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="h-12 w-12 rounded-full bg-blue-400 flex items-center justify-center mr-4 text-white">
                  <Twitter className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 group-hover:text-blue-500 transition-colors">
                    Twitter
                  </p>
                  <p className="text-sm text-gray-500">
                    @{user.socialMedia.twitter.split("/").pop()}
                  </p>
                </div>
              </motion.a>
            )}

            {user.socialMedia?.linkedin && (
              <motion.a
                href={user.socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center p-4 rounded-2xl bg-white/80 border border-blue-100 hover:border-blue-300 transition-all"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="h-12 w-12 rounded-full bg-blue-700 flex items-center justify-center mr-4 text-white">
                  <Linkedin className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
                    LinkedIn
                  </p>
                  <p className="text-sm text-gray-500">Professional Profile</p>
                </div>
              </motion.a>
            )}

            {user.socialMedia?.github && (
              <motion.a
                href={user.socialMedia.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center p-4 rounded-2xl bg-white/80 border border-gray-100 hover:border-gray-300 transition-all"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="h-12 w-12 rounded-full bg-gray-800 flex items-center justify-center mr-4 text-white">
                  <Github className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 group-hover:text-gray-900 transition-colors">
                    GitHub
                  </p>
                  <p className="text-sm text-gray-500">
                    @{user.socialMedia.github.split("/").pop()}
                  </p>
                </div>
              </motion.a>
            )}

            {user.socialMedia?.website && (
              <motion.a
                href={user.socialMedia.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center p-4 rounded-2xl bg-white/80 border border-purple-100 hover:border-purple-300 transition-all"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-4 text-white">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 group-hover:text-purple-600 transition-colors">
                    Website
                  </p>
                  <p className="text-sm text-gray-500">
                    {user.socialMedia.website.split("/").pop()}
                  </p>
                </div>
              </motion.a>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <Globe className="h-12 w-12 text-gray-300 mb-3" />
            <p className="text-gray-500">No social media links available</p>
            <Link
              href="/edit-profile"
              className="mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-sm font-medium hover:from-pink-600 hover:to-purple-700 transition-colors"
            >
              Add Social Links
            </Link>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function AnalyticsSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <motion.div
        className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 border border-white/80 shadow-sm"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <BarChart3 className="mr-2 h-5 w-5 text-purple-500" /> Profile
          Analytics
        </h3>

        <div className="flex flex-col items-center justify-center h-40 text-center">
          <BarChart3 className="h-12 w-12 text-gray-300 mb-3" />
          <p className="text-gray-500">Analytics coming soon</p>
          <p className="text-sm text-gray-400 mt-2">
            Track your profile views and engagement
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
