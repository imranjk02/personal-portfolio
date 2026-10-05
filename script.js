window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    setTimeout(() => { preloader.classList.add("hide");}, 700);
});

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-menu");
const menuIcon = menuToggle.querySelector("i");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    if (navMenu.classList.contains("active")) {
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-xmark");
    } else {
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
    }
});

document
    .querySelectorAll(".nav-link")
    .forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");
        });
    });

const typingText = document.getElementById("typing-text");
const words = ["Web Developer", "Python Developer", "Problem Solver", "Tech Enthusiast"];
let wordIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    if (!deleting) {
        typingText.textContent = currentWord.substring( 0, characterIndex + 1);
        characterIndex++;

        if (characterIndex === currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        typingText.textContent = currentWord.substring(0, characterIndex - 1);
        characterIndex--;
        if (characterIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }
    setTimeout(typeEffect, deleting ? 50 : 90);
}
typeEffect();

const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        {threshold: 0.12}
    );

revealElements.forEach(element => {observer.observe(element);});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");
    const status = document.getElementById("formStatus");
    const submitButton = contactForm.querySelector(".submit-btn");

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    status.textContent = "";

    let valid = true;

    if (name.length < 2) {
        nameError.textContent = "Please enter a valid name.";
        valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        valid = false;
    }

    if (message.length < 10) {
        messageError.textContent = "Message must contain at least 10 characters.";
        valid = false;
    }

    if (!valid) {
        return;
    }

    submitButton.disabled = true;
    submitButton.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

    emailjs.sendForm("service_ae591ym", "template_5luffk3", contactForm).then(() => {
        status.style.color = "#34d399";
        status.textContent = "✓ Message sent successfully!";
        contactForm.reset();
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
    })
    .catch((error) => {
        console.error("EmailJS Error:", error);
        status.style.color = "#f87171";
        status.textContent = "✕ Failed to send message. Please try again.";
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
    });
});

document.getElementById("year").textContent = new Date().getFullYear();