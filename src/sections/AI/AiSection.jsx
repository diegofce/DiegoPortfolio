import { useLanguage } from '../../common/LanguageContext';

export function AiSection() {
  const { t } = useLanguage();
  return (
    <section className="section-shell ai-panel reveal">
      <div>
        <p className="eyebrow">{t('ui.aiLabel')}</p>
        <h2>{t('headings.aiTitle')}</h2>
        <p>
          Trabajo con integraciones de APIs de IA, prompt engineering,
          automatización y desarrollo asistido por herramientas como Codex y
          Claude Code.
        </p>
      </div>
      <div
        className="assistant-preview"
        aria-label="AI Portfolio Assistant available as a local portfolio assistant"
      >
        <span>{t('ui.assistantPreview')}</span>
        <strong>{t('assistant.toggle')}</strong>
        <p>{t('ui.askAbout')}</p>
      </div>
    </section>
  );
}
