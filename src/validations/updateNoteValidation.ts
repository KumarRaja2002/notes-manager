import {
  description,
  InferInput,
  nonEmpty,
  object,
  pipe,
  string,
  nullish,
  number,
  regex,
  union,
  literal,
} from 'valibot';

// Validation messages
const NOTE_TITLE_STRING = 'Title must be a string.';
const NOTE_TITLE_NON_EMPTY = 'Title cannot be empty.';
const NOTE_DESCRIPTION_STRING = 'Description must be a string.';
const NOTE_CATEGORY_INVALID = 'Category must be one of the predefined values.';
const CATEGORY_VALUES = ['Others', 'Personal', 'Work', 'Study', 'Miscellaneous'] as const;

// Update Note Schema
export const updateNoteSchema = object({
  title: nullish(
    pipe(
      string(NOTE_TITLE_STRING),
      nonEmpty(NOTE_TITLE_NON_EMPTY),
      regex(/(.|\s)*\S(.|\s)*/, NOTE_TITLE_NON_EMPTY) // Ensures no only-whitespace titles
    )
  ),
  description: nullish(
    pipe(
      string(NOTE_DESCRIPTION_STRING),
      nonEmpty('Description cannot be empty.')
    )
  ),
  category: nullish(
    union(
      CATEGORY_VALUES.map((value) => literal(value)), // Validates against enum values
      NOTE_CATEGORY_INVALID
    )
  ),
  updated_at: nullish(string()), // Accepts ISO timestamps for optional field
});

export type updateNoteDataInput = InferInput<typeof updateNoteSchema>;
