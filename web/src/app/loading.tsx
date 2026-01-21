export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-black/80">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-75"></div>
          <div className="absolute inset-0 m-2 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
        </div>
        <p className="animate-pulse text-sm font-medium text-gray-500">Loading...</p>
      </div>
    </div>
  );
}
