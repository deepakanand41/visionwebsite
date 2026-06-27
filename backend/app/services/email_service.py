import logging
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from smtplib import SMTPAuthenticationError, SMTPException
from threading import Thread
from typing import Any

from app.config import settings

logger = logging.getLogger(__name__)

EMAIL_SUBJECT_PREFIX = "[Vision International Educational Consultant]"

ZOHO_AUTH_HINT = (
    "Zoho SMTP authentication failed. Check: (1) SMTP_USERNAME is your full email, "
    "(2) use an App-Specific Password if 2FA is on (Zoho Mail → Settings → Security), "
    "(3) try smtp.zoho.in for India accounts or smtppro.zoho.com for custom domain org mail, "
    "(4) SMTP_FROM_EMAIL must match SMTP_USERNAME, (5) enable IMAP/SMTP access in Zoho Mail settings."
)


def _ssl_context() -> ssl.SSLContext:
    """Build TLS context; uses certifi CA bundle (fixes macOS Python cert errors)."""
    if not settings.smtp_ssl_verify:
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        logger.warning("SMTP SSL verification is disabled — use only for local debugging")
        return ctx

    try:
        import certifi

        return ssl.create_default_context(cafile=certifi.where())
    except ImportError:
        return ssl.create_default_context()


def smtp_is_configured() -> bool:
    return bool(
        settings.smtp_enabled
        and settings.smtp_host
        and settings.smtp_username
        and settings.smtp_password
    )


def _format_value(value: Any) -> str:
    if value is None:
        return "—"
    if isinstance(value, bool):
        return "Yes" if value else "No"
    text = str(value).strip()
    return text or "—"


def _build_bodies(form_name: str, fields: dict[str, Any]) -> tuple[str, str]:
    rows_html = "".join(
        f"<tr><td style='padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;color:#444;width:180px;'>{label}</td>"
        f"<td style='padding:8px 12px;border-bottom:1px solid #eee;color:#222;'>{_format_value(value)}</td></tr>"
        for label, value in fields.items()
    )
    rows_text = "\n".join(f"{label}: {_format_value(value)}" for label, value in fields.items())

    html = f"""
    <div style="font-family:Arial,sans-serif;max-width:640px;color:#222;">
      <h2 style="color:#A50000;margin:0 0 12px;">New Form Submission</h2>
      <p style="margin:0 0 16px;color:#555;">A new <strong>{form_name}</strong> was submitted on the Vision website.</p>
      <table style="width:100%;border-collapse:collapse;background:#fafafa;border:1px solid #eee;border-radius:8px;">
        {rows_html}
      </table>
      <p style="margin:16px 0 0;font-size:12px;color:#888;">Vision International Educational Consultants</p>
    </div>
    """
    text = f"New Form Submission: {form_name}\n\n{rows_text}\n"
    return html.strip(), text


def _connect_smtp():
    """Open authenticated SMTP connection."""
    context = _ssl_context()
    security = settings.smtp_security.lower()
    if security == "ssl":
        server = smtplib.SMTP_SSL(settings.smtp_host, settings.smtp_port, context=context, timeout=30)
        server.login(settings.smtp_username, settings.smtp_password)
        return server

    server = smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=30)
    server.ehlo()
    if security in ("tls", "starttls"):
        server.starttls(context=context)
        server.ehlo()
    server.login(settings.smtp_username, settings.smtp_password)
    return server


def _send_message(
    subject: str,
    html_body: str,
    text_body: str,
    to_addresses: list[str],
    reply_to: str | None = None,
) -> None:
    if not to_addresses:
        raise ValueError("No email recipients")

    from_email = settings.smtp_from_email or settings.smtp_username
    if from_email.lower() != settings.smtp_username.lower():
        logger.warning(
            "SMTP_FROM_EMAIL (%s) differs from SMTP_USERNAME (%s); Zoho may reject this",
            from_email,
            settings.smtp_username,
        )

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"{settings.smtp_from_name} <{from_email}>"
    msg["To"] = ", ".join(to_addresses)
    if reply_to:
        msg["Reply-To"] = reply_to

    msg.attach(MIMEText(text_body, "plain", "utf-8"))
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    try:
        with _connect_smtp() as server:
            server.sendmail(from_email, to_addresses, msg.as_string())
    except SMTPAuthenticationError as exc:
        logger.error("%s Host=%s User=%s Error=%s", ZOHO_AUTH_HINT, settings.smtp_host, settings.smtp_username, exc)
        raise


def _resolve_recipients(submitter_email: str | None) -> list[str]:
    if submitter_email and submitter_email.strip():
        return [submitter_email.strip().lower()]
    return settings.notify_recipients


def _send_form_notification(form_name: str, fields: dict[str, Any], submitter_email: str | None) -> None:
    if not smtp_is_configured():
        return

    recipients = _resolve_recipients(submitter_email)
    if not recipients:
        logger.warning("No recipient email for form submission: %s", form_name)
        return

    try:
        html_body, text_body = _build_bodies(form_name, fields)
        subject = f"{EMAIL_SUBJECT_PREFIX} {form_name}"
        reply_to = settings.smtp_from_email or settings.smtp_username
        _send_message(subject, html_body, text_body, recipients, reply_to=reply_to)
        logger.info("Form notification email sent for %s to %s", form_name, ", ".join(recipients))
    except SMTPAuthenticationError:
        logger.error("%s (form: %s)", ZOHO_AUTH_HINT, form_name)
    except Exception:
        logger.exception("Failed to send form notification email for %s", form_name)


def verify_smtp_connection() -> dict[str, str]:
    """Test SMTP login only (no email sent). For diagnostics."""
    if not smtp_is_configured():
        return {"ok": False, "error": "SMTP is not fully configured in .env"}
    try:
        with _connect_smtp():
            pass
        return {
            "ok": True,
            "message": f"Authenticated successfully as {settings.smtp_username} via {settings.smtp_host}",
        }
    except SMTPAuthenticationError:
        return {"ok": False, "error": ZOHO_AUTH_HINT}
    except SMTPException as exc:
        return {"ok": False, "error": str(exc)}
    except Exception as exc:
        return {"ok": False, "error": str(exc)}


def send_test_notification() -> dict[str, str]:
    """Send a test notification email using current SMTP settings."""
    if not smtp_is_configured():
        return {"ok": False, "error": "SMTP is not fully configured in .env"}
    if not settings.notify_recipients:
        return {"ok": False, "error": "Set SMTP_NOTIFY_TO in .env for test emails"}
    try:
        _send_message(
            f"{EMAIL_SUBJECT_PREFIX} SMTP Test",
            "<p>SMTP test email from Vision website backend.</p>",
            "SMTP test email from Vision website backend.",
            settings.notify_recipients,
            reply_to=settings.smtp_from_email or settings.smtp_username,
        )
        return {"ok": True, "message": f"Test email sent to {', '.join(settings.notify_recipients)}"}
    except SMTPAuthenticationError:
        return {"ok": False, "error": ZOHO_AUTH_HINT}
    except Exception as exc:
        return {"ok": False, "error": str(exc)}


def notify_form_submission(
    form_name: str,
    fields: dict[str, Any],
    *,
    submitter_email: str | None = None,
) -> None:
    """Send admin notification email asynchronously; never raises to callers."""
    if not smtp_is_configured():
        logger.debug("SMTP not configured; skipping email for %s", form_name)
        return
    Thread(
        target=_send_form_notification,
        args=(form_name, fields, submitter_email),
        daemon=True,
    ).start()
