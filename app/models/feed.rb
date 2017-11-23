class Feed

  def self.personal_feed(current_user)
    followed_ids = current_user.followed_users.pluck(:id).to_a
    
    List.where('user_id in (?)', followed_ids).order(created_at: :desc)
    
  end

end