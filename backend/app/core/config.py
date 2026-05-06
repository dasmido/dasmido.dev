from functools import lru_cache
from os import getenv

#from dotenv import load_dotenv

#load_dotenv()


class Settings:
    def __init__(self) -> None:
        self.app_name: str = getenv("APP_NAME", "My React API")
        self.app_env: str = getenv("APP_ENV", "development")
        self.app_port: int = int(getenv("APP_PORT", "8000"))
        self.cors_origins: list[str] = [
            origin.strip()
            for origin in getenv("CORS_ORIGINS", "http://localhost:5173,https://dasmido.dev").split(",")
            if origin.strip()
        ]
        self.database_url: str = getenv(
            "DATABASE_URL",
            "postgresql+psycopg://postgres:postgres@localhost:5432/my_react",
        )
        self.jwt_secret_key: str = getenv("JWT_SECRET_KEY", "dev-jwt-secret-change-me")
        self.jwt_algorithm: str = getenv("JWT_ALGORITHM", "HS256")
        self.jwt_access_token_expire_minutes: int = int(
            getenv("JWT_ACCESS_TOKEN_EXPIRE_MINUTES", "120")
        )


@lru_cache
def get_settings() -> Settings:
    return Settings()
