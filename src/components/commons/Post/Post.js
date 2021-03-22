// @Vendor
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

// @Actions
import RedditActions from '../../../redux/RedditRedux';

// @Styles
import './Post.css';

function Post({ dissmissPost, index, post, setSelectedPost }) {
  const { author, created, num_comments, thumbnail, title } = post;
  const [read, setRead] = React.useState(false);

  const showDetails = (evt) => {
    evt.preventDefault();

    setRead(true);
    setSelectedPost(post);
  }

  const dismiss = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    dissmissPost(index);
  }

  const statusElem = !read && <span className='Post-status'></span>
  const thumbnailElem = thumbnail && <img className='Post-thumbnail' src={thumbnail} alt='thumbnail' />

  return (
    <li className='Post' onClick={showDetails}>
      <header className='Post-header'>
        {statusElem}
        <span className='Post-author'>{author}</span>
        <span className='Post-date'>{moment.unix(created).fromNow()}</span>
      </header>
      <section className='Post-body'>
        {thumbnailElem}
        <span className='Post-title'>{title}</span>
        <span className='Post-arrow'></span>
      </section>
      <footer className='Post-footer'>
        <div>
          <button className='Post-button' onClick={dismiss}>
            <span className='Post-dismiss'>X</span>
            <span> Dismiss Post</span>
          </button>
        </div>
        <div>
          <span className='Post-comments'>{num_comments} comments</span>
        </div>
      </footer>
    </li>
  );
}

Post.propTypes = {
  dissmissPost: PropTypes.func,
  index: PropTypes.number,
  post: PropTypes.object,
  setSelectedPost: PropTypes.func
}

const mapDispatchToProps = {
  dissmissPost: RedditActions.dissmissPost,
  setSelectedPost: RedditActions.setSelectedPost
};

export default connect(null, mapDispatchToProps)(Post);
