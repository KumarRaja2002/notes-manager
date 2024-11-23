import { Hono } from 'hono';
import { NotesController } from '../controllers/noteController';

export const notesRoutes = new Hono();
const notesController = new NotesController();

// Notes-related routes
notesRoutes.post('/', notesController.create);  // Create a new note
notesRoutes.get('/:id', notesController.getById);  // Get a single note by ID
notesRoutes.get('/', notesController.getAll);  // Get all notes
notesRoutes.patch('/:id', notesController.update);  // Update an existing note
notesRoutes.delete('/:id', notesController.delete);  // Delete a note by ID

export default notesRoutes;
