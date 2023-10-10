from django.contrib import admin
from .models import EquipementModel

class EquipementAdmin(admin.ModelAdmin):
    list_display = ('idequipementmodel', 'type', 'make', 'model', 'usagepatterns', 'locations')
    list_filter = ('type', 'make', 'model')
    search_fields = ('type', 'make', 'model', 'usagepatterns', 'locations')

admin.site.register(EquipementModel, EquipementAdmin)