import os

import datetime
from celery import shared_task
from django.core.mail import send_mail

from .models import Event
import pytz


@shared_task
def remind_by_mail():
    utc = pytz.UTC
    now = datetime.datetime.now()
    now_plus_30_sec = utc.localize(now + datetime.timedelta(seconds=30))
    now_minus_30_sec = utc.localize(now + datetime.timedelta(seconds=-30))

    events = Event.objects.all()

    for event in events:
        if now_minus_30_sec <= event.date_time <= now_plus_30_sec:
            send_mail(
                event.name,
                f"Начало в {event.date_time}",
                os.getenv("EMAIL_HOST_USER"),
                [os.getenv("EMAIL_HOST_USER")],
                fail_silently=False,
            )
