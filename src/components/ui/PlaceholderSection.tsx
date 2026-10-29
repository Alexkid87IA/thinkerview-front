interface Props {
  id: string;
  title: string;
  chapterNum?: string;
  chapterLabel?: string;
}

// Les sections encore à écrire ne s'affichent pas : la maquette ne montre que ce qui est prêt.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function PlaceholderSection(_props: Props) {
  return null;
}
