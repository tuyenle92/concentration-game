import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../slices/game-slice.js';
import { useNavigate } from "react-router-dom";
import { indigo } from '@mui/material/colors';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
    AppBar,
    Box,
    CssBaseline,
    Toolbar,
    Typography,
    Link,
    Skeleton,
    TextField,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Drawer,
    Collapse,
} from '@mui/material';

export const DrawerAppBar = ({ showScore = true }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [enteredTheme, setEnteredTheme] = useState(false);

    const { moveCount, theme } = useSelector((state) => state.game);
    const { loading, error, randomImages } = useSelector((state) => state.randomImages);
    const [seconds, setSeconds] = useState(0);

    const handleMenuThemeClick = newTheme => () => {
        dispatch(changeTheme({ theme: newTheme }));
    }

    const handleEnteredTheme = event => {
        if (event.key === 'Enter') {
            dispatch(changeTheme({ theme: enteredTheme }));
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if ((randomImages !== null && randomImages.length === 0)) {
                clearInterval(interval);
            } else {
                setSeconds((prevSeconds) => prevSeconds + 1)
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [randomImages]);

    const DrawerList = (
        <Box sx={{ width: 180, height: '100%', backgroundColor: indigo[50] }} role="presentation">
            <List>
                <ListItemButton onClick={() => navigate('/')}>
                    <ListItemText>
                        Home
                    </ListItemText>
                </ListItemButton>

                <ListItemButton onClick={() => setCollapsed(!collapsed)}>
                    <ListItemText>
                        Theme: {theme}
                    </ListItemText>
                    {collapsed ? <ExpandMore/> : <ExpandLess/>}
                </ListItemButton>

                <Collapse in={collapsed} unmountOnExit timeout='auto'>
                    <List component='div' disablePadding>
                        <ListItemButton onClick={handleMenuThemeClick('Japan')} sx={{ pl: 4 }}>
                            <ListItemText>
                                Japan
                            </ListItemText>
                        </ListItemButton>


                        <ListItemButton onClick={handleMenuThemeClick('Nature')} sx={{ pl: 4 }}>
                            <ListItemText>
                                Nature
                            </ListItemText>
                        </ListItemButton>

                        <ListItemButton onClick={handleMenuThemeClick('Spiderman')} sx={{ pl: 4 }}>
                            <ListItemText>
                                Spiderman
                            </ListItemText>
                        </ListItemButton>

                        <ListItemButton onClick={handleMenuThemeClick('Car')} sx={{ pl: 4 }}>
                            <ListItemText>
                                Car
                            </ListItemText>
                        </ListItemButton>

                        <ListItem disablePadding disableGutters sx={{ pl: 4 }}>
                            <TextField
                                aria-disabled
                                onKeyDown={handleEnteredTheme}
                                onChange={e => {
                                    setEnteredTheme(e.target.value);
                                }}
                                id='enter-theme'
                                label='Theme'
                                helperText='Enter your theme'
                                size='medium'
                                variant='standard'
                            />
                        </ListItem>
                    </List>
                </Collapse>

    const aboutButton = <Button onClick={() => navigate('/about')} key={navItems[2]} style={{ color: indigo[50] }}>
        About
    </Button>

    const menuButtons = [homeButton, themeButton, aboutButton];

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component='nav' sx={{ backgroundColor: indigo[500] }}>
                <Toolbar>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ color: indigo[50], flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Concentration (card game) power by  <Link variant='button' style={{ color: indigo[50] }} target='_blank' underline='hover' href="https://unsplash.com/">Unsplash</Link>
                    </Typography>

                    {
                        error === null && showScore
                        ? <Box sx={{ flexGrow: 1, display: 'block' }}>
                                <Typography
                                    variant='subtitle1'
                                    component='div'
                                    style={{ color: indigo[50] }}
                                >
                                    { loading && randomImages === null ? <Skeleton /> : 'Number of mismatch: ' + moveCount }
                                </Typography>
                                <Typography
                                    variant='subtitle1'
                                    component='div'
                                    style={{ color: indigo[50] }}
                                >
                                    { loading && randomImages === null ? <Skeleton /> : 'Seconds elapsed: ' + seconds }
                                </Typography>

                            </Box>
                        : null
                    }

                    <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                        { menuButtons }
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
