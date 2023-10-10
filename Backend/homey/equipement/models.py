from django.db import models
from django.contrib.auth import get_user_model
from equipementmodel.models import EquipementModel

class Equipement(models.Model):
    HEALTHS = (
        ('warning', 'Warning'),
        ('good', 'Good'),
        ('critical', 'Critical'),
    )

    STATES = (
        ('red', 'Red'),
        ('orange', 'Orange'),
        ('green', 'Green'),
    )

    idequipement = models.AutoField(primary_key=True)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='equipment_user', null=True)
    equipementmodel = models.ForeignKey(EquipementModel, on_delete=models.CASCADE, related_name='equipment_model', null=True)  
    serialnumber = models.CharField(max_length=255, null=True)
    garantie = models.CharField(max_length=255, null=True)
    name = models.CharField(max_length=255, null=True)
    dateinstallation = models.DateField(blank=True, null=True)
    datelastmaintenance = models.DateField(blank=True, null=True)
    currenthealth = models.CharField(max_length=20, choices=HEALTHS, blank=True, null=True)

    failurestate = models.CharField(max_length=20, choices=STATES, blank=True, null=True)
    failurerisk = models.IntegerField(blank=True, null=True)
    countdowndate = models.IntegerField(blank=True, null=True)

    image = models.ImageField(upload_to='equipement_images/', default='default_image.jpg')
    
    shared_with_users = models.ManyToManyField(get_user_model(), related_name='equipements_shared_with', blank=True)

    def __str__(self):
        return f"Equipement {self.idequipement}"

    class Meta:
        verbose_name_plural = 'Equipements'
