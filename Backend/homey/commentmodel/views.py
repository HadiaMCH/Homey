from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Comment
from .serializers import CommentAddSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

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
        
class CommentCreateView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request, *args, **kwargs):
        user = extract_user_from_token(request)

        if user:
            request.data['user'] = user.pk  # Add the user ID to the request data
            serializer = CommentAddSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save(user=user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            raise AuthenticationFailed('User not found for the given token.')
