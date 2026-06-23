from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import (
    Course, OfflineLocation, SuperFeature,
    OfflineImage, OfflineFeature,
    OnlineBatchCategory, OnlineBatchSubcategory, OnlineBatchItem,
)
from .serializers import (
    CourseSerializer,
    OfflineLocationSerializer,
    SuperFeatureSerializer,
    OfflineImageSerializer,
    OfflineFeatureSerializer,
    OnlineBatchCategorySerializer,   # ✅ was missing from import
)

# ❌ REMOVE these two lines - models don't exist
# from .models import BatchSection, BatchCategory
# from .serializers import BatchSectionSerializer, BatchCategorySerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def course_list(request):
    category = request.query_params.get('category', None)
    courses = Course.objects.filter(is_active=True)
    if category:
        courses = courses.filter(category=category)
    serializer = CourseSerializer(courses, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def offline_location_list(request):
    locations = OfflineLocation.objects.filter(is_active=True)
    serializer = OfflineLocationSerializer(locations, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def super_feature_list(request):
    features = SuperFeature.objects.filter(is_active=True)
    serializer = SuperFeatureSerializer(features, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def offline_image_list(request):
    images = OfflineImage.objects.filter(is_active=True)
    serializer = OfflineImageSerializer(images, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def offline_feature_list(request):
    features = OfflineFeature.objects.filter(is_active=True)
    serializer = OfflineFeatureSerializer(features, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def online_batch_list(request):
    categories = OnlineBatchCategory.objects.filter(is_active=True).order_by('order')
    serializer = OnlineBatchCategorySerializer(categories, many=True)
    return Response(serializer.data)