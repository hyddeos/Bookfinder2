import json
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib import messages
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model


# Own functions
from bfapp.assets.bookbeat_scraper import get_books
from bfapp.assets.load_from_db import load_books
from bfapp.assets.load_from_db import load_sample_books
from bfapp.assets.load_from_db import load_filterd_books

# Models
from bfapp.models import AccessToken, UserBook, UserList, Publisher, Book


# Create your views here.
def index(request):
    user = request.user
    page_number = request.GET.get("page")
    if not page_number:
        page_number = 1

    if user.is_authenticated:
        list_type = "undesided"
        books_data = load_books(user, page_number, list_type)
        pages = books_data["pages"]
        books = books_data["books"]
        total_books = books_data["total_nr"]
        books = json.loads(books)
        context = {
            "books": books,
            "total_books": total_books,
            "pages": pages,
        }
        serialized_data = json.dumps(context)
        csrf_token = get_token(request)

        response_data = {
            "serialized_data": serialized_data,
            "csrftoken": csrf_token,
        }
        return HttpResponse(json.dumps(response_data), content_type="application/json")
    else:  # I.E User NOT logged in, welcome screen
        # sample_books = load_sample_books()
        # sample_books = json.loads(sample_books["books"])
        # context = {"books": sample_books}
        # serialized_data = json.dumps(context)
        csrf_token = get_token(request)

        response_data = {
            # "serialized_data": serialized_data,
            "csrftoken": csrf_token,
        }
        return HttpResponse(json.dumps(response_data), content_type="application/json")


@csrf_exempt
def handle_login(request):
    if request.method == "POST":
        try:
            csrf_token = request.META.get("HTTP_X_CSRFTOKEN")
            if not csrf_token:
                return JsonResponse({"message": "CSRF token not provided"}, status=403)
            print("handling login")

            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                User = get_user_model()
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                user_authed = User.objects.get(username=user.username)
                refresh_token = str(refresh)
                try:
                    user_has_access_token = AccessToken.objects.get(
                        username=user_authed
                    )
                    user_has_access_token.access_token = access_token
                    user_has_access_token.save()
                except AccessToken.DoesNotExist:
                    user_first_time = AccessToken(
                        username=user, userpk=user.pk, access_token=access_token
                    )
                    user_first_time.save()

                print("--Login succesful--")
                return JsonResponse(
                    {
                        "access_token": access_token,
                        "refresh_token": refresh_token,
                        "message": "Login successful",
                    }
                )
            else:  # Invalid credentials
                messages.error(request, "Invalid username or password.")
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
        print("-2-")
        access_token = request.META.get("HTTP_AUTHORIZATION", "").split(" ")[1]
        try:
            user = AccessToken.objects.get(access_token=access_token)
            print("user", user.username)
            if user.username == "hydde":  # Fix usergroup for this
                print("--Starting update--")
                get_books()
                print("--UPDATE DONE--")
                return HttpResponse("Update completed")
        except AccessToken.DoesNotExist:
            return HttpResponse("Unauthorized", status=401)

        return HttpResponse("Invalid token", status=401)

    else:
        return JsonResponse({"message": "Method not allowed"}, status=405)


@csrf_exempt
def sample_books(request):
    sample = load_sample_books()
    print("sample", sample)
    return sample
