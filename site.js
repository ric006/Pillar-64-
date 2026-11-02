/* Pillar 64 site settings. Edit the three values below and nothing else needs to change.
   DOWNLOAD_URL : the link to the ISO once it is uploaded (leave "" until then)
   SHA256       : optional. Fill it in to show a SHA-256 line on the Download page
   REPO_URL     : optional. The GitHub page, shown in the footer */
var PILLAR = {
  DOWNLOAD_URL: "",
  SHA256: "",
  REPO_URL: ""
};

(function () {
  function ready(fn) { if (document.readyState !== "loading") fn(); else document.addEventListener("DOMContentLoaded", fn); }
  ready(function () {
    // download buttons
    var links = document.querySelectorAll("[data-download]");
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      if (PILLAR.DOWNLOAD_URL) {
        a.setAttribute("href", PILLAR.DOWNLOAD_URL);
        a.setAttribute("rel", "noopener");
      } else {
        a.setAttribute("href", "download.html");
        if (a.hasAttribute("data-needs-link")) {
          a.setAttribute("aria-disabled", "true");
          a.removeAttribute("href");
          a.textContent = "Download link coming soon";
        }
      }
    }
    // optional SHA-256 row
    var sha = document.querySelectorAll("[data-sha256]");
    for (var j = 0; j < sha.length; j++) {
      if (PILLAR.SHA256) { sha[j].hidden = false; var c = sha[j].querySelector("code"); if (c) c.textContent = PILLAR.SHA256; var b = sha[j].querySelector(".copy"); if (b) b.setAttribute("data-copy", PILLAR.SHA256); }
      else sha[j].hidden = true;
    }
    // repo link
    var repo = document.querySelectorAll("[data-repo]");
    for (var k = 0; k < repo.length; k++) {
      if (PILLAR.REPO_URL) repo[k].setAttribute("href", PILLAR.REPO_URL); else repo[k].hidden = true;
    }
    // copy buttons
    var btns = document.querySelectorAll(".copy");
    for (var m = 0; m < btns.length; m++) {
      btns[m].addEventListener("click", function (e) {
        var btn = e.currentTarget;
        var text = btn.getAttribute("data-copy") || "";
        function done() { var old = btn.textContent; btn.textContent = "Copied"; btn.classList.add("done"); setTimeout(function () { btn.textContent = old; btn.classList.remove("done"); }, 1600); }
        function fallback() {
          var code = btn.parentNode.querySelector("code");
          if (code && window.getSelection) { var r = document.createRange(); r.selectNodeContents(code); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); }
        }
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback);
          else fallback();
        } catch (err) { fallback(); }
      });
    }
  });
})();
