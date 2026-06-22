from django.contrib import admin
from .models import Course, OfflineLocation, SuperFeature, OfflineImage, OfflineFeature
######################
from .models import BatchSection, BatchCategory, BatchSubcategory, BatchItem


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['title_en', 'title_bn', 'category', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    list_filter = ['category', 'is_active']
    search_fields = ['title_en', 'title_bn']


@admin.register(OfflineLocation)
class OfflineLocationAdmin(admin.ModelAdmin):
    list_display = ['name_en', 'name_bn', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    search_fields = ['name_en', 'name_bn']


@admin.register(SuperFeature)
class SuperFeatureAdmin(admin.ModelAdmin):
    list_display = ['title', 'title_color', 'order', 'is_active']
    list_editable = ['order', 'is_active']


@admin.register(OfflineImage)
class OfflineImageAdmin(admin.ModelAdmin):
    list_display = ['image', 'order', 'is_active']
    list_editable = ['order', 'is_active']


@admin.register(OfflineFeature)
class OfflineFeatureAdmin(admin.ModelAdmin):
    list_display = ['title_en', 'title_bn', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    search_fields = ['title_en', 'title_bn']



###########################


# ─── Inline classes ─────────────────────────────────────────

class BatchItemInline(admin.TabularInline):
    model = BatchItem
    extra = 1
    fields = ["name_en", "name_bn", "has_gift", "url", "order", "is_active"]


class BatchSubcategoryInline(admin.StackedInline):
    model = BatchSubcategory
    extra = 1
    fields = ["name_en", "name_bn", "order", "is_active"]
    show_change_link = True


# ─── Admin registrations ────────────────────────────────────

@admin.register(BatchSection)
class BatchSectionAdmin(admin.ModelAdmin):
    list_display = ["title_part1_en", "title_part2_en", "title_part3_en", "is_active"]
    list_editable = ["is_active"]


@admin.register(BatchCategory)
class BatchCategoryAdmin(admin.ModelAdmin):
    list_display = ["name_en", "name_bn", "grid_cols", "order", "is_active"]
    list_editable = ["grid_cols", "order", "is_active"]
    inlines = [BatchSubcategoryInline]


@admin.register(BatchSubcategory)
class BatchSubcategoryAdmin(admin.ModelAdmin):
    list_display = ["__str__", "category", "order", "is_active"]
    list_filter = ["category"]
    list_editable = ["order", "is_active"]
    inlines = [BatchItemInline]


@admin.register(BatchItem)
class BatchItemAdmin(admin.ModelAdmin):
    list_display = ["name_en", "subcategory", "has_gift", "order", "is_active"]
    list_filter = ["subcategory__category", "has_gift", "is_active"]
    list_editable = ["order", "is_active"]
    search_fields = ["name_en", "name_bn"]
    