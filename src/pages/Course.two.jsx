/* src/pages/LessonPlayer.jsx — página que exibe o player de vídeo e materiais da aula  */

import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { supabase } from "../utils/supabase.js";

import "../../src/App.css";

/* Navegação lateral (fixa – pode vir do banco futuramente) */
const navigationItems = [
  { id: "introduction", label: "Introduction", icon: "📚" },
  { id: "foundation", label: "Foundation", icon: "🏗️" },
  { id: "content", label: "Content", icon: "📝" },
  { id: "strategies", label: "Strategies", icon: "🎯" },
  { id: "community", label: "Community", icon: "👥" },
  { id: "branding", label: "Branding", icon: "🎨" },
  { id: "metrics", label: "Metrics", icon: "📊" },
  { id: "search", label: "Search", icon: "🔍" },
];

/* Dados dummy para accordions (pode ser tabelas no supabase) */
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
};

/* Função para extrair e montar URL embed do YouTube */
function getYouTubeEmbedUrl(url) {
  try {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get("v");
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    // Se já for embed ou outro formato, retorna original
    return url;
  } catch {
    return url; // se não for uma URL válida
  }
}

/* Componente Accordion */
function Accordion({ title, items }) {
  const [expanded, setExpanded] = useState(new Set());

  const toggle = (key) => {
    setExpanded((prev) => {
      const newSet = new Set(prev);
      newSet.has(key) ? newSet.delete(key) : newSet.add(key);
      return newSet;
    });
  };

  return (
    <section className="content-section">
      <h2 className="section-title">{title.charAt(0).toUpperCase() + title.slice(1)}</h2>
      <div className="accordion-container">
        {items.map((item, idx) => {
          const key = `${title}-${idx}`;
          const isOpen = expanded.has(key);
          return (
            <div key={key} className="accordion-item">
              <div
                className="accordion-header"
                onClick={() => toggle(key)}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle(key);
                  }
                }}
              >
                <div className="accordion-title-wrapper">
                  {item.icon && <span className="accordion-icon">{item.icon}</span>}
                  <span className="accordion-title">{item.title}</span>
                </div>
                <span className="accordion-toggle">{isOpen ? "−" : "+"}</span>
              </div>
              {isOpen && (
                <div className="accordion-content">
                  <p>{item.content}</p>
                  {title === "downloads" && <button className="download-btn">Download</button>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* Componente Sidebar */
function Sidebar({ activeNav, setActiveNav }) {
  return (
    <aside className="sidebar">
      <div className="logo">
        <span className="logo-icon">⚙️</span> Course Template
      </div>
      <nav className="navigation">
        {navigationItems.map((item) => (
          <Link
            key={item.id}
            to={`#${item.id}`}
            className={`nav-item ${item.id === activeNav ? "active" : ""}`}
            onClick={() => setActiveNav(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default function LessonPlayer() {
  const { id } = useParams();               // id da aula vindo da rota
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState(navigationItems[0].id);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  /* Busca a aula no Supabase */
  useEffect(() => {
    async function fetchLesson() {
      setLoading(true);
      const { data, error } = await supabase
        .from("aulas_ia_guanabara")
        .select("id, titulo, duracao_segundos, video_link, descricao")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Erro ao buscar aula:", error.message);
        setLesson(null);
      } else {
        setLesson(data);
      }
      setLoading(false);
    }
    fetchLesson();
  }, [id]);

  /* Resetar activeNav para "introduction" sempre que trocar aula */
  useEffect(() => {
    setActiveNav("introduction");
  }, [id]);

  /* Concluir aula */
  const handleComplete = async () => {
    setIsCompleting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsCompleting(false);
    setIsCompleted(true);
    alert("🎉 Congratulations! Lesson completed successfully!");
    setTimeout(() => setIsCompleted(false), 3000);
  };

  if (loading) return <div className="flex h-screen items-center justify-center text-white">Carregando aula…</div>;
  if (!lesson) return <div className="flex h-screen items-center justify-center text-red-400">Aula não encontrada.</div>;

  return (
    <div className="app">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      <main className="main-content">
        {/* Header */}
        <header className="lesson-header">
          <h1 className="lesson-title">{lesson.titulo}</h1>
          <p className="lesson-description">{lesson.descricao || "Sem descrição."}</p>
        </header>

        {/* Player YouTube */}
        <section className="video-wrapper">
          <div className="video-responsive">
            <iframe
              src={getYouTubeEmbedUrl(lesson.video_link)}
              title={lesson.titulo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* Summary */}
        <section className="content-section">
          <h2 className="section-title">Summary</h2>
          <p className="section-content">
            {lesson.descricao || "No summary available for this lesson."}
          </p>
        </section>

        {/* Accordion: resources, downloads, faq */}
        {Object.entries(accordionData).map(([groupKey, items]) => (
          <Accordion key={groupKey} title={groupKey} items={items} />
        ))}

        {/* Botão de completar aula */}
        <button
          className={`complete-button ${isCompleted ? "completed" : ""}`}
          onClick={handleComplete}
          disabled={isCompleting}
          aria-busy={isCompleting}
        >
          {isCompleting ? "Completing…" : isCompleted ? "✓ Lesson Completed!" : "Complete Lesson"}
        </button>

        {/* Footer */}
        <footer className="footer">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Buy this template</span>
        </footer>
      </main>
    </div>
  );
}