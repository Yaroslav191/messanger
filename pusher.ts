import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: "1711859",
  key: "830caaa79321668ff9b3",
  secret: "749691801967888974df",
  cluster: "ap2",
  useTLS: true,
});

export const clientPusher = new ClientPusher("830caaa79321668ff9b3", {
  cluster: "ap2",
  forceTLS: true,
});
