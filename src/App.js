// @Vendors
import React from 'react';
import { connect } from 'react-redux';

// @Components
import PostsList from './components/layout/PostsList/PostsList';
import PostDetail from './components/layout/PostDetail/PostDetail'

// @Styles
import './App.css';

function App({ selectedPost }) {
  return (
    <main className='App'>
      <PostsList />

      {selectedPost && <PostDetail post={selectedPost} />}
    </main>
  );
}

const mapStateToProps = ({ reddit }) => {
  return {
    selectedPost: reddit.selectedPost
  };
};

export default connect(mapStateToProps, null)(App);
