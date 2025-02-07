import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

const ImagesCard = ({ currentImages, openModal , imageUrl }) => {
  console.log(imageUrl, "imageUrl")
  return (
    <Box onClick={()=> openModal(imageUrl)} display="flex" flexWrap="wrap"  gap={4} justifyContent="center" >
      {currentImages && currentImages.map(item => (
        <Card
          key={item.id}
          sx={{ width: 262, border: '2px solid #1E3A8A'}}
            onClick={() => openModal(item)}
          >
            <CardContent>
              <Typography variant="h6" component="div" align="center">
                {item.author}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              height="250"
              image={item.download_url}
              alt={item.author}  
            />
          </Card>
        
      ))}
    </Box>
    
  );
};

export default ImagesCard;