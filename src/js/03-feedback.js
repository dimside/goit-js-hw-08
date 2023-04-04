import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const THROTTLE_TIME = 500;

const feedbackFormEL = document.querySelector('.feedback-form');
const emailEl = document.querySelector("[name = 'email']");
const messageEl = document.querySelector("[name = 'message']");

const feedbackObj = {};
// ======================== Input-Form Listener ===========================
feedbackFormEL.addEventListener(
  'input',
  throttle(onFormElInput, THROTTLE_TIME)
);

function onFormElInput(evt) {
  feedbackObj[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackObj));
}
// ======================================================================

// ================= Page-load Form-input value ====================
function getLocalStorageInfo() {
  if (JSON.parse(localStorage.getItem(STORAGE_KEY))) {
    const { email: emailValue, message: messageValue } = JSON.parse(
      localStorage.getItem(STORAGE_KEY)
    );
    if (emailValue) {
      emailEl.value = emailValue;
    }
    if (messageValue) {
      messageEl.value = messageValue;
    }

    return feedbackObj;
  }
}
getLocalStorageInfo();
// =================================================================

// ================== Submit Listener ====================
feedbackFormEL.addEventListener('submit', onFormElSubmit);

function onFormElSubmit(evt) {
  evt.preventDefault();

  if (emailEl.value && messageEl.value) {
    if (getLocalStorageInfo()) {
      console.log(getLocalStorageInfo());
    }
    feedbackFormEL.reset();
    localStorage.removeItem(STORAGE_KEY);
  } else {
    alert('All fields must be filled');
  }
}
// =======================================================
