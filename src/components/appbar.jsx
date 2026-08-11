import { useState, useId, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../slices/game-slice.js';
import { useNavigate } from "react-router-dom";
import { indigo } from '@mui/material/colors';
import {
    AppBar,
    Box,
    CssBaseline,
    Toolbar,
    Typography,
    Button,
    Menu,
    Link,
    Skeleton,
    Divider,
    TextField,
    MenuItem } from '@mui/material';

export const DrawerAppBar = ({ showScore = true }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const navItems = ['Home', 'Theme', 'About'];

    const [anchorEl, setAnchorEl] = useState(null);
    const [enteredTheme, setEnteredTheme] = useState(false);
    const open = Boolean(anchorEl);

    const id = useId();
    const buttonId = `${id}-button`;
    const menuId = `${id}-menu`;

    const { moveCount, theme } = useSelector((state) => state.game);
    const { loading, error, randomImages } = useSelector((state) => state.randomImages);
    const [seconds, setSeconds] = useState(0);

    const handleMenuThemeClick = newTheme =>  () => {
        dispatch(changeTheme({ theme: newTheme }));
    }

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEnteredTheme =  event => {
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

    const homeButton = <Button onClick={() => navigate('/')} key={navItems[0]} style={{ color: indigo[50] }}>
        Home
    </Button>

    const themeButton = <div>
        <Button
            id={buttonId}
            key={navItems[1]}
            onClick={handleClick}
            style={{ color: indigo[50] }}
        >
            Theme
        </Button>
        <Menu
            anchorEl={anchorEl}
            anchor
            disableAutoFocusItem={true}
            autoFocus={false}
            disableEnforceFocus={true}
            disableAutoFocus={true}
            id={menuId}
            open={open}
            onClose={handleClose}
            slotProps={{
                list: {
                    'aria-labelledby': buttonId,
                },
            }}
        >
            <MenuItem
                aria-disabled
                sx={{
                    '&:hover': {
                        backgroundColor: 'transparent',
                    }
                }}
            >
                <Typography sx={{ color: indigo[500] }}>
                    Current: {theme ?? 'none'}
                </Typography>
            </MenuItem>
            <MenuItem aria-disabled >
                <TextField
                    onKeyDown={handleEnteredTheme}
                    onChange={e => {
                        setEnteredTheme(e.target.value);
                    }}
                    id='enter-theme'
                    label='Theme'
                    helperText='Enter your theme'
                    size='small'
                    variant='standard'
                />
            </MenuItem>
            <Divider sx={{ color: indigo[50] }} />
            <MenuItem
                aria-disabled
                onClick={handleMenuThemeClick('Vietnam')}
            >
                Vietnam
            </MenuItem>
            <MenuItem
                aria-disabled
                onClick={handleMenuThemeClick('Japan')}
            >
                Japan
            </MenuItem>
            <MenuItem
                aria-disabled
                onClick={handleMenuThemeClick('USA')}
            >
                USA
            </MenuItem>
            <MenuItem
                aria-disabled
                onClick={handleMenuThemeClick('Cat')}
            >
                Cat
            </MenuItem>
            <MenuItem
                aria-disabled
                onClick={handleMenuThemeClick('Dog')}
            >
                Dog
            </MenuItem>
            <MenuItem
                aria-disabled
                onClick={handleMenuThemeClick('Spiderman')}
            >
                Spiderman
            </MenuItem>
            <Divider sx={{ color: indigo[50] }} />
            <MenuItem
                aria-disabled
                onClick={handleMenuThemeClick(null)}
            >
                Random
            </MenuItem>
        </Menu>
    </div>

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
