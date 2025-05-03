"use client"

export function FeatureCard({
    icon,
    title,
    description,
    gradient,
  }: {
    icon: React.ReactNode
    title: string
    description: string
    gradient: string
  }) {
    return (
      <div className="relative group">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
        ></div>
        <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:translate-y-[-2px]">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-4">{icon}</div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    )
  }