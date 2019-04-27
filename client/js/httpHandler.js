(function() { 
  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  //
  
  const ajaxFileGet = () => {
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: serverUrl,
      success: (data) => {
        if(data){
          setTimeout(() => {
            SwimTeam.move(data)
            ajaxFileGet()
          }, 5); 
        }
      },
      error: (error) => console.error(error)
    })
  }
  ajaxFileGet();
  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUpload = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      success: (data) => {
        console.log(JSON.stringify(data));
        // window.location = window.location.href;
        $('.pool').css('background-image', JSON.parse(data));
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUpload(file);
  });

})();