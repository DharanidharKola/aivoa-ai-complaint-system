import { createTheme } from "@mui/material/styles";

const theme = createTheme({

    palette:{

        primary:{
            main:"#5B5CEB"
        },

        secondary:{
            main:"#009688"
        },

        background:{
            default:"#F7F8FC"
        }

    },

    shape:{
        borderRadius:12
    },

    typography:{
        fontFamily:"Roboto, sans-serif"
    }

});

export default theme;