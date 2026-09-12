# Fyaora Waitlist

An accessible service-provider waitlist dashboard built for a provider operations team. The interface helps staff search, filter, sort, review, and manage provider registrations from one compact workspace.

## Live Demo

Add the deployed URL here after publishing the app:

`https://your-deployment-url.example`

## Features

- Search providers across the table data
- Filter by postcode, registration status, signup date, vendor type, and service offering
- Sort table columns in ascending or descending order
- Select individual providers or all providers on the current page
- Paginate through the waitlist
- Open provider details in a keyboard-accessible modal
- Responsive layout for desktop, tablet, and mobile screens
- Success feedback when filters are applied

## Tech Stack

- React 19
- Vite
- JavaScript and JSX
- CSS
- Lucide React for interface icons
- Vitest and React Testing Library for tests

## Getting Started

### Requirements

- Node.js 20 or newer
- npm

### Install and run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |

## Accessibility

The dashboard uses semantic landmarks, labelled form controls, table headers, live regions for feedback, keyboard-sortable columns, and a modal with focus management and Escape-to-close behavior.

## Design and Engineering Notes

Filters are staged in the sidebar and applied explicitly so users can make several selections before updating the table. Search updates immediately, while sorting and pagination reset to the first page to keep the result context predictable.

The current data source is local fixture data in `src/data/providers.js`, which keeps the demo deterministic and makes the filtering and interaction behavior easy to evaluate. A production version could replace this module with an API client and server-side pagination without changing the main table workflow.

## Project Structure

```text
src/
	components/       Reusable header, sidebar, table, and modal UI
	data/             Deterministic provider fixture data
	App.jsx           Filtering, sorting, selection, and pagination state
	App.css           Application styles
	App.test.jsx      End-to-end component behavior tests
```



