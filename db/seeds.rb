# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


# category_names = ["Art", "Sports", "Religon", "Cooking", "Comedy", "Celebrities"]


# category_names.each do |name|
#   Tag.create(name: name)

# end


# tag_ids = Tag.pluck(:id)

# tag_ids.each do |id|
#   Tag.reset_counters(id, :lists)
# end

users = User.all

users.each do |user|
  profile = user.build_wall
  profile.save

end