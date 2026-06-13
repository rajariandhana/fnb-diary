# FnB Diary

I am creating an app to log entries of food and beverages I've consumed. I'm currently in the phase of determining the database table structure. An entry could either be `food` or `beverage`. I also want to distinguish between homemade, restaurant made, or ultra-processed consumable that were bought. Homemade entry could contain the name of the dish. Restaurant made would contain the name of the place and menu name. For example if I ate a BigMac, the place would be McDonald's. Ultra Processed Entry would contain the name of brand, name, and variant, for example a KitKat bar would have Nestle as the brand, KitKat as the name, and Chunky as the variant. All entry could contain an optional ingridients attribute and optional extra note attribute no matter if they are `food` or `beverage`, and how it is processed.

These are the things that I'm considering
1. Provide arguments if homemade, restaurant made, and ultra-processed entries should be as different tables. I would want to keep the database simple, I prefer to just have one table for the entries so there would not be any table referencing. If only one table, what attribute name should homemade, restaurant made, and ultra-processed be stored as?
2. What attribute name should the value `food` or `beverage` be stored as?
3. I want a more general term for restaurant made since it could be anything that I bought from a business establishments such as from a restaurant, fast food, cafe, milk tea shop.
4. Provide options for another term of ultra-processed

