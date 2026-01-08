// ---------- Typewriter ----------
function initTypewriter() {
  const staticPhrase = "Hi, I'm Anisha Imran";
  const staticTextEl = document.getElementById("static-text");
  const typewriterText = document.getElementById("typewriter-text");

  const phrases = [
    "Bachelor of Software Engineering (Honours).",
    "Front End Developer · Growing into Fullstack.",
    "IBM · Meta · Microsoft credentials."
  ];

  let currentPhrase = 0;
  let currentChar = 0;

  function typeStaticText(i = 0) {
    if (i < staticPhrase.length) {
      staticTextEl.textContent += staticPhrase.charAt(i);
      setTimeout(() => typeStaticText(i + 1), 100);
    } else {
      setTimeout(typeDynamic, 500);
    }
  }

  function typeDynamic() {
    if (currentChar < phrases[currentPhrase].length) {
      typewriterText.textContent += phrases[currentPhrase].charAt(currentChar);
      currentChar++;
      setTimeout(typeDynamic, 100);
    } else {
      setTimeout(eraseDynamic, 2000);
    }
  }

  function eraseDynamic() {
    if (currentChar > 0) {
      typewriterText.textContent = phrases[currentPhrase].substring(0, currentChar - 1);
      currentChar--;
      setTimeout(eraseDynamic, 50);
    } else {
      currentPhrase = (currentPhrase + 1) % phrases.length;
      setTimeout(typeDynamic, 500);
    }
  }

  typeStaticText();
}

// Run the typewriter immediately
initTypewriter();
