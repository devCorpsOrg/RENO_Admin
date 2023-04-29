from django.db import models
import datetime
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail  
from django.db import models as m
import uuid
import random



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
    def nameFile(instance, filename):
          filename_list = filename.split(".")
          filename = "usercreate"+"_"+instance.username+"_"+filename_list[0]+"."+filename_list[-1]
          return '/'.join(['usercreate', str(instance.username), filename])   
    username=models.CharField(max_length=100,unique=True)
    about=models.TextField(blank=True)
    name=models.CharField(max_length=100,blank=True)
    status=models.CharField(max_length=100,blank=True)
    email=models.EmailField(max_length=256)
    phone=models.CharField(max_length=100)
    role=models.CharField(max_length=100)
    uid=models.IntegerField(primary_key=True)
    pic=models.ImageField(upload_to=nameFile)
    is_suspend=models.IntegerField(choices=((0,0),(1,1)),default=0)
    suspend_reason=models.TextField(null=True,blank=True)

class Purchased_item(models.Model):
    def nameFile(instance, filename):
          filename_list = filename.split(".")
          filename = "purchased"+"_"+instance.p_name+"_"+filename_list[0]+"."+filename_list[-1]
          return '/'.join(['purchased', str(instance.p_name), filename])
       
    UserPK=models.ForeignKey(Userdetails,on_delete=models.CASCADE)
    pid=models.CharField(primary_key=True, default=uuid.uuid4,max_length=200)
    pic=models.ImageField(upload_to=nameFile,blank=True)
    purchase_date=models.DateField(auto_now_add=True)
    p_rating=models.IntegerField()
    p_name=models.CharField(max_length=100)
    p_url=models.CharField(max_length=100)

class User_Product(models.Model):
    def nameFile(instance, filename):
          filename_list = filename.split(".")
          filename = "product"+"_"+instance.p_name+"_"+filename_list[0]+"."+filename_list[-1]
          return '/'.join(['product', str(instance.p_name), filename])
    UserPK=models.ForeignKey(Userdetails,on_delete=models.CASCADE)
    pid=models.CharField(primary_key=True, default=uuid.uuid4,max_length=200)
    pic=models.ImageField(upload_to=nameFile,blank=True)
    purchase_date=models.DateField(auto_now_add=True)
    p_rating=models.IntegerField()
    p_name=models.CharField(max_length=100)
    p_url=models.CharField(max_length=100)
    
class cmsModel(models.Model):
    def nameFile(instance, filename):
          filename_list = filename.split(".")
          filename = "createpage"+"_"+instance.pagename+"_"+filename_list[0]+"."+filename_list[-1]
          return '/'.join(['createpage', str(instance.pagename), filename])     
    pagename=models.CharField(max_length=100)
    pageid=models.CharField(primary_key=True, default=uuid.uuid4,max_length=200)
    # title=models.CharField(max_length=100)
    content=models.CharField(max_length=100)    
    media=models.ImageField(upload_to=nameFile)

class ProjectManagementModel(models.Model):
    def nameFile(instance, filename):
          filename_list = filename.split(".")
          filename = "addproject"+"_"+instance. proj_name+"_"+filename_list[0]+"."+filename_list[-1]
          return '/'.join(['addproject', str(instance.proj_name), filename])     
   
    pic=models.ImageField(upload_to=nameFile)
    proj_name=models.CharField(max_length=200)
    proj_category=models.CharField(max_length=500)
    rate=models.IntegerField()    
    review=models.IntegerField(default=0,blank=True)
    details=models.TextField()       
    project_type=models.CharField(max_length=100,default='Featured',blank=True,null=True)       
    proj_id=models.CharField(primary_key=True, default=uuid.uuid4,max_length=200)

class Projectbooking(models.Model):
    id=models.CharField(primary_key=True, default=uuid.uuid4,max_length=200)
    date = models.DateField(default=datetime.date.today)
    time=models.TimeField(auto_now_add=True, blank=True)
    status=models.CharField(max_length=500)
    user=models.CharField(max_length=100)    
    prod_name=models.CharField(max_length=100)
    rate=models.IntegerField()       
    proj_category=models.CharField(max_length=100)       
    desc=models.TextField()
    
class pmsModel(models.Model): 
    def nameFile(instance, filename):
          filename_list = filename.split(".")
          filename = "addpromoted"+"_"+instance.prod_name+"_"+filename_list[0]+"."+filename_list[-1]
          return '/'.join(['addpromoted', str(instance.prod_name), filename])       
    pic=models.ImageField(upload_to=nameFile)
    prod_name=models.CharField(max_length=200)
    prod_category=models.CharField(max_length=100)
    inv_count=models.IntegerField(blank=True,default=0)
    rate=models.IntegerField(blank=True)        
    prod_id=models.CharField(primary_key=True, default=uuid.uuid4,max_length=200)
    project_details=models.CharField(max_length=200)
   

class SupportDetails(models.Model): 
    def nameFile(instance, filename):
          filename_list = filename.split(".")
          filename = "support"+"_"+instance.registerar+"_"+filename_list[0]+"."+filename_list[-1]
          return '/'.join(['support', str(instance.registerar), filename]) 
   
    pic=models.ImageField(upload_to=nameFile)   
    registerar=models.CharField(max_length=100)
    subject=models.CharField(max_length=100)
    message=models.TextField()
    status=models.CharField(max_length=100)
    support_id=models.CharField(primary_key=True, default=uuid.uuid4,max_length=200)

class config_setting(models.Model):
     id=models.CharField(primary_key=True, default=uuid.uuid4,max_length=200)
     username=models.CharField(max_length=100,unique=True,default="")
     sitename=models.CharField(max_length=100)
     url=models.CharField(max_length=100)
     email=models.CharField(max_length=100)
     smtp_details =models.CharField(max_length=100)

class listings(models.Model):
      def nameFile(instance, filename):
          filename_list = filename.split(".")
          filename = "listings"+"_"+instance.service+"_"+filename_list[0]+"."+filename_list[-1]
          return '/'.join(['listings', str(instance.service), filename])     
   
      pic_url=models.ImageField(upload_to=nameFile)
      id=models.CharField(primary_key=True, default=uuid.uuid4,max_length=200)
      service=models.CharField(max_length=100)
      desc=models.CharField(max_length=100)
      rate=models.IntegerField(blank=True)
    
   
# class dashboard(models.Model):
#      id=models.CharField(primary_key=True, default=uuid.uuid4,max_length=200)
#      username=models.CharField(max_length=100,unique=True,default="")
#      sitename=models.CharField(max_length=100)
#      url=models.CharField(max_length=100)
#      email=models.CharField(max_length=100)
#      smtp_details =models.CharField(max_length=100)

    
#==========================================================================================================

class Customers(m.Model):
    id = m.CharField(primary_key=True, default=uuid.uuid4, max_length=200)
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
    id = m.CharField(primary_key=True, default=uuid.uuid4, max_length=200)
    pic_url = m.URLField()
    prod_name = m.CharField(max_length=100, blank=False, null=False)
    review = m.TextField(blank=False, null=False)
    amt = m.CharField(max_length=50)
    reviewer_name = m.CharField(max_length=100)


class Transactions(m.Model):
    id = m.CharField(primary_key=True, default=uuid.uuid4, max_length=200)
    pic_url = m.URLField()
    prod_name = m.CharField(max_length=100, blank=False, null=False)
    user = m.CharField(max_length=200, blank=False, null=False)
    desc = m.TextField()
    amt = m.CharField(max_length=50)
    datetime = m.DateTimeField()


class Products(m.Model):
    id = m.CharField(primary_key=True, default=uuid.uuid4, max_length=200)
    pic_url = m.URLField()
    name = m.CharField(max_length=200, blank=False, null=False)
    category = m.CharField(max_length=200)
    proj_category = m.CharField(max_length=200)
    rate = m.CharField(max_length=50)
    inv_count = m.CharField(max_length=50)
    details = m.TextField()
    net_purchase_item_count = m.IntegerField()
    featured_flag = m.IntegerField(default=0, blank=True,null=True)


class CRM(m.Model):
    id = m.CharField(primary_key=True, default=uuid.uuid4, max_length=200)
    usname = m.CharField(max_length=50, blank=False, null=False, unique=True)
    pic_url = m.URLField()
    abt = m.TextField()
    phone = m.CharField(max_length=50)
    net_purchase_amount = m.CharField(max_length=50)
    net_purchase_count = m.IntegerField()
    pts = m.TextField()
