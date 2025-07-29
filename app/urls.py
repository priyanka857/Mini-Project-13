from django.urls import path
from app import views
from .views import ConnectionListView

urlpatterns = [
    path("", views.index, name="index"),
    path('login/', views.login_page, name="login"),  # use login_page to avoid conflict with django.contrib.auth.login
    path('uploaddata/', views.uploaddata, name="uploaddata"),
    path("getApplicantsData/", ConnectionListView.as_view(), name="connection_list"),
    path("update_applicants/<int:id>", views.update_applicants, name='update_applicants'),
    path("connectionvisualization/", views.connectionvisualization, name="connectionvisualization"),
    path("connectionrequestdata/", views.connectionrequestdata, name="connectionrequestdata"),
    path("handlelogin/", views.handlelogin, name='handlelogin'),
    path("api/csrf/", views.get_csrf_token, name="get_csrf_token"),  # CSRF token endpoint
]
