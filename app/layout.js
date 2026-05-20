import './globals.css';

const SITE_URL = 'https://portfolio-amiraijaz.vercel.app';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Amir Aijaz - AI Engineer Portfolio',
  description:
    'Amir Aijaz is an AI Engineer specializing in computer vision, NLP, LLM integrations, and generative AI automation. Explore 16+ projects across legal AI, resume building, medical chatbots, and computer vision.',
  authors: [{ name: 'Amir Aijaz' }],
  keywords: [
    'Amir Aijaz',
    'AI Engineer',
    'Computer Vision',
    'NLP',
    'LLM',
    'Generative AI',
    'Machine Learning',
    'Python',
    'Portfolio',
  ],
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.jpg',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  },
  openGraph: {
    type: 'website',
    title: 'Amir Aijaz - AI Engineer Portfolio',
    description:
      'AI Engineer specializing in computer vision, NLP, LLM integrations, and generative AI automation. 16+ projects.',
    url: SITE_URL,
    siteName: 'Amir Aijaz Portfolio',
    images: [{ url: '/logo.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amir Aijaz - AI Engineer Portfolio',
    description:
      'AI Engineer specializing in computer vision, NLP, LLM integrations, and generative AI automation.',
    images: ['/logo.jpg'],
  },
};

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

// Structured data so AI assistants (ChatGPT, Claude, Gemini) and search engines
// can reliably identify who this is and what they do.
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Amir Aijaz',
  jobTitle: 'AI Engineer',
  url: SITE_URL,
  image: `${SITE_URL}/images/profile.jpg`,
  email: 'mailto:amirejaz790@gmail.com',
  telephone: '+923233232974',
  description:
    'AI Engineer specializing in computer vision, NLP, LLM integrations, and generative AI solutions. Helps businesses automate workflows and cut operational costs through AI-driven automation.',
  sameAs: [
    'https://github.com/amiraijaz',
    'https://www.linkedin.com/in/amir-aijaz-01a134233',
  ],
  knowsAbout: [
    'Artificial Intelligence',
    'Computer Vision',
    'Natural Language Processing',
    'Large Language Models',
    'Generative AI',
    'Python',
    'PyTorch',
    'LangChain',
    'OpenCV',
    'Flask',
    'Django',
    'React',
    'AWS',
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'University of Karachi',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        {/*
          Crawler safety net: the live app shows only 6 projects until "View More"
          is clicked, so the rest aren't in the initial DOM. This <noscript> block
          (invisible to normal users — it only renders when JS is disabled) lists
          the full set so AI assistants and search engines see everything.
        */}
        <noscript dangerouslySetInnerHTML={{ __html: noscriptFallback }} />
        {children}
      </body>
    </html>
  );
}

const noscriptFallback = `
  <section>
    <h2>All Projects</h2>
    <ul>
      <li><strong>Legal Mind AI Assistant</strong> &mdash; AI-powered legal research platform with intelligent document analysis and cited answers. (React, NLP, LLM Integration)</li>
      <li><strong>AI Resume Builder &amp; Optimizer</strong> &mdash; AI-crafted, ATS-optimized resumes that match job descriptions. (React, NLP, OpenAI API)</li>
      <li><strong>HR Resume Screening AI Tool</strong> &mdash; Automated recruitment: AI screening criteria, candidate ranking, and outreach. (OpenAI API, Python, Flask, React)</li>
      <li><strong>Multi-Model LLM System</strong> &mdash; Unified interface for GPT-4, Claude, Gemini, and LLaMA with model comparison. (FastAPI, React, Anthropic/Google AI APIs)</li>
      <li><strong>Realtime Face Recognition Attendance System</strong> &mdash; Automated attendance via facial recognition with Firebase. (OpenCV, FaceNet, Flask, React)</li>
      <li><strong>AI Medical Chatbot (Vision &amp; Voice)</strong> &mdash; Multimodal medical assistant analyzing images and answering health questions. (LLaMA 3, Computer Vision, Speech Recognition)</li>
      <li><strong>Gesture-Based Calculator</strong> &mdash; Real-time hand-gesture arithmetic via webcam. (MediaPipe, OpenCV, CVZone)</li>
      <li><strong>UK License Plate Recognition (OCR)</strong> &mdash; YOLOv8 vehicle/plate detection with OCR extraction. (YOLOv8, Tesseract OCR, OpenCV)</li>
      <li><strong>Text-to-SQL System</strong> &mdash; Natural language to SQL using LLaMA 3 and LangChain. (Groq API, Streamlit, SQLite)</li>
      <li><strong>Visual Question Answering with ViLT</strong> &mdash; Image + question answering via the ViLT model. (Hugging Face, PyTorch, Streamlit)</li>
      <li><strong>Sign Language Translator</strong> &mdash; Real-time gesture recognition with MediaPipe Holistic and an LSTM. (TensorFlow, Keras, OpenCV)</li>
      <li><strong>YouTube to Blog &amp; Podcast Generator</strong> &mdash; Turns videos into blogs and podcasts with AI. (OpenAI API, Google Drive API, Python)</li>
      <li><strong>AI-Generated Newsletter</strong> &mdash; Location-specific newsletters powered by Claude and Perplexity. (Claude API, Django)</li>
      <li><strong>Plaque Segmentation</strong> &mdash; YOLOv8 segmentation of arterial plaque in ultrasound images. (YOLOv8, PyTorch, OpenCV)</li>
      <li><strong>Fog Removal for Autonomous Vehicles</strong> &mdash; Dehazing and object detection for foggy driving conditions. (YOLOv8, OpenCV, Streamlit)</li>
      <li><strong>Instagram Agent</strong> &mdash; CrewAI automation for Instagram content research and creation. (CrewAI, LangChain, Python)</li>
    </ul>
    <p><a href="/resume/CV%20-%20Amir%20Aijaz.pdf">Download Amir Aijaz's AI Engineer resume (PDF)</a></p>
  </section>
`;
