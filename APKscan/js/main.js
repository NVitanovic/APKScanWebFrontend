var checkboxTos = document.getElementById('checkboxTos');
var buttonScan = document.getElementById('buttonScan');
var buttonUpload = document.getElementById('buttonUpload');
var fileInput = document.getElementById('fileInput');
var fileName = document.getElementById('fileName');
// hashes are automatically calculated after file is chosen
// they are in global variables named MD5 and SHA256

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
	if(name != "")
		fileName.innerHTML = name;
	
	// TODO: uplaod a file -> notify if failed
}

buttonScan.onclick = function()
{
	// TODO: if file is uploaded go to results page

	window.open("results.html", "_self");
};


document.getElementById('buttonHash').onclick = function()
{
	alert("MD5: " + MD5 + "\nSHA256: " + SHA256);
}