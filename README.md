# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# RentSmart

RentSmart is a modern web application for renting tech products, gaming gear, home appliances, and adventure equipment.

## Features

- Browse products by category (Gaming, Apple, Home, Lifestyle, Adventure)
- Filter products based on priority
- Responsive design for all screen sizes
- Product cards with images, descriptions, and rental prices

## Project Structure

The project is built with React and uses Vite as the build tool. Here's the structure:

```
rentSmart/
├── public/
│   └── images/       # Product images
├── src/
│   ├── assets/       # Static assets
│   ├── components/   # React components
│   ├── data/         # Data files
│   ├── App.css       # Main styles
│   ├── App.jsx       # Main component
│   ├── index.css     # Global styles
│   └── main.jsx      # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/rentSmart.git
   cd rentSmart
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

## Adding New Products

To add new products, update the `src/data/products.js` file with new entries following the existing format:

```javascript
{
  id: 1,
  category: "Category",
  name: "Product Name",
  priority: "High|Medium|Low",
  description: "Product description",
  price: 25.99,
  image: "/images/product-image.jpg"
}
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
