const base = import.meta.env.BASE_URL || "/";
const products = [
  {
    id: 1,
    category: "Gaming",
    name: "PS5 + 1 Controller + Games (100+)",
    priority: "High",
    description:
      "Next-gen PlayStation 5 with lightning-fast SSD, 3D audio, haptic feedback controller, and 4K gaming up to 120fps.",
    price: 299,
    priceUnit: "day",
    image: base + "images/sony_ps5.jpg",
    features: ["4K Gaming", "Ray Tracing", "3D Audio", "DualSense Controller"],
  },
  {
    id: 2,
    category: "Gaming",
    name: "PS5 + Gaming Wheel + 1 Controller",
    priority: "High",
    description:
      "Ultimate racing experience bundle! PlayStation 5 console with professional gaming wheel featuring force feedback and responsive pedals. Perfect for racing enthusiasts who want the complete sim racing setup with premium haptic feedback and 4K gaming.",
    shortDescription:
      "Complete racing setup with PS5 console, professional force feedback gaming wheel, and DualSense controller for the ultimate racing experience.",
    price: 499,
    priceUnit: "day",
    image: base + "images/ps5_combo.png",
    features: [
      "Racing Setup",
      "Force Feedback",
      "Haptic Controller",
      "Pro Pedals",
    ],
  },
  {
    id: 3,
    category: "Gaming",
    name: "Gaming Wheel",
    priority: "Low",
    description:
      "Professional racing wheel with force feedback, precision steering, and responsive pedals. Compatible with PS5 and PC.",
    price: 249,
    priceUnit: "day",
    image: base + "images/gaming_wheel.jpg",
    features: ["Force Feedback", "Pedals Included", "Compatible with PS5"],
  },
  {
    id: 4,
    category: "Gaming",
    name: "PlayStation VR2",
    priority: "Medium",
    description:
      "The PlayStation VR2 (PSVR2) features an OLED display with a resolution of 2000 x 2040 pixels per eye, a refresh rate of 90Hz or 120Hz, and a field of view of approximately 110 degrees. It utilizes a six-axis motion sensing system (gyroscope and accelerometer) and an IR proximity sensor for tracking, along with four embedded cameras for headset and controller tracking and IR cameras for eye tracking. The headset also features vibration feedback and a built-in microphone, with audio output through a stereo headphone jack.",
    shortDescription:
      "High-resolution OLED VR headset with 2000x2040 per eye, 90/120Hz refresh rate, and advanced tracking technology for immersive gaming.",
    price: 249,
    priceUnit: "day",
    image: base + "images/vr.jpeg",
    features: [
      "OLED Display 2000x2040",
      "90Hz/120Hz Refresh Rate",
      "Eye Tracking",
      "Haptic Feedback",
    ],
  },
  {
    id: 5,
    category: "Apple",
    name: "iPad & Pencil",
    priority: "High",
    description:
      "Latest iPad with M2 chip and Apple Pencil 2nd gen. Perfect for digital art, notes, and professional design work.",
    price: 299,
    priceUnit: "day",
    image: base + "images/ipad_and_pencil.jpg",
    features: ["M2 Chip", "Apple Pencil 2", "ProMotion Display"],
  },
  {
    id: 6,
    category: "Apple",
    name: "Watch",
    priority: "Low",
    description:
      "Apple Watch with health monitoring, GPS, water resistance, and seamless iPhone integration for fitness and productivity.",
    price: 299,
    priceUnit: "day",
    image: base + "images/apple_watch.jpeg",
    features: ["Health Monitoring", "GPS", "Water Resistant"],
  },
  {
    id: 7,
    category: "Home",
    name: "Smart TV",
    priority: "Medium",
    description:
      "Premium 55-inch 4K Smart TV with HDR support, built-in streaming apps, and multiple HDMI ports.",
    price: 249,
    priceUnit: "day",
    image: base + "images/smart_tv.jpg",
    features: ["4K Resolution", "Smart Features", "Multiple HDMI Ports"],
  },
  {
    id: 8,
    category: "Home",
    name: "Air Purifier",
    priority: "High",
    description:
      "Advanced HEPA air purifier that removes 99.97% of particles with real-time monitoring and quiet operation.",
    price: 249,
    priceUnit: "day",
    image: base + "images/air_purifier.jpeg",
    features: ["HEPA Filter", "Air Quality Sensor", "Quiet Operation"],
  },
  {
    id: 9,
    category: "Home",
    name: "Home Theater",
    priority: "High",
    description:
      "Premium 5.1 surround sound system with wireless subwoofer and Bluetooth connectivity for cinematic audio.",
    price: 249,
    priceUnit: "day",
    image: base + "images/home_theater.jpg",
    features: [
      "5.1 Surround Sound",
      "Wireless Subwoofer",
      "Bluetooth Connectivity",
    ],
  },
  {
    id: 10,
    category: "Lifestyle",
    name: "Go Pro",
    priority: "High",
    description:
      "Professional 4K action camera with waterproof design and image stabilization for adventure recording.",
    price: 249,
    priceUnit: "day",
    image: base + "images/gopro.jpg",
    features: ["4K Video", "Waterproof", "Image Stabilization"],
  },
  {
    id: 11,
    category: "Lifestyle",
    name: "Drone",
    priority: "Medium",
    description:
      "Professional camera drone with 4K recording, GPS navigation, and auto-return for aerial photography.",
    price: 249,
    priceUnit: "day",
    image: base + "images/drone.jpg",
    features: ["4K Camera", "GPS Navigation", "Auto Return"],
  },
  {
    id: 12,
    category: "Lifestyle",
    name: "Ergonomic Chair",
    priority: "Medium",
    description:
      "Premium office chair with adjustable lumbar support, breathable mesh, and customizable settings for comfort.",
    price: 249,
    priceUnit: "day",
    image: base + "images/chair.jpg",
    features: ["Adjustable Height", "Lumbar Support", "Breathable Mesh"],
  },
  {
    id: 13,
    category: "Adventure",
    name: "Waterproof Shoes",
    priority: "High",
    description:
      "Professional waterproof hiking shoes with anti-slip outsole and ankle support for all terrain adventures.",
    price: 189,
    priceUnit: "day",
    image: base + "images/waterproof_shoes.jpg",
    features: ["Waterproof", "Anti-slip", "Comfortable Fit"],
  },
  {
    id: 14,
    category: "Adventure",
    name: "Backpack",
    priority: "High",
    description:
      "Heavy-duty trekking backpack with water-resistant material, multiple compartments, and ergonomic design.",
    price: 199,
    priceUnit: "day",
    image: base + "images/bagpack.jpg",
    features: [
      "Water Resistant",
      "Multiple Compartments",
      "Comfortable Straps",
    ],
  },
  {
    id: 15,
    category: "Adventure",
    name: "Trekking Stick",
    priority: "High",
    description:
      "Lightweight adjustable trekking poles with anti-shock technology and comfortable grips for hiking stability.",
    price: 179,
    priceUnit: "day",
    image: base + "images/trekking_stick.jpg",
    features: ["Adjustable Height", "Lightweight", "Anti-shock"],
  },
  {
    id: 16,
    category: "Adventure",
    name: "Sleeping Bag",
    priority: "High",
    description:
      "Insulated sleeping bag rated for -10°C with water-resistant shell and compact compression design.",
    price: 209,
    priceUnit: "day",
    image: base + "images/sleeping_bag.jpg",
    features: ["Temperature Rating -10°C", "Water Resistant", "Compact Design"],
  },
  {
    id: 17,
    category: "Adventure",
    name: "Winter Jacket",
    priority: "High",
    description:
      "Premium insulated winter jacket with waterproof construction, multiple pockets, and adjustable hood.",
    price: 219,
    priceUnit: "day",
    image: base + "images/winter_jacket.jpg",
    features: ["Waterproof", "Insulated", "Multiple Pockets"],
  },
  {
    id: 18,
    category: "Adventure",
    name: "Shoes Chain",
    priority: "High",
    description:
      "Professional ice traction cleats with steel chains and secure rubber fitting for safe winter hiking.",
    price: 169,
    priceUnit: "day",
    image: base + "images/shoes_chain.jpg",
    features: ["Anti-slip", "Easy to Fit", "Durable Material"],
  },
];

export default products;
