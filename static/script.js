loadData();

function loadData(){	
	httpRequest = new XMLHttpRequest();	
	httpRequest.open('GET', '/api/data');
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === 4 && httpRequest.status === 200) {
			jsonData1 = JSON.parse(httpRequest.response);
			update_Bars(jsonData1);			
		}
	};
	httpRequest.send();
	
	httpRequest2 = new XMLHttpRequest();	
	httpRequest2.open('GET', '/api/data2');
	httpRequest2.onreadystatechange = function () {
		if (httpRequest2.readyState === 4 && httpRequest2.status === 200) {
			jsonData2 = JSON.parse(httpRequest2.response);
			update_Lines(jsonData2);
		}
	};
	httpRequest2.send();
	
	httpRequest3 = new XMLHttpRequest();	
	httpRequest3.open('GET', '/api/data3');
	httpRequest3.onreadystatechange = function () {
		if (httpRequest3.readyState === 4 && httpRequest3.status === 200) {
			jsonData1 = JSON.parse(httpRequest3.response);
			update_Pie(jsonData1);
		}
	};
	httpRequest3.send();

	httpRequest4 = new XMLHttpRequest();	
	httpRequest4.open('GET', '/api/data4');
	httpRequest4.onreadystatechange = function () {
		if (httpRequest4.readyState === 4 && httpRequest4.status === 200) {
			jsonData1 = JSON.parse(httpRequest4.response);
			update_HBars(jsonData1);
		}
	};
	httpRequest4.send();

	httpRequest5 = new XMLHttpRequest();	
	httpRequest5.open('GET', '/api/data5');
	httpRequest5.onreadystatechange = function () {
		if (httpRequest5.readyState === 4 && httpRequest5.status === 200) {
			jsonData1 = JSON.parse(httpRequest5.response);
			update_Polar(jsonData1);			
		}
	};
	httpRequest5.send();

	httpRequest6 = new XMLHttpRequest();	
	httpRequest6.open('GET', '/api/data6');
	httpRequest6.onreadystatechange = function () {
		if (httpRequest6.readyState === 4 && httpRequest6.status === 200) {
			jsonData1 = JSON.parse(httpRequest6.response);
			update_Dog(jsonData1);
		}
	};
	httpRequest6.send();

	httpRequest7 = new XMLHttpRequest();	
	httpRequest7.open('GET', '/api/data7');
	httpRequest7.onreadystatechange = function () {
		if (httpRequest7.readyState === 4 && httpRequest7.status === 200) {
			jsonData1 = JSON.parse(httpRequest7.response);
			update_Pie2(jsonData1);
		}
	};
	httpRequest7.send();
}


function update_Bars(jsonData){	

	var labels = jsonData.map(function(e) {
	   return e.annee;
	});
	
	var data = jsonData.map(function(e) {
	   return e.n;
	});
	
	
	new Chart(document.getElementById("bar-chart"), {
		type: 'bar',
		data: {
		  labels: labels,
		  datasets: [
			{
			  label: "Students",
			  backgroundColor: ["#4e5b84", "#8e5ea2","#4ead84"],
			  data: data
			}
		  ]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			},
		  responsive: false,
		  maintainAspectRatio: true,	
		  legend: { display: false },
		  title: {
			display: true,
		  }
		}
	});
}

function update_Lines(jsonData){
	var labels = jsonData.annee;
	
	for(d of jsonData.datasets){
		d.fill = false;				  
		d.borderColor = '#'+Math.floor(Math.random()*16777215).toString(16);
		d.borderWidth=2;
		d.radius=1;			
	}			
	
	var data = jsonData.datasets;

	new Chart(document.getElementById("line-chart"), {
		type: 'line',
		data: {
			labels: labels,
			datasets: data
		},
		options: {						
			responsive: false,
			maintainAspectRatio: true,
			title: {
				display: false,
				text: 'World population per region (in millions)'
			},
			legend:{
				position:'top'
			}
		}
	});
}

function update_Pie(jsonData){
	var labels = jsonData.map(function(e) {
	   return e.annee;
	});
	
	var data = jsonData.map(function(e) {
	   return e.n;
	});
	
	new Chart(document.getElementById("pie-chart"), {
		type: 'pie',
		data: {
		  labels: labels,
		  datasets: [{
			label: "Population (millions)",
			backgroundColor: ["#4e5b84", "#8e5ea2","#4ead84"],
			data: data
		  }]
		},
		options: {
		  responsive: false,
		  maintainAspectRatio: true,
		  title: {
			display: false,
			text: 'Predicted world population (millions) in 2050'
		  },
		  legend:{
			position:'right'
		  }
		}
	});	
}

function update_HBars(jsonData){	

	var labels = jsonData.map(function(e) {
	   return e.annee;
	});
	
	var data = jsonData.map(function(e) {
	   return e.n;
	});
	
	
	new Chart(document.getElementById("bar-chart-horizontal"), {
        type: 'horizontalBar',
        data: {
          labels: labels,
          datasets: [
            {
              label: "Students",
              backgroundColor: ["#4e5b84", "#8e5ea2","#4ead84"],
              data: data
            }
          ]
        },
        options: {
            scales: {
				xAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			},
          legend: { display: false },
          title: {
            display: true,
          }
        }
    });
}

/* Menu */
function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
	document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
	document.getElementById("main").style.marginLeft= "0";
  }

/*index1*/
function update_Polar(jsonData){	
	var labels = jsonData.map(function(e) {
		return e.annee;
	 });
	 
	 var data = jsonData.map(function(e) {
		return e.n;
	 });

	 new Chart(document.getElementById("polar-chart"), {
		type: 'polarArea',
		data: {
		  labels: labels,
		  datasets: [
			{
			  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
			  data: data
			}
		  ]
		},
		options: {
		  title: {
			display: true,
		  }
		}
	});
}

function update_Dog(jsonData){
    var labels = jsonData.map(function(e) {
           return e.annee;
        });
        
        var data = jsonData.map(function(e) {
           return e.n;
        });
        
        new Chart(document.getElementById("doughnut-chart"), {
            type: 'doughnut',
            data: {
              labels:labels,
              datasets: [
                {
                  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#FA8072","#DC143C"],
                  data:data
                }
              ]
            },
            options: {
            responsive:false,
              title: {
                display: false,
              },
			  legend:{
				  position: 'left'
			  }
            }
        });
    }

function update_Pie2(jsonData){
		var labels = jsonData.map(function(e) {
		   return e.annee;
		});
		
		var data = jsonData.map(function(e) {
		   return e.n;
		});
		
		new Chart(document.getElementById("pie-chart"), {
			type: 'pie',
			data: {
			  labels: labels,
			  datasets: [{
				backgroundColor: ["#4e5b84", "#8e5ea2","#4ead84"],
				data: data
			  }]
			},
			options: {
			  responsive: false,
			  maintainAspectRatio: true,
			  title: {
				display: false,
			  },
			  legend:{
				position:'right'
			  }
			}
		});	
	}
