import React, { Component } from 'react';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import Link from './Link';

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!){
    feed(filter: $filter){
      links{
        id
        url
        description
        createdAt
        postedBy{
          id
          name
        }
        votes{
          id
          user{
            id
          }
        }
      }
    }
  }
`;

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

  _executeSearch = async () =>{
    const { filter } = this.state;
    const result = await this.props.client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter },
    });
    const links = result.data.feed.links
    this.setState({ links });
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
          <Link key={link.id} {...link} index={index} />
        ))}
      </div>
    );
  }
}

export default withApollo(Search);