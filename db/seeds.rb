

#Development seed data for one complete list.

category_names = ["Art", "Sports", "Religon", "Cooking", "Comedy", "Celebrities"]


category_names.each do |name|
  Tag.create(name: name.downcase)

end


user = User.create(username: "test_user", email: testemail@email.com, password: "password", password_confirmation: "password", confirmed_at: Time.now)

description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum."

list = List.create(title: "Random Browing Session", description: description)

urls = ["https://en.wikipedia.org/wiki/Wikipedia:Random", "https://en.wikipedia.org/wiki/Wikipedia:Keyboard_shortcuts", "https://en.wikipedia.org/wiki/MediaWiki", "https://en.wikipedia.org/wiki/Free_and_open-source_software", "https://en.wikipedia.org/wiki/Proprietary_software", "https://en.wikipedia.org/wiki/Copyright", "https://en.wikipedia.org/wiki/Copyright", "https://en.wikipedia.org/wiki/Copyright_term", "https://en.wikipedia.org/wiki/Berne_Convention", "https://en.wikipedia.org/wiki/Treaty", "https://en.wikipedia.org/wiki/Contract", "https://en.wikipedia.org/wiki/Statute_of_frauds", "https://en.wikipedia.org/wiki/Statute_of_frauds", "https://en.wikipedia.org/wiki/Surety", "https://en.wikipedia.org/wiki/Uniform_Commercial_Code", "https://en.wikipedia.org/wiki/Puerto_Rico", "https://en.wikipedia.org/wiki/Greater_Antilles"]

last_created = nil
urls.each do |url|
  if !last_created
    @link = Link.create(url: url, description: description[0..80], list_id: list.id, user_id: user.id)
  else
    @link = Link.create(url: url, description: description[0..80], link_id: last_created.id, user_id: user.id)
  end
  last_created = @link
end



tags = Tag.all

tags.each do |tag|
  ListTagging.create(list_id: list.id, tag_id: tag.id)
end

puts "Seed data has been generated."