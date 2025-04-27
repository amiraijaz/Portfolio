import React, { useState, useEffect, useRef } from 'react';
import './App.css'; // Optional: Include if you have component-specific styles
import { Menu, X, Github, Linkedin, Mail, ChevronDown, Download, ExternalLink, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Video Background Component
function VideoBackground({ heroRef, aboutRef }) {
  const [showHeroVideo, setShowHeroVideo] = useState(true);

  useEffect(() => {
    const observerOptionsHero = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6, // Trigger when 50% of HeroSection is out of view
    };

    const observerOptionsAbout = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Delay trigger until AboutSection is more in view
      threshold: 0.1,
    };

    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        console.log('HeroSection visibility:', entry.isIntersecting);
        setShowHeroVideo(entry.isIntersecting);
      });
    }, observerOptionsHero);

    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        console.log('AboutSection visibility:', entry.isIntersecting);
        if (entry.isIntersecting) {
          setShowHeroVideo(false);
        }
      });
    }, observerOptionsAbout);

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (aboutRef.current) aboutObserver.observe(aboutRef.current);

    return () => {
      if (heroRef.current) heroObserver.unobserve(heroRef.current);
      if (aboutRef.current) aboutObserver.unobserve(aboutRef.current);
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
      <nav className="fixed top-0 w-full z-50 bg-gray-900 bg-opacity-90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 font-bold text-xl text-purple-400">
              Amir Aijaz
            </div>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {['home', 'about', 'projects', 'experience', 'skills', 'education', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                      activeSection === section ? 'text-white bg-purple-600' : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Links */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 bg-opacity-95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['home', 'about', 'projects', 'experience', 'skills', 'education', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    activeSection === section ? 'text-white bg-purple-600' : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
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
      <footer className="bg-gray-900 py-8 text-center text-gray-400 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="https://github.com/amiraijaz" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/amir-aijaz-01a134233" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <Linkedin size={20} />
            </a>
            <a href="mailto:amirejaz790@gmail.com" className="hover:text-white">
              <Mail size={20} />
            </a>
          </div>
          <p>© {new Date().getFullYear()} Amir Aijaz. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// Hero Section
function HeroSection({ scrollToProjects }) {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="text-center max-w-3xl mx-auto animate-fadeInUp">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="text-white">Amir </span>
          <span className="text-purple-400">Aijaz</span>
        </h1>
        <h2 className="text-xl md:text-3xl font-semibold mb-6 text-purple-300">
          AI Engineer
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-100">
          Specializing in computer vision, NLP, LLM integrations, and generative AI solutions
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={scrollToProjects}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium flex items-center justify-center transition-transform transform hover:scale-105"
          >
            View Projects
            <ChevronDown size={20} className="ml-2" />
          </button>
          <button 
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-transform transform hover:scale-105"
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
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">
          About Me
        </h2>
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/3 flex justify-center">
            <div className="w-64 h-64 rounded-full bg-purple-600 bg-opacity-20 border-2 border-purple-400 flex items-center justify-center overflow-hidden">
              <img
                src="/images/profile.jpeg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:w-2/3">
            <p className="text-lg mb-6 text-gray-300 leading-relaxed">
              I am an AI Engineer specializing in computer vision, NLP, LLM integrations, and generative AI solutions. With expertise in Python, React, Flask, Django, Streamlit, PyTorch, and LangChain, I build and deploy AI-powered applications on cloud platforms like AWS and Firebase.
            </p>
            <p className="text-lg mb-6 text-gray-300 leading-relaxed">
              My projects include a real-time face recognition attendance system, a gesture-based calculator, UK license plate recognition using OCR, a text-to-SQL system with LLaMA 3, Visual Question Answering with ViLT, a sign language translator, a YouTube-to-blog-and-podcast generator, an AI-generated newsletter with Claude, plaque segmentation for medical imaging, fog removal for autonomous vehicles, and an AI-driven Instagram agent for content automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a
                href="/resume/Amir Aijaz - AI Engineer.pdf"
                download
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
      title: "Realtime Face Recognition Attendance System",
      description: "Developed a real-time facial recognition system for automated attendance tracking. The system uses high-accuracy face recognition to mark attendance under varying lighting conditions, integrating with Firebase for secure data storage and real-time updates. Features include a web interface for course selection, live video processing with visual feedback, and downloadable Excel reports for attendance records.",
      technologies: ["OpenCV", "Firebase", "Python", "Face Recognition", "Flask", "React", "Axios", "FaceNet"],
      image: "/images/faceAttendance.JPG",
      category: "Computer Vision",
      github: "https://github.com/amiraijaz/Realtime-FaceRecognition-Attendance-System"
    },
    {
      id: 2,
      title: "AI Medical Chatbot (with Vision and Voice)",
      description: "Multimodal medical assistant that can analyze medical images, answer health questions, and provide voice interactions using LLMs and computer vision.",
      technologies: ["LLaMA 3", "OpenAI API", "Computer Vision", "Speech Recognition", "Flask"],
      image: "/images/medChatbot.png",
      category: "AI Healthcare",
      github: "https://github.com/amiraijaz/Medical-Chatbot"
    },
    {
      id: 3,
      title: "Gesture-Based Calculator",
      description: "A real-time hand gesture recognition system that allows users to perform basic arithmetic operations (addition, subtraction, multiplication, division) using finger movements. The calculator interface is displayed on-screen, with buttons selectable via index finger and thumb proximity, processed through a webcam feed for seamless interaction.",
      technologies: ["MediaPipe", "Python", "OpenCV", "CVZone"],
      image: "/images/calculator.JPG",
      category: "Computer Vision",
      github: "https://github.com/amiraijaz/Gesture-Based-Calculator"
    },
    {
      id: 4,
      title: "UK License Plate Recognition using OCR",
      description: "A real-time detection and recognition system tailored for UK license plates. Utilizes YOLOv8 to detect vehicles and isolate license plates with high accuracy, followed by OCR to extract plate numbers. Features include vehicle tracking, zoomed-in plate visualization, and CSV output for detection results, ensuring efficient processing of video streams under various conditions.",
      technologies: ["YOLOv8", "OpenCV", "Tesseract OCR", "SORT Algorithm", "NumPy", "Python"],
      image: "/images/licensePlate.jpg",
      category: "Computer Vision",
      github: "https://github.com/amiraijaz/UK-License-Plate-Detection"
    },
    {
      id: 5,
      title: "Text-to-SQL System using LLaMA 3",
      description: "A Streamlit-based web application that converts natural language questions into SQL queries using Groq’s LLaMA 3 model. The system queries a local SQLite database (student.db) in real-time, delivering results through an intuitive UI. Features secure API key management with .env and seamless interaction for users to explore data effortlessly.",
      technologies: ["LLaMA 3", "Groq API", "LangChain", "Streamlit", "SQLite", "Python-dotenv", "Python"],
      image: "/images/tts.JPG",
      category: "Natural Language Processing",
      github: "https://github.com/amiraijaz/Text-To-SQL-"
    },
    {
      id: 6,
      title: "Visual Question Answering with ViLT",
      description: "A Visual Question Answering (VQA) system powered by the ViLT model (dandelin/vilt-b32-finetuned-vqa), deployed through a user-friendly Streamlit web app. Users can upload JPG/PNG images and ask natural language questions, receiving real-time AI-generated answers based on advanced image-text understanding.",
      technologies: ["ViLT", "Hugging Face Transformers", "Streamlit", "PyTorch", "Python"],
      image: "/images/ViLT.jpg",
      category: "Vision and Language",
      github: "https://github.com/amiraijaz/Visual-Question-Answering-System"
    },
    {
      id: 7,
      title: "Sign Language Translator",
      description: "A real-time sign language recognition system that interprets gestures using MediaPipe Holistic for keypoint detection (face, pose, hands) and an LSTM neural network for classifying custom gestures like “Good morning” and “How are you”. Features include video capture, dynamic dataset organization, and sequence data preparation, with an extensible framework for adding new signs.",
      technologies: ["MediaPipe", "TensorFlow", "Keras", "OpenCV", "NumPy", "Matplotlib", "Python"],
      image: "/images/signLanguage.JPG",
      category: "Computer Vision",
      github: "https://github.com/amiraijaz/Sign-Language-Translator"
    },
    {
      id: 8,
      title: "YouTube to Blog & Podcast Generator",
      description: "An automated system that transforms YouTube videos into blog posts and podcasts. It fetches video transcripts, generates summarized blogs and keywords using AI, processes audio for podcasts, and uploads content to Google Drive while saving metadata to Google Sheets. The system ensures efficiency by skipping previously processed videos, with robust logging for debugging.",
      technologies: ["OpenAI API", "YouTubeTranscriptApi", "yt-dlp", "pydub", "gspread", "Google Drive API", "Pydantic", "Python"],
      image: "/images/youtubeContent.JPG",
      category: "Content Automation",
      github: "https://github.com/amiraijaz/youtube-to-blog-podcast"
    },
    {
      id: 9,
      title: "AI-Generated Newsletter",
      description: "A Django-based system that generates professional, location-specific newsletters in an Axios-style format, powered by Anthropic’s Claude model. It fetches recent articles via the Perplexity API, curates content across topics like real estate, events, and dining, and structures output in HTML with introductions, fun facts, and conclusions. Features include dynamic topic selection, verified data from the past week, and Realtor-focused insights for community engagement.",
      technologies: ["Claude API", "Perplexity API", "Django", "Python", "Pydantic", "Requests", "HTML"],
      image: "/images/ai newsletter.JPG",
      category: "Content Automation",
      github: "https://github.com/amiraijaz/ai-newsletter"
    },
    {
      id: 10,
      title: "Plaque Segmentation",
      description: "A medical imaging system that uses YOLOv8 to segment arterial plaque in ultrasound images with high precision. It processes images in real-time, annotates plaque regions with confidence scores, and supports visualization of results, aiding in cardiovascular diagnostics.",
      technologies: ["YOLOv8", "PyTorch", "OpenCV", "NumPy", "Matplotlib", "Python"],
      image: "/images/plaqueSegment.png",
      category: "Medical AI",
      github: "https://github.com/amiraijaz/Plaque-Segmentation"
    },
    {
      id: 11,
      title: "Fog Removal for Autonomous Vehicles",
      description: "A Streamlit-based computer vision system that enhances visibility in foggy conditions for autonomous vehicles. It uses YOLOv8 for object detection (pedestrians, cars, trucks, signals) and advanced preprocessing techniques like dark channel prior and CLAHE to dehaze video frames in real-time.",
      technologies: ["YOLOv8", "OpenCV", "Streamlit", "PyTorch", "NumPy", "Python"],
      image: "/images/fog.jpg",
      category: "Computer Vision",
      github: "https://github.com/amiraijaz/Fog-Removal-for-Autonomous-Vehicles"
    },
    {
      id: 12,
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
        
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setShowAllProjects(false);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeCategory === category 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedProjects.map(project => (
            <div 
              key={project.id}
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 transition-transform transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                loading="lazy"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map(tech => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 bg-gray-700 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex items-center text-purple-400 hover:text-purple-300 font-medium"
                >
                  View Details
                  <ExternalLink size={16} className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProjects.length > 6 && !showAllProjects && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAllProjects(true)}
              className="px-6 py-3 bg-purple-700 hover:bg-purple-600 rounded-lg text-white font-medium flex items-center gap-2"
            >
              View More Projects
              <ChevronDown size={20} />
            </button>
          </div>
        )}
        
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-white"
                    aria-label="Close modal"
                  >
                    <X size={24} />
                  </button>
                </div>
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full rounded-lg mb-6 h-64 object-cover"
                />
                <p className="text-gray-300 mb-6">{selectedProject.description}</p>
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map(tech => (
                      <span 
                        key={tech} 
                        className="px-3 py-1 bg-purple-600 bg-opacity-20 border border-purple-500 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 font-medium mb-4 block"
                  >
                    View Code on GitHub
                  </a>
                )}
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
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
      company: "Codenexo",
      position: "Jr. AI Engineer",
      period: "Jan 2025 - Present",
      description: [
        "Developed an <span class='text-purple-400'>AI-generated newsletter</span> using prompt engineering and the Claude API.",
        "Built a Flask-based application that generates blogs and podcasts from YouTube videos.",
        "Automated Asana tasks to improve workflow efficiency.",
        "Deployed <span class='text-purple-400'>AI applications on AWS</span> for scalability and performance."
      ]
    },
    {
      company: "The Disrupt Labs",
      position: "Computer Vision Intern",
      period: "Jun 2024 - Oct 2024",
      description: [
        "Developed a 2D object distance measurement system using a single camera for warehouse monitoring.",
        "Implemented and tested <span class='text-purple-400'>depth estimation models</span> to enhance spatial awareness in confined spaces.",
        "Applied computer vision techniques to optimize object placement and logistics in warehouses.",
        "Researched and integrated state-of-the-art computer vision methodologies for real-world industrial applications."
      ]
    },
    {
      company: "Smart City Lab, NCAI",
      position: "AI Intern",
      period: "Dec 2023 - May 2024",
      description: [
        "Developed an <span class='text-purple-400'>NLP-based chatbot</span> in Arabic for medical applications using Python.",
        "Conducted comparative research on speech-to-text technologies (Google Speech, Whisper, Wav2Vec) to evaluate accuracy and performance.",
        "Gained hands-on experience in NLP, speech processing, and computer vision through interdisciplinary projects."
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800 bg-opacity-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">
          Work Experience
        </h2>
        <div className="space-y-12">
          { experiences.map((exp, index) => (
            <div key={index} className="relative pl-8">
              {/* Timeline Dot and Line */}
              <div className="absolute w-5 h-5 bg-purple-500 rounded-full left-0 top-1 border-4 border-gray-700"></div>
              <div className="absolute w-0.5 bg-purple-500 left-2 top-8 bottom-0"></div>
              
              {/* Experience Card */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
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
        
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {skillCategories.map((category, index) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(index)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeCategory === index 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
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
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800 bg-opacity-50">
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
                  className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:shadow-lg hover:shadow-purple-500/10 transition-transform transform hover:scale-105"
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
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
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

    // EmailJS send email
    emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      {
        name: formState.name,
        email: formState.email,
        subject: formState.subject || 'No Subject',
        message: formState.message,
      },
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    )
      .then((response) => {
        console.log('Email sent successfully:', response.status, response.text);
        alert('Message sent successfully!');
        setFormState({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      })
      .catch((err) => {
        console.error('Failed to send email:', err);
        alert('Failed to send message. Please try again later.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="border-b-2 border-purple-400 pb-2">Get in Touch</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formState.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-300 p-3 focus:ring-purple-500 focus:border-purple-500"
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-300 p-3 focus:ring-purple-500 focus:border-purple-500"
              disabled={isSubmitting}
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium">Subject</label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={formState.subject}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-300 p-3 focus:ring-purple-500 focus:border-purple-500"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium">Message</label>
            <textarea
              name="message"
              id="message"
              rows="4"
              value={formState.message}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-300 p-3 focus:ring-purple-500 focus:border-purple-500"
              disabled={isSubmitting}
            ></textarea>
            {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
          </div>
          <button
            type="submit"
            className={`w-full px-6 py-3 rounded-lg font-medium transition-transform transform hover:scale-105 ${
              isSubmitting
                ? 'bg-purple-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        <div className="mt-8 text-center text-gray-400">
          <p className="flex items-center justify-center gap-2">
            <Phone size={18} className="text-purple-400" />
            <span>Cell: +923233232974</span>
          </p>
        </div>
      </div>
    </section>
  );
}

// Export the Portfolio component as default
export default Portfolio;
