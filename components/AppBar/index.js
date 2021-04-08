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

export default function AppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <MuiAppBar position="fixed">
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        <Link href={"/"} color={"inherit"} underline={"none"}>
                            OctoPluginStats
                        </Link>
                    </Typography>
                    <Box sx={{'& .MuiLink-root': {m: 3}}}>
                        <Link
                            href={"https://plugins.octoprint.org/by_author/#charlie-powell"}
                            color={"inherit"}
                            underline={"none"}
                            target={"_blank"}
                        >
                            <Tooltip title="Plugins" placement="bottom">
                                <ExtensionIcon/>
                            </Tooltip>
                        </Link>
                        <Link
                            href={"https://github.com/sponsors/cp2004"}
                            color={"inherit"}
                            underline={"none"}
                            target={"_blank"}
                            >
                            <Tooltip title={"Sponsor"} placement={"bottom"}>
                                <FavoriteIcon/>
                            </Tooltip>
                        </Link>
                        <Link
                            href={"https://github.com/cp2004/OctoPluginStats"}
                            color={"inherit"}
                            underline={"none"}
                            target={"_blank"}
                        >
                            <Tooltip title="Source" placement="bottom">
                                <GitHubIcon/>
                            </Tooltip>
                        </Link>
                    </Box>
                </Toolbar>
            </MuiAppBar>
            <Box sx={{marginTop: 10}} />
        </Box>
    );
}