'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { CalendarDays, MapPin, Users, ArrowLeft, Loader2, HeartHandshake, CheckCircle, ShieldAlert, Sparkles } from 'lucide-react';

export default function EventDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  
  const { data: session, isPending: sessionPending } = authClient.useSession();
  
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  // ১. ইভেন্ট ডিটেইলস ফেচ করা
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        if (id.startsWith('dummy')) {
           toast.error("This is a preview dummy event!");
           router.push('/events');
           return;
        }

        const res = await fetch(`http://localhost:5000/events/${id}`);
        if (!res.ok) throw new Error("Event not found");
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        toast.error("Could not load event details.");
        router.push('/events');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchEventDetails();
  }, [id, router]);

  // ২. ইউজার অলরেডি এই ইভেন্টে জয়েন করেছে কিনা তা ডাটাবেস থেকে চেক করা
  useEffect(() => {
    const checkIfJoined = async () => {
      if (session?.user?.email && event?._id) {
        try {
          const token = localStorage.getItem('access_token');
          const res = await fetch(`http://localhost:5000/joined-events/${session.user.email}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const joinedList = await res.json();
            const alreadyJoined = joinedList.some(item => item.eventId?._id === event._id || item.eventId === event._id);
            if (alreadyJoined) {
              setHasJoined(true);
            }
          }
        } catch (err) {
          console.error("Error checking joined status", err);
        }
      }
    };
    if (event) checkIfJoined();
  }, [session, event]);

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

      const res = await fetch('http://localhost:5000/join-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(joinData)
      });

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

  if (isLoading || sessionPending || !event) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-blue-600 dark:bg-gray-950">
        <Loader2 className="h-10 w-10 animate-spin mb-4" />
        <p className="font-bold text-lg">Loading details...</p>
      </div>
    );
  }

  const isOrganizer = session?.user?.email === event.creatorEmail;

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 pb-20 transition-colors">
      
      {/* Hero Banner Section */}
      <div className="w-full h-[35vh] md:h-[45vh] relative bg-gray-900">
        <img 
          src={event.thumbnail} 
          alt={event.title} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 max-w-7xl mx-auto">
          <Link 
            href="/events" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium mb-4 transition-colors group bg-black/30 px-3.5 py-2 rounded-lg backdrop-blur-sm w-fit text-sm"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to All Events
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-blue-600 text-white mb-3 shadow-sm">
            <Sparkles size={14} /> {event.type}
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-snug max-w-4xl">
            {event.title}
          </h1>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: About Initiative */}
          <div className="lg:col-span-7 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-100 dark:border-gray-800 pb-3">About the Initiative</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-base">
              {event.description}
            </p>
          </div>

          {/* Right Side: Compact Card Container */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden w-full max-w-md">
              
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white">
                <h3 className="text-lg font-bold">Event Summary</h3>
                <p className="text-blue-100 text-xs mt-0.5">Review venue and schedule</p>
              </div>

              <div className="p-5 space-y-4">
                
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <CalendarDays size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 dark:text-gray-400 font-bold uppercase tracking-wider">Date</p>
                    <p className="text-gray-900 dark:text-gray-200 font-bold text-sm mt-0.5">
                      {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 dark:text-gray-400 font-bold uppercase tracking-wider">Location</p>
                    <p className="text-gray-900 dark:text-gray-200 font-bold text-sm mt-0.5">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Users size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 dark:text-gray-400 font-bold uppercase tracking-wider">Organized By</p>
                    <p className="text-gray-900 dark:text-gray-200 font-bold text-sm mt-0.5">{event.creatorEmail.split('@')[0]}</p>
                    <p className="text-[11px] text-gray-400">{event.creatorEmail}</p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  {isOrganizer ? (
                    <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-amber-800 dark:text-amber-300 text-center font-bold text-xs flex items-center justify-center gap-2">
                      <ShieldAlert size={16} /> You are the organizer of this event
                    </div>
                  ) : (
                    <>
                      <button 
                        onClick={handleJoinEvent}
                        disabled={isJoining || hasJoined}
                        className={`w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-base transition-all shadow-md ${
                          hasJoined 
                            ? 'bg-green-600 text-white shadow-green-100 dark:shadow-none cursor-default opacity-100' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-100 dark:shadow-none'
                        }`}
                      >
                        {hasJoined ? (
                          <>Joined Successfully <CheckCircle size={20} /></>
                        ) : isJoining ? (
                          "Processing..."
                        ) : (
                          <>Join as Volunteer <HeartHandshake size={20} /></>
                        )}
                      </button>

                      {hasJoined && (
                        <div className="text-center mt-3">
                          <Link href="/joined-events" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
                            View in Joined Events &rarr;
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
    </div>
  );
}