from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CommentEquipement
from .serializers import CommentEquipementSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from equipement.models import Equipement

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


class CommentEquipementCreateView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        data = request.data
        equipement_id = data.get('equipement_associated')
        text = data.get('text')

        # Assuming you have a function to extract the user from the token
        user = extract_user_from_token(request)

        if not user:
            return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            equipement = Equipement.objects.get(idequipement=equipement_id)
        except Equipement.DoesNotExist:
            return Response({"error": "Invalid equipement_associated ID."}, status=status.HTTP_400_BAD_REQUEST)

        comment_data = {
            'text': text,
            'user': user.id,
            'equipement_associated': equipement_id
        }

        serializer = CommentEquipementSerializer(data=comment_data)
        if serializer.is_valid():
            serializer.save()
            return Response({
            'text': text,
            'user_username': user.username,
        }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
