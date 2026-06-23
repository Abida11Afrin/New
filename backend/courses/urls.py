from django.urls import path, include
from django.contrib import admin
from .views import course_list, offline_location_list, super_feature_list, offline_image_list, offline_feature_list
from .views import course_list, super_feature_list


urlpatterns = [
    path('admin/', admin.site.urls),
    path('courses/', course_list),
    path('offline-locations/', offline_location_list),
    path('super-features/', super_feature_list),
    path('offline-images/', offline_image_list),
    path('offline-features/', offline_feature_list),
]

