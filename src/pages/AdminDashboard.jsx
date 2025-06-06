import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function AdminDashboard() {
  // Estados
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Dados
  const [modulos, setModulos] = useState([]);
  const [aulas, setAulas] = useState([]);

  // Formulário módulo
  const [moduloTitulo, setModuloTitulo] = useState("");
  const [moduloDescricao, setModuloDescricao] = useState("");

  // Formulário aula
  const [aulaTitulo, setAulaTitulo] = useState("");
  const [aulaDescricao, setAulaDescricao] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [moduloSelecionado, setModuloSelecionado] = useState("");

  // Estados de edição
  const [moduloEditando, setModuloEditando] = useState(null);
  const [aulaEditando, setAulaEditando] = useState(null);

  // Carrega dados ao montar
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

  // Função para recarregar dados após alterações
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

  // Limpa formulário módulo
  function limparFormularioModulo() {
    setModuloTitulo("");
    setModuloDescricao("");
    setModuloEditando(null);
  }

  // Limpa formulário aula
  function limparFormularioAula() {
    setAulaTitulo("");
    setAulaDescricao("");
    setVideoUrl("");
    setModuloSelecionado("");
    setAulaEditando(null);
  }

  // Adicionar ou editar módulo
  async function adicionarModulo(e) {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!moduloTitulo.trim()) {
      setError("Título do módulo é obrigatório");
      return;
    }

    if (moduloEditando) {
      const { error } = await supabase
        .from("modulos_ia_guanabara")
        .update({ titulo: moduloTitulo, descricao: moduloDescricao })
        .eq("id", moduloEditando);

      if (error) setError("Erro ao atualizar módulo: " + error.message);
      else {
        setSuccessMsg("Módulo atualizado!");
        limparFormularioModulo();
        recarregarDados();
      }
    } else {
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

  // Adicionar ou editar aula
  async function adicionarAula(e) {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!aulaTitulo.trim() || !videoUrl.trim() || !moduloSelecionado) {
      setError("Título, URL do vídeo e módulo são obrigatórios");
      return;
    }

    if (aulaEditando) {
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
        limparFormularioAula();
        recarregarDados();
      }
    } else {
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

  // Deletar módulo com confirmação
  async function deletarModulo(id) {
    if (
      !window.confirm(
        "Tem certeza que quer deletar este módulo? Todas as aulas vinculadas serão removidas."
      )
    )
      return;

    setError("");
    setSuccessMsg("");

    // Deletar aulas vinculadas
    const { error: errAulas } = await supabase
      .from("aulas_ia_guanabara")
      .delete()
      .eq("modulo_id", id);

    if (errAulas) {
      setError("Erro ao deletar aulas vinculadas: " + errAulas.message);
      return;
    }

    // Deletar módulo
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

  // Deletar aula com confirmação
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
            placeholder="Descrição do módulo"
            value={moduloDescricao}
            onChange={(e) => setModuloDescricao(e.target.value)}
            style={{ width: "100%", padding: 8, height: 80, marginBottom: 8 }}
          />
          <button type="submit" style={{ padding: "8px 16px" }}>
            {moduloEditando ? "Atualizar Módulo" : "Adicionar Módulo"}
          </button>
          {moduloEditando && (
            <button
              type="button"
              onClick={limparFormularioModulo}
              style={{ marginLeft: 8, padding: "8px 16px" }}
            >
              Cancelar
            </button>
          )}
        </form>
      </section>

      {/* Lista de módulos */}
      <section style={{ marginBottom: 40 }}>
        <h2>Módulos</h2>
        {modulos.length === 0 && <p>Nenhum módulo cadastrado.</p>}
        <ul>
          {modulos.map((modulo) => (
            <li key={modulo.id} style={{ marginBottom: 8 }}>
              <strong>{modulo.titulo}</strong> — {modulo.descricao}
              <br />
              <button
                onClick={() => editarModulo(modulo)}
                style={{ marginRight: 8 }}
              >
                Editar
              </button>
              <button onClick={() => deletarModulo(modulo.id)}>Deletar</button>
            </li>
          ))}
        </ul>
      </section>

      {/* Formulário Aula */}
      <section style={{ marginBottom: 40 }}>
        <h2>{aulaEditando ? "Editar Aula" : "Adicionar Aula"}</h2>
        <form onSubmit={adicionarAula}>
          <input
            type="text"
            placeholder="Título da aula"
            value={aulaTitulo}
            onChange={(e) => setAulaTitulo(e.target.value)}
            required
            style={{ width: "100%", padding: 8, marginBottom: 8 }}
          />
          <textarea
            placeholder="Descrição da aula"
            value={aulaDescricao}
            onChange={(e) => setAulaDescricao(e.target.value)}
            style={{ width: "100%", padding: 8, height: 80, marginBottom: 8 }}
          />
          <input
            type="url"
            placeholder="URL do vídeo"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
            style={{ width: "100%", padding: 8, marginBottom: 8 }}
          />
          <select
            value={moduloSelecionado}
            onChange={(e) => setModuloSelecionado(e.target.value)}
            required
            style={{ width: "100%", padding: 8, marginBottom: 8 }}
          >
            <option value="">Selecione o módulo</option>
            {modulos.map((modulo) => (
              <option key={modulo.id} value={modulo.id}>
                {modulo.titulo}
              </option>
            ))}
          </select>
          <button type="submit" style={{ padding: "8px 16px" }}>
            {aulaEditando ? "Atualizar Aula" : "Adicionar Aula"}
          </button>
          {aulaEditando && (
            <button
              type="button"
              onClick={limparFormularioAula}
              style={{ marginLeft: 8, padding: "8px 16px" }}
            >
              Cancelar
            </button>
          )}
        </form>
      </section>

      {/* Lista de aulas */}
      <section>
        <h2>Aulas</h2>
        {aulas.length === 0 && <p>Nenhuma aula cadastrada.</p>}
        <ul>
          {aulas.map((aula) => {
            const modulo = modulos.find((m) => m.id === aula.modulo_id);
            return (
              <li key={aula.id} style={{ marginBottom: 8 }}>
                <strong>{aula.titulo}</strong> — {aula.descricao} <br />
                <em>Módulo: {modulo ? modulo.titulo : "Não encontrado"}</em> <br />
                <a href={aula.video_url} target="_blank" rel="noreferrer">
                  Link do vídeo
                </a>
                <br />
                <button
                  onClick={() => editarAula(aula)}
                  style={{ marginRight: 8 }}
                >
                  Editar
                </button>
                <button onClick={() => deletarAula(aula.id)}>Deletar</button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}