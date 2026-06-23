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
    
    
    # ── অনলাইন ব্যাচ Category (ক্লাস ৬-৮, এসএসসি...) ──
class OnlineBatchCategory(models.Model):
    name_bn = models.CharField(max_length=255, verbose_name="নাম (বাংলা)")
    name_en = models.CharField(max_length=255, verbose_name="Name (English)")
    color = models.CharField(
        max_length=20,
        default="#f97316",
        verbose_name="Title Color (hex)"
    )
    gradient_from = models.CharField(
        max_length=20,
        default="#1a1000",
        verbose_name="Gradient From Color"
    )
    gradient_to = models.CharField(
        max_length=20,
        default="#2a1a00",
        verbose_name="Gradient To Color"
    )
    border_color = models.CharField(
        max_length=20,
        default="#3a2a00",
        verbose_name="Border Color"
    )
    is_wide = models.BooleanField(
        default=False,
        verbose_name="চওড়া? (2 কলাম)"
    )
    order = models.IntegerField(default=0, verbose_name="ক্রম")
    is_active = models.BooleanField(default=True, verbose_name="সক্রিয়?")

    class Meta:
        ordering = ['order']
        verbose_name = "অনলাইন ব্যাচ ক্যাটাগরি"
        verbose_name_plural = "অনলাইন ব্যাচ ক্যাটাগরিসমূহ"

    def __str__(self):
        return self.name_en
    # ── Subcategory (নবম শ্রেণি, দশম শ্রেণি ২০২৭...) ──
class OnlineBatchSubcategory(models.Model):
    category = models.ForeignKey(
        OnlineBatchCategory,
        on_delete=models.CASCADE,
        related_name='subcategories',
        verbose_name="ক্যাটাগরি"
    )
    name_bn = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="নাম (বাংলা)"
    )
    name_en = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="Name (English)"
    )
    order = models.IntegerField(default=0, verbose_name="ক্রম")
    is_active = models.BooleanField(default=True, verbose_name="সক্রিয়?")

    class Meta:
        ordering = ['order']
        verbose_name = "সাবক্যাটাগরি"
        verbose_name_plural = "সাবক্যাটাগরিসমূহ"

    def __str__(self):
        return f"{self.category.name_en} → {self.name_en or 'No name'}"

# ── Batch Item/Button (বিজ্ঞান বান্ডেল, ৬ষ্ঠ শ্রেণি...) ──
class OnlineBatchItem(models.Model):
    subcategory = models.ForeignKey(
        OnlineBatchSubcategory,
        on_delete=models.CASCADE,
        related_name='items',
        verbose_name="সাবক্যাটাগরি"
    )
    name_bn = models.CharField(max_length=255, verbose_name="নাম (বাংলা)")
    name_en = models.CharField(max_length=255, verbose_name="Name (English)")
    has_gift = models.BooleanField(
        default=False,
        verbose_name="গিফট আইকন (🎁)?"
    )
    link = models.CharField(
        max_length=500,
        default="/",
        verbose_name="লিংক"
    )
    order = models.IntegerField(default=0, verbose_name="ক্রম")
    is_active = models.BooleanField(default=True, verbose_name="সক্রিয়?")

    class Meta:
        ordering = ['order']
        verbose_name = "ব্যাচ আইটেম"
        verbose_name_plural = "ব্যাচ আইটেমসমূহ"

    def __str__(self):
        return self.name_en

# ── Scrolling Banner Models ──
class BannerImage(models.Model):
    """Left-to-Right এবং Right-to-Left scroll করা banner images"""
    
    DIRECTION_CHOICES = [
        ('left', 'Left to Right Scroll (→)'),
        ('right', 'Right to Left Scroll (←)'),
    ]
    
    image = models.ImageField(
        upload_to='banners/',
        verbose_name="ছবি"
    )
    direction = models.CharField(
        max_length=10,
        choices=DIRECTION_CHOICES,
        default='left',
        verbose_name="Scroll Direction"
    )
    order = models.IntegerField(default=0, verbose_name="ক্রম")
    is_active = models.BooleanField(default=True, verbose_name="সক্রিয়?")

    class Meta:
        ordering = ['direction', 'order']
        verbose_name = "Banner Image"
        verbose_name_plural = "Banner Images"

    def __str__(self):
        return f"Banner {self.order} ({self.get_direction_display()})"


class BannerConfig(models.Model):
    """Banner configuration - speed, size etc."""
    
    title_bn = models.CharField(
        max_length=200, 
        blank=True, 
        null=True,
        verbose_name="শিরোনাম (বাংলা)"
    )
    title_en = models.CharField(
        max_length=200, 
        blank=True, 
        null=True,
        verbose_name="Title (English)"
    )
    
    # Scroll Settings
    left_scroll_speed = models.FloatField(
        default=0.5, 
        verbose_name="Left Banner Speed (→)",
        help_text="Pixels per frame (0.5 = slow, 2 = fast)"
    )
    right_scroll_speed = models.FloatField(
        default=0.5, 
        verbose_name="Right Banner Speed (←)",
        help_text="Pixels per frame (0.5 = slow, 2 = fast)"
    )
    
    # Size Settings
    image_width_min = models.IntegerField(default=170, verbose_name="Min Width")
    image_width_max = models.IntegerField(default=250, verbose_name="Max Width")
    image_height_min = models.IntegerField(default=120, verbose_name="Min Height")
    image_height_max = models.IntegerField(default=175, verbose_name="Max Height")
    
    gap_between_images = models.IntegerField(
        default=12, 
        verbose_name="Gap (px)",
        help_text="Space between images in pixels"
    )
    
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Banner Configuration"
        verbose_name_plural = "Banner Configurations"

    def __str__(self):
        return "Banner Settings"