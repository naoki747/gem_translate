function normalizeUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) return "";

  return /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
}

function buypass() {
  if (!window.PaymentRequest) {
    return alert("Payment Request APIに未対応なため使えません");
  }

  const input = document.getElementById("sourceUrlInput");
  const url = normalizeUrl(input.value);

  if (!url) {
    return alert("URLを入力してください");
  }

  new PaymentRequest(
    [
      {
        supportedMethods: location.origin + "/payment-manifest.json",
        data: {
          url: url
        },
      },
    ],
    {
      total: {
        label: "_",
        amount: {
          value: "1",
          currency: "USD"
        },
      },
    }
  ).show();
}

document.getElementById("translateButton").onclick = buypass;
