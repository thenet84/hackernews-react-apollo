import React, { Component } from 'react';
import Link from './Link';

class Search extends Component{

  state = {
    links: [],
    filter: '',
  }

  onChange = e =>{
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  _executeSearch(){

  }

  render(){
    return (
      <div>
        <div>
          Search
          <input 
            type="text"
            name="filter"
            onChange={this.onChange}
          />
          <button onClick={()=>this._executeSearch()}>OK</button>
        </div>
        {this.state.links.map((link, index) =>(
          <Link key={link.id} index={index} />
        ))}
      </div>
    );
  }
}

export default Search;