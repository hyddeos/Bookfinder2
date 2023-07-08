from django.contrib import admin
from bfapp.models import (
    Book,
    Genre,
    Publisher,
    UserBook,
    UserList,
    AccessToken,
)


# Register your models here.
admin.site.register(Book)
admin.site.register(Genre)
admin.site.register(Publisher)
admin.site.register(UserBook)
admin.site.register(UserList)
admin.site.register(AccessToken)
