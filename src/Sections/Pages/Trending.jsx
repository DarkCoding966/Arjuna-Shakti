import { useState, useEffect } from "react";
import mockData from "../../_mock/_mock.json";
import { Box, Typography, Card, CardContent, Button, CardMedia, Grid } from "@mui/material";

const TrendingNews = () => {
  const [newsData, setNewsData] = useState({ hero: {}, side: [], latest: [] });

  useEffect(() => {
    if (mockData.results.length > 0) {
      setNewsData({
        hero: mockData.results[0],
        side: mockData.results.slice(1, 4),
        latest: mockData.results.slice(4, 10),
      });
    }
  }, []);

  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", padding: 3 }}>
      {/* Hero News Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardMedia
              component="img"
              height="400"
              image={newsData.hero.image_url || "https://via.placeholder.com/800x400"}
              alt={newsData.hero.title}
            />
            <CardContent>
              <Typography variant="h5" fontWeight="bold">
                {newsData.hero.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                {newsData.hero.description}
              </Typography>
              <Button variant="contained" href={newsData.hero.link} target="_blank">
                Read More
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Side News */}
        <Grid item xs={12} md={4}>
          {newsData.side.map((news, index) => (
            <Card key={index} sx={{ mb: 2, borderRadius: 2, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="body1" fontWeight="bold">
                  {news.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {news.source_name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>

      {/* Latest News Section */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: "bold" }}>
        Latest News
      </Typography>
      <Grid container spacing={3}>
        {newsData.latest.map((news, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
              <CardMedia
                component="img"
                height="200"
                image={news.image_url || "https://via.placeholder.com/400x200"}
                alt={news.title}
              />
              <CardContent>
                <Typography variant="body1" fontWeight="bold">
                  {news.title}
                </Typography>
                <Button size="small" href={news.link} target="_blank" sx={{ mt: 1 }}>
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TrendingNews;
