import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ImagesCard = ({ currentImages, openModal, handleImageClick }) => {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {currentImages &&
        currentImages.map((item) => (
          <Box
            key={item.id}
            display="flex"
            onClick={() => handleImageClick(item)}
            flexWrap="wrap"
            gap={4}
            justifyContent="center"
          >
            <Card sx={{ width: 262, border: "2px solid #1E3A8A" }}>
              <CardContent>
                <Typography variant="h6" component="div" align="center">
                  {item.author}
                </Typography>
                <div className="flex justify-center">
                  <button
                    className="border-2 border-sky-500 p-2 rounded-2xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(item.download_url);
                    }}
                  >
                    Preview
                  </button>
                </div>
              </CardContent>
              <CardMedia
                component="img"
                height="250"
                image={item.download_url}
                alt={item.author}
              />
            </Card>
          </Box>
        ))}
    </div>
  );
};

export default ImagesCard;
