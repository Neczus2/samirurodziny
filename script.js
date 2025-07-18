let team1Score = parseInt(localStorage.getItem('team1Score')) || 0;
let team2Score = parseInt(localStorage.getItem('team2Score')) || 0;
let currentAudio = null;
let currentLevel = parseInt(localStorage.getItem('currentLevel')) || 1;

// Linki do mp3
const baseURL = "https://pub-61e02c770f344fbcb5e633d30af1575c.r2.dev/";

const poziomy = {
  1: [`${baseURL}beat.mp3`, `${baseURL}zwrotka.mp3`, `${baseURL}refren.mp3`],
  2: [`${baseURL}beat2.mp3`, `${baseURL}zwrotka2.mp3`, `${baseURL}refren2.mp3`],
  3: [`${baseURL}beat3.mp3`, `${baseURL}zwrotka3.mp3`, `${baseURL}refren3.mp3`],
  4: [`${baseURL}beat4.mp3`, `${baseURL}zwrotka4.mp3`, `${baseURL}refren4.mp3`],
  5: [`${baseURL}beat5.mp3`, `${baseURL}zwrotka5.mp3`, `${baseURL}refren5.mp3`],
  6: [`${baseURL}beat6.mp3`, `${baseURL}zwrotka6.mp3`, `${baseURL}refren6.mp3`],
  7: [`${baseURL}beat7.mp3`, `${baseURL}zwrotka7.mp3`, `${baseURL}refren7.mp3`],
  8: [`${baseURL}beat8.mp3`, `${baseURL}zwrotka8.mp3`, `${baseURL}refren8.mp3`],
  9: [`${baseURL}beat9.mp3`, `${baseURL}zwrotka9.mp3`, `${baseURL}refren9.mp3`],
  10: [`${baseURL}beat10.mp3`, `${baseURL}zwrotka10.mp3`, `${baseURL}refren10.mp3`],
  11: [`${baseURL}beat11.mp3`, `${baseURL}zwrotka11.mp3`, `${baseURL}refren11.mp3`],
  12: [`${baseURL}beat12.mp3`, `${baseURL}zwrotka12.mp3`, `${baseURL}refren12.mp3`],
  13: [`${baseURL}beat13.mp3`, `${baseURL}zwrotka13.mp3`, `${baseURL}refren13.mp3`],
  14: [`${baseURL}beat14.mp3`, `${baseURL}zwrotka14.mp3`, `${baseURL}refren14.mp3`],
  15: [`${baseURL}beat15.mp3`, `${baseURL}zwrotka15.mp3`, `${baseURL}refren15.mp3`],
  16: [`${baseURL}beat16.mp3`, `${baseURL}zwrotka16.mp3`, `${baseURL}refren16.mp3`],
  17: [`${baseURL}beat17.mp3`, `${baseURL}zwrotka17.mp3`, `${baseURL}refren17.mp3`],
  18: [`${baseURL}beat18.mp3`, `${baseURL}zwrotka18.mp3`, `${baseURL}refren18.mp3`],
  19: [`${baseURL}beat19.mp3`, `${baseURL}zwrotka19.mp3`, `${baseURL}refren19.mp3`],
  20: [`${baseURL}beat20.mp3`, `${baseURL}zwrotka20.mp3`, `${baseURL}refren20.mp3`],
  21: [`${baseURL}beat21.mp3`, `${baseURL}zwrotka21.mp3`, `${baseURL}refren21.mp3`],
  22: [`${baseURL}beat22.mp3`, `${baseURL}zwrotka22.mp3`, `${baseURL}refren22.mp3`],
  23: [`${baseURL}beat23.mp3`, `${baseURL}zwrotka23.mp3`, `${baseURL}refren23.mp3`],
  24: [`${baseURL}beat24.mp3`, `${baseURL}zwrotka24.mp3`, `${baseURL}refren24.mp3`],
  25: [`${baseURL}beat25.mp3`, `${baseURL}zwrotka25.mp3`, `${baseURL}refren25.mp3`],
  26: []  // Poziom końcowy bez audio
};

function updateScores() {
  document.getElementById('team1Score').innerText = team1Score;
  document.getElementById('team2Score').innerText = team2Score;
  localStorage.setItem('team1Score', team1Score);
  localStorage.setItem('team2Score', team2Score);
}

function addPoints(points) {
  const team = prompt(`Komu dodać ${points} pkt? Wpisz: 1 lub 2`);
  if (team === '1') team1Score += points;
  else if (team === '2') team2Score += points;
  else {
    alert("Nieprawidłowy wybór.");
    return;
  }
  updateScores();
}

function playAudio(index) {
  if(currentLevel === 26) {
    alert("To jest ostatni poziom, brak utworów do odtworzenia.");
    return;
  }
  stopAudio(false);
  const track = poziomy[currentLevel][index];
  if (!track) {
    alert("Brak utworu na tym poziomie.");
    return;
  }
  currentAudio = new Audio(track);
  currentAudio.play();
  currentAudio.onended = () => {
    stopAudio();
  };
}

function stopAudio(askForPoints = true) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (askForPoints) {
    const team = prompt("Komu przyznać punkty za zatrzymanie? Wpisz: 1 lub 2 lub Anuluj");
    if (team === '1' || team === '2') {
      const points = parseInt(prompt("Ile punktów przyznać?"));
      if (!isNaN(points)) {
        if (team === '1') team1Score += points;
        else team2Score += points;
        updateScores();
      } else {
        alert("Nie podano liczby punktów.");
      }
    }
  }
}

function nextLevel() {
  if (currentLevel < 26) {
    currentLevel++;
    localStorage.setItem('currentLevel', currentLevel);
    reloadPage();
  } else {
    alert("Koniec poziomów!");
  }
}

function prevLevel() {
  if (currentLevel > 1) {
    currentLevel--;
    localStorage.setItem('currentLevel', currentLevel);
    reloadPage();
  }
}

function removePoints() {
  const team = prompt("Której drużynie odjąć punkty? Wpisz: 1 lub 2");
  if (team !== '1' && team !== '2') return;
  const points = parseInt(prompt("Ile punktów odjąć?"));
  if (isNaN(points)) return;
  if (team === '1') team1Score -= points;
  else team2Score -= points;
  updateScores();
}

function updateLevelDisplay() {
  document.getElementById('currentLevel').innerText = currentLevel;
}

function showGameContent() {
  document.getElementById("gameContent").style.display = "block";
}

function hideGameContent() {
  document.getElementById("gameContent").style.display = "none";
}

function showEndLevel() {
  document.getElementById("endLevel").style.display = "block";
}

function hideEndLevel() {
  document.getElementById("endLevel").style.display = "none";
}

function goToFamiliada() {
  window.location.href = "familiada.html";
}

function restartGame() {
  currentLevel = 1;
  localStorage.setItem('currentLevel', currentLevel);
  team1Score = 0;
  team2Score = 0;
  updateScores();
  updateLevelDisplay();
  showGameContent();
  hideEndLevel();
}

function reloadPage() {
  if(currentLevel === 26) {
    hideGameContent();
    showEndLevel();
  } else {
    showGameContent();
    hideEndLevel();
    updateLevelDisplay();
  }
  updateScores();
}

window.onload = () => {
  reloadPage();
};
