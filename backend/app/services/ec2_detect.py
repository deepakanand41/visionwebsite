import urllib.error
import urllib.request

IMDS_BASE = "http://169.254.169.254"
USER_AGENT = "VisionBackend/1.0"


def _imds_v2_token() -> str | None:
    """Fetch IMDSv2 session token (required on many EC2 instances)."""
    try:
        req = urllib.request.Request(
            f"{IMDS_BASE}/latest/api/token",
            method="PUT",
            headers={
                "X-aws-ec2-metadata-token-ttl-seconds": "21600",
                "User-Agent": USER_AGENT,
            },
        )
        with urllib.request.urlopen(req, timeout=1.5) as resp:
            return resp.read().decode("utf-8").strip() or None
    except (urllib.error.URLError, TimeoutError, OSError, ValueError):
        return None


def is_running_on_ec2() -> bool:
    """Return True when the app is running on an AWS EC2 instance."""
    headers = {"User-Agent": USER_AGENT}
    token = _imds_v2_token()
    if token:
        headers["X-aws-ec2-metadata-token"] = token

    try:
        req = urllib.request.Request(
            f"{IMDS_BASE}/latest/meta-data/instance-id",
            headers=headers,
        )
        with urllib.request.urlopen(req, timeout=1.5) as resp:
            return bool(resp.read().strip())
    except (urllib.error.URLError, TimeoutError, OSError, ValueError):
        return False
