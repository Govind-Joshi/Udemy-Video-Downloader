let core = { hls: { downloader: { playlist: {} } } },
  arr2 = [],
  arr = [],
  arr3 = [],
  playlists = {},
  count = 0,
  playlistque = {},
  video_type = "",
  videofilename = "",
  regex = RegExp(
    "^(?:(?:https?)://)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/\\S*)?$",
    "i"
  );
chrome.webRequest.onBeforeSendHeaders.addListener(
  function (e) {
    let r = e.url,
      t = e.tabId,
      a = e.initiator,
      s = t > -1 && -1 === (a || r).indexOf("extension:"),
      o = /.*\.m3u8.*/,
      l = s && o.test(r),
      d = regex.test(r);
    l &&
      d &&
      o.test(r) &&
      (arr.push(r),
      console.log(r, "vrlll00", arr),
      console.log(l, "bodyyy..."),
      setTimeout(() => {
        chrome.storage.local.set({ currentUrl: arr });
      }, 2e3));
  },
  {
    urls: ["<all_urls>"],
    types: ["main_frame", "sub_frame", "xmlhttprequest"],
  },
  ["requestHeaders", "extraHeaders"]
),
  chrome.webRequest.onResponseStarted.addListener(
    function (e) {
      let r = e.url,
        t;
      (e.initiator || r).indexOf("extension:"),
        console.log(r),
        /.*\.mp4$/.test(r),
        r.includes("mp4") &&
          (arr2.push(r),
          console.log(r, "Added to arr2:", arr2),
          setTimeout(() => {
            chrome.storage.local.set({ mp4Urls: arr2 });
          }, 2e3));
    },
    { urls: ["<all_urls>"], types: ["media"] }
  ),
  chrome.webRequest.onResponseStarted.addListener(
    function (e) {
      let r = e.url,
        t;
      (e.initiator || r).indexOf("extension:"),
        /.*\.mpd.*/.test(r) &&
          (arr3.push(r),
          console.log(r, "Added to arr3:", arr3),
          console.log(r),
          setTimeout(() => {
            chrome.storage.local.set({ mpdUrls: arr3 });
          }, 2e3));
    },
    {
      urls: ["<all_urls>"],
      types: ["main_frame", "sub_frame", "xmlhttprequest"],
    }
  ),
  chrome.tabs.onUpdated.addListener(function (e, r, t) {
    "complete" === r.status &&
      (console.log("storage is removed before"),
      chrome.storage.local.remove("currentUrl"),
      chrome.storage.local.remove("mp4Urls"),
      (arr = []),
      (arr2 = []),
      console.log("storage is removed afer"));
  }),
  chrome.tabs.onActivated.addListener(function (e) {
    console.log("Tab activated:", e.tabId),
      console.log("storage is removed before"),
      chrome.storage.local.remove("currentUrl"),
      chrome.storage.local.remove("mp4Urls"),
      console.log("storage is removed before"),
      (arr = []),
      (arr2 = []);
  }),
  chrome.runtime.onInstalled.addListener(function () {
    chrome.tabs.create({
      url: "https://www.crxinsider.com/extension/mpopehihboghkcnmlklemlccmkmjeobe?utm_source=extinstall",
    });
  }),
  chrome.runtime.setUninstallURL(
    "https://www.crxinsider.com/extension/mpopehihboghkcnmlklemlccmkmjeobe?utm_source=extuninstall"
  );
