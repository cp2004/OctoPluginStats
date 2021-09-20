import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Title (props) {
    const {total, name} = props;
    return (
        <Box sx={{textAlign: "center", flexGrow: 1, marginBottom: 2}}>
            <Typography align={"center"} component={"span"} variant={"h4"}>
                {name}
            </Typography>
            <Typography component={"span"} variant={"h5"} sx={{paddingLeft: 2}}>
                {total} instances
            </Typography>
        </Box>
    )
}
