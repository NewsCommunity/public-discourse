import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

class TriggersTooltips extends React.Component {
  state = {
    open: false
  }

  handleTooltipClose = () => {
    this.setState({ open: false })
  }

  handleTooltipOpen = () => {
    this.setState({ open: true })
  }

  render () {
    let { discourseId } = this.props
    return (
      <div>
        <Grid container justify='center'>

          <Grid item>
            <ClickAwayListener onClickAway={this.handleTooltipClose}>
              <div>
                <Tooltip
                  PopperProps={{
                    disablePortal: true
                  }}
                  onClose={this.handleTooltipClose}
                  open={this.state.open}
                  title='Added to clipboard'
                  leaveDelay={100}
                                >
                  <Button
                    onClick={() => {
                        this.handleTooltipOpen()
                        navigator.clipboard.writeText(
                                                `https://collaboration-2c632.firebaseapp.com/discourse/${discourseId}`
                                            )
                      }}
                                    >
                                        Copy link to clipboard
                                    </Button>
                </Tooltip>
              </div>
            </ClickAwayListener>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default TriggersTooltips
