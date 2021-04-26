import * as React from 'react';
import MuiAppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import ExtensionIcon from '@material-ui/icons/Extension';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';
import Link from "../Link";
import config from "../../configuration"
import DarkModeToggle from "../DarkModeToggle";

export default function AppBar(props) {
    const {darkTheme, toggleDarkTheme} = props
    return (
        <Box sx={{ flexGrow: 1 }}>
            <MuiAppBar position="fixed">
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        <Link href={"/"} color={"inherit"} underline={"none"}>
                            OctoPluginStats
                        </Link>
                    </Typography>
                    <Box flex sx={{display: "flex", '& .MuiLink-root': {mx: 3, my: "auto", display: "flex"}}}>
                        <DarkModeToggle sx={{mr: 2}} darkTheme={darkTheme} onToggle={toggleDarkTheme}/>
                        {config.all_plugins && <Link
                            href={config.all_plugins}
                            color={"inherit"}
                            underline={"none"}
                            target={"_blank"}
                        >
                            <Tooltip title="Plugins" placement="bottom">
                                <ExtensionIcon/>
                            </Tooltip>
                        </Link>}
                        {config.support && <Link
                            href={config.support}
                            color={"inherit"}
                            underline={"none"}
                            target={"_blank"}
                            >
                            <Tooltip title={"Sponsor"} placement={"bottom"}>
                                <FavoriteIcon/>
                            </Tooltip>
                        </Link>}
                        {config.source && <Link
                            href={config.source}
                            color={"inherit"}
                            underline={"none"}
                            target={"_blank"}
                        >
                            <Tooltip title="Source" placement="bottom">
                                <GitHubIcon/>
                            </Tooltip>
                        </Link>}
                    </Box>
                </Toolbar>
            </MuiAppBar>
            <Box sx={{marginTop: 10}} />
        </Box>
    );
}