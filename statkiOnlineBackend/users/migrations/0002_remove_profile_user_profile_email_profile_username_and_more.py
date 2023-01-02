# Generated by Django 4.1.4 on 2022-12-30 22:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='user',
        ),
        migrations.AddField(
            model_name='profile',
            name='email',
            field=models.EmailField(default='test@example.com', max_length=254),
        ),
        migrations.AddField(
            model_name='profile',
            name='username',
            field=models.CharField(default='jeez', max_length=2137),
        ),
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.ImageField(default='profilowe.jpg', upload_to='profile_pics'),
        ),
    ]