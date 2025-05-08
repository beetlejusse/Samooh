"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight, Mail, Phone, MessageSquare, Clock, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FormData {
  name: string;
  email: string;
  topic: string;
  message: string;
}

const SupportPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    topic: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      topic: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    // In a real implementation, you would send this data to your backend
    // which would then forward it to utsav.jana.5@gmail.com
    setTimeout(() => {
      alert('Your support request has been submitted. We will get back to you soon!');
      setFormData({
        name: '',
        email: '',
        topic: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col pt-20">
      <main className="flex-1">
        <section className="container py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 backdrop-blur-sm border border-pink-100 text-sm text-pink-600 font-medium shadow-sm w-fit mx-auto mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                <span>We're here to help</span>
              </div>
              
              <h1 className="text-3xl font-bold md:text-4xl bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Contact Support
              </h1>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Have questions or need assistance? Our support team is ready to help you with any inquiries about Samooh.
              </p>
            </div>
            
            <div className="grid gap-10 md:grid-cols-2">
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-pink-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-sm text-gray-600">utsav.jana.5@gmail.com</p>
                        <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Phone</h3>
                        <p className="text-sm text-gray-600">+91 98765 43210</p>
                        <p className="text-sm text-gray-500">Monday to Friday, 9am - 5pm IST</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Live Chat</h3>
                        <p className="text-sm text-gray-600">Available on our website</p>
                        <p className="text-sm text-gray-500">Monday to Friday, 9am - 5pm IST</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Response Time</h3>
                        <p className="text-sm text-gray-600">We aim to respond to all inquiries within 24 hours</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
                  <div className="space-y-3">
                    <Link href="/faq" className="block p-3 rounded-lg hover:bg-pink-50 transition-colors">
                      <h3 className="font-medium text-pink-600">How do I submit an event?</h3>
                      <p className="text-sm text-gray-600">Learn how to create and publish your college event</p>
                    </Link>
                    
                    <Link href="/faq" className="block p-3 rounded-lg hover:bg-pink-50 transition-colors">
                      <h3 className="font-medium text-pink-600">How do I register for an event?</h3>
                      <p className="text-sm text-gray-600">Step-by-step guide to event registration</p>
                    </Link>
                    
                    <Link href="/faq" className="block p-3 rounded-lg hover:bg-pink-50 transition-colors">
                      <h3 className="font-medium text-pink-600">Can I update my event details?</h3>
                      <p className="text-sm text-gray-600">How to edit your event after publishing</p>
                    </Link>
                    
                    <div className="text-center mt-4">
                      <Link 
                        href="/faq" 
                        className="inline-flex items-center gap-1 text-sm font-medium text-pink-600 hover:text-pink-700"
                      >
                        View all FAQs
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-violet-500 rounded-xl blur-md opacity-20"></div>
                <div className="relative bg-white rounded-xl p-6 shadow-sm border border-white/50">
                  <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <Input 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                        Topic
                      </label>
                      <Select value={formData.topic} onValueChange={handleSelectChange}>
                        <SelectTrigger id="topic" className="bg-white">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="account">Account Issues</SelectItem>
                          <SelectItem value="event">Event Submission</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <Textarea 
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describe your issue or question in detail"
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-pink-500 to-violet-500 text-white hover:shadow-lg hover:shadow-pink-500/20 transition-all"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <h2 className="text-xl font-semibold mb-4">Our Support Team is Based in New Delhi, India</h2>
              <p className="text-gray-600 mb-6">
                We're located in New Delhi, the capital of India, and are dedicated to helping college students across the country connect through amazing events.
              </p>
              <div className="aspect-video max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192866!2d77.06889754725782!3d28.52758200617607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi%2C%20India!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default SupportPage
  