import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  shadows: ['none'],
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
        overflowY: 'unset'
      }
    }
  }
})
