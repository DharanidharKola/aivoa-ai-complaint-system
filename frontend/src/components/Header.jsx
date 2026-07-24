import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import StatusChip from "./StatusChip";

export default function Header() {
    return (
        <AppBar
            position="static"
            color="inherit"
            elevation={1}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
        {/* Empty Box to balance the layout */}
        <Box width={140} />

        {/* Center Title */}
        <Box
            sx={{
                flex: 1,
                textAlign: "center"
            }}
        >
            <Typography
                variant="h4"
                fontWeight={700}
            >
                Log Customer Complaint
            </Typography>

            <Typography
                variant="subtitle1"
                color="text.secondary"
            >
                API & FDF Quality Assurance Module
            </Typography>
        </Box>


            </Toolbar>
        </AppBar>
    );
}