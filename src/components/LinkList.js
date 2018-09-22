import React from 'react';
import Link from './Link';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const FEED_QUERY = gql`
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

export default function LinkList(prosp){
  
  return (
    <Query query={FEED_QUERY}>
      {({ loading, error, data }) => {
        if(loading) return <div>Fetching</div>;
        if(error) return <div>Error</div>;

        const linksToRender = data.feed.links;
        return (
          <div>
            {linksToRender.map((link, index) => <Link key={link.id} {...link} index={index} />)}
          </div>
        )
      }
    }
    </Query>
  );
}