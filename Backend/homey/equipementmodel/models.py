from django.db import models
from django.contrib.auth import get_user_model

class EquipementModel(models.Model):
    idequipementmodel = models.AutoField(primary_key=True)
    type = models.CharField(max_length=255, default='')
    make = models.CharField(max_length=255, default='')
    model = models.CharField(max_length=255, default='')
    usagepatterns = models.TextField(default='')
    locations = models.TextField(default='')
    manualfile = models.FileField(upload_to='manuals/')
    image = models.ImageField(upload_to='equipement_images/', default='default_image.jpg')
    failure_frequency = models.CharField(max_length=255, default='')

    # Add a ForeignKey to reference the CustomUser model
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='equipment_models', null=True)

    def __str__(self):
        return self.type

    class Meta:
        verbose_name_plural = 'Equipement Models'
