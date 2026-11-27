# PUBG Gaming Chatbot 🎮

An interactive PUBG Gaming Assistant built using HTML, CSS, JavaScript, Python Flask and Google's Gemini AI.

## Features

- AI-powered chatbot using Google Gemini.
- PUBG-specific menu and submenu navigation.
- Predefined answers for PUBG weapons, maps, game modes, strategies and equipment.
- AI responses for general gaming questions.
- Instant responses for greetings.
- Main menu and exit commands.
- Responsive chatbot interface.
- Enter key support for sending messages.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Python
- Flask
- Google Gemini API

## Project Structure

```text
GamingChatBot/
│
├── app.py
├── index.html
├── style.css
├── script.js
├── .env
└── .gitignore
```

## Setup Instructions

1. Clone the repository.
2. Install the required Python packages:

```bash
pip install flask flask-cors google-genai python-dotenv
```

3. Create a `.env` file and add your Gemini API key:

```text
GEMINI_API_KEY=your_api_key_here
```

4. Start the Flask backend:

```bash
python app.py
```

5. Open `index.html` using VS Code Live Server.

## Note

The Gemini API key must be stored securely in the `.env` file. Never upload it to GitHub.

## Author

Gaming Chatbot Project