# 🚀 Responsive Personal Portfolio Website

A modern, high-performance personal portfolio website built with **Semantic HTML5**, **CSS Flexbox**, **CSS Grid**, and **Media Queries** to deliver a seamless experience across desktop, tablet, and mobile devices.

---

## 📁 Project Structure

```text
CRT_project/
├── index.html        # Main HTML5 document with semantic elements
├── style.css         # Modern responsive CSS (Variables, Flexbox, Grid, Media Queries)
├── script.js         # Interactive mobile menu toggle, scroll highlights, form validation
└── README.md         # Documentation & guide to replace project descriptions
```

---

## ✨ Features

- **Semantic HTML5 Elements**: Uses `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<figure>`, `<time>`, and `<address>` for SEO and screen-reader accessibility.
- **CSS Flexbox & CSS Grid**:
  - **Flexbox**: Navigation bar, hero action buttons, timeline badges, skill tags, and contact items.
  - **CSS Grid**: Hero section layout, about cards, skill categories, proficiency indicators, projects showcase grid, and contact form layout.
- **Fully Responsive (Media Queries)**:
  - Custom breakpoints for desktops (>1024px), tablets (768px - 1024px), mobile landscapes (481px - 767px), and small mobile phones (≤480px).
  - Mobile hamburger toggle menu with smooth slide-down animation and ARIA states.
- **Sections Included**:
  1. **Header & Navigation**: Sticky navbar with logo, smooth-scroll links, and mobile menu toggle.
  2. **Introduction / Hero Section**: Professional bio, availability badge, CTA buttons, quick social links, and an interactive code card visual.
  3. **About Section**: Core values and engineering philosophy.
  4. **Educational Qualifications**: Academic timeline detailing degrees, institutions, grades, and coursework tags.
  5. **Technical Skills**: Categorized into Frontend, Backend, Databases, and DevOps/Cloud tools with proficiency meters.
  6. **Featured Projects**: Filterable project cards with technology tags, live demo, and GitHub links (currently populated with placeholder descriptions).
  7. **Contact Information & Form**: Address cards (Email, Phone, Location, LinkedIn) and an interactive contact form with validation and feedback alerts.
  8. **Footer**: Quick navigation links, social handles, and copyright notice.

---

## 🛠️ How to Replace Project Descriptions Later

The projects section in [`index.html`](file:///e:/CRT_project/index.html) currently contains placeholder project cards. When you are ready to input your real projects, follow these steps:

### 1. Locate the Projects Section in `index.html`
Open [`index.html`](file:///e:/CRT_project/index.html) and navigate to the `<section class="section projects-section" id="projects">` block (around line 280).

### 2. Update a Project Card Template
Each project is structured as a semantic `<article class="project-card">`:

```html
<article class="project-card" data-category="fullstack">
  <!-- 1. Visual Icon / Banner -->
  <div class="project-image-box">
    <div class="project-banner gradient-blue">
      <i class="fa-solid fa-cart-shopping project-banner-icon"></i>
      <span class="project-banner-badge">Featured</span>
    </div>
  </div>

  <div class="project-body">
    <!-- 2. Category Tag -->
    <div class="project-category-tag">Full Stack Web App</div>

    <!-- 3. Your Project Title -->
    <h3 class="project-title">Your Project Name Here</h3>

    <!-- 4. Your Real Project Description -->
    <p class="project-description">
      Replace this text with your detailed project description, key features, architecture, and impact.
    </p>

    <!-- 5. Tech Stack Badges -->
    <div class="project-tech-stack">
      <span class="tech-tag">React</span>
      <span class="tech-tag">Node.js</span>
      <span class="tech-tag">PostgreSQL</span>
    </div>

    <!-- 6. Project URLs -->
    <div class="project-links">
      <a href="YOUR_GITHUB_REPO_URL" target="_blank" class="btn btn-sm btn-outline">
        <i class="fa-brands fa-github"></i> Code
      </a>
      <a href="YOUR_LIVE_DEMO_URL" target="_blank" class="btn btn-sm btn-primary">
        <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
      </a>
    </div>
  </div>
</article>
```

### Available Filter Categories
Each `<article class="project-card">` has a `data-category` attribute:
- `data-category="fullstack"` &rarr; Displays under **All** and **Full Stack**
- `data-category="frontend"` &rarr; Displays under **All** and **Frontend**
- `data-category="backend"` &rarr; Displays under **All** and **Backend / Cloud**

---

## 🎨 How to Personalize Other Details

1. **Name & Title**: Search for `Manish Kumar` in `index.html` and customize your full name or title.
2. **Education Details**: Edit the `<div class="timeline">` section with your university, degree, graduation year, and GPA.
3. **Contact Details**: Update the `mailto:` links, phone number, location, and social links in `<aside class="contact-info-panel">` and `<footer class="site-footer">`.
4. **Skills**: Add or remove `<div class="skill-pill">` items inside `<div class="skill-items">` to match your skill set.

---

## 🌐 How to Preview & Run

Simply open `index.html` in any web browser (Chrome, Edge, Firefox, Safari) by double-clicking the file or serving it with a local static server like VS Code Live Server or Python:

```bash
# Python 3
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.
