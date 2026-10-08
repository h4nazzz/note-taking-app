from django.urls import path
from .views import NoteDetail,NoteList,RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path("notes/", NoteList.as_view()),
    path("notes/<int:id>/", NoteDetail.as_view()),
    path("register/", RegisterView.as_view()),
    path("login/", TokenObtainPairView.as_view()),
]
