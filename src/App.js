import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Sidebar, Header, Footer } from '@app/shared-features'
import { Router } from '@app/components'

import './styles/style.scss'

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<Sidebar />
			<Router />
			<Footer />
		</BrowserRouter>
	)
}

export default App
