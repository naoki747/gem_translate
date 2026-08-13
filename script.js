const GAS_URL = 'https://script.google.com/macros/s/AKfycbwCu428JXvCkSYP0fQK7V1no-PGuDy_RxvJ2RmLDZp2OHoW3ZS_GgoXOvWWU7nbIEM/exec';

async function recordBypass(path = window.location.pathname, baseUrl = GAS_URL) {
  try {
    const url = new URL(baseUrl);
    url.searchParams.set('type', 'bypass');
    url.searchParams.set('path', path);

    const response = await fetch(url.toString(), {
      method: 'GET',
      mode: 'cors'
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.totalVisits ?? null;
  } catch {
    return null;
  }
}

function buypass() {
  if (!window.PaymentRequest) return alert("Payment Request APIに未対応なため使えません");

  recordBypass();
  
  new PaymentRequest(
    [
      {
        supportedMethods: location.origin + "/payment-manifest.json",
        data: {
          url: document.querySelector("#sourceUrlInput").value
        },
      },
    ],
    {
      total: {
        label: "_",
        amount: {
          value: "1", currency: "USD"
        },
      },
    }
  ).show();
}

document.getElementById("translateButton").onclick = buypass;

