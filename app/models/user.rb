class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  # Add role-based attributes here
  #  enum role: {}
  
  after_initialize :set_default_role, if: :new_record?
  def set_default_role
    if self.role.nil?
      self.role = 0
    end
  end

  # def buyer
  #   type=="buyer" 
  # end

  # def admin
  #   type=="admin"    
  # end

end
