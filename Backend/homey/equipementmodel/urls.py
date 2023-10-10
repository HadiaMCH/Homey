from django.urls import path
from .views import EquipementModelListView,EquipementModelCreateView

urlpatterns = [
    path('getequipementmodellist/', EquipementModelListView.as_view(), name='getequipementmodellist'),
    path('equipement_model/create/', EquipementModelCreateView.as_view(), name='equipement_model_create'),
]
