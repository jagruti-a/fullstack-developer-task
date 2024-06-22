import React, { useState, useEffect } from 'react';
import { fetchCharacters } from './api';
import CharacterCard from './components/CharacterCard/CharacterCard';
import SearchForm from './components/SearchForm/SearchForm';
import Pagination from './components/Pagination/Pagination';
import './Search.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const [characters, setCharacters] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [warning, setWarning] = useState('');
    const [page, setPage] = useState(1);

    const fetchAndSetCharacters = async (searchQuery, pageNumber) => {
        try {
            const data = await fetchCharacters(searchQuery, pageNumber);
            if (data.data.length === 0) {
                setWarning('No results found.');
            } else {
                setWarning('');
            }
            setCharacters(data.data);
            setTotalResults(data.pagination.items.total);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        fetchAndSetCharacters(query, page);
    }, [query, page]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchAndSetCharacters(query, 1);
    };

    return (
        <div className="search-container">
            <h1>Search Anime Characters</h1>
            <SearchForm query={query} setQuery={setQuery} handleSearch={handleSearch} />
            <p>Total <strong>{totalResults}</strong> matching anime characters found</p>
            {warning && <p className="warning">{warning}</p>}
            <ul>
                {characters.map((character) => (
                    <CharacterCard key={character.mal_id} character={character} />
                ))}
            </ul>
            <Pagination page={page} setPage={setPage} totalResults={totalResults} />
        </div>
    );
};

export default Search;
