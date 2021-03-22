// @Vendor
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// @Components
import Post from '../../commons/Post/Post';

// @Actions
import RedditActions from '../../../redux/RedditRedux';

// @Styles
import './PostsList.css';

function PostsList({ after, before, count, dismissAllPosts, fetchTop, fetching, posts }) {
  React.useEffect(() => {
    !posts.length && fetchTop();
  }, [fetchTop]);

  const nextPage = () => fetchTop(after);

  const prevPage = () => fetchTop(null, before);

  const renderPosts = () => {
    return posts.map((post, index) =>
      <Post
        index={index}
        key={index}
        post={post.data}
      />
    )
  }

  const postsArray = posts && renderPosts();

  return (
    <aside className='PostsList'>
      <header className='PostsList-header'>
        <button disabled={count === 50 || !posts.length} onClick={prevPage} style={{ borderRadius: 25, backgroundColor: '#FFF', border: 0, height: 50, width: 50, cursor: 'pointer' }}>
          <p>Prev</p>
        </button>
        <h2>Reddit Posts</h2>
        <button disabled={!posts.length} onClick={nextPage} style={{ borderRadius: 25, backgroundColor: '#FFF', border: 0, height: 50, width: 50, cursor: 'pointer' }}>
          <p>Next</p>
        </button>
      </header>
      <ul className='PostsList-list'>
        {
          fetching &&
          <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <div className="loader" />
          </div>
        }
        {postsArray}
      </ul>
      <footer className='PostsList-footer' onClick={dismissAllPosts}>
        Dismiss All
      </footer>
    </aside >
  );
}

PostsList.propTypes = {
  after: PropTypes.string,
  before: PropTypes.string,
  count: PropTypes.number,
  dismissAllPosts: PropTypes.func,
  fetchTop: PropTypes.func,
  fetching: PropTypes.bool,
  posts: PropTypes.array
}

const mapStateToProps = ({ reddit }) => {
  return {
    after: reddit.after,
    before: reddit.before,
    count: reddit.count,
    fetching: reddit.fetching,
    posts: reddit.posts
  };
};

const mapDispatchToProps = {
  dismissAllPosts: RedditActions.dismissAllPosts,
  fetchTop: RedditActions.fetchTopRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
