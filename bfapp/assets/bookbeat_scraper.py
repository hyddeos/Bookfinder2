import requests
from bfapp.assets.url_regex import bookbeat_url_regex
from datetime import datetime


from bfapp.assets.save_to_db import save_book


def get_books():
    urls = urls_to_scape()
    books = []
    for url in urls:
        books.append(scape_books(url))

    return books


def urls_to_scape():
    urls = [
        # psykologi-61 # naturvetenskapn 66
        "https://www.bookbeat.se/api/discovery/search/categories?category=61&format=audiobook&id=psykologi-46061&language=Swedish&language=English&offset=0&sortBy=publishdate&sortOrder=desc",
        "https://www.bookbeat.se/api/discovery/search/categories?category=66&format=audiobook&id=naturvetenskap-46066&language=Swedish&language=english&offset=0&sortBy=publishdate&sortOrder=desc",
        # "https://www.bookbeat.se/api/discovery/search/categories?category=68&format=audiobook&id=religion-och-filosofi-46068&language=Swedish&language=English&offset=0&sortBy=publishdate&sortOrder=asc",
        # Add later when know how to filter better
    ]
    return urls


def scape_books(url):
    print("Updating books running")
    service = "bookbeat"
    total_books = 0
    books_links = set()
    offset_counter = 0
    page = 0

    # Gets links to all books in the category
    response = requests.get(url)
    if response.status_code == 200:
        json_data = response.json()
        for book in json_data["_embedded"]["books"]:
            books_links.add(book["_links"]["self"]["href"])
        offset_counter += 50
        total_books = json_data["count"]
    else:
        print("Request failed with status code:", response.status_code)
    print("tot books", total_books)
    while offset_counter < total_books:  # Add total_books later for all books
        page = page + 1
        updated_url = bookbeat_url_regex(url, offset_counter)
        response = requests.get(updated_url)
        if response.status_code == 200:
            json_data = response.json()
            for book in json_data["_embedded"]["books"]:
                books_links.add(book["_links"]["self"]["href"])
            offset_counter += 50
        else:
            print("Request failed with status code:", response.status_code)

    # Fetch data about every book from the book-link
    min_length = 13000
    unwanted_categories = [
        "Personlig utveckling",
        "Familjeliv & Relationer",
        "Hälsa",
        "Kropp & själ",
        "Noveller, poesi & drama",
        "Parodier & satirer",
        "Litteratur & konst",
        "Konstbiografier",
        "Kungliga biografier",
        "True crime",
        "Sport & träning",
        "Språk",
        "Crime",
        "Ekonomi & Näringsliv",
        "Children and YA",
        "Mat & dryck",
        "Musik & film",
        "Från 12 år",
        "Fritid & livsstil",
    ]
    passed = 0
    book_counter = 1
    for book_url in books_links:
        print("link", book_counter, book_url)
        book_counter = book_counter + 1
        response = requests.get(book_url)
        if response.status_code == 200:
            json_data = response.json()
            # check if book is long enough
            audiobook_length = json_data["audiobooklength"]
            try:
                if audiobook_length is not None:
                    if audiobook_length > min_length:
                        # get genres
                        genres = [genre["name"] for genre in json_data["genres"]]
                        # Filter away unwanted genres
                        unwanted_genre_found = False
                        for genre in genres:
                            if genre in unwanted_categories:
                                unwanted_genre_found = True
                                break
                        if unwanted_genre_found:
                            continue
                        passed = passed + 1
                        print("passed", passed)
                        # Add book
                        book = {
                            "title": json_data["title"],
                            "author": json_data["author"],
                            "url": json_data["shareurl"],
                            "cover": json_data["cover"],
                            "summary": json_data["summary"],
                            "published": datetime.strptime(
                                json_data["published"], "%Y-%m-%dT%H:%M:%S%z"
                            ).strftime("%Y-%m-%d"),
                            "source_published": datetime.strptime(
                                json_data["editions"][0]["bookBeatPublishDate"],
                                "%Y-%m-%dT%H:%M:%S%z",
                            ).strftime("%Y-%m-%d"),
                            "genres": genres,
                            "publisher": json_data["editions"][0]["publisher"],
                        }
                        save_book(book, service)  # sends book to save_to_db file.
            except Exception as e:
                print(
                    "An exception occurred:",
                    str(e),
                    audiobook_length,
                    type(audiobook_length),
                )
                continue  # Skip to the next iteration
        else:
            print("Request failed with status code:", response.status_code)
