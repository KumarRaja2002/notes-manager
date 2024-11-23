import { Context } from "hono"; // Assuming you're using Hono framework
import validate from "../helpers/validationHelper";
import { createNoteSchema } from '../validations/createNoteValidation';
import { updateNoteSchema } from '../validations/updateNoteValidation';
import { NotesService } from "../services/noteService";
import { ResponseHelper } from '../helpers/responseHelper';
import { ResourceAlreadyExistsException } from "../exceptions/resourseAlreadyExistsException";
import {
  NOTE_EXISTS,
  NOTES_CREATED,
  NOTE_UPDATED,
  NOTE_DELETED,
  NOTE_NOT_FOUND,
  NOTES_FETCHED,
} from "../constants/appMessages";

export class NotesController {
  // Create a new note
  public async create(c: Context) {
    const noteData = await c.req.json();

    const validatedData = await validate(createNoteSchema, noteData);

    const originalTitle = validatedData.title.trim();
    const titleToCheck = originalTitle.toLowerCase();

    const existingNote = await NotesService.findNoteByTitle(titleToCheck);

    if (existingNote ) {
      throw new ResourceAlreadyExistsException("title", NOTE_EXISTS);
    }
    validatedData.title = originalTitle;

    // Ensure category is set correctly (defaults to 'Others' if not provided)
    validatedData.category = validatedData.category || 'Others';

    const newNote = await NotesService.createNote(validatedData);

    return ResponseHelper.sendSuccessResponse(c, 201, NOTES_CREATED, newNote);
  }

  // Get a single note by ID
  public async getById(c: Context) {
    const { id } = c.req.param();
    const note = await NotesService.findNoteById(Number(id));

    if (!note) {
      return ResponseHelper.sendErrorResponse(c, 404, NOTE_NOT_FOUND);
    }

    return ResponseHelper.sendSuccessResponse(c, 200, NOTES_FETCHED, note);
  }

  // Get all notes
  public async getAll(c: Context) {
    const notes = await NotesService.getAllNotes();

    return ResponseHelper.sendSuccessResponse(c, 200, NOTES_FETCHED, notes);
  }

  // Update a note
  public async update(c: Context) {
    const { id } = c.req.param();
    const noteData = await c.req.json();
    console.log(noteData,id);
    const validatedData = await validate(updateNoteSchema, noteData);

    const existingNote = await NotesService.findNoteById(Number(id));

    if (!existingNote) {
      return ResponseHelper.sendErrorResponse(c, 404, NOTE_NOT_FOUND);
    }

    // Ensure category is set correctly (defaults to 'Others' if not provided)
    validatedData.category = validatedData.category || 'Others';

    const updatedNote = await NotesService.updateNote(Number(id), validatedData);

    return ResponseHelper.sendSuccessResponse(c, 200, NOTE_UPDATED, updatedNote);
  }

  // Delete a note
  public async delete(c: Context) {
    const { id } = c.req.param();

    const existingNote = await NotesService.findNoteById(Number(id));

    if (!existingNote) {
      return ResponseHelper.sendErrorResponse(c, 404, NOTE_NOT_FOUND);
    }

    await NotesService.deleteNote(Number(id));

    return ResponseHelper.sendSuccessResponse(c, 200, NOTE_DELETED, { id });
  }
}
