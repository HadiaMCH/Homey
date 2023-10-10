from django.db import models
from authentication.models import CustomUser

class Feedback(models.Model):
    text = models.TextField()
    is_selected = models.BooleanField(default=False)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE,null=True)

    def __str__(self):
       return f"Feedback by {self.author.username}"
