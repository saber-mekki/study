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
  Rating,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Tabs, Tab
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CakeIcon from '@mui/icons-material/Cake';
import WcIcon from '@mui/icons-material/Wc';
import PublicIcon from '@mui/icons-material/Public';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarRateIcon from '@mui/icons-material/StarRate';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSelector } from "react-redux";

import SectionTwo from "../layouts/SectionTwo";
import UserCourses from "./UserCourses";
import RatingUser from './RatingUser';

export default function UserProfile() {
  const { id } = useParams();
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const CurrentUser = useSelector((state) => state.user);
  const [tabValue, setTabValue] = useState(0);
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [averageRating, setAverageRating] = useState(null);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loadingRate, setLoadingRate] = useState(true);

  const fetchRating = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/rating/${id}`)
      .then((res) => {
        setAverageRating(Number(res.data.average_rating));
        setTotalReviews(Number(res.data.total_reviews));
      })
      .catch((err) => {
        console.error("Error fetching tutor rating", err);
      })
      .finally(() => setLoadingRate(false));
  };
 
  useEffect(() => {
    fetchRating();
  }, [id]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/${id}`);
        setUser(res.data.user);

      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

   useEffect(() => {
    const fetchUserImage = async () => {
      try {
        if (id) {
          const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/images/${id}`);
          if (response.data.length > 0) {
            setImageUrl(response.data[response.data.length - 1].image_url);
          }
        }
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };
    fetchUserImage();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSendMessage = async () => {
    if (!messageText.trim()) {
      alert("Please enter a message");
      return;
    }
    const sendingMessage = {
      senderId: CurrentUser.idUser,
      receiverId: user.user_id,
      message: messageText.trim(),
    };
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/messages`,
        sendingMessage,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      setMessageSent(true);
      setMessageText('');
      setMessageOpen(false);
      console.log("Message sent:", response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <Typography variant="h6" color="error">{error}</Typography>
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
  const roleNumber = CurrentUser.role === 'student' ? 2 : 1
  const table = user.type_register !== 'student' ? [
    { icon: <MonetizationOnIcon color="success" fontSize="large" />, label: 'Price/hour', value: user.price_per_hour ? `${user.price_per_hour} €` : 'N/A' },

    { icon: <CheckCircleIcon color={user.is_active ? 'success' : 'error'} fontSize="large" />, label: 'Active', value: user.is_active ? 'Yes' : 'No' }
  ] : [
    { icon: <CheckCircleIcon color={user.is_active ? 'success' : 'error'} fontSize="large" />, label: 'Active', value: user.is_active ? 'Yes' : 'No' }
  ]
  return (
    <SectionTwo title={`${user.user_name}'s Profile`}>
      <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>

        {/* Cover Photo */}
        <Box sx={{
          height: 200,
          backgroundImage: `url('https://source.unsplash.com/1600x400/?education,workspace')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => history.goBack()}
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              backgroundColor: 'rgba(255,255,255,0.8)'
            }}
          >
            Back
          </Button>
          {/* Profile Avatar */}
          <Avatar
            src={imageUrl || "/assets/images/tutorprofil.png"}
            sx={{
              width: 150,
              height: 150,
              border: '5px solid white',
              position: 'absolute',
              bottom: -75,
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          />
        </Box>

        {/* Name & Action Buttons */}
        <Box textAlign="center" mt={10}>
          <Typography variant="h4" fontWeight="bold">{user.user_name}</Typography>
          <Typography textAlign="center" color="text.secondary">{user.type_register}</Typography>
          {user.type_register !== 'student' && <div><Rating
            value={averageRating || 0}
            precision={0.5}
            readOnly
            size="medium"
          />
            {totalReviews > 0 && (
              <Typography textAlign="center" color="text.secondary" mt={0.5}>
                {totalReviews} review{totalReviews > 1 && "s"}
              </Typography>
            )}</div>}


          <Box mt={2} display="flex" justifyContent="center" gap={2}>
            {(
              <Button variant="contained" onClick={() => setMessageOpen(true)}>Message</Button>
            )}

            <Button variant="outlined" href={`mailto:${user.user_email}`}>Email</Button>
          </Box>
          {/* Rating by Student  urrentUser.role=== 'student' */}

        </Box>

        {/* Quick Stats */}




        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="About" />
          {CurrentUser.role === 'student' && <Tab label="Ratings" />}
          {user.type_register !== 'student' && <Tab label="Courses" />
          }

        </Tabs>
        {/* About */}
        {tabValue === 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>

            {/* Stats */}
            <Grid container spacing={3} maxWidth="md" justifyContent="center">
              {table.map((stat, idx) => (
                <Grid item xs={6} sm={3} key={idx}>
                  <Box
                    sx={{
                      backgroundColor: '#fff',
                      p: 3,
                      borderRadius: 3,
                      boxShadow: 3,
                      textAlign: 'center',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6
                      }
                    }}
                  >
                    {stat.icon}
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>{stat.label}</Typography>
                    <Typography variant="h6" fontWeight="bold">{stat.value}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* Details */}
            <Grid container spacing={3} mt={4} maxWidth="md" justifyContent="center">
              {/* About */}
              <Grid item xs={12} md={6}>
                <Box sx={{ backgroundColor: '#fff', p: 3, borderRadius: 3, boxShadow: 3 }}>
                  <Typography variant="h6" gutterBottom>About</Typography>
                  <Typography><CakeIcon fontSize="small" sx={{ mr: 1 }} /> DOB: {user.date_of_birth ? new Date(user.date_of_birth).toLocaleDateString() : 'N/A'}</Typography>
                  <Typography><WcIcon fontSize="small" sx={{ mr: 1 }} /> Gender: {user.gender || 'N/A'}</Typography>
                  <Typography><PublicIcon fontSize="small" sx={{ mr: 1 }} /> Country: {user.country || 'N/A'}</Typography>
                  <Typography><GTranslateIcon fontSize="small" sx={{ mr: 1 }} /> Languages: {user.languages || 'N/A'}</Typography>
                </Box>
              </Grid>

              {/* Professional Details */}
              <Grid item xs={12} md={6}>
                <Box sx={{ backgroundColor: '#fff', p: 3, borderRadius: 3, boxShadow: 3 }}>
                  <Typography variant="h6" gutterBottom>Professional Details</Typography>
                  <Typography><SchoolIcon fontSize="small" sx={{ mr: 1 }} /> Degree: {user.degree || 'N/A'}</Typography>
                  <Typography><MenuBookIcon fontSize="small" sx={{ mr: 1 }} /> Specialty: {user.specialty || 'N/A'}</Typography>
                  <Typography><AccessTimeIcon fontSize="small" sx={{ mr: 1 }} /> Availability: {user.availability || 'N/A'}</Typography>
                </Box>
              </Grid>
            </Grid>

          </Box>
        )}

        {/* Course*/}
        {tabValue === roleNumber && user.type_register !== 'student' && (
          <div >

            <UserCourses userId={id} />
          </div>
        )}

        {/* rating*/}
        {tabValue === 1 && CurrentUser.role === 'student' && (

          <Box mt={4} px={4} textAlign="center">
            <RatingUser tutorId={id} studentId={CurrentUser.idUser} loading={loadingRate} />

          </Box>
        )}


        <Dialog open={messageOpen} onClose={() => setMessageOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>Send a message to {user.user_name}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              multiline
              minRows={3}
              fullWidth
              variant="outlined"
              label="Message"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setMessageOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSendMessage} disabled={!messageText.trim()}>
              Send
            </Button>
          </DialogActions>
        </Dialog>

        {/* Confirmation Snackbar */}
        <Snackbar
          open={messageSent}
          autoHideDuration={4000}
          onClose={() => setMessageSent(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setMessageSent(false)} severity="success" sx={{ width: '100%' }}>
            Message sent successfully!
          </Alert>
        </Snackbar>



      </Box>
    </SectionTwo>
  );
}
