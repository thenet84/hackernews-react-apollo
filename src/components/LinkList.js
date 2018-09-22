import React, { Component } from 'react';
import Link from './Link';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        url
        description
        createdAt
        postedBy{
          name
        }
        votes{
          user{
            name
          }
        }
      }
    }
  }
`;

class LinkList extends Component{
  
  _updateStoreAfterVote(store, createdVote, linkId){
    const data = store.readQuery({ query: FEED_QUERY });

    const votedLink = data.feed.links.find(link => linkId === link.id);
    votedLink.votes = createdVote.link.votes;

    store.writeQuery({ query: FEED_QUERY, data })    
  }

  render(){
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if(loading) return <div>Fetching</div>;
          if(error) return <div>Error</div>;
  
          const linksToRender = data.feed.links;
          return (
            <div>
              {linksToRender.map((link, index) => 
                <Link 
                  key={link.id} 
                  {...link} 
                  index={index} 
                  _updateStoreAfterVote={this._updateStoreAfterVote}
                />)
              }
            </div>
          )
        }
      }
      </Query>
    );
  }
  
}

export default LinkList;