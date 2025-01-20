import React from 'react';
import { Github } from 'lucide-react'


export function Header({onreset}: {onreset: () => void}) {
    return(
        <header className="bg-gray-800 border-b-gray-700 py-4 mb-8">
                <div className="container mx-auto px-4" onClick={onreset}>
                <div className="flex flex-row gap-1 items-center">
                    <Github className="text-blue-100 h-8 w-8" />
                    <h1 className="text-2xl font-bold text-blue-100">GitHub Profile Viewer</h1>
                </div>
                </div>
        </header>
    );
}