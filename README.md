This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Current Tech Stack

- Storybook with interaction testing
- Graphql using Rick and Morty
- Framer for transitions
- Next.js App router architecture
- Added React hook Form and Zod for validation and form control

## Deploy on Vercel

Check out the [Next.js website deployment](https://my-app-smoky-five.vercel.app/) for more details.

## Improvements I want to make

Create better Error handling on routes
Create better transitions
Add dark/light theming options
Generate schema types for graphql + create a type folder
Create one Zustand Provider for multiple stores
Refactor the UI components to be more reusable
add i18 to provide different languages and region (Would be cool to switch to different languages within the Rick and Morty world)
