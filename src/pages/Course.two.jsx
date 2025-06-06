/* src/pages/CourseTwo.jsx — página da aula individual */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../../src/App.css";

function formatDuration(s) {
  const m = Math.floor(s / 60);
  const r = String(s % 60).padStart(2, "0");
  return `${m}:${r}`;
}

export default function CourseTwo() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLesson() {
      const { data, error } = await supabase
        .from("aulas_ia_guanabara")
        .select("id, titulo, descricao, duracao_segundos, video_url")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Erro ao buscar aula:", error.message);
      } else {
        setLesson({
          ...data,
          duration: formatDuration(data.duracao_segundos),
        });
      }
      setLoading(false);
    }
    fetchLesson();
  }, [id]);

  if (loading) return <div className="flex h-screen items-center justify-center text-white">Carregando aula…</div>;
  if (!lesson) return <div className="text-white p-6">Aula não encontrada.</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="mb-6">
        <Link to="/" className="flex items-center text-orange-400 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para lista de aulas
        </Link>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-2">{lesson.titulo}</h1>
        <p className="text-sm text-gray-400 mb-4">Duração: {lesson.duration}</p>
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <iframe
            className="w-full h-full rounded-md"
            src={lesson.video_url}
            title={lesson.titulo}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <p className="text-gray-300">{lesson.descricao}</p>
      </div>
    </div>
  );
}