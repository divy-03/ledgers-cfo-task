# LedgersCFO Compliance Task Manager

## Project Overview

This project is a compliance task management application built for LedgersCFO. It allows teams to manage compliance-related tasks (such as tax filings, reporting, etc.) for their various clients efficiently. The application provides a dashboard to view clients, manage their tasks, track task statuses, and filter them based on different criteria.

## Tech Stack

This project is built with a modern web development stack:

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/guide/react)
- **State Management:** React Hooks & a SWR-like data fetching pattern
- **Forms:** [React Hook Form](https://react-hook-form.com/)
- **Schema Validation:** [Zod](https://zod.dev/)
- **Theming:** [next-themes](https://github.com/pacocoursey/next-themes) for dark mode support

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Bun](https://bun.sh/) (or Node.js and npm)
- [Docker](https://www.docker.com/products/docker-desktop/)

### Setup Instructions

1. **Clone the repository:**

    ```bash
    git clone https://github.com/divy-03/ledgers-cfo-task
    cd ledgers-cfo-task
    ```

2. **Start the PostgreSQL database:**

    This project includes a `docker-compose.yml` file to easily run a PostgreSQL database instance.

    ```bash
    docker compose up -d
    ```

    This will start a PostgreSQL container in the background.

3. **Install dependencies:**

    This project uses `bun` for package management.

    ```bash
    bun install
    ```

    *Alternatively, you can use `npm install`.*

4. **Set up environment variables:**

    The project is pre-configured to connect to the Dockerized PostgreSQL database. The required `DATABASE_URL` is:

    ```
    DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb?schema=public"
    ```

    You should create a `.env` file with this content if it doesn't exist.

5. **Set up the database schema and data:**

    Run the following commands to apply migrations and seed the database:

    ```bash
    # Apply database migrations
    bun run db:migrate

    # Seed the database with initial data
    bun run db:seed
    ```

6. **Run the development server:**

    ```bash
    bun run dev
    ```

    The application should now be running at [http://localhost:3000](http://localhost:3000).
