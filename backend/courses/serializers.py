from rest_framework import serializers
from .models import Course


class CourseSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            'id',
            'title_bn',
            'title_en',
            'badge_bn',
            'badge_en',
            'instructor', 
            'image_url',
            'category',
            'link',
            'order',
            'is_active',
        ]

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None