
# B2B Website Proposal Design

This is a code bundle for B2B Website Proposal Design. The original project is available at https://www.figma.com/design/tSJewcFsI2xs5bWca6fFSk/B2B-Website-Proposal-Design.

## Tech Stack

- **React 18.3.1** - UI library
- **Vite 6.3.5** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS 4.1.12** - Styling
- **Material-UI** - Component library
- **Radix UI** - Accessible component primitives
- **Motion** - Animation library

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn or pnpm

## Getting Started

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build

Build for production:

```bash
npm run build
```

The production build will be output to the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run build
npx vite preview --port 4173
```

The preview will be available at `http://localhost:4173/`

## Project Structure

```
├── src/
│   ├── app/           # Main application code
│   │   ├── components/ # React components
│   │   └── data/       # Data and content
│   ├── assets/        # Static assets (images, etc.)
│   ├── imports/       # Imported components
│   ├── styles/        # Global styles
│   ├── main.tsx       # Application entry point
│   └── vite-env.d.ts  # Vite type definitions
├── index.html         # HTML template
├── vite.config.ts     # Vite configuration
└── package.json       # Dependencies and scripts
```

## Features

- Responsive design
- Modern UI components
- Smooth animations
- Contact form functionality
- Hero section with background images
- Accordion sections
- Sticky navigation

## Notes

This project was originally generated from Figma Make and has been configured to run locally with Vite + React. All Figma-specific asset imports have been converted to standard Vite asset imports.
  