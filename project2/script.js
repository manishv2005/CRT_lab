/**
 * Campus Lost & Found Portal - Interactive JavaScript
 * Requirements:
 * 1. Search items by Name or Category (real-time, case-insensitive)
 * 2. Filter items by Campus Location
 * 3. Filter by Status (All / Lost / Found)
 * 4. Quick Category filters
 * 5. Report Lost/Found item form with instant list updating
 * 6. LocalStorage persistence for user-added items
 * 7. Interactive Claim modal dialog
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. DEFAULT DATASET OF CAMPUS BELONGINGS
  // =========================================================================
  const initialItems = [
    {
      id: 'item-1',
      name: 'Apple MacBook Pro 14" (Space Gray)',
      category: 'Electronics',
      location: 'Main Library (2nd Floor Study Cubicles)',
      status: 'Lost',
      date: 'Nov 16, 2026',
      description: 'Space Gray with a distinct GitHub sticker and React logo on the cover. Left in a black sleeve case on desk #14.',
      contact: 'Please return to Main Library Circulation Desk or email: j.smith@campus.edu'
    },
    {
      id: 'item-2',
      name: 'TI-84 Plus CE Graphing Calculator',
      category: 'Books & Study',
      location: 'Computer Science Lab 304',
      status: 'Found',
      date: 'Nov 17, 2026',
      description: 'Black TI-84 Plus CE calculator with initials "RK" scratched lightly on the battery cover. Found under keyboard #22.',
      contact: 'Turned in to CS Department Office (Room 301, Mr. Davis).'
    },
    {
      id: 'item-3',
      name: 'Brown Leather Bifold Wallet',
      category: 'Accessories',
      location: 'Student Center / Cafeteria',
      status: 'Found',
      date: 'Nov 15, 2026',
      description: 'Fossil genuine brown leather wallet containing university dining card and metro pass. Cash safely secured with security.',
      contact: 'Handed over to Campus Security Desk (Room 102 Admin Hall).'
    },
    {
      id: 'item-4',
      name: 'Blue Hydro Flask (32oz)',
      category: 'Accessories',
      location: 'Sports Complex / Gymnasium',
      status: 'Lost',
      date: 'Nov 14, 2026',
      description: 'Cobalt blue wide-mouth Hydro Flask with straw lid, covered in national park stickers and slight dent at bottom.',
      contact: 'Finder please text/call (555) 019-3321 or drop at gym reception.'
    },
    {
      id: 'item-5',
      name: 'Sony WH-1000XM4 Wireless Headphones',
      category: 'Electronics',
      location: 'Lecture Hall B (Audi 1)',
      status: 'Lost',
      date: 'Nov 15, 2026',
      description: 'Matte black over-ear noise-canceling headphones inside the original zippered black travel case.',
      contact: 'Reward offered. Please contact prof.hall@campus.edu or call (555) 018-9922.'
    },
    {
      id: 'item-6',
      name: 'University Student ID Card (ID: #2024-8841)',
      category: 'Cards & IDs',
      location: 'Engineering Block C (Lobby)',
      status: 'Found',
      date: 'Nov 16, 2026',
      description: 'Official student card belonging to "Michael Chang", Department of Electrical Engineering, class of 2027.',
      contact: 'Kept safely at Engineering Student Affairs Office (C-104).'
    },
    {
      id: 'item-7',
      name: 'Set of Car Keys with Honda Fob & Red Lanyard',
      category: 'Keys',
      location: 'Student Parking Lot A',
      status: 'Found',
      date: 'Nov 17, 2026',
      description: 'Honda electronic key fob with 2 brass door keys and a red campus alumni lanyard found near row 4.',
      contact: 'Security Patrol Vehicle #2 or Campus Security Station.'
    },
    {
      id: 'item-8',
      name: 'Organic Chemistry (Wade 9th Edition) Textbook',
      category: 'Books & Study',
      location: 'Science Complex (Room 112)',
      status: 'Found',
      date: 'Nov 14, 2026',
      description: 'Hardcover textbook with yellow sticky notes throughout chapter 6 & 7 and highlighted diagrams.',
      contact: 'Left with Chemistry Department Secretary (Science 101).'
    },
    {
      id: 'item-9',
      name: 'Casio Vintage Digital Watch (Silver Mesh)',
      category: 'Accessories',
      location: 'Student Center / Cafeteria',
      status: 'Lost',
      date: 'Nov 13, 2026',
      description: 'Classic silver metal strap with rectangular digital face. Sentimental gift from family.',
      contact: 'Contact: a.rodriguez@campus.edu.'
    },
    {
      id: 'item-10',
      name: 'The North Face Borealis Backpack (Navy Blue)',
      category: 'Clothing',
      location: 'Bus Stop / Transit Hub',
      status: 'Lost',
      date: 'Nov 16, 2026',
      description: 'Navy blue backpack containing spiral notebooks, green umbrella in side pocket, and USB flash drive.',
      contact: 'Bus Transit Lost & Found or call (555) 019-5567.'
    },
    {
      id: 'item-11',
      name: 'Ray-Ban Prescription Eyeglasses (Tortoise Shell)',
      category: 'Accessories',
      location: 'Main Library (2nd Floor Study Cubicles)',
      status: 'Found',
      date: 'Nov 15, 2026',
      description: 'Round tortoise-shell frames inside a black leather Ray-Ban protective case on table 7.',
      contact: 'Main Library 1st Floor Help Desk.'
    },
    {
      id: 'item-12',
      name: 'White Lab Coat & Protective Safety Goggles',
      category: 'Clothing',
      location: 'Science Complex (Room 112)',
      status: 'Found',
      date: 'Nov 16, 2026',
      description: 'Medium size lab coat with embroidered initials "E.T." on chest pocket, plus clear UV goggles.',
      contact: 'Biology Lab Preparation Room 204.'
    }
  ];

  // Retrieve saved items from localStorage or use initialItems
  const STORAGE_KEY = 'campus_lost_and_found_items';
  let itemsList = [];

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      itemsList = JSON.parse(saved);
    } else {
      itemsList = [...initialItems];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(itemsList));
    }
  } catch (err) {
    itemsList = [...initialItems];
  }

  // Active Filter State
  const filterState = {
    searchQuery: '',
    location: 'all',
    status: 'all',
    category: 'all'
  };

  // =========================================================================
  // 2. DOM ELEMENT REFERENCES
  // =========================================================================
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const locationSelect = document.getElementById('location-select');
  const statusBtns = document.querySelectorAll('.status-btn');
  const catPills = document.querySelectorAll('.cat-pill');
  const resetFiltersBtn = document.getElementById('reset-filters-btn');
  const itemsGrid = document.getElementById('items-grid');
  const emptyState = document.getElementById('empty-state');
  const emptyResetBtn = document.getElementById('empty-reset-btn');
  const emptyReportBtn = document.getElementById('empty-report-btn');
  const resultsCountText = document.getElementById('results-count-text');
  const activeFilterBadge = document.getElementById('active-filter-badge');

  // Stats Counters
  const statTotal = document.getElementById('stat-total');
  const statLost = document.getElementById('stat-lost');
  const statFound = document.getElementById('stat-found');
  const statClaimed = document.getElementById('stat-claimed');

  // Report Form Elements
  const reportForm = document.getElementById('report-item-form');
  const formFeedback = document.getElementById('form-feedback');
  const openReportModalBtn = document.getElementById('open-report-modal-btn');

  // Modal Elements
  const claimModal = document.getElementById('claim-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDismissBtn = document.getElementById('modal-dismiss-btn');
  const modalConfirmClaimBtn = document.getElementById('modal-confirm-claim-btn');
  const modalItemTitle = document.getElementById('modal-item-title');
  const modalItemStatus = document.getElementById('modal-item-status');
  const modalItemCategory = document.getElementById('modal-item-category');
  const modalItemLocation = document.getElementById('modal-item-location');
  const modalItemDate = document.getElementById('modal-item-date');
  const modalItemDesc = document.getElementById('modal-item-desc');
  const modalItemContact = document.getElementById('modal-item-contact');

  let activeModalItemId = null;

  // =========================================================================
  // 3. HELPER FUNCTIONS
  // =========================================================================

  // Category Icon Mapping
  function getCategoryIcon(category) {
    const cat = category.toLowerCase();
    if (cat.includes('elect')) return { icon: 'fa-laptop', class: 'cat-electronics' };
    if (cat.includes('book') || cat.includes('study')) return { icon: 'fa-book-open', class: 'cat-books' };
    if (cat.includes('card') || cat.includes('id')) return { icon: 'fa-id-card', class: 'cat-cards' };
    if (cat.includes('cloth')) return { icon: 'fa-shirt', class: 'cat-clothing' };
    if (cat.includes('key')) return { icon: 'fa-key', class: 'cat-keys' };
    if (cat.includes('access')) return { icon: 'fa-glasses', class: 'cat-accessories' };
    return { icon: 'fa-box', class: 'cat-other' };
  }

  // Populate Location Dropdown options dynamically
  function populateLocationDropdown() {
    const uniqueLocations = Array.from(new Set(itemsList.map(item => item.location.trim()))).sort();
    
    // Preserve current selection if possible
    const currentVal = locationSelect.value || 'all';

    locationSelect.innerHTML = `<option value="all">All Locations (Campus Wide)</option>`;

    uniqueLocations.forEach(loc => {
      const option = document.createElement('option');
      option.value = loc;
      option.textContent = loc;
      locationSelect.appendChild(option);
    });

    if (uniqueLocations.includes(currentVal)) {
      locationSelect.value = currentVal;
    } else {
      locationSelect.value = 'all';
      filterState.location = 'all';
    }
  }

  // Update Hero Statistics
  function updateStats() {
    const total = itemsList.length;
    const lost = itemsList.filter(i => i.status.toLowerCase() === 'lost').length;
    const found = itemsList.filter(i => i.status.toLowerCase() === 'found').length;
    const claimed = itemsList.filter(i => i.status.toLowerCase() === 'claimed').length;

    if (statTotal) statTotal.textContent = total;
    if (statLost) statLost.textContent = lost;
    if (statFound) statFound.textContent = found;
    if (statClaimed) statClaimed.textContent = claimed;
  }

  // Save list to localStorage
  function persistItems() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(itemsList));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }

  // =========================================================================
  // 4. RENDERING & FILTERING LOGIC
  // =========================================================================

  function renderFilteredItems() {
    const query = filterState.searchQuery.trim().toLowerCase();
    const locFilter = filterState.location;
    const statusFilter = filterState.status.toLowerCase();
    const catFilter = filterState.category.toLowerCase();

    // Perform multi-criteria filter
    const filtered = itemsList.filter(item => {
      // 1. Search Query Match: by Item Name OR Category
      const matchesName = item.name.toLowerCase().includes(query);
      const matchesCategory = item.category.toLowerCase().includes(query);
      const matchesSearch = query === '' || matchesName || matchesCategory;

      // 2. Location Filter Match
      const matchesLocation = locFilter === 'all' || item.location.trim() === locFilter;

      // 3. Status Filter Match
      const matchesStatus = statusFilter === 'all' || item.status.toLowerCase() === statusFilter;

      // 4. Category Filter Match
      const matchesCategoryPill = catFilter === 'all' || item.category.toLowerCase().includes(catFilter);

      return matchesSearch && matchesLocation && matchesStatus && matchesCategoryPill;
    });

    // Update Counts and Summary
    if (resultsCountText) {
      resultsCountText.innerHTML = `Showing <strong>${filtered.length}</strong> of <strong>${itemsList.length}</strong> items`;
    }

    // Build badge descriptor
    if (activeFilterBadge) {
      let badgeParts = [];
      if (query) badgeParts.push(`"${query}"`);
      if (locFilter !== 'all') badgeParts.push(`📍 ${locFilter.split('(')[0].trim()}`);
      if (statusFilter !== 'all') badgeParts.push(`🏷️ ${statusFilter.toUpperCase()}`);
      if (catFilter !== 'all') badgeParts.push(`📂 ${filterState.category}`);

      activeFilterBadge.textContent = badgeParts.length > 0 ? badgeParts.join(' • ') : 'All campus items';
    }

    // Render cards or empty state
    if (filtered.length === 0) {
      itemsGrid.innerHTML = '';
      emptyState.classList.remove('hidden');
    } else {
      emptyState.classList.add('hidden');
      itemsGrid.innerHTML = filtered.map(item => {
        const catMeta = getCategoryIcon(item.category);
        const statusLower = item.status.toLowerCase();
        const badgeClass = statusLower === 'lost' ? 'badge-lost' : (statusLower === 'found' ? 'badge-found' : 'badge-claimed');
        const isClaimed = statusLower === 'claimed';

        return `
          <article class="item-card" data-id="${item.id}">
            <div class="item-card-header">
              <div class="item-icon-box ${catMeta.class}">
                <i class="fa-solid ${catMeta.icon}"></i>
              </div>
              <span class="status-badge ${badgeClass}">${item.status}</span>
            </div>

            <div class="item-card-body">
              <span class="item-category-tag">${escapeHTML(item.category)}</span>
              <h3 class="item-title">${escapeHTML(item.name)}</h3>
              <p class="item-desc">${escapeHTML(item.description)}</p>

              <div class="item-meta-list">
                <div class="item-meta-item">
                  <i class="fa-solid fa-location-dot"></i>
                  <span><strong>Location:</strong> ${escapeHTML(item.location)}</span>
                </div>
                <div class="item-meta-item">
                  <i class="fa-regular fa-calendar"></i>
                  <span><strong>Reported:</strong> ${escapeHTML(item.date)}</span>
                </div>
              </div>
            </div>

            <div class="item-card-footer">
              <button class="btn btn-secondary btn-sm view-details-btn" data-id="${item.id}">
                <i class="fa-solid fa-circle-info"></i> View Details
              </button>
              ${!isClaimed ? `
                <button class="btn btn-primary btn-sm claim-btn" data-id="${item.id}">
                  <i class="fa-solid fa-hand-holding-hand"></i> ${item.status === 'Found' ? 'Claim Item' : 'Found This?'}
                </button>
              ` : `
                <button class="btn btn-ghost btn-sm" disabled style="opacity: 0.6;">
                  <i class="fa-solid fa-check-double"></i> Reunited
                </button>
              `}
            </div>
          </article>
        `;
      }).join('');

      // Attach Card Action Listeners
      attachCardListeners();
    }
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
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
  // 5. EVENT LISTENERS: SEARCH & FILTERS
  // =========================================================================

  // Search Input: Real-time search by name or category
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
      renderFilteredItems();
    });
  }

  // Clear Search button
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      filterState.searchQuery = '';
      clearSearchBtn.classList.remove('visible');
      searchInput.focus();
      renderFilteredItems();
    });
  }

  // Location Dropdown Filter
  if (locationSelect) {
    locationSelect.addEventListener('change', (e) => {
      filterState.location = e.target.value;
      renderFilteredItems();
    });
  }

  // Status Filter Buttons (All / Lost / Found)
  statusBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      statusBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterState.status = btn.getAttribute('data-status');
      renderFilteredItems();
    });
  });

  // Quick Category Filter Buttons
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      filterState.category = pill.getAttribute('data-category');
      renderFilteredItems();
    });
  });

  // Reset Filters Function
  function resetAllFilters() {
    filterState.searchQuery = '';
    filterState.location = 'all';
    filterState.status = 'all';
    filterState.category = 'all';

    if (searchInput) {
      searchInput.value = '';
      if (clearSearchBtn) clearSearchBtn.classList.remove('visible');
    }

    if (locationSelect) {
      locationSelect.value = 'all';
    }

    statusBtns.forEach(b => {
      if (b.getAttribute('data-status') === 'all') b.classList.add('active');
      else b.classList.remove('active');
    });

    catPills.forEach(p => {
      if (p.getAttribute('data-category') === 'all') p.classList.add('active');
      else p.classList.remove('active');
    });

    renderFilteredItems();
  }

  if (resetFiltersBtn) resetFiltersBtn.addEventListener('click', resetAllFilters);
  if (emptyResetBtn) emptyResetBtn.addEventListener('click', resetAllFilters);

  if (emptyReportBtn) {
    emptyReportBtn.addEventListener('click', () => {
      const reportSec = document.getElementById('report-section');
      if (reportSec) {
        reportSec.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('item-name').focus();
      }
    });
  }

  if (openReportModalBtn) {
    openReportModalBtn.addEventListener('click', () => {
      const reportSec = document.getElementById('report-section');
      if (reportSec) {
        reportSec.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('item-name').focus();
      }
    });
  }

  // =========================================================================
  // 6. CARD INTERACTIONS & CLAIM MODAL
  // =========================================================================

  function attachCardListeners() {
    document.querySelectorAll('.view-details-btn, .claim-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        openItemModal(id);
      });
    });
  }

  function openItemModal(itemId) {
    const item = itemsList.find(i => i.id === itemId);
    if (!item) return;

    activeModalItemId = itemId;
    modalItemTitle.textContent = item.name;
    modalItemCategory.textContent = `Category: ${item.category}`;
    modalItemLocation.textContent = item.location;
    modalItemDate.textContent = item.date;
    modalItemDesc.textContent = item.description || 'No additional description provided.';
    modalItemContact.textContent = item.contact || 'Campus Security Lost & Found Desk (Admin 102)';

    modalItemStatus.textContent = item.status;
    modalItemStatus.className = 'modal-status-badge';
    if (item.status.toLowerCase() === 'lost') {
      modalItemStatus.classList.add('badge-lost');
    } else if (item.status.toLowerCase() === 'found') {
      modalItemStatus.classList.add('badge-found');
    } else {
      modalItemStatus.classList.add('badge-claimed');
    }

    if (item.status.toLowerCase() === 'claimed') {
      modalConfirmClaimBtn.disabled = true;
      modalConfirmClaimBtn.innerHTML = '<i class="fa-solid fa-check-double"></i> Already Claimed';
    } else {
      modalConfirmClaimBtn.disabled = false;
      modalConfirmClaimBtn.innerHTML = '<i class="fa-solid fa-check"></i> Mark as Claimed / Reunited';
    }

    claimModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeItemModal() {
    claimModal.classList.add('hidden');
    document.body.style.overflow = '';
    activeModalItemId = null;
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeItemModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeItemModal);

  // Close modal when clicking backdrop
  if (claimModal) {
    claimModal.addEventListener('click', (e) => {
      if (e.target === claimModal) closeItemModal();
    });
  }

  // Mark item as Claimed
  if (modalConfirmClaimBtn) {
    modalConfirmClaimBtn.addEventListener('click', () => {
      if (!activeModalItemId) return;
      const targetItem = itemsList.find(i => i.id === activeModalItemId);
      if (targetItem) {
        targetItem.status = 'Claimed';
        persistItems();
        updateStats();
        renderFilteredItems();
        closeItemModal();
      }
    });
  }

  // =========================================================================
  // 7. REPORT ITEM FORM HANDLING
  // =========================================================================
  if (reportForm) {
    reportForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const status = document.getElementById('item-status').value;
      const name = document.getElementById('item-name').value.trim();
      const category = document.getElementById('item-category').value;
      const location = document.getElementById('item-location').value.trim();
      const contact = document.getElementById('item-contact').value.trim();
      const description = document.getElementById('item-description').value.trim();

      let hasError = false;

      // Validate Name
      if (!name) {
        document.getElementById('item-name').closest('.form-group').classList.add('has-error');
        hasError = true;
      } else {
        document.getElementById('item-name').closest('.form-group').classList.remove('has-error');
      }

      // Validate Category
      if (!category) {
        document.getElementById('item-category').closest('.form-group').classList.add('has-error');
        hasError = true;
      } else {
        document.getElementById('item-category').closest('.form-group').classList.remove('has-error');
      }

      // Validate Location
      if (!location) {
        document.getElementById('item-location').closest('.form-group').classList.add('has-error');
        hasError = true;
      } else {
        document.getElementById('item-location').closest('.form-group').classList.remove('has-error');
      }

      // Validate Contact
      if (!contact) {
        document.getElementById('item-contact').closest('.form-group').classList.add('has-error');
        hasError = true;
      } else {
        document.getElementById('item-contact').closest('.form-group').classList.remove('has-error');
      }

      if (hasError) return;

      // Format current date
      const today = new Date();
      const dateString = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      // Create new Item object
      const newItem = {
        id: 'item-' + Date.now(),
        name,
        category,
        location,
        status,
        date: dateString,
        description: description || 'Reported by student via portal form.',
        contact
      };

      // Prepend to list
      itemsList.unshift(newItem);
      persistItems();
      populateLocationDropdown();
      updateStats();

      // Clear search to show new item
      resetAllFilters();

      // Show Feedback Toast
      if (formFeedback) {
        formFeedback.classList.remove('hidden');
        setTimeout(() => {
          formFeedback.classList.add('hidden');
        }, 5000);
      }

      // Reset form
      reportForm.reset();

      // Scroll smoothly up to the items grid to highlight the newly added item
      itemsGrid.scrollIntoView({ behavior: 'smooth' });
    });

    // Clear validation error on typing
    reportForm.querySelectorAll('input, select').forEach(elem => {
      elem.addEventListener('input', () => {
        elem.closest('.form-group').classList.remove('has-error');
      });
    });
  }

  // =========================================================================
  // 8. INITIALIZATION
  // =========================================================================
  populateLocationDropdown();
  updateStats();
  renderFilteredItems();

  // Footer Year
  const yearElem = document.getElementById('current-year');
  if (yearElem) yearElem.textContent = new Date().getFullYear();

});
