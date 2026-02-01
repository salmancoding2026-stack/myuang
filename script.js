// --- 1. DATA & KONSTANTA ---
const listNasihat = [
    "KARTU SSR: Hari ini dapet diskon makanan tanpa sengaja! 🍜",
    "KARTU RARE: Saldo aman, tapi jangan cek marketplace dulu ya. ⛔",
    "KARTU ZONK: Ada pengeluaran tak terduga, sabar ya Bestie. 💸",
    "KARTU HOKI: Saatnya invest dikit-dikit di saham bluechip. 📈",
    "KARTU SAVAGE: Self-reward boleh, tapi liat saldo juga dong! 💀",
    "KARTU AMAN: Dompet tebel, hati seneng. Pertahankan! 🐱"
];

const dataKamus = [
    { term: "Pom-pom", desc: "Orang yang nge-hype saham tertentu biar harganya naik." },
    { term: "Serok Bawah", desc: "Membeli saham saat harganya sudah jatuh sangat dalam." },
    { term: "Haka (Hajar Kanan)", desc: "Beli saham langsung tanpa antre biar cepet dapet." },
    { term: "Nyangkut", desc: "Beli di harga tinggi, lalu harganya turun dan nggak naik lagi." },
    { term: "FOMO", desc: "Ikut-ikutan beli karena takut ketinggalan tren tanpa analisa." },
    { term: "Bandar", desc: "Pihak modal gede yang bisa gerakin harga saham." }
];

// --- 2. LOGIKA NAVIGASI & MODAL ---
function openTab(evt, tabName) {
    let tabcontent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabcontent.length; i++) tabcontent[i].classList.remove("active");
    
    let tablinks = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tablinks.length; i++) tablinks[i].classList.remove("active");
    
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

function openKamus() {
    document.getElementById('kamusModal').style.display = "block";
    renderKamus(dataKamus);
}

function closeKamus() { document.getElementById('kamusModal').style.display = "none"; }

function renderKamus(data) {
    const list = document.getElementById('kamusList');
    list.innerHTML = data.map(item => `
        <div class="kamus-item">
            <strong>${item.term}</strong>
            <span>${item.desc}</span>
        </div>
    `).join('');
}

function filterKamus() {
    const keyword = document.getElementById('kamusSearch').value.toLowerCase();
    const filtered = dataKamus.filter(item => 
        item.term.toLowerCase().includes(keyword) || item.desc.toLowerCase().includes(keyword)
    );
    renderKamus(filtered);
}

window.onclick = function(event) {
    if (event.target == document.getElementById('kamusModal')) closeKamus();
}

// --- 3. FITUR INTERAKTIF (HOME) ---
function spinGacha() {
    const card = document.getElementById('gachaCard');
    card.style.transform = "rotateY(360deg) scale(1.1)";
    card.innerHTML = "🤔...";

    setTimeout(() => {
        const random = listNasihat[Math.floor(Math.random() * listNasihat.length)];
        card.innerHTML = random;
        card.style.transform = "rotateY(0deg) scale(1)";
        document.getElementById('btnShareGacha').style.display = "block";
    }, 600);
}

function getMoodAdvice(mood) {
    const result = document.getElementById('moodResult');
    const advice = {
        'sedih': "Jangan lari ke checkout belanjaan, mending tidur aja dulu. 🛌",
        'senang': "Seneng boleh, tapi jangan tiba-tiba nraktir se-RT ya! 🍕",
        'marah': "Lagi emosi? Jangan bales dendam pakai kartu kredit. 💳",
        'bosan': "Bosan itu gerbang pemborosan. Mending baca kamus Myuang! 📕"
    };
    result.style.opacity = 0;
    setTimeout(() => {
        result.innerText = advice[mood];
        result.style.opacity = 1;
    }, 200);
}

// --- 4. TOOLS (KALKULATOR) ---
function calculateFund() {
    const expense = document.getElementById('expense').value;
    const multiplier = document.getElementById('status').value;
    const resultDiv = document.getElementById('result');

    if (!expense || expense <= 0) {
        resultDiv.innerHTML = "Isi dulu pengeluaranmu, Bestie! 💸";
        return;
    }

    const total = expense * multiplier;
    const formatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(total);
    resultDiv.innerHTML = `Target: <br><strong>${formatted}</strong>`;
}

function checkSeblakIndex() {
    const price = document.getElementById('itemPrice').value;
    const resultDiv = document.getElementById('seblakResult');

    if (price <= 0) { resultDiv.innerHTML = "Harganya mana?"; return; }

    const totalSeblak = Math.floor(price / 15000);
    resultDiv.innerHTML = `Setara <strong>${totalSeblak} porsi seblak</strong>. 🍜`;
}

function calculateRichTime() {
    const target = document.getElementById('targetRich').value;
    const save = document.getElementById('monthlySave').value;
    const resultDiv = document.getElementById('richResult');
    const shareBtn = document.getElementById('btnShareRich');

    if (target <= 0 || save <= 0) {
        alert("Isi angkanya dulu, Bestie!");
        return;
    }

    const totalMonths = Math.ceil(target / save);
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    let challengeTitle, challengeColor, emoji;
    if (years < 3) {
        challengeTitle = "🔥 CALON CRAZY RICH!";
        challengeColor = "linear-gradient(135deg, #f59e0b, #ef4444)";
        emoji = "👑";
    } else if (years < 10) {
        challengeTitle = "🚀 ON THE TRACK!";
        challengeColor = "linear-gradient(135deg, #10b981, #3b82f6)";
        emoji = "💰";
    } else {
        challengeTitle = "🐢 PEJUANG KERAS";
        challengeColor = "linear-gradient(135deg, #6366f1, #a855f7)";
        emoji = "🦾";
    }

    resultDiv.innerHTML = `
        <div class="rich-card-result" style="background: ${challengeColor}; padding: 15px; border-radius: 12px; color: white; margin-top: 10px;">
            <small>${challengeTitle}</small>
            <h3>${emoji} ${years} Thn ${months} Bln</h3>
        </div>
    `;
    shareBtn.style.display = "block";
}

// --- 5. NEWS ANALYZER ---
function analyzeNews() {
    const newsText = document.getElementById('newsInput').value.toLowerCase();
    const resultDiv = document.getElementById('analysisResult');
    const badge = document.getElementById('newsBadge');

    if (newsText.length < 20) { alert("Kependekan beritanya!"); return; }

    resultDiv.style.display = "block";
    const pos = ['laba naik', 'profit', 'dividen', 'ekspansi', 'meroket'];
    let score = 0;
    pos.forEach(word => { if (newsText.includes(word)) score++; });

    if (score > 0) {
        badge.innerHTML = "🚀 HYPE";
        badge.className = "badge status-hype";
    } else {
        badge.innerHTML = "🚩 HADEH";
        badge.className = "badge status-hadeh";
    }
}

// --- 6. SHARE SYSTEM ---
async function copyOrShare(text) {
    if (navigator.share) {
        try { await navigator.share({ title: 'Myuang', text: text, url: window.location.href }); } 
        catch (err) { console.log("Batal share"); }
    } else {
        navigator.clipboard.writeText(text);
        alert("Teks disalin ke clipboard!");
    }
}

function shareGacha() {
    const hasil = document.getElementById('gachaCard').innerText;
    copyOrShare(`Nasib keuangan gue hari ini di Myuang: "${hasil}" 🐱`);
}

function shareRichTime() {
    const result = document.getElementById('richResult').innerText;
    copyOrShare(`Cek deh, Myuang bilang gue butuh waktu segini buat kaya: \n${result} 💸`);
}

// Data Dividen Sederhana
const dataDividen = {
    "Januari": ["Sido Muncul (SIDO)", "BBCA (Interim)"],
    "Februari": ["Belum ada jadwal besar, yuk nabung dulu!"],
    "Maret": ["Bank Rakyat Indonesia (BBRI)", "Bank Mandiri (BMRI)"],
    "April": ["Telkom Indonesia (TLKM)", "United Tractors (UNTR)"],
    "Mei": ["Adaro Energy (ADRO)", "Indofood (ICBP)"],
    "Juni": ["Bukit Asam (PTBA)", "Pegadaian (Sesuai RUPS)"]
};

function showDividen() {
    const bulan = document.getElementById('monthSelect').value;
    const display = document.getElementById('dividenResult');
    
    if (!bulan) {
        display.innerHTML = "";
        return;
    }

    const daftar = dataDividen[bulan];
    let html = `<div style="background: #eef2ff; padding: 15px; border-radius: 12px; border-left: 5px solid #4f46e5;">
                    <p style="font-weight: bold; color: #4f46e5; margin: 0;">Potensi Dividen ${bulan}:</p>
                    <ul style="text-align: left; margin-top: 10px;">`;
    
    daftar.forEach(saham => {
        html += `<li>${saham}</li>`;
    });

    html += `</ul></div>`;
    display.innerHTML = html;
}
