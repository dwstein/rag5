

import os
import sys
sys.path.append(os.path.abspath(os.path.dirname(__file__)))


import unittest
from datetime import datetime
from uuid import uuid4

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.models.models_file import Base, User, Conversation, Message

class TestModels(unittest.TestCase):

    def setUp(self):
        # Create an in-memory SQLite database for testing
        self.engine = create_engine('sqlite:////database/app.db')
        Base.metadata.create_all(self.engine)
        self.Session = sessionmaker(bind=self.engine)

    def test_user_model(self):
        session = self.Session()

        # Create a new user
        user = User(email='test@example.com', password='password', notes='Test user')
        session.add(user)
        session.commit()

        # Retrieve the user from the database
        user = session.query(User).first()
        self.assertIsNotNone(user)
        self.assertEqual(user.email, 'test@example.com')
        self.assertEqual(user.password, 'password')
        self.assertEqual(user.notes, 'Test user')

        session.close()

    def test_conversation_model(self):
        session = self.Session()

        # Create a new user
        user = User(email='test@example.com', password='password', notes='Test user')
        session.add(user)
        session.commit()

        # Create a new conversation
        conversation = Conversation(user_id=user.id, title='Test Conversation')
        session.add(conversation)
        session.commit()

        # Retrieve the conversation from the database
        conversation = session.query(Conversation).first()
        self.assertIsNotNone(conversation)
        self.assertEqual(conversation.title, 'Test Conversation')
        self.assertEqual(conversation.user_id, user.id)
        self.assertIsNotNone(conversation.created_at)
        self.assertIsNotNone(conversation.updated_at)

        session.close()

    def test_message_model(self):
        session = self.Session()

        # Create a new user
        user = User(email='test@example.com', password='password', notes='Test user')
        session.add(user)
        session.commit()

        # Create a new conversation
        conversation = Conversation(user_id=user.id, title='Test Conversation')
        session.add(conversation)
        session.commit()

        # Create a new message
        message = Message(conversation_id=conversation.id, role='user', content='Hello', model='gpt-3.5-turbo')
        session.add(message)
        session.commit()

        # Retrieve the message from the database
        message = session.query(Message).first()
        self.assertIsNotNone(message)
        self.assertEqual(message.role, 'user')
        self.assertEqual(message.content, 'Hello')
        self.assertEqual(message.model, 'gpt-3.5-turbo')
        self.assertIsNone(message.images)
        self.assertIsNotNone(message.created_at)

        session.close()

if __name__ == '__main__':
    unittest.main()
