from flask import Flask, jsonify
import pandas as pd
import gspread
from google.oauth2.service_account import Credentials

app = Flask(__name__)

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
]
creds = Credentials.from_service_account_file("credentials.json", scopes=SCOPES)
client = gspread.authorize(creds)

SHEET_ID = "1dTDd8Xwg3wv7MRHG2WAX_vXZKlEFne_rDMeemcHSD3s"
sheet = client.open_by_key(SHEET_ID).sheet1

@app.route("/")
def home():
    return "Welcome to the Data Dashboard API! Use /get_residents or /get_whatsapp_numbers to get data."

@app.route("/get_residents", methods=["GET"])
def get_residents():
    """Fetches all residents' data from Google Sheets"""
    data = sheet.get_all_records()
    return jsonify(data)

@app.route("/get_whatsapp_numbers", methods=["GET"])
def get_whatsapp_numbers():
    """Returns list of WhatsApp numbers for alerts"""
    data = sheet.get_all_records()
    df = pd.DataFrame(data)
    df["Would you like to receive important WhatsApp alerts?"] = df["Would you like to receive important WhatsApp alerts?"].str.lower() == "yes"
    whatsapp_users = df[df["Would you like to receive important WhatsApp alerts?"]]
    numbers = whatsapp_users["Phone Number for WhatsApp Communication (Include Area Code e.g \"1\" for U.S. Numbers)"].tolist()
    return jsonify({"whatsapp_numbers": numbers})

if __name__ == "__main__":
    app.run(debug=True)
