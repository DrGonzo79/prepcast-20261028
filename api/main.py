from pathlib import Path
import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="PrepCast API", version="0.1.0")
SPOTS = {s["id"]: s for s in json.loads((Path(__file__).parents[1] / "data/demo_spots.json").read_text())}

class BriefRequest(BaseModel):
    spot_id: str
    rain_probability: int = Field(ge=0, le=100)
    temperature_f: int = Field(ge=20, le=120)

def calculate(req: BriefRequest) -> dict:
    spot = SPOTS.get(req.spot_id)
    if not spot:
        raise HTTPException(404, "Unknown spot")
    avg = sum(spot["priorSales"]) / len(spot["priorSales"])
    rain_drag = .46 if req.rain_probability >= 70 else .25 if req.rain_probability >= 40 else .1 if req.rain_probability >= 20 else 0
    temp_drag = .18 if req.temperature_f < 45 or req.temperature_f > 98 else .08 if req.temperature_f < 55 or req.temperature_f > 92 else 0
    drag = min(.65, rain_drag + temp_drag)
    gross = round(avg * (1-drag))
    fee = spot["feeValue"] if spot["feeType"] == "flat" else gross * spot["feeValue"] / 100
    units = max(0, round((gross/spot["pricePerUnit"]) * .92))
    profit = round(gross - units*spot["foodCostPerUnit"] - fee)
    score = max(0, min(100, round(100 - drag*85 - (fee/max(gross,1))*35)))
    call = "GO" if score >= 72 else "PIVOT" if score >= 48 else "SKIP"
    return {"spot_id": req.spot_id, "call": call, "score": score, "prep_units": units, "expected_gross": gross, "expected_profit": profit, "weather_drag_percent": round(drag*100), "simulated": True}

@app.get("/health")
def health(): return {"status":"ok"}

@app.post("/brief")
def brief(req: BriefRequest): return calculate(req)
