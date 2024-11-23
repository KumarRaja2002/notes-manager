import { db } from "../lib/db";
import { DBRecord, DBTable, NewDBRecord } from "../utils/types";
import { addSingleRecord, getRecordByColumn, updateSingleRecord, deleteSingleRecord } from '../dbClient/dbClient';
import { notes } from "../schemas/note";
// Define the notes table

export class NotesService {
  // Create a new note
  public static createNote(data: NewDBRecord) {
    return addSingleRecord<DBRecord>( notes, data);
  }

  // Find a note by title
  public static findNoteByTitle(title: string) {
    return getRecordByColumn<DBRecord>( notes, "title", title);
  }

  // Find a note by ID
  public static findNoteById(id: number) {
    return getRecordByColumn<DBRecord>( notes, "id", id);
  }

  // Get all notes
  public static getAllNotes() {
    return db.select().from( notes);
  }

  // Update a note
  public static updateNote(id: number, data: NewDBRecord) {
    console.log(id, data);
    return updateSingleRecord( notes, data, id);
  }

  // Delete a note
  public static deleteNote(id: number) {
    return deleteSingleRecord( notes, id);
  }
}
