import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

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
