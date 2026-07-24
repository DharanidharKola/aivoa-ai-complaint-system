import Chip from "@mui/material/Chip";

export default function StatusChip() {
    return (
        <Chip
            label="Pending Triage"
            color="warning"
            sx={{
                fontWeight: 700,
                px: 1,
            }}
        />
    );
}