// @Vendor
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
      <CSSTransition key={post.data.author_fullname} timeout={500} classNames='move'>
        <Post
          index={index}
          key={index}
          post={post.data}
        />
      </CSSTransition>
    )
  }

  const postsArray = posts && renderPosts();

  return (
    <aside className='PostsList'>
      <header className='PostsList-header'>
        <button className='PostsList-button' disabled={count === 50 || !posts.length} onClick={prevPage}>
          <span className='PostsList-button-icon'>&#10094;</span>
        </button>
        <h2>Reddit Posts</h2>
        <button className='PostsList-button' disabled={!posts.length} onClick={nextPage}>
          <span className='PostsList-button-icon'>&#10095;</span>
        </button>
      </header>
      {
        fetching ?
          <div className={'loader-container'} style={{}}>
            <div className='loader' data-testid='loader' />
          </div> :
          <TransitionGroup className='PostsList-list' component='ul'>
            {postsArray}
          </TransitionGroup>
      }
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
