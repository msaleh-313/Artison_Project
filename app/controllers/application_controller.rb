  class ApplicationController < ActionController::Base

    before_action :authenticate_user!
    include Pagy::Backend


    def after_sign_in_path_for(resource)
      if resource.admin?
        admin_root_path 
      else
        user_root_path
      end
    end
  end
