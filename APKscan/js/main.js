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
	// make a span for name of file to scan
	// get that text and set it \/\/\/
	// http://bit.ly/2jk39gc
};

buttonScan.onclick = function()
{
	window.open("results.html", "_self");
};