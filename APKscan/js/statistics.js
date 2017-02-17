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
    
    var chartOS = new Chart(document.getElementById("chartOS"),
    {
        type: 'pie',
        data:
        {
            labels: ["Windows", "Linux", "Andriod", "iOS"],
            datasets:
            [{
                label: '# of things',
                data: [50, 30, 10, 10],
                backgroundColor:
                [
                    "#0078d7",
                    "#dd4814",
                    "#A4C639",
                    "#9f9e9e"
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
    


});








// templates /////////////////////////////////////////////////////////////////////////
/*
// bar chart
var myChart1 = new Chart(document.getElementById("myChart1"),
{
    type: 'bar',
    data:
    {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets:
        [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor:
            [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderColor:
            [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
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

// pie chart
var myChart2 = new Chart(document.getElementById("myChart2"),
{
    type: 'pie',
    data:
    {
        labels: ["Red", "Blue", "Green"],
        datasets:
        [{
            label: '# of things',
            data: [60, 30, 10],
            backgroundColor:
            [
                'rgba(255, 50, 50, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(45, 206, 101, 1)'
            ]
        }]
    }
});

// line chart
var myChart3 = new Chart(document.getElementById("myChart3"),
{
    type: 'line',
    data:
    {
        labels: ["lbl1", "lbl2", "lbl3"],
        datasets:
        [{
            label: 'Lines',
            fill: false,
            lineTension: 0,
            data: [60, 30, 90],
            backgroundColor: ['rgba(55, 150, 250, 1)'],
            borderColor: ['rgba(55, 150, 250, 1)']
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
*/