from django.urls import path
from .views import EquipmentListView,AddEquipmentView
from .views import DeleteEquipmentView
from . import views

urlpatterns = [
    # Other URLs
    path('equipement-list/', EquipmentListView.as_view(), name='user-equipement-list'),
    path('add/', AddEquipmentView.as_view(), name='add_equipment'),
    path('delete-equipment/', DeleteEquipmentView.as_view(), name='delete-equipment'),
    path('shared-info/<int:equipement_id>/', views.shared_info),
    path('share-add/', views.EquipementShareView.as_view(), name='equipement_share'),

]