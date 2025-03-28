from flask import Flask, jsonify, request
import pandas as pd
import gspread
from google.oauth2.service_account import Credentials
from flask_cors import CORS
import pywhatkit as pk
import os
import threading

app = Flask(__name__)
CORS(app)  # Allow all origins

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Google Sheets API setup
SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
creds = Credentials.from_service_account_file("credentials.json", scopes=SCOPES)
client = gspread.authorize(creds)

SHEET_ID = "1dTDd8Xwg3wv7MRHG2WAX_vXZKlEFne_rDMeemcHSD3s"

# Fetch the latest data from Google Sheets
def fetch_data():
    """Fetches the latest data from Google Sheets into a DataFrame"""
    sheet = client.open_by_key(SHEET_ID).sheet1
    data = sheet.get_all_records()
    return pd.DataFrame(data)

# Route: Fetch all residents
@app.route("/get_residents", methods=["GET"])
def get_residents():
    """Returns all residents' data directly from Google Sheets"""
    try:
        df = fetch_data()
        return jsonify(df.to_dict(orient='records'))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route: Fetch WhatsApp numbers
@app.route("/get_whatsapp_numbers", methods=["GET"])
def get_whatsapp_numbers():
    """Returns list of WhatsApp numbers directly from Google Sheets"""
    try:
        df = fetch_data()

        # Ensure all values are strings before using .str operations
        df["Would you like to receive important WhatsApp alerts?"] = df["Would you like to receive important WhatsApp alerts?"].fillna('').astype(str).str.lower()
        
        # Filter only users who want WhatsApp alerts
        whatsapp_users = df[df["Would you like to receive important WhatsApp alerts?"] == "yes"]
        
        # Extract WhatsApp numbers
        numbers = whatsapp_users["Phone Number"].tolist()
        
        return jsonify({"whatsapp_numbers": numbers})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/update_resident/<int:row_id>", methods=["PUT"])
def update_resident(row_id):
    """Updates a resident's data in Google Sheets"""
    try:
        data = request.json
        sheet = client.open_by_key(SHEET_ID).sheet1
        sheet.update(f'A{row_id}:Z{row_id}', [list(data.values())])
        return jsonify({"message": "Resident updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/delete_resident/<int:row_id>", methods=["DELETE"])
def delete_resident(row_id):
    """Deletes a resident's data from Google Sheets"""
    try:
        sheet = client.open_by_key(SHEET_ID).sheet1
        sheet.delete_rows(row_id)
        return jsonify({"message": "Resident deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)
    return jsonify({"message": "File uploaded successfully", "file_path": file_path})

@app.route("/send-messages", methods=["POST"])
def send_messages():
    data = request.json
    numbers_file = data.get("numbers_file")
    message = data.get("message")
    image_path = data.get("image_path")

    if not numbers_file:
        return jsonify({"error": "Numbers file is required"}), 400

    if not message and not image_path:
        return jsonify({"error": "Message or image is required"}), 400

    # Load phone numbers from the file
    try:
        with open(numbers_file, "r") as file:
            phone_numbers = [line.strip() for line in file if line.strip()]
    except FileNotFoundError:
        return jsonify({"error": "Numbers file not found"}), 400

    if not phone_numbers:
        return jsonify({"error": "No phone numbers found in the file"}), 400

    def send():
        for number in phone_numbers:
            try:
                if message:
                    pk.sendwhatmsg_instantly(number, message)

                if image_path and os.path.exists(image_path):
                    pk.sendwhats_image(number, image_path, "Image Sent")

            except Exception as e:
                print(f"Error sending to {number}: {e}")

    # Use threading to avoid blocking the server
    threading.Thread(target=send).start()

    return jsonify({"message": f"Broadcast started for {len(phone_numbers)} contacts"})

if __name__ == "__main__":
    app.run(debug=True)
    