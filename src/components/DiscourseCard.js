import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ToolTip from './ToolTip'

const styles = {
  card: {
    maxWidth: '100%',
    margin: '5px',
    marginBottom: '5px',
    borderRadius: '12px'
  },
  media: {
        // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover'
  }
}

function ImgMediaCard (props) {
  const { discourseId, discourseTitle, discourseDescription, discourseImg, discoursePublishedAt, classes } = props
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt='Contemplative Reptile'
          className={classes.media}
          height='100%'
          image={`${discourseImg}`}
          title='Contemplative Reptile'
                />
        <CardContent>
          <Typography gutterBottom variant='h8' component='h6'>
            {discourseTitle}
          </Typography>
          <Typography component='p'>
            {discourseDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size='small'
          color='primary'
          onClick={() =>
                        navigator.clipboard.writeText(
                            `https://collaboration-2c632.firebaseapp.com/discourse/${discourseId}`
                        )}
                >
                    Copy Link

                    {/* eventually add some share functionality here? */}
        </Button>
        <Button size='small' color='primary'>
          <Link to={`/discourse/${discourseId}`}>Chat about this!</Link>
        </Button>
      </CardActions>
    </Card>
  )
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ImgMediaCard)
