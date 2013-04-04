var notifications = window.webkitNotifications
  , permission = notifications ? notifications.checkPermission() == 0 : false

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

    if (who !== me && document.hasFocus === false) {
      webkitNotifications.createNotification(
        'https://talkerapp.com/images/favicon.png',
        who,
        what
      ).show()
    }
  }
}
