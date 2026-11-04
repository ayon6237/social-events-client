'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

import {
  CalendarDays,
  MapPin,
  Users,
  ArrowLeft,
  Loader2,
  HeartHandshake,
  CheckCircle,
  ShieldAlert,
  Sparkles,
  Clock,
  Share2
} from 'lucide-react';

// Main Event Details Component
function EventDetailsContent() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const { data: session, isPending: sessionPending } =
    authClient.useSession();

  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  // 1. Fetch Event Details
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        if (id.startsWith('dummy')) {
          toast.error("This is a preview dummy event!");
          router.push('/events');
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/events/${id}`
        );

        if (!res.ok) {
          throw new Error("Event not found");
        }

        const data = await res.json();
        setEvent(data);

      } catch (error) {
        console.error("Error fetching event:", error);
        toast.error("Could not load event details.");
        router.push('/events');

      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id, router]);

  // 2. Check Whether User Already Joined
  useEffect(() => {
    const checkIfJoined = async () => {
      if (session?.user?.email && event?._id) {
        try {
          const token = localStorage.getItem('access_token');

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/joined-events/${session.user.email}`,
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          );

          if (res.ok) {
            const joinedList = await res.json();

            const alreadyJoined = joinedList.some(
              item =>
                item.eventId?._id === event._id ||
                item.eventId === event._id
            );

            if (alreadyJoined) {
              setHasJoined(true);
            }
          }

        } catch (err) {
          console.error("Error checking joined status:", err);
        }
      }
    };

    if (event) {
      checkIfJoined();
    }
  }, [session, event]);

  // 3. Handle Join Event
  const handleJoinEvent = async () => {
    if (!session?.user) {
      toast.error("Please login to join this event!");
      router.push('/login');
      return;
    }

    if (session.user.email === event.creatorEmail) {
      toast.error("You are the organizer of this event!");
      return;
    }

    if (hasJoined) {
      toast.error("You have already joined this event!");
      return;
    }

    setIsJoining(true);

    try {
      const token = localStorage.getItem('access_token');

      const joinData = {
        eventId: event._id,
        userEmail: session.user.email
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/join-event`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(joinData)
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to join event");
      }

      toast.success("Successfully joined the initiative! 🎉");
      setHasJoined(true);

    } catch (error) {
      toast.error(error.message || "Something went wrong!");

    } finally {
      setIsJoining(false);
    }
  };

  // 4. Loading State
  if (isLoading || sessionPending || !event) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 text-blue-600 dark:text-blue-400">
        <Loader2 className="h-12 w-12 animate-spin mb-4" />
        <p className="font-bold text-lg">
          Preparing event details...
        </p>
      </div>
    );
  }

  const isOrganizer =
    session?.user?.email === event.creatorEmail;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 py-12 transition-colors">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Navigation & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to All Initiatives
          </Link>
          
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success("Event link copied to clipboard!");
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-semibold shadow-sm transition-colors"
          >
            <Share2 size={16} /> Share Event
          </button>
        </div>

        {/* Main Content Container */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left Column: Image & Details */}
            <div className="lg:col-span-8 flex flex-col border-r border-gray-200 dark:border-gray-800">
              
              {/* Event Image */}
              <div className="relative h-[300px] sm:h-[400px] w-full bg-gray-100 dark:bg-gray-800">
                <img
                  src={event.thumbnail}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/90 dark:bg-gray-900/90 text-blue-700 dark:text-blue-400 shadow-sm backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
                  <Sparkles size={14} />
                  {event.type}
                </div>
              </div>

              {/* Event Title & Description */}
              <div className="p-8 sm:p-10 flex-grow">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-6">
                  {event.title}
                </h1>
                
                <div className="prose dark:prose-invert max-w-none">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                    About this initiative
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-base sm:text-lg">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Sidebar info & Actions */}
            <div className="lg:col-span-4 bg-gray-50/50 dark:bg-gray-900/50 p-8 sm:p-10 flex flex-col justify-between">
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-5">
                    Event Details
                  </h3>
                  
                  <div className="space-y-5">
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-900">
                        <CalendarDays size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Date</p>
                        <p className="text-gray-900 dark:text-gray-100 font-bold mt-0.5">
                          {new Date(event.date).toLocaleDateString('en-GB', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-200 dark:border-purple-900">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Location</p>
                        <p className="text-gray-900 dark:text-gray-100 font-bold mt-0.5 leading-snug">
                          {event.location}
                        </p>
                      </div>
                    </div>
                    
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                  <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-5">
                    Organizer
                  </h3>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center shrink-0 border-2 border-white dark:border-gray-900 shadow-sm">
                      <Users size={22} className="text-gray-500 dark:text-gray-400" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-gray-900 dark:text-gray-100 font-bold truncate">
                        {event.creatorEmail.split('@')[0]}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {event.creatorEmail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
                {isOrganizer ? (
                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-amber-800 dark:text-amber-300 text-center font-bold text-sm flex flex-col items-center justify-center gap-2">
                    <ShieldAlert size={24} className="opacity-80" />
                    You are organizing this event
                  </div>
                ) : (
                  <>
                    <button
                      onClick={handleJoinEvent}
                      disabled={isJoining || hasJoined}
                      className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-md ${
                        hasJoined
                          ? 'bg-green-600 text-white shadow-green-100 dark:shadow-none cursor-default opacity-100'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 dark:shadow-none hover:-translate-y-0.5'
                      }`}
                    >
                      {hasJoined ? (
                        <>
                          <CheckCircle size={22} />
                          Joined Successfully
                        </>
                      ) : isJoining ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <>
                          <HeartHandshake size={22} />
                          Volunteer Now
                        </>
                      )}
                    </button>

                    {hasJoined && (
                      <div className="text-center mt-4">
                        <Link
                          href="/joined-events"
                          className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-1 transition-colors"
                        >
                          View your schedule &rarr;
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

// Default Export with Suspense Boundary
export default function EventDetails() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 text-blue-600 dark:text-blue-400">
          <Loader2 className="h-12 w-12 animate-spin mb-4" />
          <p className="font-bold text-lg">
            Loading event details...
          </p>
        </div>
      }
    >
      <EventDetailsContent />
    </Suspense>
  );
}