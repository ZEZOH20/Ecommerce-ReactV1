# E-Commerce React App

React ecommerce frontend built with Vite, TypeScript, React Query, Context API, Tailwind CSS, Formik, and Yup.

[Live demo](https://ecommerce-react-v1-ruby.vercel.app/)

## Features

- Authentication with signup, signin, protected routes, and logout.
- Product listing and product detail pages.
- Category listing.
- Cart operations: add, increment, decrement, remove, and checkout navigation.
- Cash and online checkout request flow.
- Server state management with TanStack React Query.
- Shared Axios API client for consistent base URL and auth headers.

## Tech Stack

- React 19
- Vite 6
- TypeScript
- TanStack React Query
- React Router
- Axios
- Formik and Yup
- Tailwind CSS
- React Slick

## Project Structure

```txt
src/
  api/                 Shared API client
  components/          Route and UI components
  Context/             Auth context provider and context value
  Interfaces/          Shared TypeScript interfaces
```

## Getting Started

Install dependencies:

```bash
npm ci
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint:

```bash
npm run lint
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Protected home page |
| `/signin` | Sign in |
| `/signup` | Sign up |
| `/products` | Product listing |
| `/product-details/:id/:category` | Product details |
| `/categories` | Category listing |
| `/category-details/:id` | Category details and products |
| `/cart` | Cart |
| `/checkout` | Checkout |

## API

The app uses the public Routemisr ecommerce API. The base URL is configured in [Constants.ts](src/Constants.ts), and requests go through [client.ts](src/api/client.ts).

Authenticated requests use a `token` header. Tokens are stored as raw strings in `localStorage` and mirrored in React context.

## Code Quality

Before opening a review, run:

```bash
npm run lint
npm run build
```

The repository currently does not include automated tests. Add test tooling before making high-risk changes to auth, cart, checkout, or routing behavior.

## CI

GitHub Actions runs dependency installation, lint, and production build on pull requests and pushes to `main`.
