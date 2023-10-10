from rest_framework import serializers
from .models import EquipementModel
from commentmodel.serializers import CommentSerializer

class EquipementModelSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField()

    class Meta:
        model = EquipementModel
        fields = '__all__'

    def get_comments(self, obj):
        comments_queryset = obj.comments.all()
        return CommentSerializer(comments_queryset, many=True).data
