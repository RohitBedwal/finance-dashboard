import styled from "styled-components";

export const ChartGrid = styled.div`
	margin-top: 24px;
	display: grid;
	grid-template-columns: minmax(0, 2fr) minmax(320px, 1fr);
	gap: 20px;
	align-items: start;

	@media (max-width: 1280px) {
		grid-template-columns: 1fr;
	}
`;

export const LeftCharts = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 20px;
`;
