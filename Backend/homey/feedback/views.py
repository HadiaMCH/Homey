# feedback/views.py
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from .models import Feedback
from .serializers import FeedbackSerializer,AddFeedbackSerializer

class RecentSelectedFeedbackList(generics.ListAPIView):
    queryset = Feedback.objects.filter(is_selected=True).order_by('-id')[:6]
    serializer_class = FeedbackSerializer
    permission_classes = [AllowAny]

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Feedback
from .serializers import FeedbackSerializer, AddFeedbackSerializer
from rest_framework.authentication import TokenAuthentication

class AddFeedbackView(generics.CreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = AddFeedbackSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)