# RetryLens AI — web frontend scaffold

This is a Next.js App Router frontend scaffold for the RetryLens AI NestJS API.

THE FRONTEND LIVE URL: https://sing-flow-zug6.onrender.com

## Setup

1. Put this folder in your project as `web/`.
2. Ensure your Next.js app uses the `@/*` alias for the project root (the standard `create-next-app` TypeScript setup does).
3. Create `web/.env.local`:

   ```dotenv
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

   Replace the port with the actual NestJS API port.
4. Start the API, then run the frontend:

   ```bash
   npm run dev
   ```

## API expectations

- `GET /incidents` returns `IncidentSummary[]`.
- `GET /incidents/:id` returns an `Incident`.
- `POST /incidents/:id/analyze` returns the updated `Incident`.
- `POST /incidents/:id/replay` accepts `{ "mode": "broken" | "fixed" }` and returns the updated `Incident`.

The supplied backend currently returns IDs inconsistently: `fetchIncidents()` returns numeric IDs, while `view()` converts IDs to strings. The frontend types reflect that distinction. Consider standardizing the API response shape.

If the frontend runs on a different origin from NestJS, configure CORS in the backend to allow the frontend origin.
'''