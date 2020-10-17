import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  shadows: ['none'],
  palette: {
    primary: {
      main: '#4286F4'
    }
  },
  overrides: {
    MuiInputBase: {
      root: {
        background: 'rgba(255, 255, 255, 0.8)'
      },
      input: {
        fontSize: 18,
        lineHeight: '1.4',
        background: 'rgba(255, 255, 255, 0.8)',
        borderColor: '#EDEFF5',
        padding: '18px 20px'
      }
    },
    MuiSelect: {
      selectMenu: {
        padding: '18px 20px'
      },
      outlined: {
        borderRadius: 10
      }
    },
    MuiDrawer: {
      paperAnchorDockedLeft: {
        borderRight: 'none'
      }
    },
    MuiDialog: {
      paper: {
        borderRadius: 15,
        overflowY: 'unset',
        padding: 30,
        '@media (max-width: 576px)': {
          padding: 20
        }
      }
    },
    MuiDialogContent: {
      root: {
        '@media (max-width: 576px)': {
          padding: 0
        }
      }
    },
    MuiTooltip: {
      tooltip: {
        fontSize: 16,
        color: '#343949',
        backgroundColor: '#fff',
        border: '1px solid #EDEFF5',
        borderRadius: 10,
        padding: 30
      }
    },
    MuiPagination: {
      ul: {
        flexWrap: 'nowrap'
      }
    },
    MuiList: {
      root: {
        background: 'rgba(255, 255, 255, 0.8)',
        border: '1px solid #EDEFF5',
        borderRadius: 5
      },
      padding: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 15,
        paddingLeft: 15
      }
    },
    MuiListItem: {
      root: {
        paddingTop: 0,
        '&:not(:last-child)': {
          borderBottom: '1px solid #EDEFF5',
          paddingBottom: 10
        },
        '&:not(:first-child)': {
          paddingTop: 10
        }
      },
      gutters: {
        paddingLeft: 0,
        paddingRight: 0
      }
    },
    MuiMenuItem: {
      root: {
        color: '#939A9E',
        lineHeight: '14px',
        fontSize: 12
      }
    }
  }
})
