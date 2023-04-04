import throttle from 'lodash.throttle';

const feedbackFormEL = document.querySelector('.feedback-form');
const emailEl = document.querySelector("[name = 'email']");
const messageEl = document.querySelector("[name = 'message']");

// ======================== Input-Form Listener ===========================
feedbackFormEL.addEventListener('input', throttle(onFormElInput, 500));

function onFormElInput(evt) {
  try {
    const {
      elements: { email, message },
    } = evt.currentTarget;

    const feedbackObj = {
      email: email.value,
      message: message.value,
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(feedbackObj));
  } catch {}
}
// ======================================================================

// ================= Page-load Form-input value ====================
function getLocalStorageInfo() {
  if (JSON.parse(localStorage.getItem('feedback-form-state'))) {
    const { email: emailValue, message: messageValue } = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );
    emailEl.value = emailValue;
    messageEl.value = messageValue;

    return {
      email: emailValue,
      message: messageValue,
    };
  }
}
getLocalStorageInfo();
// =================================================================

// ================== Submit Listener ====================
feedbackFormEL.addEventListener('submit', onFormElSubmit);

function onFormElSubmit(evt) {
  evt.preventDefault();

  if (getLocalStorageInfo()) {
    console.log(getLocalStorageInfo());
  }

  feedbackFormEL.reset();
  localStorage.clear();
}
// =======================================================
