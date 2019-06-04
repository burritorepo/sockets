function storage() {
  function get(key = 'user') {
    return sessionStorage.getItem(key);
  }

  function set(key = 'user', value = '') {
    return sessionStorage.setItem(key, value)
  }

  function remove(key = 'user') {
    return sessionStorage.removeItem(key)
  }

  function clear() {
    return sessionStorage.clear()
  }

  return {
    get,
    set,
    remove,
    clear
  }
}

function submitFormMessage(cb = () => { }) {
  const form = document.querySelector('form');
  const input = document.querySelector('input');
  form.onsubmit = function (e) {
    e.preventDefault();
    cb(input.value)
    input.value = '';
  }
}

function htmlMessages(message) {
  const container = document.querySelector('.js_messages')
  const wrapper = document.createElement('div');

  wrapper.classList.add('wrapp-message');
  wrapper.innerHTML = `
  <div class="client">${message.from} dice:</div>
  <div class="message">${message.message}</div>
  `;

  container.appendChild(wrapper)
}

function socketWatch(channel, cb) {
  socket.on(`${channel}`, cb)
}

function socketEmit(channel, value) {
  socket.emit(`${channel}`, value)
}

function logout(cb = () => {}) {
  const button  = document.querySelector('.js_logout');

  button.onclick = function(e) {
    console.log('click logout!!')
    e.preventDefault();
    cb()
  }
}