# StockForm

A simple React + Vite application for tracking stock purchases and calculating profit/loss.

## Features

- Add stocks with symbol, quantity, and purchase price
- View a list of added stocks
- See real-time profit/loss calculations (requires API key)
- Clean, responsive UI

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd stockform-capstone-hhm
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the App

Start the development server:

```sh
npm run dev
```

Visit the local URL shown in your terminal (usually http://localhost:5173).

### Build for Production

```sh
npm run build
```

### Linting

```sh
npm run lint
```

## Project Structure

- `src/` - Main source code
  - `components/` - React components (StockForm, StockList, etc.)
  - `contexts/` - React context for price fetching
  - `hooks/` - Custom React hooks
  - `App.jsx` - Main app component
  - `App.css` - App styling
- `public/` - Static assets

## API Key

The app uses a stock price API. Set your API key in `src/main.jsx` (see the `API_KEY` variable).

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
