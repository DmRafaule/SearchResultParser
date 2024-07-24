from django.db import models

class Result(models.Model):
    user = models.CharField(max_length=120)
    file = models.FileField()
    time_created = models.DateTimeField(auto_created=True)

    def _str_(self):
        return f'{self.user}__{self.file.name}'

