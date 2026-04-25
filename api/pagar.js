export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { total } = req.body;

    // 🔥 CHAMADA PARA A API DA PARADISE (COLE AQUI)
    const response = await fetch("COLE_AQUI_URL_DA_API_PARADISE", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: total,
        description: "Compra no site"
      })
    });

    const data = await response.json();

    // 🔥 AJUSTAR CONFORME RESPOSTA DA PARADISE
    return res.status(200).json({
      pix_code: data.pix_code, // ou data.payload
      qr_code: data.qr_code    // ou data.qr_image
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Erro ao gerar pagamento" });
  }
}
