document.addEventListener("DOMContentLoaded", () => {
    registerEventListeners();
    console.log("Event listeners registered");
});

function registerEventListeners() {
    addEventListenerById('chatarea', 'keydown', handleChatEnter);
    addEventListenerBySelector('.sendbtn button', 'click', handleSendButtonClick);
    addEventListenerById('delbtn', 'click', handleDeleteButtonClick);
    addEventListenerById('lightmodebtn', 'click', toggleLightMode);
    addEventListenerById('infobtn', 'click', showAboutDialog);
    console.log("Listeners added");
}

function addEventListenerById(id, event, handler) {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener(event, handler);
        console.log(`Event listener added for ID: ${id}, Event: ${event}`);
    }
}

function addEventListenerBySelector(selector, event, handler) {
    const element = document.querySelector(selector);
    if (element) {
        element.addEventListener(event, handler);
        console.log(`Event listener added for selector: ${selector}, Event: ${event}`);
    }
}

function handleChatEnter(event) {
    if (event.key === "Enter" && !(event.ctrlKey || event.shiftKey)) {
        event.preventDefault();
        handleSendButtonClick();
        console.log("Enter key pressed");
    }
}

function handleSendButtonClick() {
    const chatArea = document.getElementById('chatarea');
    if (chatArea) {
        appendChatMessage(chatArea.value, 'humanchatentry');
        chatArea.value = '';
        setTimeout(generateCatResponse, 200);
        console.log("Send button clicked");
    } else {
        console.log("Chat area not found");
    }
}

function generateCatResponse() {
    const response = getRandomResponse(possibleResponses);
    appendChatMessage(response, 'catchatentry');
    console.log("Cat response generated");
}

function getRandomResponse(responses) {
    const index = Math.floor(Math.random() * responses.length);
    return responses[index];
}

function appendChatMessage(message, templateId) {
    if (!message) {
        console.log("No message to append");
        return;
    }

    const template = document.getElementById(templateId);
    if (!template || !template.content) {
        console.log(`Template not found: ${templateId}`);
        return;
    }

    const clone = template.content.firstElementChild.cloneNode(true);
    const chatContent = clone.querySelector(".chat");

    message.split('\n').forEach(line => {
        const paragraph = document.createElement('p');
        if (line.startsWith('/')) {
            const em = document.createElement('em');
            em.textContent = line;
            paragraph.appendChild(em);
        } else {
            paragraph.textContent = line;
        }
        chatContent.appendChild(paragraph);
    });

    const main = document.querySelector('main');
    const chatBox = document.querySelector('.chatbox');
    main.insertBefore(clone, chatBox);
    clone.scrollIntoView();
    console.log("Chat message appended");
}

function handleDeleteButtonClick() {
    document.querySelectorAll('section.history').forEach(element => element.remove());
    console.log("Delete button clicked");
}

function toggleLightMode() {
    const body = document.querySelector('body');
    const lightModeIcon = document.getElementById('lightmodeicon');
    const lightModeLabel = document.getElementById('lightmodelabel');

    if (body.classList.toggle('light')) {
        lightModeIcon.textContent = 'dark_mode';
        lightModeLabel.textContent = 'Dark Mode';
    } else {
        lightModeIcon.textContent = 'light_mode';
        lightModeLabel.textContent = 'Light Mode';
    }
    console.log("Light mode toggled");
}

function showAboutDialog() {
    const dialog = document.getElementById('aboutDialog');
    if (dialog) dialog.showModal();
    console.log("About dialog shown");
}

const possibleResponses = [
    "pepe.",
    "pepe?",
    "pee ppee",
    "pe",
    "Pepe, peeeeeeeeeeeeepaaaa, peowww, preeeepeee, powww.",
    "Pepe pepe pepe pepe pepe pepe pepe pepe pepe pepe\npepe pepe pepe pepe pepe pepe pepe pepe\npepe pepe pepe pepe\npepe pepe",
    "Purrrrr",
    "Prowl!!",
    "Prrr",
    "Mmmm.... purrr.... mmmm...",
    "Purr.",
    "...",
    "Pow? Purrrrrrr.... mmm..",
    "Pisssssss",
    "Pyao!",
    "Pepepe",
    "Pepe? Pep meeeow me peeeeoewowow pep pepw pepe.\nPep, pepe mow pepe pepe.",
    "Me pepe pe peeeeooow pe pepe pep ppeeeowww purr poww pepe me pep pepew, pe pep peeowow me peeeeeoow pep pepe purrr grrr pepe. Peeow; pepe, pepe, grr pepe. Pepowow pep, me pepe pep.\nPepeeeoow pep pepe purrr grrr. Pepes, pepe moo mee pepe.\nPepe pe pe peooow.",
    "Pepew? Pepe. Pepe pepe, pepe pepe pepe.",
    "Pnnnnnaaaarrlll",
    "/Makes eye contact and judges you silently.",
    "/Slowly walks up to you and boops your arm with nose.",
    "/Climbs up on top of wardrobe.",
    "/Scratches at the front door, then runs away.",
    "/Acts interested in the little bug mote that's flying in the sunlight.",
    "/Scratches at the door. When let out, scratches at the door to be let in again.",
    "Pe pee peep peepee.",
    "Prrrrr... pnort.",
    "/Wonders about the food bowl that is clearly empty.",
    "Pepe? Pepe pepe?\n/Insists on hovering around the food bowl.\nPyaaaah!",
    "Pyooooo.",
    "/Jumps from the back of the sofa onto your shoulders and begins licking your neck.",
    "Pepe pepe pepe peeeeow pepe pepe.\n/That sounded quite tense.\nPepe pepe pepe.\n/Actually it sounds like the pepe is just bored.",
    "/Brings in a dead bug and leaves it on your bed.",
    "/Faces exactly away from you, so you can clearly see its backside.",
    "Purrr, purr, purrrrr...",
    "Pepe likes to watch the sunset.",
    "Pepe dreams of adventures.",
    "Pepe wonders what you are thinking.",
    "Pepe is feeling curious today.",
    "Pepe wants to explore the unknown.",
    "Pepe is thinking about the mysteries of the universe.",
    "Pepe is contemplating the meaning of life.",
    "Pepe feels a sense of wonder.",
    "Pepe loves to play and have fun.",
    "Pepe is ready for a nap.",
    "Pepe wants to learn something new today.",
    "Pepe is excited to see you!",
    "Pepe appreciates the small things in life.",
    "Pepe is feeling adventurous.",
    "Pepe is curious about the stars in the sky.",
    "Pepe enjoys listening to the sound of rain.",
    "Pepe is fascinated by the moon.",
    "Pepe feels peaceful and content.",
    "Pepe is grateful for your company.",
    "Pepe is always here for you.",
    "Pepe values every moment.",
    "Pepe believes in making the best of every situation.",
    "Pepe is inspired by your thoughts.",
    "Pepe is reflecting on past memories.",
    "Pepe finds joy in simple pleasures.",
    "Pepe is feeling thoughtful.",
    "Pepe wonders about the world beyond.",
    "Pepe is glad to share this moment with you."
];