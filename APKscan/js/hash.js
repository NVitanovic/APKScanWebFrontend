var MD5;
var SHA256;

$('#fileInput').change(function()
{
    $('#modalComputingHash').modal({
			backdrop: 'static',
			keyboard: false
	}); 
    var reader = new FileReader();
    reader.addEventListener('load',function()
    {
        
        var hashMD5 = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(this.result));
        var hashSHA256 = CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(this.result));
        MD5 = hashMD5.toString(CryptoJS.enc.Hex);
        SHA256 = hashSHA256.toString(CryptoJS.enc.Hex);
        $('#modalComputingHash').modal('hide');
    });
    reader.readAsBinaryString(this.files[0]);
});

