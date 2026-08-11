import {
    Box,
    List,
    Link,
    ListItem,
    ListItemText,
    Typography,
} from '@mui/material';
import { DrawerAppBar } from '../components/appbar.jsx';

const About = () => {
    const turns = 'Players take turns choosing any two cards and flipping them face up.'
    const matching = 'If the two cards\' content match, the player eliminated that pair.'
    const mismatch = 'If the cards do not match, they are flipped back face down in their original spots'
    const winning = 'The game ends when all cards have been paired and user can increase difficulty by advancing to the next level'
    return <main>
        <DrawerAppBar showScore={false} />
        <Box style={{ padding: '20px' }}>
            <Typography>
                <Link
                    href='https://en.wikipedia.org/wiki/Concentration_(card_game)'
                    color='textPrimary'
                    target='_blank'
                    variant='body1'
                >
                    Concentration
                </Link> is a classic matching card game where players turn over two
                cards at a time to find and collect identical pairs.
                What makes this interesting is different image themes are used throughout the game.
                You can choose or search for any theme that suit your interest or play with random images.
                Special thanks to Unsplash API for making this possible. All images are Unplash proprietary
            </Typography>

            <List
                aria-label='contacts'
            >
                <ListItem disablePadding>
                    <ListItemText primary="How to play:"/>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemText inset primary={turns}/>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemText inset primary={matching}/>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemText inset primary={mismatch}/>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemText inset primary={winning}/>
                </ListItem>
            </List>
        </Box>
    </main>
}

export default About;