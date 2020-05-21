import React from 'react'

function Search ({ handleInput, search,selectDropdown ,onDropdown,onDropdownyear}) {


	return (
		<section className="searchbox-wrap">
			<select className="dropdown" onChange={selectDropdown}>
  			<option defaultValue  value="title">Title</option>
			<option value="year">Year</option>
			</select>
			{ onDropdown === 'year' ? (
				<select  className="dropyear" onChange={onDropdownyear} >
				<option value="2020">2020</option>
				<option value="2019">2019</option>
				<option value="2018">2018</option>
				<option value="2017">2017</option>
				<option value="2016">2016</option>
				<option value="2015">2015</option>
			</select>
			):null}
			
			<input 
				type="text" 
				placeholder="Search movie.." 
				className="searchbox" 
				onChange={handleInput}
				onKeyPress={search}
			/>
		</section>
	)
}

export default Search