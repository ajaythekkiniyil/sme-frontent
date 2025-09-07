export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <p className="mt-4 text-xl">This page could not be found.</p>
            <a href="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg">
                Back to Home
            </a>
        </div>
    );
}
