"use strict"; // 使用嚴格模式


// 初始化 SignalR 連線
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
// 當 SignalR 連接成功後執行
connection.start().then(function () {
    console.log("Connected to SignalR");

    // 加入新群組
    document.getElementById("addGroupBtn").addEventListener("click", function (event) {
        var user = document.getElementById("name").value;
        var group = document.getElementById("group").value;
        connection.invoke("AddToGroup", group, user).catch(function (err) {
            return console.error(err.toString());
        });
        event.preventDefault();
    });

    // 接收離開群組訊息
    connection.on("RemoveMessage", function (message) {
        var msg = message;
        var li = document.createElement("li");
        li.textContent = msg;
        document.getElementById("msgDiv").appendChild(li);
    });

    // 接收加入群組訊息
    connection.on("RecAddGroupMsg", function (message) {
        var msg = message;
        var li = document.createElement("li");
        li.textContent = msg;
        document.getElementById("msgDiv").appendChild(li);
    });

    // 群組訊息發送
    document.getElementById("submitGroupBtn").addEventListener("click", function (e) {

        let group = document.getElementById("group").value; // 抓取群組名稱
        let user = document.getElementById("name").value; // 抓取使用者名稱
        let message = document.getElementById("msg").value; // 抓取訊息內容

        // 建立群組訊息連線
        connection.invoke("SendMessageToGroup", user, message, group).catch(function (err) {
            return console.error(err.toString()); // 顯示錯誤訊息
        })
        e.preventDefault();
    })

    // 群組訊息接收
    connection.on("ReceiveMessageToGroup", function (groupName, user, message) {
        if (document.getElementById("group").value === groupName) {
            let msg = `[${groupName}] ${user} 說：${message}`; // 顯示訊息
            let li = document.createElement("li"); // 建立 li 元素
            li.textContent = msg; // 設定 li 元素文字內容
            document.getElementById("msgDiv").appendChild(li); // 將 li 元素加入 msgDiv 元素
            console.log(msg);
        }
    })

    // 全頻訊息發送
    document.getElementById("submitAllBtn").addEventListener("click", function (e) {

        let user = document.getElementById("name").value; // 抓取使用者名稱
        let message = document.getElementById("msg").value; // 抓取訊息內容

        // 建立群組訊息連線
        connection.invoke("SendMessageToAll", user, message).catch(function (err) {
            return console.error(err.toString()); // 顯示錯誤訊息
        })
        e.preventDefault();
    })
    // 全頻道 訊息接收
    connection.on("ReceiveMessageToAll", function (user, message) {
        let msg = `[全頻道訊息] ${user}說：${message}`; // 顯示訊息
        let li = document.createElement("li"); // 建立 li 元素
        li.textContent = msg; // 設定 li 元素文字內容
        document.getElementById("msgDiv").appendChild(li); // 將 li 元素加入 msgDiv 元素
        console.log(msg);
    })
})
    .catch(function (err) {
        return console.error(err.toString());
    });