Photo.destroy_all
Tag.destroy_all
Caption.destroy_all
User.destroy_all

User.create(name: "Global");

# Old house
photo = Photo.create(url: "http://res.cloudinary.com/laucity/image/upload/v1479008326/dxosqwg1xcbhgfcdilba.jpg", user_id: User.first.id);
photo.tags.destroy_all
photo.tags = [Tag.create(photo_id: photo.id, text: "outdoor"), Tag.create(photo_id: photo.id, text: "grass"), Tag.create(photo_id: photo.id, text: "building"), Tag.create(photo_id: photo.id, text: "house")]
photo.captions.destroy_all
photo.captions = [Caption.create(photo_id: photo.id, text: "an old house")]
photo.add_city("tahoe")

# Adam Levine
photo = Photo.create(url: "http://res.cloudinary.com/laucity/image/upload/v1479008266/mgfjl0msryqgabrzupxt.jpg", user_id: User.first.id);
photo.tags.destroy_all
photo.tags = [Tag.create(photo_id: photo.id, text: "person"), Tag.create(photo_id: photo.id, text: "scene")]
photo.captions.destroy_all
photo.captions = [Caption.create(photo_id: photo.id, text: "Adam Levine et al. standing on a stage")]
photo.add_city("san francisco")

# main holding guitar
photo = Photo.create(url: "http://res.cloudinary.com/laucity/image/upload/v1479008213/nzun7mpiiho98j0y01se.jpg", user_id: User.first.id);
photo.tags.destroy_all
photo.tags = [Tag.create(photo_id: photo.id, text: "man"), Tag.create(photo_id: photo.id, text: "holding"), Tag.create(photo_id: photo.id, text: "guitar")]
photo.captions.destroy_all
photo.captions = [Caption.create(photo_id: photo.id, text: "a man holding a guitar")]
photo.add_city("new york")

# large city
photo = Photo.create(url: "http://res.cloudinary.com/laucity/image/upload/v1479008179/q60k5iiwxchj82r7rwzo.jpg", user_id: User.first.id);
photo.tags.destroy_all
photo.tags = [Tag.create(photo_id: photo.id, text: "outdoor"), Tag.create(photo_id: photo.id, text: "sky"), Tag.create(photo_id: photo.id, text: "city")]
photo.captions.destroy_all
photo.captions = [Caption.create(photo_id: photo.id, text: "a large city")]
photo.add_city("tokyo")

# dog 1
photo = Photo.create(url: "http://res.cloudinary.com/laucity/image/upload/v1479007927/av4rwj9uva1zqcyedbyh.jpg", user_id: User.first.id);
photo.tags.destroy_all
photo.tags = [Tag.create(photo_id: photo.id, text: "dog"), Tag.create(photo_id: photo.id, text: "sitting"), Tag.create(photo_id: photo.id, text: "outdoor"), Tag.create(photo_id: photo.id, text: "animal")]
photo.captions.destroy_all
photo.captions = [Caption.create(photo_id: photo.id, text: "a brown and white dog")]
photo.add_city("berkeley")

# great wall of china
photo = Photo.create(url: "http://res.cloudinary.com/laucity/image/upload/v1479007599/qb3edcyge95lcy6vbqwl.jpg", user_id: User.first.id);
photo.tags.destroy_all
photo.tags = [Tag.create(photo_id: photo.id, text: "outdoor"), Tag.create(photo_id: photo.id, text: "stone")]
photo.captions.destroy_all
photo.captions = [Caption.create(photo_id: photo.id, text: "a large stone building with a bridge in the background")]
photo.add_city("china")

# roger federer
photo = Photo.create(url: "http://res.cloudinary.com/laucity/image/upload/v1479007522/qixmtuq6isipmfijbxx1.jpg", user_id: User.first.id);
photo.tags.destroy_all
photo.tags = [Tag.create(photo_id: photo.id, text: "tennis"), Tag.create(photo_id: photo.id, text: "sport"), Tag.create(photo_id: photo.id, text: "racket"), Tag.create(photo_id: photo.id, text: "person")]
photo.captions.destroy_all
photo.captions = [Caption.create(photo_id: photo.id, text: "a tennis player swinging a racket at a ball")]
photo.add_city("switzerland")

# horses (zebras)
photo = Photo.create(url: "http://res.cloudinary.com/laucity/image/upload/v1479006929/kunheugzshck4urikmiw.jpg", user_id: User.first.id);
photo.tags.destroy_all
photo.tags = [Tag.create(photo_id: photo.id, text: "outdoor"), Tag.create(photo_id: photo.id, text: "grass"), Tag.create(photo_id: photo.id, text: "sunset")]
photo.captions.destroy_all
photo.captions = [Caption.create(photo_id: photo.id, text: "a herd of horses standing on top of a field")]
photo.add_city("kenya")

 # beach crowd
photo = Photo.create(url: "http://res.cloudinary.com/laucity/image/upload/v1479006755/rbglirg1tocblh09rzvk.jpg", user_id: User.first.id);
photo.tags.destroy_all
photo.tags = [Tag.create(photo_id: photo.id, text: "crowd"), Tag.create(photo_id: photo.id, text: "people"), Tag.create(photo_id: photo.id, text: "outdoor"), Tag.create(photo_id: photo.id, text: "sky")]
photo.captions.destroy_all
photo.captions = [Caption.create(photo_id: photo.id, text: "a crowd of people standing on a beach")]
photo.add_city("cancun")


photo = Photo.create(url: "http://res.cloudinary.com/laucity/image/upload/v1479002992/ful6clwcj2kgep6zlcgt.jpg", user_id: User.first.id);
photo.tags.destroy_all
photo.tags = [Tag.create(photo_id: photo.id, text: "dog"), Tag.create(photo_id: photo.id, text: "snow"), Tag.create(photo_id: photo.id, text: "outdoor")]
photo.captions.destroy_all
photo.captions = [Caption.create(photo_id: photo.id, text: "a dog sitting in the snow")]
photo.add_city("berkeley")

photo = Photo.create(url: "http://res.cloudinary.com/laucity/image/upload/v1478997400/g5xuxsqpotpvp0bqecxa.jpg", user_id: User.first.id);
photo.tags.destroy_all
photo.tags = [Tag.create(photo_id: photo.id, text: "moutain"), Tag.create(photo_id: photo.id, text: "snow"), Tag.create(photo_id: photo.id, text: "outdoor"), Tag.create(photo_id: photo.id, text: "nature")]
photo.captions.destroy_all
photo.captions = [Caption.create(photo_id: photo.id, text: "a view of a snow covered mountain")]
photo.add_city("bombay")

photo = Photo.create(url: "http://res.cloudinary.com/laucity/image/upload/v1478989395/idbpfl4sw76zafmlc7m7.jpg", user_id: User.first.id);
photo.tags.destroy_all
photo.tags = [Tag.create(photo_id: photo.id, text: "banana"), Tag.create(photo_id: photo.id, text: "plant"), Tag.create(photo_id: photo.id, text: "bunch"), Tag.create(photo_id: photo.id, text: "fruit")]
photo.captions.destroy_all
photo.captions = [Caption.create(photo_id: photo.id, text: "a large bunch of bananas")]
photo.add_city("mexico city")

photo = Photo.create(url: "http://res.cloudinary.com/laucity/image/upload/v1478989070/h7desymsocsxiybm1ixw.jpg", user_id: User.first.id);
photo.tags.destroy_all
photo.tags = [Tag.create(photo_id: photo.id, text: "water"), Tag.create(photo_id: photo.id, text: "tree"), Tag.create(photo_id: photo.id, text: "outdoor"), Tag.create(photo_id: photo.id, text: "pond")]
photo.captions.destroy_all
photo.captions = [Caption.create(photo_id: photo.id, text: "a palm tree in front of a body of water")]
photo.add_city("cancun")

photo = Photo.create(url: "http://res.cloudinary.com/laucity/image/upload/v1478986971/fxb7a68ajhzp6evmq3qg.jpg", user_id: User.first.id);
photo.tags.destroy_all
photo.tags = [Tag.create(photo_id: photo.id, text: "water"), Tag.create(photo_id: photo.id, text: "sky"), Tag.create(photo_id: photo.id, text: "boat"), Tag.create(photo_id: photo.id, text: "outdoor")]
photo.captions.destroy_all
photo.captions = [Caption.create(photo_id: photo.id, text: "a small boat in a large body of water")]
photo.add_city("san diego")

photo = Photo.create(url: "http://res.cloudinary.com/laucity/image/upload/v1478983056/jtd8w8n87rqbls6cdvua.jpg", user_id: User.first.id);
photo.tags.destroy_all
photo.tags = [Tag.create(photo_id: photo.id, text: "outdoor"), Tag.create(photo_id: photo.id, text: "bicycle"), Tag.create(photo_id: photo.id, text: "sky"), Tag.create(photo_id: photo.id, text: "lake")]
photo.captions.destroy_all
photo.captions = [Caption.create(photo_id: photo.id, text: "a man on a bicycle in front of a lake")]
photo.add_city("tahoe")

photo = Photo.create(url: "http://res.cloudinary.com/laucity/image/upload/v1478957070/crxgpo1gcjhqfihh3nkz.jpg", user_id: User.first.id);
photo.tags.destroy_all
photo.tags = [Tag.create(photo_id: photo.id, text: "sky"), Tag.create(photo_id: photo.id, text: "outdoor"), Tag.create(photo_id: photo.id, text: "building"), Tag.create(photo_id: photo.id, text: "window")]
photo.captions.destroy_all
photo.captions = [Caption.create(photo_id: photo.id, text: "a view of a building")]
photo.add_city("san diego")

photo = Photo.create(url: "http://res.cloudinary.com/laucity/image/upload/v1478959723/xwilqtfgnt3enxu1uzyp.jpg", user_id: User.first.id);
photo.tags.destroy_all
photo.tags = [Tag.create(photo_id: photo.id, text: "snow"), Tag.create(photo_id: photo.id, text: "snowboarding"), Tag.create(photo_id: photo.id, text: "sky"), Tag.create(photo_id: photo.id, text: "person")]
photo.captions.destroy_all
photo.captions = [Caption.create(photo_id: photo.id, text: "a man is snowboarding down a hill")]
photo.add_city("tahoe")
