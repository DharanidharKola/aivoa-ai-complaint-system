import { useState } from "react";

import {
    Paper,
    Typography,
    Button,
    Stack,
    Snackbar,
    Alert,
    LinearProgress
} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";

import { useDispatch } from "react-redux";

import api from "../services/api";

import { setComplaint } from "../redux/complaintSlice";

export default function UploadArea() {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const [snackbar, setSnackbar] = useState({

        open: false,

        message: "",

        severity: "success"

    });

    const handleUpload = async (event) => {

        const file = event.target.files[0];

        if (!file) return;

        try {

            setLoading(true);

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
            console.log("========== BACKEND RESPONSE ==========");
                console.log(response.data);

                console.log("Complaint:", response.data.complaint);

                console.log(
                    "Complaint Category:",
                    response.data.complaint.complaint_category
                );

                console.log("======================================");

            dispatch(

                setComplaint(response.data)

            );

            setSnackbar({

                open: true,

                severity: "success",

                message: "Complaint processed successfully."

            });

        }

        catch (error) {

            console.error(error);

            setSnackbar({

                open: true,

                severity: "error",

                message: "Failed to process complaint."

            });

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <Paper

            elevation={0}

            sx={{

                p:2,

                m:2,

                border:"2px dashed #D6DAE6",

                borderRadius:3,

                bgcolor:"#FAFBFD"

            }}

        >

            <Typography

                variant="h6"

                fontWeight={700}

                gutterBottom

            >

                Upload Complaint Document

            </Typography>

            <Typography

                variant="body2"

                color="text.secondary"

                mb={2}

            >

                Upload PDF, DOCX or TXT files.

                AI will automatically extract complaint details.

            </Typography>

            {

                loading && (

                    <LinearProgress

                        sx={{

                            mb:2

                        }}

                    />

                )

            }

            <Stack spacing={2}>

                <Button

                    component="label"

                    variant="contained"

                    startIcon={<UploadFileIcon />}

                    fullWidth

                    disabled={loading}

                    sx={{

                        py:1.5,

                        borderRadius:2,

                        textTransform:"none"

                    }}

                >

                    {

                        loading

                        ?

                        "Processing..."

                        :

                        "Choose Document"

                    }

                    <input

                        hidden

                        type="file"

                        accept=".pdf,.doc,.docx,.txt"

                        onChange={handleUpload}

                    />

                </Button>

                <Typography

                    variant="caption"

                    align="center"

                    color="text.secondary"

                >

                    Supported Formats

                    <br/>

                    PDF • DOCX • TXT

                </Typography>

            </Stack>

            <Snackbar

                open={snackbar.open}

                autoHideDuration={3000}

                onClose={()=>

                    setSnackbar({

                        ...snackbar,

                        open:false

                    })

                }

                anchorOrigin={{

                    vertical:"bottom",

                    horizontal:"right"

                }}

            >

                <Alert

                    severity={snackbar.severity}

                    variant="filled"

                    sx={{

                        width:"100%"

                    }}

                >

                    {snackbar.message}

                </Alert>

            </Snackbar>

        </Paper>

    );

}