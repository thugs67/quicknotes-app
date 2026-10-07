# quicknotes-app

# Notes Toolkit

A lightweight, responsive web application built with HTML5, CSS3, and modern vanilla JavaScript for creating, managing, and persisting personal notes in the browser.

---

## 🚀 Features

* **Create & Categorize Notes:** Quickly add notes under `personal`, `work`, or `study` categories.
* **Real-time Live Search:** Filter notes dynamically by keyword as you type (case-insensitive).
* **Data Persistence:** All notes are automatically saved to and loaded from `localStorage`.
* **Input Validation:** Enforces character constraints (1–200 characters) and prevents empty or duplicate notes with clear error messaging.
* **XSS Protection:** Dynamically renders content using standard DOM creation (`createElement` and `textContent`) to ensure high security against script injection.
* **Responsive Card Layout:** Mobile-friendly design built with Flexbox, visual category color coding, and media query support for mobile screens.

---

## 📁 Repository Structure

The root directory contains the following four core files required for deployment and review:

| File | Description |
| :--- | :--- |
| `index.html` | Semantic HTML5 structure containing the note form, search input, and dynamic list container. |
| `style.css` | Box-sizing reset, layout resets, card styles, category color keys, and mobile breakpoints. |
| `script.js` | Core application logic, DOM management, `localStorage` integration, and input validation. |
| `README.md` | Documentation and overview of the project. |

---

## 🛠️ How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git)
   cd YOUR_REPOSITORY_NAME
