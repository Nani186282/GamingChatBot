
import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from google import genai
from flask_cors import CORS

# Load environment variables
load_dotenv()

# Initialize Flask
app = Flask(__name__)

CORS(app, resources={
    r"/chat": {"origins": "http://127.0.0.1:5500"}
})
# Get Gemini API key
api_key = os.getenv("GEMINI_API_KEY")

# Initialize Gemini client
client = genai.Client(
    api_key=api_key,
    http_options={"timeout": 60000}
)

# Home route
@app.route("/")
def home():
    return "PUBG Gaming Assistant Backend is Running!"

# Chat route
@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    if not data or not data.get("message", "").strip():
        return jsonify({
            "error": "Please enter a message."
        }), 400

    user_message = data["message"].strip()
    is_menu_question = data.get("is_menu_question", False)

    try:   
        if is_menu_question:
            gaming_instruction = """
                You are a PUBG Mobile assistant.
                Answer the selected menu topic about PUBG Mobile.
                Use 3-5 short bullet points.
                Be accurate and beginner-friendly.
                """

        else:

            gaming_instruction = """
                You are a universal gaming assistant.
                Answer questions about any video game.
                Identify the game and give game-specific information.
                If the game is unclear, ask the user.
                Use 3-5 short bullet points.
                Be accurate and beginner-friendly.
                """

        response = client.interactions.create(
            model="gemini-3.5-flash",
            input=gaming_instruction + "\n\nUser question: " + user_message
        )

        return jsonify({
            "reply": response.output_text
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)

