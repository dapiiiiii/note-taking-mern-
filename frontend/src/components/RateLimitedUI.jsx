// ✅ Correct
import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 max-w-md w-full text-center pointer-events-auto">
        <div className="flex flex-col items-center">
          <ZapIcon className="w-12 h-12 text-yellow-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Rate Limit Reached</h2>
          <p className="text-gray-700">You are sending requests too quickly. Please wait a moment.</p>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;
