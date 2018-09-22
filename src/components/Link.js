import React, { Component } from 'react';
import { timeDifferenceForDate } from '../utils';
import { AUTH_TOKEN } from '../constants';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const VOTE_MUTATION = gql`
  mutation voteMutation($linkId: ID!){
    vote(linkId: $linkId){
      id
      link{
        votes{
          id
          user{
            name
          }
        }
      }
    }
  }
`;

class Link extends Component{
  render(){
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{this.props.index + 1}.</span>
          {authToken && (
            <Mutation 
              mutation={VOTE_MUTATION} 
              variables={{linkId: this.props.id}}
              update={(store, { data: { vote }})=>
                this.props.updateStoreAfterVote(store, vote, this.props.id)
              }
            >
              {voteMutation => (
                <div className="ml1 gray f11 pointer" onClick={voteMutation}>
                  ▲
                </div>
              )}
            </Mutation>
          )}
        </div>
        <div className="ml1">
          <div>{this.props.description}({this.props.url})</div>
          <div className="f6 lh-copy gray">
            {this.props.votes.length} votes | by{' '}
            {this.props.postedBy 
              ? this.props.postedBy.name 
              : 'Unknown'}{' '}
            {timeDifferenceForDate(this.props.createdAt)}
          </div>
        </div>
      </div>
    );
  }
}

export default Link;
