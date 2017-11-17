class Doorkeeper::TokensController
  skip_filter :verify_authenticity_token
  before_action :set_headers


end