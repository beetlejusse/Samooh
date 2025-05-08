"use client"

import React from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const FAQPage = () => {
  return (
    <div className="flex min-h-screen flex-col pt-20">
      <main className="flex-1">
        <section className="container py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 backdrop-blur-sm border border-pink-100 text-sm text-pink-600 font-medium shadow-sm w-fit mx-auto mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Get answers to your questions</span>
              </div>
              
              <h1 className="text-3xl font-bold md:text-4xl bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h1>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions about Samooh, our college events platform, and how to make the most of it.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left font-medium">What is Samooh?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Samooh is a platform dedicated to connecting college students with events happening in and around their campuses. We help students discover hackathons, workshops, tech talks, networking events, and more, while also providing event organizers with tools to reach a wider audience.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left font-medium">How do I find events on Samooh?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  You can browse events on our homepage or visit the Events page for a complete listing. Use the search bar to find specific events or filter by category, date, or location. You can also follow specific colleges or event organizers to stay updated on their upcoming events.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left font-medium">Can I submit my own event?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Yes! If you're organizing an event at your college, you can submit it through our platform. Click on "Submit Your Event" in the navigation menu, fill out the event details form, and submit it for review. Once approved, your event will be visible to all Samooh users.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left font-medium">Is Samooh free to use?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Yes, Samooh is completely free for students to discover and register for events. Event organizers can also list their events for free. We may introduce premium features in the future, but our core services will always remain free.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left font-medium">How do I register for an event?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  When you find an event you're interested in, click on it to view the details. On the event page, you'll find a "Register Now" button. Clicking this will either register you directly through Samooh or redirect you to the event's external registration page, depending on the organizer's preference.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left font-medium">What types of events can I find on Samooh?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Samooh features a wide range of college events including hackathons, workshops, tech talks, networking events, conferences, and more. We focus primarily on academic, professional development, and skill-building events, but also include social and cultural events relevant to college students.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left font-medium">How do I get notifications about upcoming events?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  After creating an account, you can set your notification preferences in your profile settings. You can choose to receive notifications about new events matching your interests, reminders for events you've registered for, and updates from event organizers you follow.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left font-medium">Can I connect with other attendees before an event?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Yes, for some events, organizers enable a community feature where registered attendees can interact before, during, and after the event. This is particularly useful for hackathons and networking events where team formation and connection building are important.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-9">
                <AccordionTrigger className="text-left font-medium">How can I become an event organizer?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Any registered user can submit events. To become a verified organizer with additional features, visit your profile settings and select "Become an Organizer." You'll need to provide some additional information about your organization or college club.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-10">
                <AccordionTrigger className="text-left font-medium">I have more questions. How can I contact support?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  For additional questions or support, please email us at support@samooh.com or use the contact form on our Support page. We typically respond within 24 hours on business days.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="mt-12 text-center">
              <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
              <p className="text-gray-600 mb-6">
                Our support team is ready to help you with any other questions you might have.
              </p>
              <Link 
                href="/support" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white font-medium hover:shadow-lg hover:shadow-pink-500/20 transition-all"
              >
                Contact Support
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default FAQPage
