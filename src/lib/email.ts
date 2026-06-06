import { Resend } from "resend";
import type { Order } from "@/lib/schema";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderNotification(order: Order) {
    const features = JSON.parse(order.features) as string[];

    await resend.emails.send({
        from: "Zytronium WebWorks <onboarding@resend.dev>", // swap once you verify a domain
        to: process.env.NOTIFY_EMAIL!,
        subject: `New Order #${order.id} - ${order.name}`,
        html: `
            <div style="font-family:monospace;background:#0d0925;color:#e3f0f0;padding:32px;max-width:600px;margin:0 auto;">
                <h1 style="color:#00b2ff;letter-spacing:4px;text-transform:uppercase;font-size:18px;margin:0 0 4px;">
                    New Order Received
                </h1>
                <p style="color:#e3f0f080;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 32px;">
                    Order #${order.id} · ${new Date(order.createdAt).toLocaleString()}
                </p>

                <table style="width:100%;border-collapse:collapse;">
                    ${row("Name",     order.name)}
                    ${row("Business", order.business)}
                    ${row("Email",    order.email)}
                    ${row("Phone",    order.phone || "Not provided")}
                    ${row("Location", order.location)}
                    <tr><td colspan="2" style="padding:12px 0;border-bottom:1px solid #00b2ff22;"></td></tr>
                    ${row("Scope",    order.scope)}
                    ${row("Features", features.length ? features.join(", ") : "None")}
                    ${order.estimatedMin != null
            ? row("Estimate", `$${order.estimatedMin.toLocaleString()} – $${order.estimatedMax?.toLocaleString()}`)
            : ""}
                    ${row("Domain",   order.domain)}
                    ${row("Hosting",  order.hosting)}
                    ${row("Showcase", order.showcase)}
                </table>

                <div style="margin-top:24px;padding:16px;border:1px solid #00b2ff22;background:#00b2ff08;">
                    <p style="color:#00b2ff80;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:0 0 8px;">
                        Project Description
                    </p>
                    <p style="color:#e3f0f0cc;font-size:14px;line-height:1.6;margin:0;white-space:pre-wrap;">
                        ${order.projectDescription}
                    </p>
                </div>

                <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/dashboard"
                   style="display:inline-block;margin-top:24px;padding:12px 24px;background:#00b2ff18;border:1px solid #00b2ff66;color:#00b2ff;text-decoration:none;letter-spacing:2px;text-transform:uppercase;font-size:12px;">
                    View in Dashboard →
                </a>
            </div>
        `,
    });
}

function row(label: string, value: string) {
    return `
        <tr>
            <td style="padding:8px 12px 8px 0;color:#e3f0f060;font-size:11px;letter-spacing:2px;text-transform:uppercase;white-space:nowrap;border-bottom:1px solid #00b2ff11;vertical-align:top;">
                ${label}
            </td>
            <td style="padding:8px 0;color:#e3f0f0cc;font-size:13px;border-bottom:1px solid #00b2ff11;vertical-align:top;">
                ${value}
            </td>
        </tr>
    `;
}
