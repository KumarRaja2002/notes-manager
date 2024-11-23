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
const NOTE_DESCRIPTION_NON_EMPTY = 'Description cannot be empty.';
const NOTE_CATEGORY_INVALID = 'Category must be one of the predefined values.';
const CATEGORY_VALUES = ['Others', 'Personal', 'Work', 'Study', 'Miscellaneous'] as const;

// Validation schema
export const createNoteSchema = object({
  title: pipe(
    string(NOTE_TITLE_STRING),
    nonEmpty(NOTE_TITLE_NON_EMPTY),
    regex(/(.|\s)*\S(.|\s)*/, NOTE_TITLE_NON_EMPTY) // Ensures no only-whitespace titles
  ),
  description: pipe(
    string(NOTE_DESCRIPTION_STRING),
    nonEmpty(NOTE_DESCRIPTION_NON_EMPTY)
  ),
  category: union(
    CATEGORY_VALUES.map((value) => literal(value)), // Validates against enum values
    NOTE_CATEGORY_INVALID
  ),
  created_at: nullish(string()), // Accepts ISO timestamps
  updated_at: nullish(string()), // Accepts ISO timestamps
});

export type createNoteDataInput = InferInput<typeof createNoteSchema>;
