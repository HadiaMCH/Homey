# Generated by Django 4.2.5 on 2023-09-11 20:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commentmodel', '0001_initial'),
        ('equipementmodel', '0002_equipementmodel_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='equipementmodel',
            name='comments',
            field=models.ManyToManyField(blank=True, related_name='equipment_models', to='commentmodel.comment'),
        ),
    ]