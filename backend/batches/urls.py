from django.urls import path
from .urls import views

urlpatterns = [
    path('', views.get_batch_data, name='get_batch_data'),
]