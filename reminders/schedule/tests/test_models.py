from django.test import TestCase
from ..models import Event


class ModelTest(TestCase):

    def test_create_event(self):
        """Test creating new event is successful"""
        name = 'New Event'
        date = '18/12/2020'
        time = '09:11 PM'
        event = Event()
        event.add(
            name=name,
            date_time=Event.make_date_time(date, time),
        )

        self.assertEqual(event.name, name)
        self.assertEqual(event.date_time, '2020-12-18 21:11:00')
