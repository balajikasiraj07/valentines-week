// ============================================================
//  CORE: DATE DETECTION & DAY ROUTING
// ============================================================
// ---- CHANGE THIS LINE TO TEST DIFFERENT DAYS ----
// Examples:
//   new Date(2026, 1, 5, 12, 0, 0)  → Countdown
//   new Date(2026, 1, 8, 12, 0, 0)  → Rose Day
//   new Date(2026, 1, 10, 12, 0, 0) → Chocolate Day
//   new Date(2026, 1, 14, 12, 0, 0) → Valentine's Day
// Set back to  new Date()  when done testing.
let NOW = new Date();
// ---- END ----

(function init() {
    const feb7     = new Date(NOW.getFullYear(), 1, 7, 0, 0, 0);
    const feb14end = new Date(NOW.getFullYear(), 1, 14, 23, 59, 59);

    if (NOW < feb7) {
        document.getElementById('screenCountdown').style.display = 'flex';
        startCountdown(feb7);
    } else if (NOW > feb14end) {
        document.getElementById('screenEnded').style.display = 'flex';
        spawnParticles(['💝','💖','💗']);
    } else {
        const dayIndex = NOW.getDate() - 6; // 8→1, 9→2 … 14→7
        showDay(dayIndex);
    }
})();

function showDay(n) {
    // Hide everything
    ['screenCountdown','screenEnded','day1','day2','day3','day4','day5','day6','day7','day8'].forEach(id => {
        document.getElementById(id).style.display = 'none';
    });

    const el = document.getElementById('day' + n);
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.alignItems = 'center';
    
    // Ensure celebration cards are hidden initially
    if (n === 1) {
        document.getElementById('d1Celeb').style.display = 'none';
    } else if (n === 2) {
        document.getElementById('d2Celeb').style.display = 'none';
    }

    // Set particles & bg per day
    const configs = {
    1: { particles:['🌹','🌸','💐'], bg:'linear-gradient(160deg,#fff5f7 0%,#fce4ec 100%)' },
    2: { particles:['💍','✨','💫'], bg:'linear-gradient(160deg,#fff0f3 0%,#fce4ec 100%)' },
    3: { particles:['🍫','🍬','✨'], bg:'linear-gradient(160deg,#2a1508 0%,#3e1f0e 100%)' },
    4: { particles:['🐻','💛','🌻'], bg:'linear-gradient(160deg,#fff8ee 0%,#fff3e0 100%)' },
    5: { particles:['📜','✨','🕊️'], bg:'linear-gradient(160deg,#fdf5e6 0%,#f5e6c8 100%)' },
    6: { particles:['🤗','💕','💖'], bg:'linear-gradient(160deg,#fff0f3 0%,#ffecf0 100%)' },
    7: { particles:['💋','✨','💫'], bg:'linear-gradient(160deg,#ffebf0 0%,#ffe0e6 100%)' },
    8: { particles:['💝','😘','✨','💫'], bg:'linear-gradient(160deg,#fff5f7 0%,#ffe8ec 100%)' }
    };
    const cfg = configs[n];
    document.body.style.background = cfg.bg;
    spawnParticles(cfg.particles);

    // Auto-trigger day 7 confetti
    if (n === 8) { setTimeout(launchConfetti, 800); }
}

// ============================================================
//  COUNTDOWN TIMER (before Feb 8)
// ============================================================
function startCountdown(target) {
    document.body.style.background = 'linear-gradient(160deg,#fff5f7 0%,#fce4ec 100%)';
    spawnParticles(['💝','🌹','💐']);
    let current = NOW.getTime(); // starts from your test date, ticks +1s each call
    function tick() {
        const diff = target.getTime() - current;
        current += 1000; // tick forward 1 second
        if (diff <= 0) {
            document.getElementById('cdDays').textContent  = '00';
            document.getElementById('cdHours').textContent = '00';
            document.getElementById('cdMins').textContent  = '00';
            document.getElementById('cdSecs').textContent  = '00';
            return; // stop ticking, don't reload
        }
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        document.getElementById('cdDays').textContent  = pad(d);
        document.getElementById('cdHours').textContent = pad(h);
        document.getElementById('cdMins').textContent  = pad(m);
        document.getElementById('cdSecs').textContent  = pad(s);
    }
    tick();
    setInterval(tick, 1000);
}
function pad(n) { return n < 10 ? '0'+n : ''+n; }

// ============================================================
//  FLOATING PARTICLES
// ============================================================
function spawnParticles(emojis) {
    const container = document.getElementById('particleLayer');
    container.innerHTML = '';
    for (let i = 0; i < 24; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        p.style.left = Math.random()*100 + '%';
        p.style.animationDuration = (Math.random()*9+7) + 's';
        p.style.animationDelay = (Math.random()*12) + 's';
        p.style.fontSize = (Math.random()*0.7+0.9) + 'rem';
        container.appendChild(p);
    }
}

// ============================================================
//  DAY 1 — ROSE DAY logic
// ============================================================
(function() {
    let escapes = 0;
    const cheekyMsgs = [
        "Are you sure? 👀","Really though? 🙄","Come on, don't be shy…",
        "You can't fool me! 😤","Last chance… 😘","Seriously? 😂",
        "I'm not giving up! 💪","Fine… but I'll ask again 😉",
        "You know you want to say Yes…","The Yes button is RIGHT there 👉"
    ];

    window.d1No = function() {
        escapes++;
        
        // Show wrong answer popup
        const popup = document.getElementById('wrongPopup');
        popup.classList.add('show');
        setTimeout(() => popup.classList.remove('show'), 1500);
        
        // Update cheeky message
        document.getElementById('d1Cheeky').textContent = cheekyMsgs[Math.min(escapes-1, cheekyMsgs.length-1)];
        
        // Show escape count
        document.getElementById('d1EscCount').textContent = `(Attempt #${escapes}… try again 😄)`;
        document.getElementById('d1EscCount').classList.add('visible');
        
        // Grow Yes button progressively
        const yesBtn = document.getElementById('d1Yes');
        yesBtn.style.transform = `scale(${Math.min(1 + escapes*0.06, 1.6)})`;
    };

    window.d1Yes = function() {
        // Hide the entire day1 container's card
        const card = document.querySelector('#day1 .day-card');
        card.style.display = 'none';
        
        // Show celebration
        document.getElementById('d1Celeb').style.display = 'block';
        document.body.style.background = 'linear-gradient(135deg,#fff0f3 0%,#ffe0e6 100%)';
        launchConfetti();
    };
})();

// ============================================================
//  DAY 2 — PROPOSE DAY logic
// ============================================================
(function() {
    let escapes = 0;
    const msgs = [
        "Are you sure? 🥺","Come on… 😤","Really? 😏",
        "I'll wait all day… 😘","Please? 🙏","Last chance! 😂",
        "You know you want to… 😉","I'm not giving up! 💪"
    ];
    const noTexts = ["Maybe…","Hmm…","Perhaps…","Nah","No way","Definitely not","…","Run!"];

    window.d2No = function() {
        escapes++;
        document.getElementById('d2EscCount').textContent = `(Escape #${escapes}… keep trying 😄)`;
        document.getElementById('d2Sub').textContent = msgs[Math.min(escapes-1, msgs.length-1)];

        const noBtn = document.getElementById('d2No');
        noBtn.textContent = noTexts[Math.min(escapes, noTexts.length-1)];

        const yesBtn = document.getElementById('d2Yes');
        yesBtn.style.transform = `scale(${Math.min(1 + escapes*0.07, 1.55)})`;

        const s = Math.max(1 - escapes*0.09, 0.5);
        noBtn.style.fontSize = (1.15*s)+'rem';
        noBtn.style.padding = (0.75*s)+'rem '+(2*s)+'rem';

        const randX = (Math.random()-0.5)*240;
        const randY = (Math.random()-0.5)*60;
        noBtn.style.position = 'relative';
        noBtn.style.transform = `translate(${randX}px,${randY}px)`;
        noBtn.style.transition = 'transform 0.25s cubic-bezier(0.175,0.885,0.32,1.275)';
        setTimeout(() => { noBtn.style.position = 'absolute'; }, 260);
    };

    window.d2Yes = function() {
        const card = document.querySelector('#day2 .day-card');
        card.style.display = 'none';
        document.getElementById('d2Celeb').style.display = 'block';
        document.body.style.background = 'linear-gradient(135deg,#fff0f3 0%,#ffe0e6 100%)';
        launchConfetti();
    };
})();

// ============================================================
//  DAY 3 — CHOCOLATE DAY logic
// ============================================================
(function() {
    const chocolates = [
        { type:'dark',  emoji:'🍫', msg:'You are the sweetest girl I know.' },
        { type:'milk',  emoji:'🍬', msg:'Every moment with you melts my heart.' },
        { type:'white', emoji:'💛', msg:'You light up my entire world, Kiki.' },
        { type:'dark',  emoji:'🌙', msg:'I would want to talk to you forever and never get bored.' },
        { type:'milk',  emoji:'🌸', msg:'Your smile is contagious.' },
        { type:'white', emoji:'☀️', msg:'Being yours is the best thing that ever happened to me.' },
        { type:'dark',  emoji:'🎵', msg:'You make every ordinary day feel extraordinary.' },
        { type:'milk',  emoji:'💫', msg:'I\'d pick you all over again. Every single time.' },
        { type:'white', emoji:'🌷', msg:'You\'re not just my Valentine… you\'re my everything.' }
    ];

    const box = document.getElementById('chocBox');
    chocolates.forEach((c, i) => {
        const piece = document.createElement('div');
        piece.className = `choc-piece ${c.type}`;
        piece.innerHTML = `<span>${c.emoji}</span><div class="choc-msg"><span class="choc-icon"></span>${c.msg}</div>`;
        piece.onclick = function() {
            if (!this.classList.contains('opened')) {
                this.classList.add('opened');
            }
        };
        box.appendChild(piece);
    });
})();

// ============================================================
//  DAY 4 — TEDDY DAY logic
// ============================================================
(function() {
    let hugs = 0;
    const msgs = [
        "Ooh! That tickles! 🥰",
        "Again! Again! 😄",
        "Hehe… you're so warm!",
        "I love hugs from you! 💛",
        "Keep going… I'll never get enough!",
        "You're the best hugger ever! 🐻",
        "I think I'm falling asleep… 😴",
        "One more hug won't hurt… right?",
        "Okay okay… I'm super happy now! ✨"
    ];

    window.teddyHug = function() {
        hugs++;
        document.getElementById('teddyMsg').textContent = msgs[Math.min(hugs-1, msgs.length-1)];
        document.getElementById('teddyCount').textContent = `Hugs: ${hugs}`;

        // Spawn a heart near teddy
        const wrap = document.getElementById('teddyWrap');
        const heart = document.createElement('div');
        heart.className = 'teddy-heart-burst';
        heart.textContent = ['💕','💖','💗','💝'][Math.floor(Math.random()*4)];
        heart.style.left = (Math.random()*60+20)+'%';
        heart.style.top = '10px';
        wrap.appendChild(heart);
        setTimeout(() => heart.remove(), 1200);
    };
})();

// ============================================================
//  DAY 5 — PROMISE DAY logic
// ============================================================
(function() {
    const promises = [
        "I promise to always make you laugh, even on the hardest days.",
        "I promise to hold your hand and never let go.",
        "I promise to be your biggest cheerleader, no matter what.",
        "I promise to make you feel loved every single day.",
        "I promise to keep surprising you, till eternity.",
        "I promise to listen, really listen, whenever you need me.",
        "I promise to be the person you can always come home to."
    ];
    let revealed = 0;

    const scroll = document.getElementById('promiseScroll');
    promises.forEach((p, i) => {
        const item = document.createElement('div');
        item.className = 'promise-item';
        item.id = 'promise-' + i;
        item.innerHTML = `<div class="promise-num">${i+1}</div><div class="promise-text">${p}</div>`;
        scroll.appendChild(item);
    });

    window.revealNext = function() {
        if (revealed >= promises.length) return;
        document.getElementById('promise-' + revealed).classList.add('revealed');
        revealed++;
        if (revealed >= promises.length) {
            document.getElementById('promiseTap').classList.add('hidden');
        }
    };
})();

// ============================================================
//  DAY 6 — HUG DAY logic
// ============================================================
(function() {
    let strength = 0;
    let tapCount = 0;
    let maxStrength = 100;
    let decayInterval;
    
    const strengthLevels = [
        { threshold: 0, message: "Tap to start! 😊", class: "" },
        { threshold: 20, message: "Warm-up Hug 🤗", class: "squeeze-1" },
        { threshold: 40, message: "Cardio Hug 💪", class: "squeeze-2" },
        { threshold: 60, message: "Leg Day Hug 🦵", class: "squeeze-3" },
        { threshold: 80, message: "Deadlift Hug 🏋️", class: "squeeze-4" },
        { threshold: 95, message: "KIKI STRENGTH! 💥", class: "squeeze-5" }
    ];
    
    const messages = [
        "Let's see that gym strength, Kiki! 💪",
        "Easy there, gym queen! 😅",
        "That's my strong girl! 💕",
        "Okay okay, you're crushing me! 😂",
        "Who needs the gym when you hug like this? 🤗",
        "I can't breathe... but I love it! 😍",
        "You win! I surrender! 💝",
        "Remind me never to arm wrestle you! 😄",
        "That's the strongest hug I've ever felt! 💪",
        "My superhero! 🦸‍♀️"
    ];

    window.squeezeHug = function() {
        tapCount++;
        strength = Math.min(strength + 8, maxStrength);
        
        // Update strength bar
        document.getElementById('strengthBar').style.width = strength + '%';
        
        // Update level and animation
        let currentLevel = strengthLevels[0];
        for (let level of strengthLevels) {
            if (strength >= level.threshold) {
                currentLevel = level;
            }
        }
        
        document.getElementById('strengthLevel').textContent = currentLevel.message;
        
        // Update hug scene class
        const hugScene = document.getElementById('hugScene');
        hugScene.className = 'hug-scene hugging ' + currentLevel.class;
        
        // Update message
        const msgIndex = Math.min(Math.floor(strength / 10), messages.length - 1);
        document.getElementById('hugStrengthMsg').textContent = messages[msgIndex];
        
        // Start decay if not already running
        if (decayInterval) clearInterval(decayInterval);
        decayInterval = setInterval(() => {
            if (strength > 0) {
                strength = Math.max(strength - 2, 0);
                document.getElementById('strengthBar').style.width = strength + '%';
                
                // Update level during decay
                let decayLevel = strengthLevels[0];
                for (let level of strengthLevels) {
                    if (strength >= level.threshold) {
                        decayLevel = level;
                    }
                }
                document.getElementById('strengthLevel').textContent = decayLevel.message;
                
                const hugScene = document.getElementById('hugScene');
                if (strength === 0) {
                    hugScene.className = 'hug-scene';
                } else {
                    hugScene.className = 'hug-scene hugging ' + decayLevel.class;
                }
            } else {
                clearInterval(decayInterval);
            }
        }, 200);
    };
})();

// ============================================================
//  DAY 7 — KISS DAY logic
// ============================================================
(function() {
    let kissCount = 0;
    const messages = [
        "Aww! That's sweet! 😊",
        "Another one! I love it! 💕",
        "You're making me blush… 😳",
        "Keep them coming! 😘",
        "I can feel your love from here! 💖",
        "You're the best! 🥰",
        "This is getting addictive… 😄",
        "My heart is so full right now! 💗",
        "Okay okay… I'm melting! 😍",
        "You really love me, don't you? 💝"
    ];

    window.sendKiss = function() {
        kissCount++;
        
        // Update counter
        document.getElementById('kissCount').textContent = `Kisses sent: ${kissCount}`;
        
        // Update message
        const msg = messages[Math.min(kissCount - 1, messages.length - 1)];
        document.getElementById('kissMsg').textContent = msg;
        
        // Create flying kiss
        const container = document.getElementById('kissContainer');
        const kiss = document.createElement('div');
        kiss.className = 'flying-kiss';
        kiss.textContent = '💋';
        
        // Random vertical position
        kiss.style.bottom = (Math.random() * 40 + 20) + '%';
        
        container.appendChild(kiss);
        
        // Remove after animation
        setTimeout(() => kiss.remove(), 2000);
    };
})();

// ============================================================
//  CONFETTI ENGINE
// ============================================================
(function() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    let pieces = [], animating = false;

    function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
    addEventListener('resize', resize);
    resize();

    const colors = ['#e91e63','#f06292','#ad1457','#d4af37','#fff176','#ffb74d','#fff','#f8bbd0','#ce93d8'];

    function Piece() {
        this.x = Math.random()*canvas.width;
        this.y = -Math.random()*canvas.height*0.3;
        this.vx = (Math.random()-0.5)*4;
        this.vy = Math.random()*3+2;
        this.rot = Math.random()*360;
        this.rotV = (Math.random()-0.5)*12;
        this.w = Math.random()*8+5;
        this.h = Math.random()*5+3;
        this.color = colors[Math.floor(Math.random()*colors.length)];
        this.life = 1;
    }

    function update() {
        pieces.forEach(p => { p.x+=p.vx; p.y+=p.vy; p.rot+=p.rotV; p.vy*=1.02; if(p.y>canvas.height) p.life-=0.03; });
        pieces = pieces.filter(p => p.life>0);
    }

    function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        pieces.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.translate(p.x,p.y);
            ctx.rotate(p.rot*Math.PI/180);
            ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);
            ctx.restore();
        });
    }

    function loop() {
        if(!animating) return;
        update(); draw();
        if(pieces.length>0) requestAnimationFrame(loop);
        else animating=false;
    }

    window.launchConfetti = function() {
        for(let i=0;i<220;i++) pieces.push(new Piece());
        animating=true; loop();
    };
})();
