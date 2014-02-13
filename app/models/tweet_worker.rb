# app/models/tweet_worker.rb
class TweetWorker
  include Sidekiq::Worker
  sidekiq_options :retry => false


  def perform(tweet_id)
      tweet = Tweet.find(tweet_id)
      user  = tweet.user

      client = Twitter::REST::Client.new do |config|
        config.consumer_key = ENV['TWITTER_KEY']
        config.consumer_secret = ENV['TWITTER_SECRET']
        config.access_token        = user.oauth_token
        config.access_token_secret = user.oauth_secret
      end
    begin
      client.update(tweet.status)
    rescue Twitter::Error => e
      tweet.update(error: e.message)
    end
  end
end
