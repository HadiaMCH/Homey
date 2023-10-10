from rest_framework import serializers
from .models import CommentEquipement

class CommentEquipementSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentEquipement
        fields = '__all__'

class CommentEquipementListSerializer(serializers.ModelSerializer):
    user_username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = CommentEquipement
        fields = ['id', 'text', 'user_username', 'equipement_associated']