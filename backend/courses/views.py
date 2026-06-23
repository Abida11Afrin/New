from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import (
    Course, OfflineLocation, SuperFeature,
    OfflineImage, OfflineFeature,
    OnlineBatchCategory, OnlineBatchSubcategory, OnlineBatchItem,
    BannerImage, BannerConfig,
    StudentReview, StudentReviewConfig,
)
from .serializers import (
    CourseSerializer,
    OfflineLocationSerializer,
    SuperFeatureSerializer,
    OfflineImageSerializer,
    OfflineFeatureSerializer,
    OnlineBatchCategorySerializer,
    BannerImageSerializer, BannerConfigSerializer,
    StudentReviewSerializer, StudentReviewConfigSerializer,
)


# ══════════════════════════════════════════════════════════════
# ── Basic Course Views ──
# ══════════════════════════════════════════════════════════════

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


# ══════════════════════════════════════════════════════════════
# ── Online Batch Views ──
# ══════════════════════════════════════════════════════════════

@api_view(['GET'])
@permission_classes([AllowAny])
def online_batch_list(request):
    categories = OnlineBatchCategory.objects.filter(is_active=True).order_by('order')
    serializer = OnlineBatchCategorySerializer(categories, many=True)
    return Response(serializer.data)


# ══════════════════════════════════════════════════════════════
# ── Banner Views ──
# ══════════════════════════════════════════════════════════════

@api_view(['GET'])
@permission_classes([AllowAny])
def banner_images(request):
    direction = request.query_params.get('direction', None)
    
    images = BannerImage.objects.filter(is_active=True)
    
    if direction:
        images = images.filter(direction=direction)
    
    images = images.order_by('order')
    serializer = BannerImageSerializer(images, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def banner_config(request):
    config = BannerConfig.objects.filter(is_active=True).first()
    if config:
        serializer = BannerConfigSerializer(config)
        return Response(serializer.data)
    else:
        return Response({
            "left_scroll_speed": 0.5,
            "right_scroll_speed": 0.5,
            "image_width_min": 170,
            "image_width_max": 250,
            "image_height_min": 120,
            "image_height_max": 175,
            "gap_between_images": 12,
        })


# ══════════════════════════════════════════════════════════════
# ── Student Review Views ──
# ══════════════════════════════════════════════════════════════

@api_view(['GET'])
@permission_classes([AllowAny])
def student_reviews(request):
    reviews = StudentReview.objects.filter(is_active=True).order_by('order')
    serializer = StudentReviewSerializer(reviews, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def student_review_config(request):
    config = StudentReviewConfig.objects.filter(is_active=True).first()
    if config:
        serializer = StudentReviewConfigSerializer(config)
        return Response(serializer.data)
    else:
        return Response({
            "section_title_bn": "শিক্ষার্থীদের মতামত",
            "section_title_en": "Student Reviews",
            "card_width_mobile": "85vw",
            "card_width_desktop": "300px",
            "card_min_height": "320px",
            "male_icon_url": "/images/boys_icon.jpg",
            "female_icon_url": "/images/girls_icon.jpg",
        })