window.onload = function() {
  // Offer to install ourselves
  if (navigator.mozApps) {
    var request = navigator.mozApps.getSelf();
    request.onsuccess = function() {
      if (!this.result) {
        request = navigator.mozApps.install(location.protocol + "//" + location.host + location.pathname + "manifest.webapp");
        request.onsuccess = function() {
          this.result.launch();
        };
        request.onerror = function() {
          console.log("Install failed: " + this.error.name);
        };
      }
    };
  }
};
