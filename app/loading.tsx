export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-neutral-700 border-t-white rounded-full animate-spin" />

        {/* Text */}
        <p className="text-lg font-medium text-neutral-400">Loading Dashboard...</p>
      </div>
    </div>
  );
}
