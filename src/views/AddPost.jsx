import React from 'react';
import { useNavigate } from 'react-router-dom';
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
import postService from '../api/postServices';
import Navbar from '../components/Navbar';

const AddPost = (props) => {
	const navigate = useNavigate();
	const { _id } = props;
	const [plantType, setPlantType] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [image, setImage] = React.useState('');

	const handleplantTypeChange = (event) => {
		setPlantType(event.target.value);
	};
	const handleDescriptionChange = (event) => {
		setDescription(event.target.value);
	};
	const handleImageUpload = async (event) => {
		const uploadData = new FormData();
		uploadData.append('imageUrl', event.target.files[0]);
		const uploadedImage = await postService.uploader(uploadData);
		setImage(uploadedImage.data.secure_url);
	};
	const handleCancel = () => {
		setImage('');
		setPlantType('');
		setDescription('');
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		const createdPost = await postService.createPost(
			image,
			plantType,
			description,
			_id
		);
		navigate(`/post/${createdPost.data._id}`);
		handleCancel();
	};
	return (
		<div>
			<Navbar {...props} />
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
