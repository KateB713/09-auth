'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import Modal from '../../../../components/Modal/Modal';
import { fetchNoteById } from '../../../../lib/api';
import css from '@/components/NoteDetails/NoteDetails.module.css';

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <button type="button" onClick={handleClose}>
        Close
      </button>

      {isLoading && <p>Loading note...</p>}
      {isError && <p>Something went wrong...</p>}

      {note && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>

            <p className={css.content}>{note.content}</p>
            <p className={css.tag}>{note.tag}</p>

            {note.createdAt && (
              <p className={css.date}>
                {new Date(note.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
