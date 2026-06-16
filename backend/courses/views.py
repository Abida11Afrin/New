from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Course
from .serializers import CourseSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def course_list(request):
    category = request.query_params.get('category', None)

    courses = Course.objects.filter(is_active=True)

    if category:
        courses = courses.filter(category=category)

    serializer = CourseSerializer(courses, many=True, context={'request': request})
    return Response(serializer.data)