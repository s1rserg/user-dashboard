# User Management Dashboard

A server-side rendered Next.js application demonstrating user management features including search, filtering, and pagination using URL parameters for state persistence.

## Technologies

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Data Source:** JSONPlaceholder API

## Features

- **Server-Side Rendering (SSR):** Data fetching occurs on the server to ensure optimal initial load performance.
- **URL-Based State Management:** Search queries and pagination states are synchronized with URL search parameters. This enables deep linking and preserves state on page reloads.
- **Debounced Search:** Implements a custom hook to optimize input handling and reduce unnecessary router pushes during typing.
- **Internationalization (i18n):** Middleware-based routing logic for multi-language support.
- **Responsive Design:** Adaptive table layout that transforms into card views on mobile devices.

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm or yarn

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser.
