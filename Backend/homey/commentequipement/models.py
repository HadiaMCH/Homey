from django.db import models
from authentication.models import CustomUser
from equipement.models import Equipement

class CommentEquipement(models.Model):
    text = models.TextField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)    
    equipement_associated = models.ForeignKey(Equipement, on_delete=models.CASCADE, related_name='comments_on_equipement', null=True)

    def __str__(self):
        return f"Comment on {self.equipement_associated}"
