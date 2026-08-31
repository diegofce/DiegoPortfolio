import { useEffect, useState } from 'react';
import { useLanguage } from '../common/LanguageContext';

const assistantPrompts = [
  '¿Cuál es el stack de Diego?',
  'Cuéntame sobre BookingSaaS.',
  '¿Cómo usa Diego la IA?',
  '¿Qué proyectos ha construido Diego?',
];

function createAssistantAnswer(message) {
  const query = message
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  if (
    query.includes('stack') ||
    query.includes('tech') ||
    query.includes('technolog')
  ) {
    return 'Diego trabaja principalmente con Python, FastAPI, Django REST Framework, React, TypeScript, PostgreSQL, Redis, Celery, Docker, APIs REST, JWT, OAuth2 e integraciones con APIs de IA.';
  }

  if (query.includes('booking')) {
    return 'BookingSaaS es un sistema SaaS de reservas con FastAPI, React, PostgreSQL, Celery, Redis y JWT. Incluye arquitectura backend escalable, autenticación por roles, lógica multiinquilino, prevención de conflictos y notificaciones asíncronas.';
  }

  if (
    query.includes('ai') ||
    query.includes('automation') ||
    query.includes('codex') ||
    query.includes('claude')
  ) {
    return 'Diego entiende la IA como una capa de integración y productividad: APIs de IA, prompt engineering, desarrollo asistido, Codex, Claude Code y flujos de automatización.';
  }

  if (query.includes('project') || query.includes('teamsalud')) {
    return 'El portafolio presenta TeamSalud, BookingSaaS y un espacio para un proyecto de integración con IA, además de tres proyectos preparados para el futuro.';
  }

  if (
    query.includes('education') ||
    query.includes('sena') ||
    query.includes('bootcamp')
  ) {
    return 'La formación incluye Ingeniería de Software en curso en la Corporación Universitaria Iberoamericana, Tecnólogo ADSO del SENA y Full Stack Python Senior en DevSenior-Code Bootcamp.';
  }

  return 'Esa información todavía no está disponible en el portafolio de Diego.';
}

export function AssistantWidget() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: t('assistant.intro'),
    },
  ]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const ask = (message) => {
    const trimmed = message.trim().slice(0, 240);
    if (!trimmed) return;

    setMessages((current) =>
      [
        ...current,
        { role: 'user', text: trimmed },
        { role: 'assistant', text: createAssistantAnswer(trimmed) },
      ].slice(-8),
    );
    setInput('');
  };

  return (
    <div className="assistant-widget">
      <button
        className="assistant-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="assistant-panel"
        onClick={() => setIsOpen((value) => !value)}
      >
        {t('assistant.toggle')}
      </button>
      <section
        id="assistant-panel"
        className={isOpen ? 'assistant-panel is-open' : 'assistant-panel'}
        aria-label={t('assistant.label')}
        aria-hidden={!isOpen}
      >
        <div className="assistant-header">
          <div>
            <span>Portfolio AI</span>
            <h2>{t('assistant.toggle')}</h2>
          </div>
          <button
            type="button"
            aria-label={t('assistant.close')}
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </div>
        <div className="assistant-messages" aria-live="polite">
          {messages.map((message, index) => (
            <p
              className={
                message.role === 'assistant'
                  ? 'assistant-message'
                  : 'user-message'
              }
              key={message.role + index}
            >
              {message.text}
            </p>
          ))}
        </div>
        <div className="quick-prompts" aria-label="Quick prompts">
          {assistantPrompts.map((prompt) => (
            <button type="button" key={prompt} onClick={() => ask(prompt)}>
              {prompt}
            </button>
          ))}
        </div>
        <form
          className="assistant-form"
          onSubmit={(event) => {
            event.preventDefault();
            ask(input);
          }}
        >
          <label htmlFor="assistant-input">{t('assistant.inputLabel')}</label>
          <div>
            <input
              id="assistant-input"
              value={input}
              maxLength="240"
              onChange={(event) => setInput(event.target.value)}
              placeholder={t('assistant.placeholder')}
            />
            <button type="submit" disabled={!input.trim()}>
              {t('assistant.submit')}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
