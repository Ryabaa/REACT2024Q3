import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

const DetailSection: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`,
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data for ${name}`);
        }
        const data = await response.json();
        setPokemonData({
          name: data.name,
          sprites: {
            front_default: data.sprites.front_default,
          },
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [name]);

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="detail-section">
      {loading ? (
        <p>Loading details...</p>
      ) : pokemonData ? (
        <>
          <h2>{pokemonData.name}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <button onClick={handleClose}>Close</button>
        </>
      ) : (
        <p>No details found for {name}</p>
      )}
    </div>
  );
};

export default DetailSection;
