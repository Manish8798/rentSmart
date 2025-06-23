import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1000kb
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          "react-vendor": ["react", "react-dom"],
          "router-vendor": ["react-router-dom"],
          "date-vendor": ["react-datepicker"],

          // Page chunks
          pages: [
            "./src/pages/AboutUs.jsx",
            "./src/pages/Blog.jsx",
            "./src/pages/FAQ.jsx",
            "./src/pages/ContactUs.jsx",
            "./src/pages/TermsConditions.jsx",
            "./src/pages/PrivacyPolicy.jsx",
            "./src/pages/ShippingPolicy.jsx",
            "./src/pages/DamagePolicy.jsx",
          ],

          // Component chunks
          components: [
            "./src/components/ProductDetail.jsx",
            "./src/components/RentalCalendar.jsx",
          ],
        },
      },
    },
  },
});
