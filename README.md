# Pixel Prestige Website

Premium showcase website for Pixel Prestige (FR/EN), built with Next.js App Router, Tailwind CSS, Framer Motion, GSAP, and React Three Fiber.

## Stack

- Next.js 16 (App Router, static export)
- TypeScript
- Tailwind CSS v4
- Framer Motion + GSAP ScrollTrigger
- React Three Fiber + drei
- React Hook Form + Zod

## Local setup

1. Install dependencies:
   `npm install`
2. Copy environment variables:
   `Copy-Item .env.example .env.local`
3. Start dev server:
   `npm run dev`

## Required environment variables

- `NEXT_PUBLIC_CONTACT_ENDPOINT`: Formspree endpoint for form submissions, e.g. `https://formspree.io/f/your_form_id`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: GA4 measurement id (optional, leave empty to keep analytics disabled)

## Launch checklist

- Fill legal identity details in `lib/site.ts` before public launch.
- Keep `NEXT_PUBLIC_GA_MEASUREMENT_ID` empty until you actually want analytics enabled on the deployed build.

## Build & export

- Production build:
  `npm run build`
- Static output is generated in `out/`

This project is configured with `output: "export"` for static hosting on Hostinger shared hosting.
