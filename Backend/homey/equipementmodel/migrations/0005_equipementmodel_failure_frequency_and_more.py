# Generated by Django 4.2.5 on 2023-09-17 14:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('equipementmodel', '0004_remove_equipementmodel_comments_equipementmodel_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='equipementmodel',
            name='failure_frequency',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='equipementmodel',
            name='locations',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='equipementmodel',
            name='make',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='equipementmodel',
            name='model',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='equipementmodel',
            name='type',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='equipementmodel',
            name='usagepatterns',
            field=models.TextField(default=''),
        ),
    ]
