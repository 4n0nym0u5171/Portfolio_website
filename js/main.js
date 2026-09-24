// Main JS - Loads topbar partial and handles page-specific functionality

// Works data (used on works.html and index.html)
const WORKS_PROJECTS = [
  { 
    id: 1, 
    title: 'EDGE - FEU Roosevelt Internship Portal', 
    category: 'Website Application', 
    icon: '', 
    description: 'Our capstone project for FEU Roosevelt college, aiming to solve the problem of internship management. The system allows students to ease their issues with internship applications. Employers may now have access to the website, post job openings manage applications, handle requested documents and easily communicate with students. OJT handlers acts as intermediaries between students and employers. The system also features a notification system to keep students informed about their applications and document submissions.', 
    tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL','Git'], 
    features: ['Role based access control', 'Document Upload', 'User Management','Notification System','Messaging System'], 
    screenshots: [
      'src/img/EDGE1.jpg',
      'src/img/EDGE2.jpg',
      'src/img/EDGE3.jpg',
      'src/img/EDGE4.jpg',
      'src/img/EDGE5.jpg',
      'src/img/EDGE6.jpg',
      'src/img/EDGE7.jpg',
      'src/img/EDGE8.jpg',
      'src/img/EDGE9.jpg',
      'src/img/EDGE10.jpg',
      'src/img/EDGE11.jpg',
      'src/img/EDGE12.jpg',
      'src/img/EDGE13.jpg',
      'src/img/EDGE14.jpg'
    ],
    links: { github: '#', docs: '#' } 
  },
  { 
    id: 2, 
    title: 'MD Law - Legal Appointment Information System', 
    category: 'Website Application', 
    icon: 'clipboard-outline', 
    description: 'MD Law is our collaborative project provided by MD Business Management Corp. The version provided was incomplete and lacked essential features. So we took the initiative to enhance it by improving its UI design, adding new functionalities, tightening the security,fixing the database schema and organizing its flow. Most parts of the system perfectly reflects what is stored in the database where created practice areas and lawyer will reflect to the home page including the booking system. Additionally, we implemented an email notification system and also used single-page application (SPA) for improved user experience on admin page. We could say its our best project so far since we have learned a lot of things and we are able to apply our knowledge in this project. We completed this project in 3-4 weeks and we are proud of it.', 
    tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL','Git','PHPMailer','AJAX'], 
    features: ['Role based access control', 'Appointment Scheduling', 'Email Notifications','Single Page Application', 'Mobile Responsive Design','User Autghentication', 'Data export'], 
    screenshots: [
      'src/img/MDLAW1.jpg',
      'src/img/MDLAW2.jpg',
      'src/img/MDLAW3.jpg',
      'src/img/MDLAW4.jpg',
      'src/img/MDLAW5.jpg',
      'src/img/MDLAW6.jpg',
      'src/img/MDLAW7.jpg',
      'src/img/MDLAW8.jpg',
      'src/img/MDLAW9.jpg',
      'src/img/MDLAW10.jpg',
      'src/img/MDLAW11.jpg',
      'src/img/MDLAW12.jpg',
      'src/img/MDLAW13.jpg',
      'src/img/MDLAW14.jpg'
    ],
    links: { github: '#', docs: '#' } 
  },
  { 
    id: 3, 
    title: 'HRIS - Attendance Tracker/Registration System', 
    category: 'Software Application', 
    icon: 'partly-sunny-outline', 
    description: 'This solo project was provided by MD Business Management Corp. The technology used was Winforms/C# for frontend with PHP as backend and MySQL for database. The system is designed to manage employee attendance and registration. It features biometric integration for accurate attendance tracking, user registration for employees, and a dashboard for administrators to monitor attendance records. ', 
    tech: ['C#','MySQL','PHP'], 
    features: ['User Registration', 'Biometric Integration', 'Attendance Tracking'], 
    screenshots: [
      
    ],
    links: { github: '#', docs: '#' } 
  },
  { 
    id: 4, 
    title: 'Venti - E-commerce Inventory Management System ', 
    category: 'In Progress', 
    icon: 'cart-outline', 
    description: 'Our project for a client with an e-commerce business. The system is designed to manage inventory and connect to multiple sales channels, including online stores and physical store locations. The project is currently in development with the aim to provide analytics, stock movement, API integration across sales channels and in store sales.', 
    tech: ['React', 'Laravel', 'Typescript', 'SQLite'], 
    features: ['Inventory Management', 'API Integration', 'Multi-Channel Support', 'Real-time Analytics', 'User Authentication','mobile-responsive design'], 
    screenshots: [
      'src/img/Venti1.jpg',
      'src/img/Venti2.jpg',
      'src/img/Venti3.jpg'
    ],
    links: { github: 'https://github.com/4n0nym0u5171/Venti---Omnichannel-Inventory-System', docs: '#' } 
  },
];

let currentFilter = 'all';

// Project Modal State (module-level for shared access)
let currentSlide = 0;
let currentProject = null;
let slideshowTrack = null;
let slideshowPagination = null;
let projectModalContainer = null;
let projectModalOverlay = null;

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

  // Toggle for mobile drawer
  const toggle = document.getElementById('topbar-toggle');
  const list = document.getElementById('topbar-list');
  if (toggle && list) {
    const openIcon = toggle.querySelector('.toggle-icon-open');
    const closeIcon = toggle.querySelector('.toggle-icon-close');
    const setOpen = (open) => {
      list.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      if (openIcon) openIcon.style.display = open ? 'none' : 'block';
      if (closeIcon) closeIcon.style.display = open ? 'block' : 'none';
    };
    toggle.addEventListener('click', () => setOpen(!list.classList.contains('open')));
    links.forEach(l => l.addEventListener('click', () => { if (window.innerWidth < 768) setOpen(false); }));
    document.addEventListener('click', (e) => {
      if (window.innerWidth >= 768) return;
      if (!topbar.contains(e.target)) setOpen(false);
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
      initProjectModal();
      break;
    case 'contact':
      initContactForm();
      break;
    case 'home':
      initProjectModal();
      break;
  }

  // Common initializers
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
    if (card) openProjectModal(parseInt(card.dataset.projectId));
  });

  worksGrid.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.work-card')) {
      e.preventDefault();
      openProjectModal(parseInt(e.target.closest('.work-card').dataset.projectId));
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
        ${project.screenshots && project.screenshots[0] 
          ? `<img src="${project.screenshots[0]}" alt="${project.title}" loading="lazy">`
          : `<div class="work-placeholder"><ion-icon name="${project.icon}"></ion-icon></div>`
        }
        <div class="work-card-overlay"><ion-icon name="eye-outline"></ion-icon><span>View Details</span></div>
      </div>
      <div class="work-card-content">
        <span class="work-card-category">${project.category}</span>
        <h3 class="work-card-title">${project.title}</h3>
      </div>
    </article>
  `).join('');
}

// Project Modal functionality (Works page)
function initProjectModal() {
  projectModalOverlay = document.getElementById('project-modal-overlay');
  projectModalContainer = document.getElementById('project-modal-container');
  const closeBtn = document.getElementById('project-modal-close');
  const slideshowPrev = document.getElementById('slideshow-prev');
  const slideshowNext = document.getElementById('slideshow-next');
  slideshowTrack = document.getElementById('slideshow-track');
  slideshowPagination = document.getElementById('slideshow-pagination');

  currentSlide = 0;
  currentProject = null;

  function showSlide(index) {
    if (!slideshowTrack || !currentProject) return;
    const slides = slideshowTrack.querySelectorAll('.slide');
    if (!slides.length) return;
    
    // Wrap around
    const totalSlides = currentProject.screenshots.length;
    currentSlide = (index + totalSlides) % totalSlides;
    
    console.log('showSlide called:', { index, currentSlide, totalSlides });
    
    // Show/hide slides
    slides.forEach((slide, i) => {
      slide.style.display = i === currentSlide ? 'flex' : 'none';
    });
    
    // Update pagination dots
    const dots = slideshowPagination?.querySelectorAll('.pagination-dot');
    dots?.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function goToSlide(index) {
    if (!currentProject) return;
    console.log('goToSlide called:', { index, currentSlide });
    showSlide(index);
  }

  function nextSlide() { 
    console.log('nextSlide clicked, currentSlide:', currentSlide);
    showSlide(currentSlide + 1); 
  }
  function prevSlide() { 
    console.log('prevSlide clicked, currentSlide:', currentSlide);
    showSlide(currentSlide - 1); 
  }

  slideshowNext?.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('Next button clicked');
    nextSlide();
  });
  slideshowPrev?.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('Prev button clicked');
    prevSlide();
  });

  // Pagination dots click
  slideshowPagination?.addEventListener('click', (e) => {
    const dot = e.target.closest('.pagination-dot');
    if (dot) {
      const index = parseInt(dot.dataset.index, 10);
      console.log('Pagination dot clicked:', { index, dataset: dot.dataset });
      showSlide(index);
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!container?.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') { console.log('ArrowLeft pressed'); prevSlide(); }
    if (e.key === 'ArrowRight') { console.log('ArrowRight pressed'); nextSlide(); }
    if (e.key === 'Escape') closeProjectModal();
  });

  // Touch swipe support
  let touchStartX = 0;
  slideshowTrack?.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slideshowTrack?.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide(); else prevSlide();
    }
  }, { passive: true });

  closeBtn?.addEventListener('click', closeProjectModal);
  overlay?.addEventListener('click', closeProjectModal);
}

function openProjectModal(projectId) {
  const project = WORKS_PROJECTS.find(p => p.id === projectId);
  if (!project) return;

  currentSlide = 0;
currentProject = project;

  // Populate media panel
  if (slideshowTrack && project.screenshots) {
    slideshowTrack.innerHTML = project.screenshots.map((src, i) => `
      <div class="slide" data-index="${i}" style="${i === 0 ? 'display:flex' : 'display:none'}">
        <img src="${src}" alt="${project.title} - Screenshot ${i + 1}" loading="lazy">
      </div>
    `).join('');
  }

  if (slideshowPagination && project.screenshots) {
    slideshowPagination.innerHTML = project.screenshots.map((_, i) => `
      <button class="pagination-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to screenshot ${i + 1}"></button>
    `).join('');
  }

  // Populate details panel
  const categoryEl = document.getElementById('project-modal-category');
  const titleEl = document.getElementById('project-modal-title');
  const tagsEl = document.getElementById('project-modal-tags');
  const descEl = document.getElementById('project-modal-description');
  const featuresList = document.getElementById('project-modal-features-list');
  const githubBtn = document.getElementById('project-modal-github');
  const docsBtn = document.getElementById('project-modal-docs');

  categoryEl.textContent = project.category;
  titleEl.textContent = project.title;
  titleEl.id = 'project-modal-title'; // for aria-labelledby
  
  tagsEl.innerHTML = project.tech.map(t => `<span class="project-modal-tag">${t}</span>`).join('');
  descEl.textContent = project.description;
  
  featuresList.innerHTML = project.features.map(f => 
    `<li><ion-icon name="checkmark-outline"></ion-icon>${f}</li>`
  ).join('');

  const githubUrl = project.links.github;
  const docsUrl = project.links.docs;
  
  const githubDisabled = githubUrl === '#';
  const docsDisabled = docsUrl === '#';
  
  githubBtn.href = githubDisabled ? 'javascript:void(0)' : githubUrl;
  docsBtn.href = docsDisabled ? 'javascript:void(0)' : docsUrl;
  
  githubBtn.classList.toggle('project-modal-btn--disabled', githubDisabled);
  docsBtn.classList.toggle('project-modal-btn--disabled', docsDisabled);
  
  githubBtn.title = githubDisabled ? 'Not available' : '';
  docsBtn.title = docsDisabled ? 'Not available' : '';
  
  if (githubDisabled) {
    githubBtn.removeAttribute('target');
    githubBtn.removeAttribute('rel');
  } else {
    githubBtn.setAttribute('target', '_blank');
    githubBtn.setAttribute('rel', 'noopener noreferrer');
  }
  
  if (docsDisabled) {
    docsBtn.removeAttribute('target');
    docsBtn.removeAttribute('rel');
  } else {
    docsBtn.setAttribute('target', '_blank');
    docsBtn.setAttribute('rel', 'noopener noreferrer');
  }

  // Show modal
  const overlay = document.getElementById('project-modal-overlay');
  const container = document.getElementById('project-modal-container');
  
  overlay.classList.add('active');
  container.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Focus management
  setTimeout(() => closeBtn?.focus(), 100);
}

function closeProjectModal() {
  projectModalOverlay?.classList.remove('active');
  projectModalContainer?.classList.remove('active');
  document.body.style.overflow = '';
  currentProject = null;
  currentSlide = 0;
}

// Contact form
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitWrapper = document.getElementById('form-submit-wrapper');
  const successMsg = document.getElementById('form-success');
  if (!form) return;

  // EmailJS configuration - REPLACE WITH YOUR ACTUAL CREDENTIALS
  const EMAILJS_CONFIG = {
    serviceId: 'service_rtm0ch8',    // Replace with your EmailJS Service ID
    templateId: 'template_ajts2o8',  // Replace with your EmailJS Template ID
    publicKey: 'Nihn_7m00tOnCQ2pD'    // Replace with your EmailJS Public Key
  };

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

    const formData = new FormData(form);
    const templateParams = {
      from_name: formData.get('name'),
      from_email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    try {
      // Initialize EmailJS
      emailjs.init(EMAILJS_CONFIG.publicKey);
      
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );

      form.reset();
      status = 'success';
      renderSubmit();
      setTimeout(() => {
        status = 'idle';
        renderSubmit();
      }, 3000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      status = 'error';
      renderSubmit();
      // Show error state briefly then reset
      setTimeout(() => {
        status = 'idle';
        renderSubmit();
      }, 3000);
    }
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

// ========================================
// IMAGE FALLBACK UTILITY
// ========================================
function setupImageFallbacks() {
  // Base64 SVG fallback logos for common tech (gold color #f5d742)
  const fallbackLogos = {
    'code': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#f5d742" d="M12 2L2 7l10 5 10-5-10-5z"/><path fill="#f5d742" d="M2 17l10 5 10-5"/></svg>',
    'database': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#f5d742" d="M12 2C6.48 2 2 5.58 2 12s4.48 10 10 10 10-3.58 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 1.52-.71 3.31-1.25 5.29-1.25s3.77.54 5.29 1.25C18.42 18.42 15.42 20 12 20z"/></svg>',
    'globe': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#f5d742" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v4h-2zm0 8h2v2h-2z"/></svg>',
    'brush': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#f5d742" d="M20.5 3.5l-2.8 2.8c-.8.8-.8 2.1 0 2.9l8.4 8.4c.8.8 2.1.8 2.9 0l2.8-2.8c.8-.8.8-2.1 0-2.9L20.5 3.5c-.8-.8-2.1-.8-2.9 0L4.5 17.5c-.4.4-.6.9-.6 1.4v4.1c0 .6.4 1.1 1 1.1h4.1c.5 0 .9-.2 1.4-.6l10.5-10.5c.8-.8.8-2.1 0-2.9L11.9 2.1c-.8-.8-2.1-.8-2.9 0L3.5 17.5c-.8.8-.8 2.1 0 2.9l10.5 10.5c.4.4.9.6 1.4.6h.1c.5 0 1-.2 1.4-.6l8.5-8.5c.8-.8.8-2.1 0-2.9z"/></svg>',
    'server': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#f5d742" d="M12 2C6.48 2 2 5.58 2 12s4.48 10 10 10 10-3.58 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 1.52-.71 3.31-1.25 5.29-1.25s3.77.54 5.29 1.25C18.42 18.42 15.42 20 12 20z"/></svg>',
    'globe': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#f5d742" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v4h-2zm0 8h2v2h-2z"/></svg>',
    'brush': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#f5d742" d="M20.5 3.5l-2.8 2.8c-.8.8-.8 2.1 0 2.9l8.4 8.4c.8.8 2.1.8 2.9 0l2.8-2.8c.8-.8.8-2.1 0-2.9L20.5 3.5c-.8-.8-2.1-.8-2.9 0L4.5 17.5c-.4.4-.6.9-.6 1.4v4.1c0 .6.4 1.1 1 1.1h4.1c.5 0 .9-.2 1.4-.6l10.5-10.5c.8-.8.8-2.1 0-2.9L11.9 2.1c-.8-.8-2.1-.8-2.9 0L3.5 17.5c-.8.8-.8 2.1 0 2.9l10.5 10.5c.4.4.9.6 1.4.6h.1c.5 0 1-.2 1.4-.6l8.5-8.5c.8-.8.8-2.1 0-2.9z"/></svg>',
    'vscode': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#f5d742" d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-7 14v-3h2v3h-2zm0-5v-3h2v3h-2zm0-5v-3h2v3h-2zM8 16v-3h2v3H8zm0-5v-3h2v3H8zm0-5V6h2v3H8z"/></svg>',
    'visualstudio': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#f5d742" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h8a2 2 0 002-2V8l-6-6zm2 16H6V4h8v4M9 10h6v2H9v-2zm0 4h6v2H9v-2z"/></svg>',
    'windows': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#f5d742" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v4h-2zm0 8h2v2h-2z"/></svg>',
    'chrome': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#f5d742" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v4h-2zm0 8h2v2h-2z"/></svg>',
    'microsoft': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#f5d742" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h8a2 2 0 002-2V8l-6-6zm2 16H6V4h8v4M9 10h6v2H9v-2zm0 4h6v2H9v-2z"/></svg>',
    'github': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#f5d742" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.105.82-.227.82-.5.005-.234.005-1.072.005-2.14-3.338.724-4.042-1.61-4.042-1.61-.546-1.38-1.33-1.75-1.33-1.75-1.08-.74.08-.73.08-.73 1.2.08 1.84.83 1.84 1.84 1.07.072 1.34.696 1.14 1.218.17.2-.26.68-.15 1.24-.54-4.2-.2-5.78-2.11-5.78-9.37 0-2.07.74-3.75 1.97-5.07-.19-.47-.86-2.38.19-4.96 0 0 1.61-.5 5.28 1.97a18 18 0 01.95-.4c.58.04 1.16.06 1.74.06.59 0 1.17-.02 1.74-.06 3.66 2.47 5.28 1.97 5.28 5.07 0 5.59-3.7 9.3-5.78 9.37.43 2.3.78 4.7.24 5.56.35.57.26 1.1-.15 1.24-.96.26-1.8.82-1.8 1.82 0 .67.005 1.34.005 1.47 0 2.01-.005 4.1-2.84 7.58-8.205 11.385C20.62 23.52 24 18.01 24 12c0-5.6-4.38-11.52-10-12z"/></svg>',
    'git': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#f5d742" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v4h-2zm0 8h2v2h-2z"/></svg>',
  };

  // Primary and backup CDN sources for devicons
  const iconSources = {
    primary: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/',
    backup: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/',
  };

  // SVG icon templates for fallback
  function getFallbackSvg(name) {
    return fallbackLogos[name] || fallbackLogos.code;
  }

  // Create fallback SVG element
  function createFallbackSvg(name, size = 18) {
    const svg = getFallbackSvg(name);
    const div = document.createElement('div');
    div.innerHTML = svg;
    const svgEl = div.querySelector('svg');
    if (svgEl) {
      svgEl.setAttribute('width', size);
      svgEl.setAttribute('height', size);
      svgEl.style.fill = '#f5d742';
      return svgEl;
    }
    return null;
  }

  // Setup fallback for a single image element
  function setupImageFallback(img, techName, size = 18) {
    const techKey = techName.toLowerCase().replace(/[^a-z0-9]/g, '');
    let attemptCount = 0;
    const maxAttempts = 2;

    function tryNextSource() {
      if (attemptCount >= maxAttempts) {
        // All sources failed, show fallback SVG
        const fallbackSvg = createFallbackSvg(techKey, 18);
        if (fallbackSvg) {
          img.replaceWith(fallbackSvg);
        }
        return;
      }

      if (attemptCount === 0) {
        // Try backup CDN
        const originalSrc = img.src;
        const backupSrc = originalSrc.replace(iconSources.primary, iconSources.backup);
        img.src = backupSrc;
      } else {
        // All external sources failed, use inline SVG
        const fallbackSvg = createFallbackSvg(techKey, size);
        if (fallbackSvg) {
          const wrapper = document.createElement('span');
          wrapper.className = 'tech-item-icon-wrapper';
          wrapper.style.display = 'inline-flex';
          wrapper.style.alignItems = 'center';
          wrapper.style.justifyContent = 'center';
          wrapper.style.width = size + 'px';
          wrapper.style.height = size + 'px';
          wrapper.appendChild(fallbackSvg);
          img.replaceWith(wrapper);
        }
      }
      attemptCount++;
    }

    img.addEventListener('error', () => {
      tryNextSource();
    });

    // Also handle case where image is already cached and error fired before listener
    if (!img.complete || img.naturalWidth === 0) {
      img.addEventListener('load', () => {
        img.style.display = '';
      }, { once: true });
    }
  }

  // Initialize all tech images
  document.querySelectorAll('.tech-item-icon, .tech-card-icon').forEach(img => {
    const techItem = img.closest('.tech-item') || img.closest('.tech-card-header');
    const techName = img.alt || '';
    const size = img.classList.contains('tech-card-icon') ? 28 : 18;
    setupImageFallback(img, techName, size);
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupImageFallbacks);
} else {
  setupImageFallbacks();
}