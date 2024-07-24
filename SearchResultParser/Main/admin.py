from django.contrib import admin
from .models import  Result

class ResultAdmin(admin.ModelAdmin):
    list_display = ('user', 'file', 'time_created')
    list_display_links = ('user',)

admin.site.register(Result, ResultAdmin)