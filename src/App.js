import React, { useState, useEffect, useRef } from 'react';
import './App.css'; // Optional: Include if you have component-specific styles
import { Menu, X, Github, Linkedin, Mail, ChevronDown, Download, ExternalLink, Phone } from 'lucide-react';


// Video Background Component
function VideoBackground({ heroRef, aboutRef }) {
  const [showHeroVideo, setShowHeroVideo] = useState(true);

  useEffect(() => {
    const heroNode = heroRef.current;
    const aboutNode = aboutRef.current;

    const observerOptionsHero = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6,
    };

    const observerOptionsAbout = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0.1,
    };

    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setShowHeroVideo(entry.isIntersecting);
      });
    }, observerOptionsHero);

    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setShowHeroVideo(false);
        }
      });
    }, observerOptionsAbout);

    if (heroNode) heroObserver.observe(heroNode);
    if (aboutNode) aboutObserver.observe(aboutNode);

    return () => {
      if (heroNode) heroObserver.unobserve(heroNode);
      if (aboutNode) aboutObserver.unobserve(aboutNode);
    };
  }, [heroRef, aboutRef]);

  return (
    <>
      {/* Hero Section Video Background */}
      <div className={`fixed inset-0 w-full h-full -z-10 overflow-hidden ${showHeroVideo ? 'block' : 'hidden'}`}>
        {/* Fallback video for mobile devices (visible by default) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          {...{ 'webkit-playsinline': true }}
          className="w-full h-full object-cover object-[35%_50%] sm:object-center"
          src="/background1.mp4"
          style={{ backgroundColor: '#1F2937' }}
        >
          <source src="/background1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Video for larger screens (hidden on mobile) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          {...{ 'webkit-playsinline': true }}
          className="hidden sm:block w-full h-full object-cover object-center md:object-contain"
          src="/background1.mp4"
          style={{ backgroundColor: '#1F2937' }}
        >
          <source src="/background1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Other Sections Video Background */}
      <div className={`fixed inset-0 w-full h-full -z-10 overflow-hidden ${!showHeroVideo ? 'block' : 'hidden'}`}>
        {/* Fallback video for mobile devices (visible by default) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          {...{ 'webkit-playsinline': true }}
          className="w-full h-full object-cover object-[35%_50%] sm:object-center"
          src="/background2.mp4"
          style={{ backgroundColor: '#1F2937' }}
        >
          <source src="/background2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Video for larger screens (hidden on mobile) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          {...{ 'webkit-playsinline': true }}
          className="hidden sm:block w-full h-full object-cover object-center md:object-contain"
          src="/background2.mp4"
          style={{ backgroundColor: '#1F2937' }}
        >
          <source src="/background2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
}

// Root component
function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 300;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-sans text-gray-100 bg-transparent min-h-[100dvh] relative">
      <VideoBackground heroRef={heroRef} aboutRef={aboutRef} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-black/40 via-purple-900/20 to-black/40 backdrop-blur-3xl border-b border-gradient-to-r from-purple-400/30 via-purple-300/20 to-pink-400/30 shadow-2xl shadow-purple-500/10 transition-all duration-700 hover:shadow-purple-500/20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-transparent to-pink-600/5 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Logo */}
            <div className="flex-shrink-0 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-all duration-700 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative font-bold text-3xl text-white hover:text-purple-200 transition-all duration-700 transform group-hover:scale-110 px-4 py-3 rounded-2xl border border-transparent group-hover:border-purple-400/30">
                  <span className="drop-shadow-2xl">Amir Aijaz</span>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            </div>

            {/* Enhanced Desktop Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-2">
                {['home', 'about', 'projects', 'experience', 'skills', 'education', 'contact'].map((section, index) => (
                  <div key={section} className="relative group">
                    <button
                      onClick={() => scrollToSection(section)}
                      className={`relative px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-700 transform hover:scale-110 hover:-translate-y-2 hover:rotate-1 ${activeSection === section
                        ? 'text-white bg-gradient-to-r from-purple-600/50 to-pink-600/50 backdrop-blur-lg shadow-2xl border border-purple-400/40 shadow-purple-500/30'
                        : 'text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-pink-600/30 hover:backdrop-blur-lg hover:shadow-xl hover:border hover:border-purple-400/30'
                        }`}
                      style={{
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                      <span className="relative z-10 drop-shadow-lg">{section.charAt(0).toUpperCase() + section.slice(1)}</span>
                      {activeSection === section && (
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl animate-pulse"></div>
                      )}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-500 rounded-full shadow-lg shadow-purple-500/50"></div>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-3/4 transition-all duration-700 delay-100 rounded-full opacity-60"></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Mobile menu button */}
            <div className="md:hidden">
              <button
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`relative p-4 rounded-2xl text-gray-300 hover:text-white focus:outline-none transition-all duration-700 transform hover:scale-125 hover:rotate-180 border border-transparent hover:border-purple-400/40 ${isMenuOpen
                  ? 'bg-gradient-to-r from-purple-600/40 to-pink-600/40 text-white rotate-180 scale-125 shadow-2xl shadow-purple-500/30'
                  : 'hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-pink-600/30 hover:shadow-xl hover:shadow-purple-500/20'
                  }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 hover:opacity-25 transition-opacity duration-500 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-2xl opacity-0 hover:opacity-100 transition-all duration-300"></div>
                <div className="relative z-10 drop-shadow-lg">
                  {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Navigation Links */}
        {isMenuOpen && (
          <div className="md:hidden bg-gradient-to-br from-purple-900/70 via-indigo-900/60 to-pink-900/70 backdrop-blur-3xl border-t border-gradient-to-r from-purple-400/50 to-pink-400/50 animate-slideDown shadow-2xl shadow-purple-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 animate-pulse"></div>
            <div className="px-6 pt-8 pb-10 space-y-4 relative">
              {['home', 'about', 'projects', 'experience', 'skills', 'education', 'contact'].map((section, index) => (
                <div key={section} className="relative group">
                  <button
                    onClick={() => scrollToSection(section)}
                    className={`relative block w-full text-left px-8 py-5 rounded-2xl text-lg font-semibold transition-all duration-700 transform hover:scale-105 hover:translate-x-3 hover:-rotate-1 ${activeSection === section
                      ? 'text-white bg-gradient-to-r from-purple-500/60 to-pink-500/60 backdrop-blur-lg shadow-2xl border border-purple-400/50 shadow-purple-500/40'
                      : 'text-gray-100 hover:text-white hover:bg-gradient-to-r hover:from-purple-500/40 hover:to-pink-500/40 hover:backdrop-blur-lg hover:shadow-xl border border-transparent hover:border-purple-400/40'
                      }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: `slideInLeft 0.6s ease-out ${index * 100}ms both`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                    <div className="flex items-center justify-between">
                      <span className="relative z-10 drop-shadow-lg">
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </span>
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-150 shadow-lg shadow-purple-500/60 animate-pulse"></div>
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500 group-hover:w-4/5 transition-all duration-500 rounded-full shadow-lg shadow-purple-500/50"></div>
                    {activeSection === section && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-pink-500/20 rounded-2xl opacity-100 animate-pulse"></div>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        <section ref={heroRef}>
          <HeroSection scrollToProjects={() => scrollToSection('projects')} />
        </section>
        <section ref={aboutRef}>
          <AboutSection />
        </section>
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-xl py-16 border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-500/3 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Contact Info */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <Mail size={16} />
                  amirejaz790@gmail.com
                </p>
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <Phone size={16} />
                  +923233232974
                </p>
                <p className="text-sm">Available for freelance opportunities</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
              <div className="flex flex-col space-y-2">
                <button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-white transition-colors duration-300">About</button>
                <button onClick={() => scrollToSection('projects')} className="text-gray-400 hover:text-white transition-colors duration-300">Projects</button>
                <button onClick={() => scrollToSection('experience')} className="text-gray-400 hover:text-white transition-colors duration-300">Experience</button>
                <button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-white transition-colors duration-300">Contact</button>
              </div>
            </div>

            {/* Social Links */}
            <div className="text-center md:text-right">
              <h3 className="text-xl font-semibold text-white mb-4">Connect</h3>
              <div className="flex justify-center md:justify-end space-x-4">
                <a
                  href="https://github.com/amiraijaz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10 hover:scale-110 hover:shadow-lg"
                >
                  <Github size={20} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
                <a
                  href="https://www.linkedin.com/in/amir-aijaz-01a134233"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10 hover:scale-110 hover:shadow-lg"
                >
                  <Linkedin size={20} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
                <a
                  href="mailto:amirejaz790@gmail.com"
                  className="group p-3 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10 hover:scale-110 hover:shadow-lg"
                >
                  <Mail size={20} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} <span className="text-white font-semibold">Amir Aijaz</span>. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Hero Section
function HeroSection({ scrollToProjects }) {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="text-center max-w-4xl mx-auto animate-fadeInUp">
        <div className="mb-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-2">
            <span className="text-white">Amir </span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Aijaz</span>
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent flex-1 max-w-20"></div>
            <h2 className="text-xl md:text-2xl font-medium text-purple-300 px-4">
              AI Engineer
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent flex-1 max-w-20"></div>
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
            Helping businesses scale faster with <span className="text-purple-300 font-medium">AI-driven automation</span> — cutting costs by up to 70% while boosting efficiency and growth
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={scrollToProjects}
            className="group px-8 py-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm hover:from-purple-600/30 hover:to-pink-600/30 rounded-xl font-semibold text-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-purple-500/30 hover:border-purple-400/50"
          >
            <span>Explore My Work</span>
            <ChevronDown size={20} className="ml-2 group-hover:translate-y-1 transition-transform duration-300" />
          </button>
          <button
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gray-800/50 hover:bg-white/10 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 border border-gray-600/50 hover:border-white/30 backdrop-blur-sm shadow-lg hover:shadow-xl"
          >
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/10 backdrop-blur-sm relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 to-gray-400/5"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gray-300/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-5xl font-bold mb-16 text-center text-white">
          About Me
        </h2>
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/3 flex justify-center">
            <div className="relative group">
              <div className="w-72 h-72 rounded-full bg-white/5 border-2 border-white/20 flex items-center justify-center overflow-hidden shadow-2xl transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                <img
                  src="/images/profile.jpeg"
                  alt="Profile"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
          <div className="lg:w-2/3 text-center lg:text-left">
            <p className="text-lg mb-6 text-gray-300 leading-relaxed">
              I am an AI Engineer who specializes in transforming traditional agencies into AI-powered organizations, delivering significant cost savings and operational efficiency. With expertise in computer vision, NLP, LLM integrations, and generative AI solutions, I help businesses automate their workflows and scale their operations using cutting-edge AI technologies.
            </p>
            <p className="text-lg mb-6 text-gray-300 leading-relaxed">
              My core strength lies in designing end-to-end automation systems that revolutionize how agencies operate. From building local LLM systems for content creation to developing AI-powered chatbots for lead generation, I create comprehensive AI solutions that reduce operational costs while enhancing productivity. I leverage Python, React, Flask, Django, PyTorch, and LangChain to build and deploy scalable AI applications on cloud platforms like AWS and Firebase.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
              <a
                href="/resume/Amir_Aijaz_CV.pdf"
                download="Amir Aijaz - CV.pdf"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium text-white flex items-center justify-center transition-transform transform hover:scale-105"
              >
                <Download size={18} className="mr-2" />
                Download Resume
              </a>
              <button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-white flex items-center justify-center transition-transform transform hover:scale-105"
              >
                <Mail size={18} className="mr-2" />
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Projects Section
function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const projects = [
    {
      id: 1,
      title: "Legal Mind AI Assistant",
      description: "An AI-powered legal research platform that supercharges legal research with intelligent document analysis. Upload contracts, case files, and legal documents to ask questions in plain English and get precise, cited answers in seconds. Features include document processing, natural language querying, and accurate legal information retrieval with 99.9% accuracy.",
      technologies: ["React", "AI/ML", "Natural Language Processing", "Document Analysis", "Vercel", "LLM Integration"],
      image: "/images/legal-mind-app.JPG",
      category: "AI & ML",
      liveDemo: "https://legal-mind-ai-assistant.vercel.app/"
    },
    {
      id: 2,
      title: "AI Resume Builder & Optimizer",
      description: "Transform your career with AI-crafted resumes that land interviews. Our AI analyzes job descriptions, matches your skills, and generates tailored resumes that get you noticed. Features include intelligent resume optimization, ATS score analysis, free forever plan, and ATS-optimized formatting to beat applicant tracking systems.",
      technologies: ["React", "AI/ML", "Natural Language Processing", "Job Matching", "Vercel", "OpenAI API"],
      image: "/images/ai-resume-builder.JPG",
      category: "AI & ML",
      liveDemo: "https://ai-resume-builder-optimizer.vercel.app/"
    },
    {
      id: 3,
      title: "HR Resume Screening AI Tool",
      description: "An intelligent HR automation system that streamlines the entire recruitment process. Enter job title and requirements to generate AI-powered screening criteria, automatically fetch resumes through email integration, rank candidates using advanced AI matching algorithms, and score resumes based on job fit. Features include multi-candidate selection, automated candidate outreach with customizable email templates, and bulk email capabilities for efficient communication with selected candidates.",
      technologies: ["OpenAI API", "Python", "Email Integration", "Natural Language Processing", "Machine Learning", "Flask", "React", "Automated Workflows"],
      image: "/images/home.JPG",
      category: "Agency Transformation",
      github: "https://github.com/amiraijaz/hr-resume-screening-ai"
    },
    {
      id: 4,
      title: "Multi-Model LLM System",
      description: "A comprehensive Large Language Model platform featuring multiple AI models including GPT-4, Claude, Gemini, and LLaMA. Provides unified interface for accessing different LLM capabilities, model comparison features, and optimized performance for various use cases. Supports text generation, conversation, code assistance, and specialized tasks across different model architectures with seamless switching and performance analytics.",
      technologies: ["GPT-4", "Claude", "Gemini", "LLaMA", "OpenAI API", "Anthropic API", "Google AI", "Python", "FastAPI", "React", "Model Optimization"],
      image: "/images/llm.jpg",
      category: "AI & ML",
      github: "https://github.com/amiraijaz/multi-model-llm-system"
    },
    {
      id: 5,
      title: "Realtime Face Recognition Attendance System",
      description: "Developed a real-time facial recognition system for automated attendance tracking. The system uses high-accuracy face recognition to mark attendance under varying lighting conditions, integrating with Firebase for secure data storage and real-time updates. Features include a web interface for course selection, live video processing with visual feedback, and downloadable Excel reports for attendance records.",
      technologies: ["OpenCV", "Firebase", "Python", "Face Recognition", "Flask", "React", "Axios", "FaceNet"],
      image: "/images/faceAttendance.JPG",
      category: "Computer Vision",
      github: "https://github.com/amiraijaz/Realtime-FaceRecognition-Attendance-System"
    },
    {
      id: 6,
      title: "AI Medical Chatbot (with Vision and Voice)",
      description: "Multimodal medical assistant that can analyze medical images, answer health questions, and provide voice interactions using LLMs and computer vision.",
      technologies: ["LLaMA 3", "OpenAI API", "Computer Vision", "Speech Recognition", "Flask"],
      image: "/images/medChatbot.png",
      category: "AI Healthcare",
      github: "https://github.com/amiraijaz/Medical-Chatbot"
    },
    {
      id: 7,
      title: "Gesture-Based Calculator",
      description: "A real-time hand gesture recognition system that allows users to perform basic arithmetic operations (addition, subtraction, multiplication, division) using finger movements. The calculator interface is displayed on-screen, with buttons selectable via index finger and thumb proximity, processed through a webcam feed for seamless interaction.",
      technologies: ["MediaPipe", "Python", "OpenCV", "CVZone"],
      image: "/images/calculator.JPG",
      category: "Computer Vision",
      github: "https://github.com/amiraijaz/Gesture-Based-Calculator"
    },
    {
      id: 8,
      title: "UK License Plate Recognition using OCR",
      description: "A real-time detection and recognition system tailored for UK license plates. Utilizes YOLOv8 to detect vehicles and isolate license plates with high accuracy, followed by OCR to extract plate numbers. Features include vehicle tracking, zoomed-in plate visualization, and CSV output for detection results, ensuring efficient processing of video streams under various conditions.",
      technologies: ["YOLOv8", "OpenCV", "Tesseract OCR", "SORT Algorithm", "NumPy", "Python"],
      image: "/images/licensePlate.jpg",
      category: "Computer Vision",
      github: "https://github.com/amiraijaz/UK-License-Plate-Detection"
    },
    {
      id: 9,
      title: "Text-to-SQL System using LLaMA 3",
      description: "A Streamlit-based web application that converts natural language questions into SQL queries using Groq’s LLaMA 3 model. The system queries a local SQLite database (student.db) in real-time, delivering results through an intuitive UI. Features secure API key management with .env and seamless interaction for users to explore data effortlessly.",
      technologies: ["LLaMA 3", "Groq API", "LangChain", "Streamlit", "SQLite", "Python-dotenv", "Python"],
      image: "/images/tts.JPG",
      category: "Natural Language Processing",
      github: "https://github.com/amiraijaz/Text-To-SQL-"
    },
    {
      id: 10,
      title: "Visual Question Answering with ViLT",
      description: "A Visual Question Answering (VQA) system powered by the ViLT model (dandelin/vilt-b32-finetuned-vqa), deployed through a user-friendly Streamlit web app. Users can upload JPG/PNG images and ask natural language questions, receiving real-time AI-generated answers based on advanced image-text understanding.",
      technologies: ["ViLT", "Hugging Face Transformers", "Streamlit", "PyTorch", "Python"],
      image: "/images/ViLT.jpg",
      category: "Vision and Language",
      github: "https://github.com/amiraijaz/Visual-Question-Answering-System"
    },
    {
      id: 11,
      title: "Sign Language Translator",
      description: "A real-time sign language recognition system that interprets gestures using MediaPipe Holistic for keypoint detection (face, pose, hands) and an LSTM neural network for classifying custom gestures like “Good morning” and “How are you”. Features include video capture, dynamic dataset organization, and sequence data preparation, with an extensible framework for adding new signs.",
      technologies: ["MediaPipe", "TensorFlow", "Keras", "OpenCV", "NumPy", "Matplotlib", "Python"],
      image: "/images/signLanguage.JPG",
      category: "Computer Vision",
      github: "https://github.com/amiraijaz/Sign-Language-Translator"
    },
    {
      id: 12,
      title: "YouTube to Blog & Podcast Generator",
      description: "An automated system that transforms YouTube videos into blog posts and podcasts. It fetches video transcripts, generates summarized blogs and keywords using AI, processes audio for podcasts, and uploads content to Google Drive while saving metadata to Google Sheets. The system ensures efficiency by skipping previously processed videos, with robust logging for debugging.",
      technologies: ["OpenAI API", "YouTubeTranscriptApi", "yt-dlp", "pydub", "gspread", "Google Drive API", "Pydantic", "Python"],
      image: "/images/youtubeContent.JPG",
      category: "Content Automation",
      github: "https://github.com/amiraijaz/youtube-to-blog-podcast"
    },
    {
      id: 13,
      title: "AI-Generated Newsletter",
      description: "A Django-based system that generates professional, location-specific newsletters in an Axios-style format, powered by Anthropic’s Claude model. It fetches recent articles via the Perplexity API, curates content across topics like real estate, events, and dining, and structures output in HTML with introductions, fun facts, and conclusions. Features include dynamic topic selection, verified data from the past week, and Realtor-focused insights for community engagement.",
      technologies: ["Claude API", "Perplexity API", "Django", "Python", "Pydantic", "Requests", "HTML"],
      image: "/images/ai newsletter.JPG",
      category: "Content Automation",
      github: "https://github.com/amiraijaz/ai-newsletter"
    },
    {
      id: 14,
      title: "Plaque Segmentation",
      description: "A medical imaging system that uses YOLOv8 to segment arterial plaque in ultrasound images with high precision. It processes images in real-time, annotates plaque regions with confidence scores, and supports visualization of results, aiding in cardiovascular diagnostics.",
      technologies: ["YOLOv8", "PyTorch", "OpenCV", "NumPy", "Matplotlib", "Python"],
      image: "/images/plaqueSegment.png",
      category: "Medical AI",
      github: "https://github.com/amiraijaz/Plaque-Segmentation"
    },
    {
      id: 15,
      title: "Fog Removal for Autonomous Vehicles",
      description: "A Streamlit-based computer vision system that enhances visibility in foggy conditions for autonomous vehicles. It uses YOLOv8 for object detection (pedestrians, cars, trucks, signals) and advanced preprocessing techniques like dark channel prior and CLAHE to dehaze video frames in real-time.",
      technologies: ["YOLOv8", "OpenCV", "Streamlit", "PyTorch", "NumPy", "Python"],
      image: "/images/fog.jpg",
      category: "Computer Vision",
      github: "https://github.com/amiraijaz/Fog-Removal-for-Autonomous-Vehicles"
    },
    {
      id: 16,
      title: "Instagram Agent",
      description: "An AI-powered automation system built with CrewAI to create and manage Instagram content. It conducts market research, strategizes content, generates visuals, and writes captions, streamlining social media engagement with a sequential task workflow.",
      technologies: ["CrewAI", "LangChain", "Python", "Serper API", "WebBaseLoader"],
      image: "/images/agentInsta.jpg",
      category: "Automation",
      github: "https://github.com/amiraijaz/Insta-Agent"
    }
  ];

  const categories = ["All", ...new Set(projects.map(project => project.category))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(project => project.category === activeCategory);

  const displayedProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="border-b-2 border-purple-400 pb-2">My Projects</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setShowAllProjects(false);
              }}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${activeCategory === category
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 border border-gray-600 hover:border-purple-500/50'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {displayedProjects.map(project => (
            <div
              key={project.id}
              className="group bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 transition-all duration-700 transform hover:scale-[1.03] hover:shadow-2xl hover:shadow-purple-500/25 hover:border-purple-400/50 hover:bg-white/10 relative flex flex-col h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative overflow-hidden flex-shrink-0">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="p-8 relative z-10 flex flex-col h-full">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-gray-100 transition-colors duration-500">{project.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map(tech => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-gray-700/80 hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-pink-600/30 rounded-full text-xs font-medium text-gray-300 hover:text-white transition-all duration-500 border border-gray-600/30 hover:border-purple-500/60 backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center lg:justify-start mt-auto">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl text-white font-semibold transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 group/btn"
                  >
                    View Details
                    <ExternalLink size={16} className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length > 6 && !showAllProjects && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAllProjects(true)}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl text-white font-semibold text-lg flex items-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:shadow-xl"
            >
              View More Projects
              <ChevronDown size={20} />
            </button>
          </div>
        )}

        {selectedProject && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={() => setSelectedProject(null)}>
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-2xl rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/20 shadow-2xl shadow-purple-500/10" onClick={(e) => e.stopPropagation()}>
              {/* Decorative gradient orbs */}
              <div className="absolute top-0 left-0 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

              <div className="p-8 relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{selectedProject.title}</h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-xl text-gray-400 hover:text-white transition-all duration-300 hover:bg-white/10 hover:scale-110 border border-transparent hover:border-white/20"
                    aria-label="Close modal"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="relative rounded-xl overflow-hidden mb-6">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">{selectedProject.description}</p>
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-white">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map(tech => (
                      <span
                        key={tech}
                        className="px-4 py-1.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full text-sm text-purple-200 backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/40 rounded-xl text-purple-300 hover:text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10"
                    >
                      <Github size={18} />
                      View Code
                    </a>
                  )}
                  {selectedProject.liveDemo && (
                    <a
                      href={selectedProject.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600/30 to-pink-600/30 hover:from-purple-600/50 hover:to-pink-600/50 border border-purple-500/30 hover:border-purple-400/50 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="ml-auto px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl font-medium text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

const ExperienceSection = () => {
  const experiences = [
    {
      company: "Viraltech",
      position: "AI Engineer",
      period: "01-Sept-2025 - Present",
      description: [
        "Designed architecture and implemented an e-commerce chatbot with cost-optimized infrastructure.",
        "Conducted research on new LLMs, analyzing capabilities and inference cost metrics.",
        "Developed n8n workflows, including an email-to-CSV newsletter summarizer and a Telegram-based image generator using Nano Banana.",
        "Built an AI-based chat system called Knowlyst where users can submit web/video links; the system scrapes, stores, and enables question-answering on the content.",
        "Managed project tasks and workflows using ClickUp.",
        "Created AI-driven video generation workflows for ad content production."
      ]
    },
    {
      company: "SavTech Digital",
      position: "AI Engineer",
      period: "01-May-2025 - 31-August-2025",
      description: [
        "Built a local LLM, similar to ChatGPT, for content and social media management.",
        "Developed AI tools including text-to-image generation, HR screening automation, and lead-generating agents.",
        "Cleaned and analyzed geospatial and business data from major companies like CBL and EBM.",
        "Deployed chatbots and AI solutions to drive agency-wide AI transformation."
      ]
    },
    {
      company: "Codenexo",
      position: "Jr. AI Engineer",
      period: "01-January-2025 - 30-April-2025",
      description: [
        "Developed AI tools for newsletter/blog generation using Claude API, Flask, and YouTube data.",
        "Automated workflows via Asana and deployed scalable apps on AWS.",
        "Built internal tools for content automation and team productivity with LLMs and prompt engineering."
      ]
    },
    {
      company: "The Disrupt Labs",
      position: "Python and Computer Vision Development",
      period: "01-June-2024 - 1-October-2024",
      description: [
        "Researched and Developed Python Scripts to measure 2D object distances in warehouses.",
        "Applied open-source depth estimation models to real-time CCTV feeds."
      ]
    },
    {
      company: "Smart City Lab (NCAI)",
      position: "Artificial Intelligence & NLP",
      period: "15-December-2023 - 31-May-2024",
      description: [
        "Built an NLP driven Arabic Medical chatbot.",
        "Benchmarked speech models (Whisper, Wav2Vec) to evaluate transcription accuracy for Urdu."
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-md">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">
          Work Experience
        </h2>
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-8">
              {/* Timeline Dot and Line */}
              <div className="absolute w-5 h-5 bg-purple-500 rounded-full left-0 top-1 border-4 border-white/20"></div>
              <div className="absolute w-0.5 bg-purple-500 left-2 top-8 bottom-0"></div>

              {/* Experience Card */}
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/20 hover:shadow-lg hover:shadow-purple-500/25 hover:bg-white/10 hover:border-purple-400/50 transition-all duration-500">
                <h3 className="text-2xl font-semibold text-white mb-1">{exp.position}</h3>
                <h4 className="text-lg font-medium text-purple-400 mb-2">{exp.company}</h4>
                <p className="text-sm text-gray-300 mb-4">{exp.period}</p>
                <ul className="space-y-3 text-gray-200">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-purple-400">•</span>
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillsSection = () => {
  const skillCategories = [
    {
      name: "Agency Transformation",
      skills: [
        { name: "AI-Powered Automation", level: 95 },
        { name: "Cost Optimization", level: 90 },
        { name: "Workflow Streamlining", level: 90 },
        { name: "Process Digitization", level: 85 },
        { name: "ROI Maximization", level: 85 },
        { name: "Operational Efficiency", level: 90 }
      ]
    },
    {
      name: "AI & ML",
      skills: [
        { name: "Generative AI", level: 90 },
        { name: "Large Language Models", level: 85 },
        { name: "Computer Vision", level: 85 },
        { name: "Natural Language Processing", level: 80 },
        { name: "Chatbots", level: 85 },
        { name: "Deep Learning", level: 80 }
      ]
    },
    {
      name: "Programming",
      skills: [
        { name: "Python", level: 95 },
        { name: "SQL", level: 70 },
        { name: "JavaScript", level: 70 },
        { name: "HTML/CSS", level: 75 },
        { name: "React", level: 60 }
      ]
    },
    {
      name: "Frameworks & Tools",
      skills: [
        { name: "Flask", level: 85 },
        { name: "FastAPI", level: 70 },
        { name: "PyTorch", level: 80 },
        { name: "Django", level: 70 },
        { name: "OpenCV", level: 90 },
        { name: "Streamlit", level: 80 },
        { name: "LangChain", level: 75 },
        { name: "MediaPipe", level: 80 }
      ]
    },
    {
      name: "Cloud & Deployment",
      skills: [
        { name: "AWS", level: 75 },
        { name: "Firebase", level: 70 },
        { name: "API Integration", level: 90 },
        { name: "Real-Time Applications", level: 85 }
      ]
    }
  ];

  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="border-b-2 border-purple-400 pb-2">Skills & Technologies</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {skillCategories.map((category, index) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${activeCategory === index
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 border border-gray-600 hover:border-purple-500/50 backdrop-blur-sm'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto transition-opacity duration-300">
          {skillCategories[activeCategory].skills.map(skill => (
            <div key={skill.name} className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{skill.name}</span>
                <span className="text-purple-400">{skill.level}%</span>
              </div>
              <div className="bg-gray-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-purple-500 h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Education Section
function EducationSection() {
  const education = [
    {
      degree: "Bachelors in Computer Science",
      institution: "University of Karachi",
      period: "2021 - 2024",
      logo: "🎓"
    },
    {
      degree: "Pre-Engineering",
      institution: "Govt. Dehli College",
      period: "2018 - 2020",
      logo: "🎓"
    }
  ];

  const certifications = [
    "AI for Everyone – DeepLearning.ai",
    "Python for Data Science, AI & Development – IBM",
    "Ask Questions to Make Data-Driven Decisions – Google",
    "Foundations of project management - Google",
    "What is Data Science? - IBM",
    "Certifcate of Participation - Procom'23"
  ];

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="border-b-2 border-purple-400 pb-2">Education & Certifications</span>
        </h2>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-semibold mb-6 text-center">Education</h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/20 hover:shadow-lg hover:shadow-purple-500/25 hover:bg-white/10 hover:border-purple-400/50 transition-all duration-500 transform hover:scale-105"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{edu.logo}</div>
                    <div>
                      <h4 className="text-xl font-bold">{edu.degree}</h4>
                      <p className="text-purple-400">{edu.institution}</p>
                      <p className="text-gray-400 text-sm">{edu.period}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2">
            <h3 className="text-2xl font-semibold mb-6 text-center">Certifications</h3>
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/20 hover:bg-white/10 hover:border-purple-400/50 transition-all duration-500">
              <ul className="space-y-4">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      ✓
                    </div>
                    <span className="text-gray-200">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message: string }

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const validate = () => {
    const newErrors = {};
    if (!formState.name) newErrors.name = 'Name is required';
    if (!formState.email || !/\S+@\S+\.\S+/.test(formState.email)) newErrors.email = 'Valid email is required';
    if (!formState.message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    fetch('https://formsubmit.co/ajax/amirejaz790@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: formState.name,
        email: formState.email,
        subject: formState.subject || 'Portfolio Contact',
        message: formState.message,
        _subject: `Portfolio Contact: ${formState.subject || 'New Message'}`,
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          showToast('success', 'Message sent successfully! I\'ll get back to you soon.');
          setFormState({ name: '', email: '', subject: '', message: '' });
          setErrors({});
        } else {
          showToast('error', 'Failed to send message. Please try again later.');
        }
      })
      .catch(() => {
        showToast('error', 'Failed to send message. Please try again later.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-black/10 backdrop-blur-sm relative overflow-hidden">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-[100] animate-slideDown">
          <div className={`relative flex items-center gap-3 px-6 py-4 rounded-2xl border backdrop-blur-2xl shadow-2xl min-w-[320px] max-w-[420px] ${
            toast.type === 'success'
              ? 'bg-gradient-to-r from-green-900/90 to-emerald-900/90 border-green-500/30 shadow-green-500/20'
              : 'bg-gradient-to-r from-red-900/90 to-rose-900/90 border-red-500/30 shadow-red-500/20'
          }`}>
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
              toast.type === 'success'
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}>
              {toast.type === 'success' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
              )}
            </div>
            <div className="flex-1">
              <p className={`font-semibold text-sm ${toast.type === 'success' ? 'text-green-300' : 'text-red-300'}`}>
                {toast.type === 'success' ? 'Success!' : 'Error'}
              </p>
              <p className="text-gray-300 text-sm mt-0.5">{toast.message}</p>
            </div>
            <button onClick={() => setToast(null)} className="flex-shrink-0 text-gray-400 hover:text-white transition-colors p-1">
              <X size={16} />
            </button>
            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl overflow-hidden">
              <div className={`h-full rounded-b-2xl ${toast.type === 'success' ? 'bg-green-500/60' : 'bg-red-500/60'}`}
                style={{ animation: 'shrinkWidth 4s linear forwards' }}
              ></div>
            </div>
          </div>
        </div>
      )}
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 to-gray-400/5"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-32 right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-20 w-32 h-32 bg-gray-300/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-5xl font-bold mb-16 text-center text-white">
          Get in Touch
        </h2>
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl shadow-purple-500/10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="group">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-purple-400 transition-colors duration-300">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formState.name}
                onChange={handleChange}
                className="block w-full rounded-xl bg-gray-700/50 border border-gray-600/50 text-white p-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 hover:border-purple-500/50 backdrop-blur-sm"
                disabled={isSubmitting}
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-400 text-sm mt-2 flex items-center gap-1"><span>⚠️</span>{errors.name}</p>}
            </div>
            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-purple-400 transition-colors duration-300">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
                className="block w-full rounded-xl bg-gray-700/50 border border-gray-600/50 text-white p-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 hover:border-purple-500/50 backdrop-blur-sm"
                disabled={isSubmitting}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-400 text-sm mt-2 flex items-center gap-1"><span>⚠️</span>{errors.email}</p>}
            </div>
            <div className="group">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-purple-400 transition-colors duration-300">Subject</label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={formState.subject}
                onChange={handleChange}
                className="block w-full rounded-xl bg-gray-700/50 border border-gray-600/50 text-white p-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 hover:border-purple-500/50 backdrop-blur-sm"
                disabled={isSubmitting}
                placeholder="Enter subject (optional)"
              />
            </div>
            <div className="group">
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-purple-400 transition-colors duration-300">Message</label>
              <textarea
                name="message"
                id="message"
                rows="5"
                value={formState.message}
                onChange={handleChange}
                className="block w-full rounded-xl bg-gray-700/50 border border-gray-600/50 text-white p-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 hover:border-purple-500/50 backdrop-blur-sm resize-none"
                disabled={isSubmitting}
                placeholder="Enter your message"
              ></textarea>
              {errors.message && <p className="text-red-400 text-sm mt-2 flex items-center gap-1"><span>⚠️</span>{errors.message}</p>}
            </div>
            <button
              type="submit"
              className={`w-full px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg ${isSubmitting
                ? 'bg-gradient-to-r from-gray-600 to-gray-700 cursor-not-allowed text-gray-300'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-purple-500/25 hover:shadow-purple-500/40 hover:shadow-xl'
                }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-800/30 backdrop-blur-sm rounded-full border border-gray-700/50">
            <Phone size={20} className="text-purple-400" />
            <span className="text-gray-300 font-medium">Cell: +923233232974</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Export the Portfolio component as default
export default Portfolio;
