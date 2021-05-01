import fs from "fs"
import fetch from "node-fetch";

import config from "../configuration.mjs"
console.log(config)

const DATA_URL = "https://data.octoprint.org/export/"
const STATS_30_DAYS = DATA_URL + "plugin_stats_30d.json"
const STATS_7_DAYS = DATA_URL + "plugin_stats_7d.json"

const TODAY = new Date().toISOString().split("T")[0]

let DATA = {}

// Read current data (if any)
const data_filename = new URL('../data/stats.json', import.meta.url)
console.log(data_filename)
if (fs.existsSync(data_filename)) {
    console.log("Reading stored data")
    const content = fs.readFileSync(data_filename, {encoding: "utf-8"})
    DATA = JSON.parse(content)
}

// Read the data from the stats (30 DAYS)
const get30DayData = async (data) => {
    const response = await (await fetch(STATS_30_DAYS)).json()
    Object.entries(response.plugins)
        .filter(plugin => {
            const [plugin_id] = plugin
            return !!config.plugins[plugin_id]
        }).forEach(([plugin_id, plugin_data]) => {
            console.log("Processing data for " + plugin_id)
            // Process totals & versions
            console.log(data[plugin_id])
            data[plugin_id] = {
                history: [],
                ...data[plugin_id],
                ...{
                    total: plugin_data.instances,
                    versions: plugin_data.versions,
                }
            }
            console.log(data[plugin_id])
            if (data[plugin_id].history.length >= config.stats.keep_30 && data[plugin_id].history[config.stats.keep_30 - 1].date !== TODAY){
                // Remove earliest day, if required
                data[plugin_id].history.shift()
            }
            console.log(data[plugin_id])
            if (
                !data[plugin_id].history.length || (
                    data[plugin_id].history.length
                    && data[plugin_id].history[data[plugin_id].history.length - 1].date !== TODAY
                )
            ){
                data[plugin_id].history.push(
                    {
                        date: TODAY,
                        total: plugin_data.instances,
                        versions: plugin_data.versions,
                    }
                )
            }
        })
    return data
}

get30DayData(DATA).then(data => {
    // Write data back to the file
    fs.writeFileSync(data_filename, JSON.stringify(data, undefined, 2))
})
