import AppBar from "../AppBar"
import Container from "@mui/material/Container";

export default function Layout (props) {
    return (
        <>
            <AppBar />
            <Container maxWidth={false} sx={{marginTop: 2}}>
                {props.children}
            </Container>
            {/* TODO add a footer */}
        </>
    )
}
