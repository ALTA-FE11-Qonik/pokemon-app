import InView from 'react-intersection-observer';
import { pokemonResponResult } from '../@types/api';

import { useApp } from '../states/AppState';
import PokemonCard from '../componenets/PokemonCard';
import Loader from '../componenets/Loader';
import Layout from '../componenets/Layout';

const Home: React.FC<{}> = () =>{
    const { pokemons, filteredPokemons } = useApp();

    if(pokemons.isLoading){
        return(
            <div>
                <Loader />
            </div>
        );
    };

    return(
        <Layout>
            <main className='container mx-auto px-6 lg:px-0'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {filteredPokemons?.map((pokemon: pokemonResponResult) =>(
                        <InView
                            key={pokemon.name}
                            rootMargin="200px 0px"
                            threshold={0.3}
                            triggerOnce={true}
                        >
                            {({ inView, ref }) =>{
                                return inView ? (
                                    <PokemonCard name={pokemon.name} />
                                ) : (
                                    <div
                                        ref={ref}
                                        className="w-full h-72 bg-gray-100 rounded-lg"
                                    ></div>
                                );
                            }}
                        </InView>
                    ))}
                </div>
            </main>
        </Layout>
    );
};


export default Home;