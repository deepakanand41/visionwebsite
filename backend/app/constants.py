SUBMISSION_STATUSES = [
    "pending",
    "contacted",
    "in_progress",
    "completed",
    "cancelled",
    "rejected",
]

REFERRAL_EXTRA_STATUSES = ["approved", "onboarded"]

ALL_STATUSES = SUBMISSION_STATUSES + ["approved", "onboarded"]

STATUS_LABELS = {
    "pending": "Pending",
    "contacted": "Contacted",
    "in_progress": "In Progress",
    "completed": "Completed",
    "cancelled": "Cancelled",
    "rejected": "Rejected",
    "approved": "Approved",
    "onboarded": "Onboarded",
}
