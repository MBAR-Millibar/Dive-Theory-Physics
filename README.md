# Dive Theory Physics 🎓

[![Next.js](https://img.shields.io/badge/Next.js-14.2.35-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.9-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Deployment](https://img.shields.io/badge/Deployment-Vercel-black?style=for-the-badge&logo=vercel)](https://theory.millibar.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

Interactive scuba diving physics calculators and theory references for students, instructors, and divers.

## 🌊 Live App

Production is available at:

https://theory.millibar.io/

## 📘 Overview

Dive Theory is an educational web app that combines practical calculators with concise theory content. Each topic includes:

- A calculator tab for quick computations
- A theory tab to explain the physics behind the numbers

The project is built with Next.js and TypeScript, with a responsive UI optimized for desktop and mobile.

## 🏢 About Millibar

Dive Theory is a Millibar educational product, published and maintained by Millibar Technologies UG.

- Live app: https://theory.millibar.io/
- Company site: https://millibar.io/

Millibar provides the platform, operational maintenance, and product stewardship for this project.

## ✨ Core Features

- Pressure and partial pressure calculations at depth
- Air consumption planning (SAC/RMV, available gas, reserve checks)
- Gas laws exploration (Boyle, Charles, Dalton, Gay-Lussac)
- Decompression concepts based on Henry's Law
- Buoyancy, displacement, and lift planning tools
- Dedicated lifting operations calculator
- Multilingual interface: English, Italian, German, French, Spanish
- Theory-first learning flow with direct links to calculator theory sections

## 🧭 Calculator Routes

- `/calculators/pressure`
- `/calculators/air-consumption`
- `/calculators/gas-laws`
- `/calculators/henrys-law`
- `/calculators/lift-displacement`
- `/calculators/weight`

Tip: Appending `#theory` to most calculator URLs opens the theory tab directly.

## 🚀 Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript 5
- Tailwind CSS 4
- Radix UI primitives + custom UI components
- Lucide icons
- Vercel Analytics

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- pnpm 9+

### Install

```bash
pnpm install
```

### Run Locally

```bash
pnpm dev
```

Open http://localhost:3000

### Production Build

```bash
pnpm build
pnpm start
```

### Lint

```bash
pnpm lint
```

## 🏗️ Project Structure

```text
app/                    # Next.js App Router pages
	about/                # About and disclaimer page
	calculators/          # Calculator route pages
components/
	calculators/          # Interactive calculator components
	ui/                   # Shared UI primitives
lib/
	i18n/                 # Translation dictionaries and i18n context
public/                 # Static assets
```

## 🌐 Internationalization

Translations are managed in `lib/i18n/translations.ts`.

- Supported locales: `en`, `it`, `de`, `fr`, `es`
- Selected language is persisted in `localStorage`

## ⚠️ Safety Disclaimer

This application is for educational and reference use only.

- Always verify calculations independently
- Always dive within your training and certification limits
- Always follow recognized standards, dive tables/computers, and local regulations

Scuba diving is inherently risky. The maintainers are not liable for decisions made using this tool.

## 🤝 Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines, workflow, and rules for safety-sensitive calculation changes.

## 📄 License

MIT - see [LICENSE](LICENSE) for details.
