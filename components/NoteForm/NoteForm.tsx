'use client';

import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api/clientApi';
import { useNoteStore } from '../../lib/store/noteStore';
import type { NoteTag } from '../../types/note';
import css from './NoteForm.module.css';

const tags: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const draft = useNoteStore(state => state.draft);
  const setDraft = useNoteStore(state => state.setDraft);
  const clearDraft = useNoteStore(state => state.clearDraft);

  const handleSubmit = async (formData: FormData) => {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const tag = formData.get('tag') as NoteTag;

    await createNote({
      title,
      content,
      tag,
    });

    clearDraft();
    queryClient.invalidateQueries({ queryKey: ['notes'] });
    router.push('/notes/filter/all');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <label className={css.label}>
        Title
        <input
          className={css.input}
          type="text"
          name="title"
          defaultValue={draft.title}
          onChange={event => setDraft({ title: event.target.value })}
          required
        />
      </label>

      <label className={css.label}>
        Content
        <textarea
          className={css.textarea}
          name="content"
          defaultValue={draft.content}
          onChange={event => setDraft({ content: event.target.value })}
          required
        />
      </label>

      <label className={css.label}>
        Tag
        <select
          className={css.select}
          name="tag"
          defaultValue={draft.tag}
          onChange={event => setDraft({ tag: event.target.value as NoteTag })}
          required
        >
          {tags.map(tag => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </label>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}

// import css from './NoteForm.module.css';

// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { useMutation, useQueryClient } from '@tanstack/react-query';

// import { createNote } from '../../lib/api';
// import type { CreateNoteData } from '../../lib/api';

// interface NoteFormProps {
//   onClose: () => void;
// }

// const initialValues: CreateNoteData = {
//   title: '',
//   content: '',
//   tag: 'Todo',
// };

// const validationSchema = Yup.object({
//   title: Yup.string()
//     .min(3, 'Minimum 3 characters')
//     .max(50, 'Maximum 50 characters')
//     .required('Title is required'),
//   content: Yup.string().max(500, 'Maximum 500 characters'),

//   tag: Yup.string()
//     .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
//     .required('Tag is required'),
// });
// export default function NoteForm({ onClose }: NoteFormProps) {
//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: createNote,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['notes'] });
//       onClose();
//     },
//   });

//   const handleSubmit = (value: CreateNoteData) => {
//     mutation.mutate(value);
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//     >
//       <Form className={css.form}>
//         <div className={css.formGroup}>
//           <label htmlFor="title">Title</label>
//           <Field id="title" type="text" name="title" className={css.input} />
//           <ErrorMessage name="title" component="span" className={css.error} />
//         </div>

//         <div className={css.formGroup}>
//           <label htmlFor="content">Content</label>
//           <Field
//             as="textarea"
//             id="content"
//             name="content"
//             rows={8}
//             className={css.textarea}
//           />
//           <ErrorMessage name="content" component="span" className={css.error} />
//         </div>

//         <div className={css.formGroup}>
//           <label htmlFor="tag">Tag</label>
//           <Field as="select" id="tag" name="tag" className={css.select}>
//             <option value="Todo">Todo</option>
//             <option value="Work">Work</option>
//             <option value="Personal">Personal</option>
//             <option value="Meeting">Meeting</option>
//             <option value="Shopping">Shopping</option>
//           </Field>
//           <ErrorMessage name="tag" component="span" className={css.error} />
//         </div>

//         <div className={css.actions}>
//           <button type="button" className={css.cancelButton} onClick={onClose}>
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className={css.submitButton}
//             disabled={mutation.isPending}
//           >
//             Create note
//           </button>
//         </div>
//       </Form>
//     </Formik>
//   );
// }
