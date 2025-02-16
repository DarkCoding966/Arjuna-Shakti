import { useEffect, useState } from "react";
import courseData from "../../_mock/courses.json";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  CardActions,
} from "@mui/material";

const CourseList = () => {
  const [courses, setCourses] = useState({});

  useEffect(() => {
    setCourses(courseData);
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 5,
        backgroundColor: "#1E1E1E",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        mb={5}
        sx={{
          color: "#E91E63",
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}
      >
        Courses & Skill Development
      </Typography>

      {Object.entries(courses).map(([category, courseList]) => (
        <div key={category} style={{ marginBottom: "40px" }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="#FF4081"
            mb={2}
            sx={{ textTransform: "capitalize" }}
          >
            {category}
          </Typography>

          <Grid container spacing={3}>
            {courseList.slice(0, 4).map((course, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  sx={{
                    maxWidth: 345,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#222",
                    color: "white",
                    borderRadius: 3,
                    boxShadow: "0px 4px 12px rgba(255, 0, 255, 0.2)",
                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0px 4px 20px rgba(255, 105, 180, 0.5)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    image={course.image}
                    alt={course.title}
                    sx={{
                      borderRadius: "4px 4px 0 0",
                      filter: "brightness(0.9)",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="bold" color="white">
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="#FFAB40">
                      {course.platform}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#E91E63",
                        color: "white",
                        width: "100%",
                        "&:hover": {
                          backgroundColor: "#FF4081",
                        },
                      }}
                      href={course.url}
                      target="_blank"
                    >
                      Enroll Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </Container>
  );
};

export default CourseList;
