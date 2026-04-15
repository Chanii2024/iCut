# iCut - Local Batch Converter

iCut is a powerful, privacy-focused batch file processor that runs entirely in your browser. It allows you to rename, convert, and package multiple files securely without ever uploading your data to a server.

## what this does

- **Batch Renaming**: Automatically rename multiple files using a custom prefix and sequential numbering (e.g., Image-1, Image-2).
- **Image Conversion**: Effortlessly convert images between various formats including JPEG, PNG, WEBP, BMP, and ICO.
- **HEIC Support**: Specialized support for converting Apple's HEIC image format to standard web-ready formats.
- **PDF Creation**: Compile multiple images into a single, high-quality PDF document.
- **Batch Processing**: Choose between single or multi-lane processing modes to optimize for speed and system performance.
- **Privacy First**: All processing happens locally on your device; your files never leave your computer.
- **Smart Packaging**: Automatically packages multiple processed files into a single ZIP archive for easy downloading.
- **Modern UI**: Features a sleek, responsive design with full support for Light and Dark modes.

## Tech Stack

- **React**: Modern component-based UI.
- **Vite**: Ultra-fast development and build tool.
- **JSZip**: Client-side ZIP file generation.
- **jsPDF**: Client-side PDF generation.
- **heic2any**: Browser-based HEIC conversion logic.
- **Vanilla CSS**: Premium, responsive styling with a focus on rich aesthetics.

## Getting Started

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the local development server.
4. Drag and drop your files to begin processing.
