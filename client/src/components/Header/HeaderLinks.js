/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import Facebook from '@mui/icons-material/Facebook';
import Instagram from '@mui/icons-material/Instagram';
import GitHub from '@mui/icons-material/GitHub';
import LinkedIn from '@mui/icons-material/LinkedIn';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "./../CustomDropdown/CustomDropdown";
import Button from "./../CustomButtons/Button";

import styles from "./../../assets/jss/material-kit-react/components/headerLinksStyle";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
       
      </ListItem>
     
      <ListItem className={classes.listItem}>
        {/*<Tooltip title="Delete">
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>*/}
        <Tooltip
          id="instagram-twitter"
          title="Follow us on Facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://Facebook.com/"
            target="_blank"
            color="transparent"
            className={classes.navLink}
            startIcon={<Facebook />}
          >
           
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
       
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on Github"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
          startIcon={<GitHub />}
        >
          <Button
            color="transparent"
            href="https://github.com/nuri35"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
          
        </Tooltip>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on linkedin"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
          startIcon={<GitHub />}
        >
          <Button
            color="transparent"
            href="https://www.linkedin.com/in/nurettin-sen/"
            target="_blank"
            className={classes.navLink}
            startIcon={<LinkedIn />}
          >
       
          </Button>
          
        </Tooltip>
      </ListItem>
    </List>
  );
}
