import { portfolioData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const { hero, about, contact, projects } = portfolioData;

  // 1. Populate Hero Section
  document.getElementById('hero-subtitle').innerHTML = hero.subtitle;
  document.getElementById('hero-title').innerHTML = hero.title;
  document.getElementById('hero-button').innerHTML = hero.buttonText;
  document.getElementById('hero-bg').src = hero.backgroundImage;

  // 2. Populate About Section
  document.getElementById('about-image').src = about.image;
  document.getElementById('about-subtitle').innerHTML = about.subtitle;
  document.getElementById('about-title').innerHTML = about.title;
  document.getElementById('about-description').innerHTML = about.description;
  
  const statsHtml = about.stats.map(stat => `
    <div>
      <h4 class="text-3xl mb-2">${stat.value}</h4>
      <p class="text-xs uppercase tracking-widest text-gray-400">${stat.label}</p>
    </div>
  `).join('');
  document.getElementById('about-stats').innerHTML = statsHtml;

  // 3. Populate Contact Section
  document.getElementById('contact-title').innerHTML = contact.title;
  document.getElementById('contact-subtitle').innerHTML = contact.subtitle;
  document.getElementById('contact-email').innerHTML = contact.email;
  document.getElementById('contact-email').href = `mailto:${contact.email}`;
  document.getElementById('contact-phone').innerHTML = contact.phone;
  document.getElementById('contact-phone').href = `tel:${contact.phone.replace(/[^0-9+]/g, '')}`;
  document.getElementById('contact-address').innerHTML = contact.address;

  // 4. Render Projects
  const gallery = document.getElementById('project-gallery');
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const closeModal = document.getElementById('close-modal');

  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card animate-fade-in';
    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" loading="lazy">
      <div class="project-overlay"></div>
      <div class="absolute bottom-6 left-6 text-white z-10">
        <p class="text-xs uppercase tracking-widest mb-1 opacity-80">${project.category}</p>
        <h3 class="text-xl">${project.title}</h3>
      </div>
    `;
    card.addEventListener('click', () => openProject(project));
    gallery.appendChild(card);
  });

  function openProject(project) {
    let currentImageIndex = 0;
    const images = project.images || [project.image];

    const updateImage = () => {
      const imgElement = modalContent.querySelector('.project-image');
      imgElement.src = images[currentImageIndex];
    };

    modalContent.innerHTML = `
      <div class="max-w-6xl mx-auto px-6 py-20">
        <div class="grid md:grid-cols-2 gap-12 items-start">
          <div class="relative">
            <img src="${images[0]}" alt="${project.title}" class="w-full h-auto shadow-2xl project-image">
            ${images.length > 1 ? `
              <button class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all prev-image">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="15,18 9,12 15,6"></polyline>
                </svg>
              </button>
              <button class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all next-image">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </button>
            ` : ''}
          </div>
          <div class="space-y-8">
            <div>
              <p class="text-xs uppercase tracking-widest text-gray-500 mb-2">${project.category} / ${project.year}</p>
              <h2 class="text-5xl mb-4">${project.title}</h2>
              <p class="text-sm text-gray-500 italic">${project.location}</p>
            </div>
            <p class="text-lg leading-relaxed text-gray-700">
              ${project.description}
            </p>
            <div class="pt-8 border-t border-gray-200">
              <h4 class="text-xs uppercase tracking-widest mb-4">Project Details</h4>
              <ul class="space-y-2 text-sm text-gray-600">
                <li class="flex justify-between"><span>Course Class</span> <span>${project.courseClass}</span></li>
                <li class="flex justify-between"><span>Software/Materials</span> <span>${project.softwareMaterials}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;

    // Add event listeners for image navigation
    if (images.length > 1) {
      const prevBtn = modalContent.querySelector('.prev-image');
      const nextBtn = modalContent.querySelector('.next-image');

      prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateImage();
      });

      nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateImage();
      });
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  // Close modal on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Smooth scroll for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});
