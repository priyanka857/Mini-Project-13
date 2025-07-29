from django.contrib import admin
from django.urls import path, include
from app import views  # Import your app's views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include("app.urls")),
    path('', views.index, name='index'),  # Root URL points to index view
]
