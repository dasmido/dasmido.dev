import os
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from app.core.config import get_settings


@pytest.fixture(scope="session")
def client() -> TestClient:
    test_db_path = Path("./test_backend.db")
    os.environ["DATABASE_URL"] = f"sqlite:///{test_db_path}"
    os.environ["BLOG_ADMIN_KEY"] = "test-admin-key"
    get_settings.cache_clear()

    from app.db.base import Base
    from app.db.session import engine
    from app.main import app

    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    with TestClient(app) as test_client:
        yield test_client

    Base.metadata.drop_all(bind=engine)
    if test_db_path.exists():
        test_db_path.unlink()

