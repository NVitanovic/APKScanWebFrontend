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
	var requestUrl = "http://api.apkscan.online/api/scan/" + hash;
	
	$.ajax({
		url: "http://api.apkscan.online/api/scan/" + hash,
		dataType: "json",
		success: function(result){
			if(result.error){
				$(location).attr("href","http://apkscan.online");
			}
			//ovde popunjavamo elemente stranice
			$('#md5').html(hash);
			$('#lastdate').html(result.last_scan);
			$('#firstdate').html(result.first_scan);
			var filenames = "";
			for(var i = 0; i < result.filename.length; i++){
				filenames += result.filename[i];
				if(i < result.filename.length - 1)
					filenames += ", ";
			}
			$('#filenames').html(filenames);
			var total = 0;
			for(var prop in result.av){
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
		},
		type: "GET"
	});
});
