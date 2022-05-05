import React from 'react';
import { useNavigate } from 'react-router-dom';

import service from '../services/service';

const HomePlaceholder = ( props ) => {
	const navigate = useNavigate();
	async function loggedIn() {
		try {
			const resFromApi = await service.loggedIn();
			if (resFromApi.data !== '' ) {
				navigate('/feed');
			}
			
			navigate('/signup');

		} catch (error) {
			console.log(error);
		}
	}
	
	loggedIn();

	return (
		<div>
			Loading...
		</div>
	);
};

export default HomePlaceholder;
