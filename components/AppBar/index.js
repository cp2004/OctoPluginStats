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

const linkProps = {
    color: 'inherit',
    underline: 'none',
    target: "_blank"
}

export default function AppBar(props) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <MuiAppBar position="fixed">
                <Toolbar sx={{flexWrap: 'wrap'}}>
                    <Typography
                        variant={"h4"}
                        component={"h1"}
                        sx={{display: 'flex', flexGrow: 1, justifyContent: {xs: 'center', sm: 'flex-start' }}}
                    >
                        <Link href={"/"} color={"inherit"} underline={"none"}>
                            OctoPluginStats
                        </Link>
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        flexGrow: {xs: 1, sm: 0 },
                        flexWrap: 'wrap',
                        my: 1,
                        justifyContent: 'center',
                        '& > .MuiLink-root': {mx: 2}
                    }}>
                        {config.all_plugins && <Link
                            href={config.all_plugins}
                            {...linkProps}
                        >
                            <Tooltip title="Plugins" placement="bottom">
                                <ExtensionIcon/>
                            </Tooltip>
                        </Link>}
                        {config.support && <Link
                            href={config.support}
                            {...linkProps}
                        >
                            <Tooltip title={"Sponsor"} placement={"bottom"}>
                                <FavoriteIcon/>
                            </Tooltip>
                        </Link>}
                        {config.source && <Link
                            href={config.source}
                            {...linkProps}
                        >
                            <Tooltip title="Source" placement="bottom">
                                <GitHubIcon/>
                            </Tooltip>
                        </Link>}
                    </Box>
                </Toolbar>
            </MuiAppBar>
        </Box>
    );
}
