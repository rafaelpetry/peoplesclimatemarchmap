class CreateZipCodes < ActiveRecord::Migration[5.0]
  def change
    create_table :zip_codes, id: false do |t|
      t.string :zip_code, unique: true, limit: 5
      t.float :latitude
      t.float :longitude
    end
    add_index :zip_codes, :zip_code
  end
end
