from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Note
from .serializers import NoteSerializer, RegisterSerializer
from rest_framework.permissions import IsAuthenticated


class NoteList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notes = Note.objects.filter(owner=request.user)
        serializer = NoteSerializer(notes, many=True)

        return Response(serializer.data)

    def post(self, request):
        serializer = NoteSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)


class NoteDetail(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, id):
        try:
            note = Note.objects.get(id=id, owner=request.user)
        except Note.DoesNotExist:
            return Response(status=404)

        note.delete()
        return Response({"message": "Note deleted"})

    def put(self, request, id):
        try:
            note = Note.objects.get(id=id, owner=request.user)
        except Note.DoesNotExist:
            return Response(status=404)

        serializer = NoteSerializer(note, data=request.data)

        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data)

        return Response(serializer.errors, status=400)


class RegisterView(APIView):

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User created successfully"},
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )