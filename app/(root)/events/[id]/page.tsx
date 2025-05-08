"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Clock, Users, Share2, Bookmark, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  schedule: {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    timezone: string;
  };
  capacity?: number;
  organizer: {
    name: string;
    email: string;
    phone?: string;
    collegeName: string;
    website?: string;
    socialMedia?: {
      instagram?: string;
      twitter?: string;
    };
  };
  additionalInfo?: string;
  status: 'draft' | 'published' | 'cancelled';
}

export default function EventPage() {
  const params = useParams();
  const eventId = params.id as string;
  
  const [event, setEvent] = useState<Event | null>(null);
  const [similarEvents, setSimilarEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        // Fetch the specific event
        const response = await fetch(`/api/events/${eventId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch event: ${response.status}`);
        }
        
        const data = await response.json();
        setEvent(data.event);
        
        // Fetch similar events (same event type)
        const eventType = data.event.eventType;
        const similarResponse = await fetch(`/api/fetchEvents?eventType=${eventType}&limit=3`);
        
        if (similarResponse.ok) {
          const similarData = await similarResponse.json();
          // Filter out the current event
          const filteredEvents = similarData.events.filter((e: Event) => e._id !== eventId);
          setSimilarEvents(filteredEvents.slice(0, 3));
        }
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
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

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col pt-20">
        <main className="flex-1">
          <div className="container py-8 flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex min-h-screen flex-col pt-20">
        <main className="flex-1">
          <div className="container py-8 text-center">
            <h1 className="text-2xl font-bold">Event not found</h1>
            <p className="text-muted-foreground mt-2">{error || "The event you're looking for doesn't exist"}</p>
            <Button asChild className="mt-4">
              <Link href="/events">Back to Events</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col pt-20">
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-6">
            <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2 h-8 gap-1">
              <Link href="/events">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Events</span>
              </Link>
            </Button>
            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
              <div>
                <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                  <Image
                    src={event.imageUrl || `/placeholder.svg?height=600&width=1200&text=${encodeURIComponent(event.title)}`}
                    width={1200}
                    height={600}
                    alt={event.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <Badge variant={getBadgeVariant(event.eventType)} className="mb-2">
                      {event.eventType}
                    </Badge>
                    <h1 className="text-2xl font-bold text-white md:text-4xl">{event.title}</h1>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(event.schedule.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{`${event.schedule.startTime} - ${event.schedule.endTime}`}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{event.venue?.name || "Online"}</span>
                  </div>
                  {event.capacity && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{`${event.capacity} Capacity`}</span>
                    </div>
                  )}
                </div>
                <div className="mt-6 flex gap-2">
                  <Button size="lg" className="gap-2">
                    Register Now
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Share</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Bookmark className="h-4 w-4" />
                    <span className="sr-only">Save</span>
                  </Button>
                </div>
                <Tabs defaultValue="about" className="mt-8">
                  <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                    <TabsTrigger
                      value="about"
                      className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
                    >
                      About
                    </TabsTrigger>
                    <TabsTrigger
                      value="schedule"
                      className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
                    >
                      Schedule
                    </TabsTrigger>
                    <TabsTrigger
                      value="organizer"
                      className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
                    >
                      Organizer
                    </TabsTrigger>
                    <TabsTrigger
                      value="faq"
                      className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
                    >
                      FAQ
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="about" className="pt-6">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold">About This Event</h2>
                      <p className="text-muted-foreground">{event.description}</p>
                      <p className="text-muted-foreground">
                        This event is open to all students, regardless of experience level. Whether you're a beginner or
                        an expert, you'll find value in this event. We encourage collaboration, learning, and
                        innovation.
                      </p>
                      {event.additionalInfo && (
                        <div>
                          <h3 className="text-xl font-bold mt-6">Additional Information</h3>
                          <p className="text-muted-foreground">{event.additionalInfo}</p>
                        </div>
                      )}
                      <h3 className="text-xl font-bold mt-6">What You'll Learn</h3>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>
                          Practical skills in{" "}
                          {event.eventType === 'hackathon'
                            ? "problem-solving and teamwork"
                            : event.eventType === 'workshop'
                              ? "web development and design"
                              : "AI and machine learning"}
                        </li>
                        <li>Industry best practices and standards</li>
                        <li>How to apply your knowledge to real-world scenarios</li>
                        <li>Networking with peers and professionals</li>
                      </ul>
                      <h3 className="text-xl font-bold mt-6">Who Should Attend</h3>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>College students interested in technology</li>
                        <li>Aspiring developers, designers, and entrepreneurs</li>
                        <li>Anyone looking to expand their skills and network</li>
                      </ul>
                    </div>
                  </TabsContent>
                  <TabsContent value="schedule" className="pt-6">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold">Event Schedule</h2>
                      <div className="space-y-6">
                        <div className="relative pl-6 border-l border-muted">
                          <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
                          <h3 className="text-lg font-semibold">{event.schedule.startTime} - Registration & Welcome</h3>
                          <p className="text-sm text-muted-foreground">
                            Check-in, get your badge, and enjoy some refreshments
                          </p>
                        </div>
                        <div className="relative pl-6 border-l border-muted">
                          <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
                          <h3 className="text-lg font-semibold">Opening Keynote</h3>
                          <p className="text-sm text-muted-foreground">Introduction to the event and keynote speech</p>
                        </div>
                        <div className="relative pl-6 border-l border-muted">
                          <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
                          <h3 className="text-lg font-semibold">
                            {event.eventType === 'hackathon' ? "Team Formation" : "Workshop Session 1"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {event.eventType === 'hackathon' ? "Form teams and brainstorm ideas" : "First hands-on session"}
                          </p>
                        </div>
                        <div className="relative pl-6 border-l border-muted">
                          <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
                          <h3 className="text-lg font-semibold">Lunch Break</h3>
                          <p className="text-sm text-muted-foreground">Networking lunch provided for all attendees</p>
                        </div>
                        <div className="relative pl-6 border-l border-muted">
                          <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
                          <h3 className="text-lg font-semibold">
                            {event.eventType === 'hackathon' 
                              ? "Hacking Begins" 
                              : event.eventType === 'workshop' 
                                ? "Workshop Session 2" 
                                : "Panel Discussion"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {event.eventType === 'hackathon'
                              ? "Start working on your projects"
                              : event.eventType === 'workshop'
                                ? "Second hands-on session"
                                : "Industry experts discuss current trends"}
                          </p>
                        </div>
                        <div className="relative pl-6 border-l border-muted">
                          <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
                          <h3 className="text-lg font-semibold">
                            {event.eventType === 'hackathon' ? "Mentoring Sessions" : "Q&A Session"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {event.eventType === 'hackathon'
                              ? "Get help from industry mentors"
                              : "Ask questions and get answers from experts"}
                          </p>
                        </div>
                        <div className="relative pl-6">
                          <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
                          <h3 className="text-lg font-semibold">{event.schedule.endTime} - Closing Remarks & Networking</h3>
                          <p className="text-sm text-muted-foreground">Wrap-up and informal networking</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="organizer" className="pt-6">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold">Event Organizer</h2>
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={`/placeholder.svg?height=48&width=48&text=${event.organizer.name.charAt(0)}`} />
                              <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{event.organizer.name}</CardTitle>
                              <CardDescription>
                                {event.organizer.collegeName}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-2">
                            Contact: {event.organizer.email}
                            {event.organizer.phone && `, ${event.organizer.phone}`}
                          </p>
                          {event.organizer.website && (
                            <p className="text-sm text-muted-foreground">
                              Website: <a href={event.organizer.website} className="text-primary hover:underline">{event.organizer.website}</a>
                            </p>
                          )}
                          {event.organizer.socialMedia && (
                            <div className="mt-2 flex gap-2">
                              {event.organizer.socialMedia.instagram && (
                                <Button variant="outline" size="sm" asChild>
                                  <a href={`https://instagram.com/${event.organizer.socialMedia.instagram}`}>Instagram</a>
                                </Button>
                              )}
                              {event.organizer.socialMedia.twitter && (
                                <Button variant="outline" size="sm" asChild>
                                  <a href={`https://twitter.com/${event.organizer.socialMedia.twitter}`}>Twitter</a>
                                </Button>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="faq" className="pt-6">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold">Do I need to bring my own laptop?</h3>
                          <p className="text-sm text-muted-foreground">
                            Yes, please bring your own laptop for the event. Make sure it's charged and you have all
                            necessary software installed.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Is there a registration fee?</h3>
                          <p className="text-sm text-muted-foreground">
                            This event is free for all college students with a valid ID. For non-students, there is a
                            small fee to cover costs.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Will food be provided?</h3>
                          <p className="text-sm text-muted-foreground">
                            Yes, we will provide lunch and refreshments throughout the day.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Can I attend if I'm a beginner?</h3>
                          <p className="text-sm text-muted-foreground">
                            This event is designed for all skill levels, from beginners to experts.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Will there be parking available?</h3>
                          <p className="text-sm text-muted-foreground">
                            Limited parking is available on campus. We recommend using public transportation if
                            possible.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">Date & Time</h3>
                        <p className="text-sm text-muted-foreground">{formatDate(event.schedule.startDate)}</p>
                        <p className="text-sm text-muted-foreground">{`${event.schedule.startTime} - ${event.schedule.endTime}`}</p>
                        <p className="text-sm text-muted-foreground">{event.schedule.timezone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">Location</h3>
                        <p className="text-sm text-muted-foreground">{event.venue?.name || "Online Event"}</p>
                        {event.venue && (
                          <>
                            <p className="text-sm text-muted-foreground">{event.venue.address}</p>
                            <p className="text-sm text-muted-foreground">{`${event.venue.city}, ${event.venue.state}, ${event.venue.country}`}</p>
                            <Button variant="link" size="sm" className="h-auto p-0 text-sm">
                              View Map
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">Organizer</h3>
                        <p className="text-sm text-muted-foreground">{event.organizer.name}</p>
                        <p className="text-sm text-muted-foreground">{event.organizer.collegeName}</p>
                        <Button variant="link" size="sm" className="h-auto p-0 text-sm">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Register Now</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Similar Events</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {similarEvents.length > 0 ? (
                      similarEvents.map((similarEvent) => (
                        <Link href={`/events/${similarEvent._id}`} key={similarEvent._id} className="flex gap-3 group">
                          <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={similarEvent.imageUrl || `/placeholder.svg?height=64&width=64&text=${encodeURIComponent(similarEvent.title)}`}
                              width={64}
                              height={64}
                              alt={similarEvent.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium group-hover:text-primary line-clamp-1">
                              {similarEvent.title}
                            </h4>
                            <p className="text-xs text-muted-foreground">{formatDate(similarEvent.schedule.startDate)}</p>
                            <Badge variant={getBadgeVariant(similarEvent.eventType)} className="mt-1 text-xs">
                              {similarEvent.eventType}
                            </Badge>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No similar events found</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
