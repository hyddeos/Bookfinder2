import json
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.tokens import default_token_generator


# Own functions
from bfapp.assets.bookbeat_scraper import get_books
from bfapp.assets.load_from_db import load_sample_books
from bfapp.assets.load_from_db import load_filterd_books

import asyncio


# Models
from bfapp.models import AccessToken, UserBook, UserList, Publisher, Book


# Create your views here.
def index(request):
    csrf_token = get_token(request)
    response_data = {
        "csrftoken": csrf_token,
        "message": "Welcome, but there is nothing to see here except a token",
    }
    return HttpResponse(json.dumps(response_data), content_type="application/json")


@csrf_exempt
def handle_login(request):
    if request.method == "POST":
        try:
            csrf_token = request.META.get("HTTP_X_CSRFTOKEN")
            if not csrf_token:
                return JsonResponse({"message": "CSRF token not provided"}, status=403)

            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)
                try:
                    user_has_access_token = AccessToken.objects.get(user=user)
                    user_has_access_token.access_token = access_token
                    user_has_access_token.save()
                except AccessToken.DoesNotExist:
                    user_first_time = AccessToken(user=user, access_token=access_token)
                    user_first_time.save()

                print("--Login successful--")
                return JsonResponse(
                    {
                        "access_token": access_token,
                        "refresh_token": refresh_token,
                        "message": "Login successful",
                    }
                )
            else:  # Invalid credentials
                return JsonResponse({"message": "Invalid credentials"})
        except json.JSONDecodeError:
            return JsonResponse({"message": "Invalid JSON data"}, status=400)
    else:
        return JsonResponse({"message": "Method not allowed"}, status=405)


@csrf_exempt
def handle_logout(request):
    logout(request)
    print("--Logout successful--")
    return JsonResponse({"message": "Logout successful"})


# Update the books from the book services
@csrf_exempt
def update_books(request):
    if request.method == "POST":
        csrf_token = request.META.get("HTTP_X_CSRFTOKEN")
        if not csrf_token:
            return JsonResponse({"message": "CSRF token not provided"}, status=403)
        access_token = request.META.get("HTTP_AUTHORIZATION", "").split(" ")[1]
        try:
            token_user = AccessToken.objects.get(access_token=access_token).user
            if token_user.username == "hydde":  # Fix usergroup for this
                print("--Starting update--")
                # Run get_books() in the background using asyncio
                # get_books()
                print("--UPDATE STARTED--")
                context = {
                    "message": "updating books started, check back later",
                }
                return JsonResponse(context, safe=False)
        except AccessToken.DoesNotExist:
            return HttpResponse("Unauthorized", status=401)

        return HttpResponse("Invalid token", status=401)

    else:
        return JsonResponse({"message": "Method not allowed"}, status=405)


@csrf_exempt
def sample_books(request):
    sample = load_sample_books()
    return sample


# Shows books, user list and advance filtering
@csrf_exempt
def browselist(request):
    if request.method == "POST":
        search_terms = dict()

        data = json.loads(request.body)
        list_type = data.get("list")
        if not list_type:
            list_type = "undesided"

        page_number = request.GET.get("page")
        if not page_number:
            page_number = 1

        access_token = request.META.get("HTTP_ACCESSTOKEN")
        if access_token:
            try:
                auth_token_object = AccessToken.objects.get(access_token=access_token)
                user = auth_token_object.user
            except AccessToken.DoesNotExist:
                pass
            if user.is_authenticated:
                books_data = load_filterd_books(
                    user, page_number, search_terms, list_type
                )
                pages = books_data["pages"]
                books = books_data["books"]
                total_books = books_data["total_nr"]
                books = json.loads(books)
                context = {
                    "books": books,
                    "total_books": total_books,
                    "pages": pages,
                }
                return JsonResponse(context, safe=False)

        else:
            user = None
            books_data = load_filterd_books(user, page_number, search_terms, list_type)
            pages = books_data["pages"]
            books = books_data["books"]
            total_books = books_data["total_nr"]
            books = json.loads(books)
            context = {
                "books": books,
                "total_books": total_books,
                "pages": pages,
            }
            return JsonResponse(context, safe=False)


@csrf_exempt
def handle_book_action(request):
    if request.method == "PUT":
        access_token = request.META.get("HTTP_ACCESSTOKEN")
        if access_token:
            try:
                auth_token_object = AccessToken.objects.get(access_token=access_token)
                user = auth_token_object.user
            except AccessToken.DoesNotExist:
                pass

        if user.is_authenticated:
            data = json.loads(request.body.decode("utf-8"))
            book = Book.objects.get(pk=data["key"])

            user_list, created = UserList.objects.get_or_create(user=user)
            want_to_read = user_list.want_to_read.all()
            maybe_to_read = user_list.maybe_to_read.all()
            wont_read = user_list.wont_read.all()

            if data["readList"] == "read":
                if book in want_to_read:
                    user_list.want_to_read.remove(book)
                else:
                    user_list.want_to_read.add(book)
                user_list.maybe_to_read.remove(book)
                user_list.wont_read.remove(book)
            elif data["readList"] == "maybe":
                if book in maybe_to_read:
                    user_list.maybe_to_read.remove(book)
                else:
                    user_list.maybe_to_read.add(book)
                user_list.want_to_read.remove(book)
                user_list.wont_read.remove(book)
            elif data["readList"] == "not":
                if book in wont_read:
                    user_list.wont_read.remove(book)
                else:
                    user_list.wont_read.add(book)
                user_list.maybe_to_read.remove(book)
                user_list.want_to_read.remove(book)

            status = {
                "status": 200,
            }
            return JsonResponse(status)
        else:
            return HttpResponse("Unauthorized", status=401)
