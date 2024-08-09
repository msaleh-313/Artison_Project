# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]
  after_action :send_signIn_email,only: [:create]
  def destroy
    super
    reset_session
  end

  protected

  def send_signIn_email
    if user_signed_in?
      UserMailer.with(user: current_user).signIn_email.deliver_later
    end
  end
end
