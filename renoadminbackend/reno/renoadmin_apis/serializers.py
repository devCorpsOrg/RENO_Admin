from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Userdetails,Purchased_item,User_Product
from .models import cmsModel
from .models import ProjectManagementModel
from .models import Projectbooking
from .models import pmsModel
from .models import SupportDetails,listings,config_setting

#===================================================================================

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email','password')

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


#=====================================================================================
# User Serializer
# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('id', 'username', 'email')

# User Serializer
class UserSerializer2(serializers.ModelSerializer):
    class Meta:
        model = Userdetails
        fields = ('username', 'name','email', 'role', 'status')

# Register Serializer
# class RegisterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('id', 'username', 'email', 'password')
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

#         return user
    

class ChangePasswordSerializer(serializers.Serializer):
    model = User

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

# ------------------------------------------------------------------------------------------------------

class UserSerializers(serializers.ModelSerializer):
    
    class Meta:
        model=Userdetails
        fields="__all__"
        # fields=('pic','username','email','phone','role','uid')

class PurchasedSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=Purchased_item
        fields="__all__"

class UserSerializer5(serializers.ModelSerializer):
    
    class Meta:
        model=Userdetails
        fields="__all__"

class UserSerializer1(serializers.ModelSerializer):
    
    class Meta:
        model=Userdetails
        fields=('pic','username','email','suspend_reason','role')

class ProductSerializer(serializers.ModelSerializer):
        
    class Meta:
        model=User_Product
        fields="__all__"
# ---------------------------------------------------------------------------------------------------

#create serializers here
class cmsSerializer1(serializers.ModelSerializer):
    
    class Meta:
        model=cmsModel
        fields=('pageid','pagename')

class cmsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=cmsModel
        fields="__all__"

#----------------------------------------------------------------------------------
class ProjectManagementSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=ProjectManagementModel
        fields="__all__"
class ProjectbookingSerializer(serializers.ModelSerializer):    
    class Meta:
        model=Projectbooking
        fields="__all__"

class ProjectManagementSerializer1(serializers.ModelSerializer):
    
    class Meta:
        model=ProjectManagementModel
        fields=('pic','proj_name','proj_category','rate','project_type','review')

# class ProjectManagementSerializer2(serializers.ModelSerializer):
    
#     class Meta:
#         model=ProjectManagementModel
#         fields=('pic','proj_name','proj_category','rate','details')

class BookingSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=Projectbooking
        fields="__all__"
#--------------------------------------------------------------------------------------------------
class pmsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=pmsModel
        fields="__all__"

#--------------------------------------------------------------------------------------------------
#create serializers here
class SupportSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=SupportDetails
        fields="__all__"
#------------------------------------------------------------------------------------------------------------
class listingsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=listings
        fields=('pic_url','service','desc','rate')

class SettingSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=config_setting
        fields="__all__"