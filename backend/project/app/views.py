from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q

# Create your views here.
class PatientListView(APIView):
    def get(self, request):
        return Response(Patient.objects.all().values())

    def post(self, request):
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        
class DoctorListView(APIView):
    def get(self, request):
        return Response(Doctor.objects.all().values())

    def post(self, request):
        serializer = DoctorSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

class AppointmentListView(APIView):
    def get(self, request, type, email):
        if(type=="Patient"):
            return Response(Appointment.objects.filter(patient_email = email).order_by('appointment_date', 'appointment_time').values())
        else:
            return Response(Appointment.objects.filter(doctor_email = email).order_by('appointment_date', 'appointment_time').values())

    def post(self, request, type, email):
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        
class AppointmentChangeStatus(APIView):
    def put(self, request, id, status):
        snippet = Appointment.objects.filter(id=id).first()
        serializer = AppointmentSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            print(serializer.errors)
            return Response(serializer.errors)
        
class UserLogin(APIView):
    def post(self, request):
        # print("request ", request['data'])
        if(request.data['type']=="Patient"):
            return Response(Patient.objects.filter(email= request.data['email']).values())
        else:
            return Response(Doctor.objects.filter(email= request.data['email']).values())
    
    # def post(self, request):
    #     if(request.data['type']=="Patient"):
    #         return Response({'count': Patient.objects.filter(email= request.data['email'], password = request.data['password']).count()})
    #     else:
    #         return Response({'count': Doctor.objects.filter(email= request.data['email'], password = request.data['password']).count()})