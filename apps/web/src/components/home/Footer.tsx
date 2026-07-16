import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-150 pt-16 mt-20">
      <div className="container mx-auto px-4 md:px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div>
            <span className="text-2xl font-black text-gray-900 tracking-tight block mb-6">
              Active<span className="text-[#e62e04]">Ecommerce</span>
            </span>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Your premium multi-vendor eCommerce platform. We connect buyers and sellers globally with seamless, secure, and lightning-fast shopping experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#e62e04] hover:text-white transition-colors"><Facebook className="h-4 w-4"/></a>
              <a href="#" className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#e62e04] hover:text-white transition-colors"><Twitter className="h-4 w-4"/></a>
              <a href="#" className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#e62e04] hover:text-white transition-colors"><Instagram className="h-4 w-4"/></a>
              <a href="#" className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#e62e04] hover:text-white transition-colors"><Youtube className="h-4 w-4"/></a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-gray-950 mb-6 uppercase text-xs tracking-wider border-b border-gray-100 pb-2">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-gray-500">
                <MapPin className="h-5 w-5 text-gray-400 shrink-0" />
                <span>123 Commerce Blvd, Tech Park<br/>San Francisco, CA 94107</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-500">
                <Phone className="h-5 w-5 text-gray-400 shrink-0" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-500">
                <Mail className="h-5 w-5 text-gray-400 shrink-0" />
                <span>support@activecommerce.com</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-950 mb-6 uppercase text-xs tracking-wider border-b border-gray-100 pb-2">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-500 hover:text-[#e62e04] transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-[#e62e04] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-[#e62e04] transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-[#e62e04] transition-colors">Return Policy</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-[#e62e04] transition-colors">Vendor Guidelines</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-gray-950 mb-6 uppercase text-xs tracking-wider border-b border-gray-100 pb-2">Newsletter</h4>
            <p className="text-sm text-gray-500 mb-4">Subscribe to our newsletter to get updates on our latest offers!</p>
            <form className="flex border border-gray-200 rounded-md overflow-hidden">
              <input type="email" placeholder="Your Email Address" className="w-full bg-gray-50 px-4 py-3 focus:outline-none focus:bg-white text-sm" />
              <button className="bg-[#e62e04] hover:bg-[#d02500] text-white px-5 py-3 font-semibold transition-colors text-sm">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border-t border-gray-100 py-6">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ActiveEcommerce. All rights reserved.
          </p>
          <div className="flex space-x-2">
            {/* Payment Icons */}
            <div className="h-8 w-12 bg-white rounded border border-gray-200 flex items-center justify-center font-bold text-[10px] text-blue-800">VISA</div>
            <div className="h-8 w-12 bg-white rounded border border-gray-200 flex items-center justify-center font-bold text-[10px] text-red-500">MC</div>
            <div className="h-8 w-12 bg-white rounded border border-gray-200 flex items-center justify-center font-bold text-[10px] text-blue-500">PAYPAL</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
