// Main JS - Loads topbar partial and handles page-specific functionality

// Works data (used on works.html and index.html)
const WORKS_PROJECTS = [
  { id: 1, title: 'E-Commerce Platform', category: 'Web App', icon: 'cart-outline', description: 'A complete e-commerce solution with cart, checkout, payment integration, admin dashboard, and inventory management.', tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'], features: ['User authentication', 'Product management', 'Order tracking', 'Admin analytics', 'Email notifications'], links: { demo: '#', github: '#', caseStudy: '#' } },
  { id: 2, title: 'Task Management App', category: 'Soft App', icon: 'clipboard-outline', description: 'Collaborative project management tool with real-time updates, team workspaces, and advanced reporting.', tech: ['Vue.js', 'Firebase', 'TypeScript', 'Tailwind CSS'], features: ['Real-time collaboration', 'Kanban boards', 'Time tracking', 'Team workspaces', 'Export reports'], links: { demo: '#', github: '#', caseStudy: '#' } },
  { id: 3, title: 'Weather Dashboard', category: 'Web App', icon: 'partly-sunny-outline', description: 'Beautiful weather application with location-based forecasts, historical data, and interactive charts.', tech: ['React', 'Weather API', 'Chart.js', 'CSS Modules'], features: ['Current conditions', '7-day forecast', 'Historical data', 'Interactive charts', 'Geolocation'], links: { demo: '#', github: '#', caseStudy: '#' } },
  { id: 4, title: 'Fitness Tracker', category: 'In Progress', icon: 'fitness-outline', description: 'Cross-platform fitness application with workout tracking, progress analytics, and social features.', tech: ['React Native', 'Expo', 'AsyncStorage', 'React Navigation'], features: ['Workout logging', 'Progress photos', 'Statistics', 'Social sharing', 'Offline support'], links: { demo: '#', github: '#', caseStudy: '#' } },
  { id: 5, title: 'Portfolio Website', category: 'Web App', icon: 'desktop-outline', description: 'This very portfolio website built with modern CSS featuring dark theme and smooth animations.', tech: ['HTML', 'CSS', 'JavaScript', 'CSS Variables', 'IonIcons'], features: ['Dark theme', 'Responsive design', 'Smooth animations', 'Modular architecture', 'Accessible'], links: { demo: '#', github: '#', caseStudy: '#' } },
  { id: 6, title: 'API Gateway Service', category: 'In Progress', icon: 'server-outline', description: 'High-performance API gateway with rate limiting, authentication, request/response transformation, and monitoring.', tech: ['Node.js', 'Express', 'Redis', 'Docker', 'Prometheus'], features: ['Rate limiting', 'JWT authentication', 'Request validation', 'Load balancing', 'Metrics & logging'], links: { demo: '#', github: '#', caseStudy: '#' } }
];

let currentFilter = 'all';

// Load topbar partial
async function loadTopbar() {
  try {
    const response = await fetch('partials/topbar.html');
    const html = await response.text();
    document.getElementById('topbar-placeholder').innerHTML = html;
    initTopbar();
  } catch (err) {
    console.error('Failed to load topbar:', err);
  }
}

// Initialize topbar functionality
function initTopbar() {
  const topbar = document.getElementById('topbar');
  const links = document.querySelectorAll('.topbar-link');
  const progressFill = document.querySelector('.topbar-progress-fill');
  const topbarList = document.querySelector('.topbar-list');

  // Highlight current page
  const currentPage = getCurrentPage();
  links.forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add('active');
    }
  });

  // Update progress bar based on actual nav item positions
  if (progressFill && topbarList) {
    updateProgressBar(links, progressFill, topbarList, currentPage);
    
    // Recalculate on resize
    window.addEventListener('resize', () => {
      updateProgressBar(links, progressFill, topbarList, currentPage);
    });
  }

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) topbar.classList.add('scrolled');
    else topbar.classList.remove('scrolled');
  });
}

function updateProgressBar(links, progressFill, topbarList, currentPage) {
  // Percentage widths for each page (from Home to Contact)
  const pageProgress = {
    'home': 18,
    'services': 38,
    'about': 62,
    'works': 80,
    'contact': 100
  };

  const percent = pageProgress[currentPage] || 0;
  progressFill.style.width = `${percent}%`;
  progressFill.style.transform = 'none';
}

function getCurrentPage() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const pageMap = {
    'index.html': 'home',
    'services.html': 'services',
    'about.html': 'about',
    'works.html': 'works',
    'contact.html': 'contact'
  };
  return pageMap[path] || 'home';
}

// Page-specific initializers
function initPage() {
  const page = getCurrentPage();

  switch (page) {
    case 'works':
      initWorksPage();
      break;
    case 'contact':
      initContactForm();
      break;
    case 'home':
      // Home page - static content, no special init needed
      break;
  }

  // Common initializers
  initModal();
  initSmoothScroll();
  initIntersectionObserver();
  initScrollTopButton();
}

// Works page (works.html)
function initWorksPage() {
  initWorksFilter();
  initWorksGrid();
}

// Works filter tabs
function initWorksFilter() {
  const filterTabs = document.getElementById('filter-tabs');
  if (!filterTabs) return;

  filterTabs.addEventListener('click', (e) => {
    const tab = e.target.closest('.filter-tab');
    if (!tab) return;
    currentFilter = tab.dataset.filter;
    filterTabs.querySelectorAll('.filter-tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    renderWorksGrid();
  });
}

// Works grid
function initWorksGrid() {
  renderWorksGrid();
  const worksGrid = document.getElementById('works-grid') || document.getElementById('home-works-grid');
  if (!worksGrid) return;

  worksGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.work-card');
    if (card) openModal(parseInt(card.dataset.projectId));
  });

  worksGrid.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.work-card')) {
      e.preventDefault();
      openModal(parseInt(e.target.closest('.work-card').dataset.projectId));
    }
  });
}

function renderWorksGrid() {
  const grid = document.getElementById('works-grid') || document.getElementById('home-works-grid');
  if (!grid) return;

  const filtered = currentFilter === 'all'
    ? WORKS_PROJECTS
    : WORKS_PROJECTS.filter(p => p.category === currentFilter);

  grid.innerHTML = filtered.map(project => `
    <article class="work-card" data-project-id="${project.id}" tabindex="0" role="button" aria-label="View details for ${project.title}">
      <div class="work-card-image">
        <div class="work-placeholder"><ion-icon name="${project.icon}"></ion-icon></div>
        <div class="work-card-overlay"><ion-icon name="eye-outline"></ion-icon><span>View Details</span></div>
      </div>
      <div class="work-card-content">
        <span class="work-card-category">${project.category}</span>
        <h3 class="work-card-title">${project.title}</h3>
      </div>
    </article>
  `).join('');
}

// Modal functionality (shared across pages)
function initModal() {
  const overlay = document.getElementById('modal-overlay');
  const container = document.getElementById('modal-container');
  const closeBtn = document.getElementById('modal-close');

  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function openModal(projectId) {
  const project = WORKS_PROJECTS.find(p => p.id === projectId);
  if (!project) return;

  const titleEl = document.getElementById('modal-title');
  const contentEl = document.getElementById('modal-content');
  const overlay = document.getElementById('modal-overlay');
  const container = document.getElementById('modal-container');

  titleEl.textContent = project.title;
  contentEl.innerHTML = `
    <div class="project-modal-header">
      <span class="project-modal-category">${project.category}</span>
      <div class="project-modal-tech">
        ${project.tech.map(t => `<span class="project-modal-tech-tag">${t}</span>`).join('')}
      </div>
    </div>
    <p class="project-modal-description">${project.description}</p>
    <div class="project-modal-section">
      <h4 class="project-modal-section-title">Key Features</h4>
      <ul class="project-modal-features">
        ${project.features.map(f => `<li><ion-icon name="checkmark-outline"></ion-icon>${f}</li>`).join('')}
      </ul>
    </div>
    <div class="project-modal-links">
      <a href="${project.links.demo}" target="_blank" rel="noopener noreferrer" class="project-modal-link"><ion-icon name="open-outline"></ion-icon> Live Demo</a>
      <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="project-modal-link"><ion-icon name="logo-github"></ion-icon> Source Code</a>
      <a href="${project.links.caseStudy}" target="_blank" rel="noopener noreferrer" class="project-modal-link"><ion-icon name="document-text-outline"></ion-icon> Case Study</a>
    </div>
  `;

  overlay.classList.add('active');
  container.classList.add('active');
  document.body.style.overflow = 'hidden';
  closeBtn?.focus();
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  const container = document.getElementById('modal-container');
  overlay?.classList.remove('active');
  container?.classList.remove('active');
  document.body.style.overflow = '';
}

// Contact form
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitWrapper = document.getElementById('form-submit-wrapper');
  const successMsg = document.getElementById('form-success');
  if (!form) return;

  let status = 'idle';

  function renderSubmit() {
    if (!submitWrapper) return;
    submitWrapper.innerHTML = '';
    const btn = document.createElement('button');
    btn.type = 'submit';
    btn.className = 'btn btn--primary btn--lg form-submit';
    btn.disabled = status === 'submitting';
    if (status === 'submitting') {
      btn.innerHTML = '<ion-icon name="hourglass-outline" class="spin"></ion-icon> Sending...';
    } else if (status === 'success') {
      btn.innerHTML = '<ion-icon name="checkmark-circle-outline"></ion-icon> Sent Successfully!';
    } else {
      btn.innerHTML = 'Send Message <ion-icon name="paper-plane-outline"></ion-icon>';
    }
    submitWrapper.appendChild(btn);
    if (successMsg) successMsg.hidden = status !== 'success';
  }

  async function handleSubmit(e) {
    e.preventDefault();
    status = 'submitting';
    renderSubmit();

    await new Promise(resolve => setTimeout(resolve, 1500));

    form.reset();
    status = 'success';
    renderSubmit();
    setTimeout(() => {
      status = 'idle';
      renderSubmit();
    }, 3000);
  }

  form.addEventListener('submit', handleSubmit);
  renderSubmit();
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Intersection Observer for fade-in animations
function initIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('fade-in');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('section[id]').forEach(section => observer.observe(section));
}

// Start
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadTopbar().then(initPage);
  });
} else {
  loadTopbar().then(initPage);
}

// Scroll to top button
function initScrollTopButton() {
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (!scrollTopBtn) return;

  // Show/hide based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
      scrollTopBtn.hidden = false;
    } else {
      scrollTopBtn.classList.remove('visible');
      scrollTopBtn.hidden = true;
    }
  });

  // Scroll to top on click
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}