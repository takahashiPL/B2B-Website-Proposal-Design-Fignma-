
# B2B Website Proposal Design

This is a code bundle for B2B Website Proposal Design. The original project is available at https://www.figma.com/design/tSJewcFsI2xs5bWca6fFSk/B2B-Website-Proposal-Design.

## Tech Stack

- **React 18.3.1** - UI library
- **Vite 6.3.5** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS 4.1.12** - Styling
- **Material-UI** - Component library
- **Radix UI** - Accessible component primitives
- **Motion** - Animation library

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn or pnpm

### 本番ビルド時の環境変数（FTP デプロイ時）

本番用ビルドでは、プロジェクトルートに **`.env.production.local`** を置き、Web3Forms の Access Key などを設定します。

- **サンプル**: リポジトリの `.env.example` をコピーして `.env.production.local` を作成し、値を記入してください。
- **注意**: `.env.production.local` の実キーは**絶対にコミットしないでください**。詳細は [DEPLOY.md](./DEPLOY.md) を参照してください。

## Getting Started

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build

Build for production:

```bash
npm run build
```

The production build will be output to the `dist/` directory.

### Preview Production Build

ビルド結果をローカルで確認する場合:

```bash
npm run build
npm run preview
```

またはポート指定:

```bash
npx vite preview --host --port 4173
```

`http://localhost:4173/` で表示を確認できます。

### 本番デプロイ（FTP / WinSCP）

ローカルで `npm run build` した **`dist/` の中身**を FTP で本番サーバーにアップロードする手順は [DEPLOY.md](./DEPLOY.md) を参照してください。

## Project Structure

```
├── src/
│   ├── app/           # Main application code
│   │   ├── components/ # React components
│   │   └── data/       # Data and content
│   ├── assets/        # Static assets (images, etc.)
│   ├── imports/       # Imported components
│   ├── styles/        # Global styles
│   ├── main.tsx       # Application entry point
│   └── vite-env.d.ts  # Vite type definitions
├── index.html         # HTML template
├── vite.config.ts     # Vite configuration
└── package.json       # Dependencies and scripts
```

## Features

- Responsive design
- Modern UI components
- Smooth animations
- Contact form functionality
- Hero section with background images
- Accordion sections
- Sticky navigation

## Notes

This project was originally generated from Figma Make and has been configured to run locally with Vite + React. All Figma-specific asset imports have been converted to standard Vite asset imports.
  