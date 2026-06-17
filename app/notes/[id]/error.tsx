'use client';

type Props = {
  error: Error;
};

export default function NotesError({ error }: Props) {
  return <p>Could not fetch the list notes. {error.message}</p>;
}
