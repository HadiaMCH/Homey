from django.urls import path
from .views import CommentEquipementCreateView


urlpatterns = [
        path('add_comment/', CommentEquipementCreateView.as_view(), name='add_comment'),
]
