'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { Edit, Trash2, PlusCircle, CalendarDays, MapPin, Loader2, Settings, AlertTriangle, X, Type, FolderDot, ImageIcon, AlignLeft, Send } from 'lucide-react';

const CATEGORIES = ["Donation", "Cleanup", "Plantation", "Winter Relief", "Food Drive", "Health Camp", "Education"];

export default function ManageEvents() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [todayDate, setTodayDate] = useState('');
  
  // Modals State
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, eventId: null });
  const [editModal, setEditModal] = useState({ isOpen: false, eventId: null });
  
  // Edit Form State
  const [editFormData, setEditFormData] = useState({
    title: '', type: CATEGORIES[0], date: '', location: '', thumbnail: '', description: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setTodayDate(new Date().toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("Please login to manage your events!");
      router.push('/login');
      return;
    }
    if (session?.user?.email) {
      fetchMyEvents();
    }
  }, [session, isPending, router]);

  const fetchMyEvents = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`http://localhost:5000/my-events/${session.user.email}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      toast.error("Could not load your events.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- DELETE LOGIC ---
  const confirmDelete = (id) => setDeleteModal({ isOpen: true, eventId: id });
  
  const executeDelete = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`http://localhost:5000/events/${deleteModal.eventId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to delete event");

      toast.success("Event deleted successfully!");
      setEvents(events.filter(event => event._id !== deleteModal.eventId)); 
      setDeleteModal({ isOpen: false, eventId: null });
    } catch (error) {
      toast.error("Error deleting event!");
    }
  };

  // --- EDIT LOGIC ---
  const openEditModal = (event) => {
    setEditFormData({
      title: event.title,
      type: event.type,
      date: event.date.split('T')[0], // Extracting YYYY-MM-DD
      location: event.location,
      thumbnail: event.thumbnail,
      description: event.description
    });
    setEditModal({ isOpen: true, eventId: event._id });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (todayDate && editFormData.date < todayDate) {
        toast.error("Event date cannot be in the past!");
        return;
    }
    
    setIsUpdating(true);
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`http://localhost:5000/events/${editModal.eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(editFormData)
      });

      if (!res.ok) throw new Error("Failed to update event");

      const updatedEvent = await res.json();
      
      // Update local state to reflect changes instantly
      setEvents(events.map(ev => ev._id === editModal.eventId ? { ...ev, ...editFormData } : ev));
      
      toast.success("Event updated successfully!");
      setEditModal({ isOpen: false, eventId: null });
    } catch (error) {
      toast.error("Failed to update event!");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending || isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-blue-600">
        <Loader2 className="h-10 w-10 animate-spin mb-4" />
        <p className="font-bold">Loading your organized events...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm font-semibold mb-4 border border-blue-100">
              <Settings size={16} /> Dashboard
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Manage Your Events</h1>
          </div>
          <Link href="/create-event" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold transition-all shadow-sm">
            <PlusCircle size={18} /> Organize New Event
          </Link>
        </div>

        {/* Table Section */}
        {events.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-sm font-bold text-gray-600 uppercase tracking-wider">
                    <th className="px-6 py-4">Event Banner</th>
                    <th className="px-6 py-4">Event Details</th>
                    <th className="px-6 py-4">Date & Location</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {events.map((event) => (
                    <tr key={event._id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img src={event.thumbnail} alt={event.title} className="w-24 h-16 object-cover rounded-md border border-gray-200" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900 mb-1.5 line-clamp-1 text-lg">{event.title}</div>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                          {event.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div className="flex items-center gap-1.5 mb-2 font-medium">
                          <CalendarDays size={16} className="text-blue-500" /> 
                          {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                          <MapPin size={16} className="text-gray-400" /> {event.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEditModal(event)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100" title="Edit Event">
                            <Edit size={18} />
                          </button>
                          <button onClick={() => confirmDelete(event._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100" title="Delete Event">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No events organized yet</h3>
          </div>
        )}
      </div>

      {/* --- Delete Confirmation Modal --- */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4 transform transition-all scale-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <AlertTriangle className="text-red-600" size={32} />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 text-center mb-2">Are you sure?</h3>
            <p className="text-gray-500 text-center mb-8 text-sm">
              Do you really want to delete this event? This process cannot be undone.
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteModal({ isOpen: false, eventId: null })} className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-lg transition-colors">
                Cancel
              </button>
              <button onClick={executeDelete} className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors shadow-sm">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Edit Event Modal --- */}
      {editModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 sm:p-6">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto hide-scrollbar">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
              <h3 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
                <Edit className="text-blue-600" size={20}/> Update Event Details
              </h3>
              <button 
                onClick={() => setEditModal({ isOpen: false, eventId: null })}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleEditSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Event Title</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Type className="h-4 w-4 text-gray-400" /></div>
                    <input type="text" required value={editFormData.title} className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 focus:bg-white" onChange={(e) => setEditFormData({...editFormData, title: e.target.value})} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FolderDot className="h-4 w-4 text-gray-400" /></div>
                    <select required value={editFormData.type} className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 focus:bg-white" onChange={(e) => setEditFormData({...editFormData, type: e.target.value})}>
                      {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Event Date</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><CalendarDays className="h-4 w-4 text-gray-400" /></div>
                    <input type="date" required min={todayDate || undefined} value={editFormData.date} className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 focus:bg-white" onChange={(e) => setEditFormData({...editFormData, date: e.target.value})} />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Location / Venue</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><MapPin className="h-4 w-4 text-gray-400" /></div>
                    <input type="text" required value={editFormData.location} className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 focus:bg-white" onChange={(e) => setEditFormData({...editFormData, location: e.target.value})} />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Image Banner URL</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><ImageIcon className="h-4 w-4 text-gray-400" /></div>
                    <input type="url" required value={editFormData.thumbnail} className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 focus:bg-white" onChange={(e) => setEditFormData({...editFormData, thumbnail: e.target.value})} />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Event Description</label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none"><AlignLeft className="h-4 w-4 text-gray-400" /></div>
                    <textarea required rows="3" value={editFormData.description} className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none bg-gray-50 focus:bg-white resize-none" onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}></textarea>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setEditModal({ isOpen: false, eventId: null })}
                  className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isUpdating} 
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-sm disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : <>Save Changes <Send size={16} /></>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}