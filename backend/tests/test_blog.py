from fastapi.testclient import TestClient

def auth_headers(client: TestClient) -> dict[str, str]:
    client.post(
        "/api/auth/register",
        json={"email": "writer@example.com", "password": "password123"},
    )
    login_response = client.post(
        "/api/auth/login",
        json={"email": "writer@example.com", "password": "password123"},
    )
    token = login_response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


def test_blog_mutation_requires_token(client: TestClient) -> None:
    payload = {
        "title": "Blocked",
        "content": "No key provided",
        "published": True,
    }

    response = client.post("/api/blogs", json=payload)
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


def test_create_and_fetch_blog(client: TestClient) -> None:
    headers = auth_headers(client)
    payload = {
        "title": "First blog post",
        "content": "Hello from FastAPI and PostgreSQL",
        "published": True,
    }

    create_response = client.post("/api/blogs", json=payload, headers=headers)
    assert create_response.status_code == 201
    created = create_response.json()

    assert created["id"] > 0
    assert created["title"] == payload["title"]
    assert created["content"] == payload["content"]
    assert created["published"] is True
    assert "created_at" in created
    assert "updated_at" in created

    get_response = client.get(f"/api/blogs/{created['id']}")
    assert get_response.status_code == 200
    fetched = get_response.json()
    assert fetched == created


def test_list_update_and_delete_blog(client: TestClient) -> None:
    headers = auth_headers(client)
    first = client.post(
        "/api/blogs",
        json={"title": "A", "content": "alpha", "published": False},
        headers=headers,
    ).json()
    second = client.post(
        "/api/blogs",
        json={"title": "B", "content": "beta", "published": False},
        headers=headers,
    ).json()

    list_response = client.get("/api/blogs", params={"skip": 0, "limit": 10})
    assert list_response.status_code == 200
    ids = {item["id"] for item in list_response.json()}
    assert first["id"] in ids
    assert second["id"] in ids

    update_response = client.put(
        f"/api/blogs/{second['id']}",
        json={"title": "B updated", "content": "beta updated", "published": True},
        headers=headers,
    )
    assert update_response.status_code == 200
    updated = update_response.json()
    assert updated["title"] == "B updated"
    assert updated["content"] == "beta updated"
    assert updated["published"] is True

    delete_response = client.delete(f"/api/blogs/{first['id']}", headers=headers)
    assert delete_response.status_code == 204

    missing_response = client.get(f"/api/blogs/{first['id']}")
    assert missing_response.status_code == 404
    assert missing_response.json() == {"detail": "Blog not found"}

