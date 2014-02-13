class CreateTweets < ActiveRecord::Migration
  def change
    create_table :tweets do |t|
      t.string :status
      t.string :error
      t.string :job_id
      t.belongs_to :user
      t.timestamps
    end

    add_index :tweets, :user_id
  end
end
