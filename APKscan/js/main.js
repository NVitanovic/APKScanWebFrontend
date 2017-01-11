var checkboxTos = document.getElementById('checkboxTos');
var buttonScan = document.getElementById('buttonScan');
var buttonUpload = document.getElementById('buttonUpload');
var fileInput = document.getElementById('fileInput');

checkboxTos.onchange = function()
{
	buttonScan.disabled = !this.checked;
};

buttonUpload.onclick = function()
{
	fileInput.click();
};



buttonScan.onclick = function()
{
	window.open("results.html", "_self");
};

fileInput.onchange = function()
{
	var filename = fileInput.value.replace(/^.*\\/, "");
	alert(filename);
	// make a span for name of file to scan
	// get that text and set it \/\/\/
	// http://bit.ly/2jk39gc
}

// MD5 http://bit.ly/2ih0aQR