var post = JSON.parse($("#data").text());
$('button.' + post._id).prop('disabled',true);
$('textarea').trumbowyg();
var checkContents = function() {
  if ($('#' + post._id).val() === $('textarea.' + post._id).val()) {
    $('button.' + post._id).prop('disabled',true);
  } else {
    $('button.' + post._id).prop('disabled',false);
  }
};
$('textarea').on('tbwchange', (event) => {
  checkContents();
});
checkContents();

function save() {
  post.content = $('#' + post._id).val();
  $.ajax('/api/posts', {
      type: 'POST',
      dataType: 'json',
      headers: { "Content-Type": "application/json"},
      data: JSON.stringify(post),
      success: function(result) {
        if (result && result.url ) {
          $(location).attr('href', result.url);
        } else {
          alert('Post error - url not found');
        }
      },
      error: function(xhr, text, error) {
        console.error(error);
        alert(text);
      }
  })
}

function remove() {
  $.ajax('/api/posts/' + post._id, {
      type: 'DELETE',
      success: function(result) {
        if (result && result.message) {
          $(location).attr('href', '/posts');
        } else {
          alert('Delete error');
        }
      },
      error: function(xhr, text, error) {
        console.error(error);
        alert(text);
      }
  });
}
