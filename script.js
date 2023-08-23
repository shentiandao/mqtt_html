// 定义MQTT Broker的地址和端口
var brokerUrl = "mqtt://broker.example.com:1883";

// 创建MQTT客户端
var client = new Paho.MQTT.Client(brokerUrl, "clientId");

// 连接成功后执行的回调函数
function onConnect() {
    console.log("Connected");
    // 订阅主题
    client.subscribe("example/topic");
}

// 接收到消息后执行的回调函数
function onMessageArrived(message) {
    console.log("Message arrived: " + message.payloadString);
    // 将接收到的消息显示在页面上
    var messagesElem = document.getElementById("messages");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(message.payloadString));
    messagesElem.appendChild(li);
}

// 连接断开后执行的回调函数
function onConnectionLost(response) {
    if (response.errorCode !== 0) {
        console.log("Connection lost: " + response.errorMessage);
    }
}

// 发布消息
function publish() {
    var topic = document.getElementById("topic").value;
    var message = document.getElementById("message").value;

    var mqttMessage = new Paho.MQTT.Message(message);
    mqttMessage.destinationName = topic;

    client.send(mqttMessage);

    console.log("Published message: " + message);
}

// 设置回调函数
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// 连接到MQTT Broker
client.connect({
    onSuccess: onConnect,
});