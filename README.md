# 🏠 Homigo

A full-stack MERN (MongoDB, Express, React, Node.js) web application for discovering and managing property listings — inspired by Airbnb but focused on simplicity, responsiveness, and clean UI design.

Homigo allows users to explore listings, view detailed property pages, post their own listings, write reviews, and manage their profiles — all within an elegant and responsive Tailwind-powered interface.

---

## 🚀 Features

### 🌐 Frontend (React + Tailwind CSS)
- **Modern responsive UI** with Tailwind CSS and Font Awesome icons.
- **Dynamic Navbar** with authentication-aware links.
- **Search and filter bar** (category icons + tax toggle).
- **Listings grid view** with hover animations and adaptive layout.
- **Individual listing page** with reviews and owner controls (edit/delete).
- **User authentication** integrated with backend sessions.
- **Error handling UI** — elegant 404 (Not Found) and loading states.
- **Scroll restoration** between routes.
- **Consistent Layout** with Navbar + Footer using React Router v6.

### ⚙️ Backend (Express + MongoDB)
- RESTful API routes for:
  - `/api/listings` → CRUD operations
  - `/api/listings/:id/reviews` → Add/Delete reviews
  - `/api/signup`, `/api/login`, `/api/logout`, `/api/check-auth`
- **Authentication & Session Management** using Passport.js (`passport-local`) and Express sessions.
- **MongoDB Models** for `User`, `Listing`, and `Review`.
- **Secure routes** — only authenticated users can create, edit, or delete listings.
- **Centralized error handling** with `ExpressError`.

---

## 🧠 Tech Stack

| Layer | Technology |
|:------|:------------|
| Frontend | React 18, React Router v6, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM) |
| Authentication | Passport.js (Local Strategy) + Express Session |
| State & Data | Axios (RESTful API calls) |
| Icons | Font Awesome, Lucide React |
| Styling | Tailwind CSS with responsive design |
| Environment | Vite (frontend), Nodemon (backend dev) |

---

## 🏗️ Project Structure

```

Homigo/
├── backend/
│   ├── models/
│   │   ├── user.js
│   │   ├── listing.js
│   │   └── review.js
│   ├── routes/
│   │   ├── listing.js
│   │   ├── review.js
│   │   └── signup.js
│   ├── utils/
│   │   └── ExpressError.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── FiltersBar.jsx
│   │   │   ├── ListingCard.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Review.jsx
│   │   │   ├── ReviewList.jsx
│   │   │   └── ScrollToTop.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── AllListings.jsx
│   │   │   ├── ShowList.jsx
│   │   │   ├── NewList.jsx
│   │   │   ├── EditList.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── SignupLogin.jsx
│   │   │   ├── NotFound.jsx
│   │   │   └── Layout.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
└── README.md

```



## 🧩 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/rumi-13/homigo.git
cd homigo
````

### 2️⃣ Install backend dependencies

```bash
cd backend
npm install
```

### 3️⃣ Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 4️⃣ Start backend server

```bash
cd ../backend
npm run dev   # or node server.js
```

### 5️⃣ Start frontend (Vite)

```bash
cd ../frontend
npm run dev
```

* Backend runs at: **[http://localhost:8080](http://localhost:8080)**
* Frontend runs at: **[http://localhost:5173](http://localhost:5173)**

---

## 🔐 Authentication Flow

1. **Signup / Login** via `/signup` or `/login`
2. Session created using `express-session` (cookie-based)
3. Authenticated routes available:

   * Add new listing
   * Edit/Delete own listings
   * Add/Delete own reviews
4. Navbar updates dynamically based on login state.

---
## 🧠 Design Philosophy

Homigo emphasizes:

* **Minimalism** — fewer distractions, clean layout, white space use
* **Consistency** — pink-gray-white palette across all screens
* **Responsiveness** — seamless UX from mobile → desktop
* **Simplicity in code** — modular, stateless components
* **Scalability** — ready for deployment with minor config changes

---

## 🧪 Future Enhancements

* 🗺️ Map integration (Leaflet or Google Maps)
* 📸 Image upload for listings (currently URL of Image is supported only)
* 🔍 Full-text search and filtering (backend + frontend)
* 🧭 Global state management (React Context / Zustand)

---

## 👨‍💻 Author

**Asgar Rashid**
<br>
*“Code should feel as elegant as the product it powers.”*

---

## 📄 License

This project is open-source under the **MIT License**.
You are free to use, modify, and distribute it with attribution.

---