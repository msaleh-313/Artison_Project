class UserMailer < ApplicationMailer
  default from: 'notifications@example.com'

  def welcome_email
    @user = params[:user]
    @url  = 'http://example.com/login'
    attachment_path = Rails.root.join('public', 'silverEarring1.jpg')
    attachments.inline['silverEarring1.jpg'] = File.read(attachment_path)
    mail(to: @user.email, subject: 'Welcome Buddy')
  end

  def signIn_email
    @user=params[:user]
    @url='http://example.com/login' 
    attachment_path=Rails.root  
    attachment_path=attachment_path.join('public','silverEarring1.jpg')  #-->/home/msb/ActionMailerIntroduction/public/apple-touch-icon.png
    attachments['silverEarring1.jpg'] = File.read(attachment_path)
    mail(to: @user.email,subject: 'Sign_In Successfully')    
  end
end

