const form = document.getElementById('form_send')
const socket = io('localhost:3333')

socket.on('chatting', (msg) => {
    const msgList = document.getElementById('msg_list')
    const newLiTag = document.createElement('article')

    newLiTag.className = 'user'
    newLiTag.innerHTML = `<span>${msg}</span>`

    msgList.appendChild(newLiTag)
})

form.addEventListener('submit', (e) => {
    const inputMessage = document.getElementById('input_message')

    e.preventDefault()

    socket.emit('chatting', inputMessage.value)

    inputMessage.value = ''
    inputMessage.focus()
})
