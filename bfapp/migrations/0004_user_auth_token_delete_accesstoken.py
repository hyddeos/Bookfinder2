# Generated by Django 4.2.2 on 2023-07-04 21:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("bfapp", "0003_remove_user_auth_token_accesstoken"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="auth_token",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.DeleteModel(
            name="AccessToken",
        ),
    ]
