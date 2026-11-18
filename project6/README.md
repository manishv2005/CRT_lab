# 💼 CareerTrack - Internship Application Tracker (React Context API)

A specialized, responsive React application engineered for university students to record, track, and update their internship applications through the recruitment cycle.

---

## 🎯 Requirements Met

| Requirement | Implementation Detail | Component / File |
| :--- | :--- | :--- |
| **1. Add company & job details** | Collapsible form capturing **Company Name**, **Job Role**, **Location**, **Stipend**, **Date Applied**, **Initial Status**, **Career Link**, and **Interview Notes** with validation. | [`ApplicationForm.jsx`](file:///e:/CRT_project/project6/src/components/ApplicationForm.jsx) |
| **2. Maintain application status** | Manages recruitment lifecycle states: `Applied`, `Under Review`, `Interviewing`, `Offered`, and `Rejected` with color-coded badges and icons. | [`ApplicationCard.jsx`](file:///e:/CRT_project/project6/src/components/ApplicationCard.jsx) |
| **3. Update application status** | Each card features an interactive status updater dropdown allowing students to progress applications (e.g. from *Under Review* &rarr; *Interviewing* &rarr; *Offered*) in real-time. | [`ApplicationCard.jsx`](file:///e:/CRT_project/project6/src/components/ApplicationCard.jsx) |
| **4. Search & filter applications** | Real-time live search by company name, job role, or location; status filter tabs (*All*, *Applied*, *Under Review*, *Interviewing*, *Offered*, *Rejected*); and sort selector (*Newest, Oldest, Company A-Z*). | [`ApplicationFilter.jsx`](file:///e:/CRT_project/project6/src/components/ApplicationFilter.jsx) |
| **5. Share data via Context API** | Uses `React.createContext`, `ApplicationProvider`, and custom hook `useApplications()` to broadcast application state, actions, and derived metrics globally without prop drilling. | [`ApplicationContext.jsx`](file:///e:/CRT_project/project6/src/context/ApplicationContext.jsx) |

---

## 📁 File Structure

```text
CRT_project/
└── project6/
    ├── index.html                   # Zero-config runnable React app (works directly in browser)
    ├── package.json                 # Project dependencies & Vite scripts
    ├── vite.config.js               # Vite bundler configuration
    ├── README.md                    # Project documentation & testing guide
    └── src/
        ├── main.jsx                 # React root DOM entrypoint
        ├── App.jsx                  # Main container wrapped with ApplicationProvider
        ├── styles.css               # Responsive styles, status palettes, KPI cards
        ├── context/
        │   └── ApplicationContext.jsx # Context API Provider, reducer actions, and hook
        └── components/
            ├── AppHeader.jsx        # Branding and Context API indicator
            ├── ApplicationStats.jsx # KPI cards (Total, Interviewing, Offered, Success Rate)
            ├── ApplicationForm.jsx  # Form to add company and job details
            ├── ApplicationFilter.jsx# Search bar, status tabs, and sort selector
            ├── ApplicationList.jsx  # Dynamic grid renderer & empty state
            └── ApplicationCard.jsx  # Card with status updater & delete action
```

---

## 🚀 How to Run and Test

You can run this project in **two convenient ways**:

### Option A: Zero-Config Direct Browser Preview (Instant)
Simply double-click or open [`project6/index.html`](file:///e:/CRT_project/project6/index.html) in any web browser. It uses React 18, ReactDOM, and Babel Standalone to execute the React Context API application immediately without running any terminal commands.

### Option B: Vite Development Server
If you prefer running via npm:
```bash
cd e:\CRT_project\project6
npm install
npm run dev
```
Then open `http://localhost:3000` in your web browser.

---

## 🧪 Testing Checklist

1. **Test Context API State Sharing**:
   - Notice that the **Stats Cards** (`<ApplicationStats />`), the **Filter Count** (`<ApplicationFilter />`), and the **Cards Grid** (`<ApplicationList />`) all read from the same `ApplicationContext` without passing props.
2. **Test Adding an Application**:
   - Click **"Log New Internship Application"** &rarr; Enter Company *"Apple"*, Role *"iOS Engineering Intern"*, Location *"Cupertino, CA"*, Status *"Interviewing"*, and click **"Save Application"**.
   - The new card immediately appears in the grid, the "Total Applied" count increments, and the "Interviewing" KPI card updates automatically.
3. **Test Updating Application Status**:
   - On any card (e.g., *Meta* or *Stripe*), click the **"Update Status"** dropdown and select **"Offered"**.
   - Notice that the card's badge changes to green (*Offered*), and the **"Offers Received"** KPI counter at the top increments immediately.
4. **Test Search & Filter**:
   - Type `"Google"` or `"Frontend"` in the search box &rarr; Only matching cards display.
   - Click the **"Interviewing"** or **"Offered"** tab &rarr; Filters precisely for those recruitment stages.
5. **Test Persistence**:
   - Refresh the page &rarr; All updates and new records remain saved via `localStorage`.
