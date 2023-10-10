from django.urls import path
from .views import CommentCreateView

urlpatterns = [
    path('add-comment/', CommentCreateView.as_view(), name='add-comment'),
]
