/* src/pages/CourseTwo.jsx — exibe a videoaula individual */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function CourseTwo() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLesson() {
      const { data, error } = await supabase
        .from("aulas_ia_guanabara")
        .select("id, titulo, duracao_segundos, video_link")
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

  if (loading) {
    return <div className="flex h-screen items-center justify-center text-white">Carregando aula…</div>;
  }

  if (!lesson) {
    return (
      <div className="text-red-400 p-8 text-center">
        Aula não encontrada ou erro ao carregar dados.
      </div>
    );
  }

  const minutos = Math.floor(lesson.duracao_segundos / 60);
  const segundos = lesson.duracao_segundos % 60;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <Link to="/" className="inline-flex items-center mb-6 text-orange-400 hover:underline">
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para o curso
      </Link>

      <h1 className="text-3xl font-bold mb-4">{lesson.titulo}</h1>

      {lesson.video_link ? (
        <div className="aspect-video mb-6">
          <iframe
            className="w-full h-full rounded-lg"
            src={lesson.video_link}
            title={lesson.titulo}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <p className="text-red-400 mb-6">Link de vídeo indisponível.</p>
      )}

      <p className="text-gray-400">
        Duração: {minutos}m {segundos}s
      </p>
    </div>
  );
}