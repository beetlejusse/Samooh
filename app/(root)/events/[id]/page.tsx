"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Clock, Users, Share2, Bookmark, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function EventPage({ params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const eventType = id % 3 === 0 ? "Hackathon" : id % 3 === 1 ? "Workshop" : "Tech Talk"
  const eventName =
    id % 3 === 0 ? `Hack the Future ${id}` : id % 3 === 1 ? `Web Dev Workshop ${id}` : `AI Revolution Talk ${id}`
  const eventLocation =
    id % 4 === 0 ? "MIT Campus" : id % 4 === 1 ? "Stanford Campus" : id % 4 === 2 ? "Harvard Campus" : "UC Berkeley"
  const eventDate = `${10 + id} March, 2024`
  const eventTime = "10:00 AM - 6:00 PM"
  const eventDescription =
    id % 3 === 0
      ? "Join us for a 24-hour hackathon where you'll build innovative solutions to real-world problems. Work with a team to create a project that addresses challenges in healthcare, education, sustainability, or social impact. You'll have access to mentors, workshops, and resources to help you bring your ideas to life."
      : id % 3 === 1
        ? "Learn the latest web development technologies in this hands-on workshop. We'll cover modern frontend frameworks, backend development, and deployment strategies. By the end of this workshop, you'll have built a full-stack web application and gained practical skills that you can apply to your own projects."
        : "Discover how AI is transforming industries in this insightful tech talk. Our speakers will discuss the latest advancements in artificial intelligence, machine learning, and their applications in various fields. You'll learn about cutting-edge research, ethical considerations, and future trends in AI technology."

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
                    src={`/placeholder.svg?height=600&width=1200&text=${eventName}`}
                    width={1200}
                    height={600}
                    alt={eventName}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <Badge variant={id % 3 === 0 ? "default" : id % 3 === 1 ? "secondary" : "outline"} className="mb-2">
                      {eventType}
                    </Badge>
                    <h1 className="text-2xl font-bold text-white md:text-4xl">{eventName}</h1>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{eventDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{eventTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{eventLocation}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{`${50 + id * 10} Attendees`}</span>
                  </div>
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
                      value="speakers"
                      className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary"
                    >
                      Speakers
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
                      <p className="text-muted-foreground">{eventDescription}</p>
                      <p className="text-muted-foreground">
                        This event is open to all students, regardless of experience level. Whether you're a beginner or
                        an expert, you'll find value in this event. We encourage collaboration, learning, and
                        innovation.
                      </p>
                      <h3 className="text-xl font-bold mt-6">What You'll Learn</h3>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>
                          Practical skills in{" "}
                          {id % 3 === 0
                            ? "problem-solving and teamwork"
                            : id % 3 === 1
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
                          <h3 className="text-lg font-semibold">10:00 AM - Registration & Welcome</h3>
                          <p className="text-sm text-muted-foreground">
                            Check-in, get your badge, and enjoy some refreshments
                          </p>
                        </div>
                        <div className="relative pl-6 border-l border-muted">
                          <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
                          <h3 className="text-lg font-semibold">10:30 AM - Opening Keynote</h3>
                          <p className="text-sm text-muted-foreground">Introduction to the event and keynote speech</p>
                        </div>
                        <div className="relative pl-6 border-l border-muted">
                          <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
                          <h3 className="text-lg font-semibold">
                            11:30 AM - {id % 3 === 0 ? "Team Formation" : "Workshop Session 1"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {id % 3 === 0 ? "Form teams and brainstorm ideas" : "First hands-on session"}
                          </p>
                        </div>
                        <div className="relative pl-6 border-l border-muted">
                          <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
                          <h3 className="text-lg font-semibold">1:00 PM - Lunch Break</h3>
                          <p className="text-sm text-muted-foreground">Networking lunch provided for all attendees</p>
                        </div>
                        <div className="relative pl-6 border-l border-muted">
                          <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
                          <h3 className="text-lg font-semibold">
                            2:00 PM -{" "}
                            {id % 3 === 0 ? "Hacking Begins" : id % 3 === 1 ? "Workshop Session 2" : "Panel Discussion"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {id % 3 === 0
                              ? "Start working on your projects"
                              : id % 3 === 1
                                ? "Second hands-on session"
                                : "Industry experts discuss current trends"}
                          </p>
                        </div>
                        <div className="relative pl-6 border-l border-muted">
                          <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
                          <h3 className="text-lg font-semibold">
                            4:00 PM - {id % 3 === 0 ? "Mentoring Sessions" : "Q&A Session"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {id % 3 === 0
                              ? "Get help from industry mentors"
                              : "Ask questions and get answers from experts"}
                          </p>
                        </div>
                        <div className="relative pl-6">
                          <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
                          <h3 className="text-lg font-semibold">5:30 PM - Closing Remarks & Networking</h3>
                          <p className="text-sm text-muted-foreground">Wrap-up and informal networking</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="speakers" className="pt-6">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold">Speakers & Presenters</h2>
                      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((i) => (
                          <Card key={i}>
                            <CardHeader className="pb-2">
                              <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage src={`/placeholder.svg?height=48&width=48&text=${i}`} />
                                  <AvatarFallback>SP</AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-lg">{`Speaker ${i}`}</CardTitle>
                                  <CardDescription>
                                    {i === 1
                                      ? "CTO at TechCorp"
                                      : i === 2
                                        ? "Professor at MIT"
                                        : "Lead Developer at StartupX"}
                                  </CardDescription>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground">
                                {i === 1
                                  ? "Expert in cloud computing and distributed systems with over 10 years of industry experience."
                                  : i === 2
                                    ? "Researcher in artificial intelligence and machine learning, focusing on natural language processing and computer vision applications."
                                    : "Full-stack developer specializing in web technologies and mobile app development with a passion for teaching."}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
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
                        <p className="text-sm text-muted-foreground">{eventDate}</p>
                        <p className="text-sm text-muted-foreground">{eventTime}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">Location</h3>
                        <p className="text-sm text-muted-foreground">{eventLocation}</p>
                        <p className="text-sm text-muted-foreground">Room 302, Computer Science Building</p>
                        <Button variant="link" size="sm" className="h-auto p-0 text-sm">
                          View Map
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">Organizer</h3>
                        <p className="text-sm text-muted-foreground">
                          {id % 3 === 0
                            ? "Tech Innovation Club"
                            : id % 3 === 1
                              ? "Web Development Society"
                              : "AI Research Group"}
                        </p>
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
                    {[1, 2, 3].map((i) => (
                      <Link href={`/events/${id + i}`} key={`similar-${i}`} className="flex gap-3 group">
                        <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={`/placeholder.svg?height=64&width=64&text=${id + i}`}
                            width={64}
                            height={64}
                            alt={`Event ${id + i}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium group-hover:text-primary line-clamp-1">
                            {(id + i) % 3 === 0
                              ? `Hack the Future ${id + i}`
                              : (id + i) % 3 === 1
                                ? `Web Dev Workshop ${id + i}`
                                : `AI Revolution Talk ${id + i}`}
                          </h4>
                          <p className="text-xs text-muted-foreground">{`${10 + id + i} Mar, 2024`}</p>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {(id + i) % 3 === 0 ? "Hackathon" : (id + i) % 3 === 1 ? "Workshop" : "Tech Talk"}
                          </Badge>
                        </div>
                      </Link>
                    ))}
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
