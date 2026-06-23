from rest_framework import serializers
from .models import (
    Course, OfflineLocation, SuperFeature,
    OfflineImage, OfflineFeature,
    OnlineBatchCategory, OnlineBatchSubcategory, OnlineBatchItem,
    BannerImage, BannerConfig,
    StudentReview, StudentReviewConfig,
)


# ── Course Serializer ──
class CourseSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            'id', 'title_bn', 'title_en',
            'badge_bn', 'badge_en',
            'instructor', 'image_url',
            'category', 'link', 'order', 'is_active',
        ]

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None


# ── Offline Location Serializer ──
class OfflineLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfflineLocation
        fields = [
            'id', 'name_bn', 'name_en',
            'address_bn', 'address_en',
            'order', 'is_active',
        ]


# ── Super Feature Serializer ──
class SuperFeatureSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = SuperFeature
        fields = [
            'id', 'title', 'title_color',
            'description_bn', 'description_en',
            'image_url', 'order', 'is_active',
        ]

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None


# ── Offline Image Serializer ──
class OfflineImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = OfflineImage
        fields = [
            'id', 'image_url',
            'caption_bn', 'caption_en',
            'order', 'is_active',
        ]

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None


# ── Offline Feature Serializer ──
class OfflineFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfflineFeature
        fields = [
            'id', 'title_bn', 'title_en',
            'description_bn', 'description_en',
            'order', 'is_active',
        ]


# ══════════════════════════════════════════════════════════════
# ── Online Batch Serializers ──
# ══════════════════════════════════════════════════════════════

class OnlineBatchItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OnlineBatchItem
        fields = ['id', 'name_bn', 'name_en', 'has_gift', 'link', 'order']


class OnlineBatchSubcategorySerializer(serializers.ModelSerializer):
    items = OnlineBatchItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = OnlineBatchSubcategory
        fields = ['id', 'name_bn', 'name_en', 'order', 'items']


class OnlineBatchCategorySerializer(serializers.ModelSerializer):
    subcategories = OnlineBatchSubcategorySerializer(many=True, read_only=True)

    class Meta:
        model = OnlineBatchCategory
        fields = [
            'id', 'name_bn', 'name_en',
            'color', 'gradient_from', 'gradient_to',
            'border_color', 'is_wide',
            'order', 'subcategories',
        ]


# ══════════════════════════════════════════════════════════════
# ── Banner Serializers ──
# ══════════════════════════════════════════════════════════════

class BannerImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = BannerImage
        fields = ['id', 'image_url', 'direction', 'order']
    
    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None


class BannerConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = BannerConfig
        fields = [
            'id', 'title_bn', 'title_en',
            'left_scroll_speed', 'right_scroll_speed',
            'image_width_min', 'image_width_max',
            'image_height_min', 'image_height_max',
            'gap_between_images'
        ]


# ══════════════════════════════════════════════════════════════
# ── Student Review Serializers ──
# ══════════════════════════════════════════════════════════════

class StudentReviewSerializer(serializers.ModelSerializer):
    icon_url = serializers.SerializerMethodField()
    background_gradient = serializers.SerializerMethodField()
    
    class Meta:
        model = StudentReview
        fields = [
            'id', 'review_text_bn', 'review_text_en',
            'student_name_bn', 'student_name_en',
            'school_name_bn', 'school_name_en',
            'background_gradient', 'border_color',
            'gender', 'icon_url', 'is_highlight', 'order'
        ]
    
    def get_icon_url(self, obj):
        # Get config for icon URLs
        config = StudentReviewConfig.objects.filter(is_active=True).first()
        if config:
            return config.male_icon_url if obj.gender == 'male' else config.female_icon_url
        return "/images/boys_icon.jpg" if obj.gender == 'male' else "/images/girls_icon.jpg"
    
    def get_background_gradient(self, obj):
        return f"linear-gradient(135deg, {obj.background_gradient_from}, {obj.background_gradient_to})"


class StudentReviewConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentReviewConfig
        fields = [
            'id', 'section_title_bn', 'section_title_en',
            'card_width_mobile', 'card_width_desktop', 'card_min_height',
            'male_icon_url', 'female_icon_url'
        ]