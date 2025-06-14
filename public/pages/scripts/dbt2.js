//------------------------------------------------------------------------------------------------------------------------------
var allTrack = [];
rCnt = [0];
sCnt = [0];
cFCnt = [, 0, 0];
cFlds = [];
cFnew = [];
tCt = 0;

function d2load() {
    tCols = 6, Cnt = 0;
    aTrack.length = 0;
    dTags = document.getElementsByTagName('div');
    for (i = 0; i < dTags.length; i++)
        if (dTags[i].className == 'tData') aTrack[aTrack.length] = dTags[i].innerHTML.split(/;/)
    for (i = 1; i < aTrack.length + 8; i++) {
        allTrack[i] = [];
        rCnt[i] = 0;
    }
    for (i = 0; i < aTrack.length; i++) {
        if (String(aTrack[i][aTrack[i].length - 1]).search(/\S/) < 0) aTrack[i].length -= 1;
        for (j = 0; j < aTrack[i].length; j++)
            if (i < 3) {
                if (String(aTrack[i][j]).search(/[as](\d+)t/) >= 0) allTrack[RegExp.$1][allTrack[RegExp.$1].length] = aTrack[i][j];
            }
        else if (i < 4) allTrack[11][allTrack[11].length] = aTrack[i][j];
        else if (i < 5) allTrack[12][allTrack[12].length] = aTrack[i][j];
        else if (i < 6) allTrack[13][allTrack[13].length] = aTrack[i][j];
        else if (i < 7) allTrack[14][allTrack[14].length] = aTrack[i][j];
        else if (i < 8) allTrack[15][allTrack[15].length] = aTrack[i][j]; // GR-Gleisliste
        //    		else if(i<9) allTrack[16][allTrack[16].length] = aTrack[i][j];
    }
    nT = '<table id="ltab" cellspacing="0" cellpadding="0" style="background-color:#dddddd;margin:0;width:880px;border:2px groove #cccccc">' + '\n' + '<colgroup>';
    for (i = 0; i < tCols; i++) nT += '<col width="20%">';
    nT += '</colgroup>' + '\n';
    vG1 = document.getElementById('dbLst').innerHTML;
    vG2 = document.getElementById('nLst1').innerHTML;
    vG1 += vG2;
    allTrack[0] = vG1.replace(/;\s*$/, '').split(';');
    vG1 = vG1.toLowerCase();
    vG2 = vG2.toLowerCase();
    for (i = 1; i < 11; i++) {
        if (isCol(i)) nT += '<th><span style="float:right" id="st' + i + '">' + allTrack[i].length + '</span>A' + i + 't</th>';
        else {
            nT += getCl('A' + i + 't', i, isCol(i));
            nT += '</td></tr>';
            if (i == 4) nT += '<tr>';
        }
        if (i == 10) nT += '</tr><tr>';
    }
    for (i = 5; i < 11; i++) {
        nT += '<td>';
        for (j = 0; j < allTrack[i].length; j++) nT += getClr(i, j, isCol(i));
        nT += '</td>';
        Cnt = 0;
    }
    nT += getCl('Concrete', 11, isCol(i));
    nT += getCl('S*t', 12, isCol(i));
    nT += getCl('Bridge', 13, isCol(i));
    nT += getCl('Misc.', 14, 0);
    nT += getCl('1. Project', 15, 0); //: GR Moderne Rollbahn
    //	nT+=getCl('NEW',16,0);

    document.getElementById('wLst').innerHTML = nT + '</tr></table>';
    pFnd = ''; //gL=[];
    for (i = 1; i < allTrack.length; i++)
        for (j = 0; j < allTrack[i].length; j++) {
            fId = 't' + i + '_' + j;
            tLc = allTrack[i][j].replace(/^\s/g, '').toLowerCase();
            if (i == 11 || i == 15) tLc = tLc.replace(/Concrete/ig, '').replace(/mtr/ig, 'mstrt');
            if (i == 12) tLc = tLc.replace(/^s/i, 'a');
            if (vG1.indexOf(tLc) >= 0) {
                if (vG2.indexOf(tLc) >= 0) document.getElementById(fId).className = 'green2';
                else document.getElementById(fId).className = 'green';
                document.getElementById(fId).onclick = null;
                rCnt[i] += 1;
            } else if (i != 14 && (tLc.search(/([^d]H?Y?PntM?)(\d+_?\d*[rd][DBS]?\d*)/i) > 0 || tLc.search(/(lslip)(C?r?v?\d*_?\d*P?n?t?\d?)/i) > 0)) {
                str = RegExp.$1 + RegExp.$2;
                if (!pFnd || (pFnd && tLc.indexOf(pFnd) < 0)) {
                    pFnd = oFnd = str;
                    document.getElementById(fId).className = 'orange';
                } else if (pFnd && tLc.indexOf(pFnd) >= 0)
                    if (i == 15) document.getElementById(fId).className = 'yellow';
                    else document.getElementById(fId).className = 'norm';
                else if (pFnd && tLc.indexOf(pFnd) < 0) {
                    if (i == 15) document.getElementById(fId).className = 'yellow';
                    else document.getElementById(fId).className = 'norm';
                    pFnd = '';
                }
            } else if (i == 14)
                if (tLc.search(/turntable/i) < 0) document.getElementById(fId).className = 'gray';
        }
    for (i = 1; i < allTrack.length; i++) {
        sCnt[i] = allTrack[i].length;
        if (document.getElementById('st' + i)) {
            if (rCnt[i] < allTrack[i].length) rCl = 'ffff00';
            else rCl = '00ff00';
            document.getElementById('st' + i).innerHTML = '<span style="color:#' + rCl + '">' + rCnt[i] + '</span>\/' + allTrack[i].length;
        }
    }
    if (!mF())
        for (i = 1; i < 6; i++) {
            document.getElementById('t94' + i).ondblclick = new Function('showList(this.className,0)');
        }
    if (mF()) {
        document.onmousedown = rF;
        document.onclick = rT
    }
    document.getElementById('mtab').style.display = 'block';
}

function getClr(s, j, p) {
    xT = allTrack[s][j];
    tLc = xT.toLowerCase();
    if (s == 15) cNm = 'yellow';
    else cNm = 'norm';
    gC = '<div class="' + cNm + '" id="t' + s + '_' + j;
    sPth = '" ondblclick="activate(this.id,' + s + ')';
    //if( location.href.search(/Tiefbau/i)>0 ) sPth='" ondblclick="location.replace(\'F:/MTools/Trainsimfiles/_.Gleisliste_120104/_.DB1_320_Part1/'+ xT +'.s\')';
    //	if( vG1.indexOf(tLc)>=0 ) { gC+='background-color:#bbffbb;'; Cnt++ } else sPth = '';
    if (xT.search(/\d{1,3}_*\d{0,3}m/) > 0) {
        pR = String(xT.match(/\d{1,3}_*\d{0,3}m/));
        xT = xT.replace(/\d{1,3}_*\d{0,3}m/, '<span style="color:#0000ff">' + pR + '</span>')
    }
    if (xT.search(/_/) > 0) xT = xT.replace(/_/, '<span style="font-family:Arial Narrow">_</span>');
    if (!p) {
        if (xT.search(/\d{1,5}r/) > 0) {
            pR = String(xT.match(/\d{1,5}r/));
            xT = xT.replace(/\d{1,5}r/, '<span style="color:#ff0000">' + pR + '</span>')
        }
        if (xT.search(/EndPnt/i) > 0) xT = xT.replace(/EndPnt/i, '<span style="color:#8000ff">EndPnt</span>');
        else
        if (xT.search(/(H?Y?Pnt)/i) > 0) xT = xT.replace(/(H?Y?Pnt)/i, '<span style="color:#ff00ff">' + RegExp.$1 + '</span>');
        if (xT.search(/(Dbl)?(Sgl)?Slip/i) > 0) xT = xT.replace(/(Dbl)?(Sgl)?Slip/i, '<span style="color:#ff00ff">' + RegExp.$1 + RegExp.$2 + 'Slip</span>');
        if (xT.search(/Frog/i) > 0) xT = xT.replace(/Frog/i, '<span style="color:#00a000">Frog</span>');
        if (xT.search(/Xover/i) > 0) xT = xT.replace(/Xover/i, '<span style="color:#a04000">Xover</span>');
        if (xT.search(/Tram/i) > 0) xT = xT.replace(/Tram/i, '<span style="color:#6699cc">Tram</span>');
        if (xT.search(/(Brdg|7bridge)/i) > 0) xT = xT.replace(/(Brdg|7bridge)/i, '<span style="color:#227722">' + RegExp.$1 + '</span>');
        if (xT.search(/Concrete/i) > 0) xT = xT.replace(/Concrete/i, '<span style="color:#555555">Concrete</span>');
    } //;font-size:97%;padding-left:1
    gC += sPth + '">' + xT + '</div>' + '\n';
    cCnt++;
    if (cCol < tCols && cCnt > aCnt) {
        gC += '</td><td>';
        cCnt = 1;
        cCol++
    }
    return gC;
}

function getCl(tx, s, p) {
    cCol = cCnt = 1;
    aCnt = Math.round(allTrack[s].length / tCols + 0.35);
    tNew = tDcl = '';
    if (s > 0 && s < 3 && !mF()) {
        tDcl = ' ondblclick="showList(\'green\',' + s + ')"';
        tNew = '<span style="float:right;font-size:8pt;background-color:#bbffbb;color:#000000;margin:0 16px;padding:1px 8px;display:none" id="nStat_' + s + '"></span>';
    }
    gT = '<tr><th colspan="' + tCols + '"' + tDcl + '><span style="float:right" id="st' + s + '">' + allTrack[s].length + '</span>' + tNew + tx + ' Sections</th></tr><tr><td>';
    for (j = 0; j < allTrack[s].length; j++) gT += getClr(s, j, p);
    return gT;
}

function isCol(i) {
    return (i > 4 && i < 11);
}

function gList() {
    glw = window.open();
    glw.document.writeln(gL.join('<br>'));
    glw.focus();
}

function showHTML(c) {
    pwn = window.open('', '', '');
    pwn.document.writeln(c.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
    pwn.focus();
}

function showList(cx, s) {
    cTags = document.getElementsByTagName('div');
    for (i = 0; i < 11; i++) {
        cFlds[i] = [];
        cFnew[i] = [];
    }
    for (i = 0; i < cTags.length; i++)
        if (cTags[i].className == cx) {
            fN = String(cTags[i].innerHTML).replace(/<[^>]+>/g, '');
            if (!cTags[i].id.indexOf('t' + s + '_')) cFlds[s][cFlds[s].length] = fN;
            if (!cTags[i].id.search(/t(\d+)_/)) {
                rX = RegExp.$1;
                if (rX > 0 && rX < 11) {
                    cFlds[0][cFlds[0].length] = fN;
                    if (!cTags[i].id.indexOf('t' + rX + '_')) cFlds[rX][cFlds[rX].length] = fN;
                }
            }
        } pwn = window.open('', '', '');
    pwn.document.writeln(cFlds[s].length + '<br>' + cFlds[s].join('<br>'));
    pwn.focus();
    tFld.value = cFlds[s].join(';') + ';';
    tR = document.body.createTextRange();
    tR.moveToElementText(tFld);
    tR.execCommand("Copy");
}

function getStatus() {
    document.getElementById('v911').innerHTML = (eval(sCnt.join('+')) - sCnt[15]);
    document.getElementById('v912').innerHTML = (eval(sCnt.join('+')) - sCnt[15] - 30);
    document.getElementById('v913').innerHTML = (eval(rCnt.join('+')) - rCnt[15]);
    document.getElementById('v914').innerHTML = allTrack[0].length;
    document.getElementById('v915').innerHTML = aTrack[8].length;
}

function activate(cg, s) {
    if (aD) {
        if (document.getElementById(cg).className != 'green') {
            document.getElementById(cg).className = 'green';
            cFCnt[s]++;
        }
        if (cFCnt.length && cFCnt[s]) document.getElementById('nStat_' + s).style.display = 'block';
        document.getElementById('nStat_' + s).innerHTML = cFCnt[s];
    }
}

function tCnt(c) {
    tCt++;
    document.getElementsByTagName('h2')[0].innerHTML = '&nbsp;' + c + '&nbsp;' + tCt;
}