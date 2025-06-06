import { Navigate } from "react-router-dom";
import { supabase } from "../utils/supabase.js"; // ajuste o caminho, se necessário
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // 1) Verifica a sessão atual do usuário
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2) Escuta alterações na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    // 3) Limpa o listener ao desmontar o componente
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  if (loading) return <div>Carregando…</div>;

  if (!session) return <Navigate to="/login" replace />;

  return children;
}