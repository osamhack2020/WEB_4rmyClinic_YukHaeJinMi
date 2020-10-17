from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .forms import UserChangeForm, UserCreationForm
from .models import User, Post, Comment, Tag, Counsel, Chat
from api.models import Image

class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ('email', 'nickname', 'imgUri', 'bio', 'division', 'rank', 'is_admin', 'is_counselor')
    list_filter = ('is_admin','is_counselor')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('nickname', 'bio', 'imgUri', 'division', 'rank')}),
        ('Permissions', {'fields': ('is_admin','is_counselor')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'division','rank', 'password1', 'password2')}
         ),
    )
    search_fields = ('email','nickname', 'division','rank')
    ordering = ('email', 'nickname', 'division', 'rank','email',)
    filter_horizontal = ()


admin.site.register(User, UserAdmin)
admin.site.register([Post, Comment, Tag, Counsel, Chat])
admin.site.register(Image)
admin.site.unregister(Group)