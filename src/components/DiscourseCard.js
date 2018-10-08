import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// const DiscourseCard = props => {
//   const { discourseId, discourseTitle, discourseDescription, discourseImg, discoursePublishedAt } = props
//   return (
//     <div className='card'>
//       <img className='card-img-top' src={`${discourseImg}`} alt='Card image cap' />
//       <div className='card-body'>
//         <h5 className='card-title'>{discourseTitle}</h5>
//         <p className='card-text'>{discourseDescription}</p>
//         <Link to={`/discourse/${discourseId}`}>Chat about this!</Link>
//       </div>
//     </div>
//   )
// }

// export default DiscourseCard

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    maxWidth: 345
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
          height='140'
          image={`${discourseImg}`}
          title='Contemplative Reptile'
                />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {discourseTitle}
          </Typography>
          <Typography component='p'>
            {discourseDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
                    Share
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
