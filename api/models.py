from django.db import models as m

# Create your model here.
# class Renovation(m.Model):
#     amt = m.FloatField(blank=True, null=True)
#     abt = m.TextField(blank=True, null=True)
#     c_id = m.IntegerField(primary_key=True)
#     datetime = m.DateTimeField(blank=True, null=True)
#     desc = m.TextField(blank=True, null=True)
#     details = m.TextField(blank=True, null=True)
#     emai = m.EmailField(blank=True, null=True)
#     inv_count = m.IntegerField(blank=True, null=True)
#     member_name = m.CharField(max_length=50, blank=True, null=True)
#     net_purchase_amt = m.FloatField(blank=True, null=True)
#     net_purchase_count = m.IntegerField(blank=True, null=True)
#     net_purchase_item_count = m.IntegerField(blank=True, null=True)
#     note = m.TextField(blank=True, null=True)
#     phone = m.CharField(max_length=50, blank=True, null=True)
#     pic_url = m.URLField(blank=True, null=True)
#     prod_category = m.CharField(max_length=50, blank=True, null=True)
#     prod_category_empty = m.CharField(max_length=50, blank=True, null=True)
#     prod_id = m.CharField(max_length=50, blank=True, null=True)
#     prod_name = m.CharField(max_length=50, blank=True, null=True)
#     products = m.TextField(blank=True, null=True)
#     proj_category = m.CharField(max_length=50, blank=True, null=True)
#     purchased_items = m.TextField(blank=True, null=True)
#     pts = m.IntegerField(blank=True, null=True)
#     rate = m.FloatField(blank=True, null=True)
#     review = m.TextField(blank=True, null=True)
#     review_id = m.CharField(max_length=50, blank=True, null=True)
#     reviwer_name = m.CharField(max_length=50, blank=True, null=True)
#     role = m.CharField(max_length=50, blank=True, null=True)
#     uid = m.CharField(max_length=50, blank=True, null=True, unique=True)
#     usname = m.CharField(max_length=50, blank=True, null=True, unique=True)
#     user = m.CharField(max_length=50, blank=True, null=True)
#     is_suspended = m.IntegerField(default=0)

#     class Meta:
#         verbose_name_plural = "Renovations"

#     def __str__(self):
#         return f"{self.user}"


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
    id = m.IntegerField(primary_key=True)
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


'''
from faker import Faker
fake = Faker()

for i in range(3):
    customer = Customers(
        id=i+1,
        usname=fake.user_name(),
        emai=fake.email(),
        role=fake.job(),
        inv_count=fake.random_int(min=0, max=100),
        member_name=fake.name(),
        note=fake.text(),
        phone=fake.phone_number(),
        pic_url=fake.image_url(),
    )
    customer.save()

for i in range(3):
    review = Reviews.objects.create(
        id=i+1,
        pic_url=fake.image_url(),
        prod_name=fake.sentence(nb_words=4),
        review=fake.paragraph(nb_sentences=3),
        amt=fake.random_int(min=10, max=100),
        reviewer_name=fake.name()
    )
    review.save()

for i in range(3):
    transaction = Transactions(
        id=i+1,
        pic_url=fake.image_url(),
        prod_name=fake.word(),
        user=fake.name(),
        desc=fake.text(),
        amt=fake.pyfloat(left_digits=3, right_digits=2, positive=True),
        datetime=fake.date_time_this_month()
    )
    transaction.save()


'''