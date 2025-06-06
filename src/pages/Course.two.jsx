

import { useState } from "react"
import "../../src/App.css"

// Dados das navegações
const navigationItems = [
  { id: "introduction", label: "Introduction", icon: "📚", active: true },
  { id: "foundation", label: "Foundation", icon: "🏗️", active: false },
  { id: "content", label: "Content", icon: "📝", active: false },
  { id: "strategies", label: "Strategies", icon: "🎯", active: false },
  { id: "community", label: "Community", icon: "👥", active: false },
  { id: "branding", label: "Branding", icon: "🎨", active: false },
  { id: "metrics", label: "Metrics", icon: "📊", active: false },
  { id: "search", label: "Search", icon: "🔍", active: false },
]

// Dados dos accordions
const accordionData = {
  resources: [
    { title: "Live Demo", content: "Access the live demo of this lesson project.", icon: "📄" },
    { title: "Documentation", content: "Additional resources and documentation.", icon: "🔗" },
  ],
  downloads: [
    { title: "Source Files", content: "Download the complete source code.", icon: "📁" },
    { title: "Assets Package", content: "Download all assets and resources.", icon: "📁" },
  ],
  faq: [
    {
      title: "How do I customize the template?",
      content: "You can customize by modifying CSS variables and properties.",
    },
    { title: "Is this template responsive?", content: "Yes, fully responsive for all devices." },
  ],
}

// Conteúdo das páginas
const pageContent = {
  introduction: {
    title: "Lesson 1 - Introduction",
    description:
      "Welcome to this lesson on creating a website template. In this short lesson, we will explore the key steps involved in designing a website template.",
  },
  foundation: {
    title: "Foundation Principles",
    description:
      "Learn the fundamental principles of web design and development that form the foundation of great websites.",
  },
  content: {
    title: "Content Strategy",
    description: "Discover how to create compelling content that engages your audience and drives conversions.",
  },
  strategies: {
    title: "Design Strategies",
    description: "Explore advanced design strategies and techniques used by professional web designers.",
  },
  community: {
    title: "Building Community",
    description: "Learn how to build and engage with your online community through effective web design.",
  },
  branding: {
    title: "Brand Identity",
    description: "Understand how to incorporate brand identity into your web design for consistent messaging.",
  },
  metrics: {
    title: "Analytics & Metrics",
    description: "Learn how to measure and analyze the performance of your website design and user experience.",
  },
  search: {
    title: "SEO Optimization",
    description: "Discover search engine optimization techniques to improve your website visibility and ranking.",
  },
}

function App() {
  const [currentPage, setCurrentPage] = useState("introduction")
  const [expandedAccordions, setExpandedAccordions] = useState(new Set())
  const [isCompleting, setIsCompleting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  // Função para navegar entre páginas
  const handleNavigation = (pageId) => {
    setCurrentPage(pageId)
  }

  // Função para toggle accordion
  const toggleAccordion = (accordionId) => {
    setExpandedAccordions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(accordionId)) {
        newSet.delete(accordionId)
      } else {
        newSet.add(accordionId)
      }
      return newSet
    })
  }

  // Função para completar lição
  const handleCompleteLesson = async () => {
    setIsCompleting(true)

    // Simular processo de conclusão
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsCompleting(false)
    setIsCompleted(true)

    // Mostrar notificação
    alert("🎉 Congratulations! Lesson completed successfully!")

    // Reset após 3 segundos
    setTimeout(() => {
      setIsCompleted(false)
    }, 3000)
  }

  const currentContent = pageContent[currentPage]

  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <span className="logo-icon">⚙️</span>
          Course Template
        </div>

        <nav className="navigation">
          {navigationItems.map((item) => (
            <div
              key={item.id}
              className={`nav-item ${currentPage === item.id ? "active" : ""}`}
              onClick={() => handleNavigation(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="lesson-header">
          <h1 className="lesson-title">{currentContent.title}</h1>
          <p className="lesson-description">{currentContent.description}</p>
        </div>

        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h2 className="hero-title">Input</h2>
            <p className="hero-subtitle">Create beautiful interfaces</p>
            <button className="hero-button">Get Started</button>
          </div>
          <div className="decoration decoration-1"></div>
          <div className="decoration decoration-2"></div>
        </div>

        {/* Summary */}
        <section className="content-section">
          <h2 className="section-title">Summary</h2>
          <p className="section-content">
            In this lesson, we will explore the key steps involved in designing a website template. We'll cover the
            fundamental concepts of layout design, color schemes, typography, and learn how to create a website
            according and functional foundation for your website. Let's dive in and check out some of various template
            creation.
          </p>
        </section>

        {/* Resources */}
        <section className="content-section">
          <h2 className="section-title">Resources</h2>
          <div className="accordion-container">
            {accordionData.resources.map((item, index) => {
              const accordionId = `resources-${index}`
              const isExpanded = expandedAccordions.has(accordionId)

              return (
                <div key={accordionId} className="accordion-item">
                  <div className="accordion-header" onClick={() => toggleAccordion(accordionId)}>
                    <div className="accordion-title-wrapper">
                      <span className="accordion-icon">{item.icon}</span>
                      <span className="accordion-title">{item.title}</span>
                    </div>
                    <span className="accordion-toggle">{isExpanded ? "−" : "+"}</span>
                  </div>
                  {isExpanded && (
                    <div className="accordion-content">
                      <p>{item.content}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Downloads */}
        <section className="content-section">
          <h2 className="section-title">Downloads</h2>
          <div className="accordion-container">
            {accordionData.downloads.map((item, index) => {
              const accordionId = `downloads-${index}`
              const isExpanded = expandedAccordions.has(accordionId)

              return (
                <div key={accordionId} className="accordion-item">
                  <div className="accordion-header" onClick={() => toggleAccordion(accordionId)}>
                    <div className="accordion-title-wrapper">
                      <span className="accordion-icon">{item.icon}</span>
                      <span className="accordion-title">{item.title}</span>
                    </div>
                    <span className="accordion-toggle">{isExpanded ? "−" : "+"}</span>
                  </div>
                  {isExpanded && (
                    <div className="accordion-content">
                      <p>{item.content}</p>
                      <button className="download-btn">Download</button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="content-section">
          <h2 className="section-title">FAQ</h2>
          <div className="accordion-container">
            {accordionData.faq.map((item, index) => {
              const accordionId = `faq-${index}`
              const isExpanded = expandedAccordions.has(accordionId)

              return (
                <div key={accordionId} className="accordion-item">
                  <div className="accordion-header" onClick={() => toggleAccordion(accordionId)}>
                    <span className="accordion-title">{item.title}</span>
                    <span className="accordion-toggle">{isExpanded ? "−" : "+"}</span>
                  </div>
                  {isExpanded && (
                    <div className="accordion-content">
                      <p>{item.content}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Complete Button */}
        <button
          className={`complete-button ${isCompleted ? "completed" : ""}`}
          onClick={handleCompleteLesson}
          disabled={isCompleting}
        >
          {isCompleting ? "Completing..." : isCompleted ? "✓ Lesson Completed!" : "Complete Lesson"}
        </button>

        {/* Footer */}
        <footer className="footer">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Buy this template</span>
        </footer>
      </div>
    </div>
  )
}

export default App