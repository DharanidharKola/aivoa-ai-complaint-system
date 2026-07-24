import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    // Complaint Form Fields
    product_name: "",
    product_strength: "",
    batch_number: "",
    affected_quantity: "",
    manufacturing_date: "",
    expiry_date: "",
    originating_site_block: "",
    impacted_npm: "",
    complaint_source: "",
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    complaint_category: "",
    complaint_description: "",

    // AI Results
    risk: "",

    summary: "",

    confidence: 0,

    recommended_action: ""

};

const complaintSlice = createSlice({

    name: "complaint",

    initialState,

    reducers: {

        setComplaint(state, action) {

            const payload = action.payload;

            return {

                ...state,

                ...payload.complaint,

                risk: payload.risk,

                summary: payload.summary,

                confidence: payload.confidence,

                recommended_action: payload.recommended_action

            };

        },

        clearComplaint() {

            return initialState;

        }

    }

});

export const {

    setComplaint,

    clearComplaint

} = complaintSlice.actions;

export default complaintSlice.reducer;