import React, { useEffect, useState } from 'react'

const FetchApi = () => {
    const [ApiData, setApiData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")
    
    const API = "https://pokeapi.co/api/v2/pokemon/pikachu"
    // https://pokeapi.co/api/v2/pokemon?limit=24

    const FetchData = () => {
        fetch(API)
        .then((res) => res.json())
        .then((data) => {
            setApiData(data);
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
            setError(err);
        });
    }

    useEffect(()=>{
        FetchData();
    }, [])


    if(loading) {
        return (
            <h3 style={{color: 'red'}}>Loading...</h3>
        )
    }
    // console.log(ApiData.stats[5].base_stat)

    if(error) {
        return (
            <h2>{error.message}</h2>
        )
    }

    return (
            <div>
                <div className='image'>
                    <img src={ApiData.sprites.other.dream_world.front_default} alt="" />
                </div>
                <div>{ApiData.name}</div>
                <div>
                    <p>height : {ApiData.height} </p>
                    <p>weight : {ApiData.weight} </p>
                    <p>speed : {ApiData.stats[5].base_stat}  </p>
                </div>
            </div>
    )
}

export default FetchApi
