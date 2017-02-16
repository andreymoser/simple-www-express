$('#title').keyup(function(event) {
  if (event.keyCode === 13) {
    $('#save').click();
  }
});

function save() {
  $.ajax('/api/posts', {
      type: 'POST',
      dataType: 'json',
      headers: { "Content-Type": "application/json"},
      data: JSON.stringify({
        title: $("#title").val(),
        author: 'Andrey',
        tags: ['Dev','JS','Express'],
        createDate: new Date()
      }),
      success: function(result) {
        if (result && result.url ) {
          $(location).attr('href', result.url);
        } else {
          console.error('Post error - url not found');
        }
      },
      error: function(xhr, text, error) {
        console.error(error);
      }
    })
}
