# NASA Image Viewer - NASA API Integration

**NASA Image Viewer** is a single-page application (SPA) built using **React**, **TypeScript**, and **TailwindCSS**. This application integrates NASA's "Astronomy Picture of the Day", "Earth" and "EPIC" APIs to showcase images and data from space.

### Current Features:

1. **Astronomy Picture of the Day (APOD)** - Displays the Astronomy Picture of the Day for the current date.
2. **Earth Image based on Current Location** - Shows a satellite image of Earth based on the user's current geolocation.
3. **EPIC Image** - Displays the most recent improved Earth image from NASA's EPIC API.

### Future Improvements:

- **Date Picker for APOD**: Users can select a specific date to view the Astronomy Picture of the Day for that date.
- **Image Pan and Zoom**: Allow users to zoom and pan the Earth images.
- **Date Selection for EPIC**: Users will be able to select a specific date for images from the EPIC API.

### Tech Stack:

- **React** (Frontend Framework)
- **TypeScript** (Static typing for better development experience)
- **TailwindCSS** (Utility-first CSS framework for styling)
- **Vite** (Build tool for faster development)

### Installation & Setup:

1. Clone the repository:
   ```
   git clone https://github.com/MajorDP/NASA-Image-Viewer
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your `.env` file with your NASA API key:
   ```env
   VITE_NASA_API_KEY=your-api-key
   ```
4. Start the development server:
   ```
   npm run dev
   ```
   The app will be accessible at http://localhost:5173
