import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

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
          }}>
          {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>
      </div>
    );
  }
}

export default CreateLink;