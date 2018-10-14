import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DelayToolTips from "./DelayToolTips";

const styles = {
  card: {
    maxWidth: "90%",
    margin: "5px",
    marginBottom: "5px",
    borderRadius: "12px",
    justifyContent: "center"
  },
  media: {
    objectFit: "cover"
  }
};

function ImgMediaCard(props) {
  const {
    discourseId,
    discourseTitle,
    discourseDescription,
    discourseImg,
    classes,
    sourceName,
    publishedAt,
  } = props;
  if (discourseImg === "") {
    return null;
  } else {
    return (
      <Card className={classes.card}>
        <CardActionArea component={Link} to={`/discourse/${discourseId}`}>
          <CardMedia
            component="img"
            alt="Article Thumbnail"
            className={classes.media}
            height="100%"
            image={`${discourseImg}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h8" component="h6">
              {discourseTitle}
            </Typography>
            <div className=".source-info-discourse-card">
                <div className="source-Name">
                  <div className="source-name-name text-size2">{sourceName.toUpperCase()}</div>
                  <div className="source-name-published no-margin">Published at: {publishedAt}</div>
                </div>
              </div>
            <Typography component="p">{discourseDescription}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <DelayToolTips discourseId={discourseId} />
          <Button
            component={Link}
            to={`/discourse/${discourseId}`}
            size="small"
            color="primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
            </svg>
            {"  "}
            Chat about this
          </Button>
        </CardActions>
      </Card>
    );
  }
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImgMediaCard);
