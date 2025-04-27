// This script downloads placeholder images for the products
// To run: node scripts/generate-placeholders.js

import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of products with names for placeholder images
const products = [
  { name: "PS5", filename: "ps5.jpg" },
  { name: "Gaming Wheel", filename: "gaming-wheel.jpg" },
  { name: "VR", filename: "vr.jpg" },
  { name: "iPad & Pencil", filename: "ipad.jpg" },
  { name: "Apple Watch", filename: "apple-watch.jpg" },
  { name: "TV", filename: "tv.jpg" },
  { name: "Air Purifier", filename: "air-purifier.jpg" },
  { name: "Home Theater", filename: "home-theater.jpg" },
  { name: "Go Pro", filename: "gopro.jpg" },
  { name: "Drone", filename: "drone.jpg" },
  { name: "Ergonomic Chair", filename: "ergonomic-chair.jpg" },
  { name: "Waterproof Shoes", filename: "waterproof-shoes.jpg" },
  { name: "Backpack", filename: "backpack.jpg" },
  { name: "Trekking Stick", filename: "trekking-stick.jpg" },
  { name: "Sleeping Bag", filename: "sleeping-bag.jpg" },
  { name: "Winter Jacket", filename: "winter-jacket.jpg" },
  { name: "Shoes Chain", filename: "shoes-chain.jpg" },
];

// Ensure the images directory exists
const imagesDir = path.join(__dirname, "../public/images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log("Created images directory");
}

// Download a placeholder image for each product
function downloadImage(name, filename) {
  return new Promise((resolve, reject) => {
    // Format the name for URL
    const formattedName = encodeURIComponent(name);
    const url = `https://placehold.co/600x400/333/fff?text=${formattedName}`;
    const filePath = path.join(imagesDir, filename);

    console.log(`Downloading: ${name} (${url})`);

    const file = fs.createWriteStream(filePath);

    https
      .get(url, (response) => {
        response.pipe(file);

        file.on("finish", () => {
          file.close();
          console.log(`Downloaded: ${filename}`);
          resolve();
        });

        file.on("error", (err) => {
          fs.unlink(filePath, () => {});
          console.error(`Error writing file: ${err.message}`);
          reject(err);
        });
      })
      .on("error", (err) => {
        fs.unlink(filePath, () => {});
        console.error(`Error downloading: ${err.message}`);
        reject(err);
      });
  });
}

// Download all images sequentially
async function downloadAllImages() {
  console.log("Starting download of placeholder images...");

  for (const product of products) {
    try {
      await downloadImage(product.name, product.filename);
    } catch (error) {
      console.error(`Failed to download ${product.filename}`);
    }
  }

  console.log("All placeholder images downloaded successfully!");
}

downloadAllImages();
