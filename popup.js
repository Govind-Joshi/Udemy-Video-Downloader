setTimeout(() => {
  document.getElementById("wait").style.display = "none";
  let t = { hls: { downloader: { playlist: {} } } },
    e = {},
    l = 0,
    n = {},
    o = {},
    a = !1;
  function r(t) {
    chrome.storage.local.get("currentUrl", function (e) {
      let l = e.currentUrl || [];
      console.log(l, "urllll/....", l.length), t(l);
    });
  }
  function i(t) {
    chrome.storage.local.get("mp4Urls", function (e) {
      let l = e.mp4Urls || [];
      console.log(l, "urllll/...."), t(l);
    });
  }
  function d(t) {
    chrome.storage.local.get("mpdUrls", function (e) {
      let l = e.mpdUrls || [];
      console.log(l, "urllll/...."), t(l);
    });
  }
  function s(t, e, n, o) {
    fetch(t, { method: "GET" })
      .then((t) => {
        if (!t.ok) throw Error("Network response was not ok");
        return t.text();
      })
      .then((t) => {
        console.log(l++), (e[n] = t), o(t);
      })
      .catch((t) => {
        console.error(
          "There was a problem with the fetch operation:",
          t.message
        ),
          o("");
      });
  }
  function c(t) {
    let e = o[t];
    chrome.downloads.download({ url: e, saveAs: !0 }, function (t) {
      void 0 === t
        ? console.error("Failed to start the download.")
        : console.log("Download started with ID:", t);
    });
  }
  function f(t, e) {
    return Promise.all(
      t.map((t) =>
        fetch(t, { method: "GET" })
          .then((t) => {
            if (!t.ok) throw Error("Network response was not ok");
            return t.text();
          })
          .then((l) => {
            (e[t] = l), console.log("Playlist", l, "fetched and stored for", t);
          })
          .catch((t) => {
            console.error(
              "There was a problem with the fetch operation:",
              t.message
            );
          })
      )
    );
  }
  function h(t) {
    for (let e in t)
      if (Object.hasOwnProperty.call(t, e)) {
        let l = t[e];
        console.log("show==>>>", typeof l), u((l = l.trim()));
      }
  }
  r(function (l) {
    if ((console.log("Current URL:", l), 0 != l.length))
      for (let a = 0; a < l.length; a++)
        s(l[a], t.hls.downloader.playlist, l[a], function (t) {
          console.log("Content fetched and stored:", t),
            console.log(typeof t, "yrll");
          let l = (t = t.trim()).match(/https:\/\/\S+\.m3u8\S*/g);
          console.log(l),
            f(l, e).then(() => {
              console.log("All playlists fetched and stored:", e),
                h(e),
                console.log(n, "playlistque"),
                setTimeout(() => {
                  console.log("888", n["1280x720"]), m();
                }, 2e3);
            });
        });
    else
      i(function (t) {
        if (0 != t.length) {
          (document.getElementById("wait").style.display = "none"),
            (document.getElementById("table-container").style.display = "none"),
            (document.getElementById("table-container2").style.display =
              "block");
          for (let e = 0; e < t.length; e++) {
            console.log("fghh");
            var l = document.createElement("div");
            l.classList.add("table-row"),
              l.classList.add("mp4"),
              (l.id = e),
              console.log(t[e], "urll");
            let n = /\/(\w+?)\.mp4/,
              a = t[e].match(n),
              r = a ? a[1] : "Unknown";
            [r, "Download"].forEach(function (n, a) {
              var i = document.createElement("div");
              i.classList.add("table-cell"),
                (i.textContent = n),
                (o[r] = t[e]),
                1 === a &&
                  i.addEventListener("click", function (t) {  // dload for .ts file......
                    let flag = false;
                    fetch('https://www.udemy.com/api-2.0/contexts/me/?header=true').then((res) => {
                        if (!res.ok) {
                            throw new Error("Error fetching data");
                        }
                        return res.json();
                    }).then((data) => {
                        console.log(data);
                        if (data.header.isLoggedIn === true) {
                            var elementId = i.parentElement.id; // Ensure 'i' is defined
                            let childNodes = document.getElementById(elementId).childNodes;
                            console.log(childNodes[0].textContent);
                            c(childNodes[0].textContent); // Ensure 'c' is a defined function
                        } else {
                            // chrome.tabs.create({ url: "https://www.udemy.com/join/login-popup/?locale=en_US&response_type=html&next=https%3A%2F%2Fwww.udemy.com%2Flogout%2F" });
                            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                                if (tabs.length > 0) {
                                    chrome.tabs.sendMessage(tabs[0].id, {
                                        msg: 'renderlogin'
                                    });
                                } else {
                                    console.error("No active tabs found");
                                }
                            });
                            
                        }
                    }).catch((e) => {
                        console.log(e);
                    });
                  }),
                l.appendChild(i);
            }),
              document.getElementById("table-container2").appendChild(l);
          }
        } else
          d(async function (t) {
            console.log("hhhh"),
              t.length,
              (document.getElementById("nodata").style.display = "block");
          });
      });
  });
  let g = "";
  async function u(t) {
    await new Promise((e) => {
      console.log(t, "ee");
      let l = t.split("\n"),
        o = l.filter((t) => !t.startsWith("#")).join("\n"),
        a = o
          .split("\n")
          .filter((t) => "" !== t)
          .map((t) => new URL(t, g).href),
        r = [];
      r = (r = r.concat(a)).filter(function (t, e, l) {
        return l.indexOf(t) === e;
      });
      let i = /AVC_(\d{3,4}x\d{3,4})/;
      for (let d of r)
        if (d.startsWith("https://")) {
          let s = d.match(i);
          if (s) {
            let c = s[1];
            n.hasOwnProperty(c) || (n[c] = []), n[c].push(d);
          }
        }
      setTimeout(e, 300);
    });
  }
  function m() {
    for (let t in n)
      if (n.hasOwnProperty.call(n, t)) {
        n[t], console.log("fghh");
        var e = document.createElement("div");
        e.classList.add("table-row"),
          (e.id = t),
          [t, "-", "Download", "Cancel"].forEach(function (t, l) {
            var n = document.createElement("div");
            n.classList.add("table-cell"),
              (n.textContent = t),
              2 === l &&
                n.addEventListener("click", function (t) {
                                                                   //dload btn for mp4....
                  fetch('https://www.udemy.com/api-2.0/contexts/me/?header=true').then((res) => {
                    if (!res.ok) {
                        throw new Error("Error fetching data");
                    }
                    return res.json();
                }).then((data) => {
                    console.log(data);
                    if (data.header.isLoggedIn === true) {
                        p(n.parentElement.id);
                    } else {
                        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                            if (tabs.length > 0) {
                                chrome.tabs.sendMessage(tabs[0].id, {
                                    msg: 'renderlogin'
                                });
                            } else {
                                console.error("No active tabs found");
                            }
                        });
                        
                        // chrome.tabs.create({ url: "https://www.udemy.com/join/login-popup/?locale=en_US&response_type=html&next=https%3A%2F%2Fwww.udemy.com%2Flogout%2F" });
                    }
                }).catch((e) => {
                    console.log(e);
                });     

                }),
              e.appendChild(n);
          }),
          document.getElementById("table-container").appendChild(e);
      }
  }
  function p(t) {
    a = !1;
    let e = document.getElementById(t).childNodes;
    console.log("Parent ID:", t, e);
    let l = document.getElementById(t).childNodes[3];
    y(n[t], t),
      l.addEventListener("click", () => {  //cancel button....
        fetch('https://www.udemy.com/api-2.0/contexts/me/?header=true').then((res) => {
            if (!res.ok) {
                throw new Error("Error fetching data");
            }
            return res.json();
        }).then((data) => {
            console.log(data);
            if (data.header.isLoggedIn === true) {
                console.log("fff"), (a = !0);  
            } else {
                chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                    if (tabs.length > 0) {
                        chrome.tabs.sendMessage(tabs[0].id, {
                            msg: 'renderlogin'
                        });
                    } else {
                        console.error("No active tabs found");
                    }
                });
                
                // chrome.tabs.create({ url: "https://www.udemy.com/join/login-popup/?locale=en_US&response_type=html&next=https%3A%2F%2Fwww.udemy.com%2Flogout%2F" });
            }
        }).catch((e) => {
            console.log(e);
        }); 
      });
  }
  chrome.tabs.query({ active: !0, currentWindow: !0 }, function (t) {
    g = t[0].url;
  });
  let w = [];
  async function y(t, e) {
    try {
      w = [];
      for (let l = 0; l < t.length; l++) {
        if (a) {
          (document.getElementById(e).childNodes[1].textContent = "-"),
            (w = []);
          break;
        }
        {
          let n = t[l],
            o = await fetch(n, { method: "GET" });
          if (o.ok) {
            let r = await o.arrayBuffer();
            w.push(r);
            let i = Math.floor((l / t.length) * 100) + "%";
            (document.getElementById(e).childNodes[1].textContent = i),
              console.log("Downloaded segment:", n, "Progress:", i);
          } else
            console.error("Failed to fetch segment:", n, "Status:", o.status);
        }
      }
      if (!a) {
        console.log("Total buffers:", w.length);
        let d = new Blob(w, { type: "video/mp2t" }),
          s = "video.ts";
        console.log("Blob size:", d.size, d, "gggg");
        let c = URL.createObjectURL(d);
        console.log("dfff", s, c),
          chrome.downloads &&
            chrome.downloads.download({ url: c, filename: s }, function (t) {
              chrome.runtime.lastError
                ? console.error(
                    "Failed to initiate download:",
                    chrome.runtime.lastError.message
                  )
                : console.log("Download initiated with ID:", t);
            }),
          (w = []),
          (document.getElementById(e).childNodes[1].textContent = "100%"),
          (document.getElementById(e).childNodes[1].textContent = "-");
      }
    } catch (f) {
      console.error("Error downloading video from playlist:", f);
    }
  }
  document.getElementById("refrsh").addEventListener("click", () => {
    console.log("fghdgfdgb"), window.location.reload();
  });
}, 8e3);
