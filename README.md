# Poster

A TypeScript project that displays a single white A4 page in landscape orientation (297mm x 210mm) in a web browser.

## Features

- Pure TypeScript (no React, no Babel)
- Webpack for bundling and development server
- A4 landscape page (297mm x 210mm)
- Minimal bundle size (< 1KB)
- NPM for dependency management

## Installation

```bash
npm install
```

## Development

Start the webpack development server:

```bash
npm start
```

The page will automatically open in your browser at `http://localhost:8080`.

## Build

Build the project to static files:

```bash
npm run build
```

The static files will be generated in the `dist` directory.