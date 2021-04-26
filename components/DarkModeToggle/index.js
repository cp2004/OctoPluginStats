import FullBrightnessIcon from '@material-ui/icons/Brightness7';
import LowBrightnessIcon from '@material-ui/icons/Brightness5';
import IconButton from "@material-ui/core/IconButton";

export default function DarkModeToggle (props) {
    const {darkTheme, onToggle, sx} = props
    console.log(darkTheme)

    return (
        <IconButton onClick={onToggle} color={"inherit"} sx={sx}>
                {darkTheme ? <LowBrightnessIcon /> : <FullBrightnessIcon />}
        </IconButton>
    )
}
