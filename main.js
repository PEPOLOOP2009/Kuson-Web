/* Shared behavior across all pages: mobile menu, fade-up reveal, modal escape, EN/TH language toggle */

const I18N_COMMON = {
    en: {
        "nav.home": "Home",
        "nav.awards": "Awards & Activities",
        "nav.intern": "Intern",
        "nav.projects": "Projects",
        "nav.contact": "Contact",
        "footer.tagline": "Turn Vision into Reality",
        "common.available": "Available for Work",
        "common.unavailable": "Offline",
        "common.repliesWithin": "Replies within 24h"
    },
    th: {
        "nav.home": "หน้าแรก",
        "nav.awards": "รางวัลและกิจกรรม",
        "nav.intern": "ฝึกงาน",
        "nav.projects": "ผลงาน",
        "nav.contact": "ติดต่อ",
        "footer.tagline": "เปลี่ยนวิสัยทัศน์ให้เป็นจริง",
        "common.available": "พร้อมรับงาน",
        "common.unavailable": "ออฟไลน์",
        "common.repliesWithin": "ตอบกลับภายใน 24 ชม."
    }
};

function getLang() {
    return sessionStorage.getItem("lang") === "th" ? "th" : "en";
}

function setLang(lang) {
    sessionStorage.setItem("lang", lang);
    applyLanguage();
    document.dispatchEvent(new CustomEvent("language:changed", { detail: { lang } }));
}

function applyLanguage() {
    const lang = getLang();
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        const pageDict = window.I18N_PAGE && window.I18N_PAGE[lang];
        const value = (pageDict && pageDict[key] !== undefined) ? pageDict[key] : I18N_COMMON[lang][key];
        if (value !== undefined) el.innerHTML = value;
    });

    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.lang === lang);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.addEventListener("click", () => setLang(btn.dataset.lang));
    });
    applyLanguage();

    const cursorEl = document.getElementById("cursor");
    document.addEventListener("mousemove", (e) => {
        if (cursorEl) {
            cursorEl.style.left = e.clientX + "px";
            cursorEl.style.top = e.clientY + "px";
        }
        document.body.style.setProperty("--x", e.clientX + "px");
        document.body.style.setProperty("--y", e.clientY + "px");
    });

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            const isOpen = mobileMenu.classList.toggle("open");
            menuBtn.setAttribute("aria-expanded", isOpen.toString());
        });

        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("open");
                menuBtn.setAttribute("aria-expanded", "false");
            });
        });
    }

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                entry.target.dispatchEvent(new CustomEvent("fadeup:shown"));
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll(".fade-up").forEach(el => fadeObserver.observe(el));

    const siteNav = document.querySelector("nav");
    if (siteNav) {
        const updateNavShrink = () => siteNav.classList.toggle("shrink", window.scrollY > 40);
        updateNavShrink();
        window.addEventListener("scroll", updateNavShrink, { passive: true });
    }

    const clockEls = document.querySelectorAll(".clock-time");
    const statusDots = document.querySelectorAll(".nav-status-dot");
    const availabilityEls = document.querySelectorAll(".availability-text");
    if (clockEls.length || statusDots.length || availabilityEls.length) {
        const clockFormatter = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Bangkok" });
        const hourFormatter = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", hourCycle: "h23", timeZone: "Asia/Bangkok" });
        const updateClocks = () => {
            const now = new Date();
            const time = clockFormatter.format(now);
            clockEls.forEach(el => el.textContent = time);

            const hour = parseInt(hourFormatter.format(now), 10);
            const isOnline = hour >= 8 && hour < 20;
            statusDots.forEach(dot => {
                dot.classList.toggle("online", isOnline);
                dot.classList.toggle("offline", !isOnline);
            });

            if (availabilityEls.length) {
                const lang = getLang();
                const key = isOnline ? "common.available" : "common.unavailable";
                availabilityEls.forEach(el => el.textContent = I18N_COMMON[lang][key]);
            }
        };
        updateClocks();
        setInterval(updateClocks, 30000);
        document.addEventListener("language:changed", updateClocks);
    }

    const scrollProgressEl = document.getElementById("scrollProgress");
    if (scrollProgressEl) {
        const updateScrollProgress = () => {
            const scrollTop = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            scrollProgressEl.style.width = (height > 0 ? (scrollTop / height) * 100 : 0) + "%";
        };
        updateScrollProgress();
        window.addEventListener("scroll", updateScrollProgress, { passive: true });
    }

    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (!href || href.startsWith("#") || href.includes("mailto") || href.includes("tel") || this.target === "_blank") return;
            e.preventDefault();
            document.body.style.opacity = 0;
            setTimeout(() => { window.location.href = href; }, 300);
        });
    });
});

document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    document.querySelectorAll(".modal.show").forEach(modal => modal.classList.remove("show"));
    document.body.style.overflow = "auto";
});
