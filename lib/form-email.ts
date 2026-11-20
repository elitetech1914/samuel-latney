import "server-only";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function formatFormEmail(payload: Record<string, string>) {
  const isContact = payload.kind === "contact";
  const title = isContact ? "New contact message" : "New reader-list signup";
  const details = isContact
    ? [
        ["Name", payload.name],
        ["Email", payload.email],
        ["Subject", payload.subject],
        ["Category", payload.category],
        ["Organization", payload.organization || "Not provided"],
        ["Consent", "Confirmed"],
      ]
    : [["Email", payload.email]];
  const message = isContact ? payload.message : "";
  const text = [
    "Samuel Latney | Website forms",
    title,
    "",
    ...details.map(([label, value]) => `${label}: ${value}`),
    ...(message ? ["", "Message", message] : []),
  ].join("\n");

  const rows = details
    .map(
      ([label, value]) => `
        <tr>
          <th scope="row" style="padding:10px 16px 10px 0;text-align:left;vertical-align:top;color:#51464a">${label}</th>
          <td style="padding:10px 0;overflow-wrap:anywhere;word-break:break-word">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");
  const messageBlock = message
    ? `
          <h2 style="margin:24px 0 8px;font-size:16px">Message</h2>
          <div style="padding:16px;background:#f6f2ee;overflow-wrap:anywhere;word-break:break-word">${escapeHtml(message).replace(/\r\n|[\r\n]/g, "<br>")}</div>`
    : "";

  const html = `<!doctype html>
    <html lang="en">
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title></head>
      <body style="margin:0;padding:24px 12px;background:#f6f2ee;font-family:Arial,sans-serif;color:#292328;line-height:1.5">
        <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e3d9d3">
          <div style="padding:22px 24px;background:#422d38;color:#fff">
            <p style="margin:0;font-size:18px;font-weight:bold">Samuel Latney</p>
            <p style="margin:4px 0 0;font-size:14px">Website forms</p>
          </div>
          <div style="padding:24px">
            <h1 style="margin:0 0 12px;font-size:23px;line-height:1.25">${title}</h1>
            <table style="width:100%;border-collapse:collapse;table-layout:fixed">
              <colgroup><col style="width:115px"><col></colgroup>
              <tbody>${rows}</tbody>
            </table>
            ${messageBlock}
          </div>
        </div>
      </body>
    </html>`;

  return { subject: `Samuel Latney Website | ${title}`, text, html };
}
