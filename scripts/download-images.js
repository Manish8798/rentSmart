import fs from "fs";
import https from "https";
import path from "path";

// List of images to download with their placeholder URLs
const images = [
  {
    name: "ps5.jpg",
    url: "https://placehold.co/600x400/333/white?text=PS5",
  },
  {
    name: "gaming-wheel.jpg",
    url: "https://placehold.co/600x400/333/white?text=Gaming+Wheel",
  },
  {
    name: "vr.jpeg",
    url: "https://placehold.co/600x400/333/white?text=VR",
  },
  {
    name: "ipad.jpg",
    url: "https://placehold.co/600x400/333/white?text=iPad+%26+Pencil",
  },
  {
    name: "apple-watch.jpg",
    url: "https://placehold.co/600x400/333/white?text=Apple+Watch",
  },
  {
    name: "tv.jpg",
    url: "https://placehold.co/600x400/333/white?text=TV",
  },
  {
    name: "air-purifier.jpg",
    url: "https://placehold.co/600x400/333/white?text=Air+Purifier",
  },
  {
    name: "home-theater.jpg",
    url: "https://placehold.co/600x400/333/white?text=Home+Theater",
  },
  {
    name: "gopro.jpg",
    url: "https://placehold.co/600x400/333/white?text=GoPro",
  },
  {
    name: "drone.jpg",
    url: "https://placehold.co/600x400/333/white?text=Drone",
  },
  {
    name: "ergonomic-chair.jpg",
    url: "https://placehold.co/600x400/333/white?text=Ergonomic+Chair",
  },
  {
    name: "waterproof-shoes.jpg",
    url: "https://placehold.co/600x400/333/white?text=Waterproof+Shoes",
  },
  {
    name: "backpack.jpg",
    url: "https://placehold.co/600x400/333/white?text=Backpack",
  },
  {
    name: "trekking-stick.jpg",
    url: "https://placehold.co/600x400/333/white?text=Trekking+Stick",
  },
  {
    name: "sleeping-bag.jpg",
    url: "https://placehold.co/600x400/333/white?text=Sleeping+Bag",
  },
  {
    name: "winter-jacket.jpg",
    url: "https://placehold.co/600x400/333/white?text=Winter+Jacket",
  },
  {
    name: "shoes-chain.jpg",
    url: "https://placehold.co/600x400/333/white?text=Shoes+Chain",
  },
];

// Directory to save the images
const imageDir = "./public/images";

// Create directory if it doesn't exist
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

// Function to download an image
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(imageDir, filename);
    const file = fs.createWriteStream(filePath);

    https
      .get(url, (response) => {
        response.pipe(file);

        file.on("finish", () => {
          file.close();
          console.log(`Downloaded: ${filename}`);
          resolve();
        });
      })
      .on("error", (err) => {
        fs.unlink(filePath, () => {}); // Delete the file if there's an error
        console.error(`Error downloading ${filename}: ${err.message}`);
        reject(err);
      });

    file.on("error", (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if there's an error
      console.error(`Error writing ${filename}: ${err.message}`);
      reject(err);
    });
  });
}

// Download all images
async function downloadAllImages() {
  console.log("Starting download of images...");

  for (const image of images) {
    try {
      await downloadImage(image.url, image.name);
    } catch (error) {
      console.error(`Failed to download ${image.name}`);
    }
  }

  console.log("All downloads completed!");
}

// Run the download
downloadAllImages();
