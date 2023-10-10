from rest_framework import serializers
from .models import Comment
from authentication.models import CustomUser

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()  # Add username field

    class Meta:
        model = Comment
        fields = ['id', 'text', 'username']  # Update fields

    def get_username(self, obj):
        return obj.user.username if obj.user else None


from rest_framework import serializers
from .models import Comment
from authentication.models import CustomUser

class CommentAddSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ('id', 'text', 'username', 'equipment_model')

    def get_username(self, obj):
        return obj.user.username if obj.user else None
