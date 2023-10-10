from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Equipement
from rest_framework.parsers import JSONParser
import json

# Function to extract user from the token
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User


def extract_user_from_token(request):
    auth_header = request.META.get('HTTP_AUTHORIZATION', '')
    if not auth_header:
        raise AuthenticationFailed('Authorization header is missing')

    parts = auth_header.split(' ')
    if len(parts) != 2 or parts[0].lower() != 'token':
        raise AuthenticationFailed('Invalid token header format')

    token = parts[1]
    
    try:
        token_obj = Token.objects.get(key=token)
        user = token_obj.user
        return user
    except Token.DoesNotExist:
        return None


from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Equipement
from .serializers import AddEquipmentSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from datetime import datetime

class AddEquipmentView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        # Extract the user from the token
        user = extract_user_from_token(request)

        if user:
            serializer = AddEquipmentSerializer(data=request.data)
            if serializer.is_valid():
                # Create a new equipment instance
                equipment = Equipement(
                    name=serializer.validated_data['name'],
                    equipementmodel=serializer.validated_data['equipementmodel'],
                    image=serializer.validated_data['image'],
                    serialnumber=serializer.validated_data['serialnumber'],
                    dateinstallation=serializer.validated_data['dateinstallation'],
                    datelastmaintenance=serializer.validated_data['datelastmaintenance'],
                    currenthealth=serializer.validated_data['currenthealth'],
                    garantie=serializer.validated_data['garantie'],
                    user=user
                )
                equipment.save()
                return Response({"message": "Equipment and related data added successfully"}, status=status.HTTP_201_CREATED)

            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        else:
            return Response({'detail': 'Invalid token.'}, status=status.HTTP_401_UNAUTHORIZED)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.parsers import JSONParser
from .models import Equipement
from .serializers import EquipmentDetailSerializer
from commentequipement.models import CommentEquipement
from bill.models import Bill
from failure.models import Failure
from failure.serializers import FailureSerializer
from bill.serializers import BillSerializer
from commentequipement.serializers import CommentEquipementListSerializer

class EquipmentListView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request, *args, **kwargs):
        user = extract_user_from_token(request)

        if user:
            # Get the user's equipment list
            equipements = Equipement.objects.filter(user=user)
            shared_equipments = Equipement.objects.filter(shared_with_users=user)

            # Serialize the equipment details
            equipment_data = []
            for equipement in equipements:
                equipement_model = equipement.equipementmodel

                # Fetch comments for this equipment
                comments = CommentEquipement.objects.filter(equipement_associated=equipement)
                comment_data = CommentEquipementListSerializer(comments, many=True).data

                # Fetch bills for this equipment
                bills = Bill.objects.filter(equipement=equipement)
                bill_data = BillSerializer(bills, many=True).data

                # Fetch failures for this equipment
                failures = Failure.objects.filter(equipement=equipement)
                failure_data = FailureSerializer(failures, many=True).data

                # Serialize equipment details with associated data
                serializer_data = {
                    "idequipement": equipement.idequipement,
                    "user": "you",
                    "name": equipement.name,
                    "equipementmodel": {
                        "idequipementmodel": equipement_model.idequipementmodel,
                        "type": equipement_model.type,
                        "make": equipement_model.make,
                        "model": equipement_model.model,
                        "usagepatterns": equipement_model.usagepatterns,
                        "locations": equipement_model.locations,
                        "manualfile": equipement_model.manualfile.url if equipement_model.manualfile else None,
                        "image": equipement_model.image.url if equipement_model.image else None,
                        "failure_frequency": equipement_model.failure_frequency,
                        "user": equipement_model.user.email if equipement_model.user else None,
                    },
                    "serialnumber": equipement.serialnumber,
                    "garantie": equipement.garantie,
                    "dateinstallation": equipement.dateinstallation,
                    "datelastmaintenance": equipement.datelastmaintenance,
                    "currenthealth": equipement.currenthealth,
                    "failurestate": equipement.failurestate,
                    "failurerisk": equipement.failurerisk,
                    "countdowndate": equipement.countdowndate,
                    "image": equipement.image.url if equipement.image else None,
                    "comments": comment_data,
                    "bills": bill_data,
                    "failurehistory": failure_data,
                }

                equipment_data.append(serializer_data)

            for equipement in shared_equipments:
                equipement_model = equipement.equipementmodel

                # Fetch comments for this equipment
                comments = CommentEquipement.objects.filter(equipement_associated=equipement)
                comment_data = CommentEquipementListSerializer(comments, many=True).data

                # Fetch bills for this equipment
                bills = Bill.objects.filter(equipement=equipement)
                bill_data = BillSerializer(bills, many=True).data

                # Fetch failures for this equipment
                failures = Failure.objects.filter(equipement=equipement)
                failure_data = FailureSerializer(failures, many=True).data

                # Serialize equipment details with associated data
                serializer_data = {
                    "idequipement": equipement.idequipement,
                    "user": equipement.user.email,
                    "name": equipement.name,
                    "equipementmodel": {
                        "idequipementmodel": equipement_model.idequipementmodel,
                        "type": equipement_model.type,
                        "make": equipement_model.make,
                        "model": equipement_model.model,
                        "usagepatterns": equipement_model.usagepatterns,
                        "locations": equipement_model.locations,
                        "manualfile": equipement_model.manualfile.url if equipement_model.manualfile else None,
                        "image": equipement_model.image.url if equipement_model.image else None,
                        "failure_frequency": equipement_model.failure_frequency,
                        "user": equipement_model.user.email if equipement_model.user else None,
                    },
                    "serialnumber": equipement.serialnumber,
                    "garantie": equipement.garantie,
                    "dateinstallation": equipement.dateinstallation,
                    "datelastmaintenance": equipement.datelastmaintenance,
                    "currenthealth": equipement.currenthealth,
                    "failurestate": equipement.failurestate,
                    "failurerisk": equipement.failurerisk,
                    "countdowndate": equipement.countdowndate,
                    "image": equipement.image.url if equipement.image else None,
                    "comments": comment_data,
                    "bills": bill_data,
                    "failurehistory": failure_data,
                }

                equipment_data.append(serializer_data)

            return Response(equipment_data, status=status.HTTP_200_OK)

        return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import Equipement
from .serializers import DeleteEquipmentSerializer

class DeleteEquipmentView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        serializer = DeleteEquipmentSerializer(data=request.data)

        if serializer.is_valid():
            equipement_id = serializer.validated_data['equipement_id']

            try:
                equipment = Equipement.objects.get(idequipement=equipement_id)
            except Equipement.DoesNotExist:
                return Response({"error": "Equipment does not exist."}, status=status.HTTP_404_NOT_FOUND)

            # Check if the user has permission to delete this equipment
            if request.user != equipment.user:
                return Response({"error": "You don't have permission to delete this equipment."}, status=status.HTTP_403_FORBIDDEN)

            equipment.delete()
            return Response({"message": "Equipment deleted successfully."}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.response import Response
from .serializers import SharedWithSerializer

def shared_info(request, equipement_id):
    equipment = Equipement.objects.get(idequipement=equipement_id)

    shared_with_data = SharedWithSerializer(equipment.shared_with_users.all(), many=True).data

    response_data = {
        'equipement_id': equipment.idequipement,
        'shared_with_users': shared_with_data,
    }

    return Response(response_data)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .serializers import EquipementSerializer
from rest_framework.permissions import IsAuthenticated
from authentication.models import CustomUser

class EquipementShareView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        idequipement = request.data.get('idequipement')
        email = request.data.get('email')

        equipement = get_object_or_404(Equipement, pk=idequipement)

        # Assuming email is a valid email address
        user = CustomUser.objects.get(email=email)
        equipement.shared_with_users.add(user)
        equipement.save()

        serializer = EquipementSerializer(equipement)
        return Response(serializer.data, status=status.HTTP_200_OK)
