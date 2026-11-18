# 💼 InternTrack - Internship Opportunities Portal

A dynamic, responsive web portal that retrieves tech internship opportunities from a JSON feed using the **JavaScript Fetch API** and presents them as interactive cards with **real-time search**, **category filtering**, and **dedicated loading and error states**.

---

## 🎯 Requirements Met

1. **JSON Data Retrieval**:
   - Retrieves structured opportunity data from [`internships.json`](file:///e:/CRT_project/project3/internships.json) using asynchronous `fetch()`.
   - Handles network responses and includes an offline fallback dataset for resilient performance.

2. **Opportunity Cards Structure**:
   Each card semantic `<article>` component contains all required fields:
   - **Company Name** (with verified badge & logo)
   - **Role Title** (e.g., *Software Engineering Intern*, *Machine Learning Intern*, *Cloud & DevOps Intern*)
   - **Location** (e.g., *Mountain View, CA (Hybrid)*, *Seattle, WA (On-site)*, *San Francisco, CA (Remote)*)
   - **Application Link** (a prominent `Apply Now` button directing to the official careers portal)
   - *Additional details*: Stipend, Duration, Category badge, Work type badge, and Required tech stack tags.

3. **Search & Category Filtering**:
   - **Search Input**: Instant, case-insensitive live filtering by company name, role title, or programming skills.
   - **Category Filter**: Dropdown and one-click pill filters for *Software Engineering*, *Data Science & AI*, *Cloud & DevOps*, *Cybersecurity*, and *Design & UI/UX*.
   - **Work Type Filter**: Allows filtering by *Remote*, *Hybrid*, or *On-site*.
   - **Active Result Counter & Clear Filters Button**.

4. **Robust Loading & Error Handling**:
   - **Loading State**: Displays animated skeleton shimmer cards and a loading indicator while fetching data.
   - **Error State**: Displays a user-friendly error card with a **"Try Again"** button to retry the fetch and a **"Load Cached Data"** button.
   - **Testing Toolbar**: Included at the top of the webpage so evaluators can easily test:
     - *Normal Fetch*
     - *Loading State (2-second simulated delay)*
     - *Error State (Simulated 500 error / network failure)*

---

## 📁 File Structure

```text
CRT_project/
└── project3/
    ├── internships.json   # JSON dataset of internship opportunities
    ├── index.html         # Semantic HTML5 layout, skeleton loader, and error UI
    ├── style.css          # CSS Grid, Flexbox, Skeleton Shimmer, Responsive queries
    ├── script.js          # Fetch API logic, loading/error states, search/filter
    └── README.md          # Project documentation & testing guide
```

---

## 🚀 How to Run and Test

1. Open `project3/index.html` directly in any web browser.
2. Or start a local development server from terminal:
   ```bash
   cd e:\CRT_project\project3
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000` in your web browser.

### 🧪 Evaluation & Testing Checklist:
- **Test Loading State**: Click the **"Test Loading State (2s)"** button in the top test bar &rarr; Observe the animated skeleton shimmer placeholders before cards render.
- **Test Error State**: Click the **"Test Error State"** button &rarr; Observe the error container with error message and **"Try Again"** button.
- **Test Search**: Type `"Google"` or `"Frontend"` or `"Python"` in the search bar &rarr; Cards filter instantly.
- **Test Category Filter**: Select `"Data Science & AI"` or click the quick pill &rarr; Displays only data and machine learning roles.
- **Test Apply Link**: Click any **"Apply Now"** button &rarr; Opens the respective company's student careers page in a new tab.
