const testimonials = [
  {
    quote:
      "A equipe do Studio Aura traduziu nosso estilo com precisão absoluta. O resultado final ficou mais elegante do que imaginávamos.",

    author: "Patrícia Monteiro · Residência Alphaville",
  },

  {
    quote:
      "O processo foi extremamente claro e técnico. Tivemos confiança desde o primeiro briefing até a entrega dos ambientes.",

    author: "Rafael Dantas · Apartamento Jardins",
  },

  {
    quote:
      "Marina conseguiu equilibrar funcionalidade e atmosfera com um nível de detalhe raro no mercado de alto padrão.",

    author: "Eduardo Leal · Casa de Campo Itatiba",
  },
];

/* =========================
   ELEMENTS
========================= */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

const mobileLinks = mobileMenu
  ? mobileMenu.querySelectorAll("a")
  : [];

const testimonialTrack =
  document.getElementById("testimonialTrack");

const prevButton =
  document.getElementById("prevTestimonial");

const nextButton =
  document.getElementById("nextTestimonial");

const contactForm =
  document.getElementById("contactForm");

const formState =
  document.getElementById("formState");

const revealItems =
  document.querySelectorAll(".reveal");

const header =
  document.querySelector(".site-header");

/* =========================
   STATE
========================= */

let testimonialIndex = 0;
let sliderInterval = null;

/* =========================
   MOBILE MENU
========================= */

function toggleMenu(forceState) {
  if (!mobileMenu || !menuBtn) return;

  const isOpen =
    typeof forceState === "boolean"
      ? forceState
      : mobileMenu.hidden;

  mobileMenu.hidden = !isOpen;

  menuBtn.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  document.body.style.overflow = isOpen
    ? "hidden"
    : "";
}

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    toggleMenu();
  });
}

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    toggleMenu(false);
  });
});

/* =========================
   HEADER SCROLL
========================= */

window.addEventListener("scroll", () => {
  if (!header) return;

  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/* =========================
   TESTIMONIAL SLIDER
========================= */

function renderTestimonial(index) {
  if (
    !testimonialTrack ||
    testimonials.length === 0
  ) {
    return;
  }

  const current = testimonials[index];

  testimonialTrack.innerHTML = `
    <blockquote class="testimonial-quote">
      ${current.quote}
    </blockquote>

    <p class="testimonial-author">
      ${current.author}
    </p>
  `;
}

function nextTestimonial(step = 1) {
  testimonialIndex =
    (
      testimonialIndex +
      step +
      testimonials.length
    ) % testimonials.length;

  renderTestimonial(testimonialIndex);
}

function startSlider() {
  if (sliderInterval) {
    clearInterval(sliderInterval);
  }

  sliderInterval = setInterval(() => {
    nextTestimonial(1);
  }, 6000);
}

if (testimonialTrack) {
  renderTestimonial(testimonialIndex);
  startSlider();
}

if (prevButton) {
  prevButton.addEventListener("click", () => {
    nextTestimonial(-1);
    startSlider();
  });
}

if (nextButton) {
  nextButton.addEventListener("click", () => {
    nextTestimonial(1);
    startSlider();
  });
}

/* =========================
   FORM VALIDATION
========================= */

function clearErrors() {
  if (!contactForm) return;

  const errors =
    contactForm.querySelectorAll(".error");

  errors.forEach((item) => {
    item.textContent = "";
  });
}

function setFieldError(fieldId, message) {
  if (!contactForm) return;

  const field =
    contactForm.querySelector(`#${fieldId}`);

  const error =
    field?.parentElement?.querySelector(".error");

  if (error) {
    error.textContent = message;
  }
}

function validateForm() {
  if (!contactForm) return false;

  clearErrors();

  let valid = true;

  const nome =
    contactForm.nome.value.trim();

  const email =
    contactForm.email.value.trim();

  const cidade =
    contactForm.cidade.value.trim();

  const mensagem =
    contactForm.mensagem.value.trim();

  if (nome.length < 3) {
    setFieldError(
      "nome",
      "Informe seu nome completo."
    );

    valid = false;
  }

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    setFieldError(
      "email",
      "Digite um e-mail válido."
    );

    valid = false;
  }

  if (cidade.length < 2) {
    setFieldError(
      "cidade",
      "Informe a cidade do projeto."
    );

    valid = false;
  }

  if (mensagem.length < 16) {
    setFieldError(
      "mensagem",
      "Descreva o projeto com pelo menos 16 caracteres."
    );

    valid = false;
  }

  return valid;
}

if (contactForm) {
  contactForm.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      const isValid = validateForm();

      if (!isValid) {
        if (formState) {
          formState.textContent =
            "Revise os campos destacados para continuar.";
        }

        return;
      }

      if (formState) {
        formState.textContent =
          "Solicitação enviada. Retornaremos em até 1 dia útil.";
      }

      contactForm.reset();
    }
  );
}

/* =========================
   REVEAL ANIMATION
========================= */

function setupReveal() {
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "is-visible"
          );

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
    }
  );

  revealItems.forEach((item) => {
    observer.observe(item);
  });
}

setupReveal();

/* =========================
   CURRENT YEAR
========================= */

const year =
  document.getElementById("year");

if (year) {
  year.textContent = String(
    new Date().getFullYear()
  );
}