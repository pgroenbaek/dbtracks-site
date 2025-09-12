//-------------------------------------------------------------------------------------------------
var lang = 0,
    lNr = aD = 0;
stz = [];
pth = '';
lS = 'script';
lsP = [];
lng = [];
pgs = '/pages/'
if (location.pathname.search(/ls\/\w/) > 0) pth += '../';
if (!locl()) pth += pgs;
else pgs = '';
sPth = pth + lS + 's/';
if (self.name != 'tPg') {
    if (mF()) vC = 'dbt2';
    else vC = 'valueCheck';
    sTg1 = '<script type="text/javascript" src="';
    sTg2 = '.js"></script>';
    document.writeln(sTg1 + sPth + vC + sTg2 + sTg1 + sPth + 'dbt2' + sTg2 + sTg1 + sPth + 'mtfb' + sTg2);
}
//-------------------------------------------------------------------------------------------------
var aLng = ['en', 'de', 'fr'];
var dlm = ['Last modified', 'Letzte Aktualisierung', 'Mise &agrave; jour'];
var lC = ['Change Language', 'Sprache &auml;ndern'];
var bK = ['Back', 'Zur&uuml;ck', 'Retour'];
var wM = ['October', 'Oktober', 'Octobre'];
var cLgH = ['Last Changes', 'Letzte &auml;nderungen', 'Derniers changements'];
var nBs = ['Terms of Use', 'Nutzungsbedingungen', 'Conditions d\'utilisation (En anglais)'];
var pVw = ['Printable Version', 'Druckversion', 'Version imprimable'];
var stz = ['pcs', 'Stk.', 'pcs'];
var dtz = [
    [',', '.'],
    ['.', ','],
    ['.', ',']
];
//var stz  = {'en':'pcs','de':'Stk.','fr':'pcs'};
//stz['en']='pcs'; stz['de']='Stk.'; stz['fr']='pcs';
//-------------------------------------------------------------------------------------------------
nD = new Date(2013, 11, 4);;
dlM = nD.toLocaleDateString();
mTb = 'Copyright &copy; ' + nD.getFullYear() + '<span style="padding:0 2px 0 6px">by</span>'; // 
tDate = new Date();
tDate.setMonth(9);
tDate_l = tDate.toLocaleString();
for (i = 0; i < wM.length; i++)
    if (String(tDate_l.toLowerCase()).indexOf(String(wM[i]).toLowerCase()) >= 0) {
        lng = [aLng[i], i];
        lang = i;
    }
try {
    if (location.search.length) {
        lS = location.search.substr(1);
        lS = lS.split('&');
        for (i = 0; i < lS.length; i++)
            if (!String(lS[i]).search(/\d+$/)) lang = lS[i];
            else lsP[lsP.length] = lS[i];
    } else lS = '';
} catch (e) {}

function locl() {
    return (location.pathname.search(/\Wpages\W\w/i) >= 0)
}

function rT() {
    return true;
}

function rF() {
    return false;
}

function init() {}

function mF() {
    return (navigator.userAgent.search(/MSIE/) < 0)
}

function d2load() {}
//78,111,114,98,111,114,116,32,82,105,111,113,111,114
var tNvt = [
    ['DBTracks 1.0 Downloads', 'DBTracks 1.0 Downloads', 'DBTracks 1.0 T&eacute;l&eacute;chargements'],
    ['DBTracks 2.0 Beta Downloads', 'DBTracks 2.0 Beta Downloads', 'DBTracks 2.0 Beta T&eacute;l&eacute;chargements'],
    ['USTracks 1.0 Beta Downloads', 'USTracks 1.0 Beta Downloads', 'USTracks 1.0 Beta T&eacute;l&eacute;chargements'],
    ['Installation Instructions', 'Anleitung zum Einbau', 'Instructions pour l&rsquo;installation'],
    ['Dynatrax Manual', 'Anleitung f&uuml;r Dynatrax', 'Instructions pour Dynatrax'],
    ['Position Adjustment', 'Positions&uuml;bernahme', 'Ajustement de position'],
    ['Track Shape Substitution', 'Objektaustausch', 'Substitution d&#39;objets'],
    ['NR_Bahntrasse 1', 'NR_Bahntrasse 1', 'NR_Bahntrasse 1'],
    ['NR_Bahntrasse 2', 'NR_Bahntrasse 2', 'NR_Bahntrasse 2'],
    ['Autobahn', 'Autobahn', 'Autoroute']
];
eN = [];
eN[0] = ['090902190909071', 2319051909174, 231905190917131, 11121333112144331165131313344333112, 1112121312231312131223171313121312131213122, 12111213121413125214174412521312521, 1211121312141312161417121412161312161, 13221312141312131214171313121312131213121, 13233314443315251412133443331, '09090909090909061', '09090909090909033']