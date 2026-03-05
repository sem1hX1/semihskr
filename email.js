// EmailJS Yapılandırması
(function () {
    const SERVICE_ID = 'service_x6fr84g';
    const TEMPLATE_ID = 'template_fyg726e';
    const PUBLIC_KEY = 'jalEra6OAriI8xlIe';

    // EmailJS'i doğru public key ile yeniden başlat
    if (typeof emailjs !== 'undefined') {
        emailjs.init(PUBLIC_KEY);
    }

    document.addEventListener('DOMContentLoaded', function () {
        const form = document.getElementById('contact-form');
        if (!form) return;

        // Obfuscated index.js'deki eski listener'ı temizlemek için
        // formu klonlayıp yerine koyuyoruz
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);

        newForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // reCAPTCHA kontrolü
            const recaptchaResponse = grecaptcha.getResponse();
            if (recaptchaResponse.length === 0) {
                alert('Lütfen robot olmadığınızı doğrulayın.');
                return;
            }

            const templateParams = {
                from_name: document.getElementById('from_name').value,
                email_id: document.getElementById('email_id').value,
                message: document.getElementById('message').value,
                'g-recaptcha-response': recaptchaResponse
            };

            const submitBtn = document.getElementById('submit-btn');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Gönderiliyor...';
            submitBtn.disabled = true;

            emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
                .then(function () {
                    alert('Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağım.');
                    newForm.reset();
                    grecaptcha.reset();
                })
                .catch(function (error) {
                    alert('Hata oluştu: ' + JSON.stringify(error));
                })
                .finally(function () {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                });
        });
    });
})();
