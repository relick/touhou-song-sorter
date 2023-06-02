"use strict";

function getID(sID) {
	return document.getElementById(sID);
}

function createElement(sName) {
	return document.createElement(sName);
}

function createText(sD) {
	return document.createTextNode(sD);
}

function setClass(oID, cN) {
	if (cN === null) {
		oID.removeAttribute('class');
	}
	else {
		oID.setAttribute('class', cN);
	}
	oID.className = cN;
}

function createGauge(sParentID, sGaugeID)
{
	var gauge = getID(sParentID).appendChild(createElement('div'));
	gauge.id = sGaugeID;
}

function refreshGauge(sGaugeID, iCurrentPercent) {
	getID(sGaugeID).style.width = iCurrentPercent + "%";
}

function anyIntersection(set1, set2) {
	for (const elem of set1) {
		if (set2.has(elem)) {
			return true;
		}
	}
	return false;
}