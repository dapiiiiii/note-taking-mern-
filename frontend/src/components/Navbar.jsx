import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-gray-900 border-b border-gray-700 shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-green-400 font-mono tracking-tight">
          Think Board
        </h1>
        <Link
          to="/create"
          className="btn bg-green-500 hover:bg-green-600 text-white border-none flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>New Note</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
