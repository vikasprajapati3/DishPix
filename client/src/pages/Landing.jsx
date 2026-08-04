export default function Landing() {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 font-sans p-6 flex flex-col justify-between">
            {/* Header */}
            <header className="max-w-4xl mx-auto w-full border-b border-gray-300 pb-4 mb-8">
                <h1 className="text-3xl font-bold text-orange-600">DishPix</h1>
                <p className="text-sm text-gray-500">Every plate has a story. Snap and save it.</p>
            </header>

            {/* Main Section */}
            <main className="max-w-4xl mx-auto w-full flex-1 flex flex-col items-start justify-center my-8">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                    Welcome to DishPix
                </h2>
                <p className="text-lg text-gray-600 mb-6 max-w-xl">
                    Log the meals worth remembering — one photo, one rating, one honest review at a time.
                </p>
                <div className="flex gap-4">
                    <button className="bg-orange-600 text-white font-bold py-2 px-6 rounded hover:bg-orange-700 transition-colors cursor-pointer">
                        Get Started Free
                    </button>
                    <button className="border border-gray-400 text-gray-700 py-2 px-6 rounded hover:bg-gray-200 transition-colors cursor-pointer">
                        Explore Feed
                    </button>
                </div>
            </main>

            {/* Features Section */}
            <section className="max-w-4xl mx-auto w-full bg-white p-6 rounded-md shadow-sm border border-gray-200 my-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Features</h3>
                <ul className="space-y-3">
                    <li>
                        <strong className="text-orange-600">Snap It:</strong> Take a photo when the plate hits the table.
                    </li>
                    <li>
                        <strong className="text-orange-600">Rate It:</strong> Give a quick score based on the actual flavor.
                    </li>
                    <li>
                        <strong className="text-orange-600">Log It:</strong> Save a clear timeline of your food journey.
                    </li>
                </ul>
            </section>

            {/* Footer */}
            <footer className="max-w-4xl mx-auto w-full text-center text-xs text-gray-400 pt-4 border-t border-gray-200 mt-8">
                <p>DishPix — Full-Stack Web Application</p>
            </footer>
        </div>
    );
}
