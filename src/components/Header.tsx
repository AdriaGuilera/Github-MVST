import React from 'react';
import { Github } from 'lucide-react'

/**
 * Header component that displays the application title with GitHub logo
 * @component
 * @param {Function} props.onreset - Callback function to handle reset action when header is clicked
 * @returns {React.JSX.Element} Header component with GitHub logo and title
 */

export function Header({onreset}: {onreset: () => void}) {
    return(
        <header className="bg-gray-800 border-b-gray-700 py-4 mb-8">
                <button className="container mx-auto px-4" onClick={onreset}>
                <div className="flex flex-row gap-1 items-center">
                    <Github className="text-blue-100 h-8 w-8" />
                    <h1 className="text-2xl font-bold text-blue-100">GitHub Profile Viewer</h1>
                </div>
                </button>
        </header>
    );
}