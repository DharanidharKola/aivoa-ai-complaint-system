import React, { useEffect, useState } from "react";

import {
    Paper,
    Typography,
    Grid,
    TextField,
    MenuItem,
    Button,
    Divider,
    Stack,
    Chip,
    Snackbar,
    Alert,
    Box,
    CircularProgress
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import VerifiedIcon from "@mui/icons-material/Verified";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

const API = "http://localhost:8000";

export default function ComplaintForm() {

    const dispatch = useDispatch();

    const complaint = useSelector(
        state => state.complaint
    );

    const [loading,setLoading] = useState(false);

    const [open,setOpen] = useState(false);

    const [severity,setSeverity] = useState("warning");

    const [message,setMessage] = useState("");

    const [formData,setFormData]=useState({

        product_name:"",

        product_strength:"",

        batch_number:"",

        affected_quantity:"",

        manufacturing_date:"",

        expiry_date:"",

        originating_site_block:"",

        impacted_npm:"",

        complaint_source:"",

        customer_name:"",

        customer_email:"",

        customer_phone:"",

        complaint_category:"",

        complaint_description:"",

        structured_summary:"",

        risk:"",

        suggested_action:"",

        confidence:""

    });
    useEffect(() => {

    if (!complaint) return;

    const formatDate = (value) => {

        if (!value) return "";

        const date = new Date(value);

        if (isNaN(date)) return "";

        return date.toISOString().split("T")[0];
    };
const normalizeComplaintSource = (value) => {

    switch (value) {

        case "Email":
            return "Customer";

        case "Mail":
            return "Customer";

        case "Phone":
            return "Customer";

        default:
            return value || "";
    }

};
    setFormData(prev => ({

        ...prev,

        ...complaint,

        risk: complaint.risk || "",

        suggested_action:
        complaint.recommended_action || "",

        structured_summary:
            complaint.summary || "",

        complaint_source: normalizeComplaintSource(
        complaint.complaint_source),

        manufacturing_date: formatDate(complaint.manufacturing_date),
        complaint_category: complaint.complaint_category || "",

        expiry_date: formatDate(complaint.expiry_date)

    }));

}, [complaint]);



    const handleChange=(e)=>{

        const{

            name,

            value

        }=e.target;

        setFormData(prev=>({

            ...prev,

            [name]:value

        }));

    };



    const handleSubmit=async()=>{

        try{

            setLoading(true);
            console.log("Submitting Form Data:");
            console.log(formData);
            const res=await axios.post(

                `${API}/complaints/`,

                formData

            );

            setSeverity("success");

            setMessage("Complaint committed successfully.");

            setOpen(true);

        }

        catch(error){

            setSeverity("error");

            setMessage("Unable to save complaint.");

            setOpen(true);

        }

        finally{

            setLoading(false);

        }

    };



    return (

    <Paper
    elevation={3}
    sx={{
        width: "100%",
        minHeight: "100%",
        p: 4,
        borderRadius: 4,
        bgcolor: "#fff",
        boxShadow: "0 8px 24px rgba(15,23,42,0.08)"
    }}
>

        {/* ======================================
                    HEADER
        ====================================== */}

        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
                mb: 4
            }}
        >

            <Box>

                <Typography
                    variant="h5"
                    fontWeight={700}
                >
                    Pharmaceutical Complaint Form
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                >
                    Review and validate AI extracted complaint information before saving.
                </Typography>

            </Box>


        </Stack>

        <Divider sx={{ mb: 4 }} />
         {/* ======================================
        PRODUCT & BATCH INFORMATION
====================================== */}

<Typography
    variant="h6"
    fontWeight={700}
    sx={{ mb: 3 }}
>
    1. Product & Batch Identification
</Typography>

<Grid
    container
    spacing={3}
    sx={{ mb: 5 }}
>

    <Grid item xs={12} md={3}>
        <TextField
            size="small"
            fullWidth
            label="Product Name"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
        />
    </Grid>

    <Grid item xs={12} md={3}>
        <TextField
            size="small"
            fullWidth
            label="Batch Number"
            name="batch_number"
            value={formData.batch_number}
            onChange={handleChange}
        />
    </Grid>

    <Grid item xs={12} md={3}>
        <TextField
            size="small"
            fullWidth
            label="Product Strength"
            name="product_strength"
            value={formData.product_strength}
            onChange={handleChange}
        />
    </Grid>

    <Grid item xs={12} md={3}>
        <TextField
            size="small"
            fullWidth
            label="Affected Quantity"
            name="affected_quantity"
            value={formData.affected_quantity}
            onChange={handleChange}
        />
    </Grid>

    <Grid item xs={12} md={3}>
        <TextField
            size="small"
            fullWidth
            type="date"
            label="Manufacturing Date"
            slotProps={{
                inputLabel: {
                    shrink: true
                }
            }}
            name="manufacturing_date"
            value={formData.manufacturing_date}
            onChange={handleChange}
        />
    </Grid>

    <Grid item xs={12} md={3}>
        <TextField
            size="small"
            fullWidth
            type="date"
            label="Expiry Date"
            slotProps={{
                inputLabel: {
                    shrink: true
                }
            }}
            name="expiry_date"
            value={formData.expiry_date}
            onChange={handleChange}
        />
    </Grid>

</Grid>

<Divider sx={{ mb: 4 }} />
 {/* ======================================
        FACILITY & MATERIAL IMPACT
====================================== */}

<Typography
    variant="h6"
    fontWeight={700}
    sx={{ mb: 3 }}
>
    2. Facility & Material Impact
</Typography>

<Grid
    container
    spacing={3}
    sx={{ mb: 5 }}
>

    <Grid item xs={12} md={7}>
        <TextField
            size="small"
            fullWidth
            label="Originating Site Block"
            name="originating_site_block"
            value={formData.originating_site_block}
            onChange={handleChange}
        />
    </Grid>

    <Grid item xs={12} md={5}>
        <TextField
            size="small"
            fullWidth
            label="Impacted Non-Product Material"
            name="impacted_npm"
            value={formData.impacted_npm}
            onChange={handleChange}
        />
    </Grid>

</Grid>

<Divider sx={{ mb: 4 }} />

{/* ======================================
        CUSTOMER INFORMATION
====================================== */}

<Typography
    variant="h6"
    fontWeight={700}
    sx={{ mb: 3 }}
>
    3. Customer Information
</Typography>

<Grid
    container
    spacing={3}
    sx={{ mb: 5 }}
>

    <Grid item xs={12} md={2}>
        <TextField
            size="small"
            select
            fullWidth
            label="Source"
            name="complaint_source"
            value={
                [
                    "Customer",
                    "Distributor",
                    "Hospital",
                    "Pharmacy",
                    "Internal QA"
                ].includes(formData.complaint_source)
                    ? formData.complaint_source
                    : "Customer"
            }
            onChange={handleChange}
        >
            <MenuItem value="Customer">Customer</MenuItem>
            <MenuItem value="Distributor">Distributor</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="Pharmacy">Pharmacy</MenuItem>
            <MenuItem value="Internal QA">Internal QA</MenuItem>
        </TextField>
    </Grid>

    <Grid item xs={12} md={3}>
        <TextField
            size="small"
            fullWidth
            label="Customer Name"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleChange}
        />
    </Grid>

    <Grid item xs={12} md={4}>
        <TextField
            size="small"
            fullWidth
            label="Customer Email"
            name="customer_email"
            value={formData.customer_email}
            onChange={handleChange}
        />
    </Grid>

    <Grid item xs={12} md={3}>
        <TextField
            size="small"
            fullWidth
            label="Customer Phone"
            name="customer_phone"
            value={formData.customer_phone}
            onChange={handleChange}
        />
    </Grid>

</Grid>

<Divider sx={{ mb: 4 }} />

{/* ======================================
        DEFECT ANALYSIS
====================================== */}

<Typography
    variant="h6"
    fontWeight={700}
    sx={{ mb: 3 }}
>
    4. Defect Analysis
</Typography>

<Grid
    container
    spacing={3}
    sx={{ mb: 5 }}
>

    <Grid item xs={12} md={3}>
        <TextField
            size="small"
            select
            fullWidth
            label="Complaint Category"
            name="complaint_category"
            value={formData.complaint_category}
            onChange={handleChange}
        >

            <MenuItem value="Packaging Defect">
                Packaging Defect
            </MenuItem>

            <MenuItem value="Labeling Issue">
                Labeling Issue
            </MenuItem>

            <MenuItem value="Appearance Defect">
                Appearance Defect
            </MenuItem>

            <MenuItem value="Contamination">
                Contamination
            </MenuItem>

            <MenuItem value="Leakage">
                Leakage
            </MenuItem>

            <MenuItem value="Capsule Defect">
                Capsule Defect
            </MenuItem>

            <MenuItem value="Tablet Defect">
                Tablet Defect
            </MenuItem>

            <MenuItem value="Foreign Particle">
                Foreign Particle
            </MenuItem>

            <MenuItem value="Other">
                Other
            </MenuItem>

        </TextField>
    </Grid>

    <Grid item xs={12} md={5}>
        <TextField
            size="small"
            fullWidth
            multiline
            rows={8}
            label="Complaint Description"
            name="complaint_description"
            value={formData.complaint_description}
            onChange={handleChange}
        />
    </Grid>

    <Grid item xs={12} md={4}>
        <TextField
            size="small"
            fullWidth
            multiline
            rows={8}
            label="Structured Defect Summary"
            name="structured_summary"
            value={formData.structured_summary}
            onChange={handleChange}
        />
    </Grid>

</Grid>

<Divider sx={{ mb: 4 }} />

{/* ======================================
        AI RISK ASSESSMENT
====================================== */}

<Typography
    variant="h6"
    fontWeight={700}
    sx={{ mb: 3 }}
>
    5. AI Risk Assessment
</Typography>

<Grid
    container
    spacing={3}
>

    <Grid item xs={12} md={3}>
        <TextField
            size="small"
            select
            fullWidth
            label="Risk Level"
            name="risk"
            value={formData.risk}
            onChange={handleChange}
        >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Critical">Critical</MenuItem>
        </TextField>
    </Grid>

    <Grid item xs={12} md={6}>
        <TextField
            size="small"
            fullWidth
            label="Suggested CAPA Action"
            name="suggested_action"
            value={formData.suggested_action}
            onChange={handleChange}
        />
    </Grid>

    <Grid item xs={12} md={3}>
        <TextField
            size="small"
            fullWidth
            label="Confidence (%)"
            name="confidence"
            value={formData.confidence}
            onChange={handleChange}
        />
    </Grid>

</Grid>

{/* ======================================
        REVIEW & SUBMIT
====================================== */}

<Divider sx={{ my: 5 }} />

<Box
    sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 3
    }}
>

    <Stack spacing={0.5}>

        <Typography
            variant="h6"
            fontWeight={700}
        >
            Ready for Submission
        </Typography>

        <Typography
            variant="body2"
            color="text.secondary"
        >
            Verify AI extracted information before committing to the QMS Ledger.
        </Typography>

    </Stack>

    <Chip
        icon={<VerifiedIcon />}
        color="success"
        label="AI Verified"
        sx={{
            height: 38,
            fontWeight: 600,
            px: 1
        }}
    />

</Box>

<Box mt={4}>

    <Button

        variant="contained"

        fullWidth

        size="large"

        startIcon={
            loading
                ? <CircularProgress color="inherit" size={22} />
                : <SaveIcon />
        }

        disabled={loading}

        onClick={handleSubmit}

        sx={{

            py: 1.8,

            fontSize: "1rem",

            fontWeight: 700,

            borderRadius: 3,

            textTransform: "none"

        }}

    >

        {

            loading

                ? "Saving Complaint..."

                : "Commit to QMS Ledger"

        }

    </Button>

</Box>
<Snackbar

    open={open}

    autoHideDuration={4000}

    onClose={() => setOpen(false)}

    anchorOrigin={{

        vertical: "bottom",

        horizontal: "right"

    }}

>

    <Alert

        severity={severity}

        variant="filled"

        sx={{

            width: "100%",

            borderRadius: 2

        }}

    >

        {message}

    </Alert>

</Snackbar>

        </Paper>

    );

}