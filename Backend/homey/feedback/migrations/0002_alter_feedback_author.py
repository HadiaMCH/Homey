# Generated by Django 4.2.5 on 2023-09-12 00:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
        ('feedback', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedback',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='authentication.customuser'),
        ),
    ]
