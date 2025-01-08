import { useState, useEffect } from "react";
import mockData from "../../_mock/_mock.json"
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Link as MuiLink,
  CardMedia,
} from "@mui/material";
import Carousel from "react-material-ui-carousel"; 

const TrendingNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    setNewsData(mockData.results);
    setIsLoading(false);
    }, []);

    return (
    <Box sx={{display:"flex",flexDirection:"row"}}>
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 4, textAlign: "center", color: "white",fontWeight:"bold" }}
      >
        Trending News
      </Typography>

      {isLoading ? (
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Loading...
        </Typography>
      ) : (
        <Box>
          {newsData.map((news) => (
            <Card
              key={news.article_id}
              sx={{
                mb: 4,
                borderRadius: 2,
                boxShadow: 3,
                overflow: "hidden",
                backgroundColor: "#181818",

              }}
            >
              <CardContent>
                {/* Title */}
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: "bold", mb: 2 ,color:"white"}}
                >
                  {news.title}
                </Typography>

                {/* Carousel */}
                <Box
                  sx={{
                    border: "2px solid gold",
                    borderRadius: 2,
                    overflow: "hidden",
                    mb: 2,
                    width: "50%",
                  }}
                  >
                  <Carousel
                    autoPlay
                    indicators={false}
                    sx={{ height: "300px" }}
                  >
                    {news.video_url ? (
                      <Box sx={{ position: "relative", height: "300px" }}>
                        <CardMedia
                          component="iframe"
                          height="300"
                          src={news.video_url}
                          title={news.title}
                          allowFullScreen
                          sx={{ border: "none" }}
                        />
                      </Box>
                    ) : news.image_url ? (
                      <CardMedia
                      component="img"
                        height="300"
                        image={news.image_url}
                        alt={news.title}
                      />
                    ) : (
                      <CardMedia
                        component="img"
                        height="300"
                        image="https://img.freepik.com/premium-vector/no-photography-sign_694796-66.jpg?w=2000"
                        alt="No Image Available"
                      />
                    )}
                  </Carousel>
                </Box>

                {/* Description */}
                <Typography
                  variant="body1"
                  sx={{ mb: 2, color: "grey.400" }}
                >
                  {news.description || "No description available."}
                </Typography>

                {/* Published By and Date */}
                <Typography
                  variant="body2"
                  color="grey.400"
                  sx={{ mb: 2 }}
                >
                  Published by {news.source_name || "Unknown Source"} on{" "}
                  {news.pubDate
                    ? new Date(news.pubDate).toLocaleDateString()
                    : "Unknown Date"}
                </Typography>

                {/* Read Full Article Button */}
                <MuiLink
                  href={news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ textDecoration: "none" }}
                >
                  <Button variant="contained"sx={{ backgroundColor: "white" ,color:"black",fontWeight:"bold",width:"13%",height:40,fontSize:"0.87rem",borderRadius:4 }}>
                    Read Article
                  </Button>
                </MuiLink>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
    <Box sx={{ width:"30%" }} />
    </Box>
  );
};

export default TrendingNews;

//   useEffect(() => {
//     const fetchNews = async () => {
//       const apiKey = "pub_64327b5c3318465a4a3c5a449d9b6a110a637";
//       const apiUrl = `https://newsdata.io/api/1/latest?apikey=${apiKey}&q=women&language=en`;

//       try {
//         const response = await fetch(apiUrl);
//         const data = await response.json();

//         if (data.status === "success") {
//           setNewsData(data.results);
//         } else {
//           setError("Failed to fetch news. Please try again later.");
//         }
//       } catch (error) {
//         setError("An error occurred while fetching the news.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchNews();
//   }, []);