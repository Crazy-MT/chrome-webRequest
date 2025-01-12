// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// chrome.webNavigation.onCompleted.addListener((details) => {
//   chrome.notifications.create({
//     type: 'basic',
//     iconUrl: 'icon.png',
//     title: 'page loaded',
//     message:
//       'Completed loading: ' +
//       details.url +
//       ' at ' +
//       details.timeStamp +
//       ' milliseconds since the epoch.'
//   });
// });

chrome.webRequest.onCompleted.addListener(
  function(details) {
    
    if (details.tabId >= 0 && details.url.includes("json?action=CommonAction")) {
      fetch(details.url)
        .then(response => response.json())
        .then(data => {
          chrome.tabs.sendMessage(details.tabId, { action: "displayData", data: data });
        });
    }

    if (details.tabId >= 0 && details.url.includes("profile_id?aid=2608")) {
      console.log("Intercepted URL:", details.url);  // 将 URL 打印到控制台
      fetch(details.url)
        .then(response => response.json())
        .then(data => {
          chrome.tabs.sendMessage(details.tabId, { action: "displayData", data: data });
        });
    }
  },
  { urls: ["<all_urls>"] }
);
