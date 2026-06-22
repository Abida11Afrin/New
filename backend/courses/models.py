from django.db import models

# Create your models here.

class Course(models.Model):

    CATEGORY_CHOICES = [
        ('school_college', 'স্কুল ও কলেজ'), 
        ('online_english', 'অনলাইন ইংরেজি কোর্স'),
        ('offline_english', 'অফলাইন ইংরেজি কোর্স'),


    ]

    # বাংলা ও ইংরেজি নাম
    title_bn = models.CharField(max_length=255, verbose_name="নাম (বাংলা)")
    title_en = models.CharField(max_length=255, verbose_name="Name (English)")

    # ব্যাজ টেক্সট (যেমন "এডমিশন কোর্সে ভর্তি চলছে")
    badge_bn = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="ব্যাজ টেক্সট (বাংলা)"
    )
    badge_en = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="Badge Text (English)"
    )

     # instructor নাম যোগ করছি (যেমন "Munzereen Shahid")
    instructor = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="ইন্সট্রাক্টর"
    )

    # ছবি
    image = models.ImageField(
        upload_to='courses/',
        verbose_name="ছবি"
    )

    # ক্যাটাগরি
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        verbose_name="ক্যাটাগরি"
    )

    # লিংক
    link = models.CharField(
        max_length=500,
        default="/",
        verbose_name="লিংক"
    )

    # কোন কোর্স আগে দেখাবে (ছোট সংখ্যা আগে)
    order = models.IntegerField(
        default=0,
        verbose_name="ক্রম"
    )

    # দেখানো/লুকানো টগল
    is_active = models.BooleanField(
        default=True,
        verbose_name="সক্রিয়?"
    )

    class Meta:
        ordering = ['order']
        verbose_name = "কোর্স"
        verbose_name_plural = "কোর্সসমূহ"
        

    def __str__(self):
        return self.title_en
    
     # ── নতুন Model ১: Offline Center Location ──
class OfflineLocation(models.Model):
    name_bn = models.CharField(max_length=100, verbose_name="এলাকার নাম (বাংলা)")
    name_en = models.CharField(max_length=100, verbose_name="Area Name (English)")
    address_bn = models.TextField(verbose_name="ঠিকানা (বাংলা)")
    address_en = models.TextField(verbose_name="Address (English)")
    order = models.IntegerField(default=0, verbose_name="ক্রম")
    is_active = models.BooleanField(default=True, verbose_name="সক্রিয়?")

    class Meta:
        ordering = ['order']
        verbose_name = "অফলাইন সেন্টার"
        verbose_name_plural = "অফলাইন সেন্টারসমূহ"

    def __str__(self):
        return self.name_en
    
    # ── নতুন Model ২: SuperFeature (SuperLive, SuperPrep, SuperSolve) ──
class SuperFeature(models.Model):
    title = models.CharField(
        max_length=100,
        verbose_name="Title (যেমন: SuperLive Class)"
    )
    title_color = models.CharField(
        max_length=20,
        default="#38bdf8",
        verbose_name="Title Color (hex code)"
    )
    description_bn = models.TextField(verbose_name="বিবরণ (বাংলা)")
    description_en = models.TextField(verbose_name="Description (English)")
    image = models.ImageField(
        upload_to='super_features/',
        verbose_name="ছবি"
    )
    order = models.IntegerField(default=0, verbose_name="ক্রম")
    is_active = models.BooleanField(default=True, verbose_name="সক্রিয়?")

    class Meta:
        ordering = ['order']
        verbose_name = "সুপার ফিচার"
        verbose_name_plural = "সুপার ফিচারসমূহ"

    def __str__(self):
        return self.title


# ── নতুন Model ৩: OfflineImage ──
class OfflineImage(models.Model):
    image = models.ImageField(
        upload_to='offline_images/',
        verbose_name="ছবি"
    )
    caption_bn = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="ক্যাপশন (বাংলা)"
    )
    caption_en = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="Caption (English)"
    )
    order = models.IntegerField(default=0, verbose_name="ক্রম")
    is_active = models.BooleanField(default=True, verbose_name="সক্রিয়?")

    class Meta:
        ordering = ['order']
        verbose_name = "অফলাইন ছবি"
        verbose_name_plural = "অফলাইন ছবিসমূহ"

    def __str__(self):
        return f"Offline Image {self.order}"


# ── নতুন Model ৪: OfflineFeature (দেশসেরা টিচার, 1-1 Counselling...) ──
class OfflineFeature(models.Model):
    title_bn = models.CharField(max_length=255, verbose_name="শিরোনাম (বাংলা)")
    title_en = models.CharField(max_length=255, verbose_name="Title (English)")
    description_bn = models.TextField(verbose_name="বিবরণ (বাংলা)")
    description_en = models.TextField(verbose_name="Description (English)")
    order = models.IntegerField(default=0, verbose_name="ক্রম")
    is_active = models.BooleanField(default=True, verbose_name="সক্রিয়?")

    class Meta:
        ordering = ['order']
        verbose_name = "অফলাইন ফিচার"
        verbose_name_plural = "অফলাইন ফিচারসমূহ"

    def __str__(self):
        return self.title_en
    
  
############### batches/models.py

# courses/models.py


class BatchSection(models.Model):
    title_part1_en = models.CharField(max_length=100, default="All the Country's Best")
    title_part1_bn = models.CharField(max_length=100, default="দেশসেরা সকল")

    title_part2_en = models.CharField(max_length=100, default="Online")
    title_part2_bn = models.CharField(max_length=100, default="অনলাইন")
    title_part2_color = models.CharField(max_length=7, default="#f97316")

    title_part3_en = models.CharField(max_length=100, default="Batches")
    title_part3_bn = models.CharField(max_length=100, default="ব্যাচ")
    title_part3_color = models.CharField(max_length=7, default="#facc15")

    subtitle_en = models.TextField(default="Become one of the 30,000+ Academic students...")
    subtitle_bn = models.TextField(default="টেন মিনিট স্কুলের বিভিন্ন কোর্সে...")

    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Batch Section Heading"
        verbose_name_plural = "Batch Section Headings"

    def __str__(self):
        return f"{self.title_part1_en} {self.title_part2_en} {self.title_part3_en}"


class BatchCategory(models.Model):
    name_en = models.CharField(max_length=200)
    name_bn = models.CharField(max_length=200)

    color = models.CharField(max_length=7, default="#f97316")
    gradient_from = models.CharField(max_length=7, default="#1a1000")
    gradient_to = models.CharField(max_length=7, default="#2a1a00")
    border_color = models.CharField(max_length=7, default="#3a2a00")

    grid_cols = models.IntegerField(default=1, help_text="1=single column, 2=span 2 columns")
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order"]
        verbose_name_plural = "Batch Categories"

    def __str__(self):
        return self.name_en


class BatchSubcategory(models.Model):
    category = models.ForeignKey(
        BatchCategory,
        related_name="subcategories",
        on_delete=models.CASCADE
    )

    name_en = models.CharField(max_length=200, blank=True)
    name_bn = models.CharField(max_length=200, blank=True)

    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order"]
        verbose_name_plural = "Batch Subcategories"

    def __str__(self):
        return f"{self.category.name_en} > {self.name_en or '(No name)'}"


class BatchItem(models.Model):
    subcategory = models.ForeignKey(
        BatchSubcategory,
        related_name="items",
        on_delete=models.CASCADE
    )

    name_en = models.CharField(max_length=300)
    name_bn = models.CharField(max_length=300)

    has_gift = models.BooleanField(default=False)
    url = models.CharField(max_length=500, blank=True)

    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order"]
        verbose_name_plural = "Batch Items"

    def __str__(self):
        return self.name_en