import {
    Box,
    IconButton,
    OutlinedInput,
    CircularProgress,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";

import { useState } from "react";

import { useDispatch } from "react-redux";

import { addMessage } from "../redux/chatSlice";
import { setComplaint } from "../redux/complaintSlice";

import { sendChatMessage } from "../services/api";

export default function ChatInput() {

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleSend = async () => {

        if (!message.trim()) return;

        // Add user message immediately
        dispatch(
            addMessage({
                sender: "User",
                text: message,
            })
        );

        const userMessage = message;

        setMessage("");

        setLoading(true);

        try {

            const result = await sendChatMessage(userMessage);

            // Update Complaint Form
            dispatch(
                setComplaint(result)
            );

            // AI Reply
            dispatch(
                addMessage({
                    sender: "AI",
                    text: result.summary || result.reply,
                })
            );

        } catch (error) {

            dispatch(
                addMessage({
                    sender: "AI",
                    text: "❌ Unable to contact the server.",
                })
            );

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <Box
            sx={{
                p: 2,
                display: "flex",
                gap: 1,
                borderTop: "1px solid #E5E7EB",
            }}
        >

            <OutlinedInput
                fullWidth
                size="small"
                placeholder="Type a complaint or ask AI..."
                value={message}
                disabled={loading}
                onChange={(e) =>
                    setMessage(e.target.value)
                }
                onKeyDown={(e) => {

                    if (e.key === "Enter") {

                        handleSend();

                    }

                }}
            />

            <IconButton
                color="primary"
                disabled={loading}
                onClick={handleSend}
            >

                {

                    loading ?

                        <CircularProgress size={22} />

                        :

                        <SendIcon />

                }

            </IconButton>

        </Box>

    );

}