import { useState } from 'react'
import { useProducts } from './hooks/useProducts'
import { ProductTable } from './components/ProductTable'
import './app.css'


function App() {

  const [search, setSearch] = useState(''); 
  const [page, setPage] = useState(0);    

  const { data, isLoading, isError, error} = useProducts(search, page);

  if (isError) {
    return (
      <div className='container'>
        <div className='errorMsg'>
          Error: {(error as Error).message || 'Something went wrong!'}
        </div>
      </div>
    );
  }

  return (
    <div  className='container '>
      <input 
        type = "text"
        className='searchBar'
        placeholder='Search Products. . .'
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          setPage(0)
        }}
      />

        {isLoading ? (
          <div className='loadingSpin'>Loading Products...</div>
        ) : ( 
          <>
          <ProductTable data={data?.products || []}/>
          
          <div className='pagination'>
            <button className='prevButton' 
            disabled={page === 0}
            onClick={() => setPage(prev => prev - 1)}
            >Previous</button>
            
            <span> Page {page + 1}</span>
              
              <button className='nextButton'
                disabled={!data || (page + 1) * 10 >= data.total}
                onClick={() => setPage(prev => prev + 1)}
                >Next</button>
          </div>
          </>
        )}
    </div>
  );
}

export default App;