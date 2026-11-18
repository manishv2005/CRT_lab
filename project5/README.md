# 🎓 Apex University - Responsive Student Academic Dashboard

A modern, high-performance **Student Academic Dashboard** built with semantic HTML5, modern CSS Grid/Flexbox, interactive CSS transitions, and keyframe animations that adapts smoothly across mobile, tablet, and desktop screens.

---

## 🎯 Requirements Met

| Requirement | Implementation Detail | Section |
| :--- | :--- | :--- |
| **1. Navigation Menu** | Sticky desktop sidebar navigation and collapsible mobile drawer with icons, active highlight bar, and live status badges. | `<aside class="sidebar">` |
| **2. Profile Section** | Student avatar ring, full name, roll ID, degree program, dean's honor status, email, academic advisor, and quick action buttons. | `<div class="profile-card">` |
| **3. Academic Summary Cards** | Responsive CSS Grid featuring **Cumulative GPA** (3.86/4.00), **Attendance Rate** (94.2%), **Credits Earned** (88/128), and **Enrolled Courses** with animated progress gauges. | `<div class="summary-cards-grid">` |
| **4. Recent Activities** | Chronological timeline detailing assignment submissions, midterm grades, biometric attendance, and library borrowing records with status tags. | `<ol class="activity-timeline">` |
| **5. CSS Transitions & Keyframes** | Animated keyframes for floating badges, pulse notifications, ringing bell, progress bar fill, and smooth transitions on hover/focus. | `style.css` animations |
| **6. Hover & Focus States** | Accessible `:hover`, `:focus`, and `:focus-visible` styling with custom outlines across all interactive links, buttons, summary cards, and inputs. | Global CSS |
| **7. Multi-Device Adaptability** | Responsive breakpoints for desktops (>1200px), laptops/tablets (768px - 1200px), and mobile phones (≤768px & ≤480px). | Media queries |

---

## 📁 File Structure

```text
CRT_project/
└── project5/
    ├── index.html       # Semantic dashboard layout (Sidebar, Profile, Cards, Activities)
    ├── style.css        # Responsive CSS Grid, Flexbox, Transitions & Keyframes
    ├── script.js        # Mobile drawer toggle, notifications dropdown, interactive toasts
    └── README.md        # Documentation and verification guide
```

---

## 🚀 How to Run and Test

1. Open [`project5/index.html`](file:///e:/CRT_project/project5/index.html) directly in any web browser.
2. Or run a local static server:
   ```bash
   cd e:\CRT_project\project5
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000` in your web browser.

---

## 🧪 Interactive Testing Checklist

- **Test Navigation Menu**:
  - *On Desktop*: Click any sidebar menu item &rarr; Observes the active indicator, scale transitions, and smooth hover state.
  - *On Mobile (Screen ≤ 992px)*: Click the hamburger button `☰` &rarr; Sidebar drawer slides in with a backdrop overlay.
- **Test Keyframe Animations**:
  - Notice the **floating trophy badge** floating smoothly in the welcome banner (`@keyframes floatBadge`).
  - Hover over the **notification bell** &rarr; Plays a bell ringing wobble animation (`@keyframes bellRing`).
  - Observe the notification badge pulsating with a red ripple (`@keyframes pulse-badge`).
  - Refresh the page to see the progress bars fill smoothly (`@keyframes progressFill`).
- **Test Hover & Focus States**:
  - Hover over summary cards &rarr; Card elevates upward with a shadow and icon scale effect.
  - Hover over timeline entries &rarr; Entry shifts rightward with marker expansion.
  - Tab through controls with `Tab` key &rarr; Custom focus outlines clearly highlight interactive elements.
- **Test Action Triggers**:
  - Click **"Submit"** on any upcoming deadline &rarr; Displays a confirmation toast.
  - Click **"Edit Profile"** or **"Unofficial Transcript"** &rarr; Shows an interactive action toast.
