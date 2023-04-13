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

    path('support/',views.usersupport,name="supportuser"),
    path('deleterecord/<int:id>',views.delete_records,name="deleterecord"),

#==============================================================================================================

  path('customers', views.customers, name='Customers'),
    path('searchcustomers/<int:id>', views.search_customers, name='Search Customers'),
    path('exportcustomers', views.export_customers, name='Export Customers'),
    path('deletecustomer/<int:id>', views.delete_customer, name='Delete Customer'),
    path('editcustomer/<int:id>', views.edit_customer, name='Edit Customer'),
    path('suspendcustomer/<int:id>', views.suspend_customer, name='Suspend Customer'),
    path('suspendedcustomers', views.suspended_customers, name='Suspended Customers'),
    
    path('reviews', views.reviews, name='Reviews'),
    path('deletereview/<int:id>', views.delete_review, name='Reviews'),
    path('reviews/<int:id>', views.review, name='Reviews'),
    
    path('purchases', views.purchases, name='Purchases'),
    path('searchtransaction/<str:prod_name>', views.search_transactions, name='Search Transactions'),
    
    path('products', views.products, name='Products'),
    path('searchproducts/<str:prod_name>', views.search_products, name='Search Products'),
    path('exportproducts/<str:file_format>', views.export_products, name='Edit Products'),
    path('addproducts/<str:id>', views.add_products, name='Add Products'),
    path('editproducts/<str:id>', views.edit_products, name='Edit Products'),
    path('deleteproducts', views.delete_products, name='Delete Products'),
    path('exportfeaturedprod/<str:file_format>', views.export_featured_products, name='Export Featured Products'),
    path('featuredproducts', views.featured_products, name='Featured Products'),
    
    path('members', views.members, name='Members'),
    path('searchmember/<str:usname>', views.search_member, name='Search Member'),
    path('deletemember/<str:usname>', views.delete_member, name='Delete Member'),
    path('memberdetails/<str:usname>', views.member_details, name='Member Details'),
    path('exportmembers/<str:file_format>', views.export_members, name='Export Members'),
    
    path('roles', views.roles, name='Roles'),
    path('createrole', views.create_role, name='Create Role'),
    path('searchrole/<str:name>', views.search_role, name='Search Role'),
    path('deleterole/<str:usname>', views.delete_role, name='Delete Role'),
]
