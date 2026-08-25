import { Link } from 'react-router-dom'
import { Wine, MapPin, Phone, Share2, Camera, Mail } from 'lucide-react'

export default function BarFooter() {
  return (
    <footer className="bg-navy text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Wine className="text-gold" size={20} />
              <h3 className="font-heading text-lg font-bold tracking-wide">ROYAL BAR</h3>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Experience the pinnacle of nightlife in the heart of the city. We redefine luxury one pour at a time.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="text-white/40 hover:text-gold transition-colors"><Share2 size={16} /></a>
              <a href="#" className="text-white/40 hover:text-gold transition-colors"><Camera size={16} /></a>
              <a href="#" className="text-white/40 hover:text-gold transition-colors"><Mail size={16} /></a>
            </div>
          </div>

          {/* The Lounge */}
          <div>
            <h4 className="text-gold text-xs tracking-[0.2em] font-semibold mb-4">THE LOUNGE</h4>
            <div className="flex flex-col gap-2">
              <Link to="/bar/about" className="text-white/50 text-sm hover:text-gold transition-colors">Private Dining</Link>
              <Link to="/bar/events" className="text-white/50 text-sm hover:text-gold transition-colors">Event Gallery</Link>
              <Link to="/bar/about" className="text-white/50 text-sm hover:text-gold transition-colors">Our Sommelier</Link>
              <Link to="/bar/contact" className="text-white/50 text-sm hover:text-gold transition-colors">Press Inquiries</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold text-xs tracking-[0.2em] font-semibold mb-4">CONTACT</h4>
            <div className="flex flex-col gap-3 text-white/50 text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-gold" />
                <span>SCO 7,8, SBC WALK, behind SBC GROUP, Kharar, Punjab 140301</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-gold" />
                <span>097818 89898</span>
              </div>
              <div className="mt-2">
                <p>Everyday: <span className="text-white/80">11:00 AM – 11:00 PM</span></p>
                <p className="text-gold italic mt-1">Strict Dress Code Applies</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">© 2024 ROYAL BAR. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4 text-white/30 text-xs">
            <a href="#" className="hover:text-gold transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-gold transition-colors">TERMS</a>
            <a href="#" className="hover:text-gold transition-colors">DRESS CODE</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
