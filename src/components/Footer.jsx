
import Link from 'next/link';
import { HeartHandshake, Mail, Phone, MapPin, Globe, ArrowUpRight } from 'lucide-react';
import CurrentYear from "./CurrentYear";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-t border-gray-200 dark:border-gray-800 transition-colors pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <HeartHandshake size={28} /> CommunePulse
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
              Empowering communities and connecting compassionate citizens with direct local volunteer initiatives, charity drives, and social development campaigns.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold border border-blue-100 dark:border-blue-900">
                100% Non-Profit Initiative
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/events" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/create-event" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Organize Drive
                </Link>
              </li>
              <li>
                <Link href="/joined-events" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Volunteer Schedule
                </Link>
              </li>
              <li>
                <Link href="/manage-events" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Creator Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Focus Areas */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">Focus Areas</h4>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li>Donation & Relief</li>
              <li>Cleanup Campaigns</li>
              <li>Tree Plantation</li>
              <li>Food Distribution</li>
              <li>Health Camps</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
                <span>Sonadanga, Khulna, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
                <span>ayon6237@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
                <span>+880 1780 938835</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Divider & Copyright */}
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
          <p>&copy; <CurrentYear /> CommunePulse Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-blue-600 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-blue-600 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-blue-600 transition-colors cursor-pointer">Community Guidelines</span>
          </div>
        </div>

      </div>
    </footer>
  );
}