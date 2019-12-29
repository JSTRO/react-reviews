import React, {useState, useEffect} from "react"

const Context = React.createContext()

function ContextProvider({children}) {

	const [data, setData] = useState([])
	const [search, setSearch] = useState("")
  const [sortValue, setSortValue] = useState("")
  const [yearFilter, setYearFilter] = useState([])
  const [BNMFilter, setBNMFilter] = useState(false)

	useEffect(() => {
    fetch("http://localhost:3000/")
      .then(res => res.json())
      .then(res => setData(res.data))
      .catch(e => console.log(e))
  }, [])

  return (
    <Context.Provider value={
    	{
	    	data, 
	    	search, 
	    	setSearch, 
	    	sortValue, 
	    	setSortValue, 
	    	yearFilter, 
	    	setYearFilter, 
	    	BNMFilter, 
	    	setBNMFilter
    	}
    }>
       {children}
    </Context.Provider>
  )

}

export {ContextProvider, Context}