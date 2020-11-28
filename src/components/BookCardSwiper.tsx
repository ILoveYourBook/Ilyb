import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, DeckSwiper, Card, CardItem, Text, Col, Grid, Left, Body } from 'native-base';
const books = [
  {
	name: 'La Sombra del Viento',
	author: 'Carlos Ruiz Zafón',
	text: 'La Sombra del Viento',
	genres: 'Drama, Mistery',
    image: require('../assets/la-sombra.jpg'),
  },
  {
    text: 'Card One',
	author: 'Carlos Ruiz Zafón',
    name: 'One',
	genres: 'Drama, Mistery',
    image: require('../assets/la-sombra.jpg'),
  },
];
export default class BookCardSwiper extends Component {
  render() {
    return (
      <Container>
				<Grid >
					<Col>
						<DeckSwiper
								dataSource={books}
								renderItem={(item: any) =>
									<Card style={{ elevation: 3, width: 300, height: 453 }}>
										<CardItem cardBody>
											<Image style={{ height: 453, flex: 1 }} source={item.image} />
										</CardItem>
										<CardItem style={{position: 'absolute', bottom: 0, opacity: 0.9}}>
											<Left>
												<Body>
													<Text>{item.name}</Text>
													<Text>{item.author}</Text>
													<Text note>{item.genres}</Text>
												</Body>
											</Left>
										</CardItem>
									</Card>
								}
							/>
					</Col>
				</Grid>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  deckView: {
		justifyContent: "center",
		alignItems: "center",
  },
});
