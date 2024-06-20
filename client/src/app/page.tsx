"use client";
import { useState } from "react";
import { Button } from "primereact/button";
import { Input } from "@chakra-ui/react";

export default function Home() {
  const [fuelConsumption, setFuelConsumption] = useState<string>("");
  const [fuelType, setFuelType] = useState<string>("HFO");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permitir que o campo seja limpo
    if (value === "") {
      setFuelConsumption("");
    } else {
      // Apenas números positivos e ponto decimal
      if (!isNaN(Number(value)) && Number(value) >= 0) {
        setFuelConsumption(value);
      }
    }
  };

  const load = () => {
    setLoading(true);
    fetch(
      "https://shipemissionstracker-backend-f68de0c13a90.herokuapp.com/calculate-co2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fuelConsumption, fuelType }),
      }
    )
      .then((res) => {
        res.json().then((data) => {
          setResult(data);
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

  const shipData = [
    {
      tipo: "1. Navios Porta-Contêineres",
      descricao:
        "Transportam contêineres com diversos tipos de mercadorias entre portos internacionais.",
      emissoes:
        "Entre 2,5 a 3,5 milhões de toneladas de CO₂ por ano para os maiores navios.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzbUMDYP56V6M-0CZMbAN561U_IWL-49Ygcg&s",
      funcao:
        "Essenciais para o comércio global, facilitam a movimentação de bens de consumo, produtos industriais, e matérias-primas.",
    },
    {
      tipo: "2.Graneleiros",
      descricao:
        "Transportam cargas a granel, como minério de ferro, carvão, grãos, e outros materiais a granel.",
      emissoes:
        "Aproximadamente 2 a 3 milhões de toneladas de CO₂ por ano para os maiores navios.",
      img: "https://cdn-pen.nuneshost.com/images//colunistas/170406-navio-de-minerio-STELLAR-DAISY.jpg",
      funcao:
        "Cruciais para a indústria pesada e agricultura, permitindo o transporte de grandes volumes de commodities.",
    },
    {
      tipo: "3. Petroleiros",
      descricao: "Transportam petróleo bruto e produtos derivados do petróleo.",
      emissoes:
        "Aproximadamente 2,5 a 3,5 milhões de toneladas de CO₂ por ano para os superpetroleiros (VLCC - Very Large Crude Carriers).",
      img: "https://i0.wp.com/acessepolitica.com.br/wp-content/uploads/2022/11/Acesse-Politica-O-site-de-politica-mais-acessado-da-Bahia-www.acessepolitica.com_.br-navio-tanque.jpg?fit=830%2C450&ssl=1",
      funcao:
        "Vitais para a indústria energética, assegurando a distribuição de petróleo entre produtores e refinarias.",
    },
    {
      tipo: "4. Navios de Cruzeiro",
      descricao:
        "Transportam passageiros para viagens de lazer em itinerários que podem incluir múltiplas paradas em diferentes portos.",
      emissoes:
        "Entre 1 a 2 milhões de toneladas de CO₂ por ano para os maiores navios.",
      img: "https://services.meteored.com/img/article/crucero-mas-grande-del-mundo-icon-of-the-seas-impactos-1706424826811_512.png",
      funcao:
        "Importantes para a indústria do turismo, oferecendo experiências de viagem e férias.",
    },
    {
      tipo: "5. Navios de Pesca Industrial",
      descricao: "Utilizados para a pesca comercial em larga escala.",
      emissoes:
        "Entre 0,5 a 1 milhão de toneladas de CO₂ por ano, dependendo do tamanho e da intensidade das operações.",
      img: "https://img.nauticexpo.com/pt/images_ne/photo-g/31114-11563034.webp",
      funcao:
        "Essenciais para abastecer mercados de peixe e frutos do mar, contribuindo significativamente para a alimentação global.",
    },
    {
      tipo: "6. Navios Roll-on/Roll-off (RoRo)",
      descricao:
        "Transportam veículos, como carros e caminhões, que são conduzidos diretamente a bordo e desembarcados.",
      emissoes:
        "Aproximadamente 1 a 2 milhões de toneladas de CO₂ por ano para os maiores navios.",
      img: "https://tsl-log.com.br/wp-content/uploads/2021/07/Embarques-Ro-Ro.jpg",
      funcao:
        "Cruciais para a logística do transporte de veículos entre continentes.",
    },
  ];

  return (
    <main className="flex flex-col justify-center items-center bg-slate-400 h-full w-full">
      <div className="mx-auto bg-white p-10 rounded-md my-20">
        <h1 className="text-3xl font-bold text-center mb-5">
          Calculadora de Emissões de Navios
        </h1>
        <div className="">
          <p>Quantidade de combustível (Em toneladas)</p>
          <Input
            type="number"
            value={fuelConsumption !== null ? fuelConsumption : ""}
            placeholder="Insira a quantidade de combustível consumida em toneladas"
            onChange={handleInputChange}
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
          label="Calcular"
          icon="pi pi-check"
          loading={loading}
          onClick={load}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full"
        />
        {result && result.error ? (
          <div className="mt-3 px-3 py-2 bg-red-200 rounded-md">
            {result.error}
          </div>
        ) : null}
        {result && result.co2Emissions ? (
          <div className="mt-3 px-3 py-2 bg-orange-200 rounded-md">
            O total de emissões de CO2 é de: {result.co2Emissions} toneladas
          </div>
        ) : null}
      </div>
      <div className="mx-auto bg-white p-10 rounded-md ">
        <h1 className="text-3xl font-bold text-center mb-5">
          Navios que mais emitem CO2
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {shipData.map((ship) => (
            <div
              key={ship.tipo}
              className="bg-gray-100 p-5 rounded-md flex flex-col justify-between"
            >
              <img
                src={ship.img}
                alt={ship.tipo}
                className="w-full h-48 object-cover rounded-md"
              />
              <div>
                <h2 className="text-xl font-bold mt-4">{ship.tipo}</h2>
                <p>{ship.descricao}</p>
                <p>
                  <strong>Emissões de CO2:</strong> {ship.emissoes}
                </p>
                <p>
                  <strong>Função:</strong> {ship.funcao}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
