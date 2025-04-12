# ========================= IMPORT LIBRARIES ========================= #
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import bcrypt
from PIL import Image
import io
import cv2
from tensorflow.keras.models import load_model
import numpy as np
from datetime import datetime
import google.generativeai as genai


# ========================= INITIALIZE APP ========================= #
app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:3000"}})


# ========================= LOAD CONFIGURATIONS ========================= #
API_KEY = "AIzaSyBp8xPFZ5Zn5hl3r9vAUcL0qzvXjxUaArI"               # API Key

# Configure Gemini AI
genai.configure(api_key=API_KEY)
gemini_model = genai.GenerativeModel("gemini-1.5-pro")


# Load Pneumonia Prediction Model
model = load_model("./OpenCV_CNN_pneumonia_model.h5")     # Load the model

# Define image size and classes
image_size = (128, 128)
classes = ['Pneumonia-Viral', 'COVID-19', 'Pneumonia-Bacterial', 'Normal']

# ========================= DATABASE CONNECTION ========================= #
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="pneumonia_prediction"
    )

# ========================= USER SIGNUP ========================= #
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not (name and email and password):
        return jsonify({"message": "All fields are required"}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO user_table (user_name, email, user_passw) VALUES (%s, %s, %s)", 
                       (name, email, hashed_password))
        conn.commit()
        return jsonify({"message": "User registered successfully!"}), 201
    except mysql.connector.IntegrityError:
        return jsonify({"message": "Email already exists!"}), 400
    finally:
        cursor.close()
        conn.close()

# ========================= USER LOGIN ========================= #
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not (email and password):
        return jsonify({"message": "Email and password are required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM user_table WHERE email = %s", (email,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if user and bcrypt.checkpw(password.encode('utf-8'), user["user_passw"].encode('utf-8')):
        user_data = {
            "id": user["id"],
            "name": user["user_name"],
            "email": user["email"],
            "total_case": user["total_case"],
            "total_check": user["total_check"],  # Fixed typo
            "last_check":str(user["last_checkup"])
        }
        return jsonify({"message": "Login successful", "user": user_data}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401
    
# ========================= IMAGE PROCESSING & PREDICTION ========================= #

# Function to process image and make prediction
def process_image(image_data):
    try:
        # Open image
        image = Image.open(io.BytesIO(image_data)).convert("L")  # Convert to grayscale
        img = np.array(image)

        # Resize image
        img = cv2.resize(img, (image_size[0], image_size[1]))
        img = img.reshape(1, image_size[0], image_size[1], 1) / 255.0  # Normalize

        # Make prediction
        prediction = model.predict(img)
        predicted_class = classes[np.argmax(prediction)]
        confidence = np.max(prediction) * 100

        return predicted_class, confidence

    except Exception as e:
        return str(e), None



@app.route("/upload/", methods=["POST"])
def predict_image():
    if "file" not in request.files:
        print("File not found in request.files")
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        print("File has no filename")
        return jsonify({"error": "Empty filename"}), 400

    user_id = request.form.get("user_id")
    if not user_id:
        print("User ID not provided")
        return jsonify({"error": "User ID is required"}), 400

    try:
        # Debug: Check if the file is received
        print("File received:", file.filename)
        file_data = file.read()  # Read the file data
        predicted_class, confidence = process_image(file_data)

        if confidence is None:
            return jsonify({"error": "Error processing image"}), 500

        conn = get_db_connection()
        cursor = conn.cursor()

        # Validate if user exists
        cursor.execute("SELECT id FROM user_table WHERE id = %s", (user_id,))
        user = cursor.fetchone()
        if not user:
            return jsonify({"error": "Invalid User ID"}), 400

        # Update user record
        cursor.execute("UPDATE user_table SET total_check = total_check + 1 WHERE id = %s", (user_id,))
        
        # Get current date and time
        current_date = datetime.now().strftime("%Y-%m-%d")  # Only Date
        current_time = datetime.now().strftime("%H:%M:%S")  # Only Time

        if predicted_class != "Normal":
            cursor.execute("UPDATE user_table SET total_case = total_case + 1 WHERE id = %s", (user_id,))
            cursor.execute("UPDATE user_table SET last_checkup = %s WHERE id = %s", (current_date, user_id))
            cursor.execute("INSERT INTO user_pneumonia  (id, pneumonia_name, checked_date, checked_time) VALUES (%s, %s, %s, %s)", 
               (user_id, predicted_class, current_date, current_time))


        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({
            "prediction": predicted_class,
            "confidence": f"{confidence:.2f}%"
        })

    except Exception as e:
        print("Error during prediction:", str(e))
        return jsonify({"error": str(e)}), 500
    
    
# ========================= GET USER DATA ========================= #
@app.route('/get_data', methods=['GET'])
def get_data():
    user_id = request.args.get("id")
    page = request.args.get("page")

    if not user_id:
        return jsonify({"error": "Missing id"}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        if page == "overview":
            cursor.execute("SELECT total_case, total_check, last_checkup FROM user_table WHERE id = %s", (user_id,))
            user = cursor.fetchone()

            if not user:
                return jsonify({"error": "User not found"}), 404

            updated_data = {
                "total_case": user["total_case"],
                "total_check": user["total_check"],
                "last_check": user["last_checkup"]
            }

        elif page == "healthRecord":
            cursor.execute("SELECT pneumonia_name, checked_date, checked_time FROM user_pneumonia WHERE id = %s", (user_id,))
            print("error\n")
            records = cursor.fetchall()

            if not records:
                return jsonify({"message": "No health records found"}), 404

            updated_data = [
                {
                    "pneumonia_name": record["pneumonia_name"],
                    "checked_date": str(record["checked_date"]),
                    "checked_time": str(record["checked_time"])
                }
                for record in records
            ]

        else:
            return jsonify({"error": "Invalid page parameter"}), 400

        return jsonify({"user": updated_data}), 200

    except Exception as e:
        print("Database Error:", str(e))  # Print the exact error in the terminal
        return jsonify({"error": str(e)}), 500


    finally:
        cursor.close()
        conn.close()
# ========================= GET Gemini Response ========================= #
@app.route('/gemini', methods=['POST'])
def get_gemini_response():
    data = request.json
    user_query = data.get("userQuestion")

    if not user_query:
        return jsonify({"error": "Query is required"}), 400

    try:
        response = gemini_model.generate_content(user_query)
        ai_response = response.text  # Extract text from response

        return jsonify({"response": ai_response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
