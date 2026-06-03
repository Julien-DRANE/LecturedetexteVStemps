const elements = {
  text: document.querySelector("#speech-text"),
  wpm: document.querySelector("#wpm"),
  pauseSeconds: document.querySelector("#pause-seconds"),
  wpmValue: document.querySelector("#wpm-value"),
  pauseValue: document.querySelector("#pause-value"),
  estimatedTime: document.querySelector("#estimated-time"),
  wordCount: document.querySelector("#word-count"),
  charCount: document.querySelector("#char-count"),
  speechTime: document.querySelector("#speech-time"),
  pauseTime: document.querySelector("#pause-time"),
  presets: [...document.querySelectorAll(".preset")],
};

function countWords(text) {
  const words = text.trim().match(/\S+/g);
  return words ? words.length : 0;
}

function formatDuration(seconds) {
  const safeSeconds = Math.max(0, Math.round(seconds));
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;
  return `${minutes} min ${String(remainingSeconds).padStart(2, "0")} s`;
}

function updateActivePreset(currentWpm) {
  elements.presets.forEach((preset) => {
    const isActive = Number(preset.dataset.wpm) === currentWpm;
    preset.classList.toggle("is-active", isActive);
  });
}

function updateEstimate() {
  const text = elements.text.value;
  const wordCount = countWords(text);
  const charCount = text.length;
  const wpm = Number(elements.wpm.value);
  const pauseSeconds = Number(elements.pauseSeconds.value);
  const speechSeconds = wordCount === 0 ? 0 : (wordCount / wpm) * 60;
  const totalSeconds = speechSeconds + pauseSeconds;

  elements.wpmValue.textContent = String(wpm);
  elements.pauseValue.textContent = String(pauseSeconds);
  elements.wordCount.textContent = wordCount.toLocaleString("fr-FR");
  elements.charCount.textContent = charCount.toLocaleString("fr-FR");
  elements.speechTime.textContent = formatDuration(speechSeconds);
  elements.pauseTime.textContent = formatDuration(pauseSeconds);
  elements.estimatedTime.textContent = formatDuration(totalSeconds);

  updateActivePreset(wpm);
}

elements.text.addEventListener("input", updateEstimate);
elements.wpm.addEventListener("input", updateEstimate);
elements.pauseSeconds.addEventListener("input", updateEstimate);

elements.presets.forEach((preset) => {
  preset.addEventListener("click", () => {
    elements.wpm.value = preset.dataset.wpm;
    updateEstimate();
  });
});

elements.text.value =
  "Bonjour à toutes et à tous. Merci d’être présents aujourd’hui. " +
  "Ce texte de démonstration permet de vérifier rapidement combien de temps " +
  "prendrait une prise de parole à l’oral selon le rythme choisi.";

updateEstimate();
