import { Search, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="border-t bg-muted/10 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-semibold">CampusFind</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting our campus community to reunite lost items with their owners.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-medium">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to={'/browseitems'} className="text-muted-foreground hover:text-foreground"> Browse Items </Link></li>
              <li><Link to={'/lost'} className="text-muted-foreground hover:text-foreground"> Report Lost </Link></li>
              <li><Link to={'/found'} className="text-muted-foreground hover:text-foreground"> Report Found </Link></li>
              <li><Link to={'/about'} className="text-muted-foreground hover:text-foreground"> How It Works </Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 font-medium">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Safety Guidelines</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-medium">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                campusfind.help@gmail.com
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                (+91) 123-4567
              </li>
              <li className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                NSS Building
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          &copy; 2025 CampusFind. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
