# Next.js Users Dashboard ⚡️

This project demonstrates a user dashboard built with **Next.js App Router**. It features a lightweight and simple internationalization (i18n) implementation without complex context providers, achieved by passing a translation dictionary (`dict`) via props.

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **i18n:** Custom implementation (Server-side dictionary loading)

## ✨ Features

- 🌍 **Multi-language:** Support for EN/FR locales via URL segments (e.g., `/en`, `/fr`).
- 🔍 **Search:** Server-side user filtering using URL Search Params + Debounce.
- 📄 **Pagination:** Page-based navigation.
- ⚡️ **SSR:** Data and translations are fetched in parallel on the server (`Promise.all`).

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

````

2.  **Run the development server:**

    ```bash
    npm run dev
    ```

3.  **Open in browser:**
    Navigate to [http://localhost:3000/en](https://www.google.com/search?q=http://localhost:3000/en)

````
