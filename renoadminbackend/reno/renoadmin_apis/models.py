from django.db import models
import datetime
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail  
from django.db import models as m
import uuid


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
    id=models.IntegerField(primary_key=True)
    username=models.CharField(max_length=100)
    about=models.TextField()
    name=models.CharField(max_length=100,default='SOME STRING')
    status=models.CharField(max_length=100)
    email=models.EmailField(max_length=256)
    phone=models.CharField(max_length=100)
    role=models.CharField(max_length=100)
    uid=models.IntegerField(unique=True)
    pic=models.ImageField(upload_to="my_pic",blank=True)
    is_suspend=models.IntegerField(choices=((0,0),(1,1)),default=0)
    suspend_reason=models.TextField(null=True,blank=True)

class Purchased_item(models.Model):
    id=models.IntegerField(primary_key=True)
    UserPK=models.ForeignKey(Userdetails,on_delete=models.CASCADE)
    pid=models.IntegerField(unique=True)
    pic=models.ImageField(upload_to="my_pic",blank=True)
    purchase_date=models.DateField(auto_now_add=True)
    p_rating=models.IntegerField()
    p_name=models.CharField(max_length=100)
    p_url=models.CharField(max_length=100)

class User_Product(models.Model):
    id=models.IntegerField(primary_key=True)
    UserPK=models.ForeignKey(Userdetails,on_delete=models.CASCADE)
    pid=models.IntegerField(unique=True)
    pic=models.ImageField(upload_to="my_pic",blank=True)
    purchase_date=models.DateField(auto_now_add=True)
    p_rating=models.IntegerField()
    p_name=models.CharField(max_length=100)
    p_url=models.CharField(max_length=100)
    
class cmsModel(models.Model): 
    id=models.IntegerField(primary_key=True)
    pagename=models.CharField(max_length=100)
    pageid=models.IntegerField(unique=True)
    title=models.CharField(max_length=100)
    content=models.CharField(max_length=100)    
    media=models.ImageField(upload_to="my_pic",blank=True)

class ProjectManagementModel(models.Model):
    id=models.IntegerField(primary_key=True)
    pic=models.ImageField(upload_to="my_pic",blank=True)
    proj_name=models.CharField(max_length=200)
    proj_category=models.CharField(max_length=500)
    rate=models.IntegerField()    
    review=models.TextField(max_length=100)
    details=models.TextField()       
    project_type=models.CharField(max_length=100)       
    proj_id=models.IntegerField(unique=True)

class Projectbooking(models.Model):
    id=models.IntegerField(primary_key=True)
    date = models.DateField(default=datetime.date.today)
    time=models.TimeField(auto_now_add=True, blank=True)
    status=models.CharField(max_length=500)
    user=models.CharField(max_length=100)    
    prod_name=models.CharField(max_length=100)
    rate=models.IntegerField()       
    proj_category=models.CharField(max_length=100)       
    desc=models.TextField()
    
class pmsModel(models.Model):
    id=models.IntegerField(primary_key=True)
    pic=models.ImageField(upload_to="my_pic",blank=True)
    prod_name=models.CharField(max_length=200)
    prod_category=models.CharField(max_length=100)
    inv_count=models.IntegerField()
    rate=models.IntegerField()        
    prod_id=models.IntegerField(unique=True)

class SupportDetails(models.Model): 
    id=models.IntegerField(primary_key=True)
    pic=models.ImageField(upload_to="my_pic",blank=True)   
    registerar=models.CharField(max_length=100)
    subject=models.CharField(max_length=100)
    message=models.TextField()
    status=models.CharField(max_length=100)
    support_id=models.IntegerField(unique=True)
    
#==========================================================================================================
class Customers(m.Model):
    id = m.IntegerField(primary_key=True)
    usname = m.CharField(max_length=50, blank=False, null=False, unique=True)
    emai = m.CharField(max_length=64)
    role = m.CharField(max_length=50)
    inv_count = m.IntegerField()
    member_name = m.CharField(max_length=100, blank=False, null=False)
    note = m.TextField()
    phone = m.CharField(max_length=50)
    pic_url = m.URLField()
    is_suspended = m.IntegerField(default=0)

    class Meta:
        verbose_name_plural = "Customers"

    def __str__(self):
        return f"{self.usname}"


class Reviews(m.Model):
    id = m.IntegerField(primary_key=True)
    pic_url = m.URLField()
    prod_name = m.CharField(max_length=100, blank=False, null=False)
    review = m.TextField(blank=False, null=False)
    amt = m.CharField(max_length=50)
    reviewer_name = m.CharField(max_length=100)


class Transactions(m.Model):
    id = m.IntegerField(primary_key=True)
    pic_url = m.URLField()
    prod_name = m.CharField(max_length=100, blank=False, null=False)
    user = m.CharField(max_length=200, blank=False, null=False)
    desc = m.TextField()
    amt = m.CharField(max_length=50)
    datetime = m.DateTimeField()


class Products(m.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pic_url = m.URLField()
    name = m.CharField(max_length=200, blank=False, null=False)
    category = m.CharField(max_length=200)
    proj_category = m.CharField(max_length=200)
    rate = m.CharField(max_length=50)
    inv_count = m.CharField(max_length=50)
    details = m.TextField()
    net_purchase_item_count = m.IntegerField()
    featured_flag = m.IntegerField(default=0)


class CRM(m.Model):
    id = m.IntegerField(primary_key=True)
    usname = m.CharField(max_length=50, blank=False, null=False, unique=True)
    pic_url = m.URLField()
    abt = m.TextField()
    phone = m.CharField(max_length=50)
    net_purchase_amount = m.CharField(max_length=50)
    net_purchase_count = m.IntegerField()
    pts = m.TextField()


