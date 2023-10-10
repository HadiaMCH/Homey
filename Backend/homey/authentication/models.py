from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, date_naissance=None, address=None, role=None):
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, date_naissance=date_naissance, address=address, role=role)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, date_naissance=None, address=None, role=None):
        # Create a regular user first
        user = self.create_user(username, email, password, date_naissance, address, role)
        # Set the user as a superuser
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    ROLES = (
        ('admin', 'Admin'),
        ('data_provider', 'Data Provider'),
        ('prop_owner', 'Property Owner'),
    )

    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    date_naissance = models.DateField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    role = models.CharField(max_length=20, choices=ROLES, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    
    # Add the is_staff field for admin access
    is_staff = models.BooleanField(default=False)
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username
