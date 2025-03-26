# NASA Image Viewer - NASA API Integration

**NASA Image Viewer** is a single-page application (SPA) built using **React**, **TypeScript**, and **TailwindCSS**. This application integrates NASA's "Astronomy Picture of the Day", "Earth" and "EPIC" APIs to showcase images and data from space.

### Current Features:

1. **Astronomy Picture of the Day (APOD)** - Displays the Astronomy Picture of the Day for the current date.
2. **Earth Image based on Current Location** - Shows a satellite image of Earth based on the user's current geolocation.
3. **EPIC Image** - Displays the most recent improved Earth image from NASA's EPIC API.
4. **Date Picker for APOD**: Users can select a specific date to view the Astronomy Picture of the Day for that date.
5. **Date Selection for EPIC**: Users are able to select a specific date and timeframe for images from the EPIC API.

### Tech Stack:

- **React** (Frontend Framework)
- **TypeScript** (Static typing for better development experience)
- **TailwindCSS** (Utility-first CSS framework for styling)

### Direct link to app:

**An alternative to installing and setting the app up is just visiting this link.**

- Environment variables for NASA API Key already set

[https://nasa-image-viewer.vercel.app/](https://nasa-image-viewer.vercel.app/) (Deployment via Vercel)

### Installation & Setup:

1. Clone the repository:
   ```
   git clone https://github.com/MajorDP/NASA-Image-Viewer
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your `.env` file in the root directory with your NASA API key:
   ```env
   VITE_NASA_API_KEY=your-api-key
   ```
4. Start the development server:
   ```
   npm run dev
   ```
   The app will be accessible at http://localhost:5173

### Approach in Development:

**Tech Stack**

- **React**
- The project uses React to build a dynamic SPA. React components handle the rendering of different sections, such as the Astronomy Picture of the Day (APOD), Earth satellite image, and EPIC images. React-Router-Dom was used for routing.

- **TypeScript**
- TypeScript was used to ensure type safety and improve code maintainability, ensuring a smoother development process.

- **TailwindCSS**
- TailwindCSS allows for quick and efficient styling through utility classes, eliminating the need for having multiple CSS files across the project.

**Development**

- **App Skeleton**
- The first step in development was creating the app skeleton. Creating the layout of each page without actual functionality, as well as setting up the project's file structure and app navigation were the first steps taken during the development of this application. Responsive design was also implemented in that stage.

- **Level 1 - Core functionality**

**Initial functionality**

- Initially, only the core functionality of the application was covered. The "Astronomy Picture of the Day" and "EPIC" APIs were both set up to work with the current date only.
- Requesting a satelite image of the user's current location works via JavaScript's Browser API. Upon entering the "Your location" page, the user is asked for permission to access their current device's location, after which, upon agreeing, a request with the user's coordinates is sent and the image is loaded. Upon declining permission, the user is shown an error.

**Loading indicators**

- Loading indicators while loading data implemented for each page.

**Error handling**

- Error handling for failed requests/network issues implemented for each page.
- Errors are returned as objects with prop "error" containing the message. Error messages are displayed to the user with the option to return to the main page.

**TypeScript Usage**

- TS types were created to match each response received by a request, as well as for components which receive specific props (i.e., Error.tsx, Option.tsx).

- **Level 2 - Additional Functionality**

**APOD API Upgrade & Issues**

- When using the APOD API in the "APOD" page, the user can choose a specific date for which he wants to choose a picture. a "date" prop of type string was added to the service sending a request to the APOD API, which indicates to the API to return the picture from the desired date. The initial date is the one of the current day.

- Discovered an issue where a user might request an APOD for the current date when there is still no data for it uploaded. In the case of no data for the specific day, the request would instead try to automatically fetch data for yesterday's date.

- Discovered an issue where some APODs might lack an image (i.e, 03/24/2025), in that case, an "Image is not available." message is diplayed instead of the picture. Caption is still shown.

- Some APOD Images have copyright, in that case, the copyright owner's name is shown.

**EPIC API Upgrade**

- When using the EPIC API in the "See Earth" page, the users can now select a specific date from which they want to see a picture of Earth. Upon choosing a date, the user is presented with all available timeframes in which a picture was taken during that date. Upon choosing a timeframe, the image's name of that timeframe is stored in state and is used to shape the url for the corresponding picture along with the currently chosen date. The user is initially shown the first image of the current date.

**Changes to app design**

- Small design changes were created for each page
