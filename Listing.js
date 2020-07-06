import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  StatusBar,
  Button,
} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowRight,
  faSearch,
  faAward,
} from '@fortawesome/free-solid-svg-icons';

const Listing = () => {
  const [item, setItem] = useState(null);
  const [search, setSearch] = useState('');
  const [task, setTask] = useState([]);

  const listItem = () => {
    if (item === null || item == '') {
      Alert.alert('Warning', 'Please add a task');
    } else {
      task.push(item);
      setTask([...task]);
      setItem('');
    }
  };

  const deleteHandler = items => {
    setTask(oldItem => {
      return oldItem.filter((arrEl, index) => {
        return index !== items;
      });
    });
  };

  const filteredData = task.filter(itemss => {
    const itemData = itemss.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    return itemData;
  });

  const onsearch = text => {
    setSearch(text);
  };

  return (
    <View style={{flex: 1}}>
      {/* Header */}
      <StatusBar barStyle={'default'} backgroundColor={'#212121'} />
      <View style={styles.Hcontainer}>
        <View style={styles.headerView}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FontAwesomeIcon
              icon={faSearch}
              style={{marginRight: 5}}
              color={'silver'}
            />
            <TextInput
              style={styles.addTaskHeading}
              placeholder="Search your task"
              placeholderTextColor="silver"
              value={search}
              onChangeText={text => onsearch(text)}
            />
          </View>
        </View>
      </View>

      {/* Main Listing */}
      {task.length ? (
        <View style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredData}
            keyExtractor={(iten, index) => index.toString()}
            extraData={task}
            renderItem={({item, index}) => {
              return (
                <View style={styles.listItems}>
                  <View style={{flex: 8, marginRight: 20}}>
                    <Text style={styles.listItem}>{item}</Text>
                  </View>
                  <View style={{flex: 2}}>
                    <Button
                      title=" X "
                      color="#A62C2B"
                      onPress={() => deleteHandler(index)}
                    />
                  </View>
                </View>
              );
            }}
          />
        </View>
      ) : (
        <View style={styles.Elsecontainer}>
          <FontAwesomeIcon icon={faAward} style={styles.emogi} size={41} />
          <Text style={styles.elsestyle}>Opps! there is no task </Text>
        </View>
      )}

      {/* Type a task */}
      <View>
        <View style={styles.inputView}>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              value={item}
              onChangeText={text => setItem(text)}
              maxLength={100}
              multiline
              style={styles.textInput}
              placeholder="Type a task"
              placeholderTextColor={'silver'}
            />
            <TouchableOpacity style={styles.sendButton} onPress={listItem}>
              <Text style={styles.add}>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  color={'silver'}
                  size={25}
                />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Listing;

const styles = StyleSheet.create({
  container: {
    flex: 8,
    marginHorizontal: '5%',
    paddingHorizontal: '1%',
  },

  // Header styles

  Hcontainer: {
    backgroundColor: '#303030',
    margin: '5%',
    borderRadius: 5,
  },
  headerView: {
    padding: '1%',
    paddingLeft: '5%',
  },
  addTaskHeading: {
    fontSize: 15,
    color: 'silver',
    fontWeight: 'bold',
    width: '90%',
  },

  itemView: {
    flex: 1,
  },

  listItem: {
    color: '#FFFFFF',
    fontSize: 17,
  },
  inputView: {
    backgroundColor: '#303030',
    margin: 5,
    paddingLeft: 30,
    borderRadius: 50,
  },
  textInput: {
    fontSize: 17,
    flex: 8,
    color: 'silver',
    fontWeight: 'bold',
  },
  sendButton: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  add: {
    color: 'silver',
    fontSize: 40,
  },

  // listing styles

  listItems: {
    flex: 1,
    padding: 15,
    borderColor: 'silver',
    borderWidth: 1,
    marginVertical: 15,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  txtItem: {
    flex: 5,
    backgroundColor: 'red',
    color: '#FFFFFF',
  },

  Elsecontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  elsestyle: {
    color: 'silver',
    fontSize: 20,
  },

  emogi: {
    color: 'silver',
  },
});
