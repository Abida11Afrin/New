from django.urls import path
from .views import (
    course_list,
    offline_location_list,
    super_feature_list,
    offline_image_list,
    offline_feature_list,
    online_batch_list,
)

urlpatterns = [
    path('courses/', course_list),
    path('offline-locations/', offline_location_list),
    path('super-features/', super_feature_list),
    path('offline-images/', offline_image_list),
    path('offline-features/', offline_feature_list),
    path('online-batches/', online_batch_list, name='online-batches'),
]