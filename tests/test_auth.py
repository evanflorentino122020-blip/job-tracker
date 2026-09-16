def test_home(client):
    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {
        "message" : "Job Tracker API seems to be running!"
    }
def test_register(client):
    response = client.post(
        "/register",
        json={
            "email": "pytestuser@example.com",
            "password": "hello123"
        }
    )

    assert response.status_code == 200
    assert response.json()["message"] == "User created successfully"

def test_login(client):
    client.post(
        "/register",
        json={
            "email": "loginuser@example.com",
            "password": "hello123"
        }
    )

    response = client.post(
        "/login",
        json={
            "email": "loginuser@example.com",
            "password": "hello123"
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_me(client):
    client.post(
        "/register",
        json={
            "email": "meuser@example.com",
            "password": "hello123"
        }
    )

    login_response = client.post(
        "/login",
        json={
            "email": "meuser@example.com",
            "password": "hello123"
        }
    )

    token = login_response.json()["access_token"]

    response = client.get(
        "/me",
        headers={
            "Authorization": f"Bearer {token}"
        }
    )
    assert response.status_code == 200
    assert isinstance(response.json()["user_id"], int)

def test_me_without_token(client):
    response = client.get("/me")

    assert response.status_code == 401

def test_users_can_only_see_their_own_applications(client):
    # Create User 1
    client.post(
        "/register",
        json={
            "email": "user1@example.com",
            "password": "hello123"
        }
    )

    # Login User 1
    login_response = client.post(
        "/login",
        json={
            "email": "user1@example.com",
            "password": "hello123"
        }
    )

    token1 = login_response.json()["access_token"]

    # User 1 creates an application
    client.post(
        "/applications",
        json={
            "company": "Google",
            "position": "Software Engineer",
            "status": "Applied",
            "date_applied": "2026-09-15T10:00:00"
        },
        headers={
            "Authorization": f"Bearer {token1}"
        }
    )

    # Create User 2
    client.post(
        "/register",
        json={
            "email": "user2@example.com",
            "password": "hello123"
        }
    )

    # Login User 2
    login_response = client.post(
        "/login",
        json={
            "email": "user2@example.com",
            "password": "hello123"
        }
    )

    token2 = login_response.json()["access_token"]

    # User 2 gets their applications
    response = client.get(
        "/applications",
        headers={
            "Authorization": f"Bearer {token2}"
        }
    )

    assert response.status_code == 200
    assert response.json() == []

def test_users_cannot_update_each_others_applications(client):
    # Create User 1
    client.post(
        "/register",
        json={
            "email": "user1@example.com",
            "password": "hello123"
        }
    )

    # Login User 1
    login_response = client.post(
        "/login",
        json={
            "email": "user1@example.com",
            "password": "hello123"
        }
    )

    token1 = login_response.json()["access_token"]

    # User 1 creates an application
    create_response = client.post(
        "/applications",
        json={
            "company": "Google",
            "position": "Software Engineer",
            "status": "Applied",
            "date_applied": "2026-09-15T10:00:00"
        },
        headers={
            "Authorization": f"Bearer {token1}"
        }
    )

    application_id = create_response.json()["id"]

    # Create User 2
    client.post(
        "/register",
        json={
            "email": "user2@example.com",
            "password": "hello123"
        }
    )

    # Login User 2
    login_response = client.post(
        "/login",
        json={
            "email": "user2@example.com",
            "password": "hello123"
        }
    )

    token2 = login_response.json()["access_token"]

    # User 2 tries to update User 1's application
    response = client.put(
        f"/applications/{application_id}",
        json={
            "company": "Microsoft",
            "position": "Software Engineer",
            "status": "Interview",
            "date_applied": "2026-09-15T10:00:00"
        },
        headers={
            "Authorization": f"Bearer {token2}"
        }
    )

    assert response.status_code == 404

def test_users_cannot_delete_each_others_applications(client):
    # Create User 1
    client.post(
        "/register",
        json={
            "email": "user1@example.com",
            "password": "hello123"
        }
    )

    # Login User 1
    login_response = client.post(
        "/login",
        json={
            "email": "user1@example.com",
            "password": "hello123"
        }
    )

    token1 = login_response.json()["access_token"]

    # User 1 creates an application
    create_response = client.post(
        "/applications",
        json={
            "company": "Google",
            "position": "Software Engineer",
            "status": "Applied",
            "date_applied": "2026-09-15T10:00:00"
        },
        headers={
            "Authorization": f"Bearer {token1}"
        }
    )

    application_id = create_response.json()["id"]

    # Create User 2
    client.post(
        "/register",
        json={
            "email": "user2@example.com",
            "password": "hello123"
        }
    )

    # Login User 2
    login_response = client.post(
        "/login",
        json={
            "email": "user2@example.com",
            "password": "hello123"
        }
    )

    token2 = login_response.json()["access_token"]

    # User 2 tries to delete User 1's application
    response = client.delete(
        f"/applications/{application_id}",
        headers={
            "Authorization": f"Bearer {token2}"
        }
    )

    assert response.status_code == 404

def test_duplicate_email(client):
    client.post(
        "/register",
        json={
            "email": "duplicate@example.com",
            "password": "hello123"
        }
    )

    response = client.post(
        "/register",
        json={
            "email": "duplicate@example.com",
            "password": "hello123"
        }
    )

    assert response.status_code == 409

    assert response.json() == {
        "detail": "Email already registered"
    }