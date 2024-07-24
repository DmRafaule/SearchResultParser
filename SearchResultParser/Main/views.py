from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ResultSerializer
from .models import Result


class ResultView(viewsets.ModelViewSet):
    serializer_class = ResultSerializer
    queryset = Result.objects.all()

def home(request):
    return render(request, 'Main/home.html')