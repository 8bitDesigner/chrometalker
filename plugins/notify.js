var notifications = window.webkitNotifications
  , permission = (notifications ? notifications.checkPermission() == 0 : false)
  , focused = true;

if(window.addEventListener) {
  window.addEventListener('focus', function() { focused = true });
  window.addEventListener('blur', function() { focused = false });
}

plugin.onLoaded = function() {
  if (notifications && !permission) {
    $('<button class="enable-notifications">Enable Notifications</button>').
    appendTo($('#sidebar')).click(function(e) {
      e.preventDefault()
      webkitNotifications.requestPermission()
    })
  }

  plugin.onMessageInsertion = function () {
    // Bail early if we can't notify
    if (!notifications || !permission) { return }

    var who  = Talker.getLastAuthor()
      , what = Talker.getLastInsertion().text()
      , me   = Talker.currentUser.name

    if (who !== me && (document.hasFocus() === false || focused === false)) {
      webkitNotifications.createNotification(
        'https://talkerapp.com/images/favicon.png',
        who,
        what
      ).show()
    }
  }
}
