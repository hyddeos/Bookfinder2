from bfapp.models import Book, Genre, Publisher
from datetime import datetime


def save_book(book, service):
    if service == "bookbeat":
        bookbeat_save(book, service)


def bookbeat_save(book, service):
    counter = 0

    this_book = Book.objects.filter(title=book["title"])
    if not this_book.exists():  # Then Save the book
        new_book = Book(
            source=service,
            title=book["title"][:64],
            author=book["author"][:64],
            url=book["url"],
            cover=book["cover"],
            published=datetime.strptime(book["published"], "%Y-%m-%d"),
            source_published=datetime.strptime(book["source_published"], "%Y-%m-%d"),
            summary=book["summary"][:1500],  # Just take the first 1500chars
        )
        new_book.save()

        # Add genres
        for genre in book["genres"]:
            this_genre = Genre.objects.filter(name=genre).first()
            if not this_genre:
                this_genre = Genre.objects.create(name=genre)
            new_book.genres.add(this_genre)

        this_publisher = Publisher.objects.filter(name=book["publisher"])
        if not this_publisher:
            new_publisher = Publisher(name=book["publisher"])
            new_publisher.save()
            this_publisher = new_publisher

        new_book.publisher = Publisher.objects.get(name=book["publisher"])
        new_book.save()
        counter = counter + 1
