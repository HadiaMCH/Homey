from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Bill
from .serializers import BillSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from equipement.models import Equipement
from rest_framework.authentication import TokenAuthentication

class BillCreateView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request, *args, **kwargs):
        equipement_id = request.data.get('equipement_id')

        try:
            equipement = Equipement.objects.get(idequipement=equipement_id)
        except Equipement.DoesNotExist:
            return Response({"error": "Equipement not found"}, status=status.HTTP_404_NOT_FOUND)

        # Create a new Bill instance associated with the Equipement
        bill = Bill.objects.create(equipement=equipement, billfile=request.data.get('billfile'))

        # Serialize the created Bill instance
        serializer = BillSerializer(bill)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
