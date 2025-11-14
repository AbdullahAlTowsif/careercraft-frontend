import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router";
import logo from "../../../assets/icons/logo.png";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <div className="flex items-center space-x-2">
            <img className="w-7 h-7" src={logo} alt="Logo" />
            <span className="text-2xl font-bold text-white">CareerCraft</span>
          </div>
          <p className="mt-3 text-sm">
            CareerCraft empowers youth to discover their skills, match them to real job opportunities, and plan a purposeful learning journey for sustainable employment.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/login" className="hover:text-yellow-400">Get Started</Link></li>
            <li><Link to="/jobs" className="hover:text-yellow-400">Opportunities</Link></li>
            <li><Link to="/resources" className="hover:text-yellow-400">Resources</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-yellow-400" />
              <span>Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-yellow-400" />
              <span>+880 123-456-789</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-yellow-400" />
              <span>support@teamspark.com</span>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-yellow-400">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-yellow-400">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-yellow-400">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-6 text-sm">
        <p>© {new Date().getFullYear()} CareerCraft. All rights reserved.</p>
      </div>
    </footer>
  );
}
