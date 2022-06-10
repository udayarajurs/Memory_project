
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const Paginate = () => {
 const classes = useStyles();

 return(
    <Pagination 
    classes={{ul: classes.ul}}
    count={5}
    page={1}
    variant="outlined"
    color="primary"
    renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${1}`}/>
    )}
    />
 )
}


export default Paginate;