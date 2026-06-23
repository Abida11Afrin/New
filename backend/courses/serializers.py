from rest_framework import serializers
from .models import (
    Course, OfflineLocation, SuperFeature,
    OfflineImage, OfflineFeature,
    OnlineBatchCategory, OnlineBatchSubcategory, OnlineBatchItem
)


class CourseSerializer(serializers.ModelSerializer):        # ✅ only once
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


class OfflineLocationSerializer(serializers.ModelSerializer):   # ✅ only once
    class Meta:
        model = OfflineLocation
        fields = [
            'id', 'name_bn', 'name_en',
            'address_bn', 'address_en',
            'order', 'is_active',
        ]


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


class OfflineFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfflineFeature
        fields = [
            'id', 'title_bn', 'title_en',
            'description_bn', 'description_en',
            'order', 'is_active',
        ]


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
            'id', 'name_bn', 'name_en', 'color', 'gradient_from',
            'gradient_to', 'border_color', 'is_wide', 'order', 'subcategories'
        ]