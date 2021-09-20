import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import ExtensionIcon from '@mui/icons-material/Extension';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tooltip from '@mui/material/Tooltip';
import Link from "../Link";
import config from "../../configuration.json"

export default function AppBar(props) {
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