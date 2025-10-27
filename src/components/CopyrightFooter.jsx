// src/components/CopyrightFooter.jsx
import React from 'react';

function CopyrightFooter() {
    return (
        <footer className="bg-gray-100 py-4 border-t border-gray-200">
            <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Bharat 24/7. All rights reserved.
            </div>
        </footer>
    );
}

export default CopyrightFooter;