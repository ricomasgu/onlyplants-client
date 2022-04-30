import React from 'react';
import {
	Container,
	Flex,
	Center,
	Button,
	Input,
	Textarea,
	Wrap,
	Image,
	WrapItem,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';

const AddPost = () => {
	const [plantType, setPlantType] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [image, setImage] = React.useState('');

	const handleplantTypeChange = (event) => {
		setPlantType(event.target.value);
	};
	const handleDescriptionChange = (event) => {
		setDescription(event.target.value);
	};
	const handleImageUpload = (event) => {
		const uploadData = new FormData();
		uploadData.append('imageUrl', event.target.files[0]);
		setImage(URL.createObjectURL(event.target.files[0]));
	};
	const handleCancel = () => {
		setImage('');
		setPlantType('');
		setDescription('');
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log({
			plantType,
			description,
			image,
		});
		handleCancel();
	};

	return (
		<div>
			<Navbar />
			<div>
				<Container w="100%" h="100%" mt="50px">
					<form onSubmit={handleSubmit}>
						<Flex justify="center" align="center" mb="25px">
							<Flex direction="column" maxHeight="60vh">
								<Center p="4" h="60vh" w="40vh">
									<Wrap>
										<WrapItem>
											{image && <Image src={image} w="400px" />}
										</WrapItem>
										<WrapItem>
											<Input
												type="file"
												onChange={handleImageUpload}
												name="image"
												size="sm"
												borderRadius="10"
											/>
										</WrapItem>
									</Wrap>
								</Center>
							</Flex>
							<Flex direction="column">
								<Center h="60vh" w="40vh">
									<Wrap>
										<Input
											size="sm"
											placeholder="Plant Type"
											variant="filled"
											name="plantType"
											value={plantType}
											onChange={handleplantTypeChange}
											borderRadius="10"
											h="40px"
										/>
										<Textarea
											size="sm"
											placeholder="Description"
											variant="filled"
											name="description"
											value={description}
											onChange={handleDescriptionChange}
											borderRadius="10"
											h="150px"
										/>
									</Wrap>
								</Center>
							</Flex>
						</Flex>
						<Center gap="4">
							<Button
								height="50px"
								width="100px"
								border="2px"
								colorScheme="green"
								borderColor="green.600"
								type="submit"
								borderRadius="10"
							>
								Post
							</Button>
							<Button
								size="md"
								height="50px"
								width="100px"
								border="2px"
								colorScheme="red"
								variant="outline"
								borderRadius="10"
								onClick={handleCancel}
							>
								Cancel
							</Button>
						</Center>
					</form>
				</Container>
			</div>
		</div>
	);
};

export default AddPost;
