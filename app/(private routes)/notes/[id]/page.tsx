import type { Metadata } from 'next';
import { fetchNoteById } from '@/lib/api/clientApi';
import NoteDetails from './NoteDetails.client';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return {
    title: `${note.title} | NoteHub`,
    description: note.content.slice(0, 100),
    openGraph: {
      title: `${note.title} | NoteHub`,
      description: note.content.slice(0, 100),
      url: `https://notehub.com/notes/${id}`,
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

export default async function NoteDetailsPage() {
  return <NoteDetails />;
}
