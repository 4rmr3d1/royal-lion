import React from 'react'
import MuiLink from '@material-ui/core/Link'

export const Link = ({ type = 'solid', onClick, href, ...eachProps }) => {
	return <MuiLink {...eachProps} href={href} onClick={onClick} />
}
