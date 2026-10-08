from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Note
from .serializers import NoteSerializer


class NoteList(APIView):

    def get(self, request):
        notes = Note.objects.all()
        serializer = NoteSerializer(notes, many=True)

        return Response(serializer.data)

    def post(self, request):
        serializer = NoteSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

class NoteDetail(APIView):
    def delete(self,request,id):
        try:
            note = Note.objects.get(id=id)
        except Note.DoesNotExist:
            return Response(status=404)

        note.delete()
        return Response({"message": "Note deleted"})

    def put(self, request, id):
        try:
            note = Note.objects.get(id=id)
        except Note.DoesNotExist:
            return Response(status=404)

        serializer = NoteSerializer(note, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)