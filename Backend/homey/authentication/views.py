from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser
from .serializers import CustomUserSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import login
from rest_framework import generics
from django.db import transaction
from django.db.utils import IntegrityError
from django.contrib.auth import authenticate, get_user_model
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAdminUser

class UserList(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]

from rest_framework import status
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import AllowAny
from django.contrib.auth.hashers import make_password

class UserRegistration(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        # Check if the provided email or username already exists
        email = request.data.get("email")
        username = request.data.get("username")
        if CustomUser.objects.filter(email=email).exists() or CustomUser.objects.filter(username=username).exists():
            return Response({"message": "User with this email or username already exists."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Hash the password before saving
            password = make_password(request.data.get("password"))
            serializer.validated_data["password"] = password

            # Save the user object
            user = serializer.save()

            # Return a success response
            return Response({
                "user_id": user.id,
                "message": "User registered successfully"
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetUserByEmail(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    lookup_field = 'email'

    def get_object(self):
        email = self.kwargs['email']
        return CustomUser.objects.get(email=email)

class Login(APIView):
    
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        try:
            user = get_user_model().objects.get(email=email)
        except get_user_model().DoesNotExist:
            user = None

        if user and user.check_password(password):
            token, _ = Token.objects.get_or_create(user=user)
            response_data = {
                "token": token.key,
                "role": user.role if hasattr(user, 'role') else None  # Assuming 'role' is an attribute in your User model
            }
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Wrong Credentials"})


class DeleteAllUsers(generics.GenericAPIView):
    permission_classes = [IsAdminUser]

    def delete(self, request):
        # Delete all users
        CustomUser.objects.all().delete()
        return Response({"message": "All users have been deleted."}, status=status.HTTP_204_NO_CONTENT)

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class Logout(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.auth.delete()
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import AnonymousUser

class GetUserInfos(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Récupérer l'utilisateur à partir du token
        user = request.user

        # Vérifier si l'utilisateur est authentifié
        if isinstance(user, AnonymousUser):
            return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

        # Vous pouvez maintenant utiliser 'user' pour obtenir les informations de l'utilisateur
        user_info = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "date_naissance": user.date_naissance,
            "address": user.address,
        }

        return Response(user_info, status=status.HTTP_200_OK)

class UpdateUserProfile(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user

        # Mettez à jour les champs de l'utilisateur avec les nouvelles données
        user.username = request.data.get('username', user.username)
        user.email = request.data.get('email', user.email)
        user.address = request.data.get('address', user.address)
        user.date_naissance = request.data.get('date_naissance', user.date_naissance)  # Correction
        user.role = request.data.get('role', user.role)  # Correction

        # Enregistrez les modifications
        user.save()

        return Response({"message": "User information updated successfully."}, status=status.HTTP_200_OK)

   