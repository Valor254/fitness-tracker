# Fitness Tracker

## 📌 Project Overview
The **Fitness Tracker** app helps users log workouts, track their progress, and visualize their fitness journey. It integrates with the **WGER API** to fetch exercise data and provides an intuitive interface for managing workouts.

## 🚀 Features
### Core Features
- **Workout Logging** – Users can log exercises, sets, reps, and weights.
- **Workout History** – Users can view past workouts and track progress.
- **API Integration** – Fetch exercises from the **WGER API**.
- **Progress Tracking** – Visualize workout progress using **Chart.js**.
- **Dark Mode Support** – Ensures a user-friendly experience in all lighting conditions.

### Optional Features (Planned/Future Enhancements)
- **User Authentication** – Allow users to save workouts and access them from any device.
- **Exercise Recommendations** – Suggest exercises based on logged workouts.
- **Workout Plans** – Enable users to create and save custom workout plans.
- **Diet & Nutrition Tracking** – Log meals and track caloric intake.
- **Social Sharing** – Users can share progress on social media.

## 🛠️ Tech Stack
- **Frontend:** React + Zustand (state management)
- **Styling:** Tailwind CSS v3
- **Form Handling:** Formik + Yup (validation)
- **Charts:** Chart.js (for workout progress tracking)
- **API:** WGER API (for fetching exercise data)
- **Deployment:** Netlify / Vercel

## 📁 Project Structure
```
/src
│── components/       # Reusable UI components
│── pages/            # Page-level components (Dashboard, Workout Log, etc.)
│── store/            # Zustand state management files
│── utils/            # Utility functions (API calls, helpers, etc.)
│── App.jsx           # Main application file
│── index.jsx         # Entry point
```

## 🌟 Recent Updates
### ✅ **Workout Logging (MultiStepWorkoutForm) Enhancements**
- Improved **mobile responsiveness**.
- Added **dark mode** compatibility.
- **Validation & UX improvements** (disabled "Next" button until valid input).
- **Zustand integration** to persist workout data.

### ✅ **Exercise Search Optimization**
- Implemented **caching with Zustand** to minimize redundant API calls.
- Added **loading states** for better UX.
- Implemented **keyboard navigation** for a smoother search experience.
- Highlighted matched query text in results.

### ✅ **Dashboard Layout Fixes**
- Adjusted **dashboard to full-screen layout**.
- Ensured workout charts & history are properly displayed.
- Verified **Zustand store integration** for workout data.

## 🔧 Setup & Installation
### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/fitness-tracker.git
cd fitness-tracker
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Run the app
```bash
npm run dev
```

## 📡 API Integration
### Fetch List of Exercises
```js
fetch('https://wger.de/api/v2/exercise/')
  .then(response => response.json())
  .then(data => console.log(data));
```

### Fetch Exercise Details
```js
fetch(`https://wger.de/api/v2/exerciseinfo/{id}/`)
  .then(response => response.json())
  .then(data => console.log(data));
```

## ✅ Commit Message Guidelines
- Follow **conventional commits** for clarity and professionalism.
- Example: `feat: add workout logging functionality`

## 🎯 Roadmap
- [ ] Implement user authentication
- [ ] Enhance exercise recommendation system
- [ ] Add social sharing feature
- [ ] Optimize UI/UX for a seamless experience

## 📜 License
This project is licensed under the **MIT License**.

---
🔥 **Contributions are welcome!** Feel free to submit issues or pull requests to improve the project. 💪
