import React from "react";

const Broadcast = () => {

  // const handleFileUpload = async (file, type) => {
  //   const formData = new FormData();
  //   formData.append("file", file);

  //   try {
  //     const response = await axios.post("/upload", formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     if (type === "numbers") setNumbersFile(response.data.file_path);

  //     console.log(response.data.file_path);
  //     console.log(response.data.message);
  //     if (type === "image") setImageFile(response.data.file_path);
  //     setStatus(response.data.message);
  //   } catch (error) {
  //     setStatus("Error uploading file");
  //   }
  // };

  // const handleSendMessages = async () => {
  //   console.log(numbersFile, message, imageFile);
  //   if (!numbersFile || (!message && !imageFile)) {
  //     setStatus("Please provide all required inputs");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post("/send-messages", {
  //       numbers_file: numbersFile,
  //       message,
  //       image_path: imageFile,
  //     });
  //     setStatus(response.data.message);
  //   } catch (error) {
  //     setStatus("Error sending messages");
  //   }
  // };
  // const handleSendMessages = async () => {
  //   console.log(numbersFile, message, imageFile);
  //   if (!numbersFile || (!message && !imageFile)) {
  //     setStatus("Please provide all required inputs");
  //     return;
  //   }

  //   if (!numbersFile) {
  //     setStatus("❌ Please upload a valid numbers file.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.get("/get_whatsapp_numbers");
  //     const phoneNumbers = response.data.whatsapp_numbers;

  //     if (phoneNumbers.length === 0) {
  //       setStatus("❌ No valid WhatsApp numbers found.");
  //       return;
  //     }

  //     setStatus("📩 Opening WhatsApp Web...");
  //     phoneNumbers.forEach((number, index) => {
  //       setTimeout(() => {
  //         const encodedMessage = encodeURIComponent(message);
  //         const url = `https://wa.me/${number}?text=${encodedMessage}`;
  //         window.open(url, "_blank");
  //       }, index * 3000); // Opens a new tab every 3 seconds
  //     });

  //     setStatus(`✅ Opened ${phoneNumbers.length} WhatsApp chats.`);
  //   } catch (error) {
  //     setStatus("❌ Error fetching WhatsApp numbers.");
  //   }
  // };
  
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Broadcast Messages</h1>
      {/* insert a button to download executable */}
      <h2>Please click the link below to download a Whatsapp broadcast application</h2>
      
      <a href="https://drive.google.com/file/d/1yi5rsBim-xESrA14xWdtVFo_dP4Jh9V-/view?usp=sharing" target="_blank" rel="noopener noreferrer">
        <img
          src="/images/downloadForMac.png"
          alt="Download Executable"
          style={{ cursor: "pointer", marginTop: "20px" }}
        />
      </a>

      <p><b>For mac users: </b>Go to the location this file was downloaded and open a terminal. Type <b>"chmod +x ./gui"</b> to make the file runnable. Press the enter key and then type <b>"./gui" </b>. 
      </p>

      <p>
      If the above doesn't work, please go into settings, Now, go to System Settings - Privacy & Security and click Open Anyway if the ./gui has appeared under Security. From there, enter "./gui" again and follow the instructions on the application. </p>

      <img src="/images/allowanways.png" alt="Allow Anyway" style={{ marginTop: "20px", marginBottom:"20px", maxWidth: "30%" }} />
    </div>
  );
};

export default Broadcast;
