# Slooze Front-End Challenge

## Overview
This is the solution for the Slooze Commodities Management Front-End System. It is a React application managing authentication, role-based access, and product inventory.

## Features
- **Authentication**: Mock login with role-based redirection.
- **Role-Based Access Control (RBAC)**:
  - **Manager**: Full access to Dashboard, Add/Edit Products.
  - **Store Keeper**: Read-only access to Products list.
- **Dashboard**: Visual summary of inventory stats (Manager only).
- **Product Management**: List, search, filter, and add/edit products.
- **Theme**: Light/Dark mode toggle with persistence.
- **Responsive Design**: Fully responsive layout with mobile-friendly sidebar.

## Tech Stack
- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React (Icons)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1.  Clone the repository and navigate to the project folder:
    ```bash
    cd slooze-app
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:5173](http://localhost:5173) in your browser.

## Mock Credentials

| Role        | Email              | Password    |
| ----------- | ------------------ | ----------- |
| Manager     | manager@slooze.com | password123 |
| StoreKeeper | keeper@slooze.com  | password123 |

## Project Structure
- `src/components`: Reusable UI components.
- `src/context`: React Contexts (Auth, Theme).
- `src/data`: Mock data.
- `src/pages`: Application pages.
- `src/routes`: Routing logic and guards.

## Deployment
To deploy to Vercel:
1.  Push code to GitHub.
2.  Import project in Vercel.
3.  Framework Preset: Vite.
4.  Deploy.
