"use strict";
function OpenWnd() {
	let oWindow = window.open("", "");
	let d = oWindow.document;
	d.write("<html>");
	d.write("<head>");
	d.write("<title>Touhou Song Sorter: Raw Text Results</title>");
	d.write('<link rel="stylesheet" type="text/css" href="src/tcs_style_song.css">');
	d.write("</head>");
	d.write("<body>");
	for(var i = 0; i < popup_TrackRank.length; i++) {
		d.write(popup_TrackRank[i]);
		d.write(". ");
		d.write(popup_TrackName[i]);
		d.write("<br>");
	}
	d.write("<hr>");
	d.write("<input type='button' value='Close' onclick='window.close()'>");
	d.write("<hr>");
	d.write("</body>");
	d.write("</html>");
	d.close();
}
