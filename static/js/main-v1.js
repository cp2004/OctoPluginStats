var date = new Date()
var PATH_TO_STATS = "/data/stats.json?t=" + date.getTime()

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
        createVersionsChart(data.ws281x_led_status, "ws281xVersionsContainer", "WS281x LED Status Versions")
        createVersionsChart(data.eeprom_marlin, "eepromVersionContainer", "Marlin EEPROM Editor Versions")
        createVersionsChart(data.autologin_config, "autologinVersionContainer", "AutoLogin Config Versions")
        createVersionsChart(data.virtual_printerconfig, "virtualPrinterVersionContainer", "Virtual Printer Settings Versions")
    })
}

function createVersionsChart(data, element, name) {
    console.log(data)
    var values = []
    var labels = []
    for (let version in data.versions){
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
        annotations :[
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
}

function loadPage() {
    getData()
}

loadPage()
