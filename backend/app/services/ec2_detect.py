import urllib.error
import urllib.request


def is_running_on_ec2() -> bool:
    """Return True when the app is running on an AWS EC2 instance."""
    try:
        req = urllib.request.Request(
            "http://169.254.169.254/latest/meta-data/instance-id",
            headers={"User-Agent": "VisionBackend/1.0"},
        )
        with urllib.request.urlopen(req, timeout=0.5) as resp:
            return resp.status == 200
    except (urllib.error.URLError, TimeoutError, OSError, ValueError):
        return False
