from rest_framework import serializers
from equipement.models import Equipement
from .models import Bill

class BillSerializer(serializers.ModelSerializer):
    equipement_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Bill
        fields = ('idbill', 'billfile', 'equipement_id')

    def create(self, validated_data):
        equipement_id = validated_data.pop('equipement_id')

        try:
            equipement = Equipement.objects.get(idequipement=equipement_id)
        except Equipement.DoesNotExist:
            raise serializers.ValidationError("Equipement not found")

        # Ensure 'equipement' is not passed here, causing a conflict
        bill = Bill.objects.create(equipement=equipement, **validated_data)
        return bill
