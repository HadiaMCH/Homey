# Generated by Django 4.2.5 on 2023-09-14 22:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0002_alter_feedback_author'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='feedback',
            name='author',
        ),
    ]
