import { useLanguage } from '../../common/LanguageContext';
import { education } from '../../data/education';
import { SectionHeading } from '../../components/SectionHeading';
import { LineIcon } from '../../components/LineIcon';

export function Education() {
  const { t } = useLanguage();
  return (
    <section className="section-shell reveal" id="education">
      <SectionHeading
        eyebrow={t('labels.education')}
        title={t('headings.educationTitle')}
      />
      <div className="education-grid">
        {education.map((item, index) => (
          <article key={item.school}>
            <span className="education-number">0{index + 1}</span>
            <LineIcon
              type={index === 0 ? 'node' : index === 1 ? 'server' : 'browser'}
            />
            <div>
              <span>{item.status}</span>
              <h3>{item.school}</h3>
              <p>{item.program}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
