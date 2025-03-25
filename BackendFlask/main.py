from flask import Flask, jsonify
from flask_cors import CORS
from apscheduler.schedulers.background import BackgroundScheduler
import pandas as pd
import gspread
from google.oauth2.service_account import Credentials

app = Flask(__name__)

# Enable CORS
CORS(app)

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
]
creds = Credentials.from_service_account_file("credentials.json", scopes=SCOPES)
client = gspread.authorize(creds)

SHEET_ID = "1dTDd8Xwg3wv7MRHG2WAX_vXZKlEFne_rDMeemcHSD3s"
sheet = client.open_by_key(SHEET_ID).sheet1

# Global variable to store the data
global_df = None

def update_data():
    """Updates data from Google Sheets and updates the global DataFrame."""
    global global_df  # Declare that you're using the global DataFrame

    print("Updating data from Google Sheets...")

    try:
        # Get data from Google Sheets
        data = sheet.get_all_records()
        global_df = pd.DataFrame(data)

        # Save or process your data here, e.g., refresh the DataFrame in memory
        print(f"Updated data, fetched {len(global_df)} records.")
    except Exception as e:
        print(f"Error updating data: {e}")
        
# # Setup the scheduler
# scheduler = BackgroundScheduler()
# # Schedule the 'update_data' function to run once a day starting today
# scheduler.add_job(update_data, 'interval', days=1, start_date='2025-03-25 01:00:00')
# # Start the scheduler
# scheduler.start()

update_data()

@app.route("/")
def home():
    return "Welcome to the Data Dashboard API! Use /get_residents or /get_whatsapp_numbers to get data."

@app.route("/get_residents", methods=["GET"])
def get_residents():
    """Fetches all residents' data from the cached DataFrame"""
    if global_df is None:
        return jsonify({"error": "Data is not yet loaded, please try again later."}), 503
    return jsonify(global_df.to_dict(orient='records'))

@app.route("/get_whatsapp_numbers", methods=["GET"])
def get_whatsapp_numbers():
    """Returns list of WhatsApp numbers for alerts from the cached DataFrame"""
    if global_df is None:
        return jsonify({"error": "Data is not yet loaded, please try again later."}), 503
    df = global_df
    df["Would you like to receive important WhatsApp alerts?"] = df["Would you like to receive important WhatsApp alerts?"].astype(str).str.lower() == "yes"
    whatsapp_users = df[df["Would you like to receive important WhatsApp alerts?"]]
    numbers = whatsapp_users["Phone Number for WhatsApp Communication (Include Area Code e.g \"1\" for U.S. Numbers)"].tolist()
    return jsonify({"whatsapp_numbers": numbers})

if __name__ == "__main__":
    app.run(debug=True)
