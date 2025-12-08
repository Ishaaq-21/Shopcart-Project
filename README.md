# Shopcart Project

This is a Next.js e-commerce application built with a modern tech stack.

## Features

- **Next.js 16:** Utilizes the latest features of the Next.js framework.
- **Sanity.io:** Content management for products and other site content.
- **Clerk:** User authentication and management.
- **Stripe:** Secure payment processing.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **TypeScript:** For type-safe code.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm (or yarn/pnpm) installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd shopcart-project
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```
4.  Set up your environment variables. Create a `.env.local` file in the root of the project and add the necessary keys for Clerk, Sanity, and Stripe.

## Available Scripts

In the project directory, you can run the following commands:

### `npm run dev`

Runs the application in development mode with Turbopack. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will automatically reload when you make changes.

### `npm run build`

Builds the application for production. The build artifacts will be stored in the `.next/` directory.

### `npm run start`

Starts a production server. This should be run after building the application.

### `npm run lint`

Runs ESLint to analyze the code for potential errors and style issues.

## Key Dependencies

- **@clerk/nextjs:** For user authentication.
- **@radix-ui/\*:** A collection of unstyled, accessible UI components.
- **@sanity/image-url, @sanity/vision, next-sanity, sanity:** For integrating the Sanity.io CMS.
- **stripe:** For handling payments with Stripe.
- **tailwindcss:** For styling the application.
- **embla-carousel-react:** For creating carousels.
- **lucide-react:** A library of beautiful and consistent icons.
- **react-hot-toast:** For adding notifications to the app.
