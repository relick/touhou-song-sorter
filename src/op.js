function OpenWnd() {
      var oWindow = window.open("", ""); 
      with (oWindow.document) {
            write("<html>");
            write("<head>");
            write("<title>Touhou Song Sorter: Raw Text Results<\/title>");
            write('<link rel="stylesheet" type="text/css" href="src/tcs_style_song.css">');
            write("<\/head>");
            write("<body>");
            for(var i = 0; i < popup_TrackRank.length; i++) {
				write(popup_TrackRank[i]);
				write(". ");
				write(popup_TrackName[i]);
				write("<br>");
			}
            write("<hr>");
            write("<input type='button' value='Close' onclick='window.close()'>");
            write("<hr>");		
			write("<\/body>");
            write("<\/html>");
            close(); 
      }
}