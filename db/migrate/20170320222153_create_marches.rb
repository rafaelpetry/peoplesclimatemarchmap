class CreateMarches < ActiveRecord::Migration[5.0]
  def change
    create_table :marches, id: false do |t|
      t.string :title
      t.string :url
      t.string :start_date
      t.string :venue
      t.string :address
      t.string :city
      t.string :state
      t.float :latitude
      t.float :longitude
    end
    add_index :marches, :title
  end
end
