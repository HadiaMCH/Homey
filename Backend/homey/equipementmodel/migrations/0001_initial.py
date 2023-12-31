# Generated by Django 4.2.5 on 2023-09-10 19:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='EquipementModel',
            fields=[
                ('idequipementmodel', models.AutoField(primary_key=True, serialize=False)),
                ('type', models.CharField(max_length=255)),
                ('make', models.CharField(max_length=255)),
                ('model', models.CharField(max_length=255)),
                ('usagepatterns', models.TextField()),
                ('locations', models.TextField()),
                ('manualfile', models.FileField(upload_to='manuals/')),
            ],
            options={
                'verbose_name_plural': 'Equipement Models',
            },
        ),
    ]
