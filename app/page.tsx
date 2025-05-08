"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Calendar,
  Filter,
  ArrowRight,
  Sparkles,
  Users,
  Clock,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomCard } from "@/components/custom-card";
import { FeatureCard } from "@/components/FeatureCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import SvgComponent from "@/svgs/svgComp";
import { Badge } from "@/components/ui/badge";

interface Event {
  _id: string;
  title: string;
  eventType: 'hackathon' | 'workshop' | 'tech-talk' | 'networking' | 'conference' | 'other';
  description: string;
  format: 'in-person' | 'virtual' | 'hybrid';
  imageUrl: string;
  tags: string[];
  venue?: {
    name: string;
    city: string;
    state: string;
    country: string;
  };
  schedule: {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    timezone: string;
  };
  organizer: {
    name: string;
    collegeName: string;
  };
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      // Fetch featured events (limit to 3)
      const response = await fetch('/api/fetchEvents?limit=3&sortBy=recent');
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setEvents(data.events);
      } else {
        console.error("Failed to fetch events:", data.error);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality if needed
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  const getBadgeVariant = (eventType: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (eventType) {
      case 'hackathon':
        return 'default';
      case 'workshop':
        return 'secondary';
      case 'tech-talk':
        return 'outline';
      case 'networking':
        return 'destructive';
      case 'conference':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-100 via-white to-purple-100 opacity-70"></div>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>

          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 backdrop-blur-sm border border-pink-100 text-sm text-pink-600 font-medium shadow-sm w-fit">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Discover amazing college events</span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Connect, Learn & Grow at College Events
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    Find hackathons, workshops, tech talks, and more. Connect
                    with like-minded students and boost your skills.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white border-0 hover:shadow-lg hover:shadow-pink-500/20 transition-all px-6 py-6 h-auto text-base">
                    <Link href="/events" className="flex items-center gap-2">
                      Explore Events
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-pink-200 text-gray-700 hover:bg-pink-50 hover:text-pink-600 px-6 py-6 h-auto text-base"
                  >
                    <Link href="/submitEvent">Submit Your Event</Link>
                  </Button>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                      >
                        <Image
                          src={`/placeholder.svg?height=32&width=32&text=${i}`}
                          alt="User"
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <span>
                    Join{" "}
                    <span className="font-medium text-pink-600">2,500+</span>{" "}
                    students already on Samooh
                  </span>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl blur-md opacity-20"></div>
                <div className="relative rounded-2xl overflow-hidden border border-white/50 shadow-xl">
                  <Image
                    src="https://i.ibb.co/zTKBn7bg/smart-india-hackathon-3-scaled.jpg"
                    width={600}
                    height={600}
                    alt="College Events"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50 max-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-pink-600" />
                    </div>
                    <div className="text-sm font-medium">Upcoming Event</div>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Hack the Future
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>In 3 days</span>
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50 max-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <Users className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="text-sm font-medium">Active Users</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    500+
                  </div>
                  <div className="text-xs text-gray-500">
                    Students online now
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full blur-md opacity-10"></div>
                <div className="relative flex items-center bg-white rounded-full shadow-md border border-gray-100 p-1">
                  <div className="flex-1 flex items-center pl-4">
                    <Search className="h-5 w-5 text-gray-400 mr-2" />
                    <Input
                      type="search"
                      placeholder="Search events, workshops, hackathons..."
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white border-0 hover:shadow-lg hover:shadow-pink-500/20 transition-all">
                    Search
                  </Button>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={`rounded-full ${
                    selectedCategory === "all" 
                      ? "bg-pink-50 text-pink-600 border-pink-200" 
                      : "border-pink-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600"
                  }`}
                  onClick={() => setSelectedCategory("all")}
                >
                  <Filter className="h-3.5 w-3.5 mr-1" />
                  All Events
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`rounded-full ${
                    selectedCategory === "hackathon" 
                      ? "bg-pink-50 text-pink-600 border-pink-200" 
                      : "border-pink-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600"
                  }`}
                  onClick={() => setSelectedCategory("hackathon")}
                >
                  Hackathons
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`rounded-full ${
                    selectedCategory === "workshop" 
                      ? "bg-pink-50 text-pink-600 border-pink-200" 
                      : "border-pink-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600"
                  }`}
                  onClick={() => setSelectedCategory("workshop")}
                >
                  Workshops
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`rounded-full ${
                    selectedCategory === "tech-talk" 
                      ? "bg-pink-50 text-pink-600 border-pink-200" 
                      : "border-pink-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600"
                  }`}
                  onClick={() => setSelectedCategory("tech-talk")}
                >
                  Tech Talks
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`rounded-full ${
                    selectedCategory === "networking" 
                      ? "bg-pink-50 text-pink-600 border-pink-200" 
                      : "border-pink-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600"
                  }`}
                  onClick={() => setSelectedCategory("networking")}
                >
                  Networking
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-18">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-violet-600 bg-clip-text text-transparent mb-2">
                  Featured Events
                </h2>
                <p className="text-gray-600 max-w-2xl">
                  Discover the most exciting upcoming events at colleges near
                  you
                </p>
              </div>
              <Link
                href="/events"
                className="text-pink-600 font-medium hover:text-pink-700 flex items-center gap-1 mt-4 md:mt-0"
              >
                View all events
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {events.length > 0 ? (
                  events.map((event) => (
                    <Link href={`/events/${event._id}`} key={event._id} className="group">
                      <div className="overflow-hidden transition-all hover:shadow-md rounded-xl border border-gray-200">
                        <div className="aspect-video w-full overflow-hidden">
                          <Image
                            src={event.imageUrl || `/placeholder.svg?height=300&width=500&text=${encodeURIComponent(event.title)}`}
                            width={500}
                            height={300}
                            alt={event.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-2">
                            <Badge variant={getBadgeVariant(event.eventType)}>
                              {event.eventType}
                            </Badge>
                            <Badge variant="outline" className="ml-auto">
                              {formatDate(event.schedule.startDate)}
                            </Badge>
                          </div>
                          <h3 className="line-clamp-1 text-xl font-semibold mt-2">
                            {event.title}
                          </h3>
                          <p className="line-clamp-2 text-gray-600 mt-1">
                            {event.description}
                          </p>
                          <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              <span>{event.venue?.name || event.venue?.city || "Online"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{formatDate(event.schedule.startDate)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <h3 className="text-xl font-medium">No events found</h3>
                    <p className="text-gray-500 mt-2">Check back later for upcoming events</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="py-16 md:py-24 bg-gradient-to-br from-pink-50 via-white to-purple-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-violet-600 bg-clip-text text-transparent mb-4">
                Why Join Samooh?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover the benefits of our college event platform
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <FeatureCard
                icon={<Search className="h-6 w-6 text-pink-600" />}
                title="Discover Events"
                description="Find events at colleges near you, from hackathons to workshops and tech talks."
                gradient="from-pink-500 to-pink-600"
              />

              <FeatureCard
                icon={<Calendar className="h-6 w-6 text-purple-600" />}
                title="Stay Updated"
                description="Get notified about upcoming events that match your interests and never miss an opportunity."
                gradient="from-purple-500 to-purple-600"
              />

              <FeatureCard
                icon={<Users className="h-6 w-6 text-blue-600" />}
                title="Connect"
                description="Network with like-minded students, organizers, and industry professionals."
                gradient="from-blue-500 to-blue-600"
              />
            </div>

            <div className="mt-8 text-center">
              <Button className="rounded-lg bg-gradient-to-r from-pink-500 to-violet-500 text-white border-0 hover:shadow-lg hover:shadow-pink-500/20 transition-all px-6 py-4 h-auto font-semibold text-base">
                <Link href="/signup">Join Now</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-22">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-violet-600 bg-clip-text text-transparent mb-4">
                What Students Say
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hear from students who have found amazing opportunities through
                Samooh
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <TestimonialCard
                quote="Samooh helped me discover hackathons I never would have known about otherwise. I've made amazing connections and even landed an internship!"
                name="Alex Johnson"
                role="Computer Science Student"
                avatar="/placeholder.svg?height=64&width=64&text=AJ"
              />

              <TestimonialCard
                quote="As an event organizer, Samooh made it so easy to reach students across multiple campuses. Our attendance doubled!"
                name="Maya Patel"
                role="Event Coordinator"
                avatar="/placeholder.svg?height=64&width=64&text=MP"
              />

              <TestimonialCard
                quote="The workshops I found through Samooh taught me practical skills that my classes didn't cover. It's been invaluable for my career."
                name="David Kim"
                role="Engineering Student"
                avatar="/placeholder.svg?height=64&width=64&text=DK"
              />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500"></div>
              <div
                className="absolute inset-0 mix-blend-multiply opacity-20"
                style={{
                  backgroundImage:
                    "url('/placeholder.svg?height=600&width=1200&text=Background')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>

              <div className="relative py-12 px-6 md:py-16 md:px-12 text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to discover amazing events?
                </h2>
                <p className="max-w-2xl mx-auto mb-8 text-white/80">
                  Join thousands of students already using Samooh to find and
                  share college events.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="rounded-lg bg-white text-pink-600 hover:bg-white/90 px-4 py-4 h-auto text-base">
                    <Link href="/signup">Create Account</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-lg border-white text-white hover:bg-white/10 px-4 py-4 h-auto text-base"
                  >
                    <Link href="/events">Browse Events</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-100">
        <div className="container px-4 md:px-6 py-10 md:py-14">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 shadow-md">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                  Samooh
                </span>
              </Link>
              <p className="text-gray-600 mb-4">
                Discover, connect, and grow with college events that match your
                interests and career goals.
              </p>
              <SvgComponent />
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-pink-600">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events"
                    className="text-gray-600 hover:text-pink-600"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    href="/submit"
                    className="text-gray-600 hover:text-pink-600"
                  >
                    Submit Event
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 hover:text-pink-600"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-600 hover:text-pink-600"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-gray-600 hover:text-pink-600"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="text-gray-600 hover:text-pink-600"
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-600 hover:text-pink-600"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Subscribe</h3>
              <p className="text-gray-600 mb-4">
                Stay updated with the latest events and news.
              </p>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="rounded-l-full border-gray-200 focus-visible:ring-pink-500"
                />
                <Button className="rounded-r-full bg-gradient-to-r from-pink-500 to-violet-500 text-white border-0">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Samooh. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
