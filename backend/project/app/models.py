from django.db import models

# Create your models here.

def find_start(date, time):
        return str(date, "T", time)

class Patient(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=300, default="password")
    gender = models.CharField(max_length=8, choices=[("Male", "Male"), ("Female", "Female"), ("Other", "Other")])
    phone_num = models.CharField(max_length=10)
    address = models.CharField(max_length=200)
    dob = models.DateField()
    bloodgroup = models.CharField(max_length=3)

    def __str__(self):
        return self.name

class Doctor(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True, default="doc@gmail.com")
    password = models.CharField(max_length=300, default="password")
    gender = models.CharField(max_length=8, choices=[("Male", "Male"), ("Female", "Female"), ("Other", "Other")])
    phone_num = models.CharField(max_length=10)
    degree = models.CharField(max_length=10)
    specialisation = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Appointment(models.Model):
    doctor_email = models.CharField(max_length=50)
    patient_email = models.CharField(max_length=50)
    appointment_date = models.CharField(max_length=10)
    appointment_time = models.CharField(max_length=10)
    start = models.CharField(max_length=20, default="2023-09-19T10:00")
    symptoms = models.CharField(max_length=200)
    status = models.CharField(max_length=20,
                                choices=[
                                    ("Completed", "Completed"), 
                                    ("Scheduled", "Scheduled"), 
                                    ("Cancelled", "Cancelled")
                                ])

    def save(self, *args, **kwargs):
        date_time = self.appointment_date + "T" + self.appointment_time

        self.start = date_time
        super(Appointment, self).save()
    
    def __str__(self):
        return self.patient_email + " has an appointment with " + self.doctor_email + " on " + self.appointment_date + " at " + self.appointment_time