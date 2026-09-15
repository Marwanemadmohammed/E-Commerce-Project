import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useAuth } from '../Context/Auth/AuthContext';
import { Badge, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import  ShoppingCart  from '@mui/icons-material/ShoppingCart';


function Navbar() {

    const {userName , isAutheticated , logout} = useAuth();

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/loginUser");
    };

    const handleLogout = () =>{
        logout();
        navigate("/");
        handleCloseUserMenu();
    };

    const handleRegister = ()=>{
        navigate("/register");
    };

    const returnHome = () => {
        navigate("/");
    };


    const handleCart = () =>{
        navigate("/cart");
    };



    return (
        <AppBar position="fixed" sx={{backgroundColor: "#fafafa"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{display:"flex" , justifyContent:"space-between" , alignItems:"center"}}>
                    <Box 
        sx={{
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center", 
        cursor: "pointer",
        mr: 'auto'
        }} 
        onClick={returnHome}>
                    <AdbIcon sx={{ display: { md: 'flex' }, mr: 1 , color:'#24acce'}} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 1,
                            display: { md: 'flex'},
                            fontFamily:"monospace",
                            fontWeight: 700,
                            color:"#24acce"
                        }}
                    >
                        Tech Hub
                    </Typography>
                    </Box>


                    <Box sx={{ flexGrow: 0, ml: 'auto' }}>
                        {isAutheticated ? <>
                        <Tooltip title="Open settings">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                                    <IconButton aria-label="cart" onClick={handleCart}>
                                        <Badge badgeContent={2} color="secondary">
                                            <ShoppingCart />
                                        </Badge>
                                    </IconButton>
                                <Typography sx={{color:"black"}}>Hello, {userName}</Typography>
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt={userName || ""} src="/static/images/avatar/2.jpg">
                                            S
                                        </Avatar>
                                    </IconButton>
                            </Box>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}>

                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography style={{ textAlign: 'center' }}>My Orders</Typography>
                                </MenuItem>
                                <MenuItem  onClick={handleLogout}>
                                    <Typography style={{ textAlign: 'center' }}>Logout</Typography>
                                </MenuItem>

                        </Menu>
                        </> : <Box  sx={{display:"flex" , justifyContent:"center" , alignItems:"center" , gap:3}}>
                        <Button sx={{color:"white" , background:"#24acce"}} onClick={handleLogin}>Login</Button>
                        <Button sx={{color:"white" , background:"#24acce" }} onClick={handleRegister}>Register Now</Button>
                        </Box>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;