function signin() {
  var json = JSON.stringify({
    username: $('#username').val(),
    password: $('#password').val()
  });
  $.ajax('/api/auth', {
      type: 'POST',
      dataType: 'json',
      headers: { "Content-Type": "application/json"},
      data: json,
      success: function(result) {
        if (result) {
          location.reload();
        } else {
          console.error('Post error');
        }
      },
      error: function(xhr, text, error) {
        console.error(error);
      }
  });
}

function signup() {
  var json = JSON.stringify({
    username: $('#usernameModal').val(),
    password: $('#passwordModal').val()
  });
  $.ajax('/api/signup', {
      type: 'POST',
      dataType: 'json',
      headers: { "Content-Type": "application/json"},
      data: json,
      success: function(result) {
        if (result) {
          location.reload();
        } else {
          console.error('Post error');
        }
      },
      error: function(xhr, text, error) {
        console.error(error);
      }
  });
}

function logout() {
  $.ajax('/api/logout', {
      type: 'POST',
      dataType: 'json',
      headers: { "Content-Type": "application/json"},
      data: {},
      success: function(result) {
        if (result) {
          location.reload();
        } else {
          console.error('Post error');
        }
      },
      error: function(xhr, text, error) {
        console.error(error);
      }
  });
}
