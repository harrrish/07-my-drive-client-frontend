import React from "react";
import { NavLink } from "react-router-dom";
import {
  IoCloudUploadOutline,
  IoShieldCheckmarkOutline,
  IoSpeedometerOutline,
} from "react-icons/io5";
import {
  FaCloudUploadAlt,
  FaUsers,
  FaCogs,
  FaCheckCircle,
} from "react-icons/fa";

export default function Home() {
  return (
    <div className="font-google bg-[var(--color-bgPrimary)] text-[var(--color-textPrimary)] scroll-smooth font-medium">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-[var(--color-bgSecondary)] border-b border-[var(--color-borderDefault)]">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <IoCloudUploadOutline className="text-[var(--color-accentFocus)] text-2xl" />
            UVDS{" "}
            <span className="text-[var(--color-textSecondary)]">My-Drive</span>
          </div>

          <div className="hidden md:flex gap-6 text-sm">
            <a
              href="#features"
              className="hover:text-[var(--color-accentFocus)]"
            >
              Features
            </a>
            <a href="#how" className="hover:text-[var(--color-accentFocus)]">
              How it Works
            </a>
            <a
              href="#pricing"
              className="hover:text-[var(--color-accentFocus)]"
            >
              Pricing
            </a>
            <a href="#about" className="hover:text-[var(--color-accentFocus)]">
              About
            </a>
          </div>

          <NavLink
            to="/register"
            className="px-4 py-2 rounded-md bg-[var(--color-accentPrimary)] text-black text-sm font-medium hover:bg-[var(--color-accentHover)] cursor-pointer"
          >
            Get Started
          </NavLink>
        </nav>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-28 text-center">
        <h1 className="text-4xl sm:text-5xl font-semibold">
          Secure Cloud Storage for the Modern Web
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-[var(--color-textSecondary)]">
          Store, share, and manage your files with enterprise-grade security and
          lightning-fast access — your personal vault in the cloud.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <NavLink
            to="/register"
            className="px-6 py-3 rounded-lg bg-[var(--color-accentPrimary)] text-black hover:bg-[var(--color-accentHover)] cursor-pointer"
          >
            Get Started Free
          </NavLink>
          <NavLink
            to="/login"
            className="px-6 py-3 rounded-lg border border-[var(--color-borderHover)] hover:bg-[var(--color-bgElevated)] cursor-pointer"
          >
            Login
          </NavLink>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-semibold text-center">
          Powerful Features
        </h2>
        <p className="text-center text-[var(--color-textSecondary)] mt-3">
          Designed for security, performance, and control
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <IoShieldCheckmarkOutline />,
              title: "Enterprise-Grade Security",
              desc: "OAuth login, optional 2FA, encrypted storage, and zero-trust access controls.",
            },
            {
              icon: <FaCloudUploadAlt />,
              title: "Intelligent File Management",
              desc: "Upload any file type, organize folders, search instantly, and preview media.",
            },
            {
              icon: <IoSpeedometerOutline />,
              title: "Seamless Cloud Integration",
              desc: "Optimized global delivery powered by AWS S3 and CloudFront CDN.",
            },
            {
              icon: <FaUsers />,
              title: "Advanced Sharing Controls",
              desc: "Granular permissions, secure links, expiry rules, and access tracking.",
            },
            {
              icon: <FaCogs />,
              title: "Administrative Controls",
              desc: "Monitor usage, manage users, and enforce storage policies.",
            },
            {
              icon: <FaCheckCircle />,
              title: "High Performance",
              desc: "Low-latency access and fast downloads across regions.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="group p-6 rounded-xl bg-[var(--color-bgElevated)] border border-[var(--color-borderHover)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-[var(--color-borderActive)] hover:shadow-lg hover:shadow-[var(--color-accentPrimary)]/10"
            >
              <div className="text-2xl mb-3 text-[var(--color-accentFocus)] group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="font-semibold group-hover:text-[var(--color-accentFocus)] transition-colors">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-textSecondary)]">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how"
        className="bg-[var(--color-bgSecondary)] border-y border-[var(--color-borderDefault)]"
      >
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="text-3xl font-semibold text-center">How it Works</h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                step: "1",
                title: "Create an Account",
                desc: "Sign up in seconds. No credit card required. Start free instantly.",
              },
              {
                step: "2",
                title: "Upload Your Files",
                desc: "Drag and drop documents, images, or videos with fast uploads.",
              },
              {
                step: "3",
                title: "Share & Access",
                desc: "Generate secure links and access files from anywhere.",
              },
            ].map((s) => (
              <div key={s.step}>
                <div className="text-4xl font-bold text-[var(--color-accentPrimary)]">
                  {s.step}
                </div>
                <h3 className="mt-3 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-textSecondary)]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-semibold text-center">Pricing</h2>
        <p className="mt-3 text-center text-[var(--color-textSecondary)]">
          Flexible plans designed to grow with you
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Free",
              price: "₹0",
              selected: true,
              features: [
                "100 MB secure cloud storage",
                "Upload files up to 50 MB each",
                "Access from 1 device",
                "Standard upload & download speed",
                "Email support",
              ],
            },
            {
              name: "Pro",
              price: "₹50 / month",
              popular: true,
              features: [
                "1 GB high-performance storage",
                "Upload files up to 100 MB",
                "Access from up to 3 devices",
                "Priority transfer speed",
                "Chat support",
              ],
            },
            {
              name: "Premium",
              price: "₹500 / month",
              features: [
                "10 GB premium storage",
                "Upload files up to 50 MB",
                "Access from up to 5 devices",
                "Priority performance",
                "Premium support",
              ],
            },
          ].map((p) => (
            <div
              key={p.name}
              className={`relative group p-6 rounded-xl border transition-all duration-300 ${
                p.selected
                  ? "border-[var(--color-accentPrimary)] bg-[var(--color-bgElevated)] shadow-lg shadow-[var(--color-accentPrimary)]/20 scale-[1.03]"
                  : "border-[var(--color-borderHover)] bg-[var(--color-bgSecondary)] hover:-translate-y-1 hover:scale-[1.02] hover:border-[var(--color-borderActive)] hover:shadow-xl"
              }`}
            >
              {p.selected && (
                <span className="absolute -top-3 right-4 text-xs px-2 py-0.5 rounded-full bg-[var(--color-accentPrimary)] text-black font-medium">
                  Default
                </span>
              )}
              {p.popular && (
                <span className="absolute -top-3 left-4 text-xs px-2 py-0.5 rounded-full bg-[var(--color-warning)] text-black font-medium">
                  Most Popular
                </span>
              )}

              <h3 className="font-semibold text-lg text-[var(--color-accentFocus)]">
                {p.name}
              </h3>
              <p className="mt-2 text-2xl font-semibold text-[var(--color-accentFocus)]">
                {p.price}
              </p>

              <ul className="mt-4 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <FaCheckCircle className="text-[var(--color-success)] mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              {p.selected ? (
                <div className="mt-6 text-center text-sm font-medium text-[var(--color-accentPrimary)]">
                  Current Plan
                </div>
              ) : (
                <NavLink
                  to="/register"
                  className="mt-6 block text-center px-4 py-2 rounded-md bg-[var(--color-bgElevated)] border border-[var(--color-borderHover)] hover:bg-[var(--color-accentPrimary)] hover:text-black transition cursor-pointer"
                >
                  Get Started
                </NavLink>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[var(--color-accentPrimary)] to-[var(--color-accentFocus)] text-black">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold">
            Ready to store your files securely?
          </h2>
          <p className="mt-3">
            Join users who trust UVDS · My-Drive for reliable cloud storage.
          </p>
          <NavLink
            to="/register"
            className="inline-block mt-6 px-6 py-3 rounded-lg bg-black text-white hover:bg-neutral-900 cursor-pointer"
          >
            Create Free Account
          </NavLink>
          <p className="mt-2 text-sm">
            No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="about"
        className="bg-[var(--color-bgSecondary)] border-t border-[var(--color-borderDefault)]"
      >
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Product</h4>
            <a
              href="#features"
              className="block text-[var(--color-textSecondary)] hover:text-[var(--color-accentFocus)]"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="block text-[var(--color-textSecondary)] hover:text-[var(--color-accentFocus)]"
            >
              Pricing
            </a>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <p className="text-[var(--color-textSecondary)]">About</p>
            <p className="text-[var(--color-textSecondary)]">Blog</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Resources</h4>
            <p className="text-[var(--color-textSecondary)]">Help Center</p>
            <p className="text-[var(--color-textSecondary)]">Status</p>
            <p className="text-[var(--color-textSecondary)]">Terms</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Subscribe</h4>
            <p className="text-[var(--color-textSecondary)]">
              Updates coming soon
            </p>
          </div>
        </div>

        <div className="border-t border-[var(--color-borderDefault)] py-4 text-center text-xs text-[var(--color-textSecondary)]">
          © 2025 UVDS · My-Drive. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
