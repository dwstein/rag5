# app/respositories/user_repository.py


from app.models.models_file import User, get_db

def create_user(email, password, notes):
    db = next(get_db())
    user = User(email=email, password=password, notes=notes)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_user(user_id):
    db = next(get_db())
    return db.query(User).filter(User.id == user_id).first()

def update_user(user_id, email=None, password=None, notes=None):
    db = next(get_db())
    user = db.query(User).filter(User.id == user_id).first()
    if email:
        user.email = email
    if password:
        user.password = password
    if notes:
        user.notes = notes
    db.commit()
    return user

def delete_user(user_id):
    db = next(get_db())
    user = db.query(User).filter(User.id == user_id).first()
    db.delete(user)
    db.commit()
