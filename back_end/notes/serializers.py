from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Note


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content","owner"]
        read_only_fields = ["owner"]
class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["username", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"]
        )

        return user