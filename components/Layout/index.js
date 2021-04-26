import AppBar from "../AppBar"
import Container from "@material-ui/core/Container";

export default function Layout (props) {
    return (
        <>
            <AppBar darkTheme={props.darkTheme} toggleDarkTheme={props.toggleDarkTheme} />
            <Container maxWidth={false} sx={{marginTop: 2}}>
                {props.children}
            </Container>
            {/* TODO add a footer */}
        </>
    )
}
