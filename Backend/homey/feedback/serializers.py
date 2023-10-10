from rest_framework import serializers
from .models import Feedback

class FeedbackSerializer(serializers.ModelSerializer):
    author_username = serializers.SerializerMethodField()

    class Meta:
        model = Feedback
        fields = ['id', 'text', 'is_selected', 'author', 'author_username']

    def get_author_username(self, obj):
        return obj.author.username

class AddFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['text']  