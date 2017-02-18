$( document ).ready(function()
{
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
                data: [10, 21, 20, 30, 25, 52, 50],
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
                data: [60, 40],
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
            labels: ["Windows", "Linux", "Mac", "Andriod", "iOS", "Windows Phone", "Other"],
            datasets:
            [{
                data: [20, 7, 6, 30, 24, 14, 11],
                backgroundColor:
                [
                    "#0078d7",
                    "#dd4814",
                    "#894e97",
                    "#A4C639",
                    "#9f9e9e",
                    "#01bcf3",
                    "#c3c3c3"
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

    // file type
    var chartExt = new Chart(document.getElementById("chartExt"),
    {
        type: 'pie',
        data:
        {
            labels: [".apk", "other"],
            datasets:
            [{
                data: [90, 10],
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
                text: 'File types',
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
                data: [26, 18, 15, 3, 7, 10, 20, 3],
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
                text: 'User browsers',
                fontFamily: "'Open Sans', sans-serif",
                fontStyle: "400",
                fontSize: 20,
                fontColor: "#254357"
            }
        }
    });
    


});








