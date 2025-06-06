import { useEffect, useState } from "react";
import {
  BookOpen,
  Calendar,
  Target,
  Users,
  MessageCircle,
  User,
  LogOut,
  Search,
  Play,
  Star,
  Zap,
  Lightbulb,
  Trophy,
  Rocket,
  Brain,
} from "lucide-react";
import "../../src/App.css";
import { Link } from "react-router-dom";
import { supabase } from "../utils/supabase.js";

const sidebarItems = [
  { icon: BookOpen, label: "Introduction", active: true },
  { icon: BookOpen, label: "Curriculum" },
  { icon: Calendar, label: "Calendar" },
  { icon: Target, label: "Strategies" },
];

const communityItems = [
  { icon: MessageCircle, label: "Coaching" },
  { icon: Users, label: "Network" },
];

const accountItems = [
  { icon: User, label: "Profile" },
  { icon: LogOut, label: "Logout" },
];

const iconSet = [Play, Star, Zap, Lightbulb, Trophy, Rocket, Brain];

function formatDuration(s) {
  const m = Math.floor(s / 60);
  const r = String(s % 60).padStart(2, "0");
  return `${m}:${r}`;
}

function Button({ children, variant = "default", size = "default", className = "", onClick }) {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
  };
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
  };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

function Input({ type = "text", placeholder, value, onChange, className = "" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
  );
}

export default function Course() {
  const [searchQuery, setSearchQuery] = useState("");
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLessons() {
      const { data, error } = await supabase
        .from("aulas_ia_guanabara")
        .select("id, titulo, duracao_segundos, ordem")
        .order("ordem", { ascending: true });

      if (error) {
        console.error("Erro ao buscar aulas:", error.message);
      } else {
        const mapped = data.map((row, idx) => ({
          id: row.id,
          title: row.titulo,
          duration: formatDuration(row.duracao_segundos),
          icon: iconSet[idx % iconSet.length],
        }));
        setLessons(mapped);
      }
      setLoading(false);
    }
    fetchLessons();
  }, []);

  if (loading)
    return <div className="flex h-screen items-center justify-center text-white">Carregando aulas…</div>;

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">CourseOS</h1>
              <p className="text-xs text-gray-400">Hackathon 2025</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Menu</h3>
            <ul className="space-y-1">
              {sidebarItems.map(({ icon: Icon, label, active }) => (
                <li
                  key={label}
                  className={
                    active
                      ? "bg-orange-500/20 text-orange-400 border-l-2 border-orange-500"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }
                >
                  <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm">
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Community</h3>
            <ul className="space-y-1">
              {communityItems.map(({ icon: Icon, label }) => (
                <li key={label}>
                  <a
                    href="#"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Account</h3>
            <ul className="space-y-1">
              {accountItems.map(({ icon: Icon, label }) => (
                <li key={label}>
                  <a
                    href="#"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="relative h-64 bg-gradient-to-r from-orange-600 via-red-500 to-yellow-500 flex items-center justify-center">
          <div className="text-center z-10">
            <h1 className="text-5xl font-bold mb-4">CourseOS</h1>
            <p className="text-lg max-w-2xl mx-auto px-4">Plataforma de curso aberto desenvolvida no Hackathon.</p>
            <Link to="/login">
              <button className="login-button mt-8">Entrar</button>
            </Link>
          </div>
          <span className="absolute inset-0 bg-black/20"></span>
        </header>

        <section className="p-8">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-700">
            <h2 className="text-2xl font-bold">Conteúdo</h2>
            <span className="text-sm text-gray-400">{lessons.length} LESSONS</span>
          </div>

          <div className="space-y-4">
            {lessons
              .filter((l) => l.title.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((lesson, idx) => {
                const IconComponent = lesson.icon || iconSet[idx % iconSet.length];
                return (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-orange-400">
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{lesson.title}</h3>
                        <p className="text-sm text-gray-400">{lesson.duration}</p>
                      </div>
                    </div>
                    <Link to={`/two/${lesson.id}`}>
                      <Button variant="outline" size="sm">
                        Start
                      </Button>
                    </Link>
                  </div>
                );
              })}
          </div>
        </section>
      </main>
    </div>
  );
}