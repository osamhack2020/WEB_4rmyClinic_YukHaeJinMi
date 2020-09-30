from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .forms import UserChangeForm, UserCreationForm
from .models import User, Post, Comment, Tag


class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ('email', 'division', 'rank', 'is_admin')
    list_filter = ('is_admin',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('division', 'rank')}),
        ('Permissions', {'fields': ('is_admin',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'division','rank', 'password1', 'password2')}
         ),
    )
    search_fields = ('email','division','rank')
    ordering = ('division', 'rank','email',)
    filter_horizontal = ()


admin.site.register(User, UserAdmin)
admin.site.register([Post, Comment, Tag])
admin.site.unregister(Group)