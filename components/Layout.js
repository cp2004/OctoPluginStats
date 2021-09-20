import AppBar from "./AppBar"
import Container from "@mui/material/Container";
import {Divider, Stack, styled} from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "./Link";

const Offset = styled('div')(({theme}) => theme.mixins.toolbar)

export default function Layout (props) {
    return (
        <>
            <AppBar />
            <Offset />
            <Container maxWidth={false} sx={{marginTop: {xs: 4, sm: 2}}}>
                {props.children}
            </Container>
            <Divider />
            <Stack sx={{my: 8, alignItems: 'center', "& > .MuiTypography-root": {my: 2}}}>
                <Typography variant={"h6"}>
                    OctoPluginStats | Created by Charlie Powell
                </Typography>
                <Typography variant={"h6"}>
                    Stats provided by OctoPrint's <Link href={"https://tracking.octoprint.org"} target={"_blank"}>anonymous usage tracking</Link> exports.
                </Typography>
            </Stack>
        </>
    )
}
