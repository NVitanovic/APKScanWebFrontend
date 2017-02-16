$( document ).ready(function()
{
    // bar chart
    var ctx = document.getElementById("myChart1");
    var myChart1 = new Chart(ctx,
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
            scales:
            {
                yAxes:
                [{
                    ticks:
                    {
                        beginAtZero:true
                    },
                    gridLines:
                    {
                        display:false
                    }
                }],
                xAxes:
                [{
                    gridLines:
                    {
                        display:false
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
            }
        }
    });

    // pie chart
    var ctx2 = document.getElementById("myChart2");
    var myChart2 = new Chart(ctx2,
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
    var ctx3 = document.getElementById("myChart3");
    var myChart3 = new Chart(ctx3,
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
                        beginAtZero:true
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
            }
        }
    });
    
});
