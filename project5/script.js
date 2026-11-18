/**
 * Student Academic Dashboard - Interactive Functionality
 * Features:
 * - Responsive mobile sidebar drawer toggle
 * - Notifications dropdown flyout
 * - Interactive action toasts (Submit assignment, Download transcript, Refresh log)
 * - Accessible focus and escape key handling
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. MOBILE SIDEBAR DRAWER TOGGLE
  // =========================================================================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const navLinks = document.querySelectorAll('.nav-link');

  function openSidebar() {
    if (sidebar && sidebarOverlay) {
      sidebar.classList.add('open');
      sidebarOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'true');
    }
  }

  function closeSidebar() {
    if (sidebar && sidebarOverlay) {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
      document.body.style.overflow = '';
      if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openSidebar);
  if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

  // Close sidebar on clicking any navigation link (mobile friendliness)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      if (window.innerWidth <= 992) {
        closeSidebar();
      }
    });
  });

  // =========================================================================
  // 2. NOTIFICATIONS FLYOUT DROPDOWN
  // =========================================================================
  const notifToggleBtn = document.getElementById('notif-toggle-btn');
  const notifDropdown = document.getElementById('notif-dropdown');

  if (notifToggleBtn && notifDropdown) {
    notifToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = notifDropdown.classList.toggle('hidden');
      notifToggleBtn.setAttribute('aria-expanded', !isHidden);
    });

    // Close notifications dropdown on clicking outside
    document.addEventListener('click', (e) => {
      if (!notifDropdown.contains(e.target) && !notifToggleBtn.contains(e.target)) {
        notifDropdown.classList.add('hidden');
        notifToggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // =========================================================================
  // 3. TOAST NOTIFICATION UTILITY
  // =========================================================================
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(message, iconClass = 'fa-circle-check', isError = false) {
    if (!toast || !toastMessage) return;

    if (toastTimer) clearTimeout(toastTimer);

    toastMessage.textContent = message;
    const toastIcon = toast.querySelector('.toast-icon');
    if (toastIcon) {
      toastIcon.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
      toastIcon.style.color = isError ? '#f87171' : '#34d399';
    }

    toast.classList.remove('hidden');

    toastTimer = setTimeout(() => {
      toast.classList.add('hidden');
    }, 4000);
  }

  // =========================================================================
  // 4. INTERACTIVE ACTIONS (SUBMISSIONS, TRANSCRIPT, EDIT)
  // =========================================================================

  // Deadline Assignment Submit buttons
  document.querySelectorAll('.action-submit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const course = btn.getAttribute('data-course') || 'Course';
      showToast(`Navigating to upload portal for ${course}...`, 'fa-cloud-arrow-up');
    });
  });

  // Edit Profile button
  const editProfileBtn = document.getElementById('edit-profile-btn');
  if (editProfileBtn) {
    editProfileBtn.addEventListener('click', () => {
      showToast('Profile editing enabled. Student data unlocked.', 'fa-pen-to-square');
    });
  }

  // Download Transcript button
  const downloadTranscriptBtn = document.getElementById('download-transcript-btn');
  if (downloadTranscriptBtn) {
    downloadTranscriptBtn.addEventListener('click', () => {
      showToast('Generating unofficial student transcript PDF...', 'fa-file-pdf');
    });
  }

  // Refresh Activity Log button
  const clearActivityFilterBtn = document.getElementById('clear-activity-filter-btn');
  if (clearActivityFilterBtn) {
    clearActivityFilterBtn.addEventListener('click', () => {
      const icon = clearActivityFilterBtn.querySelector('i');
      if (icon) icon.classList.add('fa-spin');

      setTimeout(() => {
        if (icon) icon.classList.remove('fa-spin');
        showToast('Activity log synchronized with university server.', 'fa-arrows-rotate');
      }, 700);
    });
  }

  // =========================================================================
  // 5. ACCESSIBLE KEYBOARD ESCAPE LISTENER
  // =========================================================================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSidebar();
      if (notifDropdown) notifDropdown.classList.add('hidden');
    }
  });

});
