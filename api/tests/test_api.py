from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)

def test_health(): assert client.get("/health").json() == {"status":"ok"}

def test_clear_day_go_call():
    body = client.post("/brief", json={"spot_id":"river-brew","rain_probability":10,"temperature_f":72}).json()
    assert body["call"] == "GO" and body["prep_units"] > 0 and body["simulated"] is True

def test_storm_reduces_prep():
    clear = client.post("/brief", json={"spot_id":"stadium-lot","rain_probability":0,"temperature_f":75}).json()
    storm = client.post("/brief", json={"spot_id":"stadium-lot","rain_probability":85,"temperature_f":40}).json()
    assert storm["prep_units"] < clear["prep_units"] and storm["score"] < clear["score"]

def test_unknown_spot_is_404(): assert client.post("/brief", json={"spot_id":"missing","rain_probability":20,"temperature_f":70}).status_code == 404

def test_invalid_weather_is_422(): assert client.post("/brief", json={"spot_id":"river-brew","rain_probability":101,"temperature_f":70}).status_code == 422
