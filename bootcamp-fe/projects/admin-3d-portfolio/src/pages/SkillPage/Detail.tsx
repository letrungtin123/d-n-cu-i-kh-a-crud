import { useGetOneSkillQuery } from '~/store/services/skill.service';
import { useParams } from 'react-router-dom';

const DetailPage = () => {
	const { id } = useParams();

	const {
		data: value,
		isLoading,
		isError,
	} = useGetOneSkillQuery(Number(id as string));

	if (isLoading) return <div>Loading...</div>;
	if (!value) return <div>No skill found</div>;
	if (isError) return <div>Error</div>;
	return (
		<div
			style={{
				display: 'flex',
				gap: '10px',
				alignItems: 'center',
			}}
		>
			<h2>Id: {value.id}</h2>
			<h2> - Name: {value.title}</h2>
			<h2> - Price: {value.desc}</h2>
		</div>
	);
};
export default DetailPage;