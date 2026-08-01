import { useState, FormEvent } from "react";
import Reveal from "./Reveal";

const EMAIL = "anderson_alessandri@hotmail.com";
const WHATSAPP_URL = "https://wa.me/5521997836113";
const LINKEDIN_URL = "https://linkedin.com/in/andersonalessandri";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contato via portfólio — ${name || "Novo projeto"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section">
      <Reveal>
        <span className="eyebrow">// CONTACT.CHANNELS</span>
        <h2 className="heading-xl">
          Vamos construir algo
          <br />
          <span className="gradient-text-cool">com precisão.</span>
        </h2>
        <p className="lede">
          Aberto a projetos freelance, posições de Design Engineer e parcerias em
          produtos digitais. Se você está construindo algo ambicioso, quero ouvir sobre.
        </p>
      </Reveal>

      <div className="contact-layout">
        <Reveal delay={0}>
          <div className="channels-label">Canais</div>

          <a href={`mailto:${EMAIL}`} className="card channel-card">
            <div className="channel-icon" style={{ color: "#4f7bff", borderColor: "#4f7bff40" }}>
              ✉
            </div>
            <div>
              <div className="channel-text-label">Email</div>
              <div className="channel-text-value">{EMAIL}</div>
            </div>
          </a>

          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="card channel-card">
            <div className="channel-icon" style={{ color: "#35d68e", borderColor: "#35d68e40" }}>
              ☎
            </div>
            <div>
              <div className="channel-text-label">WhatsApp</div>
              <div className="channel-text-value">(21) 99783-6113</div>
            </div>
          </a>

          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="card channel-card">
            <div className="channel-icon" style={{ color: "#9b6bff", borderColor: "#9b6bff40" }}>
              in
            </div>
            <div>
              <div className="channel-text-label">LinkedIn</div>
              <div className="channel-text-value">linkedin.com/in/andersonalessandri</div>
            </div>
          </a>

          <div className="card channel-card">
            <div className="channel-icon" style={{ color: "#33c9d6", borderColor: "#33c9d640" }}>
              ◎
            </div>
            <div>
              <div className="channel-text-label">Localização</div>
              <div className="channel-text-value">Rio de Janeiro, RJ</div>
            </div>
          </div>

          <div className="card availability-card">
            <div className="availability-title">
              <span className="pill-dot" />
              Disponível para novos projetos
            </div>
            <div className="availability-desc">
              Atualmente aceitando projetos freelance, posições de Design Engineer e
              parcerias em produtos digitais.
            </div>
          </div>
        </Reveal>

        <Reveal delay={90}>
        <form className="card" onSubmit={handleSubmit}>
          <div className="form-row">
            <div>
              <label className="field-label" htmlFor="name">
                Nome
              </label>
              <input
                id="name"
                className="input"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="field-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="input"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <label className="field-label" htmlFor="message">
            Mensagem
          </label>
          <textarea
            id="message"
            className="textarea"
            placeholder="Conte sobre o que você está construindo..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <div style={{ marginTop: 20 }}>
            <button type="submit" className="btn btn-primary submit-btn">
              Enviar Mensagem →
            </button>
          </div>
        </form>
        </Reveal>
      </div>
    </section>
  );
}
