import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Paragraph, Subheading } from 'react-native-paper';

import { Book } from './Home';

const DetailedInfo = (props: { book: Book }) => {
  const { book } = props;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <ScrollView>
      <View style={styles.view}>
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
        <View>
          <View style={styles.bookInfoRow}>
            <View style={styles.infoCol}>
              <Subheading>{book.title}</Subheading>
              <Paragraph style={styles.author}>{book.author}</Paragraph>
            </View>
            <View style={styles.imgCol}>
              <TouchableOpacity onPress={() => setModalOpen(true)}>
                <Image style={styles.img} source={{ uri: book.image }} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.opinionCol}>
            <Subheading>Opinion</Subheading>
            <Paragraph style={styles.opinion}>{book.opinion}</Paragraph>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bookInfoRow: {
    flex: 0.4,
  },
  infoCol: {
    flex: 0.5,
  },
  imgCol: {
    flex: 0.5,
  },
  opinionCol: {
    flex: 0.6,
  },
  img: {
    width: '80%',
    aspectRatio: 3 / 4,
    alignSelf: 'center',
  },
  imgCol: {
    justifyContent: 'center',
  },
  view: {
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
