function filter(pacbio_data) {
  var keyword = document.getElementById("textInput").value;
  var select = document.getElementById("tolgraph0T");
  for (var i = 0; i < select.length; i++) {
    var txt = select.options[i].text;
    if (!txt.match(keyword)) {
        $(select.options[i]).attr('disabled', 'disabled').hide();
    } else {
        $(select.options[i]).removeAttr('disabled').show();
    }
  }
}
