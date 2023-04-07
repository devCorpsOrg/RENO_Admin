from django.contrib import admin
from django.urls import path
from api import views

urlpatterns = [
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
    path('exportproducts', views.export_products, name='Edit Products'),
    path('addproducts', views.add_products, name='Add Products'),
    path('editproducts', views.edit_products, name='Edit Products'),
    path('deleteproducts', views.delete_products, name='Delete Products'),
    path('exportfeaturedprod', views.export_featured_products, name='Export Featured Products'),
    path('featuredproducts', views.featured_products, name='Featured Products'),
    
    path('members', views.members, name='Members'),
    path('searchmember/<str:usname>', views.search_member, name='Search Member'),
    path('deletemember/<str:usname>', views.delete_member, name='Delete Member'),
    path('memberdetails/<str:usname>', views.member_details, name='Member Details'),
    path('exportmembers', views.export_members, name='Export Members'),
    
    path('roles', views.roles, name='Roles'),
    path('createrole', views.create_role, name='Create Role'),
    path('searchrole/<str:name>', views.search_role, name='Search Role'),
    path('deleterole/<str:usname>', views.delete_role, name='Delete Role'),
]
