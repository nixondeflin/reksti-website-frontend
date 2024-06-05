import mqtt from "mqtt";

const MQTT_BROKER_URL = "wss://63a7f86a1960468786403506b8690fbe.s1.eu.hivemq.cloud:8884/mqtt";
const MQTT_TOPIC = "home/access";

const options = {
  reconnectPeriod: 5000, // Increase reconnect period to 5 seconds
  clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
  username: "Darren",  // Replace with your actual MQTT username
  password: "Reksti123",  // Replace with your actual MQTT password
  protocol: "wss",
  rejectUnauthorized: false // If you are using a self-signed certificate
};

const client = mqtt.connect(MQTT_BROKER_URL, options);

client.on("connect", () => {
  console.log("Connected to MQTT Broker");
  client.subscribe(MQTT_TOPIC, (err) => {
    if (!err) {
      console.log(`Subscribed to topic: ${MQTT_TOPIC}`);
    } else {
      console.error(`Failed to subscribe: ${err.message}`);
    }
  });
});

client.on("error", (err) => {
  console.error("Connection error: ", err);
});

client.on("reconnect", () => {
  console.log("Reconnecting...");
});

client.on("close", () => {
  console.log("Connection closed");
});

client.on("offline", () => {
  console.log("Client is offline");
});

client.on("end", () => {
  console.log("Client ended");
});

export default client;
