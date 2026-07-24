import {
    Box,
    Typography,
    Paper,
} from "@mui/material";

import { useSelector } from "react-redux";

import { useEffect, useRef } from "react";

export default function ChatWindow() {

    const messages = useSelector(
        (state) => state.chat.messages
    );

    const bottomRef = useRef(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({

            behavior: "smooth"

        });

    }, [messages]);

    return (

        <Box
            sx={{
                flex: 1,
                overflowY: "auto",
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                backgroundColor: "#FAFBFC",
            }}
        >

            {

                messages.map((message, index) => (

                    <Box
                        key={index}
                        display="flex"
                        justifyContent={
                            message.sender === "User"
                                ? "flex-end"
                                : "flex-start"
                        }
                    >

                        <Paper
                            elevation={1}
                            sx={{
                                p: 1.5,
                                borderRadius: 2,
                                maxWidth: "85%",

                                bgcolor:
                                    message.sender === "User"
                                        ? "#1976d2"
                                        : "#ffffff",

                                color:
                                    message.sender === "User"
                                        ? "#fff"
                                        : "#000",
                            }}
                        >

                            <Typography
                                variant="caption"
                                fontWeight={700}
                            >
                                {message.sender}
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{
                                    mt: 0.5,
                                    whiteSpace: "pre-wrap",
                                }}
                            >
                                {message.text}
                            </Typography>

                        </Paper>

                    </Box>

                ))

            }

            <div ref={bottomRef} />

        </Box>

    );

}