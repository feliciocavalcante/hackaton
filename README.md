# 🧠 Plataforma de Curso Aberto — Hackathon

Este projeto foi desenvolvido durante um **Hackathon** com o objetivo de criar uma **plataforma educacional aberta**, gratuita e acessível. A primeira versão simula um curso com base em uma playlist real do YouTube, estruturada em um banco de dados no Supabase.

---

## 🎯 Objetivo

- Criar uma base funcional para uma plataforma de cursos online gratuitos
- Usar dados reais como referência para simular uma estrutura de aulas
- Trabalhar em equipe com foco em entrega, aprendizado e colaboração
- Basear-se em design UI profissional para simular uma experiência moderna

---

## 🧪 Tecnologias

- **Supabase** — Banco de dados PostgreSQL na nuvem
- **SQL** — Criação e inserção dos dados das aulas
- **Git & GitHub** — Colaboração em equipe
- *(Futuramente)* React, Tailwind e autenticação de usuários

---

## 🎨 Figma de Referência

O layout da plataforma foi inspirado no protótipo disponibilizado pelo orientador **Luan Oliveira**:  
🔗 [Figma — Hackathon UI Design](https://www.figma.com/design/WdAAWpxHrrcUrDbqv7nWs6/hackathon?node-id=0-1&t=zice7SLFP1u8DK8U-1)

---

## 📚 Playlist Base do Curso

A playlist utilizada como conteúdo simulado do curso é:  
🎥 [Inteligência Artificial para Todos — Curso em Vídeo](https://youtube.com/playlist?list=PLHz_AreHm4dm24MhlWJYiR_Rm7TFtvs6S&si=LhH1n1iFYmTr8dLq)

### Créditos

Todo o conteúdo original é de autoria do **Canal Curso em Vídeo**, disponível gratuitamente no YouTube.

---

## 🧱 Estrutura do Banco de Dados

### Tabela: `aulas_ia_guanabara`

| Campo              | Tipo    | Descrição                             |
|--------------------|---------|---------------------------------------|
| `id`               | serial  | Identificador único da aula           |
| `titulo`           | text    | Título da aula                        |
| `duracao_segundos` | integer | Duração da aula em segundos           |
| `video_link`       | text    | Link direto para o vídeo no YouTube   |
| `ordem`            | integer | Posição cronológica da aula           |
| `descricao`        | text    | (Opcional) Descrição complementar     |

---

## 🧪 Como Executar

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/Hackathon.git
```

2. Acesse [Supabase](https://supabase.com), crie um projeto e execute o arquivo SQL contido neste repositório.

3. O banco será populado com os dados das 50 aulas da playlist do Curso em Vídeo.

4. (Opcional) Desenvolva um frontend que consuma os dados dessa tabela para apresentar o curso.

---

## 👥 Time de Desenvolvimento

Projeto construído com carinho por:

- [Adriana](https://github.com/drihcs)
- [Jair Santos](https://github.com/jairsantos123)
- [Felício Cavalcante](https://github.com/feliciocavalcante)

---

## 📝 Licença e Uso

- Este projeto é **educacional e sem fins lucrativos**
- O conteúdo da playlist é de propriedade do **Curso em Vídeo**
- Todo o código presente aqui é **open source**, disponível para estudo e expansão

---

## 🤝 Contribuições

Sinta-se à vontade para sugerir melhorias, abrir issues ou enviar pull requests.  
Este projeto é uma base aberta e em constante evolução 🚀

---
