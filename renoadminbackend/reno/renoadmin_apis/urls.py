# from .views import RegisterAPI
from knox import views as knox_views
# from .views import LoginAPI
from django.urls import path,include
from .views import ChangePasswordView
from . import views
from django.conf import settings
from django.conf.urls.static import static
from .views import RegisterView, LoginView, LogoutView


urlpatterns = [
     path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
  
    path('logout', LogoutView.as_view()),
    # path('register/', RegisterAPI.as_view(), name='register'),
    # path('login/', LoginAPI.as_view(), name='login'),

    # path('logout/', knox_views.LogoutView.as_view(), name='logout'),
    # path('logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    # path('reset-password/', ChangePasswordView.as_view(), name='change-password'),
    # path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
# -------------------------------------------------------------------------------------------------------
    path('user/',views.user_details,name="user"),
    path('usercreate/',views.create_user,name="createuser"),
    path('searchusers/',views.search_user,name="searchuser"),
    path('edituser/',views.edit_user,name="edituser"),
    path('deleteuser/',views.delete_user,name="deleteuser"),
    path('deletesuspenduser',views.delete_suspenduser,name="deletesuspendeuser"),
    path('suspenduser/',views.suspend_user,name="suspenduser"),
    path('suspendedusers/',views.suspended_users,name="suspendedusers"),
    path('userHistory/',views.user_History,name="Userdetails"),
    path('removesuspenduser/',views.remove_suspend_user,name="removesuspenduser"),
# ---------------------------------------------------------------------------------------------------------------
    path('pages/',views.page,name="page"),
    path('createpage/',views.create_page,name="createpage"),
    path('searchpage/',views.search_page,name="searchpage"),
    path('editpage/',views.edit_page,name="editpage"),
    path('deletepage/',views.delete_page,name="deletepage"),
#=-----------------------------------------------------------------------------------------------------------
    path('projects/',views.projects,name="projects"),
    path('createbookings/',views.createprojectbookings,name="createprojectbookings"),
    path('featuredprojects/',views.featuredprojects,name="featuredprojects"),
    path('searchfeaturedprojects/',views.searchfeaturedprojects,name="searchfeaturedprojects"),
    path('addproject/',views.addproject,name="addproject"),
    path('searchproject/',views.searchproject,name="searchproject"),
    path('editproject/',views.editproject,name="eeditproject"),
    path('deleteproject/',views.deleteproject,name="deleteproject"),
    path('projectbookings/',views.projectbookings,name="projectbookings"),
    path('export/',views.export,name="export"),
#==========================================================================================================
    path('promotions/',views.promotions,name="promotions"),
    path('addpromoted/',views.addpromoted,name="addpromoted"),
    path('searchpromoted/',views.searchpromoted,name="searchpromoted"),
    path('editpromoted/',views.editpromoted,name="eeditpromoted"),
    path('deletepromoted',views.deletepromoted,name="deletepromoted"),
#==========================================================================================================

    path('support/',views.usersupport,name="supportuser"),
    path('deleterecord/',views.delete_records,name="deleterecord"),
#============================================================================================================
    path('setting/',views.settings,name="settings"),
#==============================================================================================================
    path('listings/',views.listing,name="listing"),
    path('addlisting/',views.add_listing,name="add_listing"),
    path('searchlisting/',views.search_listing,name="search_listing"),
    path('editlisting/',views.edit_listing,name="edit_listing"),
    path('deletelisting/',views.delete_listing,name="delete_listing"),

#==============================================================================================================

    path('customers', views.customers, name='Customers'),
    path('searchcustomers', views.search_customers, name='Search Customers'),
    path('exportcustomers', views.export_customers, name='Export Customers'),
    path('deletecustomer', views.delete_customer, name='Delete Customer'),
    path('editcustomer', views.edit_customer, name='Edit Customer'),
    path('suspendcustomer', views.suspend_customer, name='Suspend Customer'),
    path('suspendedcustomers', views.suspended_customers, name='Suspended Customers'),
    
    path('reviews', views.reviews, name='Reviews'),
    path('addreview', views.add_review, name='Reviews'),
    path('deletereview', views.delete_review, name='Reviews'),
    path('reviews', views.review, name='Reviews'),
    
    path('purchases', views.purchases, name='Purchases'),
    path('searchtransaction', views.search_transactions, name='Search Transactions'),
    
    path('products', views.products, name='Products'),
    path('searchproducts', views.search_products, name='Search Products'),
    path('exportproducts', views.export_products, name='Edit Products'),
    path('addproducts', views.add_products, name='Add Products'),
    path('editproducts', views.edit_products, name='Edit Products'),
    path('deleteproducts', views.delete_products, name='Delete Products'),
    path('exportfeaturedprod', views.export_featured_products, name='Export Featured Products'),
    path('featuredproducts', views.featured_products, name='Featured Products'),
    
    path('members', views.members, name='Members'),
    path('searchmember', views.search_member, name='Search Member'),
    path('deletemember', views.delete_member, name='Delete Member'),
    path('memberdetails', views.member_details, name='Member Details'),
    path('exportmembers', views.export_members, name='Export Members'),
    
    path('roles', views.roles, name='Roles'),
    path('createrole', views.create_role, name='Create Role'),
    path('searchrole', views.search_role, name='Search Role'),
    path('deleterole', views.delete_role, name='Delete Role'),

    path('categories', views.categories, name='Categories'),
    path('searchcategory', views.search_category, name='Search Category'),
    path('exportcategories', views.export_categories, name='Export Categories'),
    path('addcategory', views.add_category, name='Add Category'),
    path('editcategory', views.edit_category, name='Edit Category'),
    path('deletecategory', views.delete_category, name='Delete Category'),

    path('deals', views.deals, name='Deals'),
    path('searchdeals', views.search_deals, name='Search Deals'),
    path('deletedeal', views.delete_deal, name='Delete Deal')
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
