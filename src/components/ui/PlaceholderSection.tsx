import s from './PlaceholderSection.module.css';

interface Props {
  id: string;
  title: string;
  chapterNum?: string;
  chapterLabel?: string;
}

export default function PlaceholderSection({ id, title, chapterNum, chapterLabel }: Props) {
  return (
    <section className={s.section} id={id} aria-label={title}>
      <div className={s.inner}>
        {chapterNum && (
          <div className={s.chapterMark}>
            <span className={s.chNum}>Ch.{chapterNum}</span>
            <span className={s.chSep}>/</span>
            <span className={s.chLabel}>{chapterLabel || title}</span>
          </div>
        )}
        <h2 className={s.title}>{title}</h2>
        <div className={s.placeholder}>
          <span className={s.placeholderText}>Section à remplir</span>
        </div>
      </div>
    </section>
  );
}
