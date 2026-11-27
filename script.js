// 1. Select HTML elements
let messageInput = document.querySelector("#message");
let sendButton = document.querySelector("#send");
let chatBody = document.querySelector("#chat-body");
let welcomeScreen = document.getElementById("welcome-screen");
let faqButtons = document.querySelectorAll(".faq-btn");
let chatIcon = document.querySelector(".chat-icon");
let chatContainer = document.querySelector(".chat-container");
let currentMenu = "main";
let isMenuQuestion = false;

// Get all menu panels
let menuPanels = document.querySelectorAll(".menu-panel");

// Show the selected menu
function showMenu(menuName) {

    // Hide all menu panels
    menuPanels.forEach(function(panel) {
        panel.hidden = true;
    });

    // Get the selected menu
    let selectedMenu = document.getElementById(menuName + "-menu");

    if (selectedMenu) {
        selectedMenu.hidden = false;

        // Move the complete menu to the bottom
        chatBody.appendChild(selectedMenu);
    }

    currentMenu = menuName;
}
// Handle clicks on all HTML menu buttons
chatBody.addEventListener("click", function(event) {

    let button = event.target.closest(".menu-option");

    if (!button) {
        return;
    }

    // Main menu selection
    if (button.dataset.menu) {
        showMenu(button.dataset.menu);
        return;
    }

    // Return to main menu
    if (button.classList.contains("back-option")) {
        showMenu("main");
        return;
    }

    // Help menu questions go to Gemini
    if (currentMenu === "help") {
        sendMenuQuestion(button.textContent.trim());
        return;
    }

    // Other submenu questions use predefined answers
    showPredefinedAnswer(button.textContent.trim());

});

// Predefined answers for PUBG submenu buttons
const predefinedAnswers = {

    // Guns & Weapons
    "Assault Rifles": `
        **Assault Rifles**

        * **M416:** Versatile rifle with manageable recoil and good attachment support.
        * **AKM:** High-damage rifle, but requires good recoil control.
        * **SCAR-L:** Beginner-friendly rifle with relatively stable handling.
        * **AUG:** Powerful rifle suitable for medium-range combat.
        * **Beryl M762:** High damage and fast fire rate, but difficult recoil.

        **Tip:** Practise recoil control in Training Grounds before using these weapons in matches.
    `,

    "Sniper Rifles": `
        **Sniper Rifles**

        * **AWM:** Extremely powerful bolt-action sniper rifle.
        * **Kar98k:** Popular bolt-action rifle for long-range headshots.
        * **M24:** Powerful bolt-action rifle for precision shooting.

        **Tip:** Aim for the head and use cover while taking long-range shots.
    `,

    "Submachine Guns": `
        **Submachine Guns (SMGs)**

        * **UZI:** Very fast fire rate, effective at close range.
        * **UMP45:** Stable handling and useful in close-to-medium combat.
        * **Vector:** High fire rate and excellent close-range performance.

        **Tip:** SMGs are especially useful during indoor fights.
    `,

    "Shotguns": `
        **Shotguns**

        * **S12K:** Semi-automatic shotgun with a larger magazine.
        * **S686:** Double-barrel shotgun with powerful close-range damage.
        * **DBS:** Powerful shotgun suitable for close combat.

        **Tip:** Use shotguns in close-range encounters rather than long-distance fights.
    `
    ,
        // Maps & Locations
    "Erangel": `
        **Erangel**

        * The original PUBG Mobile battle royale map.
        * Features cities, military bases, forests and open fields.
        * Popular locations include Pochinki, School and Military Base.

        **Tip:** Learn the map and choose your landing location carefully.
    `,

    "Miramar": `
        **Miramar**

        * A large desert map.
        * Features mountains, hills and open terrain.
        * Long-range combat is common.

        **Tip:** Carry a suitable long-range weapon and use cover.
    `,

    "Sanhok": `
        **Sanhok**

        * A smaller tropical map.
        * Features forests, rivers and dense vegetation.
        * Matches often involve fast-paced combat.

        **Tip:** Stay alert because enemies can approach from nearby cover.
    `,

    "Vikendi": `
        **Vikendi**

        * A snow-themed map.
        * Features snowy areas, forests and towns.
        * Visibility and terrain can affect your movement.

        **Tip:** Use buildings and terrain for protection.
    `,
        // Game Modes
    "Classic Mode": `
        **Classic Mode**

        * Battle royale gameplay with up to 100 players.
        * Search for weapons, equipment and supplies.
        * Survive until you become the last player or team.

        **Tip:** Focus on survival and stay inside the safe zone.
    `,

    "Arena Mode": `
        **Arena Mode**

        * Fast-paced multiplayer combat.
        * Focuses on close-range battles.
        * Practise your shooting and movement skills.

        **Tip:** Use cover and communicate with teammates.
    `,

    "Team Deathmatch": `
        **Team Deathmatch**

        * Two teams compete against each other.
        * Players respawn after being eliminated.
        * The team reaching the target score wins.

        **Tip:** Work with your teammates and control important areas.
    `,

    "Payload Mode": `
        **Payload Mode**

        * A special mode featuring heavy weapons and vehicles.
        * Includes powerful equipment and aerial combat.
        * Teamwork is important for winning.

        **Tip:** Coordinate with your squad when using heavy equipment.
    `,
        // Tips & Strategies
    "Landing Strategies": `
        **Landing Strategies**

        * Choose a landing location based on your experience.
        * Avoid crowded areas if you are a beginner.
        * Land quickly and collect weapons.

        **Tip:** Watch enemy landing locations before choosing yours.
    `,

    "Survival Tips": `
        **Survival Tips**

        * Stay inside the safe zone.
        * Collect healing items and ammunition.
        * Avoid unnecessary fights.
        * Use buildings and cover to protect yourself.

        **Tip:** Survival is more important than chasing eliminations.
    `,

    "Combat Strategies": `
        **Combat Strategies**

        * Use cover during gunfights.
        * Practise aiming and recoil control.
        * Choose weapons suitable for the distance.
        * Avoid standing still while fighting.

        **Tip:** Practise regularly in Training Grounds.
    `,

    "Squad Strategies": `
        **Squad Strategies**

        * Communicate with your teammates.
        * Share ammunition and healing items.
        * Stay close to your squad.
        * Revive teammates when it is safe.

        **Tip:** Teamwork can make a big difference.
    `,
        // Equipment & Items
    "Helmets": `
        **Helmets**

        * Level 1: Basic head protection.
        * Level 2: Better head protection.
        * Level 3: Highest standard helmet protection.

        **Tip:** Always pick up a higher-level helmet when available.
    `,

    "Vests": `
        **Vests**

        * Level 1: Basic body protection.
        * Level 2: Improved damage protection.
        * Level 3: Highest standard vest protection.

        **Tip:** Check your vest durability and replace damaged vests.
    `,

    "Backpacks": `
        **Backpacks**

        * Level 1: Basic carrying capacity.
        * Level 2: Medium carrying capacity.
        * Level 3: Highest carrying capacity.

        **Tip:** Carry only the supplies you really need.
    `,

    "Healing Items": `
        **Healing Items**

        * Bandages restore a small amount of health.
        * First Aid Kits restore health up to 75%.
        * Med Kits restore health to 100%.
        * Energy Drinks and Painkillers help restore boost.

        **Tip:** Keep enough healing items for emergencies.
    `,

    "Weapon Attachments": `
        **Weapon Attachments**

        * Scopes help with aiming at different distances.
        * Grips help control recoil.
        * Extended magazines increase ammunition capacity.
        * Suppressors reduce firing noise.

        **Tip:** Choose attachments that suit your weapon and play style.
    `,
        // Help & FAQs
    "What is PUBG?": `
        **What is PUBG?**

        * PUBG stands for PlayerUnknown's Battlegrounds.
        * It is a battle royale game.
        * Players collect weapons and equipment.
        * The goal is to survive and become the last player or team.

    `,

    "Who developed PUBG?": `
        **Who developed PUBG?**

        * PUBG: Battlegrounds was developed by PUBG Studios.
        * PUBG Mobile was developed by LightSpeed & Quantum Studio in partnership with PUBG Studios.

    `,

    "What are PUBG maps?": `
        **What are PUBG maps?**

        * Erangel – An original battle royale map.
        * Miramar – A desert-themed map.
        * Sanhok – A tropical map.
        * Vikendi – A snow-themed map.

        **Tip:** Each map offers different terrain and gameplay strategies.
    `
};

// Display predefined answers instantly
function showPredefinedAnswer(question) {

    let response = predefinedAnswers[question];

    if (!response) {
        return;
    }

    let botMessage = document.createElement("div");

    botMessage.innerHTML = "<b>Bot:</b><br>" +
        response
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/^\s*\*\s+/gm, "• ")
            .replace(/\n/g, "<br>");

    chatBody.appendChild(botMessage);
    scrollToBottom();

    reopenCurrentMenu();
}

// Automatically scroll chatbot to the latest message
function scrollToBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Send menu questions to Gemini
function sendMenuQuestion(question) {

    isMenuQuestion = true;

    messageInput.value = question;

    sendButton.click();

}

function reopenCurrentMenu() {
    showMenu(currentMenu);
}
//Open and close chatbot
chatIcon.addEventListener("click", function() {

    if (chatContainer.style.display === "flex") {
        chatContainer.style.display = "none";
    }
    else {
        chatContainer.style.display = "flex";
    }

});

// Send message
sendButton.addEventListener("click", async function() {

    let message = messageInput.value.trim();
    let menuQuestion = isMenuQuestion;
    isMenuQuestion = false;

    if (message === "") {
        return;
    }
    // Hide welcome screen whenever user sends a message
    welcomeScreen.hidden = true;
    // Display user message
    let userMessage = document.createElement("p");
    userMessage.innerHTML = "<b>You:</b> ";
    userMessage.appendChild(document.createTextNode(message));
    chatBody.appendChild(userMessage);

    messageInput.value = "";
    // Get welcome screen and typed command
let command = message.toLowerCase().trim();

// Handle MAIN MENU command
if (command === "menu" || command === "main menu") {

    welcomeScreen.hidden = true;

    showMenu("main");
    scrollToBottom();
    return;
}

// Handle EXIT command
if (command === "exit") {

    // Clear all chat messages and menus
    chatBody.innerHTML = "";

    // Hide all menu panels
    menuPanels.forEach(function(panel) {
        panel.hidden = true;
    });

    // Show welcome message
    chatBody.appendChild(welcomeScreen);
    welcomeScreen.hidden = false;

    // Reset menu state
    currentMenu = "main";
    isMenuQuestion = false;

    // Clear input
    messageInput.value = "";

    return;
}
    // Handle greetings without calling Gemini
    if (/^(hi|hello|hey|hii|good morning|good afternoon|good evening)[!. ]*$/i.test(message)) {

        let botMessage = document.createElement("div");

        botMessage.innerHTML =
            "<b>Bot:</b><br>Hello! Welcome to PUBG Gaming Assistant 🎮. How can I help you today?";

        chatBody.appendChild(botMessage);

        scrollToBottom();

        return;
    }

    // Show loading message
    let loadingMessage = document.createElement("p");
    loadingMessage.innerHTML = "<b>Bot:</b> Thinking...";
    chatBody.appendChild(loadingMessage);

    scrollToBottom();

    let response;

    try {

        let result = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message,
                is_menu_question: menuQuestion
            })
        });

        let data = await result.json();

        if (!result.ok) {
            throw new Error(data.error || "Something went wrong");
        }

        response = data.reply;

    } catch (error) {

        console.error("Chatbot error:", error);

        response = "Sorry! I couldn't connect to the AI. Please try again.";
    }

    // Remove loading message
    loadingMessage.remove();

    // Display bot response
    let botMessage = document.createElement("div");

    botMessage.innerHTML = "<b>Bot:</b><br>" +
        response
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/^\s*\*\s+/gm, "• ")
            .replace(/\n/g, "<br>");
    chatBody.appendChild(botMessage);

    scrollToBottom();

    // Reopen submenu only for PUBG menu questions
    if (menuQuestion) {
        reopenCurrentMenu();
    }

});

// FAQ buttons
faqButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        let question = button.dataset.question;
        showPredefinedAnswer(question);
    });
});

// 6. Enter key support
messageInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        sendButton.click();
    }

});
