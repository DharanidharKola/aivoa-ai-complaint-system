import {
    Paper,
    Typography,
    Box,
    Chip,
    LinearProgress,
    Divider,
} from "@mui/material";

import {
    WarningAmber,
    CheckCircle,
    Error,
    ReportProblem,
} from "@mui/icons-material";

import { useSelector } from "react-redux";

export default function RiskCard() {

    const {
        risk,
        confidence
    } = useSelector(
        (state) => state.complaint
    );

    const getRiskColor = () => {

        switch (risk) {

            case "Low":
                return "success";

            case "Medium":
                return "warning";

            case "High":
                return "error";

            case "Critical":
                return "error";

            default:
                return "default";

        }

    };

    const getRiskIcon = () => {

        switch (risk) {

            case "Low":
                return <CheckCircle />;

            case "Medium":
                return <WarningAmber />;

            case "High":
                return <ReportProblem />;

            case "Critical":
                return <Error />;

            default:
                return <WarningAmber />;

        }

    };

    return (

        <Paper
            elevation={1}
            sx={{
                p:3,
                borderRadius:3,
                mb:3
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                gutterBottom
            >
                AI Risk Assessment
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
>

                <Typography>

                    Risk Level

                </Typography>

                <Chip

                    icon={getRiskIcon()}

                    label={risk || "Awaiting Analysis"}

                    color={getRiskColor()}

                    variant="filled"

                />

            </Box>

            <Box mt={3}>

                <Typography
                    variant="body2"
                    gutterBottom
                >
                    Confidence
                </Typography>

                <LinearProgress

                    variant="determinate"

                    value={confidence || 0}

                    sx={{
                        height: 10,
                        borderRadius: 5,
                    }}

                />

                <Typography
                    variant="caption"
                    color="text.secondary"
                >

                    {confidence || 0}%

                </Typography>

            </Box>

        </Paper>

    );

}