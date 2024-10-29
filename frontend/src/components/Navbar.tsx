import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Favorite, ShoppingCart } from "@mui/icons-material";
import { useAuth } from "../context/Auth/AuthContext";
import Grid from "@mui/material/Grid";
import { Badge, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart/CartContext";
import { useFavorites } from "../context/Favorites/FavoritesContext";

function Navbar() {
  const { username, isAuthenticated, isAdmin, logout } = useAuth();
  const { cartItems } = useCart();
  const { favoriteItems } = useFavorites();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleUserManagement = () => {
    navigate("/admin/users");
    handleCloseUserMenu();
  };

  const HandleMyOrders = () => {
    navigate("/my-orders");
    handleCloseUserMenu();
  };
  const handleLogout = () => {
    logout();
    navigate("/");
    handleCloseUserMenu();
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const handleFavorites = () => {
    navigate("/favorites");
  };

  const handleLogoClick = () => {
    if (isAdmin) {
      navigate("/admin-dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button
              variant="text"
              sx={{ color: "#fff" }}
              onClick={handleLogoClick}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <AdbIcon sx={{ display: "flex", mr: 1 }} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                  }}
                >
                  Tech Hub
                </Typography>
              </Box>
            </Button>
            <Box
              gap={4}
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              {!isAdmin && (
                <>
                  <IconButton aria-label="favorites" onClick={handleFavorites}>
                    <Badge
                      badgeContent={favoriteItems.length}
                      color="secondary"
                    >
                      <Favorite sx={{ color: "#ffffff" }} />
                    </Badge>
                  </IconButton>
                  <IconButton aria-label="cart" onClick={handleCart}>
                    <Badge badgeContent={cartItems.length} color="secondary">
                      <ShoppingCart sx={{ color: "#FFFFFF" }} />
                    </Badge>
                  </IconButton>
                </>
              )}
              {isAuthenticated ? (
                <>
                  <Tooltip title="Open settings">
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="center"
                      gap={2}
                    >
                      <Grid item>
                        <Typography>{username}</Typography>
                      </Grid>
                      <Grid item>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar
                            alt={username || ""}
                            src="/static/images/avatar/2.jpg"
                          />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {!isAdmin && (
                    <MenuItem onClick={HandleMyOrders}>
                      <Typography textAlign="center">My Orders</Typography>
                    </MenuItem>
                    )}
                    {isAdmin && (
                      <MenuItem onClick={handleUserManagement}>
                        <Typography textAlign="center">
                          Users
                        </Typography>
                      </MenuItem>
                    )}
                    <MenuItem onClick={handleLogout}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
