const form = document.getElementById("form");

function showMessage(name, message, isMine = false) {
  document.getElementById("messages").innerHTML += `
      <div class="message-row ${isMine ? "mine" : "theirs"}">
          <div class="bubble">
            <p class="nameText">${name}: </p>
            <p>${message}</p>
          </div>
      </div>
    `;
  window.scrollTo(0, document.body.scrollHeight);
}

const ws = new WebSocket("ws://localhost:8080");

ws.addEventListener("message", (ev) => {
  const { name, message } = JSON.parse(ev.data);
  showMessage(name, message);
});

form.onsubmit = (ev) => {
  ev.preventDefault();

  const name = document.getElementById("name").value;
  let message = document.getElementById("message").value;

  ws.send(JSON.stringify({ name, message }));
  showMessage(name, message, true);
  message = "";
};
