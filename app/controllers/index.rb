get '/' do
  if session[:username]
    redirect ('/tweet')
  end
  erb :index
end

get '/sign_in' do
  # the `request_token` method is defined in `app/helpers/oauth.rb`
  redirect request_token.authorize_url
end

get '/sign_out' do
  session.clear
  redirect '/'
end

get '/tweet' do
  erb :tweet
end

post '/tweet' do
  if session[:username]
    user = User.find_by(username: session[:username])
    user.tweet(params[:tweet])
  end
end


get '/auth' do

  @access_token = request_token.get_access_token(:oauth_verifier => params[:oauth_verifier])

  session.delete(:request_token)

  user  = User.create(username: @access_token.params[:screen_name], oauth_token: @access_token.token, oauth_secret: @access_token.secret)

  session[:username] = user.username

  redirect ('/tweet')

end
