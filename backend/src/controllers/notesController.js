import Note from '../models/Note.js';

// ✅ getAllNotes
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });// Sort by newest first
    res.status(200).json({
      message: "All notes retrieved successfully",
      notes
    });
  } catch (error) {
    console.error("Error retrieving notes:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// ✅ getNotesId
export async function getNotesId(req, res) {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    console.error("Error retrieving note:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// ✅ createNote
export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// ✅ updateNote
export async function updateNote(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note has been updated" });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// ✅ deleteNote
export async function deleteNote(req, res) {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note has been deleted" });
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
