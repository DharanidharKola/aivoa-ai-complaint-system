import { Box } from "@mui/material";

import Header from "../components/Header";
import ComplaintForm from "../components/ComplaintForm";
import CopilotPanel from "../components/CopilotPanel";
export default function Dashboard() {
    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#F7F8FC",
                overflow: "hidden",
            }}
        >
            <Header />

            <Box
                sx={{
                    flex: 1,
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "2.2fr 1fr",
                    },
                    gap: 2,
                    p: 2,
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        overflowY: "auto",
                        pr: 1,
                    }}
                >
                    <ComplaintForm />
                </Box>

                <Box
                    sx={{
                        overflow: "hidden",
                    }}
                >
                    <CopilotPanel />
                </Box>
            </Box>
        </Box>
    );
}