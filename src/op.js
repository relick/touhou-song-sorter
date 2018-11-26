function OpenWnd() {
      var oWindow = window.open("", ""); 
      with (oWindow.document) {
            write("<html>");
            write("<head>");
            write("<title>Tohosort: Raw Text Results<\/title>");
            write("<\/head>");
            write("<body bgcolor=\"#ffffff\">");
            for(var i = 0; i < csort2.length; i++) {
				write(csort2[i]);
				write(". ");
				write(csort6[i]);
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