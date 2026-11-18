/**
 * InternTrack - Dynamic Internship Retrieval & Search Portal
 * Requirements:
 * 1. Retrieve opportunities from JSON data source using Fetch API
 * 2. Display each opportunity as a card (Company Name, Role, Location, Application Link)
 * 3. Real-time search and category filtering
 * 4. Comprehensive Loading and Error states
 * 5. Testing toolbar to verify Loading, Error, and Success states
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. EMBEDDED BACKUP DATASET (Used for instant offline fallback or file://)
  // =========================================================================
  const fallbackInternships = [
    {
      id: "intern-001",
      company: "Google",
      logo: "fa-brands fa-google",
      color: "#ea4335",
      role: "Software Engineering Intern - Summer 2027",
      category: "Software Engineering",
      location: "Mountain View, CA (Hybrid)",
      workType: "Hybrid",
      stipend: "$55 / hr",
      duration: "12 Weeks (May - Aug)",
      skills: ["C++", "Java", "Python", "Algorithms", "Distributed Systems"],
      description: "Work on core search infrastructure, scalable distributed backends, and cloud microservices alongside world-class engineering teams.",
      applyUrl: "https://careers.google.com/students/",
      deadline: "Rolling Admissions"
    },
    {
      id: "intern-002",
      company: "Microsoft",
      logo: "fa-brands fa-microsoft",
      color: "#00a4ef",
      role: "Cloud & DevOps Engineering Intern",
      category: "Cloud & DevOps",
      location: "Redmond, WA (On-site)",
      workType: "On-site",
      stipend: "$52 / hr",
      duration: "12 Weeks",
      skills: ["Azure", "Kubernetes", "Docker", "Go", "CI/CD"],
      description: "Contribute to Azure cloud infrastructure, reliability automation, container orchestration, and serverless compute platforms.",
      applyUrl: "https://careers.microsoft.com/students",
      deadline: "Nov 30, 2026"
    },
    {
      id: "intern-003",
      company: "Amazon",
      logo: "fa-brands fa-amazon",
      color: "#ff9900",
      role: "Frontend Developer Intern",
      category: "Software Engineering",
      location: "Seattle, WA (Hybrid)",
      workType: "Hybrid",
      stipend: "$50 / hr",
      duration: "10 - 12 Weeks",
      skills: ["React.js", "TypeScript", "HTML5/CSS3", "Next.js", "Redux"],
      description: "Build high-traffic shopping interfaces, responsive web apps, and design system components used by millions of customers daily.",
      applyUrl: "https://amazon.jobs/en/teams/internships-for-students",
      deadline: "Dec 15, 2026"
    },
    {
      id: "intern-004",
      company: "Meta",
      logo: "fa-brands fa-meta",
      color: "#0668e1",
      role: "Machine Learning & AI Research Intern",
      category: "Data Science & AI",
      location: "Menlo Park, CA (Hybrid)",
      workType: "Hybrid",
      stipend: "$58 / hr",
      duration: "12 - 16 Weeks",
      skills: ["PyTorch", "Python", "Deep Learning", "NLP", "LLMs"],
      description: "Research, benchmark, and deploy cutting-edge generative AI models, recommendation systems, and large language model architectures.",
      applyUrl: "https://www.metacareers.com/students",
      deadline: "Jan 10, 2027"
    },
    {
      id: "intern-005",
      company: "Spotify",
      logo: "fa-brands fa-spotify",
      color: "#1db954",
      role: "Data Analyst Intern - Content Discovery",
      category: "Data Science & AI",
      location: "New York, NY (Remote Friendly)",
      workType: "Remote",
      stipend: "$46 / hr",
      duration: "10 Weeks",
      skills: ["SQL", "Python", "Tableau", "A/B Testing", "BigQuery"],
      description: "Analyze user listening behavior, model playlist recommendation metrics, and design statistical experiments for podcast and music discovery.",
      applyUrl: "https://www.spotifyjobs.com/students/",
      deadline: "Dec 20, 2026"
    },
    {
      id: "intern-006",
      company: "Stripe",
      logo: "fa-brands fa-stripe",
      color: "#635bff",
      role: "Backend Infrastructure Intern",
      category: "Software Engineering",
      location: "San Francisco, CA (Remote)",
      workType: "Remote",
      stipend: "$56 / hr",
      duration: "12 Weeks",
      skills: ["Ruby", "Go", "Distributed Databases", "Kafka", "PostgreSQL"],
      description: "Build mission-critical financial APIs, low-latency transaction routing, fraud prevention systems, and global ledger pipelines.",
      applyUrl: "https://stripe.com/jobs/university",
      deadline: "Open until filled"
    },
    {
      id: "intern-007",
      company: "CrowdStrike",
      logo: "fa-solid fa-shield-virus",
      color: "#e02020",
      role: "Cybersecurity & Threat Detection Intern",
      category: "Cybersecurity",
      location: "Austin, TX (Hybrid)",
      workType: "Hybrid",
      stipend: "$48 / hr",
      duration: "12 Weeks",
      skills: ["Network Security", "Python", "SIEM", "Penetration Testing", "Linux"],
      description: "Investigate real-world endpoint vulnerabilities, analyze zero-day malware signatures, and build automated incident response scripts.",
      applyUrl: "https://www.crowdstrike.com/careers/university-internships/",
      deadline: "Jan 15, 2027"
    },
    {
      id: "intern-008",
      company: "Figma",
      logo: "fa-brands fa-figma",
      color: "#a259ff",
      role: "Product & UI/UX Design Intern",
      category: "Design & UI/UX",
      location: "San Francisco, CA (Hybrid)",
      workType: "Hybrid",
      stipend: "$47 / hr",
      duration: "12 Weeks",
      skills: ["Figma", "User Research", "Prototyping", "Wireframing", "Design Systems"],
      description: "Design multiplayer collaborative web canvas tools, create design tokens, and conduct user research testing with product designers.",
      applyUrl: "https://www.figma.com/careers/",
      deadline: "Dec 30, 2026"
    },
    {
      id: "intern-009",
      company: "Tesla",
      logo: "fa-solid fa-bolt",
      color: "#e82127",
      role: "Embedded Systems & Firmware Intern",
      category: "Software Engineering",
      location: "Palo Alto, CA (On-site)",
      workType: "On-site",
      stipend: "$45 / hr",
      duration: "14 Weeks",
      skills: ["C/C++", "RTOS", "CAN Bus", "Microcontrollers", "Git"],
      description: "Develop low-level device drivers, vehicle telemetry controllers, and battery management firmware for electric vehicle platforms.",
      applyUrl: "https://www.tesla.com/careers/internships",
      deadline: "Rolling Admissions"
    },
    {
      id: "intern-010",
      company: "Databricks",
      logo: "fa-solid fa-database",
      color: "#ff3621",
      role: "Data Engineering & Spark Intern",
      category: "Data Science & AI",
      location: "San Francisco, CA (Remote)",
      workType: "Remote",
      stipend: "$54 / hr",
      duration: "12 Weeks",
      skills: ["Apache Spark", "Scala", "Python", "Data Lakehouse", "SQL"],
      description: "Optimize distributed data query execution engines, Delta Lake storage tables, and real-time streaming analytics pipelines.",
      applyUrl: "https://www.databricks.com/company/careers/university-recruiting",
      deadline: "Jan 30, 2027"
    },
    {
      id: "intern-011",
      company: "Palo Alto Networks",
      logo: "fa-solid fa-lock",
      color: "#fa582d",
      role: "Cloud Security Operations Intern",
      category: "Cybersecurity",
      location: "Santa Clara, CA (On-site)",
      workType: "On-site",
      stipend: "$49 / hr",
      duration: "12 Weeks",
      skills: ["Cloud Security", "Firewalls", "Python", "AWS/GCP", "Zero Trust"],
      description: "Collaborate on next-generation firewall configurations, identity access management audits, and cloud posture monitoring tools.",
      applyUrl: "https://jobs.paloaltonetworks.com/en/students/",
      deadline: "Feb 15, 2027"
    },
    {
      id: "intern-012",
      company: "Adobe",
      logo: "fa-solid fa-pen-nib",
      color: "#ff0000",
      role: "Creative Cloud Product Design Intern",
      category: "Design & UI/UX",
      location: "San Jose, CA (Hybrid)",
      workType: "Hybrid",
      stipend: "$46 / hr",
      duration: "12 Weeks",
      skills: ["UX Architecture", "Adobe XD", "Design Systems", "Usability Testing"],
      description: "Help design next-generation generative AI workflows for Creative Cloud desktop and web applications with a focus on creative accessibility.",
      applyUrl: "https://www.adobe.com/careers/university.html",
      deadline: "Jan 20, 2027"
    }
  ];

  // =========================================================================
  // 2. STATE MANAGEMENT
  // =========================================================================
  let rawInternships = [];
  const filterState = {
    searchQuery: '',
    category: 'all',
    workType: 'all'
  };

  // DOM Elements
  const loadingState = document.getElementById('loading-state');
  const errorState = document.getElementById('error-state');
  const errorMessageText = document.getElementById('error-message-text');
  const cardsGrid = document.getElementById('cards-grid');
  const emptyState = document.getElementById('empty-state');
  const resultsCount = document.getElementById('results-count');

  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const categorySelect = document.getElementById('category-select');
  const worktypeSelect = document.getElementById('worktype-select');
  const catPills = document.querySelectorAll('.cat-pill');
  const resetFiltersBtn = document.getElementById('reset-filters-btn');
  const emptyResetBtn = document.getElementById('empty-reset-btn');

  // Stats Counters
  const statTotalRoles = document.getElementById('stat-total-roles');
  const statCompaniesCount = document.getElementById('stat-companies-count');
  const statRemoteCount = document.getElementById('stat-remote-count');

  // Developer Test Buttons
  const btnFetchNormal = document.getElementById('btn-fetch-normal');
  const btnSimulateLoading = document.getElementById('btn-simulate-loading');
  const btnSimulateError = document.getElementById('btn-simulate-error');
  const retryFetchBtn = document.getElementById('retry-fetch-btn');
  const fallbackLoadBtn = document.getElementById('fallback-load-btn');

  // =========================================================================
  // 3. UI STATE CONTROLLERS: LOADING, ERROR, SUCCESS
  // =========================================================================

  function showLoadingState() {
    loadingState.classList.remove('hidden');
    errorState.classList.add('hidden');
    cardsGrid.classList.add('hidden');
    emptyState.classList.add('hidden');
    if (resultsCount) resultsCount.textContent = 'Fetching opportunities from feed...';
  }

  function showErrorState(errorMsg) {
    loadingState.classList.add('hidden');
    errorState.classList.remove('hidden');
    cardsGrid.classList.add('hidden');
    emptyState.classList.add('hidden');
    if (errorMessageText) {
      errorMessageText.textContent = errorMsg || 'Unable to load opportunities from the JSON data feed.';
    }
    if (resultsCount) resultsCount.textContent = 'Error loading feed.';
  }

  function showSuccessState() {
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
    cardsGrid.classList.remove('hidden');
  }

  // =========================================================================
  // 4. FETCH API IMPLEMENTATION
  // =========================================================================

  /**
   * Retrieves internship opportunities from the JSON file or simulated endpoint.
   * @param {number} delayMs - Simulated artificial network delay in ms (for testing).
   * @param {boolean} forceError - Forces an intentional error state (for testing).
   */
  async function fetchInternships(delayMs = 0, forceError = false) {
    showLoadingState();

    try {
      // Artificial delay for loading demonstration
      if (delayMs > 0) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }

      // Check if testing an error condition
      if (forceError) {
        throw new Error('HTTP 500: Server response error during API handshake.');
      }

      // Fetch from local JSON file
      let data;
      try {
        const response = await fetch('internships.json');
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: Failed to retrieve JSON data feed.`);
        }
        data = await response.json();
      } catch (fetchErr) {
        // If opened via file:/// or network fails, gracefully use fallback
        console.warn('Network fetch failed (e.g. file:// CORS). Using verified cached dataset.', fetchErr);
        if (location.protocol === 'file:') {
          // Provide smooth fallback on direct local file opening
          data = fallbackInternships;
        } else {
          throw fetchErr;
        }
      }

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Received empty or malformed dataset from JSON endpoint.');
      }

      rawInternships = data;
      updateMetrics();
      showSuccessState();
      renderFilteredOpportunities();

    } catch (err) {
      console.error('Fetch error:', err);
      showErrorState(err.message || 'Network error encountered while connecting to data feed.');
    }
  }

  // Update Hero Metric Badges
  function updateMetrics() {
    const total = rawInternships.length;
    const uniqueCompanies = new Set(rawInternships.map(i => i.company)).size;
    const remoteOrHybrid = rawInternships.filter(i => 
      i.workType === 'Remote' || i.workType === 'Hybrid' || i.location.toLowerCase().includes('remote') || i.location.toLowerCase().includes('hybrid')
    ).length;

    if (statTotalRoles) statTotalRoles.textContent = total;
    if (statCompaniesCount) statCompaniesCount.textContent = uniqueCompanies;
    if (statRemoteCount) statRemoteCount.textContent = remoteOrHybrid;
  }

  // =========================================================================
  // 5. FILTERING AND CARD RENDERING
  // =========================================================================

  function renderFilteredOpportunities() {
    const query = filterState.searchQuery.trim().toLowerCase();
    const cat = filterState.category;
    const work = filterState.workType;

    // Filter array based on search, category and work type
    const filtered = rawInternships.filter(item => {
      // 1. Search filter: matches company name, role, or skills
      const matchesCompany = item.company.toLowerCase().includes(query);
      const matchesRole = item.role.toLowerCase().includes(query);
      const matchesSkills = item.skills && item.skills.some(s => s.toLowerCase().includes(query));
      const matchesSearch = query === '' || matchesCompany || matchesRole || matchesSkills;

      // 2. Category filter
      const matchesCategory = cat === 'all' || item.category === cat;

      // 3. Work Type / Location filter
      const matchesWorkType = work === 'all' || item.workType === work || item.location.includes(work);

      return matchesSearch && matchesCategory && matchesWorkType;
    });

    // Update Counter
    if (resultsCount) {
      resultsCount.innerHTML = `Showing <strong>${filtered.length}</strong> of <strong>${rawInternships.length}</strong> opportunities`;
    }

    // Check for Empty Results
    if (filtered.length === 0) {
      cardsGrid.innerHTML = '';
      emptyState.classList.remove('hidden');
    } else {
      emptyState.classList.add('hidden');
      cardsGrid.innerHTML = filtered.map(item => createCardHTML(item)).join('');
    }
  }

  /**
   * Generates the semantic HTML card for an internship opportunity.
   * Required fields guaranteed: Company Name, Role, Location, Application Link
   */
  function createCardHTML(item) {
    const workBadgeClass = item.workType === 'Remote' 
      ? 'tag-remote' 
      : (item.workType === 'Hybrid' ? 'tag-hybrid' : 'tag-onsite');

    const skillsHTML = item.skills 
      ? item.skills.map(s => `<span class="skill-chip">${escapeHTML(s)}</span>`).join('') 
      : '';

    return `
      <article class="internship-card" data-id="${escapeHTML(item.id)}">
        
        <!-- Header: Company Logo, Company Name, Role -->
        <div class="card-header-row">
          <div class="company-logo-badge" style="color: ${item.color || '#4f46e5'};">
            <i class="${escapeHTML(item.logo || 'fa-solid fa-building')}"></i>
          </div>
          <div class="company-meta">
            <div class="company-name">
              <span>${escapeHTML(item.company)}</span>
              <i class="fa-solid fa-circle-check verified-badge" title="Verified Employer"></i>
            </div>
            <h3 class="role-title">${escapeHTML(item.role)}</h3>
          </div>
        </div>

        <!-- Badges: Category & Work Type -->
        <div class="card-badges-row">
          <span class="badge-tag tag-category">${escapeHTML(item.category)}</span>
          <span class="badge-tag ${workBadgeClass}"><i class="fa-solid fa-location-crosshairs"></i> ${escapeHTML(item.workType || 'Flexible')}</span>
        </div>

        <!-- Body & Opportunity Meta -->
        <div class="card-body">
          <p class="role-description">${escapeHTML(item.description)}</p>

          <div class="opportunity-meta-box">
            <div class="meta-row">
              <i class="fa-solid fa-location-dot"></i>
              <span><strong>Location:</strong> ${escapeHTML(item.location)}</span>
            </div>
            <div class="meta-row">
              <i class="fa-solid fa-wallet"></i>
              <span><strong>Stipend:</strong> ${escapeHTML(item.stipend || 'Competitive')}</span>
            </div>
            <div class="meta-row">
              <i class="fa-regular fa-clock"></i>
              <span><strong>Duration:</strong> ${escapeHTML(item.duration || 'Summer 2027')}</span>
            </div>
          </div>

          <!-- Skills List -->
          <div class="skills-tags-row">
            ${skillsHTML}
          </div>
        </div>

        <!-- Card Footer: Deadline & Application Link -->
        <div class="card-footer">
          <span class="deadline-note">
            <i class="fa-regular fa-calendar"></i> ${escapeHTML(item.deadline || 'Rolling')}
          </span>
          <a 
            href="${escapeHTML(item.applyUrl)}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn btn-primary btn-sm apply-btn"
            aria-label="Apply to ${escapeHTML(item.role)} at ${escapeHTML(item.company)}"
          >
            Apply Now <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>

      </article>
    `;
  }

  function escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // =========================================================================
  // 6. EVENT LISTENERS: SEARCH & FILTERS
  // =========================================================================

  // Search input: real-time filter
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterState.searchQuery = e.target.value;
      if (clearSearchBtn) {
        if (e.target.value.trim().length > 0) {
          clearSearchBtn.classList.add('visible');
        } else {
          clearSearchBtn.classList.remove('visible');
        }
      }
      renderFilteredOpportunities();
    });
  }

  // Clear search input
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      filterState.searchQuery = '';
      clearSearchBtn.classList.remove('visible');
      searchInput.focus();
      renderFilteredOpportunities();
    });
  }

  // Category select dropdown
  if (categorySelect) {
    categorySelect.addEventListener('change', (e) => {
      filterState.category = e.target.value;
      syncCategoryPills(e.target.value);
      renderFilteredOpportunities();
    });
  }

  // Work type select dropdown
  if (worktypeSelect) {
    worktypeSelect.addEventListener('change', (e) => {
      filterState.workType = e.target.value;
      renderFilteredOpportunities();
    });
  }

  // Category Quick Pills
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const selectedCat = pill.getAttribute('data-cat');
      filterState.category = selectedCat;
      
      // Sync dropdown
      if (categorySelect) {
        categorySelect.value = selectedCat;
      }
      syncCategoryPills(selectedCat);
      renderFilteredOpportunities();
    });
  });

  function syncCategoryPills(activeCat) {
    catPills.forEach(pill => {
      if (pill.getAttribute('data-cat') === activeCat) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }

  // Reset Filters Function
  function resetAllFilters() {
    filterState.searchQuery = '';
    filterState.category = 'all';
    filterState.workType = 'all';

    if (searchInput) {
      searchInput.value = '';
      if (clearSearchBtn) clearSearchBtn.classList.remove('visible');
    }

    if (categorySelect) categorySelect.value = 'all';
    if (worktypeSelect) worktypeSelect.value = 'all';

    syncCategoryPills('all');
    renderFilteredOpportunities();
  }

  if (resetFiltersBtn) resetFiltersBtn.addEventListener('click', resetAllFilters);
  if (emptyResetBtn) emptyResetBtn.addEventListener('click', resetAllFilters);

  // =========================================================================
  // 7. DEVELOPER & TEST CONTROL LISTENERS
  // =========================================================================

  // Test Normal Fetch
  if (btnFetchNormal) {
    btnFetchNormal.addEventListener('click', () => {
      fetchInternships(300, false);
    });
  }

  // Test Loading State (2s artificial delay)
  if (btnSimulateLoading) {
    btnSimulateLoading.addEventListener('click', () => {
      fetchInternships(2000, false);
    });
  }

  // Test Error State
  if (btnSimulateError) {
    btnSimulateError.addEventListener('click', () => {
      fetchInternships(300, true);
    });
  }

  // Retry from Error card
  if (retryFetchBtn) {
    retryFetchBtn.addEventListener('click', () => {
      fetchInternships(400, false);
    });
  }

  // Load Cached from Error card
  if (fallbackLoadBtn) {
    fallbackLoadBtn.addEventListener('click', () => {
      rawInternships = fallbackInternships;
      updateMetrics();
      showSuccessState();
      renderFilteredOpportunities();
    });
  }

  // Footer Year
  const yearElem = document.getElementById('current-year');
  if (yearElem) yearElem.textContent = new Date().getFullYear();

  // =========================================================================
  // 8. INITIAL LOAD
  // =========================================================================
  fetchInternships(400, false);

});
