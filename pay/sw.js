self.addEventListener("canmakepayment", (e) => e.respondWith(true));

self.addEventListener("paymentrequest", async (event) => {
  event.respondWith(new Promise(async (resolve, reject) => {
    try {
      const client = await event.openWindow("./navigate.html");

      if (!client) {
        return reject("Failed to open window.");
      }

      const url = event.methodData?.[0]?.data?.url || "";

      if (!/^https?:\/\//i.test(url)) {
        return reject("Invalid URL.");
      }

      client.postMessage({
        url: url
      });

      resolve({
        methodName: event.methodData[0].supportedMethods,
        details: {}
      });

    } catch (error) {
      reject(error);
    }
  }));
});
