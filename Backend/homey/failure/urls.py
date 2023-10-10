from django.urls import path
from . import views

urlpatterns = [
    path('add/', views.FailureCreateView.as_view(), name='add_failure'),
]
