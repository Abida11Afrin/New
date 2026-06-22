from rest_framework import serializers
from .models import Course, OfflineLocation, SuperFeature, OfflineImage, OfflineFeature
#################################
from .models import BatchSection, BatchCategory, BatchSubcategory, BatchItem


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


class OfflineLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfflineLocation
        fields = [
            'id', 'name_bn', 'name_en',
            'address_bn', 'address_en',
            'order', 'is_active',
        ]



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


class OfflineLocationSerializer(serializers.ModelSerializer):
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

#############################
# courses/serializers.py
from rest_framework import serializers
from .models import BatchSection, BatchCategory, BatchSubcategory, BatchItem


class BatchItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BatchItem
        fields = ["id", "name_en", "name_bn", "has_gift", "url", "order"]


class BatchSubcategorySerializer(serializers.ModelSerializer):
    items = BatchItemSerializer(many=True, read_only=True)

    class Meta:
        model = BatchSubcategory
        fields = ["id", "name_en", "name_bn", "items", "order"]


class BatchCategorySerializer(serializers.ModelSerializer):
    subcategories = BatchSubcategorySerializer(many=True, read_only=True)

    class Meta:
        model = BatchCategory
        fields = [
            "id",
            "name_en", "name_bn",
            "color", "gradient_from", "gradient_to", "border_color",
            "grid_cols", "order",
            "subcategories",
        ]


class BatchSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BatchSection
        fields = [
            "id",
            "title_part1_en", "title_part1_bn",
            "title_part2_en", "title_part2_bn", "title_part2_color",
            "title_part3_en", "title_part3_bn", "title_part3_color",
            "subtitle_en", "subtitle_bn",
        ]