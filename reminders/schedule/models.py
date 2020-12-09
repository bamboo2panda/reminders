from django.db import models
import datetime


class Event:

    name = models.TextField()
    date_time = models.DateTimeField()

    def __init__(self):
        self.name = ''
        self.date_time = ''

    def __str__(self):
        return self.name

    def add(self, name, date_time):
        self.name = name
        self.date_time = date_time

    @staticmethod
    def make_date_time(d, t):
        date_time_str = d + ' ' + t
        date_time = datetime.datetime.strptime(date_time_str, '%d/%m/%Y %I:%M %p')
        return str(date_time)
