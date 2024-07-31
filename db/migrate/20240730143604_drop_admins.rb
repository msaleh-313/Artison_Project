class DropAdmins < ActiveRecord::Migration[6.1]
  def up
    drop_table :admins
  end

  def down
    # You can recreate the table here if you need to rollback this migration.
  end
end
