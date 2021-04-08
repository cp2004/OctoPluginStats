import VersionGraph from "./VersionGraph";
import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Title from "./Title";
import HistoryGraph from "./HistoryGraph"

// Clean the data to a Pie chart readable format
const dataToPie = (data) => Object.keys(data).map(version => ({version: version, value: data[version].instances}))

// Clean the data to a Line graph readable format
const dataToLine = (data) => {
    const seenVersions = []

    // First pass through the data *backwards* to find all the possible versions
    // Backwards means that the colours should match the Pie chart & be in order
    // on the legend for the most recent versions. Just looks neater
    data.slice().reverse().forEach(item => {
        Object.keys(item.versions).forEach(version => {
            if (!seenVersions.includes(version)){
                seenVersions.push(version)
            }
        })
    })

    // Now pass through each date, first creating an empty set of data and
    // a cleaned set of actual data, then merging the two to form the result
    // Creates data with all the gaps filled in for nicer looking graphs
    return data.map(item => {
        // Create empty data
        const emptyResult = {}
        seenVersions.forEach(version => emptyResult[version] = 0)

        // Create data-with-holes
        const resultData = {
            date: item.date,
        }
        Object.keys(item.versions).forEach(version => {
            resultData[version] = item.versions[version].instances
        })

        // Finish with data with no holes :)
        return {
            ...emptyResult,
            ...resultData,
        }
    })
}

export default function PluginStats(props) {
    const {plugins, stats} = props;


    const pluginData = Object.keys(plugins).map(plugin => {
        return (
            <Grid key={plugin} item xs={12}>
                <Paper elevation={2} sx={{minHeight: "390px"}}>
                    <Grid container sx={{p: 2}}>
                        <Grid item xs={12}>
                            <Title total={stats[plugin].total} name={plugins[plugin]} />
                        </Grid>
                        <Grid item md={6} sm={12}>
                            {Object.keys(stats[plugin].versions).length
                            ? <VersionGraph data={dataToPie(stats[plugin].versions)} />
                            : <Typography key={plugin} variant={"body1"}>No stats</Typography>}
                        </Grid>
                        <Grid item md={6} sm={12}>
                            <HistoryGraph data={dataToLine(stats[plugin].history)} />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        )
    })

    return (
        <Grid container spacing={2} sx={{textAlign: "center"}}>
            {pluginData}
        </Grid>
    )
}