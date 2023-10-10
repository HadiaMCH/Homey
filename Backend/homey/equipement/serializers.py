from rest_framework import serializers
from .models import Equipement
from equipementmodel.serializers import EquipementModelSerializer
from failure.serializers import FailureSerializer
from bill.serializers import BillSerializer
from commentequipement.serializers import CommentEquipementListSerializer
from equipementmodel.models import EquipementModel
from rest_framework import serializers

class EquipmentModelSerializer(serializers.Serializer):
    idequipementmodel = serializers.IntegerField()
    type = serializers.CharField()
    make = serializers.CharField()
    model = serializers.CharField()
    usagepatterns = serializers.CharField()
    locations = serializers.CharField()
    manualfile = serializers.CharField()
    image = serializers.CharField()
    failure_frequency = serializers.CharField()
    user = serializers.EmailField()

class EquipmentDetailSerializer(serializers.Serializer):
    idequipement = serializers.IntegerField()
    user = serializers.CharField()
    name = serializers.CharField()
    equipementmodel = EquipmentModelSerializer()
    serialnumber = serializers.CharField()
    garantie = serializers.CharField()
    dateinstallation = serializers.DateField()
    datelastmaintenance = serializers.DateField()
    currenthealth = serializers.CharField()
    failurestate = serializers.CharField()
    failurerisk = serializers.IntegerField()
    countdowndate = serializers.IntegerField()
    image = serializers.CharField()
    comments = CommentEquipementListSerializer(many=True, read_only=True)
    bills = BillSerializer(many=True, read_only=True)
    failurehistory = FailureSerializer(many=True, read_only=True)

class AddEquipmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Equipement
        fields = '__all__'

    def create(self, validated_data):

        equipment = Equipement.objects.create(**validated_data)

        return equipment


from rest_framework import serializers

class DeleteEquipmentSerializer(serializers.Serializer):
    equipement_id = serializers.IntegerField()


from rest_framework import serializers
from django.contrib.auth import get_user_model
from equipement.models import Equipement

class SharedWithSerializer(serializers.ModelSerializer):
    shared_with_users = serializers.PrimaryKeyRelatedField(many=True, queryset=Equipement.objects.all())

    class Meta:
        model = Equipement
        fields = ['shared_with_users']

from rest_framework import serializers

class EquipementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipement
        fields = '__all__'
