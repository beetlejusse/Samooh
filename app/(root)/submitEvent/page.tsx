"use client"
  
import { Calendar, Upload, ArrowRight, Check, MapPin, Clock, User, Mail, Phone } from "lucide-react"
import { useState, FormEvent, ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react";




// Define types for our form data to fix the "implicitly has an 'any' type" errors
interface EventFormData {
  // Event Details
  title: string;
  eventType: string;
  description: string;
  format: 'in-person' | 'virtual' | 'hybrid';
  imageUrl: string;
  tags: string[];
  
  // Location & Schedule
  venue: {
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
  capacity: string;
  
  // Prizes and Eligibility
  prizes: Array<{position: string; amount: string}>;
  eligibility: string;
  teamSize: string;
  
  // Organizer Information
  organizer: {
    name: string;
    email: string;
    phone: string;
    collegeName: string;
    website: string;
    socialMedia: {
      instagram: string;
      twitter: string;
    };
  };
  additionalInfo: string;
  
  // Status
  registrationStatus: 'open' | 'closed' | 'coming-soon';
  status: 'draft' | 'published' | 'cancelled';
}

export default function SubmitEventPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [eventData, setEventData] = useState<EventFormData>({
    // Event Details
    title: "",
    eventType: "",
    description: "",
    format: "in-person",
    imageUrl: "",
    tags: [],
    
    // Location & Schedule
    venue: {
      name: "",
      address: "",
      city: "",
      state: "",
      country: "",
      postalCode: ""
    },
    schedule: {
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      timezone: ""
    },
    capacity: "",
    
    // Prizes and Eligibility
    prizes: [],
    eligibility: "",
    teamSize: "",
    
    // Organizer Information
    organizer: {
      name: "",
      email: "",
      phone: "",
      collegeName: "",
      website: "",
      socialMedia: {
        instagram: "",
        twitter: ""
      }
    },
    additionalInfo: "",
    
    // Status
    registrationStatus: "open",
    status: "draft"
  });

  // Handle basic field changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle nested field changes - FIXED SPREAD OPERATOR ISSUE
  const handleNestedChange = (section: keyof EventFormData, field: string, value: string) => {
    setEventData(prev => {
      if (typeof prev[section] === 'object' && prev[section] !== null) {
        return {
          ...prev,
          [section]: {
            ...(prev[section] as object),
            [field]: value
          }
        };
      }
      return prev;
    });
  };

  // Handle deeply nested field changes - FIXED SPREAD OPERATOR ISSUE
  const handleDeeplyNestedChange = (section: keyof EventFormData, subsection: string, field: string, value: string) => {
    setEventData(prev => {
      if (typeof prev[section] === 'object' && prev[section] !== null) {
        const sectionObj = prev[section] as Record<string, any>;
        if (typeof sectionObj[subsection] === 'object' && sectionObj[subsection] !== null) {
          return {
            ...prev,
            [section]: {
              ...sectionObj,
              [subsection]: {
                ...sectionObj[subsection],
                [field]: value
              }
            }
          };
        }
      }
      return prev;
    });
  };

  // Handle checkbox changes for tags
  const handleTagChange = (tag: string, checked: boolean) => {
    setEventData(prev => {
      if (checked) {
        return { ...prev, tags: [...prev.tags, tag] };
      } else {
        return { ...prev, tags: prev.tags.filter(t => t !== tag) };
      }
    });
  };

  // Helper function to convert File to base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Handle image upload to ImgBB
  const uploadImageToImgBB = async (file: File): Promise<string | null> => {
    try {
      // Check if file exists and is valid
      if (!file || !(file instanceof File)) {
        throw new Error("Invalid file provided");
      }
      
      // Check if API key exists
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      if (!apiKey) {
        throw new Error("ImgBB API key is missing");
      }
      
      // Convert file to base64 string
      setUploadProgress(20);
      const base64Image = await convertFileToBase64(file);
      if (!base64Image) {
        throw new Error("Failed to convert image to base64");
      }
      
      setUploadProgress(40);
      
      // Create form data with the base64 image
      const formData = new FormData();
      formData.append('image', base64Image.split(',')[1]); // Remove the data:image prefix
      
      setUploadProgress(60);
      
      // Make the request with proper error handling
      const response = await fetch(`https://api.imgbb.com/1/upload?expiration=600&key=${apiKey}`, {
        method: 'POST',
        body: formData
      });
      
      setUploadProgress(80);
      
      // Check for HTTP errors
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`ImgBB API error (${response.status}): ${errorText}`);
      }
      
      // Parse response
      const data = await response.json();
      
      setUploadProgress(100);
      
      // Check for API success
      if (data.success) {
        // Return the display URL specifically
        return data.data.display_url || data.data.url;
      } else {
        throw new Error(data.error?.message || "Image upload failed");
      }
    } catch (error) {
      console.error('Error uploading image to ImgBB:', error);
      return null;
    } finally {
      // Reset progress after a short delay
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  // Handle image file selection
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2MB limit. Please choose a smaller image.");
        return;
      }
      
      setImageFile(file);
      
      // Create a preview URL for immediate display
      const previewUrl = URL.createObjectURL(file);
      setEventData(prev => ({ ...prev, imageUrl: previewUrl }));
    }
  };

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

  const handleSaveDraft = async () => {
    setEventData(prev => ({ ...prev, status: "draft" }));
    await handleSubmit();
  };

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    
    setIsSubmitting(true);
    
    try {
      // Check if user is authenticated
      if (!session?.user?.id) {
        alert("You must be logged in to submit an event");
        router.push('/sign-in');
        return;
      }
  
      // Upload image to ImgBB if a file was selected
      let finalImageUrl = eventData.imageUrl;
      if (imageFile) {
        const uploadedUrl = await uploadImageToImgBB(imageFile);
        if (uploadedUrl) {
          finalImageUrl = uploadedUrl;
        } else {
          throw new Error("Failed to upload image. Please try again.");
        }
      }
      
      // Prepare the final event data with the image URL
      const finalEventData = {
        ...eventData,
        imageUrl: finalImageUrl,
        // Convert string dates to Date objects for MongoDB
        schedule: {
          ...eventData.schedule,
          startDate: new Date(eventData.schedule.startDate),
          endDate: new Date(eventData.schedule.endDate)
        },
        // Add the user ID from the session
        createdBy: session.user.id
      };
      
      // Send the data to your API endpoint
      const response = await fetch('/api/eventCreation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalEventData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API error: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Redirect to the event page or show success message
      alert("Event submitted successfully!");
      router.push(`/events`);
      
    } catch (error) {
      console.error('Error submitting event:', error);
      alert(`Failed to submit event: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
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
            
            {/* Progress Steps */}
            <div className="mb-8">
              {/* Step 1 */}
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
              
              {/* Step 2 */}
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
              
              {/* Step 3 */}
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
            
            {/* Step 1: Event Details */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                  <CardDescription>Provide the basic information about your tech event.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title</Label>
                    <Input 
                      id="title" 
                      name="title"
                      value={eventData.title}
                      onChange={handleChange}
                      placeholder="e.g., Web Development Workshop" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="eventType">Event Type</Label>
                    <Select 
                      value={eventData.eventType} 
                      onValueChange={(value) => setEventData({...eventData, eventType: value})}
                    >
                      <SelectTrigger id="eventType" className="bg-white">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
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
                    <Label htmlFor="description">Event Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={eventData.description}
                      onChange={handleChange}
                      placeholder="Describe your event, its purpose, and what attendees can expect..."
                      className="min-h-32"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Event Format</Label>
                    <RadioGroup 
                      value={eventData.format} 
                      onValueChange={(value: 'in-person' | 'virtual' | 'hybrid') => setEventData({...eventData, format: value})}
                      className="flex flex-col space-y-1"
                    >
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
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/40 hover:bg-muted relative"
                      >
                        {eventData.imageUrl ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 rounded-lg">
                            {uploadProgress > 0 ? (
                              <>
                                <div className="w-16 h-16 mb-2 relative">
                                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                                    <circle 
                                      cx="50" cy="50" r="45" 
                                      fill="none" 
                                      stroke="#e6e6e6" 
                                      strokeWidth="10" 
                                    />
                                    <circle 
                                      cx="50" cy="50" r="45" 
                                      fill="none" 
                                      stroke="#10b981" 
                                      strokeWidth="10" 
                                      strokeDasharray="283" 
                                      strokeDashoffset={283 - (283 * uploadProgress / 100)} 
                                    />
                                  </svg>
                                  <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                                    {uploadProgress}%
                                  </div>
                                </div>
                                <p className="text-sm font-medium text-gray-600">Uploading image...</p>
                              </>
                            ) : (
                              <>
                                <Check className="w-8 h-8 mb-2 text-green-500" />
                                <p className="text-sm font-medium text-green-600">Image selected</p>
                                <p className="text-xs text-muted-foreground mt-1">Click to change</p>
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
                          </div>
                        )}
                        <input 
                          id="event-image" 
                          type="file" 
                          className="hidden" 
                          onChange={handleImageUpload}
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="tag-programming" 
                          checked={eventData.tags.includes("programming")}
                          onCheckedChange={(checked) => handleTagChange("programming", checked as boolean)}
                        />
                        <label
                          htmlFor="tag-programming"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Programming
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="tag-design" 
                          checked={eventData.tags.includes("design")}
                          onCheckedChange={(checked) => handleTagChange("design", checked as boolean)}
                        />
                        <label
                          htmlFor="tag-design"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Design
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="tag-ai" 
                          checked={eventData.tags.includes("ai-ml")}
                          onCheckedChange={(checked) => handleTagChange("ai-ml", checked as boolean)}
                        />
                        <label
                          htmlFor="tag-ai"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          AI/ML
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="tag-web" 
                          checked={eventData.tags.includes("web-dev")}
                          onCheckedChange={(checked) => handleTagChange("web-dev", checked as boolean)}
                        />
                        <label
                          htmlFor="tag-web"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Web Dev
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="tag-mobile" 
                          checked={eventData.tags.includes("mobile-dev")}
                          onCheckedChange={(checked) => handleTagChange("mobile-dev", checked as boolean)}
                        />
                        <label
                          htmlFor="tag-mobile"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Mobile Dev
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="tag-blockchain" 
                          checked={eventData.tags.includes("blockchain")}
                          onCheckedChange={(checked) => handleTagChange("blockchain", checked as boolean)}
                        />
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
                  <Button 
                    variant="outline"
                    onClick={handleSaveDraft}
                    disabled={isSubmitting}
                  >
                    Save Draft
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white font-medium"
                    onClick={handleNextStep}
                  >
                    Next Step
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 2: Location & Schedule */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Location & Schedule</CardTitle>
                  <CardDescription>Where and when your event will take place.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="venue-name">Venue Name</Label>
                    <Input 
                      id="venue-name" 
                      value={eventData.venue.name}
                      onChange={(e) => handleNestedChange('venue', 'name', e.target.value)}
                      placeholder="e.g., College Auditorium" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={eventData.venue.address}
                      onChange={(e) => handleNestedChange('venue', 'address', e.target.value)}
                      placeholder="Full address of the venue"
                      className="min-h-20"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        value={eventData.venue.city}
                        onChange={(e) => handleNestedChange('venue', 'city', e.target.value)}
                        placeholder="City" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input 
                        id="state" 
                        value={eventData.venue.state}
                        onChange={(e) => handleNestedChange('venue', 'state', e.target.value)}
                        placeholder="State/Province" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select 
                        value={eventData.venue.country}
                        onValueChange={(value) => handleNestedChange('venue', 'country', value)}
                      >
                        <SelectTrigger id="country" className="bg-white">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="India">India</SelectItem>
                          <SelectItem value="United States">United States</SelectItem>
                          <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="Australia">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postal-code">Postal Code</Label>
                      <Input 
                        id="postal-code" 
                        value={eventData.venue.postalCode}
                        onChange={(e) => handleNestedChange('venue', 'postalCode', e.target.value)}
                        placeholder="Postal/ZIP Code" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Event Dates</Label>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="start-date">Start Date</Label>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="start-date" 
                            type="date"
                            value={eventData.schedule.startDate}
                            onChange={(e) => handleNestedChange('schedule', 'startDate', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end-date">End Date</Label>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="end-date" 
                            type="date"
                            value={eventData.schedule.endDate}
                            onChange={(e) => handleNestedChange('schedule', 'endDate', e.target.value)}
                          />
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
                          <Input 
                            id="start-time" 
                            type="time"
                            value={eventData.schedule.startTime}
                            onChange={(e) => handleNestedChange('schedule', 'startTime', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end-time">End Time</Label>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="end-time" 
                            type="time"
                            value={eventData.schedule.endTime}
                            onChange={(e) => handleNestedChange('schedule', 'endTime', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select 
                      value={eventData.schedule.timezone}
                      onValueChange={(value) => handleNestedChange('schedule', 'timezone', value)}
                    >
                      <SelectTrigger id="timezone" className="bg-white">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="IST">Indian Standard Time (IST)</SelectItem>
                        <SelectItem value="PST">Pacific Standard Time (PST)</SelectItem>
                        <SelectItem value="EST">Eastern Standard Time (EST)</SelectItem>
                        <SelectItem value="GMT">Greenwich Mean Time (GMT)</SelectItem>
                        <SelectItem value="CET">Central European Time (CET)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Maximum Capacity</Label>
                    <Input 
                      id="capacity" 
                      type="number" 
                      value={eventData.capacity}
                      onChange={handleChange}
                      name="capacity"
                      placeholder="e.g., 100" 
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>Previous Step</Button>
                  <Button 
                    className="bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white font-medium"
                    onClick={handleNextStep}
                  >
                    Next Step
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 3: Organizer Information */}
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
                      <Input 
                        id="organizer-name" 
                        value={eventData.organizer.name}
                        onChange={(e) => handleNestedChange('organizer', 'name', e.target.value)}
                        placeholder="Name of the organizing committee or club" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="organizer-email">Contact Email</Label>
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="organizer-email" 
                        type="email" 
                        value={eventData.organizer.email}
                        onChange={(e) => handleNestedChange('organizer', 'email', e.target.value)}
                        placeholder="contact@example.com" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="organizer-phone">Contact Phone</Label>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="organizer-phone" 
                        value={eventData.organizer.phone}
                        onChange={(e) => handleNestedChange('organizer', 'phone', e.target.value)}
                        placeholder="+91 98765 43210" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="college-name">College/University Name</Label>
                    <Input 
                      id="college-name" 
                      value={eventData.organizer.collegeName}
                      onChange={(e) => handleNestedChange('organizer', 'collegeName', e.target.value)}
                      placeholder="Name of your institution" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Event Website (Optional)</Label>
                    <Input 
                      id="website" 
                      value={eventData.organizer.website}
                      onChange={(e) => handleNestedChange('organizer', 'website', e.target.value)}
                      placeholder="https://yourevent.com" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Social Media Links (Optional)</Label>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="instagram">Instagram</Label>
                        <Input 
                          id="instagram" 
                          value={eventData.organizer.socialMedia.instagram}
                          onChange={(e) => handleDeeplyNestedChange('organizer', 'socialMedia', 'instagram', e.target.value)}
                          placeholder="@yourevent" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twitter">Twitter/X</Label>
                        <Input 
                          id="twitter" 
                          value={eventData.organizer.socialMedia.twitter}
                          onChange={(e) => handleDeeplyNestedChange('organizer', 'socialMedia', 'twitter', e.target.value)}
                          placeholder="@yourevent" 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="additional-info">Additional Information</Label>
                    <Textarea
                      id="additional-info"
                      name="additionalInfo"
                      value={eventData.additionalInfo}
                      onChange={handleChange}
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
                  <Button 
                    className="bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white font-medium"
                    onClick={() => handleSubmit()}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Event"}
                    <ArrowRight className="h-4 w-4 ml-1" />
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
