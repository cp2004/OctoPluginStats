import AppBar from "./AppBar"
import Container from "@mui/material/Container";
import {styled} from "@mui/material";

const Offset = styled('div')(({theme}) => theme.mixins.toolbar)

export default function Layout (props) {
    return (
        <>
            <AppBar />
            <Offset />
            <Container maxWidth={false} sx={{marginTop: {xs: 4, sm: 2}}}>
                {props.children}
            </Container>
            {/* TODO add a footer */}
        </>
    )
}
