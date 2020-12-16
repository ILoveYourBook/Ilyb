import React, { useState } from 'react';
import { Container, Text, H2, H3, Grid, Row, Col, View } from 'native-base';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

import { Book } from './Home';

const DetailedInfo = (props: { book: Book }) => {
  const { book } = props;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <ScrollView>
      <Container style={styles.container}>
        <Modal
          transparent={true}
          animationType={'fade'}
          visible={modalOpen}
          onRequestClose={() => setModalOpen(false)}>
          {
            <TouchableWithoutFeedback onPress={() => setModalOpen(false)}>
              <View style={styles.modalView}>
                <Image style={styles.modalImage} source={{ uri: book.image }} />
              </View>
            </TouchableWithoutFeedback>
          }
        </Modal>
        <Grid>
          <Row size={0.4}>
            <Col size={0.5} style={styles.imgCol}>
              <H2>{book.title}</H2>
              <H3 style={styles.author}>{book.author}</H3>
            </Col>
            <Col size={0.5} style={styles.imgCol}>
              <TouchableOpacity onPress={() => setModalOpen(true)}>
                <Image style={styles.img} source={{ uri: book.image }} />
              </TouchableOpacity>
            </Col>
          </Row>
          <Col size={0.6}>
            <H2>Opinion</H2>
            <Text style={styles.opinion}>{book.opinion}</Text>
          </Col>
        </Grid>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  img: {
    width: '80%',
    aspectRatio: 3 / 4,
    alignSelf: 'center',
  },
  imgCol: {
    justifyContent: 'center',
  },
  container: {
    padding: 25,
  },
  backBtn: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 5,
    borderRadius: 40,
  },
  backIcon: {
    fontSize: 40,
    color: 'grey',
  },
  author: {
    marginBottom: 20,
    marginTop: 10,
  },
  modalView: {
    backgroundColor: 'rgba(255, 255, 255, .5)',
    flex: 1,
    justifyContent: 'center',
  },
  modalImage: {
    alignSelf: 'center',
    width: '90%',
    aspectRatio: 3 / 4,
  },
  opinion: {
    textAlign: 'justify',
  },
});

export default DetailedInfo;
