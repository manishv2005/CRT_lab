# 📚 EduTask Planner - Student Academic Task Manager (React)

A modern, responsive React application engineered for students to manage their daily academic tasks, assignments, and exam preparation schedules.

---

## 🎯 Requirements Met

| Requirement | Implementation Detail | Component |
| :--- | :--- | :--- |
| **1. Add new tasks** | Input form with title, course dropdown, priority selector (*High/Medium/Low*), and due date with validation. | `<TaskForm />` |
| **2. Mark tasks as completed** | Interactive toggle checkbox that transitions tasks between pending and completed states with dynamic strikethrough styling. | `<TaskItem />` |
| **3. Delete tasks** | Individual delete action button to remove tasks immediately from state with smooth transition. | `<TaskItem />` |
| **4. Display pending & completed counts** | Live summary cards showing **Total Tasks**, **Pending Tasks** (amber count), **Completed Tasks** (green count), and a visual academic completion percentage progress bar. | `<TaskStats />` |
| **5. Render tasks dynamically** | Renders tasks dynamically by mapping state objects into modular React components with unique keys. | `<TaskList />` & `<TaskItem />` |

---

## 📁 Project Structure

```text
CRT_project/
└── project4/
    ├── index.html                   # Zero-config runnable React app (works directly in browser)
    ├── package.json                 # Project dependencies & Vite scripts
    ├── vite.config.js               # Vite bundler configuration
    ├── README.md                    # Project documentation
    └── src/
        ├── main.jsx                 # React root DOM entrypoint
        ├── App.jsx                  # Main container managing task state and filters
        ├── styles.css               # Clean responsive styles, priority badges, progress bar
        └── components/
            ├── TaskHeader.jsx       # App branding and live current date
            ├── TaskStats.jsx        # Total, pending, and completed task counters
            ├── TaskForm.jsx         # Form to add new academic tasks
            ├── TaskFilter.jsx       # Status tabs (All/Pending/Completed), search & course filters
            ├── TaskList.jsx         # Dynamic list renderer & empty state
            └── TaskItem.jsx         # Task card with toggle checkbox & delete button
```

---

## 🚀 How to Run the Application

You have **two easy ways** to run this project:

### Option A: Zero-Config Direct Browser Preview (Instant)
Simply double-click or open [`project4/index.html`](file:///e:/CRT_project/project4/index.html) in any web browser. It uses React 18 and Babel Standalone to execute the React components immediately without needing to run terminal commands.

### Option B: Modern Vite Development Server
If you prefer running with npm / Vite:
```bash
cd e:\CRT_project\project4
npm install
npm run dev
```
Then visit `http://localhost:3000` in your web browser.

---

## 🧪 Testing Checklist
1. **Add a Task**: Type an assignment name (e.g., *"Complete Data Structures Lab 5"*), choose priority *"High"*, and click **"Add Academic Task"** &rarr; Task appears at top and Pending count increments.
2. **Mark as Completed**: Click the circular checkbox on any task card &rarr; Title strikes through, Completed count increments, Pending count decrements, and progress bar updates.
3. **Delete a Task**: Click the red trash icon on any task card &rarr; Task is removed and counts update.
4. **Filter & Search**: Click the *"Pending"* or *"Completed"* tab or type in the search bar &rarr; List dynamically updates in real-time.
