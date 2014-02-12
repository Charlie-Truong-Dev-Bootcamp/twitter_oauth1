
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
    job_id = user.tweet(params[:tweet])
  end
  content_type :json
  {job_id: job_id, status: job_is_complete?(job_id)}.to_json
end


get '/auth' do
  @access_token = request_token.get_access_token(:oauth_verifier => params[:oauth_verifier])
  session.delete(:request_token)
  user = User.create_user(@access_token)
  session[:username] = user.username
  redirect ('/tweet')
end

get '/status/:job_id' do
  puts "------------------------------------------------------"
  (job_is_complete?(params[:job_id])).to_s
end
