from django.db import models
import datetime
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail  


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    email_plaintext_message = "{}?token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key)

    send_mail(
        # title:
        "Password Reset for {title}".format(title="Some website title"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@somehost.local",
        # to:
        [reset_password_token.user.email]
    )



class Userdetails(models.Model):
    username=models.CharField(max_length=100)
    about=models.TextField()
    email=models.EmailField(max_length=256)
    phone=models.CharField(max_length=100)
    role=models.CharField(max_length=100)
    uid=models.CharField(max_length=100)
    pic=models.ImageField(upload_to="my_pic",blank=True)
    is_suspend=models.BooleanField(default=False)
    suspend_reason=models.TextField(null=True,blank=True)

class Purchased_item(models.Model):
    UserPK=models.ForeignKey(Userdetails,on_delete=models.CASCADE)
    pid=models.IntegerField(unique=True)
    pic=models.ImageField(upload_to="my_pic",blank=True)
    purchase_date=models.DateField(auto_now_add=True)
    p_rating=models.IntegerField()
    p_name=models.CharField(max_length=100)
    p_url=models.CharField(max_length=100)

class User_Product(models.Model):
    UserPK=models.ForeignKey(Userdetails,on_delete=models.CASCADE)
    pid=models.IntegerField(unique=True)
    pic=models.ImageField(upload_to="my_pic",blank=True)
    purchase_date=models.DateField(auto_now_add=True)
    p_rating=models.IntegerField()
    p_name=models.CharField(max_length=100)
    p_url=models.CharField(max_length=100)
    
class cmsModel(models.Model): 
    pagename=models.CharField(max_length=100)
    pageid=models.IntegerField()
    title=models.CharField(max_length=100)
    content=models.CharField(max_length=100)    
    media=models.ImageField(upload_to="my_pic",blank=True)

class ProjectManagementModel(models.Model):
    
    pic=models.ImageField(upload_to="my_pic",blank=True)
    proj_name=models.CharField(max_length=200)
    proj_category=models.CharField(max_length=500)
    rate=models.IntegerField()    
    review=models.TextField(max_length=100)
    details=models.TextField()       
    project_type=models.CharField(max_length=100)       
    proj_id=models.IntegerField()

class Projectbooking(models.Model):
    
    date = models.DateField(default=datetime.date.today)
    time=models.TimeField(auto_now_add=True, blank=True)
    status=models.CharField(max_length=500)
    user=models.CharField(max_length=100)    
    prod_name=models.CharField(max_length=100)
    rate=models.IntegerField()       
    proj_category=models.CharField(max_length=100)       
    desc=models.TextField()
    
class pmsModel(models.Model):
    
    pic=models.ImageField(upload_to="my_pic",blank=True)
    prod_name=models.CharField(max_length=200)
    prod_category=models.CharField(max_length=100)
    inv_count=models.IntegerField()
    rate=models.IntegerField()        
    prod_id=models.IntegerField()

class SupportDetails(models.Model): 
    pic=models.ImageField(upload_to="my_pic",blank=True)   
    member_name=models.CharField(max_length=100)
    phone=models.CharField(max_length=100)
    note=models.TextField()
    inv_count=models.IntegerField()
    c_id=models.CharField(max_length=100)
    