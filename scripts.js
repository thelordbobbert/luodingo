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

function handleKeyPress(event) {
  if (event.key === 'Enter') {
      startLearning();
  }
}

window.onload = function() {
  document.getElementById('languageInput').addEventListener('keydown', handleKeyPress);
};

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
  const confirmed = confirm("Do you want to enter a Sigma Session?");
  if (confirmed) {
      window.location.href = 'sigmasession.html';
  }
}

const firebaseConfig = {
  apiKey: "AIzaSyBlR8XGJ9sjDRJvmJO8mBgtlzMReT58RL8",
  authDomain: "sigma-session.firebaseapp.com",
  databaseURL: "https://sigma-session-default-rtdb.firebaseio.com",
  projectId: "sigma-session",
  storageBucket: "sigma-session.appspot.com",
  messagingSenderId: "1017190128465",
  appId: "1:1017190128465:web:9fa31a393b68f7fffc9170"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const realTimeDb = firebase.database();

function goHome() {
  window.location.href = 'sigmasession.html';
}

function addFriend() {
  const friendEmail = document.getElementById('search-friend').value;
  const user = auth.currentUser;
  if (friendEmail) {
      db.collection('users').doc(user.uid).collection('friends').add({
          friendEmail: friendEmail,
          status: 'pending'
      }).then(() => {
          alert('Friend request sent');
      }).catch(error => {
          console.error('Error adding friend:', error);
      });
  }
}

function acceptFriendRequest(friendId) {
  const user = auth.currentUser;
  db.collection('users').doc(user.uid).collection('friends').doc(friendId).update({
      status: 'accepted'
  });
}

function sendMessage() {
  const message = document.getElementById('message-input').value;
  const user = auth.currentUser;
  realTimeDb.ref('messages').push({
      sender: user.email,
      message: message,
      timestamp: firebase.database.ServerValue.TIMESTAMP
  });
  document.getElementById('message-input').value = '';
}

realTimeDb.ref('messages').on('child_added', (snapshot) => {
  const messageData = snapshot.val();
  const messageBox = document.getElementById('message-box');
  const messageElement = document.createElement('p');
  messageElement.textContent = `${messageData.sender}: ${messageData.message}`;
  messageBox.appendChild(messageElement);
});

function updateProfile() {
  const username = document.getElementById('username').value;
  const status = document.getElementById('status').value;
  const user = auth.currentUser;

  db.collection('users').doc(user.uid).set({
      username: username,
      status: status
  }).then(() => {
      alert('Profile updated successfully');
  }).catch(error => {
      console.error('Error updating profile:', error);
  });
}

function loadNotifications() {
  const user = auth.currentUser;
  const notificationList = document.getElementById('notification-list');
  db.collection('users').doc(user.uid).collection('notifications').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
          let li = document.createElement('li');
          li.textContent = doc.data().message;
          notificationList.appendChild(li);
      });
  });
}

auth.onAuthStateChanged(user => {
  if (user) {
      console.log('User logged in:', user);
  } else {
      window.location.href = 'auth.html';
  }
});
