from django.contrib import admin
from .models import CustomUser

class CustomUserAdmin(admin.ModelAdmin):
    model = CustomUser
    list_display = ('username', 'email', 'date_naissance', 'address', 'role', 'is_active', 'date_joined')
    list_filter = ('is_active', 'date_joined')
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password', 'date_naissance', 'address', 'role')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'date_naissance', 'address', 'role'),
        }),
    )

admin.site.register(CustomUser, CustomUserAdmin)
