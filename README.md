# HN Scout 🧭

A modern Hacker News client built with Next.js to surface high-quality stories via a custom ranking algorithm. Completed as a 3-day technical assessment.

**Live Deployment:** [https://hn-scout.vercel.app/](https://hn-scout.vercel.app/)

![Screenshot of HN Scout](./public/screenshot.png)

---

## Core Features

-   **Custom Quality Score:** Ranks stories by a score based on points, comments, and time.
-   **Server-Side Rendering:** Fast, server-rendered pages with pagination for optimal performance.
-   **Per-Page Re-ranking:** Sorts each page by score to highlight the best content locally.
-   **Domain Filtering:** Filter stories by domain (e.g., `github.com`).
-   **Reading List:** Save articles to a persistent reading list (`localStorage`).
-   **Detailed Item View:** View story details and the latest comments.
-   **Seamless UI States:** Smooth loading, error, and empty states using Next.js conventions.
-   **Responsive & Accessible:** A mobile-first, keyboard-navigable, and accessible dark-mode UI.

## Tech Stack

-   **Framework:** Next.js (App Router)
-   **Styling:** Tailwind CSS
-   **UI Components:** shadcn/ui
-   **Icons:** Lucide React
-   **Date/Time:** date-fns
-   **Deployment:** Vercel

---

## Design & Implementation Choices

### UI/UX

The UI is clean, information-dense, and mobile-first. A dark theme reduces eye strain, while a clear visual hierarchy guides the user. Next.js App Router features like `loading.tsx` and `error.tsx` are used for seamless, non-jarring state transitions.

### Algorithm: The Quality Score

The formula balances popularity with freshness to ensure engaging content surfaces effectively.

**Formula:** `Score = (Points + Comments * 2) / (HoursAgo + 2)^1.8`

-   **Prominence:** Weights comments heavily to reward engaging discussion.
-   **Time Decay:** Penalizes older posts to keep content fresh, with a 2-hour grace period for new stories.
-   **Per-Page Re-ranking:** This pragmatic, API-friendly choice avoids the performance cost of a global ranking system while providing immediate value on each page.

### AI Tools Used

AI tools like GitHub Copilot and Google AI Studio accelerated development by assisting with boilerplate code, utility functions, and initial Tailwind CSS class generation.

---

## How to Run Locally

1.  Clone the repository:
    ```bash
    git clone https://github.com/Elanchezhian2712/HN-Scout.git
    ```
2.  Navigate to the directory:
    ```bash
    cd hn-scout
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Run the dev server:
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

