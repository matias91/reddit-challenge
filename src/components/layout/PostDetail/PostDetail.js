// @Vendor
import React from 'react';
import PropTypes from 'prop-types';

// @Styles
import './PostDetail.css';

export default function PostDetail({ post }) {
  const { author, thumbnail, title } = post;
  const thumbnailElem = thumbnail && <img className='PostDetail-thumbnail' src={thumbnail} alt='thumbnail' />

  return (
    <article className='PostDetail'>
      <header className='PostDetail-header'>
        <span className='PostDetail-author'>{author}</span>
      </header>
      <section className='PostDetail-body'>
        {thumbnailElem}
      </section>
      <footer className='PostDetail-footer'>
        <span className='PostDetail-title'>{title}</span>
      </footer>
    </article>
  );
}

PostDetail.propTypes = {
  post: PropTypes.object
}
