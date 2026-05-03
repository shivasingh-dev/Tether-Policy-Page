import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import DeleteForm from "../Components/DeleteForm";

// ── Reusable scroll-reveal wrapper ──────────────────────────────
const Reveal = ({ children, direction = "up", delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -60 : direction === "right" ? 60 : 0,
      y: direction === "up" ? 48 : direction === "down" ? -48 : 0,
      scale: direction === "scale" ? 0.92 : 1,
    },
    visible: { opacity: 1, x: 0, y: 0, scale: 1 },
  };
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

// ── Section wrapper ──────────────────────────────────────────────
const Section = ({ children, id, className = "" }) => (
  <section id={id} className={`relative z-10 ${className}`}>
    {children}
  </section>
);

// ── Section card ─────────────────────────────────────────────────
const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl border border-blue-900/30 bg-[#06234f]/25 p-8 transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_0_32px_rgba(41,121,255,0.08)] ${className}`}
  >
    {children}
  </div>
);

// ── Section heading ──────────────────────────────────────────────
const SectionHeading = ({ eyebrow, title, sub }) => (
  <div className="mb-14 text-center">
    <div className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[2px] text-cyan-400">
      <span className="block h-px w-7 bg-cyan-400/50" />
      {eyebrow}
      <span className="block h-px w-7 bg-cyan-400/50" />
    </div>
    <h2 className="bg-linear-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text font-['Syne'] text-3xl font-extrabold tracking-tight text-transparent md:text-4xl">
      {title}
    </h2>
    {sub && (
      <p className="mx-auto mt-4 max-w-xl text-sm text-blue-300/60">{sub}</p>
    )}
  </div>
);

// ── Icon component ────────────────────────────────────────────────
const Icon = ({ path, size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {path}
  </svg>
);

// ── FAQ DATA ─────────────────────────────────────────────────────
const faqs = [
  {
    q: "Is Tether completely free to use?",
    a: "Yes — Tether is 100% free. There are no paid plans, subscriptions, or hidden charges. Every feature, including video calling, status updates, and media sharing, is available to all users at no cost.",
  },
  {
    q: "Who can use Tether?",
    a: "Tether is available to users who are 10 years of age or older. The app is currently available in India on Android (Google Play Store) and on the web.",
  },
  {
    q: "How is my phone number used?",
    a: "Your phone number is used solely to verify your identity during sign-up via a one-time password (OTP) sent through Twilio. We do not share your phone number with any third parties for marketing purposes.",
  },
  {
    q: "Why do I need to verify my email too?",
    a: "Email verification allows you to log into Tether on both the mobile app and the web using the same account. It acts as a secondary login method for cross-platform access.",
  },
  {
    q: "How long is my shared media stored?",
    a: "Media (images and videos) you share in chats is stored on our servers for 15 days, after which it is automatically and permanently deleted. A local copy may remain on your device's storage, which you control.",
  },
  {
    q: "Are my messages private?",
    a: "Messages are transmitted securely over HTTPS. We do not sell, share, or use your message content for advertising or any purpose beyond delivering it to the intended recipient.",
  },
  {
    q: "Can I delete my account?",
    a: "Yes. You can request account deletion at any time by contacting us at shivadood247044@gmail.com. We will delete your account and associated personal data promptly.",
  },
  {
    q: "What data does Tether collect?",
    a: "We collect only what is necessary: your phone number, email address, name, profile picture, about bio, messages, shared media, status updates, and basic technical data (device type, IP). We do not collect your contacts list, location, or financial information.",
  },
  {
    q: "Does Tether use any third-party services?",
    a: "We use Twilio to send OTP verification messages. Your phone number is shared with Twilio only for this purpose. We do not use any advertising networks or analytics platforms.",
  },
  {
    q: "How do I contact support?",
    a: "You can reach us at shivadood247044@gmail.com. We aim to respond within 7 business days.",
  },
];

// ── FEATURES DATA ─────────────────────────────────────────────────
const features = [
  {
    icon: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </>
    ),
    title: "Instant Messaging",
    desc: "Send text messages in real time. Clean, fast, and reliable delivery every time.",
  },
  {
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </>
    ),
    title: "Media Sharing",
    desc: "Share images and videos seamlessly. Media is stored securely and auto-deleted after 15 days.",
  },
  {
    icon: (
      <>
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </>
    ),
    title: "Video Calls",
    desc: "Crystal-clear video calls with the people who matter. No time limits, no cost.",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </>
    ),
    title: "Status Updates",
    desc: "Share moments with your contacts through photo, video, or text status updates.",
  },
  {
    icon: (
      <>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
    title: "Custom Profile",
    desc: "Set your profile picture, username, and about — just like you like it.",
  },
  {
    icon: (
      <>
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </>
    ),
    title: "Web & Mobile",
    desc: "Log in on your phone or browser using the same account. Your chats, everywhere.",
  },
];

// ── DATA COLLECTED ────────────────────────────────────────────────
const dataItems = [
  {
    label: "Account & Identity",
    items: [
      "Phone Number — OTP verification via Twilio",
      "Email Address — cross-platform login",
      "Full Name / Username — displayed to contacts",
      "Profile Picture — optional",
      "About / Bio — optional",
    ],
  },
  {
    label: "Communication & Activity",
    items: [
      "Text Messages — delivered to recipients",
      "Images & Videos — stored 15 days on server",
      "Status Updates — visible to your contacts",
      "Video Call Metadata — timestamps, duration only (calls are not recorded)",
    ],
  },
  {
    label: "Technical Data",
    items: [
      "Device Type & OS — for compatibility",
      "IP Address — basic login security",
    ],
  },
];

// ── PRIVACY SECTIONS DATA ─────────────────────────────────────────
const privacySections = [
  {
    num: "01",
    title: "Overview",
    dir: "left",
    content: (
      <>
        <p className="mb-3 text-sm text-blue-300/70">
          Welcome to <strong className="text-white">Tether</strong> — a free
          messaging application developed by{" "}
          <strong className="text-white">Shiva Singh</strong>, an independent
          developer based in India.
        </p>
        <p className="text-sm text-blue-300/70">
          By using Tether you agree to the practices described in this Privacy
          Policy. Tether is completely free — no paid plans, no subscriptions,
          no advertisements.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["Developer", "Shiva Singh"],
            ["App", "Tether"],
            ["Governed By", "Laws of India"],
            ["Last Updated", "June 1, 2025"],
          ].map(([l, v]) => (
            <div
              key={l}
              className="rounded-xl border border-blue-900/30 bg-[#0a1f44]/60 p-3"
            >
              <p className="mb-1 text-[10px] font-medium uppercase tracking-widest text-cyan-400">
                {l}
              </p>
              <p className="text-sm text-white">{v}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    num: "02",
    title: "Why We Collect Data",
    dir: "right",
    content: (
      <ul className="space-y-2">
        {[
          [
            "Phone Number & OTP",
            "Verify identity during signup & prevent fake accounts.",
          ],
          [
            "Email Address",
            "Enable login on the web version with the same account.",
          ],
          [
            "Profile Info",
            "Personalise your experience and let others identify you.",
          ],
          [
            "Messages & Media",
            "Deliver your communications to the intended recipients.",
          ],
          ["Status Updates", "Display your status to your contacts."],
          [
            "Video Call Metadata",
            "Establish and manage peer-to-peer video call connections.",
          ],
          [
            "Device & IP Data",
            "Ensure app compatibility and basic account security.",
          ],
        ].map(([t, d]) => (
          <li
            key={t}
            className="flex gap-3 border-b border-blue-900/15 pb-2 text-sm last:border-0"
          >
            <span className="mt-0.5 text-blue-400">›</span>
            <span>
              <strong className="text-white">{t}</strong> —{" "}
              <span className="text-blue-300/70">{d}</span>
            </span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    num: "03",
    title: "Data Storage & Retention",
    dir: "left",
    content: (
      <>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            [
              "Media (Images & Videos)",
              "Stored for 15 days on our server, then permanently auto-deleted.",
            ],
            [
              "Text Messages",
              "Stored while your account and conversation are active.",
            ],
            ["Account Data", "Retained until you delete your account."],
            [
              "Local Device Storage",
              "Media saved to your device stays there unless you delete it manually.",
            ],
          ].map(([l, v]) => (
            <div
              key={l}
              className="rounded-xl border border-blue-900/30 bg-[#0a1f44]/60 p-4"
            >
              <p className="mb-1 text-[10px] font-medium uppercase tracking-widest text-cyan-400">
                {l}
              </p>
              <p className="text-sm text-blue-300/70">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-blue-500/25 bg-linear-to-r from-blue-500/10 to-purple-500/10 p-4 text-sm text-blue-200/80">
          <strong className="text-white">Note:</strong> After 15 days, media is
          permanently deleted from our servers. Local copies on your device are
          under your control.
        </div>
      </>
    ),
  },
  {
    num: "04",
    title: "Third-Party Services",
    dir: "right",
    content: (
      <>
        <div className="rounded-xl border border-blue-900/30 bg-[#0a1f44]/60 p-4">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-widest text-cyan-400">
            Twilio
          </p>
          <p className="text-sm text-blue-300/70">
            We use <strong className="text-white">Twilio</strong> to send
            One-Time Passwords (OTPs) to your phone number during registration
            and login. Your phone number is securely transmitted to Twilio only
            for this purpose. Twilio's use is governed by{" "}
            <a
              href="https://www.twilio.com/en-us/legal/privacy"
              target="_blank"
              rel="noopener"
              className="text-blue-400 underline underline-offset-2"
            >
              Twilio's Privacy Policy
            </a>
            .
          </p>
        </div>
        <p className="mt-4 text-sm text-blue-300/70">
          We do not use advertising networks, analytics platforms, or any other
          third-party services beyond Twilio.
        </p>
      </>
    ),
  },
  {
    num: "05",
    title: "Data Sharing",
    dir: "left",
    content: (
      <>
        <p className="mb-4 text-sm text-blue-300/70">
          We do <strong className="text-white">not</strong> sell, rent, trade,
          or share your personal data for marketing or commercial purposes.
        </p>
        <ul className="space-y-2">
          {[
            [
              "To Other Users",
              "Your profile name, picture, and status are visible to users you communicate with — required for the app to function.",
            ],
            [
              "Legal Obligation",
              "If required by applicable Indian law, court order, or lawful governmental authority.",
            ],
            [
              "Safety",
              "If we have good-faith belief that disclosure is necessary to protect users or others.",
            ],
          ].map(([t, d]) => (
            <li
              key={t}
              className="flex gap-3 border-b border-blue-900/15 pb-2 text-sm last:border-0"
            >
              <span className="mt-0.5 text-blue-400">›</span>
              <span>
                <strong className="text-white">{t}</strong> —{" "}
                <span className="text-blue-300/70">{d}</span>
              </span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    num: "06",
    title: "Security",
    dir: "right",
    content: (
      <>
        <p className="mb-4 text-sm text-blue-300/70">
          We implement appropriate technical and organisational measures to
          protect your data.
        </p>
        <ul className="space-y-2">
          {[
            "Secure HTTPS connections for all data in transit.",
            "OTP-based two-step phone verification via Twilio.",
            "Automatic deletion of media from servers after 15 days.",
            "Restricted access to our server and database.",
          ].map((m) => (
            <li
              key={m}
              className="flex gap-3 border-b border-blue-900/15 pb-2 text-sm last:border-0"
            >
              <span className="mt-0.5 text-blue-400">›</span>
              <span className="text-blue-300/70">{m}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-blue-300/60">
          No method of transmission over the internet is 100% secure. We strive
          to use commercially acceptable means to protect your data.
        </p>
      </>
    ),
  },
  {
    num: "07",
    title: "Children's Privacy",
    dir: "left",
    content: (
      <>
        <p className="text-sm text-blue-300/70">
          Tether is intended for users{" "}
          <strong className="text-white">10 years of age or older</strong>. We
          do not knowingly collect personal information from children under 10.
        </p>
        <p className="mt-3 text-sm text-blue-300/70">
          If you are a parent or guardian and believe your child under 10 has
          provided us with personal information, please contact us at{" "}
          <a href="mailto:shivadood247044@gmail.com" className="text-blue-400">
            shivadood247044@gmail.com
          </a>{" "}
          and we will promptly delete such information.
        </p>
      </>
    ),
  },
  {
    num: "08",
    title: "Your Rights",
    dir: "right",
    content: (
      <>
        <ul className="space-y-2">
          {[
            [
              "Access",
              "View and manage your profile at any time from within the app.",
            ],
            [
              "Correction",
              "Update your profile information directly in the app.",
            ],
            [
              "Deletion",
              "Request account deletion by contacting us — we will action it promptly.",
            ],
            [
              "Data Portability",
              "Request a copy of the personal data we hold about you.",
            ],
            [
              "Withdraw Consent",
              "Stop using the app and request account deletion at any time.",
            ],
          ].map(([t, d]) => (
            <li
              key={t}
              className="flex gap-3 border-b border-blue-900/15 pb-2 text-sm last:border-0"
            >
              <span className="mt-0.5 text-blue-400">›</span>
              <span>
                <strong className="text-white">{t}</strong> —{" "}
                <span className="text-blue-300/70">{d}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            "Access Your Data",
            "Correct Information",
            "Delete Account",
            "Withdraw Consent",
            "Data Portability",
          ].map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 rounded-full border border-blue-900/30 bg-[#06234f]/70 px-3 py-1 text-xs text-blue-300/70"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              {t}
            </span>
          ))}
        </div>
      </>
    ),
  },
  {
    num: "09",
    title: "Policy Changes",
    dir: "left",
    content: (
      <>
        <p className="text-sm text-blue-300/70">
          We may update this Privacy Policy to reflect changes in our practices
          or applicable law. When changes are made, the{" "}
          <strong className="text-white">Last Updated</strong> date at the top
          of the policy will be revised.
        </p>
        <p className="mt-3 text-sm text-blue-300/70">
          We encourage you to review this page periodically. Continued use of
          Tether after changes constitutes acceptance of the updated policy.
        </p>
      </>
    ),
  },
];

// ── FAQ ITEM ──────────────────────────────────────────────────────
const FAQItem = ({ q, a, index }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: (index % 5) * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="border-b border-blue-900/25 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-blue-300"
      >
        <span className="text-sm font-medium text-white">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue-800/40 bg-[#06234f]/60 text-blue-400"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-8 text-sm leading-relaxed text-blue-300/65">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ── MAIN COMPONENT ────────────────────────────────────────────────
const HomePage = () => {
  const [navSection, setNavSection] = useState("Privacy Policy");
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  // Nav section tracker
  useEffect(() => {
    const names = {
      hero: "Home",
      features: "Features",
      "data-collected": "Data",
      privacy: "Privacy Policy",
      faq: "FAQ",
      contact: "Contact",
    };
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting && names[e.target.id])
            setNavSection(names[e.target.id]);
        }),
      { threshold: 0.4 },
    );
    document.querySelectorAll("[id]").forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#020818] font-['DM_Sans',sans-serif] text-white">
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      {/* ── Ambient orbs ── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -left-24 -top-28 h-125 w-125 rounded-full bg-blue-600 opacity-[0.14] blur-[130px]" />
        <div className="absolute -right-20 bottom-[10%] h-105 w-105 rounded-full bg-purple-700 opacity-[0.14] blur-[130px]" />
        <div className="absolute left-[30%] top-[45%] h-75 w-75 rounded-full bg-cyan-500 opacity-[0.06] blur-[100px]" />
      </div>

      {/* ── Noise texture ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 border-b border-blue-900/30 bg-[#020818]/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-linear-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text font-['Syne'] text-2xl font-black tracking-tight text-transparent"
          >
            Tether
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-full border border-blue-500/30 bg-blue-500/15 px-3 py-1 text-xs font-medium tracking-wide text-blue-400 transition-all duration-300"
          >
            {navSection}
          </motion.span>
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-5xl px-5 pb-24">
        {/* ══ HERO ════════════════════════════════════════════════ */}
        <Section id="hero" className="py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[2px] text-cyan-400"
          >
            <span className="block h-px w-7 bg-cyan-400/50" />
            Free · Secure · India
            <span className="block h-px w-7 bg-cyan-400/50" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-6 max-w-2xl bg-linear-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text font-['Syne'] text-5xl font-extrabold leading-[1.1] tracking-tight text-transparent md:text-6xl"
          >
            Connect without limits
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-10 max-w-md text-base text-blue-300/60"
          >
            Tether is a free messaging app with video calls, status updates, and
            media sharing — available on Android and the web.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-blue-600 to-purple-700 px-7 py-3 text-sm font-medium text-white shadow-[0_4px_24px_rgba(41,121,255,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3.18 23.76c.33.19.7.24 1.06.14l11.4-6.58-2.42-2.42-10.04 8.86zM20.68 10.1c-.36-.64-.92-1.07-1.59-1.24L4.24.24C3.88.04 3.51.01 3.18.18L13.22 10.2l7.46-.1zm-17.5 1.13v11.54L13.22 12.8 3.18 11.23zm16.35.93l-3.81 2.2 2.42 2.42 1.41-.82c.83-.48 1.31-1.23 1.31-2.05-.01-.83-.48-1.56-1.33-1.75z" />
              </svg>
              Download on Play Store
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-full border border-blue-700/40 bg-[#06234f]/50 px-7 py-3 text-sm font-medium text-blue-300 transition-all duration-200 hover:border-blue-500/60 hover:bg-[#06234f]/80"
            >
              Explore Features
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </a>
            <button
              onClick={() => setShowDeleteForm(true)}
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-red-600 to-pink-700 px-7 py-3 text-sm font-medium text-white shadow-[0_4px_24px_rgba(239,68,68,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              Request Delete My Account
            </button>
          </motion.div>

          {/* hero chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-3"
          >
            {[
              ["💬", "Messaging"],
              ["📷", "Media Sharing"],
              ["📹", "Video Calls"],
              ["🔵", "Status"],
              ["🆓", "Always Free"],
            ].map(([e, l], i) => (
              <motion.span
                key={l}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.07 }}
                className="inline-flex items-center gap-1.5 rounded-full border border-blue-900/30 bg-[#06234f]/50 px-3.5 py-1.5 text-xs text-blue-300/70"
              >
                <span>{e}</span>
                {l}
              </motion.span>
            ))}
          </motion.div>
        </Section>

        <div className="my-2 h-px bg-linear-to-r from-transparent via-blue-700/30 to-transparent" />

        {/* ══ FEATURES ════════════════════════════════════════════ */}
        <Section id="features" className="py-20">
          <Reveal direction="up">
            <SectionHeading
              eyebrow="What You Get"
              title="Everything you need"
              sub="A complete communication toolkit — free for everyone, forever."
            />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon, title, desc }, i) => (
              <Reveal
                key={title}
                direction={i % 2 === 0 ? "left" : "right"}
                delay={i * 0.07}
              >
                <Card className="h-full">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-800/30 bg-linear-to-br from-blue-600/20 to-purple-700/20 text-blue-400">
                    <Icon path={icon} />
                  </div>
                  <h3 className="mb-2 font-['Syne'] text-base font-bold text-white">
                    {title}
                  </h3>
                  <p className="text-sm text-blue-300/60 leading-relaxed">
                    {desc}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Section>

        <div className="my-2 h-px bg-linear-to-r from-transparent via-blue-700/30 to-transparent" />

        {/* ══ DATA COLLECTED ══════════════════════════════════════ */}
        <Section id="data-collected" className="py-20">
          <Reveal direction="up">
            <SectionHeading
              eyebrow="Transparency First"
              title="Data We Collect"
              sub="We collect only what is strictly necessary to make Tether work. Nothing more."
            />
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {dataItems.map(({ label, items }, i) => (
              <Reveal
                key={label}
                direction={["left", "up", "right"][i]}
                delay={i * 0.1}
              >
                <Card className="h-full">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[1.5px] text-cyan-400">
                    {label}
                  </p>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 border-b border-blue-900/15 pb-2 text-xs text-blue-300/65 last:border-0"
                      >
                        <span className="mt-0.5 text-blue-400 font-bold">
                          ›
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </div>
          <Reveal direction="up" delay={0.2}>
            <div className="mt-5 rounded-2xl border border-blue-500/25 bg-linear-to-r from-blue-500/10 to-purple-500/10 p-5 text-sm text-blue-200/80">
              <strong className="text-white">We do not collect</strong> your
              contacts list, location, browsing history, financial information,
              or any data not listed above.
            </div>
          </Reveal>
        </Section>

        <div className="my-2 h-px bg-linear-to-r from-transparent via-blue-700/30 to-transparent" />

        {/* ══ PRIVACY POLICY ══════════════════════════════════════ */}
        <Section id="privacy" className="py-20">
          <Reveal direction="up">
            <SectionHeading
              eyebrow="Legal & Privacy"
              title="Privacy Policy"
              sub="Full transparency on how we handle your personal information."
            />
          </Reveal>

          {/* ToC */}
          <Reveal direction="scale" delay={0.05}>
            <Card className="mb-8">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[1.5px] text-cyan-400">
                Contents
              </p>
              <ul className="grid gap-y-2 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
                {privacySections.map(({ num, title }) => (
                  <li key={num}>
                    <a
                      href={`#ps-${num}`}
                      className="flex items-center gap-2 text-sm text-blue-300/60 transition-colors hover:text-blue-400"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                      {num}. {title}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>

          <div className="space-y-5">
            {privacySections.map(({ num, title, dir, content }, i) => (
              <Reveal key={num} direction={dir} delay={0}>
                <Card id={`ps-${num}`}>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-800/30 bg-linear-to-br from-blue-600/20 to-purple-700/20">
                      <span className="text-xs font-bold text-blue-400">
                        {num}
                      </span>
                    </div>
                    <h2 className="font-['Syne'] text-lg font-bold text-white">
                      {title}
                    </h2>
                  </div>
                  {content}
                </Card>
              </Reveal>
            ))}
          </div>
        </Section>

        <div className="my-2 h-px bg-linear-to-r from-transparent via-blue-700/30 to-transparent" />

        {/* ══ FAQ ═════════════════════════════════════════════════ */}
        <Section id="faq" className="py-20">
          <Reveal direction="up">
            <SectionHeading
              eyebrow="Got Questions?"
              title="Frequently Asked Questions"
              sub="Everything you need to know about Tether, privacy, and how we work."
            />
          </Reveal>
          <Reveal direction="up" delay={0.05}>
            <Card className="divide-y divide-blue-900/25 p-0 px-6">
              {faqs.map((item, i) => (
                <FAQItem key={i} q={item.q} a={item.a} index={i} />
              ))}
            </Card>
          </Reveal>
        </Section>

        <div className="my-2 h-px bg-linear-to-r from-transparent via-blue-700/30 to-transparent" />

        {/* ══ CONTACT ═════════════════════════════════════════════ */}
        <Section id="contact" className="py-20">
          <Reveal direction="up">
            <div className="rounded-2xl border border-blue-500/25 bg-linear-to-br from-blue-600/10 to-purple-700/10 p-10 text-center">
              <p className="mb-2 text-xs font-medium uppercase tracking-[2px] text-cyan-400">
                Get in Touch
              </p>
              <h2 className="mb-4 font-['Syne'] text-3xl font-extrabold text-white">
                Contact Us
              </h2>
              <p className="mx-auto mb-8 max-w-sm text-sm text-blue-300/60">
                Questions, concerns, or data requests? We typically respond
                within 7 business days.
              </p>
              <a
                href="mailto:shivadood247044@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-blue-600 to-purple-700 px-8 py-3 text-sm font-medium text-white shadow-[0_4px_24px_rgba(41,121,255,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                shivadood247044@gmail.com
              </a>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {[
                  ["Developer", "Shiva Singh"],
                  ["Location", "India"],
                  ["Response", "Within 7 days"],
                ].map(([l, v]) => (
                  <span
                    key={l}
                    className="inline-flex items-center gap-1.5 rounded-full border border-blue-900/30 bg-[#06234f]/50 px-4 py-1.5 text-xs text-blue-300/70"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    {l}: {v}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </Section>
        {showDeleteForm && <DeleteForm onClose={() => setShowDeleteForm(false)} />}
      </main>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-blue-900/25 py-8 text-center">
        <p className="text-sm text-blue-300/35">
          © 2025{" "}
          <span className="bg-linear-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text font-bold text-transparent">
            Tether
          </span>{" "}
          · Developed by Shiva Singh · All rights reserved.
        </p>
        <p className="mt-1 text-xs text-blue-300/25">
          Governed by the laws of India.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
