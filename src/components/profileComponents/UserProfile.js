import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Button,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WcIcon from '@mui/icons-material/Wc';
import CakeIcon from '@mui/icons-material/Cake';
import PublicIcon from '@mui/icons-material/Public';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarRateIcon from '@mui/icons-material/StarRate';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SectionTwo from "../layouts/SectionTwo";
import UserCourses from "./UserCourses";

export default function UserProfile() {
  const { id } = useParams();
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/${id}`);
        setUser(res.data.user);
      } catch (err) {
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (id) {
          await axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/images/${id}`)
            .then((response) => {
              setImageUrl(response.data[response.data.length - 1].image_url)
            })
            .catch((error) => {
              console.error("Error fetching images:", error);
            });
        }

      } catch (err) {
        if (err.response && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("An error occurred while fetching user data.");
        }
      }
    };

    fetchUserData();
  }, [id]);


  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <Typography variant="h6">User not found.</Typography>
      </Box>
    );
  }

  return (
     <SectionTwo title={`${user.user_name}'s proile`}>
    <Box
      minHeight="100vh"
      px={isMobile ? 2 : 10}
      py={isMobile ? 2 : 5}
      sx={{   backgroundColor: '#ffffff',
        minHeight: '100vh',
        paddingBottom: 5,}}
    >
      <Button
        variant="contained"
        color="primary"
        startIcon={<ArrowBackIcon />}
        onClick={() => history.goBack()}
        sx={{ mb: 4 }}
      >
        Return to Preview Page
      </Button>

      <Box textAlign="center" mb={4}>
        <Avatar
         src={imageUrl || "/assets/images/tutorprofil.png"} 
          alt="Profile"
          sx={{
            width: isMobile ? 100 : 150,
            height: isMobile ? 100 : 150,
            mx: 'auto',
            mb: 2,
          }}
        />
        <Typography variant={isMobile ? 'h4' : 'h3'}>{user.user_name}</Typography>
        <Typography variant="h6" color="text.secondary">
          {user.type_register}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Typography fontSize="1.2rem">
            <EmailIcon /> Email: {user.user_email}
          </Typography>
          <Typography fontSize="1.2rem">
            <PhoneIcon /> Phone: {user.phone_number || 'N/A'}
          </Typography>
          <Typography fontSize="1.2rem">
            <WcIcon /> Gender: {user.gender || 'N/A'}
          </Typography>
          <Typography fontSize="1.2rem">
            <CakeIcon /> DOB: {user.date_of_birth ? new Date(user.date_of_birth).toLocaleDateString() : 'N/A'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography fontSize="1.2rem">
            <strong>Bio:</strong> {user.bio || 'No bio provided'}
          </Typography>
        </Grid>
      </Grid>

      {user.type_register === 'tutor' && (
        <Box mt={6}>
          <Typography variant="h4" gutterBottom>
            Tutor Details
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Typography fontSize="1.2rem">
                <PublicIcon /> Country: {user.country || 'N/A'}
              </Typography>
              <Typography fontSize="1.2rem">
                <MonetizationOnIcon /> Price/hour: {user.price_per_hour || 'N/A'} €
              </Typography>
              <Typography fontSize="1.2rem">
                <SchoolIcon /> Degree: {user.degree || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography fontSize="1.2rem">
                <MenuBookIcon /> Specialty: {user.specialty || 'N/A'}
              </Typography>
              <Typography fontSize="1.2rem">
                <GTranslateIcon /> Languages: {user.languages || 'N/A'}
              </Typography>
              <Typography fontSize="1.2rem">
                <AccessTimeIcon /> Availability: {user.availability || 'N/A'}
              </Typography>
              <Typography fontSize="1.2rem">
                <StarRateIcon /> Rating: {user.rating ?? 'No rating yet'}
              </Typography>
              <Typography fontSize="1.2rem">
                <CheckCircleIcon /> Active: {user.is_active ? 'Yes' : 'No'}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
    <div className="container mt-4">
    <UserCourses userId={id} />
    </div>
    </SectionTwo>
  );
}
