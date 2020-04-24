import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import MoreIcon from "@material-ui/icons/MoreVert";
import { NavLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
const useStyles = makeStyles((theme) => ({
  mobileLink: { textDecoration: "none", color: "black" },
  iconRoot: {
    backgroundColor: "#ec407a",
    "&:hover ": {
      backgroundColor: "#ec407a",
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
  title: {
    display: "none",
    color: "white",
    textDecoration: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function SignedInLinks(props) {
  const classes = useStyles();
  //#region Menu and handlers
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <NavLink
          onClick={props.signOut}
          style={{ textDecoration: "none", color: "black" }}
          to="/"
        >
          Sign Out
        </NavLink>
      </MenuItem>
      <MenuItem>
        <Avatar aria-label={props.user.userName} className={classes.iconRoot}>
          {props.user.userName[0]}
        </Avatar>
      </MenuItem>
    </Menu>
  );
  //#endregion

  return (
    <div>
      <div className={classes.sectionDesktop}>
        <Button color="inherit">
          <NavLink onClick={props.signOut} className={classes.link} to="/">
            Sign Out
          </NavLink>
        </Button>
        <Avatar aria-label={props.user.userName} className={classes.iconRoot}>
          {props.user.userName[0]}
        </Avatar>
        <Button color="inherit">{props.user.userName}</Button>
      </div>
      <div className={classes.sectionMobile}>
        <IconButton
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </div>
      {renderMobileMenu}
    </div>
  );
}
