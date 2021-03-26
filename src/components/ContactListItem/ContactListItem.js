import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Avatar,
  Box,
  IconButton,
  SvgIcon,
  makeStyles,
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import phonebookOperations from '../../redux/phoneBook/phoneBook-operations';
import styles from './ContactListItem.module.css';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',

    '& > *': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[300],
  },
}));

export default function ContactListItem({ idx, contact, location }) {
  const { id, name, number } = contact;
  const dispatch = useDispatch();
  const onDeleteButtonClick = useCallback(
    () => dispatch(phonebookOperations.deleteContact(id)),
    [dispatch, id],
  );
  const classes = useStyles();

  return (
    <li key={id} className={idx % 2 === 0 ? styles.even : styles.odd}>
      <Box className={classes.root}>
        <Avatar className={classes.avatar}>
          {name.toUpperCase().slice(0, 1)}
        </Avatar>
        <Box component="span">
          {name}: {number}
        </Box>
      </Box>
      <Box>
        <Link
          to={{
            pathname: `/contacts/${id}`,
            state: {
              from: location,
              contactObj: contact,
            },
          }}
        >
          <IconButton aria-label="edit" type="button">
            <SvgIcon>
              <path
                fill="currentColor"
                d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z"
              />
            </SvgIcon>
          </IconButton>
        </Link>
        <IconButton
          aria-label="delete"
          type="button"
          onClick={onDeleteButtonClick}
        >
          <SvgIcon>
            <path
              fill="currentColor"
              d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8.46,11.88L9.87,10.47L12,12.59L14.12,10.47L15.53,11.88L13.41,14L15.53,16.12L14.12,17.53L12,15.41L9.88,17.53L8.47,16.12L10.59,14L8.46,11.88M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"
            />
          </SvgIcon>
        </IconButton>
      </Box>
    </li>
  );
}

ContactListItem.propTypes = PropTypes.shape({
  idx: PropTypes.number.isRequired,
  contact: PropTypes.object.isRequired,
}).isRequired;
