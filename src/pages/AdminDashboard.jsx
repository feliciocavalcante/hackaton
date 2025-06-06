import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function AdminDashboard() {
  // Estados de carregamento, erro e mensagens
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Listas de módulos e aulas
  const [modulos, setModulos] = useState([]);
  const [aulas, setAulas] = useState([]);

  // Formulários para módulo
  const [moduloTitulo, setModuloTitulo] = useState("");
  const [moduloDescricao, setModuloDescricao] = useState("");

  // Formulários para aula
  const [aulaTitulo, setAulaTitulo] = useState("");
  const [aulaDescricao, setAulaDescricao] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [moduloSelecionado, setModuloSelecionado] = useState("");

  // Estado para editar (id em edição)
  const [moduloEditando, setModuloEditando] = useState(null);
  const [aulaEditando, setAulaEditando] = useState(null);

  // Carregar módulos e aulas ao iniciar
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data: modulosData, error: modError } = await supabase
        .from("modulos_ia_guanabara")
        .select("*");
      if (modError) {
        setError("Erro ao buscar módulos: " + modError.message);
        setLoading(false);
        return;
      }

      const { data: aulasData, error: aulasError } = await supabase
        .from("aulas_ia_guanabara")
        .select("*");
      if (aulasError) {
        setError("Erro ao buscar aulas: " + aulasError.message);
        setLoading(false);
        return;
      }

      setModulos(modulosData);
      setAulas(aulasData);
      setLoading(false);
    }
    fetchData();
  }, []);

  // Funções para adicionar módulo
  async function adicionarModulo(e) {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    if (!moduloTitulo.trim()) {
      setError("Título do módulo é obrigatório");
      return;
    }

    if (moduloEditando) {
      // Editar módulo
      const { error } = await supabase
        .from("modulos_ia_guanabara")
        .update({ titulo: moduloTitulo, descricao: moduloDescricao })
        .eq("id", moduloEditando);
      if (error) setError("Erro ao atualizar módulo: " + error.message);
      else {
        setSuccessMsg("Módulo atualizado!");
        setModuloEditando(null);
        limparFormularioModulo();
        recarregarDados();
      }
    } else {
      // Novo módulo
      const { error } = await supabase
        .from("modulos_ia_guanabara")
        .insert([{ titulo: moduloTitulo, descricao: moduloDescricao }]);
      if (error) setError("Erro ao adicionar módulo: " + error.message);
      else {
        setSuccessMsg("Módulo adicionado!");
        limparFormularioModulo();
        recarregarDados();
      }
    }
  }

  // Funções para adicionar aula
  async function adicionarAula(e) {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    if (!aulaTitulo.trim() || !videoUrl.trim() || !moduloSelecionado) {
      setError("Título, URL do vídeo e módulo são obrigatórios");
      return;
    }

    if (aulaEditando) {
      // Editar aula
      const { error } = await supabase
        .from("aulas_ia_guanabara")
        .update({
          titulo: aulaTitulo,
          descricao: aulaDescricao,
          video_url: videoUrl,
          modulo_id: moduloSelecionado,
        })
        .eq("id", aulaEditando);
      if (error) setError("Erro ao atualizar aula: " + error.message);
      else {
        setSuccessMsg("Aula atualizada!");
        setAulaEditando(null);
        limparFormularioAula();
        recarregarDados();
      }
    } else {
      // Nova aula
      const { error } = await supabase
        .from("aulas_ia_guanabara")
        .insert([
          {
            titulo: aulaTitulo,
            descricao: aulaDescricao,
            video_url: videoUrl,
            modulo_id: moduloSelecionado,
          },
        ]);
      if (error) setError("Erro ao adicionar aula: " + error.message);
      else {
        setSuccessMsg("Aula adicionada!");
        limparFormularioAula();
        recarregarDados();
      }
    }
  }

  // Limpa formulário módulo
  function limparFormularioModulo() {
    setModuloTitulo("");
    setModuloDescricao("");
  }

  // Limpa formulário aula
  function limparFormularioAula() {
    setAulaTitulo("");
    setAulaDescricao("");
    setVideoUrl("");
    setModuloSelecionado("");
  }

  // Recarrega dados de módulo e aula
  async function recarregarDados() {
    const { data: modulosData, error: modError } = await supabase
      .from("modulos_ia_guanabara")
      .select("*");
    if (!modError) setModulos(modulosData);

    const { data: aulasData, error: aulasError } = await supabase
      .from("aulas_ia_guanabara")
      .select("*");
    if (!aulasError) setAulas(aulasData);
  }

  // Editar módulo
  function editarModulo(modulo) {
    setModuloEditando(modulo.id);
    setModuloTitulo(modulo.titulo);
    setModuloDescricao(modulo.descricao || "");
  }

  // Editar aula
  function editarAula(aula) {
    setAulaEditando(aula.id);
    setAulaTitulo(aula.titulo);
    setAulaDescricao(aula.descricao || "");
    setVideoUrl(aula.video_url || "");
    setModuloSelecionado(aula.modulo_id);
  }

  // Deletar módulo (com confirmação)
  async function deletarModulo(id) {
    if (!window.confirm("Tem certeza que quer deletar este módulo? Todas as aulas vinculadas serão removidas.")) return;
    
    setError("");
    setSuccessMsg("");
    
    // Deleta aulas vinculadas primeiro
    const { error: errAulas } = await supabase
      .from("aulas_ia_guanabara")
      .delete()
      .eq("modulo_id", id);

    if (errAulas) {
      setError("Erro ao deletar aulas vinculadas: " + errAulas.message);
      return;
    }

    // Deleta módulo
    const { error: errModulo } = await supabase
      .from("modulos_ia_guanabara")
      .delete()
      .eq("id", id);

    if (errModulo) {
      setError("Erro ao deletar módulo: " + errModulo.message);
      return;
    }

    setSuccessMsg("Módulo e aulas vinculadas deletados!");
    recarregarDados();
  }

  // Deletar aula
  async function deletarAula(id) {
    if (!window.confirm("Tem certeza que quer deletar esta aula?")) return;
    setError("");
    setSuccessMsg("");
    const { error } = await supabase
      .from("aulas_ia_guanabara")
      .delete()
      .eq("id", id);

    if (error) setError("Erro ao deletar aula: " + error.message);
    else {
      setSuccessMsg("Aula deletada!");
      recarregarDados();
    }
  }

  if (loading) return <p>Carregando dashboard...</p>;

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", padding: 20 }}>
      <h1>Admin Dashboard</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

      {/* Formulário Módulo */}
      <section style={{ marginBottom: 40 }}>
        <h2>{moduloEditando ? "Editar Módulo" : "Adicionar Módulo"}</h2>
        <form onSubmit={adicionarModulo}>
          <input
            type="text"
            placeholder="Título do módulo"
            value={moduloTitulo}
            onChange={(e) => setModuloTitulo(e.target.value)}
            required
            style={{ width: "100%", padding: 8, marginBottom: 8 }}
          />
          <textarea
            placeholder="