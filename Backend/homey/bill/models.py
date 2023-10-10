from django.db import models
from equipement.models import Equipement


class Bill(models.Model):
    idbill = models.AutoField(primary_key=True)
    billfile = models.FileField(upload_to='bills/')
    equipement = models.ForeignKey(Equipement, on_delete=models.CASCADE, related_name='billsequipement')

    def __str__(self):
        return f'Bill #{self.idbill}'
 