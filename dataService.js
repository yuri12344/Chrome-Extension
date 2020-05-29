
(function () {
  var urlPattern = 'https://www.hideyourselfonline.com/hmip-api/chrome.cgi';

  this.DataService = {

    requestListProxy: function(successCb, errorCb) {
      console.log('DataService.requestListProxy, uniqueid =', uniqueid);

      var url = urlPattern + '?uniqueid=' + uniqueid;
      SyncStorage.getKey(function(k) {
        if (k)
          url += '&key=' + k;
        $.ajax({
          method: 'GET',
          url: url,
          success: function (data) {
			  //console.log('*********DATA***********');
			  //console.log(data);
            successCb(data.split('\n'))
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.error('https://api.hide-my-ip.com/chrome.cgi IS BLOCKED, CHANGING TO https://www.hideyourselfonline.com/hmip-api/chrome.cgi');
            urlPattern = 'https://www.hideyourselfonline.com/hmip-api/chrome.cgi';
            errorCb(textStatus);
          }
        });
      });
    },

    registerIP: function (ip, successCb, errorCb) {
      var url = urlPattern + '?ip=' + ip + '&uniqueid=' + uniqueid;
      console.log('DataService registerIP, url=', url);
      SyncStorage.getKey(function(k) {
        if (k)
          url += '&key=' + k;
        $.ajax({
          method: 'GET',
          url: url,
          success: function (data) {

            console.log('response len:', data.length)
            console.log(data)

            if (data.length == 32)
              successCb(1, data);//type, data
            else if (data.length == 3 && data.substr(0, 2) === '-1')
              successCb(2);
            else
              errorCb('registerIP:', data);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            errorCb(textStatus);
          }
        });

      });
    }
  }

}).call(this);