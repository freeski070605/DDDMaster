(function () {
  var currentScript = document.currentScript;
  var trackingId = currentScript && currentScript.getAttribute("data-tracking-id");
  var debug = currentScript && currentScript.getAttribute("data-debug");
  var script = document.createElement("script");

  script.src = "https://link.msgsndr.com/js/external-tracking.js";
  script.async = true;

  if (trackingId) {
    script.setAttribute("data-tracking-id", trackingId);
  }

  if (debug) {
    script.setAttribute("data-debug", debug);
  }

  document.head.appendChild(script);
})();
