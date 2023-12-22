// @ts-nocheck
// Clean the data to a Line graph readable format
function dataToLine (data) {
    const seenVersions = ["total"]  // Total will *always* be included

    // First pass through the data *backwards* to find all the possible versions
    // Backwards means that the colours should match the Pie chart & be in order
    // on the legend for the most recent versions. Just looks neater
    data.slice().reverse().forEach(item => {
        if (Array.isArray(item.versions)) {
            item.versions.forEach(entry => {
                if (!seenVersions.includes(entry.version)) {
                    seenVersions.push(entry.version)
                }
            })
        } else {
            // Old style as an object not an array
            Object.keys(item.versions).forEach(version => {
                if (!seenVersions.includes(version)){
                    seenVersions.push(version)
                }
            })
        }
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
            total: item.total
        }
        if (Array.isArray(item.versions)) {
            item.versions.forEach(entry => {
                resultData[entry.version] = entry.instances
            })
        } else {
            // Old style as an object not an array
            Object.keys(item.versions).forEach(version => {
                resultData[version] = item.versions[version].instances
            })
        }

        // Finish with data with no holes :)
        return {
            ...emptyResult,
            ...resultData,
        }
    })
}

export default dataToLine