/* =========================================================
   HER Universe V1
   Edit only the CONFIG section first.
   ========================================================= */

const CONFIG = {
  // IMPORTANT:
  // Set this to Shruthi's birthday at 00:00 in JAPAN time.
  // Format: YYYY-MM-DD
  // Example only: "2030-05-20"
  birthdayDateJapan: "2026-10-19",

  // The birthday entry puzzle.
  puzzleQuestion: "What is our marriage date?",
  puzzleAnswer: "20th august 2021",

  // Accepts variations such as "20 August 2021" and "20th August 2021".
  flexiblePuzzleAnswer: true
};

const intro = document.getElementById("intro");
const site = document.getElementById("site");
const puzzleQuestion = document.getElementById("puzzleQuestion");
const puzzleAnswer = document.getElementById("puzzleAnswer");
const unlockButton = document.getElementById("unlockButton");
const puzzleMessage = document.getElementById("puzzleMessage");

puzzleQuestion.textContent = CONFIG.puzzleQuestion;

function normalizeAnswer(value) {
  const cleaned = String(value).trim();
  if (!CONFIG.flexiblePuzzleAnswer) return cleaned;

  return cleaned
    .toLowerCase()
    .replace(/\b(\d{1,2})(st|nd|rd|th)\b/g, "$1")
    .replace(/[^a-z0-9]/g, "");
}

function unlock() {
  const entered = normalizeAnswer(puzzleAnswer.value);
  const expected = normalizeAnswer(CONFIG.puzzleAnswer);

  if (!expected || expected === "your-answer") {
    puzzleMessage.textContent = "The site owner still needs to configure the birthday puzzle.";
    return;
  }

  if (entered === expected) {
    puzzleMessage.textContent = "Correct! Your surprise is ready…";
    unlockButton.disabled = true;
    puzzleAnswer.disabled = true;
    intro.classList.add("leaving");
    const party = document.getElementById("partyTransition");
    party.classList.remove("hidden");
    party.classList.add("party-start");
    party.setAttribute("aria-hidden", "false");
    startBombCountdown();

    // Dance for the first 10 seconds; the explosion and full-screen sparkles land at zero.
    window.setTimeout(() => {
      party.classList.add("blast-time");
      document.getElementById("partyCountdown").classList.remove("counting");
      document.getElementById("partyCaption").textContent = "BOOM! Only confetti, love, and birthday chaos. ♡";
      playBombBoom();
      playTenSecondBirthdayFanfare();
    }, 10000);
    // Keep the HAPPY BIRTHDAY, SHRUTHI! blast on screen for a full five seconds.
    window.setTimeout(() => {
      party.classList.add("party-ending");
      site.classList.remove("hidden");
      site.classList.add("revealed", "birthday-sparkle-mode");
      site.setAttribute("aria-hidden", "false");
      window.setTimeout(() => {
        party.classList.add("hidden");
        party.setAttribute("aria-hidden", "true");
        intro.style.display = "none";
        document.getElementById("top").scrollIntoView({ behavior: "smooth" });
      }, 550);
    }, 15000);
  } else {
    puzzleMessage.textContent = "Not quite… try again, birthday girl. ♡";
    puzzleAnswer.select();
  }
}

unlockButton.addEventListener("click", unlock);
puzzleAnswer.addEventListener("keydown", (event) => {
  if (event.key === "Enter") unlock();
});

/* -------------------------
   Birthday celebration burst
   ------------------------- */

function launchCelebration() {
  const canvas = document.getElementById("celebrationCanvas");
  const rocket = document.getElementById("rocket");
  const trail = document.getElementById("rocketTrail");
  const burst = document.getElementById("hanabiBurst");
  const falling = document.getElementById("fallingSparkles");
  const message = document.getElementById("celebrationMessage");

  if (!canvas || !rocket || !trail || !burst || !falling || !message) return;

  canvas.classList.add("active");
  rocket.classList.add("visible");
  trail.classList.add("visible");

  // The rocket reaches the sky before the first shell opens.
  window.setTimeout(() => {
    createHanabiBurst(burst, 1.45);
  }, 1450);

  // Extended layered hanabi show: contrasting shells keep appearing for ~7 seconds.
  window.setTimeout(() => {
    createHanabiBurst(burst, 1.10, -245, 55);
  }, 1720);

  window.setTimeout(() => {
    createHanabiBurst(burst, 1.20, 235, -15);
  }, 2020);

  window.setTimeout(() => {
    createHanabiBurst(burst, .96, -195, -115);
  }, 2370);

  window.setTimeout(() => {
    createHanabiBurst(burst, 1.04, 195, 100);
  }, 2720);

  window.setTimeout(() => {
    createHanabiBurst(burst, .90, 15, -145);
  }, 3120);

  window.setTimeout(() => {
    createHanabiBurst(burst, 1.02, -300, -5);
  }, 3540);

  window.setTimeout(() => {
    createHanabiBurst(burst, .98, 300, 25);
  }, 3950);

  window.setTimeout(() => {
    createHanabiBurst(burst, .88, -120, 145);
  }, 4380);

  window.setTimeout(() => {
    createHanabiBurst(burst, .94, 125, -150);
  }, 4820);

  window.setTimeout(() => {
    createHanabiBurst(burst, .82, 0, 115);
  }, 5250);

  // Sparks slowly fall throughout the extended display.
  window.setTimeout(() => {
    createFallingSparkles(falling);
    falling.classList.add("active");
  }, 1900);

  // The emotional date appears while the final shells are still fading.
  window.setTimeout(() => {
    message.classList.add("show");
  }, 5600);

  // Reveal the real page after roughly 7.8 seconds of fireworks.
  window.setTimeout(() => {
    intro.classList.add("leaving");
    site.classList.remove("hidden");
    site.classList.add("revealed");
    site.setAttribute("aria-hidden", "false");

    window.setTimeout(() => {
      intro.style.display = "none";
      canvas.classList.remove("active");
      rocket.classList.remove("visible");
      trail.classList.remove("visible");
      burst.classList.remove("active");
      falling.classList.remove("active");
      message.classList.remove("show");
      burst.innerHTML = "";
      falling.innerHTML = "";
      document.getElementById("top").scrollIntoView({ behavior: "smooth" });
    }, 850);
  }, 7850);
}

function createHanabiBurst(container, scale = 1, xOffset = 0, yOffset = 0) {
  container.classList.remove("active");
  container.innerHTML = "";
  container.style.left = `calc(50% + ${xOffset}px)`;
  container.style.top = `calc(33% + ${yOffset}px)`;

  const colors = [
    "#e10600",  // racing red
    "#c2185b",  // deep pink
    "#7b1fa2",  // violet
    "#1565c0",  // deep blue
    "#f2a900",  // rich gold
    "#111111",  // near-black
    "#00a6a6"   // teal accent
  ];
  const rays = 46;

  for (let i = 0; i < rays; i++) {
    const particle = document.createElement("span");
    particle.className = "hanabi-particle";
    particle.style.color = colors[i % colors.length];

    const angle = (360 / rays) * i + (Math.random() * 4 - 2);
    const distance = (125 + Math.random() * 155) * scale;

    particle.style.setProperty("--angle", `${angle}deg`);
    particle.style.setProperty("--distance", `${distance}px`);
    particle.style.animationDelay = `${Math.random() * 120}ms`;

    container.appendChild(particle);
  }

  // A few round sparks make the shell less geometric.
  for (let i = 0; i < 10; i++) {
    const dot = document.createElement("span");
    dot.className = "hanabi-mini-burst";
    dot.style.left = `${50 + (Math.random() * 110 - 55)}%`;
    dot.style.top = `${50 + (Math.random() * 110 - 55)}%`;
    dot.style.background = colors[(i + 2) % colors.length];
    dot.style.boxShadow = `0 0 12px ${colors[(i + 2) % colors.length]}`;
    container.appendChild(dot);
  }

  void container.offsetWidth;
  container.classList.add("active");
}

function createFallingSparkles(container) {
  container.innerHTML = "";
  const colors = [
    "#e10600",
    "#c2185b",
    "#7b1fa2",
    "#1565c0",
    "#f2a900",
    "#111111",
    "#00a6a6"
  ];

  for (let i = 0; i < 95; i++) {
    const particle = document.createElement("span");
    particle.className = "falling-particle";
    particle.style.left = `${8 + Math.random() * 84}%`;
    particle.style.color = colors[i % colors.length];
    particle.style.setProperty("--fall-time", `${2.0 + Math.random() * 2.4}s`);
    particle.style.setProperty("--fall-delay", `${Math.random() * .8}s`);
    container.appendChild(particle);
  }
}


/* -------------------------
   Japan-local birthday countdown
   ------------------------- */

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const birthdayStatus = document.getElementById("birthdayStatus");

function japanBirthdayTarget(dateString) {
  // Converts YYYY-MM-DD 00:00 Japan Standard Time (UTC+09:00)
  // into a fixed UTC timestamp. Japan has no DST.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return null;
  return new Date(`${dateString}T00:00:00+09:00`);
}

function updateCountdown() {
  const target = japanBirthdayTarget(CONFIG.birthdayDateJapan);

  if (!target || Number.isNaN(target.getTime())) {
    daysEl.textContent = "--";
    hoursEl.textContent = "--";
    minutesEl.textContent = "--";
    secondsEl.textContent = "--";
    birthdayStatus.textContent = "Your birthday countdown will appear here. ♡";
    return;
  }

  const now = new Date();
  const difference = target.getTime() - now.getTime();

  if (difference <= 0 && difference > -86400000) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    birthdayStatus.textContent = "It's your birthday. ♡";
    return;
  }

  if (difference <= -86400000) {
    birthdayStatus.textContent = "This birthday chapter has begun. ♡";
  } else {
    const totalSeconds = Math.floor(difference / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");

    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Tokyo",
      dateStyle: "full",
      timeStyle: "short"
    });

    birthdayStatus.textContent = `Birthday moment: ${formatter.format(target)} Japan time`;
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* -------------------------
   Final birthday surprise
   ------------------------- */
const finalSurpriseButton = document.getElementById("finalSurpriseButton");
const finalSurprise = document.getElementById("finalSurprise");
if (finalSurpriseButton && finalSurprise) {
  finalSurpriseButton.addEventListener("click", () => {
    const isOpen = finalSurpriseButton.getAttribute("aria-expanded") === "true";
    finalSurpriseButton.setAttribute("aria-expanded", String(!isOpen));
    finalSurprise.classList.toggle("hidden", isOpen);
    finalSurprise.classList.toggle("surprise-open", !isOpen);
    finalSurpriseButton.textContent = isOpen ? "Open one last little surprise ↗" : "Keep this wish close ♡";
    if (!isOpen) {
      finalSurprise.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}


function startBombCountdown() {
  const display = document.getElementById("partyCountdown");
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  let ctx = null;
  try { if (AudioContextClass) { ctx = new AudioContextClass(); ctx.resume(); } } catch (_) {}

  // Use one normal adult masculine voice for every number. Cancel any previous
  // utterance before speaking so voices cannot overlap or switch mid-countdown.
  const synth = window.speechSynthesis || null;
  let selectedVoice = null;
  if (synth) {
    const voices = synth.getVoices();
    const maleVoicePattern = /male|david|mark|guy|daniel|alex|james|richard|george|ryan|aaron|fred|tom/i;
    selectedVoice = voices.find(v => /en/i.test(v.lang) && maleVoicePattern.test(v.name))
      || voices.find(v => /en/i.test(v.lang) && /google uk english male|microsoft david|microsoft mark/i.test(v.name))
      || voices.find(v => /en/i.test(v.lang)) || null;
    if (!selectedVoice && synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = () => {
        const loaded = synth.getVoices();
        selectedVoice = loaded.find(v => /en/i.test(v.lang) && maleVoicePattern.test(v.name))
          || loaded.find(v => /en/i.test(v.lang)) || null;
      };
    }
  }

  const say = (number) => {
    if (synth) {
      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(String(number));
      if (selectedVoice) utterance.voice = selectedVoice;
      utterance.lang = selectedVoice?.lang || "en-US";
      utterance.rate = 0.9;
      utterance.pitch = 0.82;
      utterance.volume = 1;
      synth.speak(utterance);
    }
    if (ctx) {
      const osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(number % 2 ? 740 : 580, ctx.currentTime);
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.055, ctx.currentTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.11);
      osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.12);
    }
    display.textContent = number;
    display.classList.remove("counting"); void display.offsetWidth; display.classList.add("counting");
  };
  for (let n = 10; n >= 1; n--) window.setTimeout(() => say(n), (10 - n) * 1000);
  window.setTimeout(() => { if (ctx) ctx.close().catch(() => {}); }, 10100);
}

function playBombBoom() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  try {
    const ctx = new AudioContextClass(); ctx.resume();
    const length = Math.floor(ctx.sampleRate * 0.65), buffer = ctx.createBuffer(1, length, ctx.sampleRate), data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 2;
    const noise = ctx.createBufferSource(); noise.buffer = buffer;
    const filter = ctx.createBiquadFilter(); filter.type = "lowpass"; filter.frequency.value = 500;
    const gain = ctx.createGain(); gain.gain.setValueAtTime(.0001, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(.5, ctx.currentTime + .025); gain.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + .62);
    noise.connect(filter); filter.connect(gain); gain.connect(ctx.destination); noise.start(); noise.stop(ctx.currentTime + .66);
    window.setTimeout(() => ctx.close().catch(()=>{}), 900);
  } catch (_) {}
}

/* A short, soft, flute-like birthday phrase for the 10-second cartoon reveal. */
let partyFanfarePlayed = false;
async function playTenSecondBirthdayFanfare() {
  if (partyFanfarePlayed) return;
  partyFanfarePlayed = true;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  try {
    const ctx = new AudioContextClass();
    await ctx.resume();
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.075, ctx.currentTime + 0.45);
    master.gain.setTargetAtTime(0.0001, ctx.currentTime + 9.2, 0.22);
    master.connect(ctx.destination);
    // Light, rounded sine tones with a breath overtone: deliberately no piano or percussion.
    const notes = [
      [523.25,0,.42],[523.25,.48,.42],[587.33,.96,.72],[523.25,1.72,.72],[698.46,2.48,.72],[659.25,3.24,1.05],
      [523.25,4.35,.42],[523.25,4.83,.42],[587.33,5.31,.72],[523.25,6.07,.72],[783.99,6.83,.72],[698.46,7.59,1.15],[659.25,8.78,.85]
    ];
    notes.forEach(([hz, offset, duration]) => {
      const start = ctx.currentTime + offset;
      const tone = ctx.createOscillator();
      const breath = ctx.createOscillator();
      const breathGain = ctx.createGain();
      const envelope = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      tone.type = 'sine'; breath.type = 'triangle';
      tone.frequency.value = hz; breath.frequency.value = hz * 2;
      breathGain.gain.value = 0.035;
      filter.type = 'lowpass'; filter.frequency.value = 1900;
      envelope.gain.setValueAtTime(0.0001, start);
      envelope.gain.linearRampToValueAtTime(0.22, start + 0.09);
      envelope.gain.setValueAtTime(0.16, start + Math.max(0.1, duration - 0.12));
      envelope.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      tone.connect(filter); breath.connect(breathGain); breathGain.connect(filter); filter.connect(envelope); envelope.connect(master);
      tone.start(start); breath.start(start); tone.stop(start + duration + .03); breath.stop(start + duration + .03);
    });
    window.setTimeout(() => ctx.close().catch(() => {}), 11000);
  } catch (error) { /* Animation still works if sound is unavailable. */ }
}

/* -------------------------
   Scroll reveal
   ------------------------- */

const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => observer.observe(item));

/* -------------------------
   Original nostalgia soundscape for the terrace memory
   Synthesised locally with Web Audio; no external track or autoplay.
   ------------------------- */
const terraceSoundToggle = document.getElementById("terraceSoundToggle");
let terraceAudioContext = null;
let terraceMaster = null;
let terraceLoop = null;
let terraceNoteIndex = 0;
const terraceChords = [
  [261.63, 329.63, 392.00, 493.88], // Cmaj7
  [220.00, 261.63, 329.63, 392.00], // Am7
  [174.61, 220.00, 261.63, 329.63], // Fmaj7
  [196.00, 246.94, 293.66, 392.00]  // Gadd9 colour
];

function playTerraceNote(frequency, startAt, duration = 2.6) {
  if (!terraceAudioContext || !terraceMaster) return;
  const osc = terraceAudioContext.createOscillator();
  const overtone = terraceAudioContext.createOscillator();
  const gain = terraceAudioContext.createGain();
  const filter = terraceAudioContext.createBiquadFilter();
  osc.type = "sine";
  overtone.type = "triangle";
  osc.frequency.setValueAtTime(frequency, startAt);
  overtone.frequency.setValueAtTime(frequency * 2.003, startAt);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(950, startAt);
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.linearRampToValueAtTime(0.085, startAt + 0.22);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  osc.connect(filter);
  overtone.connect(filter);
  filter.connect(gain);
  gain.connect(terraceMaster);
  osc.start(startAt);
  overtone.start(startAt);
  osc.stop(startAt + duration + 0.05);
  overtone.stop(startAt + duration + 0.05);
}

function terraceSoundStep() {
  if (!terraceAudioContext || !terraceMaster) return;
  const now = terraceAudioContext.currentTime;
  const chord = terraceChords[terraceNoteIndex % terraceChords.length];
  // Soft, widely spaced notes rather than a recognisable song.
  playTerraceNote(chord[0] / 2, now, 4.2);
  playTerraceNote(chord[2], now + 0.45, 3.2);
  playTerraceNote(chord[1], now + 1.05, 3.1);
  playTerraceNote(chord[3], now + 1.75, 3.8);
  if (terraceNoteIndex % 2 === 1) playTerraceNote(chord[0], now + 2.25, 3.3);
  terraceNoteIndex++;
}

async function toggleTerraceSound() {
  if (!terraceSoundToggle) return;
  if (terraceLoop) {
    window.clearInterval(terraceLoop);
    terraceLoop = null;
    if (terraceMaster && terraceAudioContext) {
      const now = terraceAudioContext.currentTime;
      terraceMaster.gain.cancelScheduledValues(now);
      terraceMaster.gain.setTargetAtTime(0.0001, now, 0.12);
    }
    terraceSoundToggle.setAttribute("aria-pressed", "false");
    terraceSoundToggle.textContent = "♪ Play our terrace nostalgia";
    return;
  }
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    terraceSoundToggle.textContent = "Sound isn't supported in this browser";
    return;
  }
  terraceAudioContext = terraceAudioContext || new AudioContextClass();
  await terraceAudioContext.resume();
  terraceMaster = terraceAudioContext.createGain();
  terraceMaster.gain.setValueAtTime(0.0001, terraceAudioContext.currentTime);
  terraceMaster.gain.setTargetAtTime(0.34, terraceAudioContext.currentTime, 0.7);
  terraceMaster.connect(terraceAudioContext.destination);
  terraceNoteIndex = 0;
  terraceSoundStep();
  terraceLoop = window.setInterval(terraceSoundStep, 3600);
  terraceSoundToggle.setAttribute("aria-pressed", "true");
  terraceSoundToggle.textContent = "Ⅱ Pause terrace nostalgia";
}

if (terraceSoundToggle) terraceSoundToggle.addEventListener("click", toggleTerraceSound);
