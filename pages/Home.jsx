import { NavLink } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import {
  IoCloudUploadOutline,
  IoShieldCheckmarkOutline,
  IoSpeedometerOutline,
  IoTrashOutline,
} from "react-icons/io5";
import {
  FaAws,
  FaBolt,
  FaCheckCircle,
  FaCloudUploadAlt,
  FaCogs,
  FaCrown,
  FaGoogle,
  FaNodeJs,
  FaReact,
  FaStar,
  FaUsers,
} from "react-icons/fa";
import {
  SiGithubactions,
  SiMongodb,
  SiRedis,
  SiTailwindcss,
} from "react-icons/si";

export default function Home() {
  const techStack = [
    {
      icon: <FaReact />,
      name: "React 19",
      desc: "Latest React with concurrent features for ultra-responsive UI",
    },
    {
      icon: <FaNodeJs />,
      name: "Node.js + Express",
      desc: "High-performance backend with Express 5.1 for API routing",
    },
    {
      icon: <SiMongodb />,
      name: "MongoDB + Mongoose",
      desc: "NoSQL database with Mongoose ODM for data modeling",
    },
    {
      icon: <SiRedis />,
      name: "Redis",
      desc: "In-memory caching for session management and performance",
    },
    {
      icon: <FaAws />,
      name: "AWS S3 & CloudFront",
      desc: "Secure file storage with global CDN distribution",
    },
    {
      icon: <FaGoogle />,
      name: "Google OAuth 2.0",
      desc: "Secure authentication via Google Identity Services",
    },
    {
      icon: <SiTailwindcss />,
      name: "Tailwind CSS 4",
      desc: "Utility-first CSS for rapid, responsive UI development",
    },
    {
      icon: <SiGithubactions />,
      name: "GitHub Actions",
      desc: "Automated CI/CD pipelines for seamless deployment",
    },
  ];
  return (
    <div className="font-google bg-bgPrimary text-textPrimary scroll-smooth font-medium">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-bgSecondary/95 backdrop-blur-md border-b border-borderDefault shadow-2xl">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-2.5 text-2xl font-bold">
            <IoCloudUploadOutline className="text-accentFocus text-2xl" />
            <span className="text-textPrimary">UVDS</span>
            <span className="text-textSecondary font-semibold">· My-Drive</span>
          </div>

          <div className="hidden md:flex gap-8 text-md">
            <a
              href="#features"
              className="text-textSecondary hover:text-accentFocus transition-colors duration-200 font-medium cursor-pointer"
            >
              Features
            </a>
            <a
              href="#how"
              className="text-textSecondary hover:text-accentFocus transition-colors duration-200 font-medium cursor-pointer"
            >
              How it Works
            </a>
            <a
              href="#pricing"
              className="text-textSecondary hover:text-accentFocus transition-colors duration-200 font-medium cursor-pointer"
            >
              Pricing
            </a>
            <NavLink
              to="/about"
              className="text-textSecondary hover:text-accentFocus transition-colors duration-200 font-medium cursor-pointer"
            >
              About
            </NavLink>
          </div>

          <NavLink
            to="/register"
            className="px-6 py-2.5 rounded-xl bg-accentPrimary text-black text-md font-bold hover:bg-accentHover cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            Get Started <FaBolt className="inline ml-1.5 text-md" />
          </NavLink>
        </nav>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center space-y-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight tracking-tight">
          Secure Cloud Storage{" "}
          <span className="block sm:inline">
            for the <span className="text-accentFocus">Modern Web</span>
          </span>
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-textSecondary leading-relaxed font-medium">
          Store, share, and manage your files with enterprise-grade security and
          lightning-fast access — your personal vault in the cloud.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-5">
          <NavLink
            to="/register"
            className="w-full sm:w-auto px-10 py-4 rounded-xl bg-accentPrimary text-black font-bold hover:bg-accentHover cursor-pointer transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95 text-center group"
          >
            Get Started{" "}
            <FaBolt className="inline ml-2 group-hover:animate-pulse" />
          </NavLink>
          <NavLink
            to="/login"
            className="w-full sm:w-auto px-10 py-4 rounded-xl border-2 border-borderHover bg-transparent hover:border-accentFocus hover:bg-bgElevated/60 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 text-center font-semibold group"
          >
            Login{" "}
            <BiLogIn className="inline ml-2 text-accentFocus/70 text-2xl" />
          </NavLink>
        </div>
      </section>

      {/* UVDS Letters Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-14">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black">
            Why Choose <span className="text-accentFocus">UVDS</span>?
          </h2>
          <p className="text-base sm:text-lg text-textSecondary max-w-3xl mx-auto font-medium">
            Every letter in our name represents a core feature that powers your
            file management
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              letter: "U",
              title: "Upload",
              desc: "Secure, encrypted cloud uploads",
              color: "text-accentPrimary",
              Icon: IoCloudUploadOutline,
            },
            {
              letter: "V",
              title: " View",
              desc: "Instant preview without downloads",
              color: "text-info",
              Icon: FaCloudUploadAlt,
            },
            {
              letter: "D",
              title: "Download",
              desc: "High-speed global CDN access",
              color: "text-success",
              Icon: FaBolt,
            },
            {
              letter: "S",
              title: "Share",
              desc: "Secure links with expiry control",
              color: "text-warning",
              Icon: FaUsers,
            },
          ].map((item) => (
            <div
              key={item.letter}
              className="group p-7 rounded-2xl bg-bgElevated border border-borderHover hover:border-borderActive transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="flex items-start gap-5">
                <div
                  className={`text-5xl font-black ${item.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  {item.letter}
                </div>
                <div className="pt-1">
                  <h3
                    className={`text-lg font-bold group-hover:${item.color} transition-colors`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-md text-textSecondary mt-1 font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-16"
      >
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black">Powerful Features</h2>
          <p className="text-lg text-textSecondary max-w-3xl mx-auto font-medium">
            Designed for security, performance, and complete control
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {[
            {
              icon: <IoShieldCheckmarkOutline />,
              title: "Enterprise Security",
              desc: "OAuth, 2FA, encrypted storage, and zero-trust access.",
              accent: "text-accentFocus",
            },
            {
              icon: <FaCloudUploadAlt />,
              title: "Smart Management",
              desc: "Upload any file, organize, search, and preview instantly.",
              accent: "text-accentPrimary",
            },
            {
              icon: <IoSpeedometerOutline />,
              title: "Cloud Integration",
              desc: "Optimized global delivery with AWS S3 and CloudFront.",
              accent: "text-info",
            },
            {
              icon: <FaUsers />,
              title: "Advanced Sharing",
              desc: "Granular permissions, secure links, and access tracking.",
              accent: "text-warning",
            },
            {
              icon: <FaCogs />,
              title: "Admin Controls",
              desc: "Monitor usage, manage users, and enforce storage policies.",
              accent: "text-textSecondary",
            },
            {
              icon: <FaCheckCircle />,
              title: "High Performance",
              desc: "Low-latency access and fast downloads across regions.",
              accent: "text-success",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="group p-7 rounded-2xl bg-bgElevated border border-borderHover transition-all duration-300 hover:-translate-y-1 hover:border-accentFocus hover:shadow-xl hover:shadow-accentPrimary/10"
            >
              <div className="space-y-6">
                <div
                  className={`text-3xl ${f.accent} group-hover:scale-110 transition-transform duration-300`}
                >
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold group-hover:text-accentFocus transition-colors">
                  {f.title}
                </h3>
                <p className="text-textSecondary text-md leading-relaxed font-medium">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how"
        className="bg-bgSecondary border-y border-borderDefault py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black">How It Works</h2>
            <p className="text-lg text-textSecondary max-w-3xl mx-auto font-medium">
              Get started in three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                step: "01",
                title: "Create an Account",
                desc: "Sign up with OAuth or email. No credit card. Start free instantly.",
                icon: (
                  <FaStar className="text-3xl text-accentFocus mx-auto mb-4" />
                ),
              },
              {
                step: "02",
                title: "Upload Your Files",
                desc: "Drag and drop documents, images, videos. Fast, encrypted uploads.",
                icon: (
                  <IoCloudUploadOutline className="text-3xl text-accentPrimary mx-auto mb-4" />
                ),
              },
              {
                step: "03",
                title: "Share & Access",
                desc: "Generate secure links, set permissions, access files anywhere.",
                icon: <FaUsers className="text-3xl text-info mx-auto mb-4" />,
              },
            ].map((s) => (
              <div key={s.step} className="text-center space-y-6 group">
                <div className="relative inline-flex items-center justify-center w-28 h-28 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-accentPrimary/10 group-hover:bg-accentPrimary/20 transition-colors duration-300"></div>
                  <div className="relative text-5xl font-black text-accentPrimary">
                    {s.step}
                  </div>
                </div>
                {s.icon}
                <h3 className="text-2xl font-bold">{s.title}</h3>
                <p className="text-textSecondary px-2 leading-relaxed text-md font-medium">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          <span className="text-accentFocus">Technology</span> Stack
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((tech, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-bgElevated border border-borderHover hover:border-accentFocus transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="text-3xl text-accentFocus mb-4 group-hover:scale-110 transition-transform duration-300">
                {tech.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-accentFocus transition-colors">
                {tech.name}
              </h3>
              <p className="text-md text-textSecondary font-medium">
                {tech.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-16"
      >
        <div className="text-center space-y-4 font-medium">
          <h2 className="text-3xl sm:text-4xl font-black">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-textSecondary max-w-3xl mx-auto font-medium">
            Flexible plans designed to grow with your needs
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              name: "Free",
              price: "₹0",
              period: "forever",
              badge: "Start Here",
              icon: <FaStar />,
              features: [
                "100 MB secure storage",
                "10 MB/file limit",
                "Basic sharing",
                "Email support",
                "1 device",
              ],
              color: "border-borderHover",
              bg: "bg-bgSecondary",
            },
            {
              name: "Pro",
              price: "₹50",
              period: "per month",
              badge: "Popular",
              icon: <FaBolt />,
              features: [
                "1 GB high-speed storage",
                "100 MB/file limit",
                "Advanced sharing",
                "Priority support",
                "3 devices",
              ],
              color: "border-warning",
              bg: "bg-bgElevated",
            },
            {
              name: "Premium",
              price: "₹500",
              period: "per month",
              badge: "Ultimate",
              icon: <FaCrown />,
              features: [
                "10 GB premium storage",
                "500 MB/file limit",
                "Team collaboration",
                "24/7 phone support",
                "5 devices",
              ],
              color: "border-accentFocus",
              bg: "bg-bgElevated",
            },
          ].map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl border-2 ${p.color} ${p.bg} p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group`}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1.5 rounded-full bg-accentPrimary text-black text-md font-bold uppercase tracking-wide shadow-md">
                  {p.badge}
                </span>
              </div>
              <div className="space-y-8 pt-2">
                <div className="text-center">
                  <div className="inline-block p-3 rounded-full bg-bgPrimary/50 mb-4 text-2xl text-accentFocus">
                    {p.icon}
                  </div>
                  <h3 className="text-3xl font-black text-textPrimary mb-2">
                    {p.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-black text-accentFocus">
                      {p.price}
                    </span>
                    <span className="text-textSecondary font-medium">
                      /{p.period}
                    </span>
                  </div>
                </div>
                <ul className="space-y-4">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-md">
                      <FaCheckCircle className="text-success mt-0.5 shrink-0" />
                      <span className="text-textSecondary font-medium">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-linear-to-br from-accentPrimary to-accentFocus text-black py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <h2 className="text-4xl sm:text-5xl font-black">
            Ready to store your files securely?
          </h2>
          <p className="text-xl opacity-90 font-medium">
            Join thousands who trust UVDS · My-Drive for reliable cloud storage
          </p>
          <div className="space-y-6">
            <NavLink
              to="/register"
              className="inline-block px-12 py-5 rounded-2xl bg-black text-white text-lg font-black hover:bg-neutral-900 cursor-pointer transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95 group"
            >
              Create Free Account{" "}
              <FaBolt className="inline ml-2 group-hover:animate-pulse" />
            </NavLink>
            <p className="text-md opacity-80 font-medium">
              No credit card required • Cancel anytime • Start in 30 seconds
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="about"
        className="bg-bgSecondary border-t border-borderDefault pt-20 pb-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-7">
              <div className="flex items-center gap-3 text-2xl font-bold">
                <IoCloudUploadOutline className="text-accentFocus text-3xl" />
                <span className="text-textPrimary">UVDS</span>
                <span className="text-textSecondary font-semibold">
                  · My-Drive
                </span>
              </div>
              <p className="text-textSecondary max-w-md text-md font-medium">
                Secure cloud storage with enterprise-grade security,
                lightning-fast access, and complete control over your files.
              </p>
            </div>
            <div className="space-y-5">
              <h4 className="text-lg font-bold">Product</h4>
              <div className="space-y-3.5 text-md">
                <a
                  href="#features"
                  className="block text-textSecondary hover:text-accentFocus transition-colors duration-200 cursor-pointer font-medium"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="block text-textSecondary hover:text-accentFocus transition-colors duration-200 cursor-pointer font-medium"
                >
                  Pricing
                </a>
                <NavLink
                  to="/login"
                  className="block text-textSecondary hover:text-accentFocus transition-colors duration-200 cursor-pointer font-medium"
                >
                  Login
                </NavLink>
              </div>
            </div>
            <div className="space-y-5">
              <h4 className="text-lg font-bold">Company</h4>
              <div className="space-y-3.5 text-md text-textSecondary font-medium">
                <p className="cursor-default">About</p>
                <p className="cursor-default">Blog</p>
                <p className="cursor-default">Careers</p>
              </div>
            </div>
            <div className="space-y-5">
              <h4 className="text-lg font-bold">Resources</h4>
              <div className="space-y-3.5 text-md">
                <p className="text-textSecondary cursor-pointer hover:text-accentFocus transition-colors duration-200 font-medium">
                  Help Center
                </p>
                <p className="text-textSecondary cursor-pointer hover:text-accentFocus transition-colors duration-200 font-medium">
                  Status{" "}
                  <IoTrashOutline className="inline ml-1.5 text-md text-warning" />
                </p>
                <p className="text-textSecondary cursor-pointer hover:text-accentFocus transition-colors duration-200 font-medium">
                  Terms
                </p>
                <p className="text-textSecondary cursor-pointer hover:text-accentFocus transition-colors duration-200 font-medium">
                  Privacy
                </p>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-borderDefault text-center">
            <div className="text-md text-textDisabled space-y-1.5">
              <p>© 2025 UVDS · My-Drive. All rights reserved.</p>
              <p>Built with security and performance in mind.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
