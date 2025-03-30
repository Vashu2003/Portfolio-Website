export default function Projects() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Project cards will be added here */}
        <div className="p-4 border rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
          <p className="text-gray-600">Project details will be added shortly.</p>
        </div>
      </div>
    </main>
  )
}
