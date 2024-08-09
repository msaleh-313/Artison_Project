class Users::RegistrationsController < Devise::RegistrationsController
   before_action :configure_permitted_parameters, if: :devise_controller?

  after_action :send_welcome_email ,only: [:create]

  protected

  def send_welcome_email
    Rails.logger.info "Send welcome email called"
    if resource.persisted?
      Rails.logger.info "User persisted, sending email"
      UserMailer.with(user: resource).welcome_email.deliver_later
      # UserMailer.with(user: resource).welcome_email.deliver_later(wait: 5.seconds)
    else
      Rails.logger.info "User not persisted"
    end
  end
  

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:role])
    devise_parameter_sanitizer.permit(:account_update, keys: [:role])
  end
end
