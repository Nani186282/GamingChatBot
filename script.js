// 1. Select HTML elements
let messageInput = document.querySelector("#message");
let sendButton = document.querySelector("#send");
let chatBody = document.querySelector("#chat-body");
let faqButtons = document.querySelectorAll(".faq-btn");
let chatIcon = document.querySelector(".chat-icon");
let chatContainer = document.querySelector(".chat-container");


// 2. Open and close chatbot
chatIcon.addEventListener("click", function() {

    if (chatContainer.style.display === "flex") {
        chatContainer.style.display = "none";
    }
    else {
        chatContainer.style.display = "flex";
    }

});


// 3. Chatbot response function
function getResponse(message) {

    // Text preprocessing
    let cleanMessage = message.toLowerCase().replace(/[^\w\s]/g, "");

    let tokens = cleanMessage.split(/\s+/);

    // 1. General questions
    if (tokens.includes("hello") || tokens.includes("hi")) {
        return "Hello! Welcome to PUBG Gaming Assistant.";
    }

    if (
        tokens.includes("pubg") &&
        (tokens.includes("what") || tokens.includes("about")) &&
        !tokens.includes("map") &&
        !tokens.includes("maps")
    ) {
        return "PUBG is a battle royale game where players compete to be the last person or team surviving.";
    }

    if (tokens.includes("developed") || tokens.includes("developer")) {
        return "PUBG Mobile was developed by Lightspeed and Quantum Studio, published by Tencent Games.";
    }

    // 2. Chatbot knowledge categories
    if (
        tokens.includes("how") &&
        tokens.includes("many") &&
        (
            tokens.includes("things") ||
            tokens.includes("topics") ||
            tokens.includes("categories")
        )
    ) {
        return `I can answer questions about 6 main PUBG categories:
1. Weapons
2. Maps
3. Attachments
4. Vehicles
5. Gameplay
6. Equipment`;
    }

    // 3. Number of weapons
    if (
        ["how", "many", "number", "total"].some(word => tokens.includes(word)) &&
        ["gun", "guns", "weapon", "weapons"].some(word => tokens.includes(word))
    ) {
        return "The PUBG Mobile Help Center lists 47 firearm entries. The available weapons can vary by game update and mode.";
    }

    // 4. Weapon features
    let weaponFeatures = {
        "m416": "M416 is a versatile 5.56mm assault rifle. It supports several attachments and is useful in close and medium-range fights.",
        "akm": "AKM is a 7.62mm assault rifle. It has high damage but noticeable recoil.",
        "awm": "AWM is a powerful bolt-action sniper rifle. It uses .300 Magnum ammunition.",
        "kar98k": "Kar98k is a bolt-action sniper rifle suitable for long-range headshots.",
        "m24": "M24 is a bolt-action sniper rifle used for long-range combat.",
        "uzi": "UZI is a fast-firing submachine gun that is effective at close range.",
        "ump45": "UMP45 is a versatile submachine gun suitable for close and medium-range combat.",
        "vector": "Vector is a fast-firing submachine gun that performs well at close range.",
        "scar": "SCAR-L is a 5.56mm assault rifle known for manageable recoil."
    };

    for (let weapon in weaponFeatures) {
        if (tokens.includes(weapon)) {
            return weaponFeatures[weapon];
        }
    }

    // 5. Weapon categories
    if (tokens.includes("assault") || tokens.includes("rifle")) {
        return "Assault rifles include M416, AKM, SCAR-L, AUG and Beryl M762. They are useful for different combat ranges.";
    }

    if (tokens.includes("sniper")) {
        return "Popular sniper rifles include AWM, Kar98k and M24. They are designed for long-range attacks.";
    }

    if (tokens.includes("shotgun")) {
        return "Shotguns such as S12K, S686 and DBS are powerful at close range.";
    }

    if (tokens.includes("smg")) {
        return "SMGs such as UZI, Vector and UMP45 are useful in close-range battles.";
    }

    // 6. PUBG maps
    let maps = {
        "erangel": "Erangel is a classic 8x8 PUBG map with cities, fields and military locations.",
        "miramar": "Miramar is a desert map with open terrain, hills and towns.",
        "sanhok": "Sanhok is a tropical map with dense forests and fast-paced gameplay.",
        "livik": "Livik is a compact map designed for faster matches."
    };

    for (let mapName in maps) {
        if (tokens.includes(mapName)) {
            return maps[mapName];
        }
    }

    if (tokens.includes("map") || tokens.includes("maps")) {
        return "PUBG maps include Erangel, Miramar, Sanhok and Livik.";
    }

    // 7. Safer landing locations
    if (["safest", "safe", "quiet", "less"].some(word => tokens.includes(word))) {

        if (tokens.includes("erangel")) {
            return "For a relatively quiet start on Erangel, try Gatka, Zharki or Primorsk. Always check the plane path and other parachutes.";
        }

        if (tokens.includes("miramar")) {
            return "Consider quieter areas such as Monte Nuevo or La Cobreria on Miramar. Check the plane path before landing.";
        }

        if (tokens.includes("sanhok")) {
            return "Camp Charlie or Sahmee can be alternatives to hot drops on Sanhok. Check nearby enemy landings.";
        }

        if (tokens.includes("livik")) {
            return "On Livik, choose a small compound away from the plane path and check for nearby enemies before landing.";
        }

        return "There is no permanently safest landing place. Choose a location away from the plane path, watch other parachutes and stay near a vehicle.";
    }

    // 8. Attachments
    if (tokens.includes("scope") || tokens.includes("scopes")) {
        return "Scopes help you aim at different distances. PUBG includes red dot, holographic, 2x, 3x, 4x, 6x and 8x scopes.";
    }

    if (tokens.includes("suppressor")) {
        return "A suppressor reduces the sound of your weapon and helps make your position harder to identify.";
    }

    if (tokens.includes("grip")) {
        return "Grips can improve weapon handling and help control recoil, depending on the grip type.";
    }

    // 9. Equipment
    if (tokens.includes("helmet")) {
        return "Helmets protect your head from enemy attacks. Higher-level helmets generally provide more protection.";
    }

    if (tokens.includes("vest")) {
        return "Vests protect your body and reduce incoming damage.";
    }

    if (tokens.includes("backpack")) {
        return "Backpacks increase the amount of ammunition, equipment and supplies you can carry.";
    }

    // 10. Vehicles
    if (tokens.includes("vehicle") || tokens.includes("vehicles")) {
        return "PUBG has vehicles such as UAZ, Buggy, Dacia and motorcycles. Vehicles help you travel and rotate between zones.";
    }

    // 11. Gameplay
    if (tokens.includes("rank") || tokens.includes("ranks")) {
        return "PUBG ranking rewards survival, performance and match results. Play strategically to improve your rank.";
    }

    if (tokens.includes("revive")) {
        return "In squad matches, help your knocked teammates by approaching them and using the revive option when it is safe.";
    }

    if (tokens.includes("health") || tokens.includes("healing")) {
        return "Use bandages, first aid kits, med kits and energy items to restore health or boost your character.";
    }

    if (tokens.includes("tips") || tokens.includes("strategy")) {
        return "Stay inside the safe zone, collect good equipment, use cover, communicate with teammates and avoid unnecessary fights.";
    }

    // 12. Default response
    return "Sorry, I don't understand. Try asking about PUBG weapons, maps, attachments, vehicles, equipment or gameplay.";
}


// 4. Send message
sendButton.addEventListener("click", function() {

    let message = messageInput.value.trim();

    if (message === "") {
        return;
    }

    let userMessage = document.createElement("p");
    userMessage.innerHTML = "<b>You:</b> ";
    userMessage.appendChild(document.createTextNode(message));
    chatBody.appendChild(userMessage);

    let response = getResponse(message);

    let botMessage = document.createElement("p");
    botMessage.innerHTML = "<b>Bot:</b> ";
    botMessage.appendChild(document.createTextNode(response));
    chatBody.appendChild(botMessage);

    messageInput.value = "";

    chatBody.scrollTop = chatBody.scrollHeight;

});


// 5. FAQ buttons
faqButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        let question = button.dataset.question;

        messageInput.value = question;

        sendButton.click();

    });

});


// 6. Enter key support
messageInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        sendButton.click();
    }

});
