from .views import RegisterAPI
from knox import views as knox_views
from .views import LoginAPI
from django.urls import path,include
from .views import ChangePasswordView
from . import views

urlpatterns = [
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
# -------------------------------------------------------------------------------------------------------
    path('user/',views.user_details,name="user"),
    path('usercreate/',views.create_user,name="createuser"),
    path('searchusers/<str:name>',views.search_user,name="searchuser"),
    path('edituser/<str:name>',views.edit_user,name="edituser"),
    path('deleteuser/<str:name>',views.delete_user,name="deleteuser"),
    path('suspenduser/<str:name>',views.suspend_user,name="suspenduser"),
    path('suspendedusers/',views.suspended_users,name="suspendedusers"),
    path('userHistory/<str:name>',views.user_History,name="Userdetails"),
# ---------------------------------------------------------------------------------------------------------------
     path('pages/',views.page,name="page"),
    path('createpage/',views.create_page,name="createpage"),
    path('searchpage/<str:name>',views.search_page,name="searchpage"),
    path('editpage/<int:id>',views.edit_page,name="editpage"),
    path('deletepage/<int:id>',views.delete_page,name="deletepage"),
#=-----------------------------------------------------------------------------------------------------------
    path('projects/',views.projects,name="projects"),
    path('featuredprojects/',views.featuredprojects,name="featuredprojects"),
    path('searchfeaturedprojects/<str:name>',views.searchfeaturedprojects,name="searchfeaturedprojects"),
    path('addproject/',views.addproject,name="addproject"),
    path('searchproject/<str:name>',views.searchproject,name="searchproject"),
    path('editproject/<int:id>',views.editproject,name="eeditproject"),
    path('deleteproject/<int:id>',views.deleteproject,name="deleteproject"),
    path('projectbookings/',views.projectbookings,name="projectbookings"),
    path('export/',views.export,name="export"),
#==========================================================================================================
    path('promotions/',views.promotions,name="promotions"),
    path('addpromoted/',views.addpromoted,name="addpromoted"),
    path('searchpromoted/<str:name>',views.searchpromoted,name="searchpromoted"),
    path('editpromoted/<int:id>',views.editpromoted,name="eeditpromoted"),
    path('deletepromoted/<int:id>',views.deletepromoted,name="deletepromoted"),
#==========================================================================================================

    path('support/',views.usersupport,name="usersupport"),
    path('deleterecord/<int:id>',views.delete_records,name="deleterecord"),
]
