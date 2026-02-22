// ============================================================
//  Semih Şeker Portfolio – Chatbot (Statik Cevaplar)
// ============================================================

// Her soruya karşılık gelen statik cevaplar
const ANSWERS = {
  "Semih kimdir?": `Merhaba! 👋 Ben <strong>Semih Şeker</strong>.<br><br>
Bilgisayar teknikeriyim ve Karabük Üniversitesi Bilgisayar Teknolojisi bölümünde öğrenim görüyorum.<br><br>
Web geliştirme, robotik kodlama ve siber güvenlik alanlarında kendimi sürekli geliştiren, teknolojiye tutkuyla bağlı bir yazılım meraklısıyım! 🚀`,

  "Eğitim bilgileri nelerdir?": `<strong>Eğitim Bilgileri</strong><br><br>
<strong>Lise:</strong> Aydınlık Evler Meslek Lisesi<br>
<strong>Bölüm:</strong> Bilişim Teknolojileri – Yazılım Geliştirme Dalı<br><br>
<strong>Üniversite:</strong> Karabük Üniversitesi<br>
<strong>Bölüm:</strong> Bilgisayar Teknolojisi<br>
<strong>Derece:</strong> Ön Lisans (devam ediyor)`,

  "İletişim bilgileri nelerdir?": `📬 <strong>İletişim Bilgileri</strong><br><br>
📧 <strong>E-posta:</strong> semihskr42@gmail.com<br>
💼 <strong>LinkedIn:</strong> linkedin.com/in/semih-şeker<br>
🐙 <strong>GitHub:</strong> github.com/sem1hX1<br>
📸 <strong>Instagram:</strong> @semih_seker13<br><br>
Her kanaldan ulaşabilirsiniz! 😊`,

  "Projeleri nelerdir?": `<strong>Projelerim</strong><br><br>
<strong>Magical Exile</strong> – 48 saatte geliştirilen 2D platform oyunu (Game Jam)<br>
<strong>2.4 GHz Jammer</strong> – ESP32 tabanlı pentest aracı<br>
<strong>Akıllı Metre</strong> – Lazer mesafe, su terazisi ve sıcaklık ölçümü<br>
<strong>Araç Kiralama Sistemi</strong> – C# Windows Forms rezervasyon uygulaması<br><br>
Daha fazlası için: <a href="https://github.com/sem1hX1" target="_blank" style="color:#00ff00;">github.com/sem1hX1</a>`,

  "Hangi teknolojileri kullanıyor?": `💻 <strong>Kullandığım Teknolojiler</strong><br><br>
🌐 <strong>Web:</strong> HTML, CSS, JavaScript<br>
⚙️ <strong>Yazılım:</strong> C#, Python (temel)<br>
🔩 <strong>Donanım:</strong> Arduino C, ESP32<br>
🔐 <strong>Diğer:</strong> Siber güvenlik & pentesting araçları<br><br>
Her geçen gün yeni teknolojiler öğrenmeye devam ediyorum! 💪`
};

// ============================================================
//  UI Elementleri
// ============================================================
let chatWidget, chatWindow, chatMessages, chatToggleBtn, typingIndicator;

function initChatbot() {
  chatWidget = document.getElementById("chatWidget");
  chatWindow = document.getElementById("chatWindow");
  chatMessages = document.getElementById("chatMessages");
  chatToggleBtn = document.getElementById("chatToggleBtn");
  typingIndicator = document.getElementById("typingIndicator");

  // Aç/kapat butonu
  chatToggleBtn.addEventListener("click", toggleChat);

  // Hazır soru butonlarına tıklama
  document.querySelectorAll(".quick-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      handleQuickQuestion(btn.dataset.question);
    });
  });

  // Hoşgeldin mesajı
  setTimeout(() => {
    addBotMessage("Merhaba! 👋 Ben Semih'in asistanıyım. Aşağıdaki sorulardan birini seçerek bilgi alabilirsiniz!");
  }, 800);
}

// ============================================================
//  Chat aç / kapat
// ============================================================
function toggleChat() {
  const isOpen = chatWindow.classList.toggle("open");
  chatToggleBtn.classList.toggle("open", isOpen);
  chatToggleBtn.querySelector("i").className = isOpen
    ? "fa-solid fa-arrow-down-long"
    : "fa-solid fa-comment-dots";

  const badge = document.querySelector(".chat-badge");
  if (badge) {
    badge.classList.toggle("hidden", isOpen);
  }
}

// ============================================================
//  Soru seçilince
// ============================================================
let hasMessages = false;

function handleQuickQuestion(question) {
  const answer = ANSWERS[question];
  if (!answer) return;

  // İlk soruda soru panelini daralt
  if (!hasMessages) {
    hasMessages = true;
    quickQuestions.classList.add("compact");
  }

  addUserMessage(question);
  setButtonsDisabled(true);
  showTyping();

  // Kısa gecikmeyle cevap ver (doğal his)
  setTimeout(() => {
    hideTyping();
    addBotMessage(answer);
    setButtonsDisabled(false);
  }, 700);
}

function setButtonsDisabled(disabled) {
  document.querySelectorAll(".quick-btn").forEach(btn => {
    btn.disabled = disabled;
    btn.style.opacity = disabled ? "0.5" : "1";
  });
}

// ============================================================
//  UI Yardımcı Fonksiyonlar
// ============================================================
function addUserMessage(text) {
  const div = document.createElement("div");
  div.className = "chat-message user-message";
  div.innerHTML = `<div class="message-bubble">${escapeHtml(text)}</div>`;
  chatMessages.insertBefore(div, typingIndicator);
  scrollToBottom();
}

function addBotMessage(html) {
  const div = document.createElement("div");
  div.className = "chat-message bot-message";
  div.innerHTML = `
    <div class="bot-avatar"><i class="fa-solid fa-robot"></i></div>
    <div class="message-bubble">${html}</div>
  `;
  chatMessages.insertBefore(div, typingIndicator);
  scrollToBottom();

  if (!chatWindow.classList.contains("open")) {
    const badge = chatToggleBtn.querySelector(".chat-badge");
    if (badge) badge.style.display = "flex";
  }
}

function showTyping() {
  typingIndicator.style.display = "flex";
  scrollToBottom();
}

function hideTyping() {
  typingIndicator.style.display = "none";
}

function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ============================================================
//  Başlat
// ============================================================
document.addEventListener("DOMContentLoaded", initChatbot);
