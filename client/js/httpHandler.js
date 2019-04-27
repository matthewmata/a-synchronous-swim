(function() { 
  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  //
  
  const ajaxFileGet = () => {
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: serverUrl + '/movement',
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

  const ajaxPictureGet = () => {
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: serverUrl + '/picture',
      success: (data) => {
        //do some parse on the txt to get the image back
        console.log('in client');
        // $('.pool').css('background-image', data)
      },
      error: (error) => {
        console.log('in client error')
      }
    })
  }
  ajaxPictureGet()

  const ajaxFileUpload = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl + '/beckham',
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        window.location = window.location.href;
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