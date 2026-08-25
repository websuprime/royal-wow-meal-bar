import { Link } from 'react-router-dom'
import { Instagram, Twitter, MapPin, Phone, Clock } from 'lucide-react'

export default function RestaurantFooter() {
  return (
    <footer className="bg-royal-green text-cream">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <span className="text-gold text-xl">🍽</span>
            <h3 className="font-heading text-xl font-bold mt-2 mb-4">Royal Wow Meal</h3>
            <p className="text-cream/60 text-sm leading-relaxed">
              A culinary sanctuary dedicated to the pursuit of perfection. Celebrating the marriage of heritage and innovation.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-gold text-xs tracking-[0.2em] font-semibold mb-4">EXPLORE</h4>
            <div className="flex flex-col gap-2">
              <Link to="/restaurant/menu" className="text-cream/60 text-sm hover:text-gold transition-colors">The Autumn Menu</Link>
              <Link to="/restaurant/about" className="text-cream/60 text-sm hover:text-gold transition-colors">Chef's Gallery</Link>
              <Link to="/restaurant/contact" className="text-cream/60 text-sm hover:text-gold transition-colors">Private Events</Link>
              <Link to="/restaurant/menu" className="text-cream/60 text-sm hover:text-gold transition-colors">Gift Cards</Link>
            </div>
          </div>

          {/* Locate */}
          <div>
            <h4 className="text-gold text-xs tracking-[0.2em] font-semibold mb-4">LOCATE</h4>
            <div className="flex flex-col gap-3 text-cream/60 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-gold mt-0.5 shrink-0" />
                <span>SCO 7,8, SBC WALK, behind SBC GROUP,<br />Kharar, Punjab 140301</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-gold shrink-0" />
                <span>097818 89898</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-gold text-xs tracking-[0.2em] font-semibold mb-4">HOURS</h4>
            <div className="flex flex-col gap-2 text-cream/60 text-sm">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-gold shrink-0" />
                <div>
                  <p>Everyday: <span className="text-cream">11:00 AM - 11:00 PM</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream/40 text-xs">© 2024 ROYAL WOW MEAL. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4 text-cream/40">
            <a href="#" className="hover:text-gold transition-colors text-xs">PRIVACY POLICY</a>
            <a href="#" className="hover:text-gold transition-colors text-xs">TERMS</a>
            <a href="#" className="hover:text-gold transition-colors text-xs">COOKIES</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="text-cream/40 hover:text-gold transition-colors"><Instagram size={16} /></a>
            <a href="#" className="text-cream/40 hover:text-gold transition-colors"><Twitter size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
