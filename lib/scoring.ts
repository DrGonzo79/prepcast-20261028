import spots from "../data/demo_spots.json";

export type Spot = (typeof spots)[number];
export type Brief = {call:"GO"|"PIVOT"|"SKIP";score:number;prepUnits:number;expectedGross:number;expectedProfit:number;weatherDrag:number;reasons:string[]};
export {spots};

export function scoreSpot(spot: Spot, rain: number, temperature: number): Brief {
  if (rain < 0 || rain > 100) throw new Error("Rain probability must be between 0 and 100.");
  if (temperature < 20 || temperature > 120) throw new Error("Temperature must be between 20°F and 120°F.");
  const avg = spot.priorSales.reduce((a,b)=>a+b,0)/spot.priorSales.length;
  const rainDrag = rain >= 70 ? .46 : rain >= 40 ? .25 : rain >= 20 ? .1 : 0;
  const tempDrag = temperature < 45 || temperature > 98 ? .18 : temperature < 55 || temperature > 92 ? .08 : 0;
  const weatherDrag = Math.min(.65, rainDrag + tempDrag);
  const expectedGross = Math.round(avg * (1-weatherDrag));
  const venueFee = spot.feeType === "flat" ? spot.feeValue : expectedGross * spot.feeValue/100;
  const prepUnits = Math.max(0, Math.round((expectedGross/spot.pricePerUnit)*.92));
  const expectedProfit = Math.round(expectedGross - prepUnits*spot.foodCostPerUnit - venueFee);
  const score = Math.max(0, Math.min(100, Math.round(100 - weatherDrag*85 - (venueFee/Math.max(expectedGross,1))*35)));
  const call = score >= 72 ? "GO" : score >= 48 ? "PIVOT" : "SKIP";
  const reasons = [
    `${rain}% rain creates a ${Math.round(rainDrag*100)}% demand haircut`,
    `${spot.feeType === "flat" ? `$${spot.feeValue} flat fee` : `${spot.feeValue}% venue fee`} is included`,
    `Three demo visits average $${Math.round(avg).toLocaleString()}`
  ];
  return {call,score,prepUnits,expectedGross,expectedProfit,weatherDrag:Math.round(weatherDrag*100),reasons};
}
