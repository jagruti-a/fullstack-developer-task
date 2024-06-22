import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';

const CharacterCard = ({ character }) => {
    return (
        <Card sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <CardMedia
                component="img"
                sx={{ width: 100, height: 100, marginLeft: 2, borderRadius: 2 }}
                image={character.images.jpg.image_url}
                alt={character.name}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <CardContent sx={{ paddingLeft: 2 }}>
                    <Typography variant="h6" align="left">
                        {character.name}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 1, marginBottom: 1 }}>
                        {character.nicknames.map((nickname, index) => (
                            <Chip key={index} label={nickname} variant="outlined" size="small" />
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
                            <FavoriteIcon sx={{ color: 'red', marginRight: 0.5 }} />
                            {character.favorites.toLocaleString()}
                        </Typography>
                        <IconButton
                            href={character.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            color="primary"
                        >
                            <ArrowForwardIcon />
                        </IconButton>
                    </Box>
                </CardContent>
            </Box>
        </Card>
    );
};

CharacterCard.propTypes = {
    character: PropTypes.shape({
        images: PropTypes.shape({
            jpg: PropTypes.shape({
                image_url: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
        name: PropTypes.string.isRequired,
        nicknames: PropTypes.arrayOf(PropTypes.string).isRequired,
        favorites: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
    }).isRequired,
};

export default CharacterCard;
