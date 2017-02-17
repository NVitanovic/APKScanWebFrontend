// hashes are automatically calculated after file is chosen
// they are in global variables named MD5 and SHA256

function getResult(hash,callfunc)
{
	$.ajax({
		url: 'http://api.apkscan.online/api/scan/' + hash,
		dataType: 'json',
		type: 'GET',
		success: callfunc
	});
}

function callback(data)
{
	console.log(data);
	if(data.error === undefined)
	{
		//good request
		//show modal with results
		var first_date = Date.parse(data.first_scan);
		var second_date = Date.parse(data.last_scan);
		$("#firstDate").html(moment(first_date).format("DD-MM-YYYY HH:mm:ss"));
		$("#lastDate").html(moment(second_date).format("DD-MM-YYYY HH:mm:ss"));

		var cnt = 0;
		var total = 0;
		for(var prop in data.av)
		{
			total++;
			if(data.av[prop] === "true")
				cnt++;
		}
		$("#numDetections").html(cnt + "/" + total);

		$('#modalInfo').modal({
			backdrop: 'static',
			keyboard: false
		}); 
	}
	else
	{
		fileUpload();
	}
}

function checkAfterUpload(hash)
{
	console.log("interval");
	getResult(hash, function(data)
	{
		if(data.error === undefined)
		{
			//ok scan complete redirect
			console.log("Data available, redirecting...");
			window.location = "http://apkscan.online/results#" + hash;
		}
		else
		{
			//nothing no result yet
			console.log("No data yet...");
			setTimeout(checkAfterUpload(hash), 10 * 1000);
		}
	});
}

function fileUpload()
{
	$("#fileInput").simpleUpload("http://api.apkscan.online/api/scan", {

			start: function(file){
				//show form
				$('#modalUpload').modal({
					backdrop: 'static',
					keyboard: false
				}); 
			},

			progress: function(progress){
				//received progress
				var p = Math.round(progress);
				$("#uploadProgess").attr("aria-valuenow", p );
				$("#uploadProgess").css("width", p + "%" );
				$("#uploadProgess").html(p + "%" );
				console.log("upload progress: " + Math.round(progress) + "%");
			},

			success: function(data){
				//upload successful
				console.log("upload successful!");
				console.log(data);
				$('#modalUpload').modal('hide');
				
				$("#numQueue").html(data.queue);
				$("#scanETA").html(data.queue);
				$("#resultURL").html("http://apkscan.online/results#"+data.hash);
				$("#resultURL").attr("href", "http://apkscan.online/results#"+data.hash);

				$('#modalWait').modal({
					backdrop: 'static',
					keyboard: false
				}); 

				//run the function periodically to check if the scan is complete
				setInterval(checkAfterUpload(MD5), 10 * 1000);
			},

			error: function(error){
				//upload failed
				console.log("upload error: " + error.name + ": " + error.message);
				alert("Upload failed!");
				window.location = "http://apkscan.online";
			}

		});
}

/*function geoLocate()
{
    //treba da se posalje GET request na http://freegeoip.net/json
    /*var res;
    $.ajax({
        type: "GET",
        url: "http://freegeoip.net/json/",
        dataType: "json",
        success: function(result)
        {
        	res = result;
            alert(result);
        }
    });
    alert(res);* /

    /*$.getJSON('//freegeoip.net/json/?callback=?', function(data) {
	  console.log(JSON.stringify(data, null, 2));
	});* /
	$.getJSON( "http://smart-ip.net/geoip-json?callback=?", function(data){ alert( data.host); } );
}*/

$( document ).ready(function()
{
    var mongoData = new mongoObject();
	var checkboxTos = document.getElementById('checkboxTos');
	var buttonScan = document.getElementById('buttonScan');
	var buttonUpload = document.getElementById('buttonUpload');
	var fileInput = document.getElementById('fileInput');
	var fileName = document.getElementById('fileName');

	$("#btnShowResults").click(function()
	{
		window.location = "http://apkscan.online/results#" + MD5;
	});

	$("#btnReAnalyse").click(function()
	{
		fileUpload();
	});

	checkboxTos.onchange = function()
	{
		buttonScan.disabled = !this.checked;
	};

	buttonUpload.onclick = function()
	{
		fileInput.click();
	};

	fileInput.onchange = function()
	{
		var name = fileInput.value.replace(/^.*\\/, "");

		var fileNameWidth = 750 - 130;
		if($(window).width() < 768)
			fileNameWidth = $(window).width() - 130 - 30;

		var numberOfChars = fileNameWidth/12;

		if(name.length > numberOfChars)
		{
			name = name.slice(0, numberOfChars-4);
			name = name + "...";
		}

		fileName.innerHTML = name;


	}

	buttonScan.onclick = function()
	{
		// TODO: if file is uploaded go to results page
        $.when(gatherFingerprintData()).done(function(data)
        {
            console.log("Ajax data: " + data);
            mongoData.fingerprintStatistics = getFingerprintData(data);
            var file = fileInput.files[0];
            mongoData.fileStatistics = gatherFileData(file, MD5);

			$.ajax({
				type: "POST",
				data: JSON.stringify(mongoData),
				contentType: "application/json",
				url: "http://api.apkscan.online/api/stats/scan",
                processData: false
			});
            getResult(MD5,callback);
        });

		//window.open("results.html", "_self");
	};
});

// cookies
window.addEventListener("load", function(){
window.cookieconsent.initialise({
  "palette": {
    "popup": {
      "background": "#254357",
      "text": "#ffffff"
    },
    "button": {
      "background": "#59A3D6",
      "text": "#ffffff"
    }
  },
  "theme": "edgeless"
})});