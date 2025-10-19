import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import NoteDetailPage from "./pages/NoteDetailPage.jsx";

const App = () => {
  // Keep notes state in App so it can be shared with HomePage & CreatePage
  const [notes, setNotes] = useState([]);

  // Function to add note immediately after creation
  const addNoteToState = (newNote) => {
    setNotes((prev) => [newNote, ...prev]);
  };

  return (
    <div className="p-6 space-y-4 min-h-screen bg-base-200">
      <Routes>
        <Route
          path="/"
          element={<HomePage notes={notes} setNotes={setNotes} />}
        />
        <Route
          path="/create"
          element={<CreatePage addNoteToState={addNoteToState} />}
        />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default App;
