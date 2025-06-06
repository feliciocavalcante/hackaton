/* src/pages/LessonPlayer.jsx — página que exibe o player de vídeo e materiais da aula  */

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import supabase from "../supabase";
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

export default function LessonPlayer() {
  const { id } = useParams();               // id da aula vindo da rota
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedAccordions, setExpandedAccordions] = useState(new Set());
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCompleted, setIsCompleted]   = useState(false);

  /* Busca a aula no Supabase */
  useEffect(() => {
    async function fetchLesson() {
      const { data, error } = await supabase
        .from("aulas_ia_guanabara")
        .select("id, titulo, duracao_segundos, video_link, descricao")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Erro ao buscar aula:", error.message);
      } else {
        setLesson(data);
      }
      setLoading(false);
    }
    fetchLesson();
  }, [id]);

  /* Toggle accordion */
  const toggleAccordion = (key) => {
    setExpandedAccordions((prev) => {
      const set = new Set(prev);
      set.has(key) ? set.delete(key) : set.add(key);
      return set;
    });
  };

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
  if (!lesson)  return <div className="flex h-screen items-center justify-center text-red-400">Aula não encontrada.</div>;

  return (
    <div className="app">
      {/* ------------ Sidebar -------------- */}
      <aside className="sidebar">
        <div className="logo">
          <span className="logo-icon">⚙️</span> Course Template
        </div>
        <nav className="navigation">
          {navigationItems.map((item) => (
            <Link
              key={item.id}
              to={`#${item.id}`}
              className={`nav-item ${item.id === "introduction" ? "active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* ------------ Main Content ---------- */}
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
              src={lesson.video_link.replace("watch?v=", "embed/")}
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

        {/* Resources / Downloads / FAQ */}
        {Object.entries(accordionData).map(([groupKey, items]) => (
          <section className="content-section" key={groupKey}>
            <h2 className="section-title">{groupKey.charAt(0).toUpperCase() + groupKey.slice(1)}</h2>
            <div className="accordion-container">
              {items.map((itm, idx) => {
                const accId = `${groupKey}-${idx}`;
                const isOpen = expandedAccordions.has(accId);
                return (
                  <div key={accId} className="accordion-item">
                    <div className="accordion-header" onClick={() => toggleAccordion(accId)}>
                      <div className="accordion-title-wrapper">
                        {itm.icon && <span className="accordion-icon">{itm.icon}</span>}
                        <span className="accordion-title">{itm.title}</span>
                      </div>
                      <span className="accordion-toggle">{isOpen ? "−" : "+"}</span>
                    </div>
                    {isOpen && (
                      <div className="accordion-content">
                        <p>{itm.content}</p>
                        {groupKey === "downloads" && <button className="download-btn">Download</button>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* Botão de completar aula */}
        <button
          className={`complete-button ${isCompleted ? "completed" : ""}`}
          onClick={handleComplete}
          disabled={isCompleting}
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