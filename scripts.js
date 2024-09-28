document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('languageInput').addEventListener('keydown', handleKeyPress);
});

function handleKeyPress(event) {
  if (event.key === 'Enter') {
      startLearning();
  }
}

function startLearning() {
  const language = document.getElementById('languageInput').value.trim();
  if (language === '') {
      return;
  }

  const upperCaseLanguage = language.toUpperCase();

  document.getElementById('languageName1').innerText = upperCaseLanguage;
  document.getElementById('languageName2').innerText = upperCaseLanguage;
  document.getElementById('languageName3').innerText = upperCaseLanguage;
  document.getElementById('languageName4').innerText = upperCaseLanguage;
  document.getElementById('languageName5').innerText = upperCaseLanguage;
  document.getElementById('languageName6').innerText = upperCaseLanguage;
  document.getElementById('languageName7').innerText = upperCaseLanguage;
  document.getElementById('languageName8').innerText = upperCaseLanguage;

  document.getElementById('home').style.display = 'none';
  document.getElementById('step1').style.display = 'flex';
}

function nextStep(stepId) {
  const steps = ['step1', 'step2', 'step3', 'step4'];
  steps.forEach(step => document.getElementById(step).style.display = 'none');
  document.getElementById(stepId).style.display = 'flex';
}

function previousStep(stepId) {
  const steps = ['step1', 'step2', 'step3', 'step4'];
  steps.forEach(step => document.getElementById(step).style.display = 'none');
  document.getElementById(stepId).style.display = 'flex';
}

function goHome() {
  const steps = ['step1', 'step2', 'step3', 'step4'];
  steps.forEach(step => document.getElementById(step).style.display = 'none');
  document.getElementById('home').style.display = 'flex';
}

function enterSigmaSession() {
  window.location.href = 'sigmasession';
}

function goBackHome() {
  window.location.href = '/';
}

function toggleTheme() {
  if (document.body.classList.contains('dark-mode')) {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      updateIcon('light-mode');
  } else {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      updateIcon('dark-mode');
  }
}

function updateIcon(theme) {
  const icon = document.getElementById('themeIcon');
  icon.textContent = (theme === 'dark-mode') ? '🌞' : '🌙';
}
