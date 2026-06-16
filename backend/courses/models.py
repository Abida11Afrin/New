from django.db import models

# Create your models here.
from django.db import models

class Course(models.Model):

    CATEGORY_CHOICES = [
        ('school_college', 'স্কুল ও কলেজ'), 
         ('online_english', 'অনলাইন ইংরেজি কোর্স'),

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