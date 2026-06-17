import type { Metadata } from 'next';
import NotesClient from './Notes.client';

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? 'All notes' : slug[0];

  return {
    title: `${tag} | NoteHub`,
    description: `Browse notes filtered by ${tag}.`,
    openGraph: {
      title: `${tag} | NoteHub`,
      description: `Browse notes filtered by ${tag}.`,
      url: `https://notehub.com/notes/filter/${slug.join('/')}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub application preview',
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0];

  return <NotesClient tag={tag} />;
}
