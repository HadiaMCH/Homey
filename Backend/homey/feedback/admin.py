# feedback/admin.py
from django.contrib import admin
from .models import Feedback

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('id', 'text', 'is_selected', 'author')
    list_filter = ('is_selected',)
    search_fields = ('text', 'author__username')
    list_per_page = 20
