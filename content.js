chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "displayData") {
    const data = request.data;

    // 创建一个容器来显示数据
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.bottom = '10px';
    container.style.right = '10px';
    container.style.zIndex = '10000';
    container.style.backgroundColor = 'white';
    container.style.border = '1px solid #ccc';
    container.style.padding = '10px';
    container.style.maxWidth = '300px';
    container.style.maxHeight = '200px';
    container.style.overflowY = 'scroll';
    container.style.fontSize = '12px';

    // 将 JSON 数据格式化为字符串
    container.innerText = JSON.stringify(data, null, 2);

    // 将容器添加到页面中
    document.body.appendChild(container);
  }
});