# Generated by Django 4.1.5 on 2023-01-15 17:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_alter_adminprofileuser_image_alter_profile_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='adminprofileuser',
            name='image',
            field=models.ImageField(default='R3.jpg', upload_to='profile_pics'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.ImageField(default='R3.jpg', upload_to='profile_pics'),
        ),
    ]