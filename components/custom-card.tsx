"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Users } from "lucide-react"

interface CustomCardProps {
  id: number
  title: string
  description: string
  image: string
  date: string
  location: string
  attendees: number
  category: string
  className?: string
}

export function CustomCard({
  id,
  title,
  description,
  image,
  date,
  location,
  attendees,
  category,
  className,
}: CustomCardProps) {
  const getBadgeClass = () => {
    switch (category.toLowerCase()) {
      case "hackathon":
        return "bg-pink-100 text-pink-600"
      case "workshop":
        return "bg-purple-100 text-purple-600"
      case "tech talk":
        return "bg-blue-100 text-blue-600"
      case "networking":
        return "bg-green-100 text-green-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <Link href={`/events/${id}`}>
      <div
        className={cn(
          "group relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-sm border border-white/20 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10 hover:-translate-y-1",
          className,
        )}
      >
        <div className="aspect-video w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={500}
            height={300}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="absolute top-4 left-4 z-10">
          <span className={cn("px-3 py-1 rounded-full text-xs font-medium", getBadgeClass())}>{category}</span>
        </div>

        <div className="p-5">
          <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-pink-600 transition-colors">{title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              <span>{attendees} attendees</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-violet-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </div>
    </Link>
  )
}
