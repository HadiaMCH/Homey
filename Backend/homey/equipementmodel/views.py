from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import EquipementModel
from .serializers import EquipementModelSerializer

class EquipementModelListView(APIView):

    def get(self, request):
        equipement_models = EquipementModel.objects.all()
        serializer = EquipementModelSerializer(equipement_models, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

import jwt
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import EquipementModel
from .serializers import EquipementModelSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

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

class EquipementModelCreateView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        # Extract the user from the token
        user = extract_user_from_token(request)

        if user:
            serializer = EquipementModelSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': 'Invalid token.'}, status=status.HTTP_401_UNAUTHORIZED)

