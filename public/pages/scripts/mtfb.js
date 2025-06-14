//-------------------------------------------------------------------------------------------------
var pTitle, dP, nP, ntd, nwin, sLng, bLng, lNews, kC, prp, dL = [],
    aTrack = [],
    lP = [0],
    lPcs = [],
    cPs = [],
    tLr = [],
    nLr = [];
manuals = [];
lkset = tNr = swdst = lNr = iRun = cRun = 0;
dN = 'index';
tz = ['\/', '.'];
if (!parent.frames.length && location.pathname.length > 1) dN = location.pathname.substring(location.pathname.lastIndexOf('\/') + 1, location.pathname.lastIndexOf('.'));
tNp = [
    ['index', 'Home'],
    ['Impressum10', 'Impressum'],
    ['DBTracks10', 'DBTracks'],
    ['Bahntrasse1', 'Bahntrasse1'],
    ['Bahntrasse2', 'Bahntrasse2'],
    ['DL_bab', 'Autobahn'],
    ['Manual_P', 'Position'],
    ['Manual_A', 'Alias'],
    ['Manual_D', 'Dynatrax'],
    ['Manual_I', 'Installation'],
    ['DBTracks20b', 'DBTracks2'],
    ['Manual_Dtx1', 'Dtx1'],
    ['USTracks10b', 'USTracks'],
    ['XTracks', 'XTracks'],
    ['DownloadAccessories', 'Download Accessories'],
    ['DownloadBAB', 'Download BAB'],
    ['DownloadDBTracks', 'Download DBTracks'],
    ['DownloadDBTracks2', 'Download DBTracks v2.0b'],
    ['DownloadUSTracks', 'Download USTracks']
];
tNpL = tNp.length;
ebM = ['direct', 'addREF', 'addGANTRY'];
manuals[ebM[0]] = ['RE Object Selector', 'SE Objektauswahl', 'S&eacute;lecteur d\'objets'];
manuals[ebM[1]] = ['add REF', 'add REF', 'add REF'];
manuals[ebM[2]] = ['add GANTRY', 'add GANTRY', 'add GANTRY'];
manuals[ebM[3]] = ['Setup', 'Installation', 'Installation'];
manuals[tNp[6][0]] = ['Position Adjustment', 'Positions&uuml;bernahme', 'Ajustement de position'];
manuals[tNp[7][0]] = ['Object Substitution', 'Objektaustausch', 'Substitution des objets'];
tInf = ['Number of available 3D objects on this page:', 'Verf&uuml;gbare 3D-Objekte auf dieser Seite:'];
pImg = pth + 'images/';
pImgIco = pImg + 'ico/';
picP = ['def', , 'dbt', , , 'bab', , , , , 'dbt'];
newB = ['NEW', 'NEU'];
tNv = [2, 10, 12, 9, 8, 6, 7, 3, 4, 5];
dLP = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, ]; // lng: SystemLocale; lang: gew&auml;hlte Sprache, sLng: Verf&uuml;gbare Sprache.
//-------------------------------------------------------------------------------------------------
if (lsP.length && String(tNp.join('|')).indexOf(lsP[0]) < 0) ld2s(lsP[0]);
else if (!nP) prep();

function prep() {
    prp = 1;
    for (i = 0; i < tNp.length; i++) {
        tNp[tNp[i][0]] = i;
        if (lsP.length) {
            if (lsP[0] == tNp[i][1]) {
                nP = i;
                lsP.shift();
            }
        } else if (dN == tNp[i][0]) nP = i;
    }
    if (lsP.length && nP != 12) {
        lsP.tg = [];
        lsP.sc = 0;
        lsP.sg = [];
        lsP.ht = [];
        lsP.hl = [];
        for (i = 0; i < lsP.length; i++)
            if (!lsP[i].search(/(t\d{2,})$/)) lsP.tg[lsP.tg.length] = RegExp.$1;
            else if (!lsP[i].search(/sc?d?(\d{3,})$/)) lsP.sc = parseInt(RegExp.$1);
        else if (!lsP[i].search(/g(\d{2,})$/)) lsP.sg[lsP.sg.length] = RegExp.$1;
        else if (!lsP[i].search(/h(\d{3,})$/)) lsP.ht[lsP.ht.length] = RegExp.$1;
        else lsP.hl[lsP.hl.length] = lsP[i];
    } // t0(tg)=klappt Zielgruppe auf, s0(sc)=scrollt, g0(sg)=klappt nur Zielgruppe auf, alle anderen zu, h0(ht)=hebt nur in dieser Gruppe hervor
} //alert('prep nP: '+nP+'\ndN: '+dN);
if (location.hostname.search(/dbtracks\.de/i) >= 0 && !lS && !nP) nP = 2;
else if (dN != 'default' && !isNaN(tNp[dN]) && String(dLP.join('|')).indexOf(nP + '|') < 0)
    if (!location.protocol.search(/file/)) location.href = location.href.substring(0, location.href.lastIndexOf('\/')).replace(/pages/, 'default\.html') + '?' + tNp[tNp[dN]][1];
    else nP = tNp[dN];
//-------------------------------------------------------------------------------------------------
function init() {
    if (lsP[0] && tNpL == tNp.length && !nP) tNpV();
    if (self.name) return;
    else { //cChk(tNr+' '+nP);
        if (!prp)
            if (lsP.length == 1 && lsP[0].search(/\.zip$|\.rar$/) > 0 && location.hostname.search(/\.com$/) > 0) {
                drDl('zub/' + lsP[0]);
                setTimeout('lPg(0,1)', 1000)
            } else document.location.replace('error.html');
        if (nP && nP != tNr) {
            tNr = lP[0] = nP;
            nP = '';
            if (location.pathname.search(/\Wpages\W/) < 0) {
                lPg(tNr, 1);
                return;
            } else {
                dP = 1;
                if (location.hostname.search(/dbtracks/i) >= 0) vTtl = 'DBTracks - ';
                else if (location.hostname.search(/MSTS-Tiefbau/i) >= 0) vTtl = 'MSTS-Tiefbau - ';
                else vTtl = '';
            }
        }
        //	if( !document.getElementById('tFr') ) {
        //		var cE = document.createElement('div'); cE.setAttribute('id','tFr'); document.getElementsByTagName('body')[0].appendChild(cE); document.getElementById('tFr').style.display='none';
        //	}
        //	if( !document.getElementById('cLog') ) { var cE=document.createElement('div'); cE.setAttribute('id','cLog'); document.body.insertBefore(cE,document.getElementById('cntnt')); }
        //if (!tNr) tFrm(pgs + 'ChangeLog.html');
        lPcs[tNr] = [];
        document.body.ondblclick = prntview;
        var cE = document.createElement('div');
        cE.setAttribute('id', 'cL');
        document.getElementsByTagName('body')[0].appendChild(cE);
        document.getElementById('cL').style.display = 'none';
        ntd = document.getElementsByTagName('td');
        document.getElementsByTagName('h2')[0].innerHTML = '&#160;Loading ...';
        if (location.hostname.search(/MSTS-Tiefbau\.de/i) >= 0) document.getElementsByTagName('img')[0].src = pImg + 'tiefbau.png';
        if (document.getElementById('tinfo')) getTinfo(0);
        document.body.onmouseup = cPos;
        diffH = (screen.availHeight - document.body.scrollHeight);
        if (tNr > 0) h = 33;
        else h = 69;
        document.getElementsByTagName('h2')[0].style.top = h;
        if (document.getElementById('tNav') && !document.getElementById('tNav').innerHTML) {
            tN = '<table cellspacing="1" cellpadding="0">' // style="background-color:#ffff00"
                +
                '<tr><td><span id="bKl" class="lnk" style="position:relative;left:-22px;top:-10px;color:#999999;visibility:hidden" onclick="lBk()">&#160;</span></td></tr>';
            for (i = 0; i < tNv.length; i++) tN += '<tr><td id="tN' + i + '"></td></tr>';
            document.getElementById('tNav').innerHTML = tN + '</table>';
        }
        if (document.getElementById('bKl'))
            if (lP.length > 1) document.getElementById('bKl').style.visibility = 'visible';
            else document.getElementById('bKl').style.visibility = 'hidden';
        document.getElementById('cntnt').oncontextmenu = new Function('return false;');
        if (!mF()) try {
            if (tNr == 10 && !getStatus) ld2s('dbt2');
        } catch (e) {}
        if (!pTitle) pTitle = document.title;
        allSp = document.getElementsByTagName('span');
        allDiv = document.getElementsByTagName('div');
        for (i = 0; i < allSp.length; i++)
            if (String(allSp[i].onclick).search(/tShw/) > 0 && String(allSp[i].parentNode.innerHTML).search(/<img/i) < 0) {
                tPar = 1;
                if (String(allSp[i].onclick).search(/,(\d)/) > 0) tPar = RegExp.$1;
                var lArr = document.createElement('img');
                if (allSp[i].id == 't010') {
                    lArr.setAttribute('className', 'lth');
                    at = 'f';
                } else at = 'd';
                lArr.setAttribute('src', pImgIco + 'p' + at + '0.png');
                allSp[i].parentNode.insertBefore(lArr, document.getElementById(allSp[i].id));
                allSp[i].onclick = '';
                if (allSp[i].id != 't010') allSp[i].parentNode.onclick = new Function('tShw("' + allSp[i].id + '",' + tPar + ')');
                allSp[i].parentNode.style.cursor = 'pointer';
                if (allSp[i].className == 'lnk') {
                    allSp[i].parentNode.onmouseover = new Function("this.childNodes[1].className='hlnk2'");
                    allSp[i].parentNode.onmouseout = new Function("this.childNodes[1].className='hlnk'");
                }
            }
        nth = document.getElementsByTagName('th');
        for (i = 0; i < nth.length; i++)
            if (nth[i].onclick && nth[i].style.cursor != 'pointer' && String(nth[i].onclick).indexOf('cLog') < 0) {
                nth[i].style.cursor = 'pointer';
                var tLnk = document.createElement('img');
                tLnk.setAttribute('src', pImgIco + 'ph1.png');
                nth[i].insertBefore(tLnk, document.getElementById(nth[i].firstChild.id));
            }
        allListLinks = document.getElementsByTagName('li');
        for (i = 0; i < allListLinks.length; i++)
            if (!String(allListLinks[i].className).indexOf('lnk') && mF()) {
                allListLinks[i].style.top = "-1px";
                allListLinks[i].style.left = "5px";
            }
        alngs = aLng.length;
        sLng = lang;
        allId = [];
        newsId = [];
        for (i = 0; i < aLng.length; i++)
            if (!document.getElementById(aLng[i])) {
                aLng[i] = '';
                alngs--
            } if (alngs == 1)
            for (i in aLng)
                if (aLng[i]) sLng = i;
        if (lang == alngs && aLng[0]) {
            sLng = 0;
            bLng = lang
        } else bLng = '';
        newsDv = [];
        for (i = 0; i < aLng.length; i++)
            if (aLng[i])
                if (document.getElementById('news_' + aLng[i])) newsDv[newsDv.length] = i;
        newsDv.reverse();
        for (i = 0; i < newsDv.length; i++) {
            l = aLng[newsDv[i]];
            n1 = [];
            n1 = document.getElementById('news_' + l).innerHTML.split('[');
            if (!n1[0].search(/vOff=(\d+)/)) newsId['vOff'] = RegExp.$1;
            else newsId['vOff'] = 40;
            n1.shift();
            if (!i)
                for (j = 0; j < n1.length; j++) newsId[j] = [];
            for (j = 0; j < newsId.length; j++)
                if (n1[j]) {
                    newsId[j][l] = n1[j].split(']');
                    if (i)
                        if (newsId[j][l][0] != newsId[j][aLng[newsDv[i - 1]]][0]) {
                            alert('Fehler (Idx=' + j + '): Datenfelder sind nicht gleich:\n' + newsId[j][aLng[newsDv[i - 1]]][0] + ' : ' + newsId[j][l][0]);
                            return;
                        }
                    if (l == 'en') newsId[j][l][0] = getDat(newsId[j][l][0]);
                    if (i == newsDv.length - 1) {
                        newsId[j]['Age'] = getAge(newsId[j][l][0]); /*newsId[j]['Idx'] = j;*/
                    }
                }
        }
        for (i = 0; i < aLng.length; i++)
            if (aLng[i]) {
                l = aLng[i];
                if (document.getElementById(l)) allId[l] = document.getElementById(l).innerHTML.split('[');
                if (allId[l][1].search(/^t00\]/) < 0) allId[l][0] = 't00]' + pTitle;
                else allId[l].shift();
                if (!lPcs[tNr].length) {
                    lPcs[tNr] = [];
                    for (j = 0; j < ntd.length; j++) {
                        if (!String(ntd[j].innerHTML).search(/^\s*(\d+\W\d+\W20\d\d)\s*$/)) {
                            ntd[j].name = RegExp.$1;
                            ntd[j].className = 'nwr';
                        }
                        if ((String(ntd[j].onclick).indexOf('lWin') > 0 && ntd[j].id) || !String(ntd[j].className).search(/p[JP]/)) {
                            k = j;
                            if (!String(ntd[j].className).search(/p[JP]/)) k = (j + 1);
                            lPcs[tNr][lPcs[tNr].length] = [ntd[k].id];
                        }
                    }
                }
                for (j = 0; j < allId[l].length; j++) {
                    allId[l][j] = allId[l][j].split(']');
                    allId[l][j][1] = allId[l][j][1].split('|');
                    if (i) allId[allId[l][j][0]] = j;
                    if (allId[l][j][1][0].search(/<!(t\d+,[^>]+)>/) >= 0) {
                        k = RegExp.$1.split(','); // zus&auml;tzliche Bilder im Tabellentext
                        if (!i) {
                            ml = lPcs[tNr].length;
                            lPcs[tNr][ml] = [k[0]]; /*lPcs[tNr][ml]['id'] = k[0];*/
                        }
                        lPcs[tNr][ml][l] = k[1];
                    }
                    for (k = 0; k < lPcs[tNr].length; k++)
                        if (lPcs[tNr][k][0] == allId[l][j][0]) lPcs[tNr][k][l] = allId[l][j][1][0].replace(/::[^(::)]+::/g, ' ').replace(/<\/?span>?( class\="?dn"?)?>/ig, '');
                }
                document.getElementById(l).innerHTML = '';
            } lPcs[tNr].sort(); //vChk('newsId');
        if (newsId.length) {
            nTxt = '<table cellspacing="0" cellpadding="0" id="news" style="margin:0"><colgroup><col width="5%"><col width="95%"></colgroup>';
            for (i = 0; i < newsId.length; i++) nTxt += '<tr><td></td><td><ul id="news_' + i + '"></ul></td></tr>';
            document.getElementById('nLst').innerHTML = nTxt + '</table>';
        }
        for (k = 0; k < lPcs[tNr].length; k++) lPcs[tNr][lPcs[tNr][k][0]] = k; // vChk('lPcs'); vChk('allId');
        try {
            for (i = 1; i < alngs; i++)
                for (j = 0; j < allId[aLng[i]].length; j++)
                    if (allId[aLng[i - 1]][j][0] != allId[aLng[i]][j][0]) {
                        alert('Fehler:\n[' + allId[aLng[i - 1]][j][0] + '] in Sprache "' + aLng[i - 1] + '" passt nicht zu\n[' + allId[aLng[i]][j][0] + '] in Sprache "' + aLng[i] + '"');
                        break;
                    }
        } catch (e) {}
        if (tNr == 11 && !mF()) document.getElementById('tBtn').style.posTop = -3;
        if (tNr == 0)
            for (i = 0; i < allDiv.length; i++)
                if (allDiv[i].className == 'cl') {
                    allDiv[i].onmouseover = new Function("this.className='cl2'");
                    allDiv[i].onmouseout = new Function("this.className='cl'");
                }
        if (!document.getElementById('stat')) {
            var cE = document.createElement('div');
            cE.setAttribute('id', 'stat');
            document.body.insertBefore(cE, document.getElementById('cntnt'));
        }
        try {
            if (tNr == 10 && getStatus) {
                d2load();
            }
        } catch (e) {
            return false;
        };
        if (!self.name) {
            iRun = 0;
            setText(sLng);
        }
    }
} //-------------------------------------------------------------------------------------------------
function setText(l) {
    allT = allId[aLng[l]];
    lang = sLng = l;
    if (aLng.join('.').indexOf(lng[0]) < 0) sLng = 0;
    if (alngs == 1)
        for (i in aLng)
            if (aLng[i]) sLng = i;
    if (bLng) {
        lang = bLng;
        bLng = '';
    }
    fl = '';
    allbC = [];
    for (i = 0; i < alngs; i++)
        if (l != i && aLng[i]) fl += '<img src="' + pImgIco + aLng[i] + '.png" class="rtf" onclick="cRun=1;setText(' + i + ')">';
    try {
        if (allT[0][0] == 't00') pTitle = allT[0][1];
    } catch (e) {}
    if (document.getElementById('tinfo')) getTinfo(1);
    document.getElementsByTagName('h2')[0].innerHTML = fl + '<img src="' + pImgIco + aLng[l] + '.png" class="ltf" ondblclick="tShx(\'cntnt\',1)">' + pTitle;
    if (dP) {
        if (String(pTitle).search(/DBTracks|MSTS-Tiefbau/i) >= 0) vTtl = '';
        document.title = vTtl + pTitle;
    }
    for (i = 0; i < allT.length; i++)
        if (!document.getElementById(allT[i][0]) || allT[i][0] == 't00') continue;
        else {
            if (allT[i][1][0].search(/\S/) < 0) document.getElementById(allT[i][0]).parentNode.style.display = 'none';
            if (allT[i][1][0].search(/::/) >= 0) allT[i][1][0] = allT[i][1][0].replace(/::/g, '');
            if (allT[i][1][0].search(/<!(t\d+)[^>]+>/) >= 0) allT[i][1][0] = allT[i][1][0].replace(/<!t\d+[^>]+>/, '<img src="' + pImgIco + 'pic.png" class="tPic" onclick="lWin(\'' + RegExp.$1 + '\')">');
            document.getElementById(allT[i][0]).innerHTML = allT[i][1][0];
            if (allT[i][1] && allT[i][1].length > 1)
                if (document.getElementById('f' + allT[i][0]).style.display != 'none') document.getElementById(allT[i][0]).innerHTML = allT[i][1][1];
                else document.getElementById(allT[i][0]).innerHTML = allT[i][1][0];
        }
    if (tNr)
        if (dP) {
            for (i = 0; i < document.images.length; i++) document.images[i].src = document.images[i].src.replace(/\Wpages(?=\/pages)/i, '');
            for (i = 0; i < document.links.length; i++) document.links[i].href = document.links[i].href.replace(/\Wpages(?=\/pages)/i, '');
        }
    else
        for (i = 0; i < document.links.length; i++)
            if (document.links[i].href.search(/http/) < 0 && document.links[i].href.search(/\/pages/) < 0)
                document.links[i].href = 'pages' + document.links[i].href.substr(document.links[i].href.lastIndexOf('/'));
    if (document.getElementById('bKl')) document.getElementById('bKl').innerHTML = '<< ' + bK[lang];
    allB = document.getElementsByTagName('B');
    for (i = 0; i < allB.length; i++)
        if (allB[i].className == 'pcs') allB[i].innerHTML = String(allB[i].innerHTML).replace(/\s\S+/, ' ' + stz[sLng]);
    if (tNr) try {
        if (tPg.dL) dL = tPg.dL;
        if (dlM != tPg.dlM) {
            nD = tPg.nD;
            dlM = tPg.dlM
        }
    } catch (e) {}
    spc = '<span style="margin:0 8px;color:#777777">&bull;&bull;&bull;</span>';
    pLng = sLng;
    if (alngs > 2 && sLng != 1) pLng = 0;
    spn = spc + spLnk('dWin(\'docs/terms_' + aLng[l] + '.html\',\'HTML\')', nBs[lang], 'wlnk2', 'toU') + spc;
    if (tNr != 1) spn += '<a href="mailto:info%40dbtracks.com"><span class="wlnk2" onmouseenter="this.classList.replace(\'wlnk2\', \'wlnk22\')" onmouseleave="this.classList.replace(\'wlnk22\', \'wlnk2\')" >Contact</span></a>' + spc; //spn+= spLnk('prntview(1)',pVw[lang],'wlnk2') + spc;
    cpL = '<table cellspacing="0" cellpadding="0" style="margin-top:2px"><tr><td style="text-align:left">' + mTb + cAdr(1) + spn + '<td><td style="text-align:right;width:45%" onclick="chkDate(this)">' + dlm[lang] + ': ' + dlM + '</td></tr></table>';
    document.getElementById('cpr').innerHTML = cpL;
    bt = document.getElementsByTagName('button');
    if (dL.length) {
        for (i = 0; i < bt.length; i++)
            if (bt[i].id && !bt[i].onclick && !String(bt[i].id).search(/dL(\d)/)) {
                dLt = dL[RegExp.$1];
                dPp = '';
                if (dLt.indexOf('/dl_files/') < 0) bt[i].onclick = new Function('window.open("' + dLt + '","dL")');
                else {
                    if (dP) dPp = '.';
                    bt[i].onclick = new Function('window.location.href="' + dPp + dLt + '"');
                }
            }
    }
    if (tNr == 1) {
        ctc = ['Contact:', 'Kontakt:', 'Contact:'];
        ftx = '<table cellspacing="0" cellpadding="0" style="margin:0"><tr>';
        if (lang == 1) ftx += '<td style="padding:1px 12px 0 0">Angaben gem. &sect; 5 TMG:</td><td><table cellspacing="0" cellpadding="0" id="tAd"><tr><td id="n0"></td><td id="n1"></td><td id="n2"></td></tr></table></td>';
        document.getElementById('tA').innerHTML = ftx + '<td style="width:60%;text-align:right;vertical-align:bottom"><b>' + ctc[sLng] + '</b> &#160;' + cAdr(2) + '</td></tr></table>';
        if (lang == 1)
            for (i = 0; i < 3; i++)
                for (j = 0; j < 5; j++) document.getElementById('n' + i).innerHTML += '<img src="' + pImg + 'mad/n' + i + j + '.png"><br>';
    }
    nli = document.getElementsByTagName('li');
    if (document.getElementById('news')) {
        nLr = document.getElementById('news').rows;
        pd = 0;
        for (i = 0; i < nLr.length; i++) {
            try {
                if (newsId[i][aLng[sLng]][0]) nLr[i].cells[0].innerHTML = newsId[i][aLng[sLng]][0];
                if (newsId[i][aLng[sLng]][1]) nLr[i].cells[1].firstChild.innerHTML = newsId[i][aLng[sLng]][1];
            } catch (e) {
                alert('114: ' + i);
            } //
            if (newsId[i].Age > 40 && i > 0) {
                nLr[i].className = 'hgray';
                nLr[i].style.display = 'none';
                if (!pd) {
                    pd = i;
                    for (j = 0; j < nLr[i].cells.length; j++) nLr[i].cells[j].style.paddingTop = '6px';
                }
            }
        }
        for (i = 0; i < nli.length; i++)
            if (nli[i].innerHTML.search(/drDl\(\Wupd\/\d{6}/) > 0 && !nli[i].parentNode.id.search(/news_(\d+)/)) {
                nX = RegExp.$1; // Entferne Downloads aus "hgray"
                if (newsId[nX].Age > 40)
                    for (j = 0; j < nli[i].childNodes.length; j++)
                        if (nli[i].childNodes[j].className == 'lnk') {
                            var cE = nli[i].childNodes[j];
                            cE.parentNode.removeChild(cE);
                        }
            }
        if (document.getElementById('t010')) {
            document.getElementById('t010').onclick = '';
            document.getElementById('t010').parentNode.onclick = new Function("cShw('nLst','newsId','f')");
        }
        if (document.getElementById('tLst')) {
            tLr = document.getElementById('tLst').rows;
            textId = [];
            for (i = 0; i < tLr.length; i++)
                for (j = 0; j < tLr[i].cells.length; j++) {
                    if (tLr[i].cells[j].innerHTML.search(/(\d+\W\d+\W20\d\d)/) >= 0) {
                        tl = textId.length;
                        textId[tl] = [tLr[i].cells[j].innerHTML, tLr[i].firstChild.innerHTML];
                        textId[tl]['Age'] = getAge(tLr[i].cells[j].name);
                        textId[tl]['Idx'] = i;
                        if (sLng == 0) tLr[i].cells[j].innerHTML = getDat(tLr[i].cells[j].name);
                        else tLr[i].cells[j].innerHTML = tLr[i].cells[j].name;
                    }
                    tLr[i].cells[0].style.verticalAlign = 'baseline'; //tLr[i].cells[0].style.paddingLeft='2px';
                } //vChk('textId')
            for (j = 0; j < textId.length; j++)
                if (textId[j].Age < 31)
                    if (tLr[textId[j].Idx].parentNode.style.display == 'none' && !iRun) tShw(String(tLr[textId[j].Idx].parentNode.id).replace(/f/, ''));
            iRun = 1;
        }
        for (i = 0; i < newsId.length; i++)
            if (newsId[i].Age < 31) {
                hl2w = '';
                if (newsId[i][aLng[sLng]][1].search(/=\"?hl2\"?>([^<]+)/i) > 0) {
                    hl2w = RegExp.$1;
                    for (j = 1; j < tLr.length; j++)
                        for (k = 0; k < tLr[j].cells.length; k++)
                            if (tLr[j].cells[k].innerHTML.indexOf(hl2w) >= 0) tLr[j].cells[k].style.backgroundColor = '#ccffcc';
                }
                for (j = 0; j < textId.length; j++) {
                    newsId[i]['bC'] = '';
                    textId[j]['bC'] = '';
                    if (newsId[i].Age < 31) {
                        if (newsId[i].Age > 10)
                            nLr[i].cells[0].style.backgroundColor = newsId[i]['bC'] = getnbC(newsId[i].Age);
                        else nLr[i].cells[0].style.backgroundColor = newsId[i]['bC'] = 'rgb(255,204,153)';
                    }
                    if (i == newsId.length - 1) nIa = 50;
                    else nIa = newsId[i + 1].Age;
                    if (textId[j].Age < 31)
                        if (textId[j].Age < nIa && textId[j].Age >= newsId[i].Age) {
                            if (newsId[i][aLng[sLng]][1].search(/<!news>/i) >= 0) {
                                tLr[textId[j].Idx].cells[4].innerHTML = '<i class="hl">' + newB[sLng] + '</i> &#160;' + tLr[textId[j].Idx].cells[4].innerHTML;
                            }
                            if (textId[j].Age > 10) {
                                tLr[textId[j].Idx].style.backgroundColor = textId[j]['bC'] = getnbC(textId[j].Age);
                                tLr[textId[j].Idx].cells[3].style.color = '#880000';
                            } else {
                                tLr[textId[j].Idx].style.backgroundColor = textId[j]['bC'] = 'rgb(255,204,153)';
                                tLr[textId[j].Idx].cells[3].style.color = '#cc0000';
                            }
                        }
                    if (newsId[i].bC == textId[j].bC) {
                        nLr[i].cells[0].onmouseover = new Function('hlDat(' + i + ',1)');
                        nLr[i].cells[0].onmouseout = new Function('hlDat(' + i + ',0)');
                        nLr[i].cells[0].ondblclick = new Function('hlDat(' + i + ',2)');
                    }
                    allbC[i] = newsId[i]['bC'];
                }
            } else {
                cll = nLr[i].cells[1];
                if (cll.innerHTML.search(/class=\"?hl2\"?>([^<]+)/i) > 0) cll.innerHTML = cll.innerHTML.replace(/<span class=\"?hl2\"?>[^<]+<\/span>/i, RegExp.$1);
            }
    }
    if (document.getElementById('tLst'))
        for (i = 0; i < ntd.length; i++)
            if (ntd[i].className == 'nwr' || ntd[i].className == 'pJ' || !String(ntd[i].parentNode.firstChild.id).search(/([zdus][ubpst][bdtxf]|b[ak][bs]|tiefbau)/)) {
                dk = RegExp.$1;
                if (String(ntd[i].innerHTML).search(/(\w{3})\w*\.rar\s*$|\.zip\s*$|\.pdf\s*$/) >= 0) {
                    sbF = String(RegExp.$1);
                    sFn = String(ntd[i].innerHTML).replace(/\s+$/, '');
                    if (ntd[i].id == 'dbt' && !sbF.search(/DS\d|BAB/)) sbF = 'BAB';
                    else if (!sFn.search(/DB\d+sh|DB_sh/)) sbF = 'DBsh';
                    else if (tNr == 10 && sFn.search(/DB\d+\w+x/) >= 0 && sFn.search(/DB\d_textures/) < 0) sbF = '';
                    else if (sbF.search(/^D[BR]\d/) < 0 || dk != 'dbt') sbF = ''; // if( ntd[i].innerHTML.search(/^DB/)<0 ) alert('sbF: '+sbF+'\n'+ntd[i].innerHTML+'\ndk: '+dk)
                    if (sFn.search(/\.pdf/) > 0) nW = 1;
                    else nW = 0;
                    if (sbF) sbF += '/';
                    lTxt = '<span class="lnk" onclick="drDl(' + i + ',\'' + sbF + '\',' + nW + ')"' +
                        ' onmouseover="this.className=\'lnk2\';if(aD) showStat(\'/dl_files/' + dk + '/' + sbF + sFn + '\')"' +
                        ' onmouseout ="this.className=\'lnk\'; if(aD) showStat()">' +
                        '<span id="dl' + i + '" style="margin-left:4px;vertical-align:3px">' + sFn + '</span></span>';
                    ntd[i].style.padding = '0';
                    ntd[i].innerHTML = lTxt;
                    if (document.getElementById('t011') && document.getElementById('t011').innerHTML.search(/(\w+\.(rar|zip))/) > 0)
                        if (RegExp.$1 == sFn) {
                            document.getElementById('t011').style.backgroundColor = ntd[i].parentNode.style.backgroundColor = '#ffbbbb'
                        }
                }
                if (!ntd[i].id && ntd[i] != ntd[i].parentNode.lastChild) {
                    ntd[i].style.textAlign = "right";
                    ntd[i].style.whiteSpace = "nowrap";
                    if (ntd[i].parentNode.parentNode.parentNode.id != 'news' && !ntd[i].style.color) ntd[i].style.color = "#999999";
                }
                if (!String(ntd[i].id).search(/l(\d+)$/)) {
                    k = RegExp.$1;
                    ntd[i].style.paddingLeft = '4px';
                    if (k < 3) {
                        mnl = manuals[ebM[k]][lang];
                        mlk = ' style="';
                    } else {
                        mnl = manuals[tNp[k][0]][lang];
                        mlk = ' class="lnk" onclick="lPg(' + k + ')" style="margin:0;padding:0;';
                    }
                    ntd[i].innerHTML = '<span' + mlk + 'white-space:nowrap">' + mnl + '</span>'; //alert(ntd[i].innerHTML)
                }
                if (!String(ntd[i].className).search(/p[JP0]$/)) {
                    ntd[i + 1].style.borderLeft = 'none';
                    ntd[i].style.borderRight = 'none';
                }
                //		if( ntd[i].className=='p0' ) ntd[i].style.paddingLeft="21px";
                if (!String(ntd[i].className).search(/p[JP]$/)) ntd[i].innerHTML = '<img src="' + pImgIco + 'pic.png" onclick="lWin(this.parentNode.nextSibling.id)" style="cursor:pointer">';

            }
    if (tNr == 3 || tNr == 4) {
        if (dP)
            for (i = 0; i < ntd.length; i++)
                if (!ntd[i].id.search(/c\d\d$/)) ntd[i].style.backgroundImage = ntd[i].style.backgroundImage.replace(/pages\W/, '');
    }
    if (tNr == 6 || tNr == 7) {
        if (dP) arr = pics;
        else arr = tPg.pics;
        for (i = 0; i < 6; i++) {
            lg = l;
            if (l == 1 && i != 1 && i != 4) lg = 0;
            document.getElementById('p' + i).src = pImg + 'mnl/' + arr[aLng[l]][i] + '.png';
        }
    }
    if (tNr == 10) {
        /*document.getElementById('th0').innerHTML = dlm[lang]+': '+dlM;*/
        try {
            getStatus();
        } catch (e) {
            /*setTimeout('getStatus()',1000)*/ }
    }
    if (document.getElementById('mtab')) document.getElementById('mtab').style.display = 'block'; //if( tNr==10 ) tShw('t91',1);
    for (i = 0; i < tNvt.length; i++) {
        tNvObj = document.getElementById('tN' + i);
        if (tNr != tNv[i]) {
            tNvObj.innerHTML = spLnk(Number(tNv[i]), tNvt[i][lang], 'wlnk');
            tNvObj.style.cursor = 'pointer';
        } else {
            tNvObj.innerHTML = tNvt[i][lang];
            tNvObj.style.cursor = 'default';
        }
    }
    uLnk();
    //	if( tNr==2 || tNr==10 ) nli=document.getElementsByTagName('li');
    for (i = 0; i < ntd.length; i++) {
        if (!ntd[i].innerHTML || ntd[i].innerHTML.search(/\S/) < 0) ntd[i].innerHTML = '&#160;';
        if (ntd[i].className == 'sqr') {
            var cE = document.createElement('img');
            cE.setAttribute('src', pgs + 'images/ico/sqr.png');
            ntd[i].insertBefore(cE, ntd[i].firstChild);
        }
    }
    if (document.getElementById('tLst'))
        for (i = 0; i < ntd.length; i++)
            if (ntd[i].parentNode.parentNode.parentNode.id == 'tLst')
                if (ntd[i].innerHTML.search(/KB|MB/) > 0) ntd[i].style.whiteSpace = 'nowrap';
    if (lsP.length) {
        try {
            if (lsP.tg.length)
                for (i = 0; i < lsP.tg.length; i++)
                    if (lsP.tg[i] && document.getElementById('f' + lsP.tg[i]).style.display == 'none') tShw(lsP.tg[i], 1);
        } catch (e) {}
        if (lsP.sc) window.scrollBy(0, lsP.sc);
        if (lsP.hl)
            if (lsP.hl.length)
                for (i = 0; i < lsP.hl.length; i++) {
                    hlW = lsP.hl[i].replace(/%20/gi, ' ');
                    if (hlW.length < 3) {
                        alert('Fehler:\nDer Suchbegriff muss aus mindestens drei Zeichen bestehen.');
                        return;
                    }
                    for (j = 0; j < ntd.length; j++)
                        if (ntd[j].innerHTML.indexOf(hlW) >= 0 && ntd[j].parentNode.parentNode.parentNode.id == 'tLst') {
                            hTR = ntd[j].parentNode;
                            hId = hl1 = 0;
                            if (!hTR.parentNode.id.search(/ft(\d{3,})$/) || !hTR.id.search(/ft(\d{2,})$/)) hId = RegExp.$1;
                            if (lsP.ht.length && hId)
                                if (String(lsP.ht).indexOf(hId) < 0) hl1 = 1;
                            if (hId && !lsP.tg.length && hTR.parentNode.style.display == 'none') tShw('t' + hId);
                            if ((lsP.tg.length && String(lsP.tg).indexOf(hId) >= 0) || !lsP.tg.length)
                                for (k = 0; k < hTR.cells.length; k++) {
                                    hTR.cells[k].style.backgroundColor = '#eaff80';
                                    if (k) hTR.cells[k].innerHTML = hTR.cells[k].innerHTML.replace(hlW, '<span class="hlW">' + hlW + '</span>');
                                }
                        }
                }
        if (tNr == 2 || tNr == 10)
            for (l = 0; l < lsP.hl.length; l++) {
                hlW = lsP.hl[l];
                for (j = 0; j < nli.length; j++)
                    if (!nli[j].parentNode.id.search(/(news_\d+)/) && nli[j].innerHTML.indexOf(hlW) >= 0) {
                        nwId = RegExp.$1;
                        hLg = nwId.length;
                        hTD = document.getElementById(nwId).parentNode;
                        if (nli[j].innerHTML.search(/<li>/i) >= 0 && nli[j].innerHTML.search(/id="?(s\d{6})"?/i) > 0) {
                            sId = RegExp.$1;
                            pObj = document.getElementById(RegExp.$1);
                            if (pObj.style.display == 'none') tShx(sId, 1);
                        } else pObj = hTD.parentNode.parentNode;
                        for (k = 0; k < pObj.childNodes.length; k++)
                            if (pObj.childNodes[k].innerHTML && pObj.childNodes[k].innerHTML.indexOf(hlW) >= 0)
                                if (pObj.childNodes[k].innerHTML.search(/<li>/i) >= 0)
                                    for (l = 0; l < pObj.childNodes[k].childNodes.length; l++) hlSub(pObj.childNodes[k].childNodes[l]);
                                else {
                                    hlSub(pObj.childNodes[k]);
                                    hlSub(pObj.parentNode.parentNode.parentNode.parentNode.firstChild)
                                }
                        nli[j].innerHTML = nli[j].innerHTML.replace(hlW, '<span class="hlW">' + hlW + '</span>');
                        if (hTD.parentNode.style.display == 'none') cShw('nLst', 'newsId', 'f');
                    }
            }
        if (lsP.sg)
            if (lsP.sg.length) {
                for (j = 1; j < 10; j++)
                    if (document.getElementById('ft' + j + '10')) {
                        m = 0;
                        for (k = 0; k < lsP.sg.length; k++)
                            if (lsP.sg[k].indexOf(j + '1')) m++;
                        if (m && document.getElementById('t' + j + '10')) tShw('t' + j + '10');
                    }
                for (k = 0; k < lsP.sg.length; k++) {
                    if (lsP.sg[k].indexOf(j + '1')) m++;
                    if (document.getElementById('ft' + lsP.sg[k]))
                        if (document.getElementById('ft' + lsP.sg[k]).style.display == 'none') tShw('t' + lsP.sg[k]);
                }
            }
    }
    if (cRun && !tNr) chgLog();
    for (i = 0; i < allSp.length; i++)
        if (allSp[i].parentNode.className == 'lnk' && (!allSp[i].id.search(/(dl\d+)/) || String(allSp[i].parentNode.onclick).search(/drDl/) >= 0))
            if (String(allSp[i].parentNode.innerHTML).search(/<IMG/i) < 0) {
                var lImg = document.createElement('img');
                lImg.setAttribute('className', 'pPic');
                lImg.setAttribute('src', pImgIco + 'dld.png');
                allSp[i].parentNode.insertBefore(lImg, allSp[i]);
            }
}
keep = hlBak = 0;

function hlSub(sObj) {
    sObj.style.backgroundColor = '#eaff80';
    sObj.style.color = '#000000';
    sObj.style.padding = '4px';
    sObj.style.fontSize = '9pt';
}

function hlDat(ob, c) {
    obj = nLr[ob].cells[0];
    if (c == 2)
        if (keep) keep = 0;
        else keep = 1;
    if (!keep)
        if (c) {
            if (!hlBak) hlBak = obj.style.backgroundColor;
            for (k = 0; k < tLr.length; k++)
                if (tLr[k].style.backgroundColor == hlBak /*|| if( textId[j].Age<newsId[i+1].Age && textId[j].Age>=newsId[i].Age )*/ ) tLr[k].style.backgroundColor = obj.style.backgroundColor = 'rgb(234,255,128)';
        }
    else {
        for (k = 0; k < tLr.length; k++)
            if (!tLr[k].style.backgroundColor.search(/rgb\(234, *255, *128\)/)) tLr[k].style.backgroundColor = obj.style.backgroundColor = hlBak;
        hlBak = '';
    } //#eaff80
}
nDat = new Date();

function getDat(dt) {
    try {
        if (dt.search(/\/\d/) < 0) {
            dt = dt.split(/\D/);
            cYear = dt.pop();
            dt.reverse();
            dt[2] = cYear;
            dt = dt.join('/')
        }
        return (dt);
    } catch (e) {
        alert('getDate: ' + dt)
    }
}

function getAge(dt) {
    rDat = new Date(getDat(dt));
    return (parseInt((nDat.getTime() - rDat.getTime()) / 86400000, 10));
}

function getnbC(age) {
    s = age - 10;
    g = Math.round(255 * 0.8 + s * 2.5);
    if (g > 255) g = 255;
    b = Math.round(255 * 0.6 + s * 4);
    return ('rgb(255,' + g + ',' + b + ')');
}

function chgLog() {
    l = lang;
    if (l > 1) l = 0;
    cDat = new Date(); // alert('chgLog:\ncRun='+cRun+'\n'+String(chgLog.caller).match(/function \S+/))
    try {
        if (!tPg || !cRun && tPg.document.getElementById('c_' + aLng[l]).innerHTML.search(/\[/) < 0) return;
        else cRun = 1;
    } catch (e) {
        return;
    }
    obj = document.getElementById('cL');
    if (!obj.innerHTML) obj.innerHTML = tPg.document.body.innerHTML;
    lNews = String(document.getElementById('c_' + aLng[l]).innerHTML).split('[');
    lNews.shift();
    lNews['vOff'] = 14;
    for (i = 0; i < lNews.length; i++) {
        lNews[i] = lNews[i].split(']');
        lNews[i]['Age'] = getAge(lNews[i][0]);
        if (!sLng) lNews[i][0] = getDat(lNews[i][0])
    }
    tN = '<div onclick="cShw(\'cLog\',\'lNews\',\'s\')"><img src="' + pImgIco + 'ps0.png"><span id="lNws">' + cLgH[l] + '</span></div><table cellspacing="1" cellpadding="0">';
    for (i = 0; i < lNews.length; i++) tN += '<tr style="display:none"><td style="color:#dddddd;font-size:8pt">' + lNews[i][0] + '<ul>' + lNews[i][1] + '</ul></td></tr>';
    tN += '</tbody></table>';
    document.getElementById('cLog').innerHTML = tN;
    uLnk('span', 'wlnk2');
    cShw('cLog', 'lNews')
}

function cShw(sId, arr, f) {
    obj = document.getElementById(sId).lastChild.rows;
    if (sId == 'cLog') cImg = document.getElementById(sId).firstChild.firstChild;
    else cImg = document.getElementById('t010').previousSibling;
    if (!f) cShwD(obj, arr);
    else if (cImg.src.search(/(\D)0\.png/) > 0) { //b=RegExp.$1;
        cImg.src = pImgIco + 'p' + f + '1.png';
        for (i = 0; i < obj.length; i++) obj[i].style.display = '';
    } else {
        cImg.src = pImgIco + 'p' + f + '0.png';
        cShwD(obj, arr);
    }
}

function cShwD(obj, arr) {
    /*vChk(arr);*/
    if (arr != lNews) arr = eval(arr);
    for (i = 0; i < obj.length; i++) try {
        if (arr[i].Age < arr.vOff || i == 0) obj[i].style.display = '';
        else obj[i].style.display = 'none';
    }
    catch (e) {
        alert(arr[i - 1].Age + '\n' + i + '\n' + arr.length + ' : ' + obj.length);
    }
}
tbdn = [];

function expAll() {
    allTb = document.getElementsByTagName('tbody');
    if (!tbdn.length) {
        for (k = 0; k < allTb.length; k++)
            if (allTb[k].id.search(/^f(t\d+)/) == 0) {
                ti = RegExp.$1;
                if (allTb[k].className != 'hgray' && allTb[k].style.display == 'none') {
                    tShw(ti);
                    tbdn[tbdn.length] = ti;
                }
            }
    } else {
        for (j = 0; j < tbdn.length; j++) {
            tShw(tbdn[j]);
        }
        tbdn.length = 0;
    }
}
dInfo = [];

function cntSfl(t) {
    tLrows = document.getElementById('tLst').rows;
    objSum = [];
    datSum = []; //sms='<span style="font-size:8px;color:transparent">.</span>';
    for (i = 1; i < tLrows.length; i++)
        if (tLrows[i].childNodes.length == 7) {
            if (!tLrows[i].childNodes[2].innerHTML.search(/\s*\d+\s*/)) objSum[objSum.length] = parseInt(tLrows[i].childNodes[2].innerHTML, 10);
            if (!tLrows[i].childNodes[1].innerHTML.search(/\s*\d+\.?\d+?\s+MB\s*/)) datSum[datSum.length] = parseFloat(tLrows[i].childNodes[1].innerHTML, 10) * 10;
        }
    objSumme = eval(objSum.join('+'));
    idx = String(objSumme).length - 3;
    if (idx) {
        dInfo[0] = String(objSumme).substring(0, idx) + dtz[lang][0] + String(objSumme).substr(idx);
    }
    datSumme = parseInt(eval(datSum.join('+'))) / 10 + ' MB';
    idx = datSumme.search(/\./) - 3;
    if (lang) datSumme = datSumme.replace(/\./, dtz[lang][1]);
    if (idx) dInfo[1] = String(datSumme).substring(0, idx) + dtz[lang][0] + String(datSumme).substr(idx);
    else dInfo[1] = datSumme;
}

function getTinfo(p) {
    if (!p) {
        document.getElementById('tinfo').innerHTML = '<img src="' + pImgIco + 'info.png" style="position:relative;top:3px"><span id="tInfL" style="margin:0 3px 0 6px"></span><span id="tInfD"></span>';
    } else {
        cntSfl();
        document.getElementById('tInfL').innerHTML = tInf[sLng];
        document.getElementById('tInfD').innerHTML = '&#160;<span class="cr">' + dInfo[0] + '</span> &#160;(<span class="cr">' + dInfo[1] + '</span>)'
    }
}
//-------------------------------------------------------------------------------------------------
var drgObj = null,
    dragx = 0,
    dragy = 0,
    posx = 0,
    posy = 0;
document.oncontextmenu = new Function('return false;'); /*document.onkeypress=pStr; document.ondblclick=winUp;*/
function drgInit() {
    document.onmousemove = drag;
    document.onmouseup = drgStp;
}

function drgStp() {
    drgObj = null;
}

function drgSt(element) {
    drgObj = document.getElementById(element);
    dragx = posx - drgObj.offsetLeft;
    dragy = posy - drgObj.offsetTop;
}

function drag(evnt) {
    posx = !mF() ? window.event.clientX : evnt.pageX;
    posy = !mF() ? window.event.clientY : evnt.pageY;
    if (drgObj != null) {
        drgObj.style.left = (posx - dragx) + "px";
        drgObj.style.top = (posy - dragy) + "px";
    }
}

function drgRst(element) {
    document.getElementById(element).style.top = 0;
    document.getElementById(element).style.left = 1;
    winUp();
}

function cDrg() {
    window.event.cancelBubble = true;
    window.event.returnValue = false;
}
document.onselectstart = cDrg;

function winUp() {
    window.scrollTo(0, 0);
    return false;
}
if (mF()) {
    document.onmousedown = rF;
    document.onkeydown = uStr;
}

function pStr(pC) {
    if (!pC) pC = window.event;
    if (pC.shiftKey) alert(kC + " plus Umschalt-Taste wurde gedr&uuml;ckt!");
}

function uStr(kC) {
    if (mF()) kC = kC.keyCode;
    else kC = kC;
    if (kC == 27 && !document.getElementById('cntnt')) location.reload();
}
//-------------------------------------------------------------------------------------------------
function chkDate(o) {
    if (aD) {
        alert('nD:\t' + nD + '\ndlM:\t' + dlM);
        o.onclick = null;
    }
}

function drDl(c, f, n) {
    lR = '';
    if (dP) lR += '../';
    lR += 'dl_files/';
    if (prp && !isNaN(c)) {
        lR += ntd[c].id + '/';
        if (f) lR += f;
        lR += document.getElementById('dl' + c).innerHTML;
    } else lR += c;
    if (n) window.open(lR, 'new', '');
    else location.replace(lR)
}

function tWin(c, t) {
    twn = window.open('', 'tWn', 'top=0,width=800,height=600');
    twn.document.writeln('<title>' + t + '</title>' + c.innerHTML);
    twn.focus();
}

function dWin(c, t) {
    if (dP) c = '../' + c;
    window.open(c, t, 'top=0,resizable=1,width=820,height=' + (screen.availHeight - 30))
}

function lWin(nId) {
    bImg = '';
    if (String(nId).search(/\D\d+/) < 0) alert('Error: ' + nId);
    fId = lPcs[tNr][nId];
    tTxt = lPcs[tNr][fId][aLng[sLng]];
    if (document.getElementById(nId)) bImg = document.getElementById(nId).style.backgroundImage;
    if (bImg) bNm = bImg.substring(bImg.lastIndexOf('\/') + 1, bImg.lastIndexOf('.'));
    else bNm = String(nId).replace(/t/, picP[tNr]);
    fNm = bNm.match(/\D+/)[0];
    pNm = '<img src="' + pImg + fNm + '/' + bNm;
    pNr = parseInt(fNm, 10);
    fXt = '.jpg';
    if (document.getElementById(nId))
        if (document.getElementById(nId).className == 'pP') fXt = '.png'; //alert(pNm + fXt)
    lPc = xBtn('pCls()', '') + '<div id="lPicTxt" style="line-height:16px;background-color:#444444;color:#ffffff"><div style="padding:0 4px;margin-bottom:2px;width:100%" onmousedown="drgSt(\'lPic\')" ' +
        'ondblclick="drgRst(\'lPic\')">' + tTxt + '</div>' + pNm + fXt + '" style="width:100%;border:1px solid #cccccc;border-left-color:#666666;border-top-width:0" oncontextmenu="pCls()" onload=\"this.parentElement.parentElement.style.width=this.naturalWidth+\'px\'; this.parentElement.parentElement.style.height=this.naturalHeight+\'px\';\"></div>';
    if (aD) lPc += '<div style="position:absolute;top:4px;right:28px;color:#ffffff">' + nId + '</div>';
    if (lPcs[tNr].length)
        lPc += '<img src="' + pImgIco + 'xprgt.png" onclick="lWin(lPcs[tNr][(fId+1)][0])" style="position:absolute;top:80px;right:1px;height:100px;width:20px;color:#222222;padding:0;cursor:pointer;display:none" id="bnext">' +
        '<img src="' + pImgIco + 'xplft.png" onclick="lWin(lPcs[tNr][(fId-1)][0])" style="position:absolute;top:80px; left:1px;height:100px;width:20px;color:#222222;padding:0;cursor:pointer;display:none" id="bprev"">' +
        '<table style="position:absolute;top:24px;left:0;line-height:500px;width:100%" oncontextmenu="pCls()"><tr>' +
        '<td style="width:20%;height:400px" onclick="" id="tprev">&#160;</td><td></td><td style="width:20%;height:400px" onclick="" id="tnext">&#160;</td></tr></table>';
    document.getElementById('lPic').innerHTML = lPc;
    document.getElementById('lPicTxt').onselectstart = cDrg;
    drgInit();
    if (lPcs[tNr].length && fId < (lPcs[tNr].length - 1)) {
        document.getElementById('bnext').style.display = 'block';
        document.getElementById('tnext').onclick = new Function('lWin(lPcs[tNr][(fId+1)][0])');
    }
    if (lPcs[tNr].length && fId > 0) {
        document.getElementById('bprev').style.display = 'block';
        document.getElementById('tprev').onclick = new Function('lWin(lPcs[tNr][(fId-1)][0])');
    }
    document.getElementById('lPic').style.top = tpPos();
    document.getElementById('lPic').style.display = 'block';
}

function tpPos() {
    if (!mF()) tP = document.body.scrollTop;
    else tP = window.pageYOffset;
    return (tP);
}

function pCls(s) {
    if (document.getElementById('lPic')) document.getElementById('lPic').style.display = 'none';
    if (s) winUp();
    return false;
}

function tFrm(a) {
    document.getElementById('tFr').innerHTML = '<iframe name="tPg" scrolling="no" frameborder="0" src="' + a + '" onload="tPload(tNr)"></iframe>';
}

function cAdr(p) {
    if (p == 2) pr = ' style="position:relative;top:2px"';
    else pr = '';
    mImg = pImg + 'mad/ml' + p;
    return ('<a hideFocus="true">' +
        '<img src="' + mImg + '0.png" class="ml"' + pr + '></a>')
}

function xBtn(p, s) {
    return ('<img src="' + pImgIco + 'xclose.png" onmouseup="' + p + '" style="float:right;color:#222222;margin:2px 1px 1px 2px;cursor:pointer;' + s + '">');
}

function lPg(nNr, b) {
    if (isNaN(nNr) && !isNaN(tNp[nNr])) nNr = tNp[nNr];
    if (nNr == tNr && !b) return;
    else tNr = nNr;
    cRun = 0;
    if (dP || !nNr) {
        if (!location.protocol.search(/file:$/)) {
            pg = '';
            if (dP) pg += '../';
            pg += 'index.html';
        } else pg = '/';
        if (tNr) pg += '?' + tNp[tNr][1];
        window.location.replace(pg)
    } else {
        dN = tNp[tNr][0];
        np = '';
        if (tNr > 0) np = 'pages/';
        np += dN + '.html';
        if (tNr && !prp && lsP[0].search(/\.zip$|\.rar$/) > 0) location.replace('/?' + tNp[tNr][1]); //alert('np: '+np+'\nlPg('+nNr+','+b+')')
        if (tNr < tNp.length)
            if (tNr != 13) {
                if (!b) lP[lP.length] = tNr;
                np += '?' + lang;
                if (!document.getElementById('tFr').innerHTML) tFrm(np);
                else tPg.location.replace(np);
            }
        else {
            if (lsP.length) np += '?' + lsP[0];
            if (window.location.hash) np += window.location.hash;
            document.body.style.padding = 0;
            document.body.innerHTML = '<iframe frameborder="0" src="' + np + '" style="width:100%;height:100%"></iframe>';
        } else {
            nwin = window.open(np, '', 'top=0');
        } //alert('np: '+np);
    }
}

function tPload(tP) {
    if (!tP || tPg.document.getElementById('c_de') && !document.getElementById('cLog').innerHTML) chgLog();
    else {
        document.getElementById('cntnt').innerHTML = tPg.document.getElementById('cntnt').innerHTML;
        aLng = tPg.aLng;
        lang = tPg.lang;
        if (lS) lS = '';
        pTitle = tPg.document.title;
        init();
    }
}
dc = 0;

function tShw(oId, c) { //if( c && c==2 ) alert('tShw('+oId+','+c+')' );
    if (dc) return;
    else dc = 1;
    obj = document.getElementById(oId);
    fld = document.getElementById('f' + oId); //clr=['f','d'];
    if (tNr == 0)
        if (!obj.parentNode.className.search(/cl2?$/i) && document.getElementById('x' + oId)) document.getElementById('x' + oId).innerHTML = xBtn('tShw(\'' + oId + '\',1);', 'position:relative;top:-8px;right:-3');
    if (obj.childNodes.length && obj.firstChild.src) arr = obj.firstChild;
    try {
        if (obj.previousSibling.src) arr = obj.previousSibling;
    } catch (e) {}
    if (String(arr.src).search(/(p[dfh])\d/) >= 0) clr = RegExp.$1;
    if (String(arr.src).search(/(p[dfh])1/) < 0) n = [0, 1, RegExp.$1];
    else n = [1, 0, RegExp.$1]; //alert((String(arr.src).search(/(p[dfh])1/)<0)+'\n'+String(arr.src).search(/(p[dfh])1/)+'\n'+n)
    arr.src = pImgIco + clr + n[1] + '.png';
    nextid = '';
    vSoll = 0;

    var tBdy;
    if (tNr >= 2) {
        tBdy = document.getElementById('tLst').tBodies;
        if (!oId.search(/t(\d1)0$/)) {
            sId = RegExp.$1;
            for (i = 0; i < tBdy.length; i++)
                if (tBdy[i].innerHTML.indexOf('t' + sId) > 0 && tBdy[i].className == 'tsub' || !tBdy[i].id.indexOf('ft' + sId))
                    if (n[1] == 0) tBdy[i].style.display = 'none';
                    else if (String(tBdy[i].previousSibling.innerHTML).search(/\/(p[dfh])0\.png/) < 0) tBdy[i].style.display = '';
        }
    }
    mfld = '';
    if (obj.childNodes.length > 1)
        if (obj.firstChild.className != 'sH') mfld = obj.childNodes[1];
    try { //alert('clr: '+clr+'\n'+n)
        if (n[1] == 1) {
            if (mfld) mfld.style.display = 'none';
            fld.style.display = '';
        } else {
            if (mfld) mfld.style.display = '';
            fld.style.display = 'none';
        }
        if (allT[allId[oId]][1].length > 1) obj.innerHTML = allT[allId[oId]][1][n[1]];
        if (c && c == 2) cScr();
        dc = 0;
        //if( tNr==0 && oId=='t31' ) document.getElementById('d2').firstChild.style.visibility='visible';
    } catch (e) {}
}

function tShx(xId, t) {
    if (!xId) obj = t.nextSibling.nextSibling;
    else obj = document.getElementById(xId);
    if (obj.style.display != '') {
        obj.style.display = '';
        swdst = 1
    } else {
        obj.style.display = 'none';
        swdst = 0
    }
}

function lBk() {
    lP.length = lP.length - 1; /*if( tNr==lP.length-1 ) lP.length = lP.length-1;*/
    lPg(lP[lP.length - 1], 1);
}

function spLnk(l, t, c, d) {
    if (!isNaN(l)) l = 'lPg(' + l + ')';
    if (!c) c = 'lnk'; /*alert((l+'\n'+t+'\n'+c+'\n'+d));*/
    if (d) c += '" id="' + d;
    return ('<span class="' + c + '" onclick="' + l + '">' + t + '</span>');
}

function ld2s(nf) {
    var stag = document.createElement('script');
    stag.setAttribute('type', 'text/javascript');
    stag.setAttribute('src', 'pages/scripts/' + nf + '.js');
    document.getElementsByTagName('head')[0].appendChild(stag);
}

function tDiff(d) {
    var tday = new Date();
    return Math.round(Math.abs(tday - d) / (1000 * 60 * 60 * 24));
}

function tNpV() {}
//function prntview(c) { if( mF() || !window.event.shiftKey() ) return/*if( !c && !document.body.style.background.search(/none/) ) location.reload()*/; else { if(mF()) alert('c: '+c+'\n'+document.body.style.background)
function prntview() {
    if (mF()) return false;
    if (window.event.shiftKey)
        if (document.body.currentStyle.backgroundImage.search(/backgr\./) < 0) location.reload();
        else {
            lnks = ['span', 'td', 'li', 'img'];
            document.body.style.background = 'none';
            document.body.style.backgroundColor = '#ffffff';
            document.body.leftMargin = 0;
            document.body.topMargin = 0;
            document.body.style.padding = 0;
            document.getElementById('mtab').style.top = 105;
            document.getElementById('mtab').style.left = 10;
            ntr = document.getElementsByTagName('tr');
            for (i = 0; i < ntr.length; i++) /*if( ntr[i].style.backgroundImage=='none' ) ntr[i].firstChild.style.borderTop='10px solid #999999'; else*/ ntr[i].style.background = 'none';
            document.getElementById('cpr').style.backgroundColor = '#333333';
            document.body.innerHTML = '<img src="' + document.images[0].src + '" style="position:absolute;top:3px;left:18px;z-index:1">' +
                '<h2 style="color:#000000;position:absolute;top:72px;left:23px">' + document.getElementsByTagName('h2')[0].innerHTML + '</h2>' + document.getElementById('cntnt').innerHTML;
            //for(i=0;i<document.getElementsByTagName('table').length;i++) document.getElementsByTagName('table')[i].style.border='1px solid #999999';
            for (i = 0; i < allDiv.length; i++)
                if (allDiv[i].style.display == 'none') allDiv[i].innerHTML = '';
            for (i = 0; i < lnks.length; i++) lnks[i] = document.getElementsByTagName(lnks[i]);
            for (i = 0; i < lnks.length; i++)
                for (j = 0; j < lnks[i].length; j++)
                    if (lnks[i][j].onclick) {
                        if (lnks[i][j].id) {
                            lId = lnks[i][j].id;
                            if (!lId.search(/t\d+$/))
                                if (tNr && document.getElementById('f' + lId)) {
                                    if (document.getElementById('f' + lId).style.display == 'none' && document.getElementById(lId).innerHTML.search(/^Histor/) < 0) tShw(lId);
                                    document.getElementById(lId).style.color = '#000000';
                                }
                        }
                        /*if( !lnks[i][j].innerHTML.indexOf(pVw[lang]) ) lnks[i][j].onclick='prntview(0)';*/
                    }
            else {
                lnks[i][j].onclick = '';
                lnks[i][j].style.cursor = 'default';
            }
            for (i in document.images)
                if (document.images[i].className == "rtf") document.images[i].style.display = 'none';
            for (i = 0; i < ntd.length; i++) {
                ntd[i].innerHTML = ntd[i].innerHTML.replace(/<\/?a[^>]+>/ig, '');
                if (ntd[i].className == "c1") {
                    ntd[i].className = '';
                    ntd[i].style.backgroundColor = '#eeeeee';
                    ntd[i].style.border = '1px solid #dddddd';
                }
            }
        } return false; //document.ondblclick=new Function('location.reload()');
}

function recEdit(n, f) {
    eval(f);
    if (n.childNodes != null)
        for (i = 0; i < n.childNodes.length; i++) recEdit(n.childNodes.item(i));
}

function showId() {
    for (i = 0; i < allId[aLng[1]].length; i++) {
        fld = document.getElementById(allId[aLng[1]][i][0]);
        if (fld) {
            fld.onmouseover = new Function("if(aD) showStat('ID: &nbsp;<b>'+this.id+'</b>')");
            fld.onmouseout = new Function("showStat()");
        }
    }
}

function cPos(evt) {
    if (!evt) evt = window.event;
    cY = evt.screenY;
} // alert('cPos: '+(!evt));document.getElementById('t00').innerHTML =cY;
function cScr() {
    resH = (screen.availHeight - cY);
    scrH = (screen.availHeight - resH - diffH);
    if (resH < 400) window.scrollBy(0, scrH);
} // alert('scrH:\t'+scrH+'\ndiffH:\t'+diffH+'\nresH:\t'+resH);
function cPic(o, p) {
    obj = o.parentNode;
    cnt = String(obj.innerHTML);
    if (!String(obj.parentNode.innerHTML).search(/<DIV/i)) {
        obj.parentNode.innerHTML = cnt;
    } else {
        obj.innerHTML = '<div style="position:absolute; clip:rect(0px, 616px, ' + p + 'px, 0px);">' + cnt + '</div><div style="height:' + p + '">&#160;</div>';
    }
}

function cChk(c) {
    if (!document.getElementById('chk')) {
        var cE = document.createElement('div');
        cE.setAttribute('id', 'chk');
        document.body.insertBefore(cE, document.getElementById('cntnt'));
    }
    if (!c) document.getElementById('chk').innerHTML = '';
    else {
        document.getElementById('chk').innerHTML += c;
        posField('chk', 0)
    }
}
uLnkLog = [];

function uLnk(t, c) {
    if (!t) {
        lTg = ['span', 'th'];
        lCl = ['lnk', 'pdf', 'hlnk', 'wlnk', 'wlnk2', 'sH'];
    } else {
        lTg = [t];
        lCl = [c];
    }
    showId(); //lTg=['span','td','th','li'];
    for (i = 0; i < lTg.length; i++) {
        lTags = document.getElementsByTagName(lTg[i]);
        for (j = 0; j < lCl.length; j++)
            for (k = 0; k < lTags.length; k++)
                if (lTags[k].className && lTags[k].onclick && !lTags[k].onmouseover) {
                    if (String(uLnkLog).indexOf(lTags[k].innerHTML) < 0) uLnkLog[uLnkLog.length] = [lTg[i], lTags[k].className, lTags[k].innerHTML, lTags[k].onclick];
                    if (lTags[k].innerHTML && lTags[k].innerHTML.search(/<li/i) >= 0 && mF())
                        if (lTags[k].firstChild.firstChild.innerHTML)
                            lTags[k].firstChild.firstChild.innerHTML = '<span style="position:relative;top:-3px">' + lTags[k].firstChild.firstChild.innerHTML + '</span>';
                    if (lTags[k].className == lCl[j]) sLnk(lTags[k], lCl[j]);
                }
    } //vChk('uLnkLog');
}

function sLnk(obj, cls) {
    obj.onmouseover = new Function('this.className="' + cls + '2";if(aD) showStat("CLASS: &nbsp;<b>"+this.className)+"</b>"');
    obj.onmouseout = new Function('this.className="' + cls + '"; showStat()');
}

function showStat(t) {
    if (!t) {
        document.getElementById('stat').innerHTML = '';
    } else {
        document.getElementById('stat').innerHTML += '<div>' + t + '</div>';
        posField('stat', 1)
    }
}

function posField(d, ox) {
    x = window.event.clientX + document.body.scrollLeft;
    y = window.event.clientY + document.body.scrollTop;
    m = document.getElementById(d);
    if (ox) m.style.pixelLeft = (x + 20);
    else m.style.posLeft = 930;
    if ((x + m.scrollWidth > document.body.clientWidth) && (x - m.scrollWidth > 0)) m.style.pixelLeft = x - m.scrollWidth;
    m.style.pixelTop = y - m.scrollHeight;
    if ((y - m.scrollHeight < 0)) m.style.pixelTop = y;
}
//----------------------------------------------------------------------------------------------------