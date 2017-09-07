import React from 'react';
import moment from 'moment';
require('./index.css');

export default class TrainingApp extends React.Component {
  constructor() {
    super();
    this.state = {
      // text: null,
      repos: null
    };

    // fetch('https://gist.githubusercontent.com/zeropaper/fd86215010dc650d56a3/raw/29132c563421008660977ab2b913c5899b98afff/the-road-so-far.txt')
    //   .then(res => res.text())
    //   .then(res => {
    //     this.setState({text: res});
    //   });
    // fetch('https://api.github.com/graphql', {
    //   method: 'post',
    //   mode: 'cors',
    //   body: `{
    //     user(login: "zeropaper") {
    //       repositories(first: 100, orderBy: {field: CREATED_AT, direction: DESC}, privacy: PUBLIC) {
    //         nodes {
    //           name
    //           description
    //           nameWithOwner
    //           repositoryTopics(first:20) {
    //             nodes {
    //               topic {
    //                 name
    //               }
    //             }
    //           }
    //           createdAt
    //           updatedAt
    //         }
    //       }
    //     }
    //   }`
    // })
    fetch('https://api.github.com/users/zeropaper/repos?sort=created', {
      headers: {
        Accept: 'application/vnd.github.mercy-preview+json'
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          // repos: res.data.user.repositories.nodes.filter(repo => {
          repos: res.filter(repo => {
            // return repo.name.indexOf('x-') === 0;
            return repo.name.indexOf('x-') === 0;
          })
        });
        console.info('repositories', this.state.repos);
      })
      .catch(err => {
        this.setState({
          repos: []
        });
      });
  }

  render() {

    const listItems = (this.state.repos || []).map(repo => {
      const repoUrl = 'https://github.com/' + repo.full_name;
      const topics = repo.topics
                      .filter(topic => topic !== 'exercise')
                      .map(topic => <li key={topic}>{topic}</li>);

      return (<section className="exercise-card" key={repo.full_name}>
        <header>
          <h1><a href={repoUrl}>{repo.name}</a></h1>
          <ul className="topics">{topics}</ul>
        </header>
        <div className="description">{repo.description}</div>
        <footer>
          <div className="date created">Created: {moment(repo.created_at).format('LLL')}</div>
          <div className="date updated">Updated: {moment(repo.updated_at).format('LLL')}</div>
        </footer>
      </section>)
    });

    return (
      <div>
        <header>
          <h1>Training</h1>
          <div>{listItems.length} exercises to learn or stay sharp</div>
        </header>
        <main className="exercises">
          {listItems}
        </main>
      </div>
    );
  }
}