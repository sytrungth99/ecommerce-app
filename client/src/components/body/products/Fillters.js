import React, { useContext } from 'react'
import { DataContext } from '../../../GlobalState'

function Fillters() {
    const state = useContext(DataContext)
    const [categories] = state.categoriesAPI.categories
    const [category,setCategory] = state.productAPI.categorys
    const [sort,setSort] = state.productAPI.sort
    const [search,setSearch] = state.productAPI.search

    const handleCategory = e =>{
        setCategory(e.target.value)
    }
    return (

        <div className="filter_menu">
            <div className='rows'>
                <span>Filters:</span>
                <select name='category' value={category} onChange={handleCategory}>
                    <option value=''>All products</option>
                    {
                        categories.map(category=>(
                            <option value={"category="+category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <input type="text" value={search} placeholder="Enter your search"
            onChange={e=>setSearch(e.target.value.toLowerCase())}/>
            <div className='rows'>
                <span>Sort By:</span>
                <select value={sort} onChange={e=>setSort(e.target.value)}>
                    <option value=''>Newest</option>
                    <option value='sort=oldest'>Oldest</option>
                    <option value='sort=-sold'>Best sales</option>
                    <option value='sort= -price'>Price: Hight-Low</option>
                    <option value='sort= price'>Price: Low-Hight</option>
                </select>
            </div>
        </div>
    )
}

export default Fillters
