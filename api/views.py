from django.shortcuts import render, HttpResponse
from .models import *
from django.http import JsonResponse, HttpResponseNotFound, HttpResponseBadRequest
from django.core import serializers
import json
import csv

# Create your views here.
# marketplace
def customers(request):
    customers = Customers.objects.filter(is_suspended=0).only('pic_url', 'member_name', 'phone', 'note', 'inv_count', 'id').all()
    data = serializers.serialize('json', customers)
    formatted_data = json.dumps(json.loads(data), indent=4)  # Indent the JSON data
    return HttpResponse(formatted_data, content_type='application/json')


def search_customers(request, id):
    customer = Customers.objects.filter(id=id).only('pic_url', 'member_name', 'phone', 'note', 'inv_count', 'id').first()

    if customer:
        if customer.is_suspended:
            return HttpResponseBadRequest('Customer is suspended.')

        data = serializers.serialize('json', [customer])
        formatted_data = json.dumps(json.loads(data), indent=4)
        return HttpResponse(formatted_data, content_type='application/json')
    else:
        return HttpResponseNotFound('Customer not found.')


def export_customers(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="renovation_customers.csv"'

    writer = csv.writer(response)
    writer.writerow(['pic_url', 'member_name', 'phone', 'note', 'inv_count', 'id'])

    for customer in Customers.objects.all():
        writer.writerow([customer.pic_url, customer.member_name, customer.phone, customer.note, customer.inv_count, customer.id])

    return response


def delete_customer(request, id):
    customer = Customers.objects.filter(id=id).first()
    if customer:
        customer.delete()
        return HttpResponse('OK', status=200)
    else:
        return HttpResponseNotFound('Customer not found.')


def edit_customer(request, id):
    if request.method == 'POST':
        customer = Customers.objects.filter(id=id, is_suspended=0).values('id', 'usname', 'emai', 'phone', 'uid', 'role', 'pic_url', 'note').first()
        if not customer:
            return HttpResponseNotFound('Customer not found.')
        
        customer.abt = request.POST['abt']
        customer.desc = request.POST['desc']
        customer.emai = request.POST['emai']
        customer.member_name = request.POST['member_name']
        customer.phone = request.POST['phone']
        customer.pic_url = request.POST['pic_url']
        customer.role = request.POST['role']
        customer.uid = request.POST['uid']
        customer.usname = request.POST['usname']
        
        customer.save()

        data = serializers.serialize('json', customer)
        formatted_data = json.dumps(json.loads(data), indent=4)  # Indent the JSON data
        return HttpResponse(formatted_data, content_type='application/json')


def suspend_customer(request, id):
    customer = Customers.objects.filter(id=id).first()
    
    if customer:
        customer.is_suspended = 1
        customer.save()
        return HttpResponse('OK', status=200)
    else:
        return HttpResponseNotFound('Customer not found.')


def suspended_customers(request):
    customers = Customers.objects.filter(is_suspended=1).all()

    data = serializers.serialize('json', customers)
    formatted_data = json.dumps(json.loads(data), indent=4)
    return HttpResponse(formatted_data, content_type='application/json')


# reviews
def reviews(request):
    reviews = Reviews.objects.only('prod_name', 'pic_url', 'review', 'amt', 'id').all()

    data = serializers.serialize('json', reviews)
    formatted_data = json.dumps(json.loads(data), indent=4)  # Indent the JSON data
    return HttpResponse(formatted_data, content_type='application/json')


def delete_review(request, id):
    review = Reviews.objects.filter(id=id).first()

    if review:
        review.delete()
        return HttpResponse('OK', status=200)
    else:
        return HttpResponseNotFound('Review not found.')
    

def review(request, id):
    review = Reviews.objects.filter(id=id).first()

    if review:
        data = serializers.serialize('json', [review])
        formatted_data = json.dumps(json.loads(data), indent=4)  # Indent the JSON data
        return HttpResponse(formatted_data, content_type='application/json')
    else:
        return HttpResponseNotFound('Review not found.')
    

def purchases(request):
    transactions = Transactions.objects.all()

    data = serializers.serialize('json', transactions)
    formatted_data = json.dumps(json.loads(data), indent=4)  # Indent the JSON data
    return HttpResponse(formatted_data, content_type='application/json')


def search_transactions(request, prod_name):
    transactions = Transactions.objects.filter(prod_name=prod_name).all()

    if transactions:
        data = serializers.serialize('json', transactions)
        formatted_data = json.dumps(json.loads(data), indent=4)  # Indent the JSON data
        return HttpResponse(formatted_data, content_type='application/json')
    else:
        return HttpResponseNotFound(f'Transactions not found of product: {prod_name}.')


# IMS - products
def products(request):
    products = Products.objects.all()

    data = serializers.serialize('json', products)
    formatted_data = json.dumps(json.loads(data), indent=4)  # Indent the JSON data
    return HttpResponse(formatted_data, content_type='application/json')


def search_products(request, name):
    product = Products.objects.filter(name=name).first()

    if product:
        data = serializers.serialize('json', [product])
        formatted_data = json.dumps(json.loads(data), indent=4)  # Indent the JSON data
        return HttpResponse(formatted_data, content_type='application/json')
    else:
        return HttpResponseNotFound('Product not found.')


def export_products(request):

    return HttpResponse('Downloading..', status=200)


def edit_products(request, id):
    product = Products.objects.filter(id=id).first()

    if product:
        product.name = request.POST['prod_name']
        product.category = request.POST['prod_category']
        product.proj_category = request.POST['proj_category']
        product.rate = request.POST['rate']
        product.inv_count = request.POST['inv_count']
        product.pic_url = request.POST['pic_url']
        product.details = request.POST['details']

        product.save()

        return HttpResponse(f'Product with ID: {id} edited successfully.', status=200)
    else:
        return HttpResponseNotFound('Product not found.')


def add_products(request):
    if request.method == 'POST':
        name = request.POST['prod_name']
        category = request.POST['prod_category']
        proj_category = request.POST['proj_category']
        rate = request.POST['rate']
        inv_count = request.POST['inv_count']
        pic_url = request.POST['pic_url']
        details = request.POST['details']
        featured_flag = int(request.POST['featured_flag'])

        product = Products(name=name, category=category, proj_category=proj_category, rate=rate, inv_count=inv_count, pic_url=pic_url, details=details, featured_flag=featured_flag)
        product.save()

        return HttpResponse(f'Product with name: {name} added successfully.', status=200)
    else:
        return HttpResponseBadRequest('Invalid request type.')


def delete_products(request, id):
    product = Products.objects.filter(id=id).first()

    if product:
        product.delete()
        return HttpResponse(f'Product with ID: {id} deleted successfully.', status=200)
    else:
        return HttpResponseNotFound('Product not found.')


def export_featured_products(request):

    return HttpResponse('Downloading..', status=200)


def featured_products(request):
    products = Products.objects.filter(featured_flag=1).all()

    if featured_products:
        data = serializers.serialize('json', products)
        formatted_data = json.dumps(json.loads(data), indent=4)  # Indent the JSON data
        return HttpResponse(formatted_data, content_type='application/json')
    else:
        return HttpResponseNotFound('Featured Products not found.')


# CRM - members
def members(request):
    members = CRM.objects.all()
    data = serializers.serialize('json', members)
    formatted_data = json.dumps(json.loads(data), indent=4)  # Indent the JSON data
    return HttpResponse(formatted_data, content_type='application/json')


def search_member(request, usname):
    member = CRM.objects.filter(usname=usname).first()

    if member:
        data = serializers.serialize('json', [member])
        formatted_data = json.dumps(json.loads(data), indent=4)
        return HttpResponse(formatted_data, content_type='application/json')
    else:
        return HttpResponseNotFound('Member not found.')
    

def delete_member(request, usname):
    member = CRM.objects.filter(usname=usname).first()

    if member:
        member.delete()
        return HttpResponse(f'Member with username: {usname} deleted successfully.', status=200)
    else:
        return HttpResponseNotFound('Member not found.')
    

def member_details(request, usname):
    member = CRM.objects.filter(usname=usname).first()

    if member:
        data = serializers.serialize('json', [member])
        formatted_data = json.dumps(json.loads(data), indent=4)
        return HttpResponse(formatted_data, content_type='application/json')
    else:
        return HttpResponseNotFound('Member not found.')
    

def export_members(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="renovation_customers.csv"'

    writer = csv.writer(response)
    writer.writerow(['id', 'usname', 'pic_url', 'abt', 'phone', 'net_purchase_amount', 'net_purchase_count', 'pts'])

    for member in CRM.objects.all():
        writer.writerow([member.id, member.usname, member.pic_url, member.abt, member.phone, member.net_purchase_amount, member.net_purchase_count, member.pts])

    return response


# def roles(request):
#     users = Users.objects.only('usname', 'name', 'email', 'role', 'status').all()
    
#     data = serializers.serialize('json', [users])
#     formatted_data = json.dumps(json.loads(data), indent=4)
#     return HttpResponse(formatted_data, content_type='application/json')
    

# def create_role(request):
#     if request.method == 'POST':
#         # usname,name,email,role(admin/marketplace/superadmin),status
#         usname = request.POST['usname']
#         user = Users.objects.filter(usname=usname).first()
#         if user:
#             role = request.POST['role']
#             if role == 'admin' or role == 'marketplace' or role == 'superadmin':
#                 if role == 'admin':
#                     user.role = 'admin'
#                 elif role == 'marketplace':
#                     user.role = 'marketplace'
#                 elif role == 'superadmin':
#                     user.role = 'superadmin'

#                 user.save()
#             else:
#                 return HttpResponseBadRequest('Invalid role.')
#         else:
#             return HttpResponseNotFound('User not found.')


# def search_role(request, name):
#     users = Users.objects.filter(name=name).only('usname', 'name', 'role', 'status').all()

#     if users:
#         data = serializers.serialize('json', [users])
#         formatted_data = json.dumps(json.loads(data), indent=4)
#         return HttpResponse(formatted_data, content_type='application/json')
#     else:
#         return HttpResponseNotFound(f'User/s with name: {name} not found.')
    

# def delete_user(request, usname):
#     user = Users.objects.filter(usname=usname).first()

#     if user:
#         user.delete()
#         return HttpResponse(f'User with username: {usname} deleted successfully.', status=200)
#     else:
#         return HttpResponseNotFound('User not found.')
