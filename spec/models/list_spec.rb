require 'spec_helper'
require 'rails_helper'

describe List do 

  #let(:list) { create(:list) }
  list = List.create(title: "List Title", description: "This is a list description.")

  it "creates new links with links=" do
    new_links = [{url: "www.foo.com"}, {url: "www.bar.com"}]

    list.links = new_links

    expect(list.links.length).to eq(2)
  end
end