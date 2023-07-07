from django.urls import path
from . import views

urlpatterns = [
    path("", views.index),
    path("updateservices", views.update_books),
    path("login", views.handle_login),
    path("logout", views.handle_logout),
    path("samplebooks", views.sample_books),
    path("browse", views.browselist),
    path("bookaction", views.handle_book_action),
]
