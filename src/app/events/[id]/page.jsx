'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { CalendarDays, MapPin, Users, ArrowLeft, Loader2, HeartHandshake, CheckCircle } from 'lucide-react';

export default function EventDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  
  const { data: session } = authClient.useSession();
  
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  
  // Notun State: Join korar por button update korar jonno
  const [hasJoined, setHasJoined] = useState(false);

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

      if (!res.ok) {
        throw new Error("You might have already joined or invalid request.");
      }

      toast.success("Successfully joined the initiative! 🎉");
      
      // ✅ Success hole button state change kora hocche
      setHasJoined(true); 
      
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setIsJoining(false);
    }
  };

  if (isLoading || !event) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-blue-600">
        <Loader2 className="h-10 w-10 animate-spin mb-4" />
        <p className="font-bold text-lg">Loading details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Hero Banner Section */}
      <div className="w-full h-[40vh] md:h-[50vh] relative bg-gray-900">
        <img 
          src={event.thumbnail} 
          alt={event.title} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-7xl mx-auto">
          <Link 
            href="/events" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium mb-6 transition-colors group bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm w-fit"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to All Events
          </Link>
          <div className="inline-flex items-center px-3 py-1 rounded-md text-sm font-bold bg-blue-600 text-white mb-4 shadow-sm">
            {event.type}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl">
            {event.title}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">About the Initiative</h3>
            <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
              {event.description}
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Event Details</h3>
              
              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <CalendarDays className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Date</p>
                    <p className="text-gray-900 font-bold">
                      {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <MapPin className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Location</p>
                    <p className="text-gray-900 font-bold">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <Users className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Organized By</p>
                    <p className="text-gray-900 font-bold">{event.creatorEmail.split('@')[0]}</p>
                    <p className="text-xs text-gray-400">{event.creatorEmail}</p>
                  </div>
                </div>
              </div>

              {/* Dynamic Button UI */}
              <button 
                onClick={handleJoinEvent}
                disabled={isJoining || hasJoined}
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-md disabled:opacity-50 ${
                  hasJoined ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {hasJoined ? (
                  <>Joined Successfully <CheckCircle size={22} /></>
                ) : isJoining ? (
                  "Joining..."
                ) : (
                  <>Join Event <HeartHandshake size={22} /></>
                )}
              </button>

              {/* Join korar por ekta chotto link dekhabe */}
              {hasJoined && (
                <div className="text-center mt-4">
                  <Link href="/joined-events" className="text-sm font-bold text-blue-600 hover:text-blue-700">
                    View my Joined Events &rarr;
                  </Link>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}