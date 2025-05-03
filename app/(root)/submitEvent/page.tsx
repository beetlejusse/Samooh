  "use client"
  
  import { Calendar, Upload, ArrowRight, Check, MapPin, Clock, User, Mail, Phone } from "lucide-react"
  import { useState } from "react"

  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Textarea } from "@/components/ui/textarea"
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
  import { Label } from "@/components/ui/label"
  import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
  import { Checkbox } from "@/components/ui/checkbox"

  export default function SubmitEventPage() {
    const [currentStep, setCurrentStep] = useState(1);

    const handleNextStep = () => {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      }
    };

    const handlePreviousStep = () => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
      }
    };

    return (
      <div className="flex min-h-screen flex-col pt-20">
        <main className="flex-1">
          <div className="container py-8">
            <div className="mx-auto max-w-3xl">
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold md:text-4xl">Submit Your Tech Event</h1>
                <p className="mt-2 text-muted-foreground">
                  Share your college tech event with the community and reach more attendees.
                </p>
              </div>
              <div className="mb-8">
                <div className="relative">
                  <div className="absolute left-0 top-2 flex h-full items-center justify-center">
                    <div className="flex h-full w-10 items-center justify-center">
                      <div className={`flex h-6 w-6 items-center justify-center rounded-full ${currentStep === 1 ? "bg-primary text-primary-foreground" : "bg-primary text-primary-foreground"}`}>
                        {currentStep > 1 ? <Check className="h-3 w-3" /> : "1"}
                      </div>
                    </div>
                  </div>
                  <div className="ml-10 flex items-center border-l pb-8 pl-8 pt-2">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold">Event Details</h2>
                      <p className="text-sm text-muted-foreground">Basic information about your event</p>
                    </div>
                    {currentStep === 1 && <div className="ml-auto text-sm font-medium text-primary">Current Step</div>}
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute left-0 top-2 flex h-full items-center justify-center">
                    <div className="flex h-full w-10 items-center justify-center">
                      <div className={`flex h-6 w-6 items-center justify-center rounded-full ${currentStep === 2 ? "bg-primary text-primary-foreground" : "border border-muted-foreground bg-background text-muted-foreground"}`}>
                        {currentStep > 2 ? <Check className="h-3 w-3" /> : "2"}
                      </div>
                    </div>
                  </div>
                  <div className="ml-10 flex items-center border-l pb-8 pl-8 pt-2">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold">Location & Schedule</h2>
                      <p className="text-sm text-muted-foreground">Where and when your event will take place</p>
                    </div>
                    {currentStep === 2 && <div className="ml-auto text-sm font-medium text-primary">Current Step</div>}
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute left-0 top-2 flex h-full items-center justify-center">
                    <div className="flex h-full w-10 items-center justify-center">
                      <div className={`flex h-6 w-6 items-center justify-center rounded-full ${currentStep === 3 ? "bg-primary text-primary-foreground" : "border border-muted-foreground bg-background text-muted-foreground"}`}>
                        3
                      </div>
                    </div>
                  </div>
                  <div className="ml-10 flex items-center pl-8 pt-2">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold">Organizer Information</h2>
                      <p className="text-sm text-muted-foreground">Contact details and additional information</p>
                    </div>
                    {currentStep === 3 && <div className="ml-auto text-sm font-medium text-primary">Current Step</div>}
                  </div>
                </div>
              </div>
              
              {currentStep === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Event Details</CardTitle>
                    <CardDescription>Provide the basic information about your tech event.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="event-title">Event Title</Label>
                      <Input id="event-title" placeholder="e.g., Web Development Workshop" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-type">Event Type</Label>
                      <Select>
                        <SelectTrigger id="event-type">
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hackathon">Hackathon</SelectItem>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="tech-talk">Tech Talk</SelectItem>
                          <SelectItem value="networking">Networking Event</SelectItem>
                          <SelectItem value="conference">Conference</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-description">Event Description</Label>
                      <Textarea
                        id="event-description"
                        placeholder="Describe your event, its purpose, and what attendees can expect..."
                        className="min-h-32"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Event Format</Label>
                      <RadioGroup defaultValue="in-person" className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="in-person" id="in-person" />
                          <Label htmlFor="in-person" className="font-normal">
                            In-person
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="virtual" id="virtual" />
                          <Label htmlFor="virtual" className="font-normal">
                            Virtual
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="hybrid" id="hybrid" />
                          <Label htmlFor="hybrid" className="font-normal">
                            Hybrid
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label>Event Image</Label>
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="event-image"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/40 hover:bg-muted"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
                          </div>
                          <input id="event-image" type="file" className="hidden" />
                        </label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Tags</Label>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="tag-programming" />
                          <label
                            htmlFor="tag-programming"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Programming
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="tag-design" />
                          <label
                            htmlFor="tag-design"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Design
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="tag-ai" />
                          <label
                            htmlFor="tag-ai"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            AI/ML
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="tag-web" />
                          <label
                            htmlFor="tag-web"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Web Dev
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="tag-mobile" />
                          <label
                            htmlFor="tag-mobile"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Mobile Dev
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="tag-blockchain" />
                          <label
                            htmlFor="tag-blockchain"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Blockchain
                          </label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Save Draft</Button>
                    <Button className="gap-1" onClick={handleNextStep}>
                      Next Step
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {currentStep === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Location & Schedule</CardTitle>
                    <CardDescription>Where and when your event will take place.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="venue-name">Venue Name</Label>
                      <Input id="venue-name" placeholder="e.g., College Auditorium" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        placeholder="Full address of the venue"
                        className="min-h-20"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="City" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" placeholder="State/Province" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select>
                          <SelectTrigger id="country">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="india">India</SelectItem>
                            <SelectItem value="usa">United States</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="canada">Canada</SelectItem>
                            <SelectItem value="australia">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postal-code">Postal Code</Label>
                        <Input id="postal-code" placeholder="Postal/ZIP Code" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Event Dates</Label>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="start-date">Start Date</Label>
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input id="start-date" type="date" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="end-date">End Date</Label>
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input id="end-date" type="date" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Event Time</Label>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="start-time">Start Time</Label>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input id="start-time" type="time" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="end-time">End Time</Label>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input id="end-time" type="time" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select>
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ist">Indian Standard Time (IST)</SelectItem>
                          <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                          <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                          <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                          <SelectItem value="cet">Central European Time (CET)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Maximum Capacity</Label>
                      <Input id="capacity" type="number" placeholder="e.g., 100" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handlePreviousStep}>Previous Step</Button>
                    <Button className="gap-1" onClick={handleNextStep}>
                      Next Step
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {currentStep === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Organizer Information</CardTitle>
                    <CardDescription>Contact details and additional information about the event organizers.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="organizer-name">Organizer Name</Label>
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input id="organizer-name" placeholder="Name of the organizing committee or club" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organizer-email">Contact Email</Label>
                      <div className="flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input id="organizer-email" type="email" placeholder="contact@example.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organizer-phone">Contact Phone</Label>
                      <div className="flex items-center">
                        <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input id="organizer-phone" placeholder="+91 98765 43210" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="college-name">College/University Name</Label>
                      <Input id="college-name" placeholder="Name of your institution" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Event Website (Optional)</Label>
                      <Input id="website" placeholder="https://yourevent.com" />
                    </div>
                    <div className="space-y-2">
                      <Label>Social Media Links (Optional)</Label>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="instagram">Instagram</Label>
                          <Input id="instagram" placeholder="@yourevent" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="twitter">Twitter/X</Label>
                          <Input id="twitter" placeholder="@yourevent" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="additional-info">Additional Information</Label>
                      <Textarea
                        id="additional-info"
                        placeholder="Any other details you'd like to share about the organizers or event..."
                        className="min-h-20"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the terms and conditions and confirm that all provided information is accurate.
                      </label>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handlePreviousStep}>Previous Step</Button>
                    <Button className="gap-1">
                      Submit Event
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    )
  }
