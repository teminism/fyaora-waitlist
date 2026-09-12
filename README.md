# Fyaora Waitlist

An accessible service-provider waitlist dashboard built for a provider operations team. The interface helps staff search, filter, sort, review, and manage provider registrations from one compact workspace.


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

## Decisions & Trade-offs

### Custom CSS instead of a UI library

I used custom CSS rather than a component library because this dashboard has a focused visual system and a small number of reusable patterns. That keeps the bundle and dependency surface smaller, gives precise control over the table, sidebar, modal, and responsive layout, and avoids overriding a library's default styles. The trade-off is that accessibility states, responsive behavior, and component consistency need to be maintained deliberately in the application's own styles.

### State ownership

The main workflow state lives in `App.jsx` because filtering, sorting, pagination, selection, search, and the selected provider affect more than one child component. The sidebar owns only filter input events through callbacks, while the table and modal remain presentational and receive data and actions as props. This keeps the data flow explicit and makes the core interactions straightforward to test.

### Staged filters and derived data

Sidebar selections are kept separate from `appliedFilters`, so users can make several changes before committing them with the Filter button. The filtered, sorted, and paginated collections are derived with `useMemo` instead of stored as duplicate state. This reduces synchronization bugs at the cost of slightly more computation during renders, which is appropriate for the current local dataset.

### Local fixture data

The app uses deterministic local data rather than an API so the demo works offline, has predictable test results, and can be reviewed without authentication or backend setup. The trade-off is that it does not yet demonstrate loading, error, or server-side pagination states. Those concerns can be added behind the existing provider data boundary when a real API is introduced.

## Project Structure

```text
src/
	components/       Reusable header, sidebar, table, and modal UI
	data/             Deterministic provider fixture data
	App.jsx           Filtering, sorting, selection, and pagination state
	App.css           Application styles
	App.test.jsx      End-to-end component behavior tests
```



