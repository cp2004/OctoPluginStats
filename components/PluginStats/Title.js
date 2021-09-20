import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as React from "react";
import {styled} from "@mui/material";

const InstanceText = styled(Typography)(({theme}) => ({
    paddingLeft: theme.spacing(2),
    color: theme.palette.mode === "light" ? theme.palette.secondary.main : theme.palette.secondary.light
}))

export default function Title (props) {
    const {total, name} = props;
    return (
        <Box sx={{mb: 2}}>
            <Typography align={"center"} component={"h2"} variant={"h4"} display={"inline-block"}>
                {name}
            </Typography>
            <InstanceText component={"span"} variant={"h5"}>
                {total} instances
            </InstanceText>
        </Box>
    )
}
