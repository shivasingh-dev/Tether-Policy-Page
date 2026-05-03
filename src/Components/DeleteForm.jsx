import React from 'react';
import { motion } from 'framer-motion';

const DeleteForm = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-md rounded-2xl border border-blue-500/30 bg-[#06234f]/90 p-8 shadow-[0_0_40px_rgba(41,121,255,0.15)] backdrop-blur-md"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-900/40 text-blue-300 transition-colors hover:bg-blue-800/60 hover:text-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h2 className="mb-2 font-['Syne'] text-2xl font-bold text-white">Delete Account</h2>
        <p className="mb-6 text-sm text-blue-300/70">
          Submit a request to permanently delete your account and associated data.
        </p>

        <form action="https://formsubmit.co/shivadood247044@gmail.com" method="POST" className="space-y-4">
          {/* FormSubmit Config */}
          <input type="hidden" name="_subject" value="New Account Deletion Request!" />
          <input type="hidden" name="_captcha" value="false" />
          
          <div>
            <label className="mb-1.5 block text-xs font-medium text-blue-300/80">Full Name</label>
            <input
              type="text"
              name="Full Name"
              required
              className="w-full rounded-xl border border-blue-900/50 bg-[#020818]/50 px-4 py-2.5 text-sm text-white placeholder-blue-300/30 outline-none transition-colors focus:border-blue-500/50 focus:bg-[#020818]/80"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-blue-300/80">Email Address</label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-xl border border-blue-900/50 bg-[#020818]/50 px-4 py-2.5 text-sm text-white placeholder-blue-300/30 outline-none transition-colors focus:border-blue-500/50 focus:bg-[#020818]/80"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-blue-300/80">Phone Number</label>
            <input
              type="tel"
              name="Phone Number"
              required
              className="w-full rounded-xl border border-blue-900/50 bg-[#020818]/50 px-4 py-2.5 text-sm text-white placeholder-blue-300/30 outline-none transition-colors focus:border-blue-500/50 focus:bg-[#020818]/80"
              placeholder="+91 98765 43210"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-linear-to-r from-red-500 to-red-700 py-3 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(239,68,68,0.25)] transition-all hover:opacity-90 active:scale-[0.98]"
          >
            Submit Request
          </button>
          <p className="mt-4 text-center text-[10px] text-blue-300/50">
            This request will be sent directly to our support team.
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default DeleteForm;
