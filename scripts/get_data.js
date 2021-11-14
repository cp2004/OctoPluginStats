const fs = require("fs")
const path = require("path")
const fetch = require("node-fetch")

const config = require("../configuration.json")

const DATA_URL = "https://data.octoprint.org/export/"
const STATS_30_DAYS = DATA_URL + "plugin_stats_30d.json"
const STATS_7_DAYS = DATA_URL + "plugin_stats_7d.json"

const TODAY = new Date().toISOString().split("T")[0]

let DATA = {}


function descendingComparator (a, b, orderBy) {
    if (a[orderBy] < b[orderBy]) {
        return 1
    } else if (a[orderBy] > b[orderBy]) {
        return -1
    } else {
        return 0
    }
}

function stableSort (array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedThis.map(el => el[0])
}


// Read current data (if any)
const data_filename = path.join(__dirname, "../data/stats.json")
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

            // Map data to a good format
            const versions = Object.entries(plugin_data.versions).map(([version, stats]) => {
                return {
                    version: version,
                    instances: stats.instances
                }
            })

            // Sort the versions stats
            const versionsSorted = stableSort(
                versions,
                (a, b) => {
                return descendingComparator(a, b, "instances")
            })

            // Output totals & versions
            data[plugin_id] = {
                history: [],
                ...data[plugin_id],
                ...{
                    total: plugin_data.instances,
                    versions: versionsSorted,
                }
            }

            if (data[plugin_id].history.length >= config.stats.keep_30 && data[plugin_id].history[config.stats.keep_30 - 1].date !== TODAY){
                // Remove earliest day, if required
                data[plugin_id].history.shift()
            }
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
                        versions: versionsSorted,
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
