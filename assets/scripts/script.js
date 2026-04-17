// Icons
lucide.createIcons();

// Process Section Scroll Logic (Sticky Image Changer)
document.addEventListener("DOMContentLoaded", () => {
  const processSteps = document.querySelectorAll(".process-step");
  const images = [
    document.getElementById("process-img-1"),
    document.getElementById("process-img-2"),
    document.getElementById("process-img-3"),
  ];
  const numberEl = document.getElementById("process-number");

  const observerOptions = {
    root: null,
    rootMargin: "-40% 0px -40% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const step = entry.target.getAttribute("data-step");
        const index = parseInt(step) - 1;

        // Update Number
        numberEl.innerText = `0${step}`;

        // Update Images
        images.forEach((img, i) => {
          if (i === index) {
            img.classList.add("active");
            img.classList.remove("inactive");
          } else {
            img.classList.remove("active");
            img.classList.add("inactive");
          }
        });
      }
    });
  }, observerOptions);

  processSteps.forEach((step) => observer.observe(step));
});

// Draggable Infinite Scroll Logic
(function () {
  const container = document.getElementById("marquee-container");
  const track = document.getElementById("marquee-track");

  if (!container || !track) return;

  // Clone items for infinite loop
  const originalCards = Array.from(track.children);
  originalCards.forEach((card) => track.appendChild(card.cloneNode(true))); // Set 2
  originalCards.forEach((card) => track.appendChild(card.cloneNode(true))); // Set 3

  let position = 0;
  const speed = 0.5;
  let isDragging = false;
  let startX = 0;
  let prevTranslate = 0;
  let animationID;

  function animate() {
    if (!isDragging) position += speed;
    const trackWidth = track.scrollWidth;
    const setWidth = trackWidth / 3;

    if (position >= setWidth) {
      position = 0;
      if (isDragging) {
        prevTranslate += setWidth;
        startX += setWidth;
      }
    }
    if (position < 0) {
      position = setWidth - 1;
      if (isDragging) {
        prevTranslate -= setWidth;
        startX -= setWidth;
      }
    }

    track.style.transform = `translateX(${-position}px)`;
    animationID = requestAnimationFrame(animate);
  }
  animationID = requestAnimationFrame(animate);

  // Drag Events
  const startDrag = (e) => {
    isDragging = true;
    container.classList.add("cursor-grabbing");
    container.classList.remove("cursor-grab");
    startX = e.pageX || e.touches[0].clientX;
    prevTranslate = position;
  };
  const moveDrag = (e) => {
    if (!isDragging) return;
    const currentX = e.pageX || e.touches[0].clientX;
    const diff = startX - currentX;
    position = prevTranslate + diff;
  };
  const endDrag = () => {
    isDragging = false;
    container.classList.add("cursor-grab");
    container.classList.remove("cursor-grabbing");
  };

  container.addEventListener("mousedown", startDrag);
  container.addEventListener("touchstart", startDrag);
  container.addEventListener("mousemove", moveDrag);
  container.addEventListener("touchmove", moveDrag);
  container.addEventListener("mouseup", endDrag);
  container.addEventListener("mouseleave", endDrag);
  container.addEventListener("touchend", endDrag);
})();

// Hero changing texts/phrases
const phrases = [
  "theology and God?",
  "growing your Calling?",
  "disciple-making?",
  "church Planting?",
  "world Missions?",
];

let currentIndex = 0;
const target = document.getElementById("text-target");

// Initial load
target.classList.remove("opacity-0", "translate-y-2", "blur-md");
target.classList.add("animate-cinematic-in");

setInterval(() => {
  // 1. Trigger the "Out" animation
  target.classList.remove("animate-cinematic-in");
  target.classList.add("animate-cinematic-out");

  // 2. Wait for the exit animation to finish (600ms), then swap text
  setTimeout(() => {
    currentIndex = (currentIndex + 1) % phrases.length;
    target.textContent = phrases[currentIndex];

    // 3. Trigger the "In" animation
    target.classList.remove("animate-cinematic-out");
    target.classList.add("animate-cinematic-in");
  }, 600); // Matches the duration of cinematic-out
}, 4000); // Change text every 4 seconds






//////// About Scroll Trigger Text Reveal

// Wait for the DOM to be ready
  document.addEventListener("DOMContentLoaded", (event) => {
    
    // Register the plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initial Setup: Hide the text and push it down
    gsap.set(".reveal-text", { 
      yPercent: 100,
      autoAlpha: 0 // This ensures it's invisible until animation starts
    });

    // The Trigger
    ScrollTrigger.batch(".reveal-container", {
      start: "top 90%", // Trigger when top of section hits 90% of viewport
    //   markers: true, // UNCOMMENT THIS LINE TO DEBUG (shows start/end lines)
      onEnter: batch => {
        gsap.to(document.querySelectorAll(".reveal-text"), {
          autoAlpha: 1,
          yPercent: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.1
        });     
        },
        
        // Ensures opacity stays 1 once played
        once: true,
        // onLeaveBack: () => gsap.set(".reveal-text", { yPercent: 110, skewY: 5, autoAlpha: 0 })
    });
  });

  
// Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

 // Smooth scroll for anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      lenis.scrollTo(target);
    }
  });
});