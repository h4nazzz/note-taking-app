from django.urls import path
from .views import NoteDetail,NoteList

urlpatterns = [
    path("notes/", NoteList.as_view()),
    path("notes/<int:id>/", NoteDetail.as_view()),
]