document.getElementById('inputField').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && this.value.trim() !== '') {
        addMessage(this.value, 'user');
        sendMessageToBackend(this.value);
        this.value = '';  
    }
});

document.getElementById('sendBtn').addEventListener('click', function() {
    const message = document.getElementById('inputField').value;
    if (message.trim() !== '') {
        addMessage(message, 'user');
        sendMessageToBackend(message);
        document.getElementById('inputField').value = ''; 
    }
});

document.getElementById('imageInput').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            addMessage(`<img src="${imageUrl}" alt="Image" class="image-message">`, 'user');
        };
        reader.readAsDataURL(file);
    }
});

function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerHTML = message;
    document.getElementById('messages').appendChild(messageElement);
    scrollToBottom();
} // Clear the input field

async function sendMessageToBackend(message) {
    try {
        const response = await fetch("https://defeated-cathi-bhargavramkongara-d69e1f60.koyeb.app/get_telugu_response", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ message }),
        });
        if (!response.ok) {
            console.error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        reply = data.response;

        const botReply = document.createElement('div');
        botReply.classList.add('message', 'bot');
        
        botReply.innerHTML = marked.parse(reply);

        document.getElementById('messages').appendChild(botReply);
        scrollToBottom();   
    }
    catch (error) {
        console.log(error);
    }
}

function scrollToBottom() {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
