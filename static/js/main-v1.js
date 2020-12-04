var date = new Date()
var PATH_TO_STATS = "data/stats.json?t=" + date.getTime()

function ajaxGet(path, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200){
            callback(this)
        }
    }
    xhttp.open("GET", path)
    xhttp.send()
}

function getData() {
    ajaxGet(PATH_TO_STATS, function (response){
        var data = JSON.parse(response.responseText)
        console.log(data)
        for (let plugin in data){var container = document.getElementById('statsOverview').children[0];
            if (container){
                var graph = document.createElement("div")
                graph.id = plugin
                var wrapper = document.createElement("div")
                wrapper.className = "col-md-6"
                wrapper.appendChild(graph)
                container.appendChild(wrapper)
            }
            createVersionsChart(data[plugin], plugin, names[plugin]);
        }
    })
}

function createVersionsChart(data, element, name) {
    console.log(data)
    try {
        var values = []
        var labels = []
        for (let version in data.versions) {
            labels.push(version)
            values.push(data.versions[version].instances)
        }
        var chartData = [{
            values: values,
            labels: labels,
            hole: .4,
            type: "pie",
        }]
        var layout = {
            title: name,
            annotations: [
                {
                    font: {
                        size: 20
                    },
                    showarrow: false,
                    text: data.total
                }
            ],
        }
        Plotly.newPlot(element, chartData, layout)
    } catch (error) {
        console.log(name, error)
    }
}

function loadPage() {
    getData()
}

loadPage()
