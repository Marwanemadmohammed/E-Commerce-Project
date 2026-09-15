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
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function Navbar() {

    const {userName , isAutheticated} = useAuth();

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
    }


    return (
        <AppBar position="fixed" sx={{backgroundColor: "#fafafa"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 , color:'#24acce' }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color:"#24acce"
                        }}
                    >
                        Tech Hub
                    </Typography>


                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' , color:'#24acce'  }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: '#24acce',
                            textDecoration: 'none',
                        }}
                    >
                        Tech Hub
                    </Typography>

                    <Box sx={{ flexGrow: 0, ml: 'auto' }}>
                        {isAutheticated ? <>
                        <Tooltip title="Open settings">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
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
                                <MenuItem  onClick={handleCloseUserMenu}>
                                    <Typography style={{ textAlign: 'center' }}>Logout</Typography>
                                </MenuItem>

                        </Menu>
                        </> : <Button sx={{color:"white" , background:"#24acce"}} onClick={handleLogin}>Login</Button>}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;