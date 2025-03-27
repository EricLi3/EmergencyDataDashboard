import React from "react";
import Deliverables from "../Deliverables/Deliverables";

const Workflow = () => {
    const deliverablesData = [
        {
            image: "/images/Onboarding.png",
            title: "Enrollment Form",
            subtitle: null,
            text: "This is the enrollment form for users to the Goyco Emergency Plan.",
            userLink: "https://forms.gle/VU8Kfc4ebhaBVkM88",
            editorLink: "https://docs.google.com/forms/d/1St-ysQXoN3uqIPpJBIMB_OEir59ghMUls2d52-kSaac/edit"
        },

        {
            image: "/images/WellnessCheck.png",
            title: "Wellness Check",
            subtitle: null,
            text: "This is the wellness check form for users enrolled in the Goyco Emergency Plan.",
            userLink: "https://forms.gle/qJUmPJ2e5qDvvPQb7",
            editorLink: "https://docs.google.com/forms/d/1_qHY8mxjrpwWcIgOvlc3I1kyVcVxAX22Adls88qrk1w/edit"
        },
        {
            image: "/images/MasterSheets.png",
            title: "Master Sheet",
            subtitle: null,
            text: "This Google Sheets contains all the data collected from the forms",
            userLink: "",
            editorLink: "https://docs.google.com/spreadsheets/d/1dTDd8Xwg3wv7MRHG2WAX_vXZKlEFne_rDMeemcHSD3s/edit?gid=1949800455#gid=1949800455"
        },
        {
            image: "/images/MasterMap2024.png",
            title: "Master Map",
            subtitle: null,
            text: "This Google MyMaps contains useful demographic information on residents.",
            userLink: "",
            editorLink: "https://docs.google.com/spreadsheets/d/1dTDd8Xwg3wv7MRHG2WAX_vXZKlEFne_rDMeemcHSD3s/edit?gid=1949800455#gid=1949800455"
        },
    ];

    return (
        <div>
            <h1>Forms → Sheets → Maps</h1>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {deliverablesData.map((data, index) => (
                    <Deliverables
                        key={index}
                        image={data.image}
                        title={data.title}
                        subtitle={data.subtitle}
                        text={data.text}
                        userLink={data.userLink}
                        editorLink={data.editorLink}
                    />
                ))}
            </div>
        </div>
    );
};

export default Workflow;
