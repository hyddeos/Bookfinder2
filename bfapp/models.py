from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

User = get_user_model()


class AccessToken(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    access_token = models.CharField(max_length=255)

    def __str__(self):
        return self.access_token


class UserList(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    want_to_read = models.ManyToManyField(
        "Book", blank=True, related_name="want_to_read_book"
    )
    maybe_to_read = models.ManyToManyField(
        "Book", blank=True, related_name="maybe_to_read_book"
    )
    wont_read = models.ManyToManyField(
        "Book", related_name="wont_read_book", blank=True
    )

    def books_on_all_lists(self):
        book_ids = []
        book_ids.extend(self.want_to_read.values_list("id", flat=True))
        book_ids.extend(self.maybe_to_read.values_list("id", flat=True))
        book_ids.extend(self.wont_read.values_list("id", flat=True))
        return book_ids

    def want_to_read_ids(self):
        return self.want_to_read.values_list("id", flat=True)

    def maybe_to_read_ids(self):
        return self.maybe_to_read.values_list("id", flat=True)

    def wont_read_ids(self):
        return self.wont_read.values_list("id", flat=True)


class UserBook(models.Model):
    user = models.ForeignKey(
        User, verbose_name=("User Added Book"), on_delete=models.CASCADE
    )
    title = models.CharField(max_length=64)
    author = models.CharField(max_length=64)
    status = models.CharField(
        max_length=32,
        blank=True,
    )
    rating = models.DecimalField(blank=True, decimal_places=2, max_digits=4)
    publisher = models.ForeignKey("Publisher", on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.pk}, {self.title}"


class Publisher(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self) -> str:
        return f"{self.pk}, {self.name}"

    def natural_key(self):
        return (self.name,)


class Genre(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self) -> str:
        return f"{self.pk}, {self.name}"

    def natural_key(self):
        return self.name + " "


class Book(models.Model):
    source = models.CharField(max_length=32, blank=True)
    title = models.CharField(max_length=64)
    author = models.CharField(max_length=64)
    cover = models.CharField(max_length=200, blank=True)
    url = models.CharField(max_length=200, blank=True)
    summary = models.CharField(max_length=1500, blank=True)
    source_published = models.DateTimeField(blank=True, null=True)
    published = models.DateTimeField(null=True, blank=True)
    publisher = models.ForeignKey(
        "Publisher", on_delete=models.CASCADE, blank=True, null=True
    )
    genres = models.ManyToManyField(Genre, blank=True)

    def __str__(self) -> str:
        return f"{self.pk}, {self.title}, {self.author}"
