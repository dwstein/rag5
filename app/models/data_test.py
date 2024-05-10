from models_file import User, engine
from sqlalchemy.orm import sessionmaker

# Create a session factory
Session = sessionmaker(bind=engine)
session = Session()

# Create 3 test users
user1 = User(email='user1@example.com', password='password1', notes='Test user 1')
user2 = User(email='user2@example.com', password='password2', notes='Test user 2')
user3 = User(email='user3@example.com', password='password3', notes='Test user 3')

# Add the users to the session
session.add(user1)
session.add(user2)
session.add(user3)

# Commit the changes to the database
session.commit()

# Close the session
session.close()
