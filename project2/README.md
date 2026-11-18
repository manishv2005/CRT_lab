# 🔍 Campus Lost & Found Portal

An interactive, responsive web portal designed for university students and staff to search, filter, and report lost and found belongings across campus.

---

## 🌟 Key Features

1. **Items Directory**:
   - Comprehensive list of campus belongings with **Item Name**, **Category**, **Campus Location**, **Status** (Lost / Found / Reunited), **Date Reported**, **Description**, and **Contact / Recovery Point**.

2. **Real-Time Search Facility**:
   - Students can search dynamically by **Item Name** (e.g., *"MacBook"*, *"Wallet"*, *"Calculator"*) OR by **Category** (e.g., *"Electronics"*, *"Books & Study"*, *"Keys"*).
   - Fast, case-insensitive substring matching that updates the list instantaneously with each keystroke.
   - Includes a quick-clear (`✕`) button to reset search input.

3. **Campus Location Filter**:
   - Dropdown selection to filter items specifically by campus buildings/zones (e.g., *Main Library*, *Student Center / Cafeteria*, *CS Lab 304*, *Sports Complex*, *Engineering Block C*, *Parking Lot A*).
   - Automatically populates unique locations directly from the items database.

4. **Multi-Faceted Filtering & Quick Tags**:
   - **Status Toggle**: Filter by *All*, *Lost*, or *Found*.
   - **Quick Category Badges**: Filter with 1-click pills for *Electronics*, *Books & Study*, *Cards & IDs*, *Accessories*, *Clothing*, and *Keys*.
   - Simultaneous filter combination: Search query + Location filter + Status filter work seamlessly together.

5. **Student Report Submission Form**:
   - Enables students or security officers to log a newly lost or found item.
   - Form validation ensures essential fields (Name, Category, Location, Contact) are provided.
   - Newly reported items immediately appear at the top of the directory and persist in browser `localStorage`.

6. **Interactive Claim Modal Dialog**:
   - Clicking *"View Details"* or *"Claim Item"* presents a clean modal with full description, proof-of-ownership guidelines, and a *"Mark as Claimed / Reunited"* button.

7. **Responsive & Accessible Design**:
   - Built with Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, `<form>`, `<footer>`).
   - CSS Flexbox & CSS Grid with media queries for desktop, tablet, and mobile screens.

---

## 📁 File Structure

```text
CRT_project/
└── project2/
    ├── index.html     # Semantic HTML5 lost & found layout and modal structure
    ├── style.css      # Modern responsive styles, CSS Grid, Flexbox, status badges
    ├── script.js      # Real-time search, location filter, reporting, localStorage
    └── README.md      # Documentation and usage guide
```

---

## 🚀 How to Run & Test

1. Open `project2/index.html` directly in your web browser (Chrome, Edge, Firefox, Safari).
2. Or start a local development server from the terminal:
   ```bash
   cd project2
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.

### 🧪 Verification Steps:
- **Search by Name**: Type `"MacBook"` or `"Calculator"` in the search bar &rarr; Only matching items are displayed.
- **Search by Category**: Type `"Electronics"` or `"Books"` &rarr; Filters items matching that category.
- **Filter by Location**: Select `"Main Library"` or `"Computer Science Lab 304"` from the location dropdown &rarr; Displays only items found/lost at that location.
- **Combined Filter**: Type `"keys"` and select `"Student Parking Lot A"` &rarr; Filters precisely for car keys at that parking lot.
- **Report Item**: Scroll down to the submission form, fill out the fields, and submit &rarr; New item appears at the top of the directory with updated count statistics.
