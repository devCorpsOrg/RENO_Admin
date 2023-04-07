from faker import Faker
from api.models import Renovation

faker = Faker()

# Generate and save 3 sample dummy values
for i in range(3):
    user = faker.name()
    renovation = Renovation(
        pic_url=faker.url(),
        member_name=faker.name(),
        phone=faker.phone_number(),
        note=faker.text(),
        inv_count=faker.pyint(),
        c_id=i+1,
        amt=faker.pyfloat(),
        user=user,
        usname=user.replace(' ', '').lower(),
        emai=faker.email(),
        role=faker.word(),
        abt=faker.text(),
        purchased_items=faker.text(),
        products=faker.text(),
        net_purchase_amt=faker.pyfloat(),
        net_purchase_count=faker.pyint(),
        details=faker.text(),
        datetime=faker.date_time(),
        desc=faker.text(),
        prod_id=faker.word(),
        prod_name=faker.word(),
        prod_category=faker.word(),
        prod_category_empty=faker.word(),
        rate=faker.pyfloat(),
        net_purchase_item_count=faker.pyint(),
        review=faker.text(),
        review_id=faker.word(),
        reviwer_name=faker.name(),
    )
    renovation.save()
