from celery import shared_task
from .models import mail_reminder


@shared_task
def remind_by_mail():
    mail_reminder()


@shared_task
def add(x, y):
    return x + y


@shared_task
def mul(x, y):
    return x * y
