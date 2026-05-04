// Hujjat to'liq yuklangandan keyin ishga tushadi
document.addEventListener('DOMContentLoaded', () => {

    // 1. SIDEBAR NAVIGATSIYASI (Aktivlikni boshqarish)
    const sidebarLinks = document.querySelectorAll('aside nav a');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Hozirgi barcha aktiv klasslarni olib tashlash
            sidebarLinks.forEach(item => {
                item.classList.remove('sidebar-active1', 'bg-blue-600', 'text-white');
                item.classList.add('text-gray-600'); // Noaktiv holat
            });

            // Bosilgan elementga aktiv klass berish
            this.classList.add('sidebar-active1', 'bg-blue-600', 'text-white');
            this.classList.remove('text-gray-600');
            
            // Bu yerda sahifa almashinuvi sodir bo'ladi (href orqali)
        });
    });

    // 2. BILDIRISHNOMALAR TIZIMI
    const notificationBtn = document.querySelector('.fa-bell').parentElement.parentElement;
    notificationBtn.addEventListener('click', () => {
        const count = document.querySelector('.bg-red-500').innerText;
        alert(`Sizda ${count} ta yangi bildirishnoma bor!`);
    });

    // 3. TESTLARNI BOSHLASH TUGMASI
    const startButtons = document.querySelectorAll('.btn-start');
    startButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const testName = e.target.closest('.list-item').querySelector('strong').innerText;
            
            // Foydalanuvchidan tasdiqlash so'rash
            const confirmStart = confirm(`${testName} testini boshlashni xohlaysizmi?`);
            if (confirmStart) {
                console.log(`${testName} boshlandi...`);
                // Bu yerda test ishlash sahifasiga o'tish kodini yozishingiz mumkin
                // window.location.href = 'start-test.html';
            }
        });
    });

    // 4. DINAMIK PROGRESS BAR EFFEKTI
    // Sayt ochilganda barlar sekinlik bilan to'lishi uchun
    const progressBars = document.querySelectorAll('.progress, .bar-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-in-out';
            bar.style.width = width;
        }, 200);
    });

    // 5. VIDEO DARSLARGA CLICK
    const videos = document.querySelectorAll('.video-item');
    videos.forEach(video => {
        video.addEventListener('click', () => {
            const title = video.querySelector('strong').innerText;
            alert(`${title} darsi yuklanmoqda...`);
        });
    });

});

// Sahifa yuklanganda ma'lumotlarni tekshirish
window.onload = function() {
    loadUserData();
    setRegistrationDate();
};

// Ismni o'zgartirish
function editName() {
    let newName = prompt("Ismingizni kiriting:", document.getElementById('userName').innerText);
    if (newName) {
        document.getElementById('userName').innerText = newName;
        document.getElementById('avatarText').innerText = newName.charAt(0).toUpperCase();
        localStorage.setItem('savedName', newName);
    }
}

// Rasmni yuklash
function uploadImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const imgElement = document.getElementById('avatarImg');
        const textElement = document.getElementById('avatarText');
        imgElement.src = reader.result;
        imgElement.classList.remove('hidden');
        textElement.classList.add('hidden');
        
        // Rasmni xotiraga saqlash
        localStorage.setItem('savedAvatar', reader.result);
    }
    reader.readAsDataURL(event.target.files[0]);
}

// Ma'lumotlarni yuklash
function loadUserData() {
    const savedName = localStorage.getItem('savedName');
    const savedAvatar = localStorage.getItem('savedAvatar');

    if (savedName) {
        document.getElementById('userName').innerText = savedName;
        document.getElementById('avatarText').innerText = savedName.charAt(0).toUpperCase();
    }
    if (savedAvatar) {
        const imgElement = document.getElementById('avatarImg');
        imgElement.src = savedAvatar;
        imgElement.classList.remove('hidden');
        document.getElementById('avatarText').classList.add('hidden');
    }
}

// Ro'yxatdan o'tgan sanani bugunga sozlash
function setRegistrationDate() {
    let date = new Date().toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' });
    document.getElementById('regDate').innerText = date;
}

function updatePremiumStatus() {
    // Masalan, bugundan 30 kun keyingi sanani ko'rsatish
    let today = new Date();
    today.setDate(today.getDate() + 30); 
    
    let options = { day: 'numeric', month: 'long', year: 'numeric' };
    let expiryDate = today.toLocaleDateString('uz-UZ', options);
    
    document.getElementById('premiumExpiry').innerText = expiryDate;
}

// script.js fayli ichi
window.onload = function() {
    // Premium bo'limini boshqarish
    checkPremiumStatus();
};

function checkPremiumStatus() {
    // Bu yerda mantiq: foydalanuvchi to'lov qilganmi?
    // Masalan, localStorage'dan tekshiramiz
    const userIsPremium = localStorage.getItem("premium_active") === "true";
    
    // HTML'dagi premium blokini ID orqali topish (ID qo'shishni unutmang)
    const block = document.getElementById("premiumBlock");
    
    if (block) {
        if (userIsPremium) {
            block.classList.remove("hidden");
        } else {
            block.classList.add("hidden");
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Premium holatini tekshirish (masalan, localStorage orqali)
    const isPremium = localStorage.getItem("isPremiumUser") === "true";
    const premiumBlock = document.getElementById("premiumBlock");
    const expiryDateElement = document.getElementById("premiumExpiry");

    if (isPremium) {
        // Agar premium bo'lsa, blokni ko'rsatish
        premiumBlock.classList.remove("hidden");
        
        // Amal qilish muddatini chiqarish (agar saqlangan bo'lsa)
        const expiryDate = localStorage.getItem("premiumExpiryDate") || "31.12.2024";
        expiryDateElement.innerText = expiryDate;
    } else {
        // Agar sotib olinmagan bo'lsa, blok yashirin qoladi yoki 
        // "Sotib olish" tugmasini ko'rsatishingiz mumkin
        premiumBlock.classList.add("hidden");
    }
});