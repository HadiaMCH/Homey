# feedback/urls.py
from django.urls import path
from .views import RecentSelectedFeedbackList, AddFeedbackView

urlpatterns = [
    path('add/', AddFeedbackView.as_view(), name='add-feedback'),
    path('recent-selected-feedback/', RecentSelectedFeedbackList.as_view(), name='recent-selected-feedback-list'),
]
