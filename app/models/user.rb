class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # Add role-based attributes here
  enum role: { buyer: 0, admin: 1 }

  after_initialize :set_default_role, if: :new_record?

  def set_default_role
    self.role ||= :buyer
  end
end
