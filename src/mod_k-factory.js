// ### Function - Simple Class ################################################# 1.00 ### 2008/08/18
function gID(sID) {
   return document.getElementById(sID);
}

function cE(sName) {
   return document.createElement(sName);
}

function cT(sD) {
   return document.createTextNode(sD);
}

function sC(oID, cN) {
   oID.setAttribute('class', cN, 0);
   oID.className = cN;
}

// ### Function - Create Gauge ################################################# 1.00 ### 2008/08/18
// # sID = ElementID
// # iGM = GaugeMAX
// # iGT = GaugeThreshhold
var sE = '　';
function fCG(sID, iGM, iGT) {
   var tblG = cE('table');
   gID(sID).appendChild(tblG);
   sC(tblG, 'gauge');
   tblG.id = sID;

   var tblGb = cE('tbody');
   tblG.appendChild(tblGb);

   newRow = tblGb.insertRow(tblGb.rows.length);

   var sCN = 'normal';

   for(iG = 0; iG<iGM; iG++) {
      if(iG % 10 == 0)     {sCN = (iG < iGT) ? 'leftend' : 'leftendr';}
      else if(iG % 5 == 0) {sCN = (iG < iGT) ? 'mid' : 'midr';}
      else                 {sCN = (iG < iGT) ? 'normal' : 'normalr';}

      // Col[-]
      newCell = newRow.insertCell(newRow.childNodes.length);
      newCell.appendChild(document.createTextNode(sE));
      newCell.id = sID + iG;
      sC(newCell, sCN);
   }

   // Col[End]
   newCell = newRow.insertCell(newRow.childNodes.length);
   newCell.appendChild(document.createTextNode(sE));
   sC(newCell, 'rightend');
}

// ### Event - GaugeReflesh #################################################### 1.00 ### 2009/01/27
function eGR(sID, iNow) {
   for(i=0; i<iGM; i++) {
      // 色ゲージ
      if      (               i < iNow) {gID(sID + i).style.backgroundColor = "#9999ff";}
      else                              {gID(sID + i).style.backgroundColor = "#ffffff";}
   }
}

// ### DeckCode ################################################################ 1.00 ### 2008/08/18
// ### Function - To Code ###################################################### 1.00 ### 2008/08/18
// # arg - aR as Array
// # return - code as string
function fDTC(aR) {
   // Code Version
   var sC = "1"
   var sT = "";

   // 0-9 A-Z a-x の60種類で 0～59 の値を表す。
   // y は次に来る値の回数 0 が続くことを表す。
   // z は次に来る値に 60 を加算して1つの値を表す。（60～119に使用）
   for (i=0; i<aR.length;i++) {
      sC += fN2C(aR[i]);
   }

   for(i = 0; i < 59; i++) {sT += "0";}

   for(i = 59; i >= 3; i--) {
      sC = sC.replace(eval("/" + sT + "/g"), "y"+ fN2C(i));
      sT = sT.slice(0, sT.length - 1);
   }

   return sC;
}

// ### Function - From Code #################################################### 1.00 ### 2008/08/18
// # arg1 - code as string
// # use aCC() as array
// # return - none
function fDFC(aR, sC) {
   var aT = new Array();
   var p, sT;

   // read Version 1
   if (sC.charAt(0) == "1") {

      sT = "000";

      for(i = 3; i <= 61; i++) {
         sC = sC.replace(eval("/y"+ fN2C(i) +"/g"), sT);
         sT += "0";
      }

      p = 1;

      while(p < sC.length) {

         sT = 0;

         if(sC.charAt(p) == "y") {return;}
         
         if(sC.charAt(p) == "z") {
            if(p < sC.length - 1) {
               p++;
               sT = 60;
            } else {
               alert("データの読み込みに失敗しました。");
               return;
            }
         }

         sT += fC2N(sC.charAt(p));

         if(sT < 0 || 119 < sT) {
            alert("データの読み込みに失敗しました。");
            return;
         }

         aT[aT.length] = sT;

         p++;
      }

      for (i=0; i<aT.length;i++) {
         aR[i] = aT[i];
      }
   }
}

// ### Function - Char to Number ############################################### 1.00 ### 2008/08/18
// # arg1 - c as string
// # return - number
function fC2N(c) {
   if      (0x30 <= c.charCodeAt(0) && c.charCodeAt(0) < 0x3a)  {return c.charCodeAt(0) - 0x30;}
   else if (0x41 <= c.charCodeAt(0) && c.charCodeAt(0) <= 0x5a) {return c.charCodeAt(0) - 0x41 + 10;}
   else if (0x61 <= c.charCodeAt(0) && c.charCodeAt(0) <= 0x78) {return c.charCodeAt(0) - 0x61 + 36;}

   return -1000;
}

// ### Function - Number to Char ############################################### 1.00 ### 2008/08/18
// # arg1 - n as number
// # return - char
function fN2C(n) {
   if      (n < 10)  {return n.toString();}
   else if (n < 36)  {return String.fromCharCode(0x41 + n - 10);}
   else if (n < 60)  {return String.fromCharCode(0x61 + n - 36);}
   else if (n < 100) {return "z"+ fN2C(n - 60);}

   return "_";
}

