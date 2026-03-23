# LedgersCFO Compliance Task Manager

## Project Overview

This project is a compliance task management application built for LedgersCFO. It allows teams to manage compliance-related tasks (such as tax filings, reporting, etc.) for their various clients efficiently. The application provides a dashboard to view clients, manage their tasks, track task statuses, and filter them based on different criteria.

## Tech Stack

This project is built with a modern web development stack:

-   **Framework:** [Next.js](https://nextjs.org/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Database:** [PostgreSQL](https://www.postgresql.org/)
-   **ORM:** [Prisma](https://www.prisma.io/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
-   **Icons:** [Lucide React](https://lucide.dev/guide/react)
-   **State Management:** React Hooks & a SWR-like data fetching pattern
-   **Forms:** [React Hook Form](https://react-hook-form.com/)
-   **Schema Validation:** [Zod](https://zod.dev/)
-   **Theming:** [next-themes](https://github.com/pacocoursey/next-themes) for dark mode support

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (v20 or later recommended)
-   [npm](https://www.npmjs.com/) (or [Bun](https://bun.sh/))
-   A running [PostgreSQL](https://www.postgresql.org/download/) database instance.

### Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd ledgers-cfo-task
    ```

2.  **Install dependencies:**

    This project uses `npm` for package management.

    ```bash
    npm install
    ```
    *Note: A `bun.lock` file is also present, so you can use `bun install` as an alternative if you have Bun installed.*

3.  **Set up environment variables:**

    Create a file named `.env` in the root of your project directory. Add the connection string for your PostgreSQL database:

    ```
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
    ```
    Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` with your PostgreSQL credentials. For example: `postgresql://postgres:password@localhost:5432/cfo-tasks?schema=public`.

4.  **Set up the database:**

    Run the following commands to apply migrations to create the database schema, and then seed the database with some initial data.

    ```bash
    # Apply database migrations
    npm run db:migrate

    # Seed the database with initial data
    npm run db:seed
    ```

5.  **Run the development server:**

    ```bash
    npm run dev
    ```

    The application should now be running at [http://localhost:3000](http://localhost:3000).

### Available Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the application for production.
-   `npm run start`: Starts a production server.
-   `npm run lint`: Lints the codebase using ESLint.
-   `npm run db:generate`: Generates Prisma Client based on your schema.
-   `npm run db:push`: Pushes the Prisma schema to the database without creating a migration (useful for prototyping).
-   `npm run db:migrate`: Creates and applies a new migration.
-   `npm run db:seed`: Seeds the database with data from `prisma/seed.ts`.
-   `npm run db:studio`: Opens Prisma Studio, a GUI for your database.