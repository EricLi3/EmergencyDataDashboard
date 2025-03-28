import React from "react";

const Broadcast = () => {
  
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

      <a href="https://drive.google.com/file/d/1KBD1nOf86jgfCiY_Du76m2Aqv5766WB_/view?usp=sharing" target="_blank" rel="noopener noreferrer">
        <img
          src="/images/downloadForWindows.png"
          alt="Download Executable"
          style={{ cursor: "pointer", marginTop: "20px" }}
        />
      </a>

      <p><b>For mac users: </b>Go to the location this file was downloaded and open a terminal. Type <b>"chmod +x ./gui"</b> to make the file runnable. Press the enter key and then type <b>"./gui" </b>. 
      </p>
  
      <p>
      If the above doesn't work, please go into settings, Now, go to System Settings/Privacy & Security and click Open Anyway if the ./gui has appeared under Security. From there, enter "./gui" again and follow the instructions on the application. </p>

      <img src="/images/allowanways.png" alt="Allow Anyway" style={{ marginTop: "20px", marginBottom:"20px", maxWidth: "30%" }} />

      <p><b>For Window users: </b>Go to where you download the zip file and double click on the folder. Inside the folder there should be a "gui.exe" file. Double click on this file. If you get a warning, click "More info" and then hit the "Run anyway" button.</p>
      <div>
        <img src="/images/warning_message.png" alt="Allow Anyway" style={{ marginTop: "20px", marginBottom:"20px", maxWidth: "30%" }} />
        <img src="/images/windows_run_anyway.png" alt="Allow Anyway" style={{ marginTop: "20px", marginBottom:"20px", maxWidth: "30%" }} />        
      </div>
    </div>
  );
};

export default Broadcast;
