import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <div className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-2 border-solid border-[#00FF9D] p-3">
      <Link to={`/note/${note._id}`} className="card-body p-0 cursor-pointer">
        <h3 className="card-title text-base-content text-sm mb-1">{note.title}</h3>
        <p className="text-sm text-base-content/70 line-clamp-3 leading-tight">
          {note.content}
        </p>
      </Link>

      {/* compact footer — slim separator and reduced padding */}
      <div className="card-actions justify-between items-center border-t border-base-200 pt-2 px-1">
        <span className="text-xs text-base-content/60">
          {formatDate(new Date(note.createdAt))}
        </span>

        <div className="flex items-center gap-2">
          <PenSquareIcon className="h-4 w-4" />
          <button
            className="btn btn-ghost btn-xs text-error p-0"
            onClick={(e) => handleDelete(e, note._id)}
            aria-label="Delete note"
          >
            <Trash2Icon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
