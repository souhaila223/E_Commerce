import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

interface CustomCardProps {
  title: string;
  value: number;
  link: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, value, link }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minWidth: 275, cursor: 'pointer' }} onClick={() => navigate(link)}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" component="div">
              {value}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
};

export default CustomCard;
