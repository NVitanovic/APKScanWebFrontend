/*
	Ocekujemo hash u okviru url
	npr. http://apkscan.online/result#hash

	Procedura:
	1. uzmemo current url koji izgleda kao ovaj gore
	2. izvucemo hash iz njega
	3. saljemo GET request (ajax) na http://api.apkscan.online/api/scan/{hash}
	3A. Ako nije zavrsen scan onda dobijemo {"error":"File not found!"}
	3B. Ako jeste onda dobijemo nesto kao {"last_scan":"2017-01-19T16:10:08.216","first_scan":"2017-01-19T16:01:45.526","hash":"a5e9112cff23Xc1410016bae68e05d86XXXX","filename":["novif","novifajl222"],"upload_ip":["192.168.2.1"],"av":{"AV1":"true","AV2":"true","AV3":"true"}}
	4A. Ako je rezultat error redirect na glavnu stranicu (http://apkscan.online)
	4B. Ako je uspesan rezultat parsujemo rezultat i popunjavamo elemente stranice.

*/

//var iconAvast = document.getElementById('iconAvast');

$(document).ready(function()
{
	var url = $(location).attr('href');
	var hash = url.substring(url.indexOf("#") + 1, url.length);

	if(isValidMD5(hash))
	{
		//ne salji request na server ako md5 nije validan
		$.ajax({
			url: "http://api.apkscan.online/api/scan/" + hash,
			dataType: "json",
			success: function(result){
				if(result.error){
					$(location).attr("href","http://apkscan.online");
				}
				//ovde popunjavamo elemente stranice
				$('#md5').html(hash);
				var first_date = Date.parse(result.first_scan);
				var second_date = Date.parse(result.last_scan);
				$('#lastdate').html(moment(second_date).format("DD-MM-YYYY HH:mm:ss"));
				$('#firstdate').html(moment(first_date).format("DD-MM-YYYY HH:mm:ss"));
				var filenames = "";
				for(var i = 0; i < result.filename.length; i++){
					filenames += result.filename[i];
					if(i < result.filename.length - 1)
						filenames += ", ";
				}
				$('#filenames').html(filenames);
				var total = 0;
				var count = 0;
				var results = result.av;
				for(var prop in results){
					count++;
					if(result.av[prop] === "true"){
						total++;
						switch(prop){
							case "com.avast.android.mobilesecurity"://avast
								$('#iconAvast').attr('src', 'res/result-red.svg');
								break;
							case "com.antivirus"://avg
								$('#iconAVG').attr('src', 'res/result-red.svg');
								break;
							case "com.cleanmaster.security"://cm security
								$('#iconCM').attr('src', 'res/result-red.svg');
								break;
							case "com.bitdefender.antivirus"://bitdefender
								$('#iconBit').attr('src', 'res/result-red.svg');
								break;
							case "org.malwarebytes.antimalware"://malwarebytes
								$('#iconMalwarebytes').attr('src', 'res/result-red.svg');
								break;
						}
					}
				}
				$('.first').html(total);
				$('.last').html(count);

				if(isValidMD5(hash))
				{
                    $.when(gatherFingerprintData()).done(function(data)
                    {
                        var mongo = new mongoObject();
                        console.log("Ajax data: " + data);
                        mongo.fingerprint = getFingerprintData(data);
                        mongo.file = {
                            "name" : filenames,
                            "MD5hash" : hash,
                            "detections" : total,
                            "maxdetections" : count
                        };
                        $.ajax({
                            url: "http://api.apkscan.online/api/stats/result",
                            type: "POST",
                            contentType: "application/json",
                            data: JSON.stringify(mongo),
                            processData: false
                        });
					});
				}
			},
			type: "GET"
		});
	}
});


