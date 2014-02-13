class User < ActiveRecord::Base

  has_many :tweets

  def self.create_user(access_token)
    user  = find_or_create_by(username: access_token.params[:screen_name])
    user.oauth_token = "Error" #access_token.token
    user.oauth_secret = "Error" #access_token.secret
    user.save
    user
  end

  def tweet(status)
    tweet = tweets.create!(:status => status)
    job_id = TweetWorker.perform_async(tweet.id)
  end

end
