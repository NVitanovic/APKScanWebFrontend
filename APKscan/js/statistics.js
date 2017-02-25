function getData()
{
    $.ajax({
        url: 'http://api.apkscan.online/api/stats/',
        dataType: 'json',
        type: 'GET',
        async: false,
        success: setData
    });
}

// cards
var cardFiles;
var cardScans;
var cardVirus;
var cardSize;

// charts
var chartScansData = new Array();
var chartDeviceData = new Array();
var chartOSData = new Array();
var chartFileSizeData = new Array(); 
var chartBrowserData = new Array();
var chartCountriesData = new Array();
var chartCountriesLabels = new Array();

function setData(data)
{
    // cards
    document.getElementById("cardFiles").innerHTML = data.uploads;
    document.getElementById("cardScans").innerHTML = data.scans;
    document.getElementById("cardVirus").innerHTML = data.detections;
    document.getElementById("cardSize").innerHTML = data.totalfilesize + " MB";

    // charts
    chartScansData = [data.weekscans["7"], data.weekscans["6"], data.weekscans["5"], data.weekscans["4"], data.weekscans["3"], data.weekscans["2"], data.weekscans["1"]];
    chartDeviceData = [ parseInt(data.device.tablet) + parseInt(data.device.mobile), data.device.desktop];
    chartOSData = [data.os.Windows, parseInt(data.os.OpenBSD) + parseInt(data.os.Linux) + parseInt(data.os.NetBSD), data.os.Android, data.os.iOS, data.os["Windows Phone"], parseInt(data.os["Mac OS"]) + parseInt(data.os["PLAYSTATION"]) + parseInt(data.os["Firefox OS"]) + parseInt(data.os["Nintendo"]) + parseInt(data.os["PlayStation"])];
    chartFileSizeData = [data.filesizes["<1MB"], data.filesizes["<10MB"], data.filesizes["<50MB"], data.filesizes[">50MB"]];
    chartBrowserData = [data.browser["Chrome"], data.browser["Firefox"], data.browser["Opera"], parseInt(data.browser["IE"]) + parseInt(data.browser["IEMobile"]), data.browser["Edge"], parseInt(data.browser["Safari"]) + parseInt(data.browser["Mobile Safari"]), data.browser["Android Browser"], parseInt(data.browser["Silk"]) + parseInt(data.browser["rekonq"])];

    var tmp = data.countries;
    var tmpArray = new Array();
    for(a in tmp)
    {
        tmpArray.push([a, tmp[a]]);
    }
    tmpArray.sort(function(a,b){return a[1] - b[1]});
    tmpArray.reverse();
    //alert(tmpArray);

    for(i = 0; i < 6; i++)
    {
        chartCountriesLabels.push(tmpArray[i][0]);
        chartCountriesData.push(tmpArray[i][1]);
    }

    //alert(chartCountriesLabels);
    //alert(chartCountriesData);

    var sum = 0;
    for(i = 6; i < tmpArray.length; i++)
    {
        sum += tmpArray[i][1];
    }

    chartCountriesLabels.push("Other");
    chartCountriesData.push(sum);
}

$( document ).ready(function()
{
    getData();

    // number of files analysed per day in last 7 days
    var chartScans = new Chart( document.getElementById("chartScans"),
    {
        type: 'line',
        data:
        {
            labels: ["6 days ago", "5 days ago", "4 days ago", "3 days ago", "2 days ago", "Yesterday", "Today"],
            datasets:
            [{
                label: 'Lines',
                fill: false,
                lineTension: 0,
                data: chartScansData,
                backgroundColor: "#254357",
                borderColor: "#254357"
            }]
        },
        options:
        {
            scales:
            {
                yAxes:
                [{
                    ticks:
                    {
                        beginAtZero: false,
                        fontColor: "#254357"
                    },
                    gridLines:
                    {
                        display: true
                    }
                }],
                xAxes:
                [{
                    ticks:
                    {
                        fontColor: "#254357"
                    },
                    gridLines:
                    {
                        display: true
                    }
                }]
            },
            legend:
            {
                display: false
            },
            tooltips:
            {
                callbacks:
                {
                   label: function(tooltipItem)
                   {
                          return tooltipItem.yLabel;
                   }
                }
            },
            title:
            {
                display: true,
                text: 'Number of files analysed per day',
                fontFamily: "'Open Sans', sans-serif",
                fontStyle: "400",
                fontSize: 20,
                fontColor: "#254357"
            }
        }
    });

    // User devices
    var chartDevice = new Chart(document.getElementById("chartDevice"),
    {
        type: 'pie',
        data:
        {
            labels: ["Personal computer", "Mobile device"],
            datasets:
            [{
                data: chartDeviceData,
                backgroundColor:
                [
                    "#254357",
                    "#59A3D6"
                ]
            }]
        },
        options:
        {
            legend: {labels:{fontColor: "#254357"}},
            title:
            {
                display: true,
                text: 'User devices',
                fontFamily: "'Open Sans', sans-serif",
                fontStyle: "400",
                fontSize: 20,
                fontColor: "#254357"
            }
        }
    });
    
    // user OS
    var chartOS = new Chart(document.getElementById("chartOS"),
    {
        type: 'pie',
        data:
        {
            labels: ["Windows", "Linux", "Android", "iOS", "Windows Phone", "Other"],
            datasets:
            [{
                data: chartOSData,
                backgroundColor:
                [
                    "#0078d7",
                    "#dd4814",
                    "#A4C639",
                    "#919191",
                    "#01bcf3",
                    "#c9c9c9"
                ]
            }]
        },
        options:
        {
            legend: {labels:{fontColor: "#254357"}},
            title:
            {
                display: true,
                text: 'User OS',
                fontFamily: "'Open Sans', sans-serif",
                fontStyle: "400",
                fontSize: 20,
                fontColor: "#254357"
            }
        }
    });

    // file sizes
    var chartFileSize = new Chart(document.getElementById("chartFileSize"),
    {
        type: 'pie',
        data:
        {
            labels: ["<1MB", "<10MB", "<50MB", ">50MB"],
            datasets:
            [{
                data: chartFileSizeData,
                backgroundColor:
                [
                    "#002032",
                    "#254357",
                    "#59A3D6",
                    "#8dd5ec"
                ]
            }]
        },
        options:
        {
            legend: {labels:{fontColor: "#254357"}},
            title:
            {
                display: true,
                text: 'Sizes of uploaded files',
                fontFamily: "'Open Sans', sans-serif",
                fontStyle: "400",
                fontSize: 20,
                fontColor: "#254357"
            }
        }
    });

    // User browser
    var chartBrowser = new Chart(document.getElementById("chartBrowser"),
    {
        type: 'bar',
        data:
        {
            labels: ["Chrome", "Firefox", "Opera", "Internet Explorer", "Edge", "Safari", "Android browser", "Other"],
            datasets:
            [{
                label: '# of Votes',
                data: chartBrowserData,
                backgroundColor: "#254357"
            }]
        },
        options:
        {
            legend: {labels:{fontColor: "#254357"}},
            scales:
            {
                yAxes:
                [{
                    ticks:
                    {
                        beginAtZero: true,
                        fontColor: "#254357"
                    },
                    gridLines:
                    {
                        display: true
                    }
                }],
                xAxes:
                [{
                    ticks:
                    {
                        fontColor: "#254357",
                        fontSize: 14,
                    },
                    gridLines:
                    {
                        display: true
                    }
                }]
            },
            legend:
            {
                display: false
            },
            tooltips:
            {
                callbacks:
                {
                   label: function(tooltipItem)
                   {
                          return tooltipItem.yLabel;
                   }
                }
            },
            title:
            {
                display: true,
                text: 'User browsers',
                fontFamily: "'Open Sans', sans-serif",
                fontStyle: "400",
                fontSize: 20,
                fontColor: "#254357"
            }
        }
    });

    // Countries
    var chartCountries = new Chart(document.getElementById("chartCountries"),
    {
        type: 'polarArea',
        data:
        {
            labels: chartCountriesLabels,
            datasets:
            [{
                data: chartCountriesData,
                backgroundColor:
                [
                    /*"#002032",
                    "#254357",
                    "#59A3D6",
                    "#8dd5ec",
                    "#FF5900",
                    "#FF8A4C",
                    "#c9c9c9"*/

                    "#546ad9",
                    "#54c2d9",
                    "#54d97d",
                    "#ced954",
                    "#d9a054",
                    "#d95454",
                    "#c9c9c9",

                ]
            }]
        },
        options:
        {
            legend: {labels:{fontColor: "#254357"}},
            legend:
            {
                display: true,
                position: "bottom"
            },
            tooltips:
            {
                callbacks:
                {
                   label: function(tooltipItem)
                   {
                          return tooltipItem.yLabel;
                   }
                }
            },
            title:
            {
                display: true,
                text: 'Submissions by country',
                fontFamily: "'Open Sans', sans-serif",
                fontStyle: "400",
                fontSize: 20,
                fontColor: "#254357"
            }
        }
    });
    


});








