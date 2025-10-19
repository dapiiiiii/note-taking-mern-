import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import toast from "react-hot-toast";
import api from "../lib/axios";

const HomePage = ({ notes, setNotes }) => {
  const [loading, setLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data.notes);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response?.status === 429) {
          setIsRateLimited(true);
          toast.error("Rate limit exceeded. Please try again later.");
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [setNotes]);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}

      {/* lifted content closer to navbar */}
      <div className="max-w-7xl mx-auto px-4 pt-2 pb-4 -mt-4">
        {loading && (
          <div className="text-center text-green-400 py-4">Loading notes...</div>
        )}

        {!loading && notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {!loading && notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-0">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
