document.addEventListener("DOMContentLoaded", function () {
  const messageWrapper = document.querySelector(
    ".announcement-bar__message-wrapper"
  );
  const message = document.querySelector(".announcement-bar__message-content");

  if (messageWrapper && message) {
    const messageWidth = message.offsetWidth;
    const wrapperWidth = messageWrapper.offsetWidth;

    if (messageWidth > wrapperWidth) {
      message.style.animationDuration = `${messageWidth / 50}s`; // Ajusta la velocidad según sea necesario
    } else {
      message.style.animation = "none";
    }
  }
});
