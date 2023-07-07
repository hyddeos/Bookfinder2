from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os
from dotenv import load_dotenv


class Command(BaseCommand):
    help = "Create a superuser with a password non-interactively."

    def handle(self, *args, **options):
        User = get_user_model()
        if not User.objects.filter(username=os.environ.get("SUPER_USERNAME")).exists():
            User.objects.create_superuser(
                os.environ.get("SUPER_USERNAME"),
                os.environ.get("SUPER_EMAIL"),
                os.environ.get("SUPER_PASSWORD"),
            )
            self.stdout.write(self.style.SUCCESS("Superuser created successfully."))
        else:
            self.stdout.write(self.style.WARNING("Superuser already exists."))
