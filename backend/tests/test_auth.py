from fastapi.testclient import TestClient


def test_register_and_login_returns_token(client: TestClient) -> None:
    register_response = client.post(
        "/api/auth/register",
        json={"email": "auth@example.com", "password": "password123"},
    )
    assert register_response.status_code == 201
    assert register_response.json()["email"] == "auth@example.com"

    login_response = client.post(
        "/api/auth/login",
        json={"email": "auth@example.com", "password": "password123"},
    )
    assert login_response.status_code == 200
    token_payload = login_response.json()
    assert token_payload["token_type"] == "bearer"
    assert token_payload["access_token"]


def test_register_duplicate_email(client: TestClient) -> None:
    payload = {"email": "dup@example.com", "password": "password123"}
    first = client.post("/api/auth/register", json=payload)
    assert first.status_code == 201

    second = client.post("/api/auth/register", json=payload)
    assert second.status_code == 409
    assert second.json() == {"detail": "Email already registered"}


def test_auth_me_requires_valid_token(client: TestClient) -> None:
    client.post(
        "/api/auth/register",
        json={"email": "me@example.com", "password": "password123"},
    )
    login_response = client.post(
        "/api/auth/login",
        json={"email": "me@example.com", "password": "password123"},
    )
    token = login_response.json()["access_token"]

    me_response = client.get("/api/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert me_response.status_code == 200
    assert me_response.json()["email"] == "me@example.com"

