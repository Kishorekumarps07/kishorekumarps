
import React from 'react';
import { Brain, Code, Database, Cpu, Globe, Server, Cloud, ShieldCheck } from 'lucide-react';

export const THEME_COLORS = {
  marvelRed: '#E23636',
  spideyBlue: '#0058A8',
  darkBg: '#0F1115',
};

export const SKILL_CATEGORIES = [
  {
    title: 'AI & Neural Link',
    icon: <Brain className="w-6 h-6 text-red-500" />,
    skills: ['Machine Learning', 'NLP', 'Scikit-learn', 'Model Training', 'TF-IDF', 'Feature Engineering']
  },
  {
    title: 'Web-Slinging (FE)',
    icon: <Code className="w-6 h-6 text-blue-500" />,
    skills: ['React.js', 'TypeScript', 'Responsive UI', 'Component Library', 'UI Animations']
  },
  {
    title: 'Power Core (BE)',
    icon: <Server className="w-6 h-6 text-red-500" />,
    skills: ['Node.js', 'Java Spring Boot', 'FastAPI', 'RESTful APIs', 'MVC Architecture']
  },
  {
    title: 'Data Vault',
    icon: <Database className="w-6 h-6 text-blue-500" />,
    skills: ['MySQL', 'MongoDB', 'SQL Queries', 'Data Modeling', 'CRUD Operations']
  },
  {
    title: 'Field Gear',
    icon: <ShieldCheck className="w-6 h-6 text-red-500" />,
    skills: ['Git/GitHub', 'Postman', 'Docker', 'VS Code', 'Streamlit']
  },
  {
    title: 'Deployment',
    icon: <Cloud className="w-6 h-6 text-blue-500" />,
    skills: ['Vercel', 'Render', 'API Deployment', 'Environment Config']
  }
];

export const EXPERIENCE = [
  {
    company: 'PromptiX',
    role: 'AI & Full Stack Developer',
    period: 'Dec 2025 – Present',
    points: [
      'Built full-stack platform for AI services using React, Node.js, and MongoDB.',
      'Implemented intelligent UI animations with tsparticles and parallax effects.',
      'Designed scalable backend architecture with real-time event handling.',
      'Optimized interfaces using device sensors (gyroscope) and mobile-first principles.'
    ]
  },
  {
    company: 'PromptiX (Internal)',
    role: 'CRM Platform Development',
    period: '2025',
    points: [
      'Led end-to-end lifecycle for Internal Operations Management System.',
      'Delivered 8 core modules: Attendance, Payroll, Leave, Tasks, and more.',
      'Established code architecture patterns and reusable library of 15+ components.',
      'Maintained 95%+ code quality through modular design and strict TypeScript.'
    ]
  },
  {
    company: 'product (internal)',
    role: 'Mr. Coach Pro Developer',
    period: '2024',
    points: [
      'Developed Sports Event Booking System using React/TypeScript.',
      'Integrated RESTful APIs for dynamic data workflows and scheduling.',
      'Resolved critical production issues through systematic testing and debugging.'
    ]
  }
];

export const EDUCATION = [
  {
    degree: 'B.Tech in AI & Data Science',
    institution: 'Sri Krishna College Of Engineering and Technology',
    location: 'Coimbatore',
    graduation: 'April, 2025'
  },
  {
    degree: 'High School - Computer Maths',
    institution: 'Velammal Vidyalaya',
    location: 'Madurai',
    graduation: 'July, 2021'
  }
];

export const PROJECTS = [
  {
    title: 'Text Sentiment Classification',
    tech: 'Python, NLP, Scikit-learn',
    description: 'End-to-end NLP pipeline achieving 85%+ accuracy using Logistic Regression and TF-IDF feature extraction.',
    link: '#'
  },
  {
    title: 'Personality Predictor',
    tech: 'ML, Scikit-learn',
    description: 'ML pipeline to predict personality traits from structured user inputs with rigorous feature engineering.',
    link: '#'
  },
  {
    title: 'Mobile Recharge Portal',
    tech: 'React, Node.js, Payments',
    description: 'Secure full-stack application with integrated payment gateway APIs, reducing transaction failures by 15%.',
    link: '#'
  },
  {
    title: 'Bookstore Management System',
    tech: 'Java, Spring Boot, SQL',
    description: 'Full-stack system using RESTful architecture and secure SQL transactions for multi-user order processing.',
    link: '#'
  }
];
