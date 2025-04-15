from flask import Flask, jsonify, request
import pandas as pd
import gspread
from google.oauth2.service_account import Credentials
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow all origins

# Google Sheets API setup
SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
creds = Credentials.from_service_account_file("credentials.json", scopes=SCOPES)
client = gspread.authorize(creds)

SHEET_ID = "1dTDd8Xwg3wv7MRHG2WAX_vXZKlEFne_rDMeemcHSD3s"

# Fetch the latest data from a specific sheet
def fetch_data(sheet_name):
    """Fetches the latest data from a specific sheet in Google Sheets into a DataFrame"""
    sheet = client.open_by_key(SHEET_ID).worksheet(sheet_name)
    data = sheet.get_all_records()
    return pd.DataFrame(data)

# Route: Fetch all residents
@app.route("/get_residents", methods=["GET"])
def get_residents():
    """Returns all residents' data directly from Google Sheets"""
    try:
        df = fetch_data("Enrollement")
        return jsonify(df.to_dict(orient='records'))
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# Route: Fetch WhatsApp numbers
@app.route("/get_whatsapp_numbers", methods=["GET"])
def get_whatsapp_numbers():
    """Returns list of WhatsApp numbers directly from Google Sheets"""
    try:
        df = fetch_data("Enrollement")

        # Ensure all values are strings before using .str operations
        df["Would you like to receive important WhatsApp alerts?"] = df["Would you like to receive important WhatsApp alerts?"].fillna('').astype(str).str.lower()
        
        # Filter only users who want WhatsApp alerts
        whatsapp_users = df[df["Would you like to receive important WhatsApp alerts?"].str.strip().str.lower() == "yes / sí"]
        
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
    
# Route: Fetch all inventory items
@app.route("/get_inventory", methods=["GET"])
def get_inventory():
    """Returns all inventory items from the Inventory sheet"""
    try:
        df = fetch_data("Inventory")  # Replace "Inventory" with your sheet name
        return jsonify(df.to_dict(orient='records'))
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Route: Add a new inventory item
@app.route("/add_inventory_item", methods=["POST"])
def add_inventory_item():
    """Adds a new item to the Inventory sheet"""
    try:
        data = request.json
        item_name = data.get("Item name")
        quantity = data.get("Quantity")
        description = data.get("Description")

        if not item_name or quantity is None:
            return jsonify({"error": "Item name, Quantity, and Description are required"}), 400

        sheet = client.open_by_key(SHEET_ID).worksheet("Inventory")
        sheet.append_row([item_name, quantity, description])  # Append description
        return jsonify({"message": "Item added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route: Update an inventory item
@app.route("/update_inventory_item/<int:row_id>", methods=["PUT"])
def update_inventory_item(row_id):
    """Updates an inventory item in the Inventory sheet"""
    try:
        data = request.json
        item_name = data.get("Item name")
        quantity = data.get("Quantity")
        description = data.get("Description")  # New field

        if not item_name or quantity is None:
            return jsonify({"error": "Item name, Quantity, and Description are required"}), 400

        sheet = client.open_by_key(SHEET_ID).worksheet("Inventory")
        sheet.update(f'A{row_id}:C{row_id}', [[item_name, quantity, description]])  # Update description
        return jsonify({"message": "Item updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Route: Delete an inventory item
@app.route("/delete_inventory_item/<int:row_id>", methods=["DELETE"])
def delete_inventory_item(row_id):
    """Deletes an inventory item from the Inventory sheet"""
    try:
        sheet = client.open_by_key(SHEET_ID).worksheet("Inventory")
        sheet.delete_rows(row_id)
        return jsonify({"message": "Item deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Important Phone Number groups

# Route: Fetch all inventory items
@app.route("/get_groups", methods=["GET"])
def get_groups():
    """Returns all Phone Number Groups from the Important_Contacts_Groups sheet"""
    try:
        df = fetch_data("Important_Contact_Groups")  # Replace "Inventory" with your sheet name
        return jsonify(df.to_dict(orient='records'))
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Route: Add a new inventory item
@app.route("/add_contact_group", methods=["POST"])
def add_contact_group():
    """Adds a new group to the Important_Contacts_Groups sheet"""
    try:
        data = request.json
        item_name = data.get("Group_Name")
        quantity = data.get("Phone_Numbers")

        if not item_name or quantity is None:
            return jsonify({"error": "Group_Name and Phone_Numbers are required"}), 400

        sheet = client.open_by_key(SHEET_ID).worksheet("Important_Contact_Groups")
        sheet.append_row([item_name, quantity])
        return jsonify({"message": "Group added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route: Update an inventory item
@app.route("/update_contact_group/<int:row_id>", methods=["PUT"])
def update_contact_group(row_id):
    """Updates a contact group the Important_Contact_Groups sheet"""
    try:
        data = request.json
        item_name = data.get("Group_Name")
        quantity = data.get("Phone_Numbers")

        if not item_name or quantity is None:
            return jsonify({"error": "Group_Name and Phone_Numbers are required"}), 400

        sheet = client.open_by_key(SHEET_ID).worksheet("Important_Contact_Groups")
        sheet.update(f'A{row_id}:B{row_id}', [[item_name, quantity]])
        return jsonify({"message": "Group updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Route: Delete an inventory item
@app.route("/delete_contact_group/<int:row_id>", methods=["DELETE"])
def delete_contact_group(row_id):
    """Deletes a contact group from the Important_Contact_Groups sheet"""
    try:
        sheet = client.open_by_key(SHEET_ID).worksheet("Important_Contact_Groups")
        sheet.delete_rows(row_id)
        return jsonify({"message": "Contact Group deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == "__main__":
    app.run(debug=True)
    