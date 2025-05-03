"use client"

import Image from "next/image"
export function TestimonialCard({
    quote,
    name,
    role,
    avatar,
  }: {
    quote: string
    name: string
    role: string
    avatar: string
  }) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-pink-100">
            <Image
              src={avatar || "/placeholder.svg"}
              alt={name}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold">{name}</h4>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
        </div>
        <p className="text-gray-600 italic">"{quote}"</p>
        <div className="mt-4 flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="#FF85A1"
              className="w-4 h-4"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
      </div>
    )
  }