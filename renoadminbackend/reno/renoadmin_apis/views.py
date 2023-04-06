from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer
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
from .models import User_Product
# from .models import SuspendUser
from .serializers import UserSerializer
from .serializers import UserSerializer1, PurchasedSerializer, ProductSerializer
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

# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        "token": AuthToken.objects.create(user)[1]
        })


class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)
    
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

@csrf_exempt
def user_details(request):
   if request.method=='GET':
    info=Userdetails.objects.all() 
    serailizer=UserSerializer(info,many=True);
    json_data=JSONRenderer().render(serailizer.data) 
    return HttpResponse(json_data,content_type='application/json')
   
@csrf_exempt
def user_History(request,name):
    if request.method=='GET':
        
        info=Userdetails.objects.get(username=name)
        id=info.id 
        print(id)
        info1=Purchased_item.objects.get(UserPK=id)
        info2=User_Product.objects.get(UserPK=id)
        serailizer=UserSerializer(info);
        serailizer1=PurchasedSerializer(info1);
        serailizer2= ProductSerializer(info2);
        res={
            'user data':serailizer.data,
            'Purchased_item':serailizer1.data,
            'User data':serailizer2.data
            }
        json_data=JSONRenderer().render(res)
        return HttpResponse(json_data,content_type='application/json')
        
@csrf_exempt
def create_user(request):
    if request.method=='POST':
        json_data=request.body
        stream=io.BytesIO(json_data)
        python_data=JSONParser().parse(stream)
        serializer= UserSerializer1(data=python_data)
        if serializer.is_valid():
            serializer.save()
            res={'msg':'Data Created Successfully'}
            json_data=JSONRenderer().render(res)
            return HttpResponse(json_data,content_type='application/json')
        return HttpResponse(JSONRenderer().render(serializer.errors),content_type='application/json')

@csrf_exempt
def search_user(request,name):
     if request.method=='GET':
            info=Userdetails.objects.get(username=name)
            serailizer=UserSerializer(info);
            json_data=JSONRenderer().render(serailizer.data) 
            return HttpResponse(json_data,content_type='application/json')
     
@csrf_exempt    
def edit_user(request):
     if request.method=='PUT':
        json_data=request.body
        stream=io.BytesIO(json_data)
        python_data=JSONParser().parse(stream)
        id=python_data.get('id',None)
        username=python_data.get('username',None)
        email=python_data.get('email',None)
        phone=python_data.get('phone',None)
        role=python_data.get('role',None)
        uid=python_data.get('uid',None)
        pic=python_data.get('pic',None)
        is_suspend=python_data.get('is_suspend',None)
        suspend_reason=python_data.get('suspend_reason',None)
        print(uid)
        user_objects=Userdetails.objects.get(id=id)
        print(user_objects.username)
        user_objects.id=id
        user_objects.username=username
        user_objects.email=email
        user_objects.phone=phone
        user_objects.role=role
        user_objects.uid=uid
        user_objects.pic=pic
        user_objects.is_suspend=is_suspend
        user_objects.suspend_reason=suspend_reason
        user_objects.save()
        serailizer=UserSerializer1(user_objects)
        res={'msg':'Data updated Successfully'}
        json_data=JSONRenderer().render(res)
        return HttpResponse(json_data,content_type='application/json')
                    


@csrf_exempt        
def delete_user(request,name):
     if request.method=='DELETE':
        json_data=request.body
        stream=io.BytesIO(json_data)
        python_data=JSONParser().parse(stream)
        id=python_data.get('id',None)
        if id is not None:
             info=Userdetails.objects.get(username=name)
             info.delete()
             res={'msg':'Data updated Successfully'}
             json_data=JSONRenderer().render(res)
             return HttpResponse(json_data,content_type='application/json')

         
@api_view(['GET','POST'])
def suspend_user(request,name):
    data=request.data
    suspend_reason=data['suspend_reason']
    info=Userdetails.objects.get(username=name)
    info.suspend_reason=suspend_reason
    info.is_suspend=True
    info.save()
    res={'msg':'Suspended Successfully'}
    json_data=JSONRenderer().render(res)
    return HttpResponse(json_data,content_type='application/json')
    

@csrf_exempt    
def suspended_users(request):
  if request.method=='GET':
    info=Userdetails.objects.filter(is_suspend="True")
    
    serailizer=UserSerializer(info,many=True);
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
    #  res={
    #      'pageid':info.pageid,
    #      'pagename':info.pagename
    #      }
    
     json_data=JSONRenderer().render(serailizer1.data)
     return HttpResponse(json_data,content_type='application/json') 
    # serailizer=cmsSerializer(info);
    # json_data=JSONRenderer().render(serailizer.data) 
    # return HttpResponse(json_data,content_type='application/json')

@csrf_exempt
def create_page(request):
    if request.method=='POST':
        json_data=request.body
        stream=io.BytesIO(json_data)
        python_data=JSONParser().parse(stream)
        serializer= cmsSerializer(data=python_data)
        if serializer.is_valid():
            serializer.save()
            res={'msg':'Data Created Successfully'}
            json_data=JSONRenderer().render(res)
            return HttpResponse(json_data,content_type='application/json')
        return HttpResponse(JSONRenderer().render(serializer.errors),content_type='application/json')

@csrf_exempt
def search_page(request,name):
     if request.method=='GET':
          try:
            info=cmsModel.objects.get(pagename=name)
          except cmsModel.DoesNotExist:
            res={'msg':'Data Not Found'}
            json_data=JSONRenderer().render(res)
            return HttpResponse(json_data,content_type='application/json')

          serailizer=cmsSerializer1(info);
           
          json_data=JSONRenderer().render(serailizer.data) 
          return HttpResponse(json_data,content_type='application/json')
           
                    

     
@csrf_exempt    
def edit_page(request,id):
     if request.method=='PUT':
        json_data=request.body
        stream=io.BytesIO(json_data)
        python_data=JSONParser().parse(stream)
        id=id
        pagename=python_data.get('pagename',None)
        pageid=python_data.get('pageid',None)
        title=python_data.get('title',None)
        content=python_data.get('content',None)
        media=python_data.get('media',None)
      
        user_objects=cmsModel.objects.get(id=id)
     
        user_objects.id=id
        user_objects.pagename=pagename
        user_objects.pageid=pageid
        user_objects.title=title
        user_objects.pageid=pageid
        user_objects.title=title
        user_objects.content=content
        user_objects.media=media
        user_objects.save()
        serailizer=cmsSerializer(user_objects)
        res={'msg':'Data updated Successfully'}
        json_data=JSONRenderer().render(res)
        return HttpResponse(json_data,content_type='application/json')
                    


@csrf_exempt        
def delete_page(request,id):
     if request.method=='DELETE':
        # json_data=request.body
        # stream=io.BytesIO(json_data)
        # python_data=JSONParser().parse(stream)
        # id=python_data.get('pageid',None)
        id=id
        print(id)
        if id is not None:
          try:
             info=cmsModel.objects.get(pageid=id)
          except cmsModel.DoesNotExist:
             res={'msg':'Data is not present'}
             json_data=JSONRenderer().render(res)
             return HttpResponse(json_data,content_type='application/json')
             
             
          info.delete()
          res={'msg':'Data deleted Successfully'}
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


@csrf_exempt
def projects(request):
   if request.method=='GET':
    try:
     info=ProjectManagementModel.objects.all()
    except ProjectManagementModel.DoesNotExist:
      res={'msg':'DataBase is Empty'}
      json_data=JSONRenderer().render(res)
      return HttpResponse(json_data,content_type='application/json')

    serailizer1=ProjectManagementSerializer1(info,many=True);    
    json_data=JSONRenderer().render(serailizer1.data)
    return HttpResponse(json_data,content_type='application/json') 
   


def featuredprojects(request):
   if request.method=='GET':
     info=ProjectManagementModel.objects.filter(project_type='Featured')
     serailizer1=ProjectManagementSerializer1(info,many=True);    
     json_data=JSONRenderer().render(serailizer1.data)
     return HttpResponse(json_data,content_type='application/json') 



@csrf_exempt
def addproject(request):
    if request.method=='POST':
        json_data=request.body
        stream=io.BytesIO(json_data)
        python_data=JSONParser().parse(stream)
        serializer= ProjectManagementSerializer(data=python_data)
        if serializer.is_valid():
            serializer.save()
            res={'msg':'Data Created Successfully'}
            json_data=JSONRenderer().render(res)
            return HttpResponse(json_data,content_type='application/json')
        return HttpResponse(JSONRenderer().render(serializer.errors),content_type='application/json')




@csrf_exempt
def searchproject(request,name):
     if request.method=='GET':
          try:
            info=ProjectManagementModel.objects.get(proj_name=name)
          except ProjectManagementModel.DoesNotExist:
             res={'msg':'Data Not Found'}
             json_data=JSONRenderer().render(res)
             return HttpResponse(json_data,content_type='application/json')
            
                
          serailizer=ProjectManagementSerializer1(info);
           
          json_data=JSONRenderer().render(serailizer.data) 
          return HttpResponse(json_data,content_type='application/json')




          
@csrf_exempt
def searchfeaturedprojects(request,name):
     if request.method=='GET':
          try: 
            info=ProjectManagementModel.objects.get(proj_name=name,project_type='Featured')
          except ProjectManagementModel.DoesNotExist:
            res={'msg':'Data Not Found'}
            json_data=JSONRenderer().render(res)
            return HttpResponse(json_data,content_type='application/json')
            
          serailizer=ProjectManagementSerializer1(info);
           
          json_data=JSONRenderer().render(serailizer.data) 
          return HttpResponse(json_data,content_type='application/json')




     
@csrf_exempt    
def editproject(request,id):
     if request.method=='PUT':
        json_data=request.body
        stream=io.BytesIO(json_data)
        python_data=JSONParser().parse(stream)
        id=id
        pic=python_data.get('pic',None)
        proj_name=python_data.get('prod_name',None)
        proj_category=python_data.get('prod_category',None)
        rate=python_data.get('rate',None)
        review=python_data.get('review',None)
        details=python_data.get('details',None)
        project_type=python_data.get('project_type',None)
        proj_id=python_data.get('proj_id',None)

        user_objects=ProjectManagementModel.objects.get(id=id)
        user_objects.pic= pic
        user_objects.proj_name= proj_name
        user_objects.proj_category= proj_category
        user_objects.rate=  rate
        user_objects.rate= rate
        user_objects.review=review
        user_objects.details= details
        user_objects.project_type=project_type
        user_objects.proj_id= proj_id
        user_objects.save()
        serailizer=ProjectManagementSerializer(user_objects)
        res={'msg':'Data updated Successfully'}
        json_data=JSONRenderer().render(res)
        return HttpResponse(json_data,content_type='application/json')





@csrf_exempt        
def deleteproject(request,id):
     if request.method=='DELETE':
        # json_data=request.body
        # stream=io.BytesIO(json_data)
        # python_data=JSONParser().parse(stream)
        # id=python_data.get('pageid',None)
        id=id
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

@csrf_exempt
def addpromoted(request):
    if request.method=='POST':
        json_data=request.body
        stream=io.BytesIO(json_data)
        python_data=JSONParser().parse(stream)
        serializer= pmsSerializer(data=python_data)
        if serializer.is_valid():
            serializer.save()
            res={'msg':'Data Created Successfully'}
            json_data=JSONRenderer().render(res)
            return HttpResponse(json_data,content_type='application/json')
        return HttpResponse(JSONRenderer().render(serializer.errors),content_type='application/json')

@csrf_exempt
def searchpromoted(request,name):
     if request.method=='GET':
            info=pmsModel.objects.get(prod_name=name)
            serailizer=pmsSerializer(info);
           
            json_data=JSONRenderer().render(serailizer.data) 
            return HttpResponse(json_data,content_type='application/json')
           
                    

     
@csrf_exempt    
def editpromoted(request,id):
     if request.method=='PUT':
        json_data=request.body
        stream=io.BytesIO(json_data)
        python_data=JSONParser().parse(stream)
        id=id
        pic=python_data.get('pic',None)
        prod_name=python_data.get('prod_name',None)
        prod_category=python_data.get('prod_category',None)
        inv_count=python_data.get('inv_count',None)
        rate=python_data.get('rate',None)
        prod_id=python_data.get('prod_id',None)
      
        user_objects=pmsModel.objects.get(id=id)
        user_objects.pic= pic
        user_objects.prod_name= prod_name
        user_objects.prod_category=prod_category
        user_objects.inv_count= inv_count
        user_objects.rate= rate
        user_objects. prod_id= prod_id
        user_objects.save()
        serailizer=pmsSerializer(user_objects)
        res={'msg':'Data updated Successfully'}
        json_data=JSONRenderer().render(res)
        return HttpResponse(json_data,content_type='application/json')
                    


@csrf_exempt        
def deletepromoted(request,id):
     if request.method=='DELETE':
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
def user_details(request):
   if request.method=='GET':
    info=SupportDetails.objects.all() 
    serailizer=SupportSerializer(info,many=True);
    json_data=JSONRenderer().render(serailizer.data) 
    return HttpResponse(json_data,content_type='application/json')
   

@csrf_exempt 
def delete_records(request,id):
     if request.method=='DELETE':
      #   json_data=request.body
      #   stream=io.BytesIO(json_data)
      #   python_data=JSONParser().parse(stream)
      #   id=python_data.get('id',None)
        id=id
        if id is not None:
             info=SupportDetails.objects.get(id=id)
             info.delete()
             res={'msg':'Data updated Successfully'}
             json_data=JSONRenderer().render(res)
             return HttpResponse(json_data,content_type='application/json')