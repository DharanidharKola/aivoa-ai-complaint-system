import {
    Paper,
    Typography,
    Divider,
    Box,
    Chip,
} from "@mui/material";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import { useSelector } from "react-redux";

export default function SummaryCard() {

    const {

        summary,

        recommended_action

    } = useSelector(

        (state) => state.complaint

    );

    return (

        <Paper
            elevation={1}
            sx={{
                p:3,
                borderRadius:3
            }}
        >

            <Typography

                variant="h6"

                fontWeight={700}

            >

                AI Summary

            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography

                variant="body2"

                color="text.secondary"

                sx={{

                    whiteSpace: "pre-wrap",

                    minHeight: 100,

                }}

            >

                {

                    summary ||

                    "Upload a complaint document or chat with the AI to generate a summary."

                }

            </Typography>

            <Box
    sx={{
        maxHeight:220,
        overflowY:"auto",

        "&::-webkit-scrollbar":{
            width:6
        },

        "&::-webkit-scrollbar-thumb":{
            background:"#bdbdbd",
            borderRadius:8
        }
    }}
>

<Typography
    variant="body2"
    sx={{
        whiteSpace:"pre-wrap",
        lineHeight:1.8
    }}
>
    {summary}
</Typography>

</Box>

        </Paper>

    );

}