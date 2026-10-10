/* =====================================
   WEEK 5: SPA SIMULATION
   Dynamic routing and browser history
===================================== */

"use strict";

const app = document.getElementById("app-content");
const navLinks = document.querySelectorAll("[data-link]");
const yearElement = document.getElementById("year");

yearElement.textContent = new Date().getFullYear();

// Page content for each route
const pages = {
    home: `
        <section class="hero">
            <p class="eyebrow">Week 5 Internship Project</p>
            <h1>Welcome to <span class="highlight">Nova.</span></h1>
            <p class="lead">
                A Single Page Application demonstration built with
                HTML, CSS and JavaScript. Explore different pages
                without reloading the entire website.
            </p>
            <a class="button" href="#projects">Explore Projects</a>
            <a class="button secondary" href="#about">Learn More</a>
        </section>

        <section>
            <div class="section-heading">
                <p class="eyebrow">What We Demonstrate</p>
                <h2>One website, multiple views.</h2>
            </div>

            <div class="grid">
                <article class="card">
                    <h3>Dynamic Content</h3>
                    <p>JavaScript updates the main content when you navigate.</p>
                    <span class="tag">DOM Manipulation</span>
                </article>

                <article class="card">
                    <h3>Smart Navigation</h3>
                    <p>URL hash changes let you navigate between page views.</p>
                    <span class="tag">Routing</span>
                </article>

                <article class="card">
                    <h3>Browser History</h3>
                    <p>Use the Back and Forward buttons to revisit views.</p>
                    <span class="tag">History Support</span>
                </article>
            </div>
        </section>
    `,

    projects: `
        <section class="hero">
            <p class="eyebrow">My Work</p>
            <h1>Featured <span class="highlight">Projects.</span></h1>
            <p class="lead">
                Sample projects representing my frontend development
                learning journey.
            </p>
        </section>

        <section class="grid">
            <article class="card">
                <h3>Responsive Portfolio</h3>
                <p>A portfolio layout designed for desktop, tablet and mobile.</p>
                <span class="tag">HTML + CSS</span>
            </article>

            <article class="card">
                <h3>Interactive Calculator</h3>
                <p>A beginner-friendly calculator with interactive controls.</p>
                <span class="tag">JavaScript</span>
            </article>

            <article class="card">
                <h3>SPA Simulation</h3>
                <p>A multi-view website with hash-based navigation.</p>
                <span class="tag">SPA</span>
            </article>
        </section>
    `,

    about: `
        <section class="hero">
            <p class="eyebrow">About This Project</p>
            <h1>Learning by <span class="highlight">Building.</span></h1>
        </section>

        <section class="content-panel">
            <h2>Project Overview</h2>
            <p>
                This project simulates a Single Page Application (SPA).
                It uses JavaScript to change the main content without
                reloading the complete HTML document.
            </p>

            <h3>Technologies Used</h3>
            <ul class="feature-list">
                <li>HTML5 for semantic structure</li>
                <li>CSS3 for responsive styling</li>
                <li>JavaScript for dynamic content and routing</li>
                <li>URL hashes for navigation state</li>
                <li>Browser history for Back and Forward navigation</li>
            </ul>

            <h3>Learning Objectives</h3>
            <p>
                Understand DOM manipulation, event handling,
                responsive design, routing and accessible navigation.
            </p>
        </section>
    `,

    contact: `
        <section class="hero">
            <p class="eyebrow">Get in Touch</p>
            <h1>Contact <span class="highlight">Us.</span></h1>
            <p class="lead">
                Complete the form to test client-side form validation.
                This demo does not send messages to a server.
            </p>
        </section>

        <section class="content-panel">
            <h2>Send a Message</h2>

            <form id="contact-form" class="contact-form">
                <div class="form-group">
                    <label for="name">Your name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        autocomplete="name"
                        required
                        minlength="2"
                        placeholder="Enter your name"
                    >
                </div>

                <div class="form-group">
                    <label for="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autocomplete="email"
                        required
                        placeholder="you@example.com"
                    >
                </div>

                <div class="form-group">
                    <label for="message">Your message</label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        minlength="10"
                        placeholder="Write at least 10 characters"
                    ></textarea>
                </div>

                <button class="button" type="submit">Validate Message</button>
                <p id="form-message" class="form-message"
                   role="status" aria-live="polite"></p>
            </form>
        </section>
    `
};

// Render the selected page
function renderPage() {
    const requestedPage = window.location.hash.slice(1) || "home";
    const pageExists = Object.prototype.hasOwnProperty.call(
        pages,
        requestedPage
    );

    const currentPage = pageExists ? requestedPage : "not-found";

    if (pageExists) {
        app.innerHTML = pages[currentPage];
    } else {
        app.innerHTML = `
            <section class="not-found">
                <p class="eyebrow">Error 404</p>
                <h1>Page not found.</h1>
                <p class="lead">The page you requested does not exist.</p>
                <a class="button" href="#home">Return Home</a>
            </section>
        `;
    }

    // Highlight the current navigation link
    navLinks.forEach((link) => {
        const linkPage = link.getAttribute("href").slice(1);

        if (linkPage === currentPage) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    // Attach form behaviour after the contact page is rendered
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", handleFormSubmit);
    }
}

// Contact form validation
function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const messageBox = document.getElementById("form-message");

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    messageBox.textContent =
        "Success! Your form passed validation. This is a demo only.";

    form.reset();
}

// Run the router whenever the URL hash changes.
// This also supports the browser Back and Forward buttons.
window.addEventListener("hashchange", renderPage);

// Render the first view when the website opens
renderPage();