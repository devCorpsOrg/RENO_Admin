from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializers
from django.contrib.auth import login
from rest_framework import permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from rest_framework import status
from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import ChangePasswordSerializer
from rest_framework.permissions import IsAuthenticated  
from .models import Userdetails 
from .models import Purchased_item
from .models import User_Product,config_setting
# from .models import SuspendUser
from .serializers import UserSerializer,UserSerializer2,listingsSerializer
from .serializers import UserSerializer1, PurchasedSerializer, ProductSerializer ,ProjectbookingSerializer,UserSerializer5, SettingSerializer
# from .serializers import SuspendUserSerializer
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse 
import io
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from .models import cmsModel
from .serializers import cmsSerializer
from .serializers import cmsSerializer1
from .models import ProjectManagementModel
from .models import Projectbooking
import csv
from .serializers import ProjectManagementSerializer
from .serializers import ProjectManagementSerializer1
from .serializers import BookingSerializer
from .models import pmsModel
from .serializers import pmsSerializer
from .models import SupportDetails
from .serializers import SupportSerializer
from django.shortcuts import render, HttpResponse
from .models import *
from django.http import JsonResponse, HttpResponseNotFound, HttpResponseBadRequest
from django.core import serializers
import json
import csv
from django.http import HttpResponse, QueryDict
import time
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
import jwt, datetime
from rest_framework.exceptions import AuthenticationFailed
# from django.contrib.auth import logout as auth_logout
# from django.contrib.auth import get_user_model, logout
# from rest_framework import viewsets, status
# from rest_framework.decorators import action
# from rest_framework.permissions import AllowAny

# Register API
# class RegisterAPI(generics.GenericAPIView):
#     serializer_class = RegisterSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()
#         return Response({
#         "user": UserSerializer(user, context=self.get_serializer_context()).data,
#         "token": AuthToken.objects.create(user)[1]
#         })
        

# def get(self, request, format=None):
#         # simply delete the token to force a login
#         request.user.auth_token.delete()
#         return Response(status=status.HTTP_200_OK)

# class LoginAPI(KnoxLoginView):
#     permission_classes = (permissions.AllowAny,)
#     @csrf_exempt  
#     def post(self, request, format=None):
       
#         # data=request.data
#         # username=data['username']
#         # info=Userdetails.objects.get(username=username)
#         # info=User.objects.get(username=username)
#         serializer = AuthTokenSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data['user']
#         login(request, user)
#         ans=[]
#         # ans.append( serializer['username'])
#         # ans.append( serializer['email'])
#         # ans.append(info.username)
#         # ans.append(info.email)
#         # ans.append(info.uid)
#         # ans.append(info.pic)
#         # and Response(super(LoginAPI, self).post(request, format=None)
#         return  super(LoginAPI, self).post(request, format=None)

    
class ChangePasswordView(generics.UpdateAPIView):
   
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# ----------------------------------------------------------------------------------------------------------
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
class LoginView(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']

        user = User.objects.filter(username=username).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }
        return response


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response



#=============================================================================================================
@csrf_exempt
def user_details(request):
   if request.method=='GET':
   
    try:
        info=Userdetails.objects.filter(is_suspend=0) 
    except Userdetails.DoesNotExist:
            return []
            # res={'msg':'Data Not Found'}
            # json_data=JSONRenderer().render(res)
            # return HttpResponse(json_data,content_type='application/json')
    
    serailizer=UserSerializers(info,many=True);
    
    json_data=JSONRenderer().render(serailizer.data) 
    return HttpResponse(json_data,content_type='application/json')
   
@api_view(['GET'])
@csrf_exempt
def user_History(request):
      if request.method=='GET':
        name=request.query_params['name']
        try:
         info=Userdetails.objects.get(username=name)
        except Userdetails.DoesNotExist:
         return []


        id=info.uid
        print(id)
        info1=Purchased_item.objects.get(UserPK=id)
        info2=User_Product.objects.get(UserPK=id)
        serailizer=UserSerializers(info);
        serailizer1=PurchasedSerializer(info1);
        serailizer2= ProductSerializer(info2);
        res={
            'user data':serailizer.data,
            'Purchased_item':serailizer1.data,
            'Userproduct data':serailizer2.data
            }
        json_data=JSONRenderer().render(res)
        return HttpResponse(json_data,content_type='application/json')
      
@api_view(['POST'])       
@csrf_exempt
def create_user(request):
    # if request.method=='POST':
        # pic=request.FILES["pic"]
        # info=Userdetails.objects.all()
        # info.pic=pic
        # json_data=request.body
        # stream=io.BytesIO(json_data)
        # python_data=JSONParser().parse(stream)
       
        
        serializer= UserSerializer5(data=request.data)
        if serializer.is_valid():
            serializer.save()
            res={'msg':'Data Created Successfully'}
            json_data=JSONRenderer().render(res)
            return HttpResponse(json_data,content_type='application/json')
        return HttpResponse(JSONRenderer().render(serializer.errors),content_type='application/json')

@api_view()
@csrf_exempt
def search_user(request):
     if request.method=='GET':
            name=request.query_params['name']
            try:
              info=Userdetails.objects.get(username=name)
            except Userdetails.DoesNotExist:
              res={'msg':'Data Not Found'}
              json_data=JSONRenderer().render(res)
              return HttpResponse(json_data,content_type='application/json')
            serailizer=UserSerializers(info);
            json_data=JSONRenderer().render(serailizer.data) 
            return HttpResponse(json_data,content_type='application/json')
     
@api_view(['PUT'])   
@csrf_exempt    
def edit_user(request):
     id=request.query_params['id']
     if request.method=='PUT':
        try:
         user_objects=Userdetails.objects.get(uid=id)
        except Userdetails.DoesNotExist:
         res={'msg':'username Not Found'}
         json_data=JSONRenderer().render(res)
         return HttpResponse(json_data,content_type='application/json')

     
        data=request.data
        # stream=io.BytesIO(json_data)
        # python_data=JSONParser().parse(stream)
        
        username=data['username']
        # name=data['name']
        # status=data['status']
        email=data['email']
        phone=data['phone']
        role=data['role']
        # uid=python_data.get('uid',None)
        pic=data['pic']
        uid=data['uid']
        # about=python_data.get('about',None)
        # is_suspend=python_data.get('is_suspend',None)
        # suspend_reason=python_data.get('suspend_reason',None)
        # about=python_data.get('about',None)
 
        
        
        # serailizer=UserSerializer(user_details,many=True);
        user_objects.username=username
        user_objects.email=email
        user_objects.phone=phone
        user_objects.role=role
        user_objects.uid=uid
        user_objects.pic=pic
        # user_objects.about=about
        # user_objects.is_suspend=is_suspend
        # user_objects.suspend_reason=suspend_reason
        # user_objects.name=name
        # user_objects.status=status
        user_objects.save()
        res={'msg':'Data updated Successfully'}
        json_data=JSONRenderer().render(res)
        return HttpResponse(json_data,content_type='application/json')
                    

@api_view(['DELETE'])
@csrf_exempt        
def delete_user(request):
          name=request.query_params['name']
        # json_data=request.body
        # stream=io.BytesIO(json_data)
        # python_data=JSONParser().parse(stream)
        # id=python_data.get('id',None)
        # if id is not None:
          try:
             info=Userdetails.objects.get(username=name)
          except Userdetails.DoesNotExist:
             res={'msg':'User is not present'}
             json_data=JSONRenderer().render(res)
             return HttpResponse(json_data,content_type='application/json')
             
          info.delete()
          res={'msg':'User deleted Successfully'}
          json_data=JSONRenderer().render(res)
          return HttpResponse(json_data,content_type='application/json')

         
@api_view(['GET','POST'])
def suspend_user(request):
    name=request.query_params['name']
    data=request.data
    suspend_reason=data['suspend_reason']
    info=Userdetails.objects.get(username=name)
    if info.is_suspend==1:
        res={'msg':'Already Suspended'}
        json_data=JSONRenderer().render(res)
        return HttpResponse(json_data,content_type='application/json')

    else:
     info.suspend_reason=suspend_reason
     info.is_suspend=1
     info.save()
     res={'msg':'Suspended Successfully'}
     json_data=JSONRenderer().render(res)
     return HttpResponse(json_data,content_type='application/json')
    

@csrf_exempt    
def suspended_users(request):
  if request.method=='GET':
    try:
     info=Userdetails.objects.filter(is_suspend=1)
    except Userdetails.DoesNotExist:
        return []
        #  res={'msg':'User is not present'}
        #  json_data=JSONRenderer().render(res)
        #  return HttpResponse(json_data,content_type='application/json')

     
    
    serailizer=UserSerializer1(info,many=True);
    json_data=JSONRenderer().render(serailizer.data) 
    return HttpResponse(json_data,content_type='application/json')
  
#-----------------------------------------------------------------------------------------------------
@csrf_exempt
def page(request):
   if request.method=='GET':
    
     info=cmsModel.objects.all()
     if info is None:
      res={'msg':'Create a Page'}
      json_data=JSONRenderer().render(res)
      return HttpResponse(json_data,content_type='application/json')
      
     serailizer1=cmsSerializer1(info,many=True)
     
     json_data=JSONRenderer().render(serailizer1.data)
     return HttpResponse(json_data,content_type='application/json') 
    
@api_view(['POST'])
@csrf_exempt
def create_page(request):
    if request.method=='POST':
        # json_data=request.body
        # stream=io.BytesIO(json_data)
        # python_data=JSONParser().parse(stream)
        # python_data['pageid'] = random.getrandbits(32)
        serializer= cmsSerializer(data=request.data)
       

        if serializer.is_valid():
            serializer.save()
            res={'msg':'page Created Successfully'}
            json_data=JSONRenderer().render(res)
            return HttpResponse(json_data,content_type='application/json')
        return HttpResponse(JSONRenderer().render(serializer.errors),content_type='application/json')

@csrf_exempt
@api_view()
def search_page(request):
     if request.method=='GET':
        #   params = request.query_params
        #   name = request.data.get('name')
        #   print(name)
          name=request.query_params['name']
          print(name)
          try:
            info=cmsModel.objects.get(pagename=name)
          except cmsModel.DoesNotExist:
            res={'msg':'page Not Found'}
            json_data=JSONRenderer().render(res)
            return HttpResponse(json_data,content_type='application/json')

          serailizer=cmsSerializer1(info);
           
          json_data=JSONRenderer().render(serailizer.data) 
          return HttpResponse(json_data,content_type='application/json')
           
                      
@csrf_exempt 
@api_view(['PUT'])   
def edit_page(request):
     
        pagename=request.query_params['pagename']
      
        try:
         user_objects=cmsModel.objects.get(pagename=pagename)
        except cmsModel.DoesNotExist:
         res={'msg':'page Not Found'}
         json_data=JSONRenderer().render(res)
         return HttpResponse(json_data,content_type='application/json')
        
       
        data=request.data
        # stream=io.BytesIO(json_data)
        # python_data=JSONParser().parse(stream)
       
        pagename=data['pagename']
        # pageid=python_data.get('pageid',None)
        # title=python_data.get('title',None)
        content=data['content']
        media=data['media']
      
        
     
        user_objects.pagename=pagename
        # user_objects.pageid=pageid
        # user_objects.title=title
        user_objects.content=content
        user_objects.media=media
        user_objects.save()
        serailizer=cmsSerializer(user_objects)
        res={'msg':'page updated Successfully'}
        json_data=JSONRenderer().render(res)
        return HttpResponse(json_data,content_type='application/json')
                    


@api_view(['DELETE']) 
@csrf_exempt        
def delete_page(request):
    #  if request.method=='DELETE':
        id=request.query_params['id']

       
        if id is not None:
          try:
             info=cmsModel.objects.get(pageid=id)
          except cmsModel.DoesNotExist:
             res={'msg':'page is not present'}
             json_data=JSONRenderer().render(res)
             return HttpResponse(json_data,content_type='application/json')
             
             
          info.delete()
          res={'msg':'page deleted Successfully'}
          json_data=JSONRenderer().render(res)
          return HttpResponse(json_data,content_type='application/json')

#-------------------------------------------------------------------------------------------------
@csrf_exempt
def projectbookings(request):
   if request.method=='GET':
     info=Projectbooking.objects.all()
     serailizer1=BookingSerializer(info,many=True);    
     json_data=JSONRenderer().render(serailizer1.data)
     return HttpResponse(json_data,content_type='application/json') 
   
@api_view(['POST'])
@csrf_exempt
def createprojectbookings(request):
    if request.method=='POST':
        # json_data=request.body
        # stream=io.BytesIO(json_data)
        # python_data=JSONParser().parse(stream)
       
        serializer= ProjectbookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            res={'msg':'Data Created Successfully'}
            json_data=JSONRenderer().render(res)
            return HttpResponse(json_data,content_type='application/json')
        return HttpResponse(JSONRenderer().render(serializer.errors),content_type='application/json')
@csrf_exempt
def projects(request):
   if request.method=='GET':
    print("hello")
    try:
     info=ProjectManagementModel.objects.all()
    except ProjectManagementModel.DoesNotExist:
        return []
    #   res={'msg':'DataBase is Empty'}
    #   json_data=JSONRenderer().render(res)
    #   return HttpResponse(json_data,content_type='application/json')

    serailizer1=ProjectManagementSerializer1(info,many=True); 
    # print( serailizer1.data)   
    json_data=JSONRenderer().render(serailizer1.data)
    return HttpResponse(json_data,content_type='application/json') 
   


def featuredprojects(request):
   if request.method=='GET':
     info=ProjectManagementModel.objects.filter(project_type='Featured')
     serailizer1=ProjectManagementSerializer1(info,many=True);    
     json_data=JSONRenderer().render(serailizer1.data)
     return HttpResponse(json_data,content_type='application/json') 



@api_view(['POST'])
@csrf_exempt
def addproject(request):
    # if request.method=='POST':
        # json_data=request.body
        # stream=io.BytesIO(json_data)
        # python_data=JSONParser().parse(stream)
        
        serializer= ProjectManagementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            res={'msg':'Data Created Successfully'}
            json_data=JSONRenderer().render(res)
            return HttpResponse(json_data,content_type='application/json')
        return HttpResponse(JSONRenderer().render(serializer.errors),content_type='application/json')



@api_view()
@csrf_exempt
def searchproject(request):
     if request.method=='GET':
          name=request.query_params['name']
          try:
            info=ProjectManagementModel.objects.get(proj_name=name)
          except ProjectManagementModel.DoesNotExist:
             res={'msg':'Data Not Found'}
             json_data=JSONRenderer().render(res)
             return HttpResponse(json_data,content_type='application/json')
            
                
          serailizer=ProjectManagementSerializer1(info);
           
          json_data=JSONRenderer().render(serailizer.data) 
          return HttpResponse(json_data,content_type='application/json')




@api_view()       
@csrf_exempt
def searchfeaturedprojects(request):
     if request.method=='GET':
          name=request.query_params['name']
          try: 
            info=ProjectManagementModel.objects.get(proj_name=name,project_type='Featured')
          except ProjectManagementModel.DoesNotExist:
            res={'msg':'Data Not Found'}
            json_data=JSONRenderer().render(res)
            return HttpResponse(json_data,content_type='application/json')
            
          serailizer=ProjectManagementSerializer1(info);
           
          json_data=JSONRenderer().render(serailizer.data) 
          return HttpResponse(json_data,content_type='application/json')




@api_view(['PUT'])   
@csrf_exempt    
def editproject(request):
        proj_name=request.query_params['proj_name']
        try:
         user_objects=ProjectManagementModel.objects.get(proj_name=proj_name)
        except ProjectManagementModel.DoesNotExist:
         res={'msg':'data Not Found'}
         json_data=JSONRenderer().render(res)
         return HttpResponse(json_data,content_type='application/json')

        data=request.data
        # stream=io.BytesIO(json_data)
        # python_data=JSONParser().parse(stream)
        
        pic=data['pic']
        proj_name=data['proj_name']
        proj_category=data['proj_category']
        rate=data['rate']
        # review=data['review']
        details=data['details']
        # project_type=data['project_type']
        # proj_id=python_data.get('proj_id',None)        
        user_objects.pic= pic
        user_objects.proj_name= proj_name
        user_objects.proj_category= proj_category
        user_objects.rate=rate
        # user_objects.review=review
        user_objects.details= details
        # user_objects.project_type=project_type
        
        user_objects.save()
        serailizer=ProjectManagementSerializer(user_objects)
        res={'msg':'Data updated Successfully'}
        json_data=JSONRenderer().render(res)
        return HttpResponse(json_data,content_type='application/json')




@api_view(['DELETE'])
@csrf_exempt        
def deleteproject(request):
     
        id=request.query_params['id']
        # json_data=request.body
        # stream=io.BytesIO(json_data)
        # python_data=JSONParser().parse(stream)
        # id=python_data.get('pageid',None)
       
        print(id)
        if id is not None:
          try:
             info=ProjectManagementModel.objects.get(proj_id=id)
          except ProjectManagementModel.DoesNotExist:
              res={'msg':'Data not present'}
              json_data=JSONRenderer().render(res)
              return HttpResponse(json_data,content_type='application/json')
             
             
          info.delete()
          res={'msg':'Data deleted Successfully'}
          json_data=JSONRenderer().render(res)
          return HttpResponse(json_data,content_type='application/json')
      
def export(request):
    response = HttpResponse(content_type='text/csv')  
    response['Content-Disposition'] = 'attachment; filename="file.csv"'  
    employees = ProjectManagementModel.objects.all()  
    writer = csv.writer(response)  
    for employee in employees:  
        writer.writerow([employee.pic,employee.proj_name,employee.proj_category,employee.rate,employee.review,employee.project_type])  
    return response  



#-------------------------------------------------------------------------------------------------------------
@csrf_exempt
def promotions(request):
   if request.method=='GET':
     info=pmsModel.objects.all()
     serailizer1=pmsSerializer(info,many=True);
    #  res={
    #      'pageid':info.pageid,
    #      'pagename':info.pagename
    #      }
    
     json_data=JSONRenderer().render(serailizer1.data)
     return HttpResponse(json_data,content_type='application/json') 
    # serailizer=cmsSerializer(info);
    # json_data=JSONRenderer().render(serailizer.data) 
    # return HttpResponse(json_data,content_type='application/json')
@api_view(['POST'])
@csrf_exempt
def addpromoted(request):
    # if request.method=='POST':
        # json_data=request.body
        # stream=io.BytesIO(json_data)
        # python_data=JSONParser().parse(stream)
       
        serializer= pmsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            res={'msg':'Data Created Successfully'}
            json_data=JSONRenderer().render(res)
            return HttpResponse(json_data,content_type='application/json')
        return HttpResponse(JSONRenderer().render(serializer.errors),content_type='application/json')
    
@api_view(['GET'])
@csrf_exempt
def searchpromoted(request):
    
            name=request.query_params['name']
            info=pmsModel.objects.get(prod_name=name)
            serailizer=pmsSerializer(info);
           
            json_data=JSONRenderer().render(serailizer.data) 
            return HttpResponse(json_data,content_type='application/json')
           
                    

@api_view(['PUT'])   
@csrf_exempt    
def editpromoted(request):
     
        prod_name=request.query_params['prod_name']
        try:
         user_objects=pmsModel.objects.get(prod_name=prod_name)
        except pmsModel.DoesNotExist:
         res={'msg':'data Not Found'}
         json_data=JSONRenderer().render(res)
         return HttpResponse(json_data,content_type='application/json')
        
        data=request.data
        # stream=io.BytesIO(json_data)
        # python_data=JSONParser().parse(stream)
        
        pic=data['pic']
        prod_name=data['prod_name']
        prod_category=data['prod_category']
        inv_count=data['inv_count']
        rate=data['rate']
        project_details=data['project_details']
        # prod_id=python_data.get('prod_id',None)
      
        
        user_objects.pic= pic
        user_objects.prod_name= prod_name
        user_objects.prod_category=prod_category
        user_objects.inv_count= inv_count
        user_objects.rate= rate
        user_objects.project_details=project_details
        # user_objects. prod_id= prod_id
        user_objects.save()
        serailizer=pmsSerializer(user_objects)
        res={'msg':'Data updated Successfully'}
        json_data=JSONRenderer().render(res)
        return HttpResponse(json_data,content_type='application/json')
                    

@api_view(['DELETE'])
@csrf_exempt        
def deletepromoted(request):
     
        id=request.query_params['id']
        # json_data=request.body
        # stream=io.BytesIO(json_data)
        # python_data=JSONParser().parse(stream)
        # id=python_data.get('pageid',None)
        id=id
        print(id)
        if id is not None:
             info=pmsModel.objects.get(pageid=id)
             info.delete()
             res={'msg':'Data deleted Successfully'}
             json_data=JSONRenderer().render(res)
             return HttpResponse(json_data,content_type='application/json')

#-----------------------------------------------------------------------------------------------------
def usersupport(request):
   if request.method=='GET':
    info=SupportDetails.objects.all() 
    serailizer=SupportSerializer(info,many=True);
    json_data=JSONRenderer().render(serailizer.data) 
    return HttpResponse(json_data,content_type='application/json')
   
@api_view(['DELETE'])
@csrf_exempt 
def delete_records(request):
        id=request.query_params['id']
      #   json_data=request.body
      #   stream=io.BytesIO(json_data)
      #   python_data=JSONParser().parse(stream)
      #   id=python_data.get('id',None)
        
        if id is not None:
             info=SupportDetails.objects.get(support_id=id)
             info.delete()
             res={'msg':'Data updated Successfully'}
             json_data=JSONRenderer().render(res)
             return HttpResponse(json_data,content_type='application/json')
#-----------------------------------------------------------------------------------------------------------
@api_view(['POST'])
@csrf_exempt
def settings(request):
  
       serializer=SettingSerializer(data=request.data)
       if serializer.is_valid():
            serializer.save()
            res={'msg':'Data Created Successfully'}
            json_data=JSONRenderer().render(res)
            return HttpResponse(json_data,content_type='application/json')
       return HttpResponse(JSONRenderer().render(serializer.errors),content_type='application/json')
#---------------------------------------------------------------------------------------------------------------
@csrf_exempt
def listing(request):
   if request.method=='GET':
   
    try:
        info=listings.objects.all()
    except listings.DoesNotExist:
            return []
            # res={'msg':'Data Not Found'}
            # json_data=JSONRenderer().render(res)
            # return HttpResponse(json_data,content_type='application/json')
    
    serailizer=listingsSerializer(info,many=True);
    
    json_data=JSONRenderer().render(serailizer.data) 
    return HttpResponse(json_data,content_type='application/json')

      
@api_view(['POST'])       
@csrf_exempt
def add_listing(request):
    # if request.method=='POST':
        # pic=request.FILES["pic"]
        # info=Userdetails.objects.all()
        # info.pic=pic
        # json_data=request.body
        # stream=io.BytesIO(json_data)
        # python_data=JSONParser().parse(stream)
       
        
        serializer= listingsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            res={'msg':'Data Created Successfully'}
            json_data=JSONRenderer().render(res)
            return HttpResponse(json_data,content_type='application/json')
        return HttpResponse(JSONRenderer().render(serializer.errors),content_type='application/json')

@api_view()
@csrf_exempt
def search_listing(request):
     if request.method=='GET':
            id=request.query_params['id']
            try:
              info=listings.objects.get(id=id)
            except listings.DoesNotExist:
              res={'msg':'Data Not Found'}
              json_data=JSONRenderer().render(res)
              return HttpResponse(json_data,content_type='application/json')
            serailizer=listingsSerializer(info);
            json_data=JSONRenderer().render(serailizer.data) 
            return HttpResponse(json_data,content_type='application/json')
     
@api_view(['PUT'])   
@csrf_exempt    
def edit_listing(request):
     service=request.query_params['service']
     if request.method=='PUT':
        try:
         user_objects=listings.objects.get(service=service)
        except listings.DoesNotExist:
         res={'msg':'username Not Found'}
         json_data=JSONRenderer().render(res)
         return HttpResponse(json_data,content_type='application/json')

     
        data=request.data
        # stream=io.BytesIO(json_data)
        # python_data=JSONParser().parse(stream)
        
        service=data['service']
        desc=data['desc']  
        pic_url=data['pic_url']
        rate=data['rate']
        print(service)
        user_objects.service=service
        user_objects.desc=desc
        user_objects.pic_url= pic_url
        user_objects.rate=rate
       
        user_objects.save()
        res={'msg':'Data updated Successfully'}
        json_data=JSONRenderer().render(res)
        return HttpResponse(json_data,content_type='application/json')
                    

@api_view(['DELETE'])
@csrf_exempt        
def delete_listing(request):
          id=request.query_params['id']
        # json_data=request.body
        # stream=io.BytesIO(json_data)
        # python_data=JSONParser().parse(stream)
        # id=python_data.get('id',None)
        # if id is not None:
          try:
             info=listings.objects.get(id=id)
          except listings.DoesNotExist:
             res={'msg':'not present'}
             json_data=JSONRenderer().render(res)
             return HttpResponse(json_data,content_type='application/json')
             
          info.delete()
          res={'msg':'deleted Successfully'}
          json_data=JSONRenderer().render(res)
          return HttpResponse(json_data,content_type='application/json')


#===========================================================================================================
#===========================================================================================================
#===========================================================================================================
@api_view(['GET'])
def customers(request):
    customers = Customers.objects.filter(is_suspended=0).only('pic_url', 'member_name', 'phone', 'note', 'inv_count', 'id').all()
    data = serializers.serialize('json', customers)
    formatted_data = json.dumps(json.loads(data), indent=4)  # Indent the JSON data
    return HttpResponse(formatted_data, content_type='application/json')


@api_view(['GET'])
def search_customers(request):
    id = request.query_params['id']    
    customer = Customers.objects.filter(id=id).only('pic_url', 'member_name', 'phone', 'note', 'inv_count', 'id').first()

    if customer:
        if customer.is_suspended:
            return HttpResponseBadRequest('Customer is suspended.')

        data = serializers.serialize('json', [customer])
        formatted_data = json.dumps(json.loads(data), indent=4)
        return HttpResponse(formatted_data, content_type='application/json')
    else:
        return JsonResponse([], safe=False)


@api_view(['GET'])
def export_customers(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="renovation_customers.csv"'

    writer = csv.writer(response)
    writer.writerow(['pic_url', 'member_name', 'phone', 'note', 'inv_count', 'id'])

    for customer in Customers.objects.all():
        writer.writerow([customer.pic_url, customer.member_name, customer.phone, customer.note, customer.inv_count, customer.id])

    return response


@api_view(['DELETE'])
def delete_customer(request):
    id = request.query_params['id']
    customer = Customers.objects.filter(id=id).first()

    if customer:
        customer.delete()
        return HttpResponse('OK', status=200)
    else:
        return HttpResponseNotFound('Customer not found.')


@api_view(['PUT'])
@csrf_exempt
def edit_customer(request):
    member_name = request.query_params['member_name']
    
    # customer = Customers.objects.filter(id=id, is_suspended=0).values('id', 'usname', 'emai', 'phone', 'role', 'pic_url', 'note').first()
    customer = Customers.objects.filter(member_name=member_name, is_suspended=0).first()
    
    if not customer:
        return HttpResponseNotFound('Customer not found.')
    
    params = QueryDict(request.body)
    customer.note = params['note']
    customer.emai = params['emai']
    customer.member_name = params['member_name']
    customer.phone = params['phone']
    # if 'pic_url' in request.FILES:
    #     customer.pic_url = request.FILES['pic_url']
    customer.role = params['role']
    customer.id = params['uid']
    customer.usname = params['usname']
    
    customer.save()

    data = serializers.serialize('json', [customer])
    formatted_data = json.dumps(json.loads(data), indent=4)  # Indent the JSON data
    return HttpResponse(formatted_data, content_type='application/json')


@api_view(['GET'])
def suspend_customer(request):
    id = request.query_params['id']
    customer = Customers.objects.filter(id=id).first()
    
    if customer:
        customer.is_suspended = 1
        customer.save()
        return HttpResponse('OK', status=200)
    else:
        return HttpResponseNotFound('Customer not found.')


@api_view(['GET'])
def suspended_customers(request):
    customers = Customers.objects.filter(is_suspended=1).all()

    data = serializers.serialize('json', customers)
    formatted_data = json.dumps(json.loads(data), indent=4)
    return HttpResponse(formatted_data, content_type='application/json')


# reviews
@api_view(['GET'])
def reviews(request):
    reviews = Reviews.objects.only('prod_name', 'pic_url', 'review', 'amt', 'id').all()

    data = serializers.serialize('json', reviews)
    formatted_data = json.dumps(json.loads(data), indent=4)  # Indent the JSON data
    return HttpResponse(formatted_data, content_type='application/json')


@api_view(['DELETE'])
def delete_review(request):
    id = request.query_params['id']
    review = Reviews.objects.filter(id=id).first()

    if review:
        review.delete()
        return HttpResponse('OK', status=200)
    else:
        return HttpResponseNotFound('Review not found.')
    

@api_view(['GET'])
def review(request):
    id = request.query_params['id']
    review = Reviews.objects.filter(id=id).first()

    if review:
        data = serializers.serialize('json', [review])
        formatted_data = json.dumps(json.loads(data), indent=4)  # Indent the JSON data
        return HttpResponse(formatted_data, content_type='application/json')
    else:
        return HttpResponseNotFound('Review not found.')
    

@api_view(['GET'])
def purchases(request):
    transactions = Transactions.objects.all()

    data = serializers.serialize('json', transactions)
    formatted_data = json.dumps(json.loads(data), indent=4)  # Indent the JSON data
    return HttpResponse(formatted_data, content_type='application/json')


@api_view(['GET'])
def search_transactions(request):
    prod_name = request.query_params['prod_name']
    transactions = Transactions.objects.filter(prod_name=prod_name).all()

    if transactions:
        data = serializers.serialize('json', transactions)
        formatted_data = json.dumps(json.loads(data), indent=4)  # Indent the JSON data
        return HttpResponse(formatted_data, content_type='application/json')
    else:
        return JsonResponse([], safe=False)

#19fb320a59ed89e51795724776fa5550e6792188d0222e9486ccdb8bd59a5c0d
# IMS - products
@api_view(['GET'])
def products(request):
    products = Products.objects.all()

    data = serializers.serialize('json', products)
    formatted_data = json.dumps(json.loads(data), indent=4)  # Indent the JSON data
    return HttpResponse(formatted_data, content_type='application/json')


@api_view(['GET'])
def search_products(request):
    name = request.query_params['name']
    product = Products.objects.filter(name=name).first()

    if product:
        data = serializers.serialize('json', [product])
        formatted_data = json.dumps(json.loads(data), indent=4)  # Indent the JSON data
        return HttpResponse(formatted_data, content_type='application/json')
    else:
        return JsonResponse([], safe=False)


@api_view(['GET'])
def export_products(request):
    file_format = request.query_params['file_format']
    products = Products.objects.all()

    if (file_format == 'json' or file_format == 'csv') and not products:
        return JsonResponse([], safe=False)
    
    if file_format == 'json':
        data = serializers.serialize('json', products)
        response = HttpResponse(data, content_type='application/json')
        response['Content-Disposition'] = 'attachment; filename="renovation_products.json"'
        return response
    elif file_format == 'csv':
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="renovation_products.csv"'

        writer = csv.writer(response)
        writer.writerow(['id', 'pic_url', 'name', 'category', 'proj_category', 'rate', 'inv_count', 'details', 'net_purchase_item_count', 'featured_flag'])

        for product in Products.objects.all():
            writer.writerow([product.id, product.pic_url, product.name, product.name, product.category, product.proj_category, product.rate, product.inv_count, product.details, product.net_purchase_item_count, product.featured_flag])

        return response
    else:
        return HttpResponseBadRequest('Invalid file format..')


@api_view(['PUT'])
@csrf_exempt
def edit_products(request):
    prod_name = request.query_params['prod_name']
    product = Products.objects.filter(name=prod_name).first()

    if product:
        params = QueryDict(request.body)
        product.name = params['prod_name']
        product.category = params['prod_category']
        product.proj_category = params['proj_category']
        product.rate = params['rate']
        product.inv_count = params['inv_count']
        product.details = params['details']

        product.save()

        return HttpResponse(f'Product with ID: {prod_name} edited successfully.', status=200)
    else:
        return HttpResponseNotFound('Product not found.')


@api_view(['POST'])
@csrf_exempt
def add_products(request):
    if request.method == 'POST':
        name = request.POST['prod_name']
        category = request.POST['prod_category']
        proj_category = request.POST['proj_category']
        rate = request.POST['rate']
        inv_count = request.POST['inv_count']
        pic_url = None
        if 'pic_url' in request.FILES:
            pic_url = request.FILES['pic_url']            
        details = request.POST['details']
        # featured_flag = int(request.POST['featured_flag'])

        product = Products(name=name, category=category, proj_category=proj_category, rate=rate, inv_count=inv_count, pic_url=pic_url, details=details)
        product.save()

        return HttpResponse(f'Product with name: {name} added successfully.', status=200)
    else:
        return HttpResponseBadRequest('Invalid request type.')


@api_view(['DELETE'])
def delete_products(request):
    id = request.query_params['id']
    product = Products.objects.filter(id=id).first()

    if product:
        product.delete()
        return HttpResponse(f'Product with ID: {id} deleted successfully.', status=200)
    else:
        return HttpResponseNotFound('Product not found.')


@api_view(['GET'])
def export_featured_products(request):
    file_format = request.query_params['file_format']
    products = Products.objects.filter(featured_flag=1).all()
    
    if (file_format == 'json' or file_format == 'csv') and not products:
        return JsonResponse([], safe=False)
    
    elif file_format == 'json':
        data = serializers.serialize('json', products)
        response = HttpResponse(data, content_type='application/json')
        response['Content-Disposition'] = 'attachment; filename="renovation_featured_products.json"'
        return response
    elif file_format == 'csv':
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="renovation_featured_products.csv"'

        writer = csv.writer(response)
        writer.writerow(['id', 'pic_url', 'name', 'category', 'proj_category', 'rate', 'inv_count', 'details', 'net_purchase_item_count', 'featured_flag'])

        for product in Products.objects.all():
            writer.writerow([product.id, product.pic_url, product.name, product.name, product.category, product.proj_category, product.rate, product.inv_count, product.details, product.net_purchase_item_count, product.featured_flag])

        return response
    else:
        return HttpResponseBadRequest('Invalid file format..')


@api_view(['GET'])
def featured_products(request):
    products = Products.objects.filter(featured_flag=1).all()

    if featured_products:
        data = serializers.serialize('json', products)
        formatted_data = json.dumps(json.loads(data), indent=4)  # Indent the JSON data
        return HttpResponse(formatted_data, content_type='application/json')
    else:
        return HttpResponseNotFound('Featured Products not found.')


# CRM - members
@api_view(['GET'])
def members(request):
    members = CRM.objects.all()
    data = serializers.serialize('json', members)
    formatted_data = json.dumps(json.loads(data), indent=4)  # Indent the JSON data
    return HttpResponse(formatted_data, content_type='application/json')


@api_view(['GET'])
def search_member(request):
    usname = request.query_params['usname']
    member = CRM.objects.filter(usname=usname).first()

    if member:
        data = serializers.serialize('json', [member])
        formatted_data = json.dumps(json.loads(data), indent=4)
        return HttpResponse(formatted_data, content_type='application/json')
    else:
        return JsonResponse([], safe=False)
    

@api_view(['DELETE'])
def delete_member(request):
    usname = request.query_params['usname']
    member = CRM.objects.filter(usname=usname).first()

    if member:
        member.delete()
        return HttpResponse(f'Member with username: {usname} deleted successfully.', status=200)
    else:
        return HttpResponseNotFound('Member not found.')


@api_view(['GET'])
def member_details(request):
    usname = request.query_params['usname']
    member = CRM.objects.filter(usname=usname).first()

    if member:
        data = serializers.serialize('json', [member])
        formatted_data = json.dumps(json.loads(data), indent=4)
        return HttpResponse(formatted_data, content_type='application/json')
    else:
        return JsonResponse([], safe=False)
    

@api_view(['GET'])
def export_members(request):
    file_format = request.query_params['file_format']
    if file_format == 'json':
        members = CRM.objects.all()
        data = serializers.serialize('json', members)
        response = HttpResponse(data, content_type='application/json')
        response['Content-Disposition'] = 'attachment; filename="renovation_featured_products.json"'
        return response
    elif file_format == 'csv':
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="renovation_customers.csv"'

        writer = csv.writer(response)
        writer.writerow(['id', 'usname', 'pic_url', 'abt', 'phone', 'net_purchase_amount', 'net_purchase_count', 'pts'])

        for member in CRM.objects.all():
            writer.writerow([member.id, member.usname, member.pic_url, member.abt, member.phone, member.net_purchase_amount, member.net_purchase_count, member.pts])

    return response

@api_view(['GET'])
def roles(request):
    # try:
    #     info=Userdetails.objects.all() 
    # except Userdetails.DoesNotExist:
    #         res={'msg':'Data Not Found'}
    #         json_data=JSONRenderer().render(res)
    #         return HttpResponse(json_data,content_type='application/json')

    # serailizer=UserSerializer2(info,many=True);
    # json_data=JSONRenderer().render(serailizer.data) 
    # return HttpResponse(json_data,content_type='application/json')
    
    roles = Roles.objects.all()
    data = serializers.serialize('json', roles)
    formatted_data = json.dumps(json.loads(data), indent=4)  # Indent the JSON data
    return HttpResponse(formatted_data, content_type='application/json')


@api_view(['POST'])
def create_role(request):
    # # usname,name,email,role(admin/marketplace/superadmin),status
    # username = request.POST['username']
    # user = Userdetails.objects.filter(username=username).first()
    # if user:
    #     role = request.POST['role']
    #     if role == 'admin' or role == 'marketplace' or role == 'superadmin':
    #         return HttpResponse(f'User role for username: {username} created successfully.')

    data = json.loads(request.body)
    username = data['username']
    user = Userdetails.objects.filter(username=username).first()
    if user:
        role = data['role']
        status = data['status']
        email = data['email']
        if role == 'Admin' or role == 'Editor' or role == 'Viewer':
            role = Roles(usname=user.username, name=user.name, email=email, status=status, role=role)
            role.save()
            return HttpResponse(f'Role for username: {username} created successfully.')
        else:
            return HttpResponseBadRequest('Invalid role.')
    else:
        return HttpResponseNotFound('User not found.')


@api_view(['GET'])
def search_role(request):
    usname = request.query_params['username']
    # users = Users.objects.filter(name=name).only('usname', 'name', 'role', 'status').all()
    roles = Roles.objects.filter(usname=usname).only('usname', 'name', 'role', 'status').all()

    if roles:
        data = serializers.serialize('json', roles)
        formatted_data = json.dumps(json.loads(data), indent=4)
        return HttpResponse(formatted_data, content_type='application/json')
    else:
        return HttpResponseNotFound(f'Role/s with usname: {usname} not found.')
        # return HttpResponseNotFound(f'User(s) with name: {name} not found.')


@api_view(['DELETE'])
def delete_role(request):
    usname = request.query_params['usname']
    # user = Users.objects.filter(usname=usname).first()
    role = Roles.objects.filter(usname=usname).first()

    if role:
        role.delete()
        return HttpResponse(f'Role for username: {usname} deleted successfully.', status=200)
    else:
        return HttpResponseNotFound('Role not found.')


@api_view(['GET'])
def categories(request):
    categories = Categories.objects.all()
    data = serializers.serialize('json', categories)
    formatted_data = json.dumps(json.loads(data), indent=4)
    return HttpResponse(formatted_data, content_type='application/json')


@api_view(['GET'])
def search_category(request):
    prod_category = request.query_params['prod_category']
    category = Categories.objects.filter(prod_category=prod_category)
    data = serializers.serialize('json', category)
    formatted_data = json.dumps(json.loads(data), indent=4)
    return HttpResponse(formatted_data, content_type='application/json')


@api_view(['GET'])
def export_categories(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="categories.csv"'

    writer = csv.writer(response)
    writer.writerow(['id', 'prod_category', 'pic_url'])

    for category in Categories.objects.all():
        writer.writerow([category.id, category.prod_category, category.pic_url])

    return response


@api_view(['POST'])
def add_category(request):
    prod_category = request.POST['prod_category']
    pic_url = None
    if 'pic_url' in request.FILES:
        pic_url = request.FILES['pic_url']

    category = Categories(prod_category=prod_category, pic_url=pic_url)
    category.save()

    return HttpResponse(f'Category: {prod_category} added successfully.', status=200)


@api_view(['PUT'])
def edit_category(request):
    prod_category = request.query_params['prod_category']
    category = Categories.objects.filter(prod_category=prod_category).first()
    
    if category:
        data = request.data
        category.prod_category = data['prod_category']
        category.save()

        return HttpResponse(f'Category with ID: {prod_category} edited successfully.', status=200)
    else:
        return HttpResponseNotFound('Category not found.')


@api_view(['DELETE'])
def delete_category(request):
    id = request.query_params['catgid']
    category = Categories.objects.filter(id=id).first()

    if category:
        category.delete()
        return HttpResponse(f'Category with ID: {id} deleted successfully.', status=200)
    else:
        return HttpResponseNotFound('Category not found.')
    

@api_view(['GET'])
def deals(request):
    deals = Deals.objects.all()
    data = serializers.serialize('json', deals)
    formatted_data = json.dumps(json.loads(data), indent=4)
    return HttpResponse(formatted_data, content_type='application/json')


@api_view(['GET'])
def search_deals(request):
    requester = request.query_params['requester']
    deals = Deals.objects.filter(requester=requester).all()
    data = serializers.serialize('json', deals)
    formatted_data = json.dumps(json.loads(data), indent=4)
    return HttpResponse(formatted_data, content_type='application/json')


@api_view(['DELETE'])
def delete_deal(request):
    id = request.query_params['d_id']
    deal = Deals.objects.filter(id=id).first()

    if deal:
        deal.delete()
        return HttpResponse(f'Deal with ID: {id} deleted successfully.', status=200)
    else:
        return HttpResponseNotFound('Deal not found.')
