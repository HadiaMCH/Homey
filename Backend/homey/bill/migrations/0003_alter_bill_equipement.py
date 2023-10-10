# Generated by Django 4.2.5 on 2023-09-18 01:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('equipement', '0002_equipement_shared_with_users'),
        ('bill', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bill',
            name='equipement',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='billsequipement', to='equipement.equipement'),
        ),
    ]
