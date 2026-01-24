document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       AOS (Animate On Scroll)
    ========================= */
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 120
        });
    }

    /* =========================
       TYPED.JS (Başlık Animasyonu)
    ========================= */
    if (typeof Typed !== "undefined") {
        new Typed("#typed-text", {
            strings: [
                "Bilgisayar Teknikeri", 
                "Web Geliştirici", 
                "Robotik Meraklısı", 
                "Siber Güvenlik Öğrencisi"
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1800,
            loop: true,
            smartBackspace: true,
            cursorChar: "_"
        });
    }

    /* =========================
       HAMBURGER MENU & NAV LOGIC
    ========================= */
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".navlink ul li a");

    if (hamburger && navMenu) {
        // Menü Aç/Kapat
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            
            // Menü açıkken sayfa kaymasını engelle
            document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "auto";

            // İkon Değiştirme (Bars -> X)
            const icon = hamburger.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");
            }
        });

        // Linke tıklanınca menüyü kapat
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                document.body.style.overflow = "auto";

                const icon = hamburger.querySelector("i");
                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-xmark");
                }
            });
        });
    }

    /* =========================
       SMOOTH SCROLL (Yumuşak Kaydırma)
    ========================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const target = document.querySelector(targetId);

            if (target) {
                const offset = 90; // Navbar yüksekliği kadar boşluk bırak
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /* =========================
       AKTİF NAVBAR LİNKİ TAKİBİ
    ========================= */
    const sections = document.querySelectorAll("section, footer");
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
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    /* =========================
       NAVBAR SCROLL EFFECT (Blur)
    ========================= */
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.backdropFilter = "blur(10px)";
            navbar.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
            navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.5)";
        } else {
            navbar.style.backdropFilter = "none";
            navbar.style.backgroundColor = "transparent";
            navbar.style.boxShadow = "none";
        }
    });

    /* =========================
       GÜVENLİK (Sağ Tık & F12)
    ========================= */
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.onkeydown = e => {
        if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74)) || (e.ctrlKey && e.keyCode == 85)) {
            return false;
        }
    };

});

/* =========================
   EMAILJS & İLETİŞİM FORMU
========================= */
(function() {
    // Sadece bir kez başlatılması yeterli
    if (typeof emailjs !== "undefined") {
        emailjs.init("jalEra6OAriI8xlIe"); 
    }
})();

function SendMail() {
    // 1. Kullanıcının robot olmadığını kanıtlayan cevabı al
    const recaptchaResponse = grecaptcha.getResponse();

    // 2. Eğer kutucuk işaretlenmemişse durdur ve uyar
    if (recaptchaResponse.length === 0) {
        alert("Lütfen robot olmadığınızı doğrulayın! 🤖");
        return;
    }

    const fromName = document.getElementById("from_name").value.trim();
    const emailId = document.getElementById("email_id").value.trim();
    const msg = document.getElementById("message").value.trim();

    // Form validation (daha önce yazdığımız kısımlar)
    if (!fromName || !emailId || !msg) {
        alert("Lütfen tüm alanları doldurun.");
        return;
    }

    // EmailJS'e gidecek paket
    const params = {
        name: fromName,
        message: msg,
        email_id: emailId,
        "g-recaptcha-response": recaptchaResponse // KRİTİK: EmailJS bu anahtarı bekler
    };

    const serviceID = "service_x6fr84g";
    const templateID = "template_fyg726e";

    emailjs.send(serviceID, templateID, params)
    .then(res => {
        document.getElementById("contact-form").reset(); // Formu temizle
        grecaptcha.reset(); // reCAPTCHA kutusunu temizle
        alert("Mesajınız başarıyla gönderildi! 🚀");
    })
    .catch(err => {
        console.error("Hata:", err);
        alert("Doğrulama hatası veya bağlantı sorunu oluştu.");
    });
}