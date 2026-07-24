import {
    Paper,
    Typography,
    Divider,
    Box
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";

import UploadArea from "./UploadArea";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import RiskCard from "./RiskCard";
import SummaryCard from "./SummaryCard";

export default function CopilotPanel() {

    return (

        <Paper
            elevation={3}
            sx={{
                height: "calc(100vh - 30px)",
                display: "flex",
                flexDirection: "column",
                borderRadius: 4,
                bgcolor: "#fff",
                boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
                overflow: "hidden"
            }}
        >

            {/* ================= HEADER ================= */}

            <Box
                sx={{
                    px: 3,
                    py: 2.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5
                }}
            >

                <SmartToyIcon
                    color="primary"
                    sx={{
                        fontSize: 32
                    }}
                />

                <Box>

                    <Typography
                        variant="h5"
                        fontWeight={700}
                    >
                        AIVOA Copilot
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        AI powered pharmaceutical quality assistant
                    </Typography>

                </Box>

            </Box>

            <Divider />

            {/* ================= Upload ================= */}

            <Box
                sx={{
                    p: 2.5
                }}
            >

                <UploadArea />

            </Box>

            <Divider />

            {/* ================= Scrollable Content ================= */}

            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    p: 2.5,

                    "&::-webkit-scrollbar": {
                        width: "7px"
                    },

                    "&::-webkit-scrollbar-track": {
                        background: "#f2f4f7"
                    },

                    "&::-webkit-scrollbar-thumb": {
                        background: "#c6c6c6",
                        borderRadius: "10px"
                    },

                    "&::-webkit-scrollbar-thumb:hover": {
                        background: "#999"
                    }
                }}
            >

                <ChatWindow />

                <Divider sx={{ my: 3 }} />

                <RiskCard />

                <Divider sx={{ my: 3 }} />

                <SummaryCard />

            </Box>

            <Divider />

            {/* ================= Footer ================= */}

            <Box
                sx={{
                    p: 2
                }}
            >

                <ChatInput />

            </Box>

        </Paper>

    );

}