import React, { Component } from 'react';
import PropTypes from 'prop-types'
import EditPostForm from './EditPostForm'
import { connect } from 'react-redux'
import {  editPost, destroyPost } from '../actions'
import { reset } from 'redux-form'
import Modal from 'react-modal'

class PostChange extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
  }

  state = {
    postModalOpen: false
  }

  openEditPostModal = () => this.setState(() => ({ postModalOpen: true }))
  closeEditPostModal = () => this.setState(() => ({ postModalOpen: false }))

  editPost = (post) => {
    const updatedPost = {
      id: post.id,
      timestamp: Date.now(), //update with edit time
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      commentCount: post.commentCount
    }

    this.props.updatePost(updatedPost)
    this.props.resetPostForm()
    this.closeEditPostModal()
  }

  deletePost =(postId) => this.props.destroyPost(postId)

  render() {
    const {post} = this.props
    const { postModalOpen } = this.state

    return (
      <div className="post-changes">
        <Modal
          className='modal post-modal'
          overlayClassName='overlay'
          isOpen={postModalOpen}
          onRequestClose={this.closeAddPostModal}
          contentLabel='Modal'
        >
          <div className="close-click" onClick={this.closeEditPostModal}>X</div>
          {postModalOpen && <EditPostForm
            initialValues={post}
            onSubmit={this.editPost} />}
        </Modal>
        <div className="delete-white icon" onClick={this.deletePost.bind(this, post.id)}></div>
        <div className="edit-white icon" onClick={this.openEditPostModal}></div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePost: (post) => dispatch(editPost(post)),
    resetPostForm: () => dispatch(reset('postForm')),
    destroyPost:  (postId) => dispatch(destroyPost(postId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostChange)
