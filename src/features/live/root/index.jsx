import React from 'react';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails
} from '@material-ui/core/';
import { MatchInfo } from '@app/ui';

import './index.scss';

export const Live = () => {
	return (
		<section className='line live'>
			<div className='container'>
				<div className='row'>
					<div className='col-12'>
						<div className='live-label'>
							<div className='live-icon'>
								<img src='img/live.svg' alt='' />
							</div>
							В прямом эфире
						</div>
					</div>
				</div>
			</div>
			<div className='container'>
				<Accordion expanded>
					<AccordionSummary expandIcon={<i className='icon-chevron-down'></i>}>
						Table Soccer League
					</AccordionSummary>
					<AccordionDetails>
						<MatchInfo />
						<MatchInfo />
						<MatchInfo />
						<MatchInfo />
						<MatchInfo />
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary expandIcon={<i className='icon-chevron-down'></i>}>
						Table Soccer League
					</AccordionSummary>
					<AccordionDetails>
						<MatchInfo />
						<MatchInfo />
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary expandIcon={<i className='icon-chevron-down'></i>}>
						Table Soccer League
					</AccordionSummary>
					<AccordionDetails>
						<MatchInfo />
						<MatchInfo />
						<MatchInfo />
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary expandIcon={<i className='icon-chevron-down'></i>}>
						Table Soccer League
					</AccordionSummary>
					<AccordionDetails>
						<MatchInfo />
						<MatchInfo />
						<MatchInfo />
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary expandIcon={<i className='icon-chevron-down'></i>}>
						Table Soccer League
					</AccordionSummary>
					<AccordionDetails>
						<MatchInfo />
						<MatchInfo />
						<MatchInfo />
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary expandIcon={<i className='icon-chevron-down'></i>}>
						Table Soccer League
					</AccordionSummary>
					<AccordionDetails>
						<MatchInfo />
						<MatchInfo />
						<MatchInfo />
					</AccordionDetails>
				</Accordion>
			</div>
		</section>
	);
};
