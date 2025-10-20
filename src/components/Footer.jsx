import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-textPrimary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary p-2 rounded-lg">
                <Heart className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold">MediCare Plus</span>
            </div>
            <p className="text-gray-400">
              Smart. Efficient. Reliable Healthcare Operations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-primary transition-colors cursor-pointer">Pharmacy Management</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Emergency Triage</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Appointments</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Hospital Navigation</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contact@medicareplus.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>123 Healthcare St, Medical City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 MediCare Plus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
