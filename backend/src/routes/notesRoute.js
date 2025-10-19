import express from 'express';
import { getAllNotes, createNote, updateNote, deleteNote, getNotesId } from '../controllers/notesController.js';

const router = express.Router();

// GET all notes
router.get('/', getAllNotes);
//get all notes
router.get('/:id', getNotesId);

// CREATE a new note
router.post('/', createNote);

// UPDATE a note by ID
router.put('/:id', updateNote);

// DELETE a note by ID
router.delete('/:id', deleteNote);

export default router;
