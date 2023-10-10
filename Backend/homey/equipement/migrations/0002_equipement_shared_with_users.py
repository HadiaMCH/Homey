# Generated by Django 4.2.5 on 2023-09-17 14:03

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('equipement', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='equipement',
            name='shared_with_users',
            field=models.ManyToManyField(related_name='equipements_shared_with', to=settings.AUTH_USER_MODEL),
        ),
    ]
