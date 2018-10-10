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
                  title='Copied to clipboard'
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
                    {/* THIS IS THE SVG ICON FOR THE CLIPBOARD */}
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                                        >
                        <path d='M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z' />
                      </svg>
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
