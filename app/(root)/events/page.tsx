"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, Calendar, MapPin, Filter, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

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
  status: 'draft' | 'published' | 'cancelled';
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    eventType: [] as string[],
    date: [] as string[],
    location: "all",
    status: "all" // Added status filter with default "all"
  });

  useEffect(() => {
    fetchEvents();
  }, [currentPage, sortBy, filters]);

  // Add debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEvents();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      // Build query parameters
      const queryParams = new URLSearchParams();
      queryParams.append("page", currentPage.toString());
      queryParams.append("sortBy", sortBy);
      
      if (searchQuery.trim()) {
        queryParams.append("search", searchQuery);
      }
      
      if (filters.eventType.length > 0) {
        queryParams.append("eventType", filters.eventType.join(","));
      }
      
      if (filters.date.length > 0) {
        queryParams.append("dateFilter", filters.date[0]);
      }
      
      if (filters.location !== "all") {
        queryParams.append("location", filters.location);
      }
      
      // Include status filter (important fix!)
      if (filters.status !== "all") {
        queryParams.append("status", filters.status);
      }

      console.log("Fetching events with params:", queryParams.toString());
      const response = await fetch(`/api/fetchEvents?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setEvents(data.events);
        setTotalPages(data.pagination.pages);
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
    fetchEvents();
  };

  const handleCheckboxChange = (category: 'eventType' | 'date', value: string) => {
    setFilters(prev => {
      let updatedCategory;
      
      if (category === 'date') {
        // For date, only allow one selection at a time
        updatedCategory = prev[category].includes(value) ? [] : [value];
      } else {
        // For event types, allow multiple selections
        updatedCategory = prev[category].includes(value)
          ? prev[category].filter(item => item !== value)
          : [...prev[category], value];
      }
      
      return {
        ...prev,
        [category]: updatedCategory
      };
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  // Fixed function to return valid badge variants
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
                      <Checkbox 
                        id="hackathon" 
                        checked={filters.eventType.includes('hackathon')}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('eventType', 'hackathon')
                        }
                      />
                      <label
                        htmlFor="hackathon"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Hackathon
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="workshop" 
                        checked={filters.eventType.includes('workshop')}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('eventType', 'workshop')
                        }
                      />
                      <label
                        htmlFor="workshop"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Workshop
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="tech-talk" 
                        checked={filters.eventType.includes('tech-talk')}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('eventType', 'tech-talk')
                        }
                      />
                      <label
                        htmlFor="tech-talk"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Tech Talk
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="networking" 
                        checked={filters.eventType.includes('networking')}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('eventType', 'networking')
                        }
                      />
                      <label
                        htmlFor="networking"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Networking
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="conference" 
                        checked={filters.eventType.includes('conference')}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('eventType', 'conference')
                        }
                      />
                      <label
                        htmlFor="conference"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Conference
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Added status filter section */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Status</h4>
                  <Select 
                    value={filters.status} 
                    onValueChange={(value) => setFilters({...filters, status: value})}
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Date</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="today" 
                        checked={filters.date.includes('today')}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('date', 'today')
                        }
                      />
                      <label
                        htmlFor="today"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Today
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="this-week" 
                        checked={filters.date.includes('this-week')}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('date', 'this-week')
                        }
                      />
                      <label
                        htmlFor="this-week"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        This Week
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="this-month" 
                        checked={filters.date.includes('this-month')}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('date', 'this-month')
                        }
                      />
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
                  <Select 
                    value={filters.location} 
                    onValueChange={(value) => setFilters({...filters, location: value})}
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="New Delhi">New Delhi</SelectItem>
                      <SelectItem value="Mumbai">Mumbai</SelectItem>
                      <SelectItem value="Bangalore">Bangalore</SelectItem>
                      <SelectItem value="Hyderabad">Hyderabad</SelectItem>
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
                {events.slice(0, 3).map((event, i) => (
                  <Link href={`/events/${event._id}`} key={`rec-${event._id}`} className="block group">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={event.imageUrl || `/placeholder.svg?height=64&width=64&text=${i}`}
                          width={64}
                          height={64}
                          alt={event.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium group-hover:text-primary line-clamp-1">
                          {event.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(event.schedule.startDate)}
                        </p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {event.eventType}
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
                  <Input 
                    type="search" 
                    placeholder="Search events..." 
                    className="w-full rounded-md pl-8 md:w-[300px]" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-9 gap-1 md:hidden">
                    <Filter className="h-3.5 w-3.5" />
                    <span>Filters</span>
                  </Button>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="h-9 w-[130px] bg-white">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="date-asc">Date (Ascending)</SelectItem>
                      <SelectItem value="date-desc">Date (Descending)</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="recent">Recently Added</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
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
                      <Card className="overflow-hidden transition-all hover:shadow-md">
                        <div className="aspect-video w-full overflow-hidden">
                          <Image
                            src={event.imageUrl || `/placeholder.svg?height=300&width=500&text=${encodeURIComponent(event.title)}`}
                            width={500}
                            height={300}
                            alt={event.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <CardHeader className="p-4">
                          <div className="flex items-center gap-2">
                            <Badge variant={getBadgeVariant(event.eventType)}>
                              {event.eventType}
                            </Badge>
                            <Badge variant="outline" className="ml-auto">
                              {formatDate(event.schedule.startDate)}
                            </Badge>
                          </div>
                          <CardTitle className="line-clamp-1 text-xl">
                            {event.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            {event.description}
                          </CardDescription>
                        </CardHeader>
                        <CardFooter className="flex items-center p-4 pt-0 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{event.venue?.name || event.venue?.city || "Online"}</span>
                          </div>
                          <div className="ml-auto flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{formatDate(event.schedule.startDate)}</span>
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <h3 className="text-xl font-medium">No events found</h3>
                    <p className="text-muted-foreground mt-2">Try adjusting your filters or search query</p>
                  </div>
                )}
              </div>
            )}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  >
                    <ChevronDown className="h-4 w-4 rotate-90" />
                  </Button>
                  {Array.from({ length: Math.min(totalPages, 3) }).map((_, i) => (
                    <Button 
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "outline"} 
                      size="sm" 
                      className="h-8 w-8"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button 
                    variant="outline" 
                    size="icon"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  >
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
