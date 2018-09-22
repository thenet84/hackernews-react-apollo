import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { FEED_QUERY } from './LinkList';

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!){
    postLink(description: $description, url: $url){
      id,
      description, 
      url
    }
  }
`;

class CreateLink extends Component{
  state = {
    description: '',
    url: ''
  }

  onChange = e =>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  render(){
    const { description, url } = this.state;
    return (
      <div>
        <div className="flex flex-column mt3"> 
          <input 
            className="mb2"
            type="text"
            value={description}
            name="description"
            onChange={this.onChange}
            placeholder="A description for the link"
          />
          <input 
            className="mb2"
            type="text"
            value={url}
            name="url"
            onChange={this.onChange}
            placeholder="The URL for the link"/>
        </div>
        <Mutation 
          mutation={POST_MUTATION} 
          variables={{ description, url }}
          onCompleted={()=>{
            this.props.history.push('/');
          }}
          update={(store, { data: { post }})=>{
            const data = store.readQuery({ query: FEED_QUERY });
            data.feed.links.unshift(post);

            store.writeQuery({ query: FEED_QUERY, data })
          }}
        >
          {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>
      </div>
    );
  }
}

export default CreateLink;