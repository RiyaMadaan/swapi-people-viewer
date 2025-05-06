# People/Characters Directory App – Landing Page

## ✅ Live Link(Deployed on Vercel)

- https://swapi-people-viewer-mrut.vercel.app/

---

## 🚀 Overview

This project is a React-based front-end interface for a **People Directory** application, using **Mantine UI** for design consistency and smooth interactivity. The landing page presents a welcoming interface for both authenticated and unauthenticated users, offering appropriate navigation options and a polished UI.

---

## 🎨 Features and Justifications

### 1. ✨ Elegant Animated Layout

- **Fade-in animation** is applied on page load using Emotion's `keyframes` to provide a smooth and professional entry transition.
- A **centered Card component** serves as the main content area, enhanced with hover scaling and subtle shadow effects to create a modern feel.

### 2. 🧠 Conditional UI Based on Authentication

- **Auth Store Integration** (`useAuthStore`) is used to determine user authentication state.
- If a user is logged in:
  - A message displays: "You're logged in as [user]."
  - A **"Go to People List"** button is shown for immediate navigation.
  - A **Logout button is displayed in the top-right corner**, decoupled from the main card for improved accessibility and UX.
- If no user is logged in:
  - Only a **Login** button is shown in the center.

### 3. 🧭 Clean Navigation with React Router

- `useNavigate()` is used to handle routing to `/login` and `/people` pages without reloading the app.
- The `handleLogout()` function resets auth state and redirects to the login page cleanly.

### 4. 🧼 Top-Right Logout Button (UX Improvement)

- Moved the Logout button outside the card and placed it absolutely at the **top-right corner** of the page for visibility and consistent accessibility.
- The Logout button:
  - Is only shown if the user is authenticated.
  - Has clear red styling with hover effects for intuitive interaction.

### 5. 🖌️ Styling with Mantine + Custom CSS

- Gradient backgrounds (`#f3c9d6` to `#e2f0cb`) give a soft, friendly aesthetic.
- Button hover effects provide feedback and visual depth.
- Rounded corners and soft shadows are used for modern design sensibilities.

---

## 🛠️ Tech Stack

- **React** – Functional component-based design
- **Mantine UI** – Component library for fast UI development
- **Emotion** – Used for CSS-in-JS and animations
- **React Router DOM** – Handles client-side navigation
- **Zustand** – Lightweight state management (via `useAuthStore`)

---

## 📸 UI Preview (Optional)

You can add screenshots or a screen recording here to visualize the final result.

---

## 🛠️ Additional Functional Features (Post-Landing Page)

Once users access the People List, they get the following functionality:

a. 🔍 Search Bar
Allows users to filter characters by name, making it easier to find specific people.

b. 📊 Sort Options

Sort by Name (A–Z or Z–A)
    OR
Sort by Birth Year (Ascending or Descending)

c. 📄 Pagination
Client-side pagination ensures smoother navigation across large datasets.
---

## ✅ Future Improvements

- Add a **profile dropdown menu** in place of the top-right Logout button.
- Dark Mode Support.

