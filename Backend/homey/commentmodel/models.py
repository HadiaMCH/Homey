from django.db import models
from authentication.models import CustomUser
from equipementmodel.models import EquipementModel

class Comment(models.Model):
    text = models.TextField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE,null=True)    
    # Set a custom related_name to avoid conflicts
    equipment_model = models.ForeignKey(EquipementModel, on_delete=models.CASCADE, related_name='comments',null=True)

    def __str__(self):
        return f"Comment by {self.user.username}"
