import axios from "axios";

/*
==========================================================
Axios Instance
==========================================================
*/

const api = axios.create({

    baseURL: "http://localhost:8000",

    timeout: 60000,

    headers: {

        "Content-Type": "application/json"

    }

});

/*
==========================================================
Upload Complaint Document
PDF / DOCX / TXT
==========================================================
*/

export const uploadDocument = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(

        "/upload/pdf",

        formData,

        {

            headers: {

                "Content-Type": "multipart/form-data"

            }

        }

    );

    return response.data;

};

/*
==========================================================
AI Chat
==========================================================
*/

export const sendChatMessage = async (message) => {

    const response = await api.post(

        "/chat",

        {

            message

        }

    );

    return response.data;

};

/*
==========================================================
Save Complaint
==========================================================
*/

export const saveComplaint = async (complaintData) => {

    const response = await api.post(

        "/complaints",

        complaintData

    );

    return response.data;

};

/*
==========================================================
Get All Complaints
==========================================================
*/

export const getComplaints = async () => {

    const response = await api.get(

        "/complaints"

    );

    return response.data;

};

/*
==========================================================
Get Complaint By ID
==========================================================
*/

export const getComplaint = async (id) => {

    const response = await api.get(

        `/complaints/${id}`

    );

    return response.data;

};

/*
==========================================================
Delete Complaint
==========================================================
*/

export const deleteComplaint = async (id) => {

    const response = await api.delete(

        `/complaints/${id}`

    );

    return response.data;

};

/*
==========================================================
Health Check
==========================================================
*/

export const checkBackend = async () => {

    const response = await api.get("/");

    return response.data;

};


/*
==========================================================
Export Default
==========================================================
*/

export default api;