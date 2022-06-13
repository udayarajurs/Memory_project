import React, {useState, useEffect} from 'react';
import useStyles from './styles';
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {createPost, updatePost} from '../../actions/posts';

const Form = ({currentID, setCurrentId}) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();
  const post = useSelector(state =>
    currentID ? state.posts.posts.find(post => post._id === currentID) : null,
  );
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
    userID: user?.result?._id,
  });

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
      userID: user?.result?._id,
    });
  };

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handleSubmit = e => {
    e.preventDefault();
    if (currentID !== null) {
      dispatch(createPost({...postData, name: user?.result?.name}, history));
    } else {
      dispatch(updatePost(currentID, {...postData, name: user?.result?.name}));
    }
    clear();
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to createyour own memories and like other's memories
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}>
        <Typography variant="h6">{`${
          currentID ? 'Editing' : 'Creating'
        } a Memory`}</Typography>
        {/* <TextField
          name="Creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={e => setPostData({...postData, creator: e.target.value})}
        /> */}
        <TextField
          name="title"
          variant="outlined"
          label="title"
          fullWidth
          value={postData.title}
          onChange={e => setPostData({...postData, title: e.target.value})}
        />
        <TextField
          name="message"
          variant="outlined"
          label="message"
          fullWidth
          value={postData.message}
          onChange={e => setPostData({...postData, message: e.target.value})}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="tags"
          fullWidth
          value={postData.tags}
          onChange={e =>
            setPostData({...postData, tags: e.target.value.split(',')})
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({base64}) =>
              setPostData({...postData, selectedFile: base64})
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth>
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
