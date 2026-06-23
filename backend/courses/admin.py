from django.contrib import admin
from .models import (
    Course, OfflineLocation, 
    SuperFeature, OfflineImage, 
    OfflineFeature, 
    OnlineBatchCategory, OnlineBatchSubcategory, OnlineBatchItem,
    BannerImage, BannerConfig,
    StudentReview, StudentReviewConfig,
)


# ── Course Admin ──
@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['title_en', 'title_bn', 'category', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    list_filter = ['category', 'is_active']
    search_fields = ['title_en', 'title_bn']


# ── Offline Location Admin ──
@admin.register(OfflineLocation)
class OfflineLocationAdmin(admin.ModelAdmin):
    list_display = ['name_en', 'name_bn', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    search_fields = ['name_en', 'name_bn']


# ── Super Feature Admin ──
@admin.register(SuperFeature)
class SuperFeatureAdmin(admin.ModelAdmin):
    list_display = ['title', 'title_color', 'order', 'is_active']
    list_editable = ['order', 'is_active']


# ── Offline Image Admin ──
@admin.register(OfflineImage)
class OfflineImageAdmin(admin.ModelAdmin):
    list_display = ['image', 'order', 'is_active']
    list_editable = ['order', 'is_active']


# ── Offline Feature Admin ──
@admin.register(OfflineFeature)
class OfflineFeatureAdmin(admin.ModelAdmin):
    list_display = ['title_en', 'title_bn', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    search_fields = ['title_en', 'title_bn']


# ══════════════════════════════════════════════════════════════
# ── Online Batch Section Admins ──
# ══════════════════════════════════════════════════════════════

# ── Button/Item Inline ──
class OnlineBatchItemInline(admin.TabularInline):
    model = OnlineBatchItem
    extra = 1
    fields = ['name_bn', 'name_en', 'has_gift', 'link', 'order']
    verbose_name = "Button"
    verbose_name_plural = "Buttons"


# ── Subcategory Inline ──
class OnlineBatchSubcategoryInline(admin.StackedInline):
    model = OnlineBatchSubcategory
    extra = 1
    show_change_link = True
    verbose_name = "Subcategory"
    verbose_name_plural = "Subcategories"


# ── Category Admin ──
@admin.register(OnlineBatchCategory)
class OnlineBatchCategoryAdmin(admin.ModelAdmin):
    list_display = ['name_bn', 'name_en', 'is_wide', 'order', 'is_active']
    list_editable = ['order', 'is_active', 'is_wide']
    list_filter = ['is_active', 'is_wide']
    search_fields = ['name_bn', 'name_en']
    inlines = [OnlineBatchSubcategoryInline]
    
    fieldsets = (
        ("Basic Info", {
            "fields": ("name_bn", "name_en")
        }),
        ("Card Styling", {
            "fields": ("color", "gradient_from", "gradient_to", "border_color"),
            "description": "Example: #f97316, #1a1000, #ef4444"
        }),
        ("Settings", {
            "fields": ("is_wide", "order", "is_active")
        }),
    )


# ── Subcategory Admin ──
@admin.register(OnlineBatchSubcategory)
class OnlineBatchSubcategoryAdmin(admin.ModelAdmin):
    list_display = ['name_bn', 'name_en', 'category', 'order']
    list_editable = ['order']
    list_filter = ['category']
    search_fields = ['name_bn', 'name_en']
    inlines = [OnlineBatchItemInline]


# ── Item/Button Admin ──
@admin.register(OnlineBatchItem)
class OnlineBatchItemAdmin(admin.ModelAdmin):
    list_display = ['name_bn', 'name_en', 'subcategory', 'has_gift', 'order']
    list_editable = ['order', 'has_gift']
    list_filter = ['subcategory__category', 'has_gift']
    search_fields = ['name_bn', 'name_en']


# ══════════════════════════════════════════════════════════════
# ── Scrolling Banner Admins ──
# ══════════════════════════════════════════════════════════════

@admin.register(BannerImage)
class BannerImageAdmin(admin.ModelAdmin):
    list_display = ['image_preview', 'direction', 'order', 'is_active']
    list_editable = ['direction', 'order', 'is_active']
    list_filter = ['is_active', 'direction']
    ordering = ['direction', 'order']
    
    def image_preview(self, obj):
        from django.utils.html import format_html
        if obj.image:
            return format_html(
                '<img src="{}" width="80" height="50" style="object-fit:cover;border-radius:5px;" />', 
                obj.image.url
            )
        return "No Image"
    image_preview.short_description = "Preview"


@admin.register(BannerConfig)
class BannerConfigAdmin(admin.ModelAdmin):
    list_display = ['title_bn', 'left_scroll_speed', 'right_scroll_speed', 'is_active']
    
    fieldsets = (
        ("Title (Optional)", {
            "fields": ("title_bn", "title_en"),
            "classes": ("collapse",)
        }),
        ("Scroll Speed", {
            "fields": ("left_scroll_speed", "right_scroll_speed"),
            "description": "Higher = faster scroll. Default: 0.5"
        }),
        ("Image Size", {
            "fields": (
                ("image_width_min", "image_width_max"),
                ("image_height_min", "image_height_max"),
            ),
            "description": "Responsive size range (min to max)"
        }),
        ("Layout", {
            "fields": ("gap_between_images",)
        }),
        ("Status", {
            "fields": ("is_active",)
        }),
    )
    
    def has_add_permission(self, request):
        if BannerConfig.objects.exists():
            return False
        return True


# ══════════════════════════════════════════════════════════════
# ── Student Reviews Admins ──
# ══════════════════════════════════════════════════════════════

@admin.register(StudentReview)
class StudentReviewAdmin(admin.ModelAdmin):
    list_display = [
        'student_name_bn', 'student_name_en', 
        'gender', 'is_highlight', 'order', 'is_active'
    ]
    list_editable = ['gender', 'is_highlight', 'order', 'is_active']
    list_filter = ['is_active', 'gender', 'is_highlight']
    search_fields = ['student_name_bn', 'student_name_en', 'school_name_bn', 'school_name_en']
    ordering = ['order']
    
    fieldsets = (
        ("Review Text", {
            "fields": ("review_text_bn", "review_text_en")
        }),
        ("Student Information", {
            "fields": (
                ("student_name_bn", "student_name_en"),
                ("school_name_bn", "school_name_en"),
                "gender"
            )
        }),
        ("Card Design", {
            "fields": (
                ("background_gradient_from", "background_gradient_to"),
                "border_color"
            ),
            "description": "Example colors: #0a1a2a, #051510, #1a3a3a"
        }),
        ("Settings", {
            "fields": ("is_highlight", "order", "is_active")
        }),
    )


@admin.register(StudentReviewConfig)
class StudentReviewConfigAdmin(admin.ModelAdmin):
    list_display = ['section_title_bn', 'section_title_en', 'is_active']
    
    fieldsets = (
        ("Section Title", {
            "fields": ("section_title_bn", "section_title_en")
        }),
        ("Card Size Settings", {
            "fields": (
                "card_width_mobile",
                "card_width_desktop", 
                "card_min_height"
            ),
            "description": "CSS values like: 85vw, 300px, 320px"
        }),
        ("Icon Settings", {
            "fields": ("male_icon_url", "female_icon_url"),
            "description": "Image paths like: /images/boys_icon.jpg"
        }),
        ("Status", {
            "fields": ("is_active",)
        }),
    )
    
    def has_add_permission(self, request):
        if StudentReviewConfig.objects.exists():
            return False
        return True