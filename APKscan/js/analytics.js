function fingerprintObject()
{
    //ovo je klasa koju cemo prosledjivati u mongo
    this.fingerprint;
    this.userAgent;
    this.browser;
    this.browserVersion;
    this.engine;
    this.engineVersion;
    this.OS;
    this.OSVersion;
    this.device;
    this.deviceType;
    this.deviceVendor;
    this.cpu;
    this.isMobile;
    this.isMobileAndroid;
    this.isMobileOpera;
    this.isMobileWindows;
    this.isMobileBlackBerry;
    this.isMobileIOS;
    this.isIphone;
    this.isIpad;
    this.isIpod;
    this.screenColorDepth;
    this.screenCurrentResolution;
    this.screenAvailableResolution;
    this.screenXDPI;
    this.screenYDPI;
    this.plugins;
    this.isJava;
    this.javaVersion;
    this.isFlash;
    this.flashVersion;
    this.isSilverlight;
    this.silverlightVersion;
    this.isMimeTypes;
    this.mimeTypes;
    this.fonts;
    this.isLocalStorage;
    this.isSessionStorage;
    this.isCookie;
    this.timezone;
    this.language;
    this.isCanvas;
    this.geoLocation;
}

function mimeTypeLookup(fname, include_charset, default_mime_type) {
    var ext, charset = "UTF-8";

    if (include_charset === undefined) {
        include_charset = false;
    }

    if (typeof include_charset === "string") {
        charset = include_charset;
        include_charset = true;
    }

    if (fname.lastIndexOf(".") > 0) {
        ext = fname.substr(fname.lastIndexOf(".") + 1).toLowerCase();
    }
    if(ext === "") {
        ext = fname;
    }
    for(var i = 0; i < mimeTypes.length; i++)
    {
        if(mimeTypes[i].hasOwnProperty("ext"))
        {
            if (mimeTypes[i].ext === ext) {
                return mimeTypes[i].mime_type;
            }
        }
    }
    return false;
}

function fileInfo(file, md5Hash)
{
    this.lastModifiedDate = file.lastModifiedDate;
    this.name = file.name;
    this.size = file.size;
    this.type = file.type;
    if(this.type === "")
    {
        this.type = mimeTypeLookup(this.name);
    }
    this.MD5hash = md5Hash;
}

function mongoObject()
{
    this.fileStatistics;
    this.fingerprintStatistics;
}

function gatherFileData(file, md5hash)
{
    var fileStats = new fileInfo(file, md5hash);

    return fileStats;
}

function gatherFingerprintData()
{
    //treba da se posalje GET request na http://freegeoip.net/json
    return $.ajax({
        type: "GET",
        url: "http://freegeoip.net/json/",
        dataType: "json",
        async: false
    });
}

function getFingerprintData(geoData)
{
    //ovde cemo popunjavati polja objekta pre slanja u mongo
    var client = new ClientJS();
    var fingerprintData = new fingerprintObject();

    fingerprintData.geoLocation = geoData;
    fingerprintData.fingerprint = client.getFingerprint();
    fingerprintData.userAgent = client.getUserAgent();
    fingerprintData.browser = client.getBrowser();
    fingerprintData.browserVersion = client.getBrowserVersion();
    fingerprintData.engine = client.getEngine();
    fingerprintData.engineVersion = client.getEngineVersion();
    fingerprintData.OS = client.getOS();
    fingerprintData.OSVersion = client.getOSVersion();
    fingerprintData.device = client.getDevice();
    fingerprintData.deviceType = client.getDeviceType();
    fingerprintData.deviceVendor = client.getDeviceVendor();
    fingerprintData.cpu = client.getCPU();
    fingerprintData.isMobile = client.isMobile();
    fingerprintData.isMobileAndroid = client.isMobileAndroid();
    fingerprintData.isMobileOpera = client.isMobileOpera();
    fingerprintData.isMobileWindows = client.isMobileWindows();
    fingerprintData.isMobileBlackBerry = client.isMobileBlackBerry();
    fingerprintData.isMobileIOS = client.isMobileIOS();
    fingerprintData.isIphone = client.isIphone();
    fingerprintData.isIpad = client.isIpad();
    fingerprintData.isIpod = client.isIpod();
    fingerprintData.screenColorDepth = client.getColorDepth();
    fingerprintData.screenCurrentResolution = client.getCurrentResolution();
    fingerprintData.screenAvailableResolution = client.getAvailableResolution();
    fingerprintData.screenXDPI = client.getDeviceXDPI();
    fingerprintData.screenYDPI = client.getDeviceYDPI();
    fingerprintData.plugins = client.getPlugins();
    fingerprintData.isJava = client.isJava();
    fingerprintData.javaVersion = client.getJavaVersion();
    fingerprintData.isFlash = client.isFlash();
    fingerprintData.flashVersion = client.getFlashVersion();
    fingerprintData.isSilverlight = client.isSilverlight();
    fingerprintData.silverlightVersion = client.getSilverlightVersion();
    fingerprintData.isMimeTypes = client.isMimeTypes();
    fingerprintData.mimeTypes = client.getMimeTypes();
    fingerprintData.fonts = client.getFonts();
    fingerprintData.isLocalStorage = client.isLocalStorage();
    fingerprintData.isSessionStorage = client.isSessionStorage();
    fingerprintData.isCookie = client.isCookie();
    fingerprintData.timezone = client.getTimeZone();
    fingerprintData.language = client.getLanguage();
    fingerprintData.isCanvas = client.isCanvas();

    return fingerprintData;
}