from django.db import models
from equipement.models import Equipement

class Failure(models.Model):
    idfailure = models.AutoField(primary_key=True)
    failuredate = models.DateField()
    failurecause = models.TextField()
    equipement = models.ForeignKey(Equipement, on_delete=models.CASCADE, related_name='failures')

    def __str__(self):
        return f"Failure on {self.failuredate} for {self.equipement}"
