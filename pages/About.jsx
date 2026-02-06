import {
  FaAws,
  FaShieldAlt,
  FaRobot,
  FaLock,
  FaBolt,
  FaCloud,
  FaCodeBranch,
  FaReact,
  FaNodeJs,
  FaGoogle,
} from "react-icons/fa";
import {
  SiMongodb,
  SiRedis,
  SiTailwindcss,
  SiGithubactions,
} from "react-icons/si";
import { VscServerProcess } from "react-icons/vsc";
import { IoSpeedometerOutline } from "react-icons/io5"; // Fixed import path

export default function About() {
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

  const features = [
    {
      icon: <FaLock />,
      title: "Military-Grade Security",
      desc: "End-to-end encryption, bcrypt password hashing, and OAuth 2.0 with Google Auth Library",
    },
    {
      icon: <IoSpeedometerOutline />,
      title: "Lightning Performance",
      desc: "React Query for state management, Redis caching, and AWS CloudFront CDN",
    },
    {
      icon: <FaCloud />,
      title: "Cloud-Native Architecture",
      desc: "Built on AWS S3 for storage with presigned URLs via @aws-sdk",
    },
    {
      icon: <FaShieldAlt />,
      title: "Enterprise Validation",
      desc: "Zod schema validation, cookie-parser sessions, and CORS security",
    },
    {
      icon: <FaBolt />,
      title: "Real-Time Processing",
      desc: "Multer for uploads, Resend for email, and MIME type detection",
    },
    {
      icon: <FaCodeBranch />,
      title: "Automated DevOps",
      desc: "GitHub Actions CI/CD for automated testing and deployment pipelines",
    },
  ];

  const pipelineSteps = [
    {
      step: "1",
      title: "Code Push",
      desc: "Triggered on git push to main/master branch",
    },
    {
      step: "2",
      title: "Automated Tests",
      desc: "Run test suites and build verification",
    },
    {
      step: "3",
      title: "Security Scan",
      desc: "Dependency and vulnerability checks",
    },
    {
      step: "4",
      title: "Build & Package",
      desc: "Create production-ready bundles",
    },
    { step: "5", title: "Deploy", desc: "Auto-deploy to cloud infrastructure" },
    {
      step: "6",
      title: "Health Check",
      desc: "Verify deployment and run smoke tests",
    },
  ];

  return (
    <div className="font-google bg-bgPrimary text-textPrimary min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
          Built with <span className="text-accentFocus">Cutting-Edge</span>{" "}
          Technology
        </h1>
        <p className="text-xl text-textSecondary max-w-4xl mx-auto mb-12 font-normal">
          UVDS My-Drive is engineered with a modern tech stack for security,
          scalability, and exceptional performance.
        </p>
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-bgElevated border border-borderDefault">
          <VscServerProcess className="text-accentFocus text-2xl" />
          <span className="font-semibold">
            Full-Stack MERN + AWS Architecture
          </span>
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
              <p className="text-sm text-textSecondary font-normal">
                {tech.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Features */}
      <section className="bg-bgSecondary border-y border-borderDefault py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Enterprise <span className="text-accentFocus">Features</span>
          </h2>
          <p className="text-lg text-textSecondary text-center max-w-3xl mx-auto mb-12 font-normal">
            Powered by industry-leading libraries and cloud services
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, index) => (
              <div
                key={index}
                className="group p-7 rounded-2xl bg-bgElevated border border-borderHover hover:border-accentPrimary transition-all duration-300 hover:shadow-xl"
              >
                <div className="text-3xl text-accentPrimary mb-5 group-hover:scale-110 transition-transform duration-300">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-accentPrimary transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm text-textSecondary font-normal leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CI/CD Pipeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <SiGithubactions className="text-4xl text-accentFocus" />
            <h2 className="text-3xl sm:text-4xl font-bold">
              Automated <span className="text-accentFocus">CI/CD Pipeline</span>
            </h2>
          </div>
          <p className="text-lg text-textSecondary max-w-3xl mx-auto font-normal">
            Zero-downtime deployments with GitHub Actions automating the entire
            development workflow
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-0.5 bg-linear-to-r from-accentPrimary via-accentFocus to-accentPrimary -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
            {pipelineSteps.map((step) => (
              <div key={step.step} className="text-center group">
                <div className="relative inline-flex items-center justify-center w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-accentPrimary/20 group-hover:bg-accentPrimary/30 transition-colors duration-300"></div>
                  <div className="relative text-3xl font-black text-accentPrimary bg-bgPrimary rounded-full w-16 h-16 flex items-center justify-center border-4 border-bgSecondary group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-accentFocus transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-textSecondary font-normal px-2">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-bgElevated border border-borderDefault">
            <FaRobot className="text-2xl text-accentFocus" />
            <div className="text-left">
              <h4 className="font-bold text-lg">Fully Automated Workflow</h4>
              <p className="text-sm text-textSecondary font-normal">
                From code commit to production deployment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-linear-to-br from-bgPrimary via-bgSecondary to-bgElevated py-20 border-t border-borderDefault">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            Experience the <span className="text-accentFocus">Power</span> of
            Modern Development
          </h2>
          <p className="text-lg text-textSecondary max-w-3xl mx-auto mb-10 font-normal">
            UVDS My-Drive combines enterprise security with developer-friendly
            tooling and automated DevOps.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="/"
              className="px-8 py-3.5 rounded-xl bg-accentPrimary text-black font-bold hover:bg-accentHover cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              Explore Features
            </a>
            <a
              href="/register"
              className="px-8 py-3.5 rounded-xl border-2 border-borderHover bg-transparent hover:border-accentFocus hover:bg-bgElevated/50 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 font-semibold"
            >
              Try It Free
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
