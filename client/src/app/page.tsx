"use client";
import { useState } from "react";
import { Button } from "primereact/button";
import { Input } from "@chakra-ui/react";

export default function Home() {
  const [fuelConsumption, setfuelConsumption] = useState<number>(0);
  const [fuelType, setFuelType] = useState<string>("HFO");
  const [loading, setLoading] = useState(false);

  const load = () => {
    setLoading(true);
    fetch("http://localhost:3000/calculate-co2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fuelConsumption, fuelType }),
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
        });
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const emissionFactorsSelect = [
    { name: "Óleo Combustível Pesado", code: "HFO" },
    { name: "Diesel Marítimo", code: "MDO" },
    { name: "Gás Natural Liquefeito", code: "LNG" },
  ];

  return (
    <main className="flex flex-col justify-center items-center bg-slate-400 h-full w-full">
      <div className="mx-auto bg-white p-10 rounded-md ">
        <h1 className="text-3xl font-bold text-center mb-5">
          Calculadora de Emissões
        </h1>
        <div className="">
          <p>Quantidade de combustível</p>
          <Input
            type="number"
            value={fuelConsumption}
            onChange={(e) => setfuelConsumption(Number(e.target.value))}
            // minFractionDigits={2}
            // maxFractionDigits={5}
            className="p-2 rounded-md border border-gray-300 w-full"
          />
        </div>
        <div className="mt-3">
          <p>Tipo de combustível</p>
          <select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            className="p-2 rounded-md border border-gray-300 w-full"
          >
            {emissionFactorsSelect.map((factor) => (
              <option key={factor.code} value={factor.code}>
                {factor.name}
              </option>
            ))}
          </select>
        </div>
        <Button
          label="Submit"
          icon="pi pi-check"
          loading={loading}
          onClick={load}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        />
      </div>
    </main>
  );
}
