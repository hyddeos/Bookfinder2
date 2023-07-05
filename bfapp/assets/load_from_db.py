from bfapp.models import Book, Genre, User, UserBook, UserList, Publisher
from django.core import serializers
from django.core.paginator import Paginator
from django.db.models import Q
from django.http import JsonResponse


def load_books(user, page_number, list_type):
    books_per_page = 50
    book_ids = []
    total_books = 0
    if list_type == "undesided":
        user_lists = UserList.objects.filter(user=user)
        for user_list in user_lists:
            book_ids.extend(user_list.books_on_all_lists())
        queryset = Book.objects.all().prefetch_related("publisher")
        queryset = queryset.exclude(id__in=book_ids)
        total_books = len(queryset)
        paginator = Paginator(queryset, books_per_page)

    elif list_type == "want_to_read":
        user_lists = UserList.objects.filter(user=user)
        for user_list in user_lists:
            book_ids.extend(user_list.want_to_read_ids())
        queryset = Book.objects.filter(id__in=book_ids).prefetch_related("publisher")
        total_books = len(queryset)
        paginator = Paginator(queryset, books_per_page)

    elif list_type == "maybe_to_read":
        user_lists = UserList.objects.filter(user=user)
        for user_list in user_lists:
            book_ids.extend(user_list.maybe_to_read_ids())
        queryset = Book.objects.filter(id__in=book_ids).prefetch_related("publisher")
        total_books = len(queryset)
        paginator = Paginator(queryset, books_per_page)

    elif list_type == "not_to_read":
        user_lists = UserList.objects.filter(user=user)
        for user_list in user_lists:
            book_ids.extend(user_list.wont_read_ids())
        queryset = Book.objects.filter(id__in=book_ids).prefetch_related("publisher")
        total_books = len(queryset)
        paginator = Paginator(queryset, books_per_page)

    page = paginator.get_page(page_number)
    books = page.object_list

    previous_page_number = 0
    if page.has_previous():
        previous_page_number = page.previous_page_number()
    next_page_number = 0
    if page.has_next():
        next_page_number = page.next_page_number()
    pages = {
        "total_pages": paginator.num_pages,
        "previous_page_number": previous_page_number,
        "next_page_number": next_page_number,
        "has_next_page": page.has_next(),
        "has_previous_page": page.has_previous(),
        "current_page": page_number,
    }
    serialized_books = serializers.serialize(
        "json", books, use_natural_foreign_keys=True
    )
    return {"books": serialized_books, "pages": pages, "total_nr": total_books}


def load_sample_books():
    sample_book_ids = [1, 2, 3, 3, 5, 6]
    books = (
        Book.objects.filter(id__in=sample_book_ids)
        .prefetch_related("publisher")
        .order_by("?")
    )
    serialized_books = serializers.serialize(
        "json", books, use_natural_foreign_keys=True
    )
    return JsonResponse({"books": serialized_books})


def load_filterd_books(user, page_number, search_terms):
    books_per_page = 50
    book_ids = []
    total_books = 0
    include_publishers = search_terms.get("include_publisher", [])
    exclude_publishers = search_terms.get("exclude_publisher", [])
    included_publisher_ids = Publisher.objects.filter(
        name__in=include_publishers
    ).values_list("id", flat=True)

    if user:
        user_lists = UserList.objects.filter(user=user)
        for user_list in user_lists:
            book_ids.extend(user_list.books_on_all_lists())
        queryset = Book.objects.all().prefetch_related("publisher")
        queryset = queryset.exclude(id__in=book_ids)
        q_filter = Q()
        if include_publishers:
            q_filter &= Q(publisher__name__in=include_publishers)
        if exclude_publishers:
            q_filter &= ~Q(publisher__name__in=exclude_publishers)

        queryset = queryset.filter(q_filter)
        total_books = len(queryset)
        paginator = Paginator(queryset, books_per_page)

        page = paginator.get_page(page_number)
        books = page.object_list

        previous_page_number = 0
        if page.has_previous():
            previous_page_number = page.previous_page_number()
        next_page_number = 0
        if page.has_next():
            next_page_number = page.next_page_number()
        pages = {
            "total_pages": paginator.num_pages,
            "previous_page_number": previous_page_number,
            "next_page_number": next_page_number,
            "has_next_page": page.has_next(),
            "has_previous_page": page.has_previous(),
            "current_page": page_number,
        }
        serialized_books = serializers.serialize(
            "json", books, use_natural_foreign_keys=True
        )
        return {"books": serialized_books, "pages": pages, "total_nr": total_books}
    else:  # Not user
        queryset = Book.objects.all().prefetch_related("publisher")
        q_filter = Q()
        if include_publishers:
            q_filter &= Q(publisher__name__in=include_publishers)
        if exclude_publishers:
            q_filter &= ~Q(publisher__name__in=exclude_publishers)

        queryset = queryset.filter(q_filter)
        total_books = len(queryset)
        paginator = Paginator(queryset, books_per_page)

        page = paginator.get_page(page_number)
        books = page.object_list

        previous_page_number = 0
        if page.has_previous():
            previous_page_number = page.previous_page_number()
        next_page_number = 0
        if page.has_next():
            next_page_number = page.next_page_number()
        pages = {
            "total_pages": paginator.num_pages,
            "previous_page_number": previous_page_number,
            "next_page_number": next_page_number,
            "has_next_page": page.has_next(),
            "has_previous_page": page.has_previous(),
            "current_page": page_number,
        }
        serialized_books = serializers.serialize(
            "json", books, use_natural_foreign_keys=True
        )
        return {"books": serialized_books, "pages": pages, "total_nr": total_books}
