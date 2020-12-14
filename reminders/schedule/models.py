from django.db import models


class Event(models.Model):

    name = models.TextField()
    date_time = models.DateTimeField(auto_now=False)

    def __str__(self):
        return f"{self.name} ({self.date_time})"

