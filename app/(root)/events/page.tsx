"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, Calendar, MapPin, Filter, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function EventsPage() {
  return (
    <div className="flex pt-20 min-h-screen flex-col">
      <main className="flex-1">
        <section className="container grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 py-8">
          <div className="hidden md:block space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Event Type</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="hackathon" />
                      <label
                        htmlFor="hackathon"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Hackathon
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="workshop" />
                      <label
                        htmlFor="workshop"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Workshop
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="tech-talk" />
                      <label
                        htmlFor="tech-talk"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Tech Talk
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="networking" />
                      <label
                        htmlFor="networking"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Networking
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Date</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="today" />
                      <label
                        htmlFor="today"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Today
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="this-week" />
                      <label
                        htmlFor="this-week"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        This Week
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="this-month" />
                      <label
                        htmlFor="this-month"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        This Month
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Location</h4>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="mit">MIT Campus</SelectItem>
                      <SelectItem value="stanford">Stanford Campus</SelectItem>
                      <SelectItem value="harvard">Harvard Campus</SelectItem>
                      <SelectItem value="berkeley">UC Berkeley</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Distance (miles)</h4>
                  <Slider defaultValue={[50]} max={100} step={10} />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Recommended For You</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Link href={`/events/${i}`} key={`rec-${i}`} className="block group">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={`/placeholder.svg?height=64&width=64&text=${i}`}
                          width={64}
                          height={64}
                          alt={`Event ${i}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium group-hover:text-primary line-clamp-1">
                          {i === 1 ? "AI Workshop" : i === 2 ? "Blockchain Hackathon" : "Cloud Computing Talk"}
                        </h4>
                        <p className="text-xs text-muted-foreground">{`${10 + i} Mar, 2024`}</p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {i === 1 ? "Workshop" : i === 2 ? "Hackathon" : "Tech Talk"}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
              <h1 className="text-3xl font-bold">All Events</h1>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search events..." className="w-full rounded-md pl-8 md:w-[300px]" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-9 gap-1 md:hidden">
                    <Filter className="h-3.5 w-3.5" />
                    <span>Filters</span>
                  </Button>
                  <Select>
                    <SelectTrigger className="h-9 w-[130px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date-asc">Date (Ascending)</SelectItem>
                      <SelectItem value="date-desc">Date (Descending)</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="recent">Recently Added</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <Link href={`/events/${i + 1}`} key={i} className="group">
                  <Card className="overflow-hidden transition-all hover:shadow-md">
                    <div className="aspect-video w-full overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=300&width=500&text=Event+${i + 1}`}
                        width={500}
                        height={300}
                        alt={`Event ${i + 1}`}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-2">
                        <Badge variant={i % 3 === 0 ? "default" : i % 3 === 1 ? "secondary" : "outline"}>
                          {i % 3 === 0 ? "Hackathon" : i % 3 === 1 ? "Workshop" : "Tech Talk"}
                        </Badge>
                        <Badge variant="outline" className="ml-auto">
                          {`${10 + i} Mar`}
                        </Badge>
                      </div>
                      <CardTitle className="line-clamp-1 text-xl">
                        {i % 3 === 0
                          ? `Hack the Future ${i + 1}`
                          : i % 3 === 1
                            ? `Web Dev Workshop ${i + 1}`
                            : `AI Revolution Talk ${i + 1}`}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {i % 3 === 0
                          ? "Join us for a 24-hour hackathon where you'll build innovative solutions to real-world problems."
                          : i % 3 === 1
                            ? "Learn the latest web development technologies in this hands-on workshop."
                            : "Discover how AI is transforming industries in this insightful tech talk."}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex items-center p-4 pt-0 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{`${i % 4 === 0 ? "MIT" : i % 4 === 1 ? "Stanford" : i % 4 === 2 ? "Harvard" : "Berkeley"} Campus`}</span>
                      </div>
                      <div className="ml-auto flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{`${10 + i} Mar, 2024`}</span>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" disabled>
                  <ChevronDown className="h-4 w-4 rotate-90" />
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8">
                  1
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8">
                  2
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8">
                  3
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronDown className="h-4 w-4 -rotate-90" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
